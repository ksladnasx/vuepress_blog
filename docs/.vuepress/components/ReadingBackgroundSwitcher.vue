<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/useDarkMode.js";
import {
  getBackgroundCount,
  getBackgroundUrl,
  normalizeBackgroundIndex,
} from "../backgrounds.js";

const STORAGE_KEY = "xh-reading-background";
const BRIGHTNESS_KEY = "xh-page-brightness";
const COLOR_SCHEME_KEY = "vuepress-color-scheme";
const HOME_WALLPAPER_KEY = "xh-background-settings";
const PANEL_EVENT = "xh-settings-panel-open";
const PANEL_NAME = "reading-background";
const DEFAULT_BRIGHTNESS = 100;
const MIN_BRIGHTNESS = 60;
const MAX_BRIGHTNESS = 120;
const MOBILE_QUERY = "(max-width: 719px)";
const FIXED_WALLPAPER = "fixed";
const RANDOM_WALLPAPER = "random";

const backgrounds = [
  { key: "default", label: "默认", name: "跟随系统", scheme: "auto" },
  { key: "paper", label: "纸页", name: "暖白纸张", scheme: "light" },
  { key: "green", label: "青雾", name: "柔和护眼", scheme: "light" },
  { key: "pearl", label: "珠光", name: "柔亮清餐", scheme: "light" },
  { key: "linen", label: "月白", name: "清亮书页", scheme: "light" },
  { key: "dusk", label: "幕蓝", name: "低光哑蓝", scheme: "dark" },
  { key: "ink", label: "墨色", name: "沉浸深度", scheme: "dark" },
  { key: "midnight", label: "夜航", name: "深邃蓝光", scheme: "dark" },
  { key: "graphite", label: "石墨灰", name: "中性深灰", scheme: "dark" },
  { key: "black", label: "纯黑", name: "OLED纯黑", scheme: "dark" },
];

const props = defineProps({
  isReadingPage: Boolean,
  isHomePage: Boolean,
});

const isOpen = ref(false);
const panelRef = ref(null);
const currentKey = ref(backgrounds[0].key);
const brightness = ref(DEFAULT_BRIGHTNESS);
const modeToast = ref("");
const wallpaperMode = ref(FIXED_WALLPAPER);
const isWallpaperModeMenuOpen = ref(false);
const wallpaperIndexes = ref({
  desktop: 0,
  mobile: 0,
});
const randomWallpapers = ref({
  desktop: "",
  mobile: "",
});
const isWallpaperLoading = ref(false);
const isMobileWallpaper = ref(false);
const isDarkMode = useDarkMode();
const wallpaperModeShellRef = ref(null);

let modeToastTimer = null;
let wallpaperMediaQuery = null;
let wallpaperMediaHandler = null;

const currentBackground = computed(
  () =>
    backgrounds.find((background) => background.key === currentKey.value) ??
    backgrounds[0],
);

const currentModeLabel = computed(() => (isDarkMode.value ? "暗色" : "亮色"));
const currentColorMode = computed(() => (isDarkMode.value ? "dark" : "light"));
const triggerLabel = computed(() =>
  props.isReadingPage ? currentBackground.value.label : currentModeLabel.value,
);
const backgroundMeta = computed(() =>
  props.isReadingPage ? "当前阅读背景" : "当前主题配色",
);
const currentWallpaperTarget = computed(() =>
  isMobileWallpaper.value ? "mobile" : "desktop",
);
const currentWallpaperModeLabel = computed(() =>
  wallpaperMode.value === RANDOM_WALLPAPER
    ? "随机壁纸"
    : "固定壁纸",
);
const wallpaperSwitchLabel = computed(() =>
  isWallpaperLoading.value ? "切换中...." : "切换壁纸",
);
const wallpaperModeOptions = [
  {
    value: FIXED_WALLPAPER,
    label: "固定壁纸",
    description: "使用固定本地壁纸资源",
  },
  {
    value: RANDOM_WALLPAPER,
    label: "随机壁纸",
    description: "使用外部网络壁纸资源",
  },
];

const normalizeKey = (key) =>
  backgrounds.some((background) => background.key === key)
    ? key
    : backgrounds[0].key;

const normalizeBrightness = (value) => {
  const nextValue = Number(value);

  if (!Number.isFinite(nextValue)) return DEFAULT_BRIGHTNESS;

  return Math.min(MAX_BRIGHTNESS, Math.max(MIN_BRIGHTNESS, nextValue));
};

const normalizeWallpaperMode = (value) =>
  value === RANDOM_WALLPAPER ? RANDOM_WALLPAPER : FIXED_WALLPAPER;

const normalizeWallpaperIndexes = (value = {}) => ({
  desktop: normalizeBackgroundIndex(
    value.desktop,
    getBackgroundCount("desktop"),
  ),
  mobile: normalizeBackgroundIndex(value.mobile, getBackgroundCount("mobile")),
});

const normalizeWallpaperSettings = (value = {}) => ({
  mode: normalizeWallpaperMode(value.mode),
  indexes: normalizeWallpaperIndexes(value.indexes || value),
  random: {
    desktop:
      typeof value.random?.desktop === "string" ? value.random.desktop : "",
    mobile: typeof value.random?.mobile === "string" ? value.random.mobile : "",
  },
});

const toCssUrl = (url) =>
  `url("${String(url).replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;

const getHomeWallpaperVariableNames = (target) =>
  target === "mobile"
    ? ["--xh-home-bg-mobile", "--xh-home-bg-mobile-dark"]
    : ["--xh-home-bg-desktop", "--xh-home-bg-desktop-dark"];

const applyWallpaperUrl = (target, url) => {
  if (!url || typeof document === "undefined") return;

  getHomeWallpaperVariableNames(target).forEach((name) => {
    document.documentElement.style.setProperty(name, toCssUrl(url));
  });
};

const applyFixedWallpapers = () => {
  if (typeof document === "undefined") return;

  const root = document.documentElement;
  const desktopIndex = wallpaperIndexes.value.desktop;
  const mobileIndex = wallpaperIndexes.value.mobile;

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

const createRandomWallpaperUrl = (target) => {
  const max = target === "mobile" ? 2875 : 696;
  const index = Math.floor(Math.random() * max) + 1;

  return target === "mobile"
    ? `https://eo-img.iloli.love/i/pe/img${index}.webp`
    : `https://esa-img.loliapi.cn/i/pc/img${index}.webp`;
};

const applyHomeWallpapers = () => {
  applyFixedWallpapers();

  if (wallpaperMode.value !== RANDOM_WALLPAPER) return;

  Object.entries(randomWallpapers.value).forEach(([target, url]) => {
    applyWallpaperUrl(target, url);
  });
};

const persistWallpaperSettings = () => {
  try {
    window.localStorage.setItem(
      HOME_WALLPAPER_KEY,
      JSON.stringify({
        mode: wallpaperMode.value,
        indexes: wallpaperIndexes.value,
        random: randomWallpapers.value,
      }),
    );
  } catch {
    // Ignore storage errors.
  }
};

const readWallpaperSettings = () => {
  try {
    const saved = JSON.parse(
      window.localStorage.getItem(HOME_WALLPAPER_KEY) || "{}",
    );
    const settings = normalizeWallpaperSettings(saved);

    wallpaperMode.value = settings.mode;
    wallpaperIndexes.value = settings.indexes;
    randomWallpapers.value = settings.random;
  } catch {
    wallpaperMode.value = FIXED_WALLPAPER;
    wallpaperIndexes.value = normalizeWallpaperIndexes();
    randomWallpapers.value = { desktop: "", mobile: "" };
  }
};

const preloadWallpaper = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Wallpaper request failed"));
    image.src = url;
  });

const showToast = (message) => {
  clearModeToastTimer();
  modeToast.value = message;
  modeToastTimer = window.setTimeout(() => {
    modeToast.value = "";
    modeToastTimer = null;
  }, 2800);
};

const clearModeToastTimer = () => {
  if (!modeToastTimer) return;

  window.clearTimeout(modeToastTimer);
  modeToastTimer = null;
};

const closeWallpaperModeMenu = () => {
  isWallpaperModeMenuOpen.value = false;
};

const restoreFixedWallpaper = (message) => {
  wallpaperMode.value = FIXED_WALLPAPER;
  applyFixedWallpapers();
  persistWallpaperSettings();
  showToast(message);
};

const switchHomeWallpaper = async () => {
  if (isWallpaperLoading.value) return;

  const target = currentWallpaperTarget.value;

  if (wallpaperMode.value === FIXED_WALLPAPER) {
    const count = getBackgroundCount(target);
    wallpaperIndexes.value = {
      ...wallpaperIndexes.value,
      [target]: normalizeBackgroundIndex(
        wallpaperIndexes.value[target] + 1,
        count,
      ),
    };
    applyFixedWallpapers();
    persistWallpaperSettings();
    return;
  }

  isWallpaperLoading.value = true;
  const url = createRandomWallpaperUrl(target);

  try {
    await preloadWallpaper(url);
    randomWallpapers.value = {
      ...randomWallpapers.value,
      [target]: url,
    };
    applyHomeWallpapers();
    persistWallpaperSettings();
  } catch {
    restoreFixedWallpaper("Random wallpaper failed to load, switched back to fixed.");
  } finally {
    isWallpaperLoading.value = false;
  }
};

const selectWallpaperMode = async (nextMode) => {
  const nextModeValue = normalizeWallpaperMode(nextMode);
  wallpaperMode.value = nextModeValue;
  closeWallpaperModeMenu();

  if (nextModeValue === FIXED_WALLPAPER) {
    applyFixedWallpapers();
    persistWallpaperSettings();
    return;
  }

  await switchHomeWallpaper();
};

const toggleWallpaperModeMenu = () => {
  isWallpaperModeMenuOpen.value = !isWallpaperModeMenuOpen.value;
};

const getScheme = (key) =>
  backgrounds.find((background) => background.key === normalizeKey(key))?.scheme ??
  backgrounds[0].scheme;

const applyBrightness = (value) => {
  const nextBrightness = normalizeBrightness(value);
  brightness.value = nextBrightness;

  if (typeof document !== "undefined") {
    const overlayColor = nextBrightness > 100 ? "255 255 255" : "0 0 0";
    const overlayOpacity =
      nextBrightness === DEFAULT_BRIGHTNESS
        ? 0
        : Math.abs(nextBrightness - DEFAULT_BRIGHTNESS) / 100;

    document.documentElement.style.setProperty(
      "--xh-page-brightness-overlay-color",
      overlayColor,
    );
    document.documentElement.style.setProperty(
      "--xh-page-brightness-overlay-opacity",
      String(overlayOpacity),
    );
  }

  try {
    window.localStorage.setItem(BRIGHTNESS_KEY, String(nextBrightness));
  } catch {
    // Ignore storage errors.
  }
};

const resetBrightness = () => {
  applyBrightness(DEFAULT_BRIGHTNESS);
};

const showModeToast = (scheme, backgroundName) => {
  const modeName = scheme === "dark" ? "Dark" : "Light";
  showToast(`Switched to ${modeName} mode for "${backgroundName}".`);
};

const setColorMode = (scheme, { notify = false, backgroundName = "" } = {}) => {
  if (scheme === "auto") return;

  const shouldUseDark = scheme === "dark";
  const hasModeChanged = isDarkMode.value !== shouldUseDark;
  isDarkMode.value = shouldUseDark;

  if (typeof document !== "undefined") {
    document.documentElement.dataset.theme = scheme;
  }

  try {
    window.localStorage.setItem(COLOR_SCHEME_KEY, scheme);
  } catch {
    // Ignore storage errors.
  }

  if (notify && hasModeChanged) {
    showModeToast(scheme, backgroundName);
  }
};

const isCompatibleWithCurrentMode = (key) => {
  const scheme = getScheme(key);
  if (scheme === "auto") return true;
  return scheme === (isDarkMode.value ? "dark" : "light");
};

const clearReadingBackground = () => {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.readingBg = backgrounds[0].key;
  }
};

const applyBackground = (
  key,
  { syncColorMode = true, notifyModeSwitch = false } = {},
) => {
  const nextKey = normalizeKey(key);
  const nextBackground =
    backgrounds.find((background) => background.key === nextKey) ??
    backgrounds[0];

  currentKey.value = nextKey;

  if (typeof document !== "undefined") {
    document.documentElement.dataset.readingBg = nextKey;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, nextKey);
  } catch {
    // Ignore storage errors.
  }

  if (syncColorMode) {
    setColorMode(nextBackground.scheme, {
      backgroundName: nextBackground.label,
      notify: notifyModeSwitch,
    });
  }
};

const chooseBackground = (key) => {
  applyBackground(key, { notifyModeSwitch: true });
};

const resetBackground = () => {
  if (props.isReadingPage) {
    applyBackground(backgrounds[0].key);
  }

  resetBrightness();
};

const notifyPanelOpen = () => {
  if (typeof document === "undefined") return;

  document.dispatchEvent(
    new CustomEvent(PANEL_EVENT, {
      detail: PANEL_NAME,
    }),
  );
};

const togglePanel = () => {
  const nextOpen = !isOpen.value;
  isOpen.value = nextOpen;

  if (nextOpen) {
    notifyPanelOpen();
  } else {
    closeWallpaperModeMenu();
  }
};

const closePanel = () => {
  isOpen.value = false;
  closeWallpaperModeMenu();
};

const handlePanelOpen = (event) => {
  if (event.detail !== PANEL_NAME) {
    closePanel();
  }
};

const handleDocumentClick = (event) => {
  if (
    isWallpaperModeMenuOpen.value &&
    !wallpaperModeShellRef.value?.contains(event.target)
  ) {
    closeWallpaperModeMenu();
  }

  if (!panelRef.value?.contains(event.target)) {
    closePanel();
  }
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closePanel();
  }
};

watch(isDarkMode, () => {
  if (props.isReadingPage && !isCompatibleWithCurrentMode(currentKey.value)) {
    applyBackground(backgrounds[0].key, { syncColorMode: false });
  }
});

watch(
  () => props.isReadingPage,
  (isReadingPage) => {
    if (isReadingPage) {
      applyBackground(
        isCompatibleWithCurrentMode(currentKey.value)
          ? currentKey.value
          : backgrounds[0].key,
        { syncColorMode: false },
      );
    } else {
      clearReadingBackground();
    }
  },
);

watch(
  () => props.isHomePage,
  (isHomePage) => {
    if (!isHomePage) return;

    applyHomeWallpapers();
  },
);

onMounted(() => {
  let savedKey = backgrounds[0].key;
  let savedBrightness = DEFAULT_BRIGHTNESS;

  try {
    savedKey = window.localStorage.getItem(STORAGE_KEY) || savedKey;
    savedBrightness =
      window.localStorage.getItem(BRIGHTNESS_KEY) || savedBrightness;
  } catch {
    savedKey = backgrounds[0].key;
    savedBrightness = DEFAULT_BRIGHTNESS;
  }

  if (props.isReadingPage) {
    applyBackground(
      isCompatibleWithCurrentMode(savedKey) ? savedKey : backgrounds[0].key,
      { syncColorMode: false },
    );
  } else {
    currentKey.value = normalizeKey(savedKey);
    clearReadingBackground();
  }

  applyBrightness(savedBrightness);
  readWallpaperSettings();

  wallpaperMediaQuery = window.matchMedia(MOBILE_QUERY);
  isMobileWallpaper.value = wallpaperMediaQuery.matches;

  wallpaperMediaHandler = (event) => {
    isMobileWallpaper.value = event.matches;

    if (wallpaperMode.value === RANDOM_WALLPAPER) {
      const target = event.matches ? "mobile" : "desktop";

      if (!randomWallpapers.value[target]) {
        switchHomeWallpaper();
        return;
      }
    }

    applyHomeWallpapers();
  };

  wallpaperMediaQuery.addEventListener("change", wallpaperMediaHandler);

  if (props.isHomePage) {
    applyHomeWallpapers();

    if (wallpaperMode.value === RANDOM_WALLPAPER) {
      const target = currentWallpaperTarget.value;
      const url = randomWallpapers.value[target];

      if (url) {
        preloadWallpaper(url).catch(() => {
          restoreFixedWallpaper("Random wallpaper failed to load, switched back to fixed.");
        });
      } else {
        switchHomeWallpaper();
      }
    }
  }

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener(PANEL_EVENT, handlePanelOpen);
});

onBeforeUnmount(() => {
  if (typeof document === "undefined") return;

  clearModeToastTimer();
  wallpaperMediaQuery?.removeEventListener("change", wallpaperMediaHandler);
  document.removeEventListener("click", handleDocumentClick);
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener(PANEL_EVENT, handlePanelOpen);
});
</script>

<template>
  <div ref="panelRef" class="reading-background">
    <button class="reading-background-trigger" type="button" :aria-expanded="isOpen" aria-haspopup="dialog"
      :aria-label="`显示设置: ${triggerLabel}`" :title="`${backgroundMeta}: ${triggerLabel}`" @click.stop="togglePanel">
      <span class="reading-mark" aria-hidden="true">显</span>
      <span class="reading-current">{{ triggerLabel }}</span>
    </button>

    <div v-if="isOpen" class="reading-background-panel" role="dialog" aria-label="显示设置">
      <div class="panel-head panel-head-root">
        <span class="panel-title panel-title-root">显示设置</span>
        <button class="close-button" type="button" aria-label="Close 显示设置" @click="closePanel">
          &times;
        </button>
      </div>

      <div class="panel-head panel-head-section">
        <span class="panel-title panel-title-section">主题切换</span>
      </div>

      <div class="color-mode-options" aria-label="Light and dark mode">
        <button class="color-mode-option" :class="{ active: currentColorMode === 'light' }" type="button"
          @click="setColorMode('light')">
          亮色
        </button>
        <button class="color-mode-option" :class="{ active: currentColorMode === 'dark' }" type="button"
          @click="setColorMode('dark')">
          暗色
        </button>
      </div>

      <div v-if="isHomePage" class="panel-head panel-head-section">
        <span class="panel-title panel-title-section">首页壁纸</span>
      </div>
      <div v-if="isHomePage" class="wallpaper-control">
        <div ref="wallpaperModeShellRef" class="wallpaper-mode-shell">
          <button class="wallpaper-mode-button" type="button" aria-haspopup="menu"
            :aria-expanded="isWallpaperModeMenuOpen" aria-label="Home wallpaper mode"
            @click.stop="toggleWallpaperModeMenu">
            <span class="wallpaper-mode-copy">
              <span class="wallpaper-mode-label">{{ currentWallpaperModeLabel }}</span>
            </span>
            <svg class="wallpaper-mode-caret" aria-hidden="true" viewBox="0 0 16 16" fill="none">
              <path d="m4 6 4 4 4-4" />
            </svg>
          </button>
          <Transition name="wallpaper-mode-menu">
            <div v-if="isWallpaperModeMenuOpen" class="wallpaper-mode-menu" role="menu"
              aria-label="Wallpaper source options">
              <button v-for="option in wallpaperModeOptions" :key="option.value" class="wallpaper-mode-option"
                :class="{ active: wallpaperMode === option.value }" type="button" role="menuitemradio"
                :aria-checked="wallpaperMode === option.value" @click.stop="selectWallpaperMode(option.value)">
                <span class="wallpaper-mode-option-dot" aria-hidden="true" />
                <span class="wallpaper-mode-option-copy">
                  <span class="wallpaper-mode-option-label">{{ option.label }}</span>
                  <span class="wallpaper-mode-option-desc">{{ option.description }}</span>
                </span>
              </button>
            </div>
          </Transition>
        </div>
        <button class="wallpaper-switch-button" type="button" :disabled="isWallpaperLoading"
          @click="switchHomeWallpaper">
          {{ wallpaperSwitchLabel }}
        </button>
      </div>

      <div v-if="isReadingPage" class="panel-head">
        <span class="panel-title panel-title-section">阅读背景</span>
      </div>
      <div v-if="isReadingPage" class="reading-options">
        <button v-for="background in backgrounds" :key="background.key" class="reading-option"
          :class="[`theme-${background.key}`, { active: background.key === currentKey }]" type="button"
          @click="chooseBackground(background.key)">
          <span class="reading-swatch" aria-hidden="true" />
          <span>
            <span class="reading-label">{{ background.label }}</span>
            <span class="reading-name">{{ background.name }}</span>
          </span>
        </button>
      </div>

      <div class="reading-brightness-control">
        <div class="brightness-head">
          <span class="brightness-label">页面亮度</span>
          <span class="brightness-value">{{ brightness }}%</span>
        </div>
        <input class="brightness-slider" type="range" :min="MIN_BRIGHTNESS" :max="MAX_BRIGHTNESS" step="5"
          :value="brightness" aria-label="Page brightness" @input="applyBrightness($event.target.value)" />
      </div>

      <button class="reset-button" type="button" @click="resetBackground">
        恢复默认
      </button>
    </div>

    <Transition name="reading-toast">
      <div v-if="modeToast" class="reading-mode-toast" role="status" aria-live="polite">
        {{ modeToast }}
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.reading-background {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-inline-start: 0.35rem;
  font-family: var(--xh-font-family);
}

.reading-background-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 2rem;
  min-width: 4.4rem;
  padding: 0 0.65rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-control);
  color: var(--vp-c-text);
  font: inherit;
  font-size: 0.86rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform);
}

.reading-background-trigger:hover,
.reading-background-trigger[aria-expanded="true"] {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.reading-mark {
  font-size: 0.9rem;
  font-weight: 800;
}

.reading-current {
  min-width: 2.2rem;
  text-align: center;
}

.reading-background-panel {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
  width: min(19rem, calc(100vw - 1.5rem));
  padding: 0.75rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text);
  box-shadow: 0 14px 34px var(--vp-c-shadow);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.55rem;
}

.panel-title {
  font-size: 0.88rem;
  font-weight: 760;
}

.panel-head-root {
  margin-bottom: 0.7rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.panel-title-root {
  font-size: 1rem;
  font-weight: 800;
}

.panel-head-section {
  margin-top: 0.45rem;
  margin-bottom: 0.42rem;
}

.panel-title-section {
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--vp-c-text-mute);
}

.close-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-mute);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}

.close-button:hover {
  background: var(--vp-c-control);
  color: var(--vp-c-text);
}

.color-mode-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.42rem;
  margin-bottom: 0.55rem;
}

.color-mode-option {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 720;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform);
}

.color-mode-option:hover,
.color-mode-option.active {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.wallpaper-control {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
  gap: 0.5rem;
  margin-bottom: 0.55rem;
}

.wallpaper-mode-shell {
  position: relative;
  min-width: 0;
}

.wallpaper-mode-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.72rem;
  width: 100%;
  min-width: 0;
  height: 2.2rem;
  padding: 0 0.72rem 0 0.82rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: linear-gradient(180deg, var(--vp-c-bg) 0%, var(--vp-c-bg-soft) 100%);
  color: var(--vp-c-text);
  font: inherit;
  font-size: 0.82rem;
  font-weight: 720;
  line-height: 1;
  cursor: pointer;
  text-align: left;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 30%);
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform);
}

.wallpaper-mode-button:hover,
.wallpaper-mode-button[aria-expanded="true"] {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.wallpaper-mode-button:focus-visible,
.wallpaper-mode-option:focus-visible,
.wallpaper-switch-button:focus-visible {
  outline: 2px solid var(--vp-c-accent);
  outline-offset: 2px;
}

.wallpaper-mode-caret {
  width: 0.9rem;
  height: 0.9rem;
  flex: 0 0 auto;
  stroke: var(--vp-c-text-mute);
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 1.8;
  pointer-events: none;
}

.wallpaper-mode-button[aria-expanded="true"] .wallpaper-mode-caret {
  stroke: currentColor;
  transform: rotate(180deg);
}

.wallpaper-mode-copy {
  display: grid;
  min-width: 0;
  gap: 0.12rem;
}

.wallpaper-mode-label {
  overflow: hidden;
  font-size: 0.82rem;
  font-weight: 760;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wallpaper-mode-subtitle {
  overflow: hidden;
  color: var(--vp-c-text-mute);
  font-size: 0.64rem;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wallpaper-mode-menu {
  position: absolute;
  top: calc(100% + 0.38rem);
  right: 0;
  left: 0;
  z-index: 10;
  padding: 0.28rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 96%, transparent);
  box-shadow: 0 18px 42px var(--vp-c-shadow);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
}

.wallpaper-mode-option {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.55rem;
  align-items: start;
  width: 100%;
  padding: 0.5rem 0.55rem;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--vp-c-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform);
}

.wallpaper-mode-option:hover,
.wallpaper-mode-option.active {
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.wallpaper-mode-option-dot {
  width: 0.7rem;
  height: 0.7rem;
  margin-top: 0.18rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: var(--vp-c-bg);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 40%);
}

.wallpaper-mode-option.active .wallpaper-mode-option-dot {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent);
  box-shadow: 0 0 0 3px rgb(39 132 95 / 14%);
}

.wallpaper-mode-option-copy {
  display: grid;
  min-width: 0;
  gap: 0.08rem;
}

.wallpaper-mode-option-label {
  overflow: hidden;
  font-size: 0.78rem;
  font-weight: 760;
  line-height: 1.15;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wallpaper-mode-option-desc {
  overflow: hidden;
  color: var(--vp-c-text-mute);
  font-size: 0.62rem;
  line-height: 1.12;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.wallpaper-mode-menu-enter-active,
.wallpaper-mode-menu-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}

.wallpaper-mode-menu-enter-from,
.wallpaper-mode-menu-leave-to {
  opacity: 0;
  transform: translateY(-0.28rem);
}

.wallpaper-switch-button {
  min-width: 5rem;
  height: 2.2rem;
  padding: 0 0.85rem;
  border: 1px solid var(--vp-c-accent);
  border-radius: 8px;
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  font-weight: 760;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform),
    box-shadow var(--vp-t-transform);
}

.wallpaper-switch-button:hover:not(:disabled) {
  background: color-mix(in srgb, var(--vp-c-accent-soft) 78%, var(--vp-c-bg));
  box-shadow: 0 10px 22px rgb(39 132 95 / 12%);
  transform: translateY(-1px);
}

.wallpaper-switch-button:disabled {
  cursor: wait;
  opacity: 0.68;
}

.reading-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.42rem;
}

.reading-option {
  display: grid;
  grid-template-columns: 1.7rem minmax(0, 1fr);
  gap: 0.45rem;
  align-items: center;
  min-height: 2.42rem;
  padding: 0.34rem 0.42rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform);
}

.reading-option:hover,
.reading-option.active {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.reading-swatch {
  width: 1.55rem;
  height: 1.55rem;
  border: 1px solid rgb(0 0 0 / 10%);
  border-radius: 7px;
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 28%);
}

.theme-default .reading-swatch {
  background: linear-gradient(135deg, var(--vp-c-bg), var(--vp-c-bg-alt));
}

.theme-paper .reading-swatch {
  background: linear-gradient(135deg, #fff9ea, #f3dfb8);
}

.theme-green .reading-swatch {
  background: linear-gradient(135deg, #e5f6dc, #b8d7b2);
}

.theme-pearl .reading-swatch {
  background: linear-gradient(135deg, #f8fbff, #dbe8ff 55%, #f5dedb);
}

.theme-linen .reading-swatch {
  background: linear-gradient(135deg, #fffef4, #e8ead8 55%, #d9dfca);
}

.theme-dusk .reading-swatch {
  background: linear-gradient(135deg, #1c3144, #3a496d 54%, #684c6a);
}

.theme-ink .reading-swatch {
  background: linear-gradient(135deg, #172427, #243b38 52%, #243044);
}

.theme-midnight .reading-swatch {
  background: linear-gradient(135deg, #08111f, #13284d 55%, #171b3a);
}

.theme-graphite .reading-swatch {
  background: linear-gradient(135deg, #181818, #2b2b2b 55%, #3a3935);
}

.theme-black .reading-swatch {
  background: linear-gradient(135deg, #000, #050505 62%, #111);
}

.reading-label {
  display: block;
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: 760;
  line-height: 1.18;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reading-name {
  display: block;
  margin-top: 0.12rem;
  color: var(--vp-c-text-mute);
  overflow: hidden;
  font-size: 0.66rem;
  line-height: 1.18;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reading-option.active .reading-name {
  color: inherit;
}

.reading-brightness-control {
  margin-top: 0.62rem;
  padding: 0.58rem 0.62rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-bg);
}

.brightness-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.42rem;
}

.brightness-label,
.brightness-value {
  font-size: 0.76rem;
  line-height: 1.25;
}

.brightness-label {
  color: var(--vp-c-text);
  font-weight: 720;
}

.brightness-value {
  color: var(--vp-c-text-mute);
  font-variant-numeric: tabular-nums;
}

.brightness-slider {
  display: block;
  width: 100%;
  accent-color: var(--vp-c-accent);
  cursor: pointer;
}

.reset-button {
  width: 100%;
  height: 1.9rem;
  margin-top: 0.62rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
}

.reset-button:hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
}

.reading-mode-toast {
  position: fixed;
  top: calc(var(--navbar-height) + 0.75rem);
  right: 1rem;
  z-index: 1200;
  box-sizing: border-box;
  max-width: min(22rem, calc(100vw - 2rem));
  padding: 0.72rem 0.9rem;
  border: 1px solid rgb(var(--xh-accent-rgb) / 24%);
  border-radius: 8px;
  background: color-mix(in srgb, var(--vp-c-bg-elv) 88%, transparent);
  color: var(--vp-c-text);
  box-shadow: 0 16px 38px var(--vp-c-shadow);
  font-size: 0.84rem;
  line-height: 1.45;
  backdrop-filter: blur(16px) saturate(1.12);
  -webkit-backdrop-filter: blur(16px) saturate(1.12);
}

.reading-toast-enter-active,
.reading-toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.reading-toast-enter-from,
.reading-toast-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}

@media (max-width: 719px) {
  .reading-background {
    margin-inline-start: 0.08rem;
  }

  .reading-background-trigger {
    width: 2.15rem;
    min-width: 2.15rem;
    padding: 0;
  }

  .reading-current {
    display: none;
  }

  .reading-background-panel {
    position: fixed;
    top: calc(var(--navbar-height) + 0.4rem);
    right: 0.6rem;
    left: auto;
    width: min(15.5rem, calc(100vw - 1.2rem));
    padding: 0.6rem;
  }

  .panel-head-root {
    margin-bottom: 0.5rem;
    padding-bottom: 0.16rem;
  }

  .panel-title-root {
    font-size: 0.9rem;
  }

  .panel-head-section {
    margin-top: 0.34rem;
    margin-bottom: 0.32rem;
  }

  .panel-title-section {
    font-size: 0.72rem;
  }

  .color-mode-options {
    gap: 0.32rem;
    margin-bottom: 0.42rem;
  }

  .color-mode-option {
    height: 1.78rem;
    font-size: 0.74rem;
  }

  .wallpaper-control {
    gap: 0.38rem;
    margin-bottom: 0.42rem;
  }

  .wallpaper-mode-button {
    height: 1.78rem;
    padding: 0 0.56rem 0 0.64rem;
    font-size: 0.74rem;
  }

  .wallpaper-mode-label {
    font-size: 0.7rem;
  }

  .wallpaper-mode-subtitle {
    display: none;
  }

  .wallpaper-mode-menu {
    top: calc(100% + 0.3rem);
    padding: 0.22rem;
  }

  .wallpaper-mode-option {
    gap: 0.42rem;
    padding: 0.44rem 0.48rem;
  }

  .wallpaper-mode-option-label {
    font-size: 0.69rem;
  }

  .wallpaper-mode-option-desc {
    font-size: 0.56rem;
  }

  .wallpaper-mode-caret {
    width: 0.8rem;
    height: 0.8rem;
  }

  .wallpaper-switch-button {
    min-width: 4.6rem;
    height: 1.78rem;
    padding: 0 0.54rem;
    font-size: 0.72rem;
  }

  .reading-options {
    gap: 0.32rem;
  }

  .reading-option {
    min-height: 2.08rem;
    padding: 0.28rem 0.34rem;
    gap: 0.36rem;
  }

  .reading-swatch {
    width: 1.38rem;
    height: 1.38rem;
  }

  .reading-label {
    font-size: 0.72rem;
  }

  .reading-name {
    font-size: 0.58rem;
  }

  .reading-brightness-control {
    margin-top: 0.45rem;
    padding: 0.46rem 0.5rem;
  }

  .brightness-head {
    margin-bottom: 0.28rem;
  }

  .brightness-label,
  .brightness-value {
    font-size: 0.68rem;
  }

  .reset-button {
    height: 1.68rem;
    margin-top: 0.45rem;
    font-size: 0.72rem;
  }

  .reading-mode-toast {
    right: 0.6rem;
    left: 0.6rem;
    max-width: none;
    padding: 0.58rem 0.68rem;
    font-size: 0.72rem;
  }
}

@media (max-width: 340px) {
  .reading-background-panel {
    right: 0.45rem;
    left: 0.45rem;
    width: auto;
  }
}
</style>
