import { computed, ref } from "vue";

const STORAGE_KEY = "xh-font-settings";
const LEGACY_FONT_KEY = "xh-font";

export const fonts = [
  { key: "system", label: "系统", name: "系统字体" },
  { key: "lxgw", label: "霞鹜", name: "霞鹜文楷" },
  { key: "simkai", label: "楷体", name: "华文楷体" },
  { key: "fangsong", label: "仿宋", name: "华文仿宋" },
  { key: "fzstk", label: "汉舒", name: "汉仪舒体" },
  { key: "hypixel", label: "像素", name: "汉仪像素" },
  { key: "maoken", label: "圆珠", name: "猫啃圆珠" },
  { key: "qingfeng", label: "清风", name: "清风手体" },
];

const customFontFaces = {
  lxgw: {
    family: "XH LXGW WenKai",
    source:
      'local("LXGW WenKai"), url("/fonts/LXGWWENKAI-REGULAR.woff2") format("woff2")',
  },
  simkai: {
    family: "XH SimKai",
    source:
      'local("KaiTi"), local("STKaiti"), url("/fonts/SIMKAI.woff2") format("woff2")',
  },
  fangsong: {
    family: "XH FangSong",
    source:
      'local("FangSong"), local("STFangsong"), url("/fonts/STFANGSO.woff2") format("woff2")',
  },
  fzstk: {
    family: "XH FZSTK",
    source:
      'local("FZShuTi"), local("FZSTK"), url("/fonts/FZSTK.woff2") format("woff2")',
  },
  hypixel: {
    family: "XH HYPixel 9px",
    source:
      'local("HYPixel9pxJ"), local("HYPixel 9pxJ"), url("/fonts/HYPixel9pxJ-2.woff2") format("woff2")',
  },
  maoken: {
    family: "XH MaoKen ZhuYuan",
    source:
      'local("MaoKen ZhuYuanTi"), local("MaokenZhuyuanTi"), url("/fonts/MaoKenZhuYuanTi-MaokenZhuyuanTi-2.woff2") format("woff2")',
  },
  qingfeng: {
    family: "XH QingFeng ShouXie",
    source:
      'local("KaiXinJiuXiaoLinYuJiuZou"), url("/fonts/KaiXinJiuXiaoLinYuJiuZou-2.woff2") format("woff2")',
  },
};

const FONT_STYLE_ID = "xh-lazy-font-faces";
const loadedFontKeys = new Set();
const loadingFontFaces = new Map();
let pendingFontLoad = null;
let themeObserver = null;
let initialized = false;

export const defaultFontSettings = {
  font: "system",
  size: 20,
  lineHeight: 1.65,
  letterSpacing: 1,
  weight: 400,
  color: "",
  codeFont: true,
};

// 模块级共享状态：导航栏引擎与设置页共用同一份数据，改动即时生效
const settings = ref({ ...defaultFontSettings });
const pendingColor = ref("");
const activeDefaultColor = ref("#24312b");

export const currentFont = computed(
  () => fonts.find((font) => font.key === settings.value.font) ?? fonts[0],
);

export const colorPickerValue = computed(
  () => pendingColor.value || settings.value.color || activeDefaultColor.value,
);

const isHexColor = (value) =>
  typeof value === "string" && /^#[\da-f]{6}$/i.test(value);

const rgbToHex = (value) => {
  const channels = String(value).match(/\d+(\.\d+)?/g);

  if (!channels || channels.length < 3) return "";

  return `#${channels
    .slice(0, 3)
    .map((channel) =>
      Math.round(Number(channel))
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
};

const updateActiveDefaultColor = () => {
  if (typeof window === "undefined") return;

  const value = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--vp-c-text")
    .trim();

  activeDefaultColor.value = isHexColor(value) ? value : rgbToHex(value) || "#24312b";
};

const normalizeSettings = (value) => {
  const next = { ...defaultFontSettings, ...(value || {}) };

  if (!fonts.some((font) => font.key === next.font)) {
    next.font = defaultFontSettings.font;
  }

  next.size = Number.isFinite(Number(next.size))
    ? Math.min(30, Math.max(14, Number(next.size)))
    : defaultFontSettings.size;
  next.lineHeight = Number.isFinite(Number(next.lineHeight))
    ? Math.min(2, Math.max(1.4, Number(next.lineHeight)))
    : defaultFontSettings.lineHeight;
  next.letterSpacing = Number.isFinite(Number(next.letterSpacing))
    ? Math.min(2, Math.max(0, Number(next.letterSpacing)))
    : defaultFontSettings.letterSpacing;
  next.weight = Number.isFinite(Number(next.weight))
    ? Math.min(700, Math.max(300, Number(next.weight)))
    : defaultFontSettings.weight;
  next.color = isHexColor(next.color) ? next.color : defaultFontSettings.color;
  next.codeFont = Boolean(next.codeFont);

  return next;
};

const persistSettings = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value));
    window.localStorage.setItem(LEGACY_FONT_KEY, settings.value.font);
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
};

const getFontFaceRule = (fontKey) => {
  const fontFace = customFontFaces[fontKey];
  if (!fontFace) return "";

  return `@font-face{font-family:"${fontFace.family}";src:${fontFace.source};font-display:swap;font-style:normal;font-weight:400;}`;
};

const injectFontFaceStyle = (fontKey) => {
  if (typeof document === "undefined") return;

  const rule = getFontFaceRule(fontKey);
  if (!rule) return;

  let style = document.getElementById(FONT_STYLE_ID);

  if (!style) {
    style = document.createElement("style");
    style.id = FONT_STYLE_ID;
    document.head.appendChild(style);
  }

  if (
    !style.textContent.includes(
      `font-family:"${customFontFaces[fontKey].family}"`,
    )
  ) {
    style.textContent += rule;
  }

  loadedFontKeys.add(fontKey);
};

const ensureFontFace = (fontKey) => {
  const fontFace = customFontFaces[fontKey];
  if (!fontFace || typeof document === "undefined") {
    return Promise.resolve();
  }

  if (loadedFontKeys.has(fontKey)) {
    return Promise.resolve();
  }

  if (loadingFontFaces.has(fontKey)) {
    return loadingFontFaces.get(fontKey);
  }

  if (typeof window.FontFace !== "function" || !document.fonts?.add) {
    injectFontFaceStyle(fontKey);
    return Promise.resolve();
  }

  let loader;

  try {
    loader = new window.FontFace(fontFace.family, fontFace.source, {
      display: "swap",
      style: "normal",
      weight: "400",
    });
  } catch {
    injectFontFaceStyle(fontKey);
    return Promise.resolve();
  }

  const promise = loader
    .load()
    .then((loadedFace) => {
      document.fonts.add(loadedFace);
      loadedFontKeys.add(fontKey);
    })
    .catch(() => {
      injectFontFaceStyle(fontKey);
    })
    .finally(() => {
      loadingFontFaces.delete(fontKey);
    });

  loadingFontFaces.set(fontKey, promise);
  return promise;
};

const cancelPendingFontLoad = () => {
  if (!pendingFontLoad || typeof window === "undefined") return;

  if (
    pendingFontLoad.type === "idle" &&
    typeof window.cancelIdleCallback === "function"
  ) {
    window.cancelIdleCallback(pendingFontLoad.id);
  } else {
    window.clearTimeout(pendingFontLoad.id);
  }

  pendingFontLoad = null;
};

const scheduleFontFaceLoad = (fontKey, defer) => {
  if (typeof window === "undefined") return;

  cancelPendingFontLoad();

  if (!customFontFaces[fontKey]) return;

  if (!defer) {
    ensureFontFace(fontKey);
    return;
  }

  const load = () => {
    pendingFontLoad = null;
    ensureFontFace(fontKey);
  };

  if (typeof window.requestIdleCallback === "function") {
    pendingFontLoad = {
      type: "idle",
      id: window.requestIdleCallback(load, { timeout: 2500 }),
    };
  } else {
    pendingFontLoad = {
      type: "timeout",
      id: window.setTimeout(load, 1200),
    };
  }
};

export const applyFontSettings = (nextSettings, options = {}) => {
  const { deferFontLoad = false } = options;

  settings.value = normalizeSettings(nextSettings);

  if (typeof document !== "undefined") {
    const root = document.documentElement;

    root.dataset.font = settings.value.font;
    root.dataset.codeFont = settings.value.codeFont ? "custom" : "system";
    root.dataset.fontColor = settings.value.color ? "custom" : "default";
    root.style.setProperty("--xh-font-size", `${settings.value.size}px`);
    root.style.setProperty("--xh-line-height", String(settings.value.lineHeight));
    root.style.setProperty(
      "--xh-letter-spacing",
      `${settings.value.letterSpacing}px`,
    );
    root.style.setProperty("--xh-font-weight", String(settings.value.weight));
    if (settings.value.color) {
      root.style.setProperty("--xh-font-color", settings.value.color);
      root.style.setProperty("--vp-c-text", settings.value.color);
      root.style.setProperty("--vp-c-text-mute", settings.value.color);
      root.style.setProperty("--vp-c-text-subtle", settings.value.color);
      root.style.setProperty("--vp-c-text-1", settings.value.color);
      root.style.setProperty("--vp-c-text-2", settings.value.color);
      root.style.setProperty("--vp-c-text-3", settings.value.color);
      root.style.setProperty("--xh-reading-text", settings.value.color);
      root.style.setProperty("--xh-reading-muted", settings.value.color);
    } else {
      root.style.removeProperty("--xh-font-color");
      root.style.removeProperty("--vp-c-text");
      root.style.removeProperty("--vp-c-text-mute");
      root.style.removeProperty("--vp-c-text-subtle");
      root.style.removeProperty("--vp-c-text-1");
      root.style.removeProperty("--vp-c-text-2");
      root.style.removeProperty("--vp-c-text-3");
      root.style.removeProperty("--xh-reading-text");
      root.style.removeProperty("--xh-reading-muted");
      updateActiveDefaultColor();
    }
    root.style.setProperty(
      "--xh-font-stroke",
      `${Math.max(0, (settings.value.weight - 400) / 900).toFixed(3)}px`,
    );

    scheduleFontFaceLoad(settings.value.font, deferFontLoad);
  }

  persistSettings();
};

export const updateFontSetting = (key, value) => {
  applyFontSettings({
    ...settings.value,
    [key]: value,
  });
};

export const updatePendingColor = (value) => {
  if (isHexColor(value)) {
    pendingColor.value = value;
  }
};

export const applyPendingColor = () => {
  const nextColor = pendingColor.value || settings.value.color;

  if (!isHexColor(nextColor)) return;

  pendingColor.value = "";
  updateFontSetting("color", nextColor);
};

export const resetFontColor = () => {
  pendingColor.value = "";
  updateFontSetting("color", "");
};

export const resetFontSettings = () => {
  pendingColor.value = "";
  applyFontSettings(defaultFontSettings);
};

// 由全局引擎在每个布局挂载时调用一次：读取本地存储并应用到 <html>
export const initFontSettings = () => {
  if (initialized || typeof window === "undefined") return;

  let savedSettings = null;

  try {
    const rawSettings = window.localStorage.getItem(STORAGE_KEY);
    const legacyFont = window.localStorage.getItem(LEGACY_FONT_KEY);

    savedSettings = rawSettings ? JSON.parse(rawSettings) : null;

    if (!savedSettings && legacyFont) {
      savedSettings = { font: legacyFont };
    }
  } catch {
    savedSettings = null;
  }

  initialized = true;
  applyFontSettings(savedSettings || defaultFontSettings, {
    deferFontLoad: true,
  });
  pendingColor.value = "";
  updateActiveDefaultColor();

  if (themeObserver) return;

  themeObserver = new MutationObserver(updateActiveDefaultColor);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class", "style"],
  });
};

export const useFontSettings = () => ({
  fonts,
  defaultFontSettings,
  settings,
  pendingColor,
  activeDefaultColor,
  currentFont,
  colorPickerValue,
  updateFontSetting,
  updatePendingColor,
  applyPendingColor,
  resetFontColor,
  resetFontSettings,
});
