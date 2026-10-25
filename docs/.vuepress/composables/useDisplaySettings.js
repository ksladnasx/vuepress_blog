import { computed, ref, watch } from "vue";
import {
  getBackgroundCount,
  getBackgroundUrl,
  normalizeBackgroundIndex,
} from "../backgrounds.js";

const STORAGE_KEY = "xh-reading-background";
const BRIGHTNESS_KEY = "xh-page-brightness";
const COLOR_SCHEME_KEY = "vuepress-color-scheme";
const HOME_WALLPAPER_KEY = "xh-background-settings";

export const DEFAULT_BRIGHTNESS = 100;
export const MIN_BRIGHTNESS = 60;
export const MAX_BRIGHTNESS = 120;
const MOBILE_QUERY = "(max-width: 719px)";
export const FIXED_WALLPAPER = "fixed";
export const RANDOM_WALLPAPER = "random";
// 随机壁纸 API 地址；localStorage 中早期版本保存的其他域名 URL 一律视为失效
const RANDOM_WALLPAPER_ORIGIN = "https://www.loliapi.com/acg/";

const isValidRandomWallpaperUrl = (url) =>
  typeof url === "string" && url.startsWith(RANDOM_WALLPAPER_ORIGIN);

export const readingBackgrounds = [
  { key: "default", label: "默认", name: "跟随系统", scheme: "auto" },
  { key: "paper", label: "纸页", name: "暖白纸张", scheme: "light" },
  { key: "green", label: "青雾", name: "柔和护眼", scheme: "light" },
  { key: "pearl", label: "珠光", name: "柔亮清餐", scheme: "light" },
  { key: "linen", label: "月白", name: "清亮书页", scheme: "light" },
  { key: "sakura", label: "樱粉", name: "粉樱暖纸", scheme: "light" },
  { key: "dusk", label: "暮蓝", name: "低光哑蓝", scheme: "dark" },
  { key: "ink", label: "墨色", name: "沉浸深度", scheme: "dark" },
  { key: "midnight", label: "夜航", name: "深邃蓝光", scheme: "dark" },
  { key: "graphite", label: "石墨灰", name: "中性深灰", scheme: "dark" },
  { key: "mocha", label: "摩卡", name: "暖调咖褐", scheme: "dark" },
  { key: "black", label: "纯黑", name: "OLED纯黑", scheme: "dark" },
];

// 模块级共享状态：全局引擎与设置页共用，改动即时生效
const currentKey = ref(readingBackgrounds[0].key);
const brightness = ref(DEFAULT_BRIGHTNESS);
export const modeToast = ref("");
const wallpaperMode = ref(FIXED_WALLPAPER);
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

let modeToastTimer = null;
let wallpaperMediaQuery = null;
let wallpaperMediaHandler = null;

export const currentBackground = computed(
  () =>
    readingBackgrounds.find(
      (background) => background.key === currentKey.value,
    ) ?? readingBackgrounds[0],
);

export const currentWallpaperTarget = computed(() =>
  isMobileWallpaper.value ? "mobile" : "desktop",
);

export const currentWallpaperModeLabel = computed(() =>
  wallpaperMode.value === RANDOM_WALLPAPER ? "随机壁纸" : "固定壁纸",
);

export const wallpaperSwitchLabel = computed(() =>
  isWallpaperLoading.value ? "切换中...." : "切换壁纸",
);

const normalizeKey = (key) =>
  readingBackgrounds.some((background) => background.key === key)
    ? key
    : readingBackgrounds[0].key;

export const normalizeBrightness = (value) => {
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
    desktop: isValidRandomWallpaperUrl(value.random?.desktop)
      ? value.random.desktop
      : "",
    mobile: isValidRandomWallpaperUrl(value.random?.mobile)
      ? value.random.mobile
      : "",
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

export const applyFixedWallpapers = () => {
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

// 接口每次请求直接返回一张随机图片；追加一次性参数避免浏览器缓存命中同一张图，
// 保证「切换壁纸」每次都能取到新图，且预加载与 CSS 应用请求的是同一张
const createRandomWallpaperUrl = (target) => {
  const base =
    target === "mobile"
      ? "https://www.loliapi.com/acg/pe/"
      : "https://www.loliapi.com/acg/pc/";

  return `${base}?_=${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
};

export const applyHomeWallpapers = () => {
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

export const preloadWallpaper = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Wallpaper request failed"));
    image.src = url;
  });

export const showToast = (message) => {
  clearModeToastTimer();
  modeToast.value = message;
  modeToastTimer = window.setTimeout(() => {
    modeToast.value = "";
    modeToastTimer = null;
  }, 2800);
};

export const clearModeToastTimer = () => {
  if (!modeToastTimer) return;

  window.clearTimeout(modeToastTimer);
  modeToastTimer = null;
};

export const restoreFixedWallpaper = (message) => {
  wallpaperMode.value = FIXED_WALLPAPER;
  applyFixedWallpapers();
  persistWallpaperSettings();
  showToast(message);
};

export const switchHomeWallpaper = async () => {
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
    showToast("壁纸已切换，首页生效。");
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
    showToast("随机壁纸已更新，首页生效。");
  } catch {
    restoreFixedWallpaper("随机壁纸请求失败，回退为固定壁纸。");
  } finally {
    isWallpaperLoading.value = false;
  }
};

export const selectWallpaperMode = async (nextMode) => {
  const nextModeValue = normalizeWallpaperMode(nextMode);
  wallpaperMode.value = nextModeValue;

  if (nextModeValue === FIXED_WALLPAPER) {
    applyFixedWallpapers();
    persistWallpaperSettings();
    return;
  }

  await switchHomeWallpaper();
};

const getScheme = (key) =>
  readingBackgrounds.find(
    (background) => background.key === normalizeKey(key),
  )?.scheme ?? readingBackgrounds[0].scheme;

export const applyBrightness = (value) => {
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

export const resetBrightness = () => {
  applyBrightness(DEFAULT_BRIGHTNESS);
};

export const setColorMode = (scheme, isDarkMode, {
  notify = false,
  backgroundName = "",
} = {}) => {
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
    const modeName = scheme === "dark" ? "暗色" : "亮色";
    showToast(`为适应"${backgroundName}"背景，已自动切换到 ${modeName} 主题 。`);
  }
};

export const isCompatibleWithCurrentMode = (key, isDarkMode) => {
  const scheme = getScheme(key);
  if (scheme === "auto") return true;
  return scheme === (isDarkMode.value ? "dark" : "light");
};

export const clearReadingBackground = () => {
  if (typeof document !== "undefined") {
    document.documentElement.dataset.readingBg = readingBackgrounds[0].key;
  }
};

export const applyBackground = (
  key,
  isDarkMode,
  { syncColorMode = true, notifyModeSwitch = false } = {},
) => {
  const nextKey = normalizeKey(key);
  const nextBackground =
    readingBackgrounds.find(
      (background) => background.key === nextKey,
    ) ?? readingBackgrounds[0];

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
    setColorMode(nextBackground.scheme, isDarkMode, {
      backgroundName: nextBackground.label,
      notify: notifyModeSwitch,
    });
  }
};

export const chooseBackground = (key, isDarkMode) => {
  applyBackground(key, isDarkMode, { notifyModeSwitch: true });
};

export const resetDisplaySettings = (isDarkMode) => {
  applyBackground(readingBackgrounds[0].key, isDarkMode);
  resetBrightness();
};

/**
 * 全局引擎安装：读取本地存储、应用设置并注册路由/主题联动。
 * 由 SiteSettingsEngine 在各布局挂载时调用，返回清理函数。
 */
export const installDisplaySettingsEngine = ({
  isDarkMode,
  isReadingPage,
  isHomePage,
}) => {
  if (typeof window === "undefined") return null;

  let savedKey = readingBackgrounds[0].key;
  let savedBrightness = DEFAULT_BRIGHTNESS;

  try {
    savedKey = window.localStorage.getItem(STORAGE_KEY) || savedKey;
    savedBrightness =
      window.localStorage.getItem(BRIGHTNESS_KEY) || savedBrightness;
  } catch {
    savedKey = readingBackgrounds[0].key;
    savedBrightness = DEFAULT_BRIGHTNESS;
  }

  if (isReadingPage.value) {
    applyBackground(
      isCompatibleWithCurrentMode(savedKey, isDarkMode)
        ? savedKey
        : readingBackgrounds[0].key,
      isDarkMode,
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

  if (isHomePage.value) {
    applyHomeWallpapers();

    if (wallpaperMode.value === RANDOM_WALLPAPER) {
      const target = currentWallpaperTarget.value;
      const url = randomWallpapers.value[target];

      if (url) {
        preloadWallpaper(url).catch(() => {
          restoreFixedWallpaper("随机壁纸请求失败，回退为固定壁纸。");
        });
      } else {
        switchHomeWallpaper();
      }
    }
  }

  // 明暗模式变化时，若当前阅读背景与新模式不兼容（无论当前在哪个页面），
  // 自动重置为默认阅读背景并弹窗提示
  const stopDarkWatch = watch(isDarkMode, () => {
    if (!isCompatibleWithCurrentMode(currentKey.value, isDarkMode)) {
      const incompatibleBackground = currentBackground.value;
      applyBackground(readingBackgrounds[0].key, isDarkMode, {
        syncColorMode: false,
      });
      showToast(
        `“${incompatibleBackground.label}”不适配${isDarkMode.value ? "暗色" : "亮色"}模式，已切换为默认阅读背景。`,
      );
    }
  });

  const stopReadingWatch = watch(isReadingPage, (readingPage) => {
    if (readingPage) {
      applyBackground(
        isCompatibleWithCurrentMode(currentKey.value, isDarkMode)
          ? currentKey.value
          : readingBackgrounds[0].key,
        isDarkMode,
        { syncColorMode: false },
      );
    } else {
      clearReadingBackground();
    }
  });

  const stopHomeWatch = watch(isHomePage, (homePage) => {
    if (!homePage) return;

    applyHomeWallpapers();
  });

  return () => {
    clearModeToastTimer();
    wallpaperMediaQuery?.removeEventListener("change", wallpaperMediaHandler);
    wallpaperMediaQuery = null;
    wallpaperMediaHandler = null;
    stopDarkWatch();
    stopReadingWatch();
    stopHomeWatch();
  };
};

export const useDisplaySettings = () => ({
  readingBackgrounds,
  DEFAULT_BRIGHTNESS,
  MIN_BRIGHTNESS,
  MAX_BRIGHTNESS,
  FIXED_WALLPAPER,
  RANDOM_WALLPAPER,
  currentKey,
  currentBackground,
  brightness,
  modeToast,
  wallpaperMode,
  currentWallpaperModeLabel,
  wallpaperSwitchLabel,
  isWallpaperLoading,
  applyBrightness,
  resetBrightness,
  chooseBackground,
  resetDisplaySettings,
  selectWallpaperMode,
  switchHomeWallpaper,
});
