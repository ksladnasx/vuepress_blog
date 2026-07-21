<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  backgroundGroups,
  getBackgroundCount,
  getBackgroundUrl,
  normalizeBackgroundIndex,
} from "../backgrounds.js";

const STORAGE_KEY = "xh-background-settings";
const MOBILE_QUERY = "(max-width: 719px)";
const BACKGROUND_PREFETCH_ATTR = "data-xh-background-prefetch";
const PREFETCH_START_DELAY = 1800;
const PREFETCH_STEP_DELAY = 700;
const PREFETCH_IDLE_TIMEOUT = 3000;
const THEMES = ["light", "dark"];

const indexes = ref({
  desktop: 0,
  mobile: 0,
});
const isMobile = ref(false);
let mediaQuery = null;
let prefetchQueue = [];
let pendingPrefetchTask = null;
const prefetchedUrls = new Set();

const toCssUrl = (url) =>
  `url("${String(url).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;

const getConnection = () => {
  if (typeof navigator === "undefined") return null;

  return (
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    null
  );
};

const canPrefetchBackgrounds = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  const connection = getConnection();

  if (connection?.saveData) return false;
  if (["slow-2g", "2g"].includes(connection?.effectiveType)) return false;

  return true;
};

const getTheme = () =>
  document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const getOrderedThemes = () => {
  const theme = getTheme();

  return [theme, ...THEMES.filter((item) => item !== theme)];
};

const getOrderedModes = () => {
  const mode = currentMode.value;

  return [mode, ...Object.keys(backgroundGroups).filter((item) => item !== mode)];
};

const getOrderedIndexes = (mode) => {
  const count = getBackgroundCount(mode);
  const current = indexes.value[mode] || 0;

  return Array.from({ length: count }, (_, offset) =>
    normalizeBackgroundIndex(current + offset + 1, count),
  );
};

const normalizePrefetchUrl = (url) => {
  try {
    return new URL(url, document.baseURI).href;
  } catch {
    return url;
  }
};

const isUrlAlreadyPrefetched = (url) => {
  const normalizedUrl = normalizePrefetchUrl(url);

  if (prefetchedUrls.has(normalizedUrl)) return true;

  return Array.from(
    document.querySelectorAll(`link[${BACKGROUND_PREFETCH_ATTR}]`),
  ).some((link) => link.href === normalizedUrl);
};

const getBackgroundPrefetchUrls = () => {
  if (typeof document === "undefined") return [];

  const activeUrl = normalizePrefetchUrl(
    getBackgroundUrl(currentMode.value, getTheme(), currentIndex.value),
  );
  const orderedThemes = getOrderedThemes();
  const urls = [];

  getOrderedModes().forEach((mode) => {
    getOrderedIndexes(mode).forEach((index) => {
      orderedThemes.forEach((theme) => {
        const url = getBackgroundUrl(mode, theme, index);
        const normalizedUrl = normalizePrefetchUrl(url);

        if (normalizedUrl && normalizedUrl !== activeUrl) {
          urls.push(url);
        }
      });
    });
  });

  return Array.from(new Set(urls)).filter((url) => !isUrlAlreadyPrefetched(url));
};

const prefetchBackgroundUrl = (url) => {
  if (!url || typeof document === "undefined") return;

  const normalizedUrl = normalizePrefetchUrl(url);
  if (isUrlAlreadyPrefetched(normalizedUrl)) return;

  const link = document.createElement("link");
  link.rel = "prefetch";
  link.as = "image";
  link.href = url;
  link.setAttribute("fetchpriority", "low");
  link.setAttribute(BACKGROUND_PREFETCH_ATTR, "");
  document.head.appendChild(link);
  prefetchedUrls.add(normalizedUrl);
};

const cancelPendingPrefetch = () => {
  if (!pendingPrefetchTask || typeof window === "undefined") return;

  if (
    pendingPrefetchTask.type === "idle" &&
    typeof window.cancelIdleCallback === "function"
  ) {
    window.cancelIdleCallback(pendingPrefetchTask.id);
  } else {
    window.clearTimeout(pendingPrefetchTask.id);
  }

  pendingPrefetchTask = null;
};

const schedulePrefetchStep = (delay = 0) => {
  if (!canPrefetchBackgrounds()) return;

  cancelPendingPrefetch();

  pendingPrefetchTask = {
    type: "timeout",
    id: window.setTimeout(() => {
      const run = () => {
        pendingPrefetchTask = null;
        runBackgroundPrefetch();
      };

      if (typeof window.requestIdleCallback === "function") {
        pendingPrefetchTask = {
          type: "idle",
          id: window.requestIdleCallback(run, {
            timeout: PREFETCH_IDLE_TIMEOUT,
          }),
        };
      } else {
        pendingPrefetchTask = {
          type: "timeout",
          id: window.setTimeout(run, 0),
        };
      }
    }, delay),
  };
};

const scheduleBackgroundPrefetch = (delay = PREFETCH_START_DELAY) => {
  if (!canPrefetchBackgrounds()) return;

  prefetchQueue = getBackgroundPrefetchUrls();

  if (prefetchQueue.length) {
    schedulePrefetchStep(delay);
  }
};

const runBackgroundPrefetch = () => {
  if (!canPrefetchBackgrounds()) return;

  if (document.visibilityState === "hidden") {
    return;
  }

  const nextUrl = prefetchQueue.shift();
  if (!nextUrl) return;

  prefetchBackgroundUrl(nextUrl);

  if (prefetchQueue.length) {
    schedulePrefetchStep(PREFETCH_STEP_DELAY);
  }
};

const normalizeIndexes = (nextIndexes = {}) => ({
  desktop: normalizeBackgroundIndex(
    nextIndexes.desktop,
    getBackgroundCount("desktop"),
  ),
  mobile: normalizeBackgroundIndex(
    nextIndexes.mobile,
    getBackgroundCount("mobile"),
  ),
});

const applyBackgrounds = () => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const desktopIndex = indexes.value.desktop;
  const mobileIndex = indexes.value.mobile;

  root.style.setProperty(
    "--xh-home-bg-desktop",
    toCssUrl(getBackgroundUrl("desktop", "light", desktopIndex)),
  );
  root.style.setProperty(
    "--xh-home-bg-desktop-dark",
    toCssUrl(getBackgroundUrl("desktop", "dark", desktopIndex)),
  );
  root.style.setProperty(
    "--xh-home-bg-mobile",
    toCssUrl(getBackgroundUrl("mobile", "light", mobileIndex)),
  );
  root.style.setProperty(
    "--xh-home-bg-mobile-dark",
    toCssUrl(getBackgroundUrl("mobile", "dark", mobileIndex)),
  );
};

const persistSettings = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(indexes.value));
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
};

const readSettings = () => {
  if (typeof window === "undefined") return;

  try {
    const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    indexes.value = normalizeIndexes(saved);
  } catch {
    indexes.value = normalizeIndexes();
  }
};

const currentMode = computed(() => (isMobile.value ? "mobile" : "desktop"));
const currentIndex = computed(() => indexes.value[currentMode.value]);
const currentCount = computed(() => getBackgroundCount(currentMode.value));
const buttonTitle = computed(
  () => `切换背景图片 ${currentIndex.value + 1}/${currentCount.value}`,
);

const updateMobileState = () => {
  const nextIsMobile = Boolean(mediaQuery?.matches);

  if (isMobile.value !== nextIsMobile) {
    isMobile.value = nextIsMobile;
    scheduleBackgroundPrefetch(500);
  }
};

const switchBackground = () => {
  const mode = currentMode.value;
  const count = getBackgroundCount(mode);

  indexes.value = {
    ...indexes.value,
    [mode]: normalizeBackgroundIndex(indexes.value[mode] + 1, count),
  };
};

const handleWindowLoad = () => {
  scheduleBackgroundPrefetch();
};

const handleVisibilityChange = () => {
  if (document.visibilityState === "visible") {
    scheduleBackgroundPrefetch(500);
  }
};

onMounted(() => {
  readSettings();

  mediaQuery = window.matchMedia(MOBILE_QUERY);
  updateMobileState();
  mediaQuery.addEventListener("change", updateMobileState);
  applyBackgrounds();

  document.addEventListener("visibilitychange", handleVisibilityChange);

  if (document.readyState === "complete") {
    scheduleBackgroundPrefetch();
  } else {
    window.addEventListener("load", handleWindowLoad, { once: true });
  }
});

watch(
  indexes,
  () => {
    applyBackgrounds();
    persistSettings();
    scheduleBackgroundPrefetch(500);
  },
  { deep: true },
);

onBeforeUnmount(() => {
  cancelPendingPrefetch();
  window.removeEventListener("load", handleWindowLoad);
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  mediaQuery?.removeEventListener("change", updateMobileState);
});
</script>

<template>
  <div class="background-switcher">
    <button
      class="background-switcher-trigger"
      type="button"
      :aria-label="buttonTitle"
      :title="buttonTitle"
      @click.stop="switchBackground"
    >
      <svg
        class="background-switcher-icon"
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
      >
        <rect x="3" y="5" width="18" height="14" rx="2.4" />
        <circle cx="8.5" cy="10" r="1.35" />
        <path d="m4.8 17.2 4.4-4.4 3.2 3.1 2.8-2.8 4 4.1" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.background-switcher {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-inline-start: 0.35rem;
}

.background-switcher-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  min-width: 2.1rem;
  height: 2.1rem;
  padding: 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-control);
  color: var(--vp-c-text-mute);
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    color var(--vp-t-color),
    box-shadow var(--vp-t-transform),
    transform var(--vp-t-transform);
}

.background-switcher-trigger:hover {
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.background-switcher-icon {
  width: 1.05rem;
  height: 1.05rem;
  stroke: currentColor;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
}

@media (max-width: 719px) {
  .background-switcher {
    margin-inline-start: 0.08rem;
  }

  .background-switcher-trigger {
    width: 1.9rem;
    min-width: 1.9rem;
    height: 1.9rem;
  }

  .background-switcher-icon {
    width: 1.05rem;
    height: 1.05rem;
  }
}
</style>
