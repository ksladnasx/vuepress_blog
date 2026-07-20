<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import {
  getBackgroundCount,
  getBackgroundUrl,
  normalizeBackgroundIndex,
} from "../backgrounds.js";

const STORAGE_KEY = "xh-background-settings";
const MOBILE_QUERY = "(max-width: 719px)";

const indexes = ref({
  desktop: 0,
  mobile: 0,
});
const isMobile = ref(false);
let mediaQuery = null;

const toCssUrl = (url) =>
  `url("${String(url).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;

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
  isMobile.value = Boolean(mediaQuery?.matches);
};

const switchBackground = () => {
  const mode = currentMode.value;
  const count = getBackgroundCount(mode);

  indexes.value = {
    ...indexes.value,
    [mode]: normalizeBackgroundIndex(indexes.value[mode] + 1, count),
  };
};

onMounted(() => {
  readSettings();

  mediaQuery = window.matchMedia(MOBILE_QUERY);
  updateMobileState();
  mediaQuery.addEventListener("change", updateMobileState);
  applyBackgrounds();
});

watch(
  indexes,
  () => {
    applyBackgrounds();
    persistSettings();
  },
  { deep: true },
);

onBeforeUnmount(() => {
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
