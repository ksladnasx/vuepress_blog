<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const STORAGE_KEY = "xh-font-settings";
const LEGACY_FONT_KEY = "xh-font";
const PANEL_EVENT = "xh-settings-panel-open";
const PANEL_NAME = "font";

const fonts = [
  { key: "system", label: "系统", name: "系统字体" },
  { key: "lxgw", label: "霞鹜", name: "霞鹜文楷" },
  { key: "simkai", label: "楷体", name: "华文楷体" },
  { key: "fangsong", label: "仿宋", name: "华文仿宋" },
  { key: "fzstk", label: "方舒", name: "方正舒体" },
  { key: "qingfeng", label: "清风", name: "清风手体" },
];

const customFontFaces = {
  lxgw: {
    family: "XH LXGW WenKai",
    source:
      'local("LXGW WenKai"), url("/LXGWWENKAI-REGULAR.woff2") format("woff2")',
  },
  simkai: {
    family: "XH SimKai",
    source:
      'local("KaiTi"), local("STKaiti"), url("/SIMKAI.woff2") format("woff2")',
  },
  fangsong: {
    family: "XH FangSong",
    source:
      'local("FangSong"), local("STFangsong"), url("/STFANGSO.woff2") format("woff2")',
  },
  fzstk: {
    family: "XH FZSTK",
    source: 'local("FZShuTi"), local("FZSTK"), url("/FZSTK.woff2") format("woff2")',
  },
  qingfeng: {
    family: "XH QingFeng ShouXie",
    source:
      'local("KaiXinJiuXiaoLinYuJiuZou"), url("/KaiXinJiuXiaoLinYuJiuZou-2.woff2") format("woff2")',
  },
};

const FONT_STYLE_ID = "xh-lazy-font-faces";
const loadedFontKeys = new Set();
const loadingFontFaces = new Map();
let pendingFontLoad = null;
let themeObserver = null;

const defaultSettings = {
  font: "system",
  size: 20,
  lineHeight: 1.65,
  letterSpacing: 1,
  weight: 400,
  color: "",
  codeFont: true,
};

const isOpen = ref(false);
const panelRef = ref(null);
const activeDefaultColor = ref("#24312b");
const settings = ref({ ...defaultSettings });
const pendingColor = ref("");

const currentFont = computed(
  () => fonts.find((font) => font.key === settings.value.font) ?? fonts[0],
);
const colorPickerValue = computed(
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
  const next = { ...defaultSettings, ...(value || {}) };

  if (!fonts.some((font) => font.key === next.font)) {
    next.font = defaultSettings.font;
  }

  next.size = Number.isFinite(Number(next.size))
    ? Math.min(30, Math.max(14, Number(next.size)))
    : defaultSettings.size;
  next.lineHeight = Number.isFinite(Number(next.lineHeight))
    ? Math.min(2, Math.max(1.4, Number(next.lineHeight)))
    : defaultSettings.lineHeight;
  next.letterSpacing = Number.isFinite(Number(next.letterSpacing))
    ? Math.min(2, Math.max(0, Number(next.letterSpacing)))
    : defaultSettings.letterSpacing;
  next.weight = Number.isFinite(Number(next.weight))
    ? Math.min(700, Math.max(300, Number(next.weight)))
    : defaultSettings.weight;
  next.color = isHexColor(next.color) ? next.color : defaultSettings.color;
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

const applySettings = (nextSettings, options = {}) => {
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

const updateSetting = (key, value) => {
  applySettings({
    ...settings.value,
    [key]: value,
  });
};

const updatePendingColor = (value) => {
  if (isHexColor(value)) {
    pendingColor.value = value;
  }
};

const applyPendingColor = () => {
  const nextColor = pendingColor.value || settings.value.color;

  if (!isHexColor(nextColor)) return;

  pendingColor.value = "";
  updateSetting("color", nextColor);
};

const resetColor = () => {
  pendingColor.value = "";
  updateSetting("color", "");
};

const resetSettings = () => {
  pendingColor.value = "";
  applySettings(defaultSettings);
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
  }
};

const closePanel = () => {
  isOpen.value = false;
};

const handlePanelOpen = (event) => {
  if (event.detail !== PANEL_NAME) {
    closePanel();
  }
};

const handleDocumentClick = (event) => {
  if (!panelRef.value?.contains(event.target)) {
    closePanel();
  }
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closePanel();
  }
};

onMounted(() => {
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

  applySettings(savedSettings || defaultSettings, { deferFontLoad: true });
  pendingColor.value = "";
  updateActiveDefaultColor();

  themeObserver = new MutationObserver(updateActiveDefaultColor);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "class", "style"],
  });

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener(PANEL_EVENT, handlePanelOpen);
});

onBeforeUnmount(() => {
  if (typeof document === "undefined") return;

  cancelPendingFontLoad();
  themeObserver?.disconnect();
  themeObserver = null;
  document.removeEventListener("click", handleDocumentClick);
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener(PANEL_EVENT, handlePanelOpen);
});
</script>

<template>
  <div ref="panelRef" class="font-settings">
    <button
      class="font-settings-trigger"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      :aria-label="`字体设置，当前：${currentFont.name}`"
      :title="`字体设置，当前：${currentFont.name}`"
      @click.stop="togglePanel"
    >
      <span class="font-mark" aria-hidden="true">Aa</span>
      <span class="font-current">{{ currentFont.label }}</span>
    </button>

    <div v-if="isOpen" class="font-settings-panel" role="dialog" aria-label="字体设置">
      <div class="panel-head">
        <span class="panel-title">字体设置</span>
        <button class="close-button" type="button" aria-label="关闭字体设置" @click="closePanel">
          ×
        </button>
      </div>

      <div class="font-options" role="listbox" :aria-label="`当前字体：${currentFont.name}`">
        <button
          v-for="font in fonts"
          :key="font.key"
          class="font-option"
          :class="{ active: font.key === settings.font }"
          type="button"
          role="option"
          :aria-selected="font.key === settings.font"
          @click="updateSetting('font', font.key)"
        >
          <span class="font-option-label">{{ font.label }}</span>
          <span class="font-option-name">{{ font.name }}</span>
        </button>
      </div>

      <label class="setting-row">
        <span class="setting-label">字号</span>
        <input
          :value="settings.size"
          type="range"
          min="14"
          max="30"
          step="1"
          @input="updateSetting('size', Number($event.target.value))"
        />
        <span class="setting-value">{{ settings.size }}px</span>
      </label>

      <label class="setting-row">
        <span class="setting-label">行高</span>
        <input
          :value="settings.lineHeight"
          type="range"
          min="1.4"
          max="2"
          step="0.05"
          @input="updateSetting('lineHeight', Number($event.target.value))"
        />
        <span class="setting-value">{{ settings.lineHeight.toFixed(2) }}</span>
      </label>

      <label class="setting-row">
        <span class="setting-label">字距</span>
        <input
          :value="settings.letterSpacing"
          type="range"
          min="0"
          max="2"
          step="0.1"
          @input="updateSetting('letterSpacing', Number($event.target.value))"
        />
        <span class="setting-value">{{ settings.letterSpacing.toFixed(1) }}px</span>
      </label>

      <label class="setting-row">
        <span class="setting-label">字重</span>
        <input
          :value="settings.weight"
          type="range"
          min="300"
          max="700"
          step="100"
          @input="updateSetting('weight', Number($event.target.value))"
        />
        <span class="setting-value">{{ settings.weight }}</span>
      </label>

      <label class="setting-row color-setting-row">
        <span class="setting-label">颜色</span>
        <span class="color-control">
          <input
            :value="colorPickerValue"
            type="color"
            aria-label="选择字体颜色"
            @input="updatePendingColor($event.target.value)"
          />
          <span class="setting-value color-value">{{ pendingColor || settings.color || "默认" }}</span>
        </span>
        <button class="apply-button" type="button" @click="applyPendingColor">
          应用
        </button>
      </label>

      <div class="color-actions">
        <button
          v-if="settings.color || pendingColor"
          class="plain-button"
          type="button"
          @click="resetColor"
        >
          使用主题默认文字色
        </button>
      </div>

      <label class="setting-toggle">
        <span>
          <span class="setting-label">代码字体</span>
          <span class="setting-note">跟随正文</span>
        </span>
        <input
          :checked="settings.codeFont"
          type="checkbox"
          @change="updateSetting('codeFont', $event.target.checked)"
        />
      </label>

      <button class="reset-button" type="button" @click="resetSettings">
        恢复默认
      </button>
    </div>
  </div>
</template>

<style scoped>
.font-settings {
  position: relative;
  display: inline-flex;
  align-items: center;
  margin-inline-start: 0.5rem;
  font-family: var(--xh-font-family);
}

.font-settings-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 2rem;
  min-width: 4.25rem;
  padding: 0 0.65rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  font-size: 0.86rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color);
}

.font-settings-trigger:hover,
.font-settings-trigger[aria-expanded="true"] {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
}

.font-mark {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 0.95rem;
  font-weight: 700;
}

.font-current {
  min-width: 2.1rem;
  text-align: center;
}

.font-settings-panel {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
  width: min(19rem, calc(100vw - 2rem));
  padding: 0.9rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text);
  box-shadow: 0 12px 32px var(--vp-c-shadow);
  line-height: 1.4;
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.panel-title {
  font-size: 0.95rem;
  font-weight: 700;
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

.font-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.5rem;
  margin-bottom: 0.9rem;
}

.font-option {
  display: flex;
  min-width: 0;
  min-height: 3.1rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0.55rem 0.6rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color);
}

.font-option:hover,
.font-option.active {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
}

.font-option-label {
  font-size: 0.9rem;
  font-weight: 700;
}

.font-option-name {
  overflow: hidden;
  width: 100%;
  color: var(--vp-c-text-mute);
  font-size: 0.75rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.font-option.active .font-option-name {
  color: inherit;
}

.setting-row {
  display: grid;
  grid-template-columns: 2.6rem 1fr 3.2rem;
  gap: 0.65rem;
  align-items: center;
  margin-top: 0.7rem;
}

.setting-label {
  color: var(--vp-c-text);
  font-size: 0.85rem;
  font-weight: 600;
}

.setting-value {
  color: var(--vp-c-text-mute);
  font-size: 0.78rem;
  text-align: right;
}

.setting-row input[type="range"] {
  width: 100%;
  accent-color: var(--vp-c-accent);
}

.color-setting-row input[type="color"] {
  width: 2.4rem;
  height: 1.8rem;
  padding: 0.12rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  cursor: pointer;
}

.color-setting-row {
  grid-template-columns: 2.6rem minmax(0, 1fr) 3.2rem;
}

.color-control {
  display: inline-flex;
  min-width: 0;
  align-items: center;
  gap: 0.45rem;
}

.color-value {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.color-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.45rem;
  margin-top: 0.55rem;
}

.setting-toggle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.85rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--vp-c-border);
}

.setting-toggle input {
  width: 1.05rem;
  height: 1.05rem;
  accent-color: var(--vp-c-accent);
}

.setting-note {
  display: block;
  margin-top: 0.15rem;
  color: var(--vp-c-text-mute);
  font-size: 0.76rem;
}

.reset-button {
  width: 100%;
  height: 2rem;
  margin-top: 0.85rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  font-size: 0.85rem;
  cursor: pointer;
}

.plain-button {
  width: 100%;
  min-height: 1.9rem;
  border: 0;
  border-radius: 6px;
  background: var(--vp-c-control);
  color: var(--vp-c-text-mute);
  font: inherit;
  font-size: 0.8rem;
  cursor: pointer;
}

.apply-button {
  width: 100%;
  min-height: 1.9rem;
  border: 1px solid var(--vp-c-accent);
  border-radius: 6px;
  background: var(--vp-c-accent);
  color: var(--vp-c-accent-text, #fff);
  font: inherit;
  font-size: 0.84rem;
  font-weight: 700;
  cursor: pointer;
}

.apply-button:hover {
  border-color: var(--vp-c-accent-hover);
  background: var(--vp-c-accent-hover);
}

.plain-button:hover {
  color: var(--vp-c-accent);
}

.reset-button:hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
}

@media (max-width: 719px) {
  .font-settings {
    margin-inline-start: 0.08rem;
  }

  .font-settings-trigger {
    width: 1.35rem;
    min-width: 0.35rem;
    padding: 0;
  }

  .font-current {
    display: none;
  }

  .font-settings-panel {
    position: fixed;
    top: calc(var(--navbar-height) + 0.5rem);
    right: 0.75rem;
    left: 0.75rem;
    width: auto;
  }
}

@media (max-width: 719px) {
  .font-settings-panel {
    left: auto;
    right: 0.5rem;
    width: 230px;
    max-width: calc(100vw - 1rem);
    max-height: min(26rem, calc(100vh - var(--navbar-height) - 1rem));
    padding: 0.58rem;
    overflow-y: auto;
  }

  .panel-head {
    margin-bottom: 0.45rem;
  }

  .panel-title {
    font-size: 0.84rem;
  }

  .close-button {
    width: 1.45rem;
    height: 1.45rem;
    font-size: 0.95rem;
  }

  .font-options {
    gap: 0.35rem;
    margin-bottom: 0.55rem;
  }

  .font-option {
    min-height: 2.35rem;
    padding: 0.38rem 0.45rem;
  }

  .font-option-label {
    font-size: 0.78rem;
  }

  .font-option-name {
    font-size: 0.64rem;
  }

  .setting-row,
  .color-setting-row {
    grid-template-columns: 2.05rem minmax(0, 1fr) 2.55rem;
    gap: 0.36rem;
    margin-top: 0.45rem;
  }

  .setting-label {
    font-size: 0.74rem;
  }

  .setting-value {
    font-size: 0.66rem;
  }

  .color-control {
    gap: 0.28rem;
  }

  .color-setting-row input[type="color"] {
    width: 1.8rem;
    height: 1.45rem;
  }

  .apply-button {
    min-height: 1.55rem;
    font-size: 0.72rem;
  }

  .color-actions {
    margin-top: 0.35rem;
  }

  .setting-toggle {
    gap: 0.6rem;
    margin-top: 0.55rem;
    padding-top: 0.55rem;
  }

  .setting-toggle input {
    width: 0.9rem;
    height: 0.9rem;
  }

  .setting-note {
    font-size: 0.66rem;
  }

  .plain-button {
    min-height: 1.55rem;
    font-size: 0.7rem;
  }

  .reset-button {
    height: 1.65rem;
    margin-top: 0.55rem;
    font-size: 0.74rem;
  }
}
</style>
