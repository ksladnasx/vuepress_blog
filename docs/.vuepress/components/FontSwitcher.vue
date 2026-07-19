<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const STORAGE_KEY = "xh-font-settings";
const LEGACY_FONT_KEY = "xh-font";

const fonts = [
  { key: "lxgw", label: "霞鹜", name: "霞鹜文楷" },
  { key: "simkai", label: "楷体", name: "华文楷体" },
  { key: "fangsong", label: "仿宋", name: "华文仿宋" },
  { key: "fzstk", label: "方舒", name: "方正舒体" },
];

const defaultSettings = {
  font: fonts[0].key,
  size: 20,
  lineHeight: 1.65,
  letterSpacing: 1,
  weight: 400,
  codeFont: false,
};

const isOpen = ref(false);
const panelRef = ref(null);
const settings = ref({ ...defaultSettings });

const currentFont = computed(
  () => fonts.find((font) => font.key === settings.value.font) ?? fonts[0],
);

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

const applySettings = (nextSettings) => {
  settings.value = normalizeSettings(nextSettings);

  if (typeof document !== "undefined") {
    const root = document.documentElement;

    root.dataset.font = settings.value.font;
    root.dataset.codeFont = settings.value.codeFont ? "custom" : "system";
    root.style.setProperty("--xh-font-size", `${settings.value.size}px`);
    root.style.setProperty("--xh-line-height", String(settings.value.lineHeight));
    root.style.setProperty(
      "--xh-letter-spacing",
      `${settings.value.letterSpacing}px`,
    );
    root.style.setProperty("--xh-font-weight", String(settings.value.weight));
    root.style.setProperty(
      "--xh-font-stroke",
      `${Math.max(0, (settings.value.weight - 400) / 900).toFixed(3)}px`,
    );
  }

  persistSettings();
};

const updateSetting = (key, value) => {
  applySettings({
    ...settings.value,
    [key]: value,
  });
};

const resetSettings = () => {
  applySettings(defaultSettings);
};

const togglePanel = () => {
  isOpen.value = !isOpen.value;
};

const closePanel = () => {
  isOpen.value = false;
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

  applySettings(savedSettings || defaultSettings);

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  if (typeof document === "undefined") return;

  document.removeEventListener("click", handleDocumentClick);
  document.removeEventListener("keydown", handleKeydown);
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

.reset-button:hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
}

@media (max-width: 719px) {
  .font-settings {
    margin-inline-start: 0.08rem;
  }

  .font-settings-trigger {
    width: 2.35rem;
    min-width: 2.35rem;
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
</style>
