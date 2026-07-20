<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/useDarkMode.js";

const STORAGE_KEY = "xh-reading-background";
const COLOR_SCHEME_KEY = "vuepress-color-scheme";
const PANEL_EVENT = "xh-settings-panel-open";
const PANEL_NAME = "reading-background";

const backgrounds = [
  { key: "default", label: "默认", name: "跟随主题", scheme: "auto" },
  { key: "paper", label: "纸页", name: "暖白纸张", scheme: "light" },
  { key: "green", label: "青雾", name: "护眼阅读", scheme: "light" },
  { key: "pearl", label: "珠光", name: "柔亮清晨", scheme: "light" },
  { key: "linen", label: "月白", name: "清亮书页", scheme: "light" },
  { key: "dusk", label: "暮蓝", name: "低光夜读", scheme: "dark" },
  { key: "ink", label: "墨色", name: "沉浸深读", scheme: "dark" },
  { key: "midnight", label: "夜航", name: "深蓝低光", scheme: "dark" },
  { key: "graphite", label: "石墨", name: "中性深灰", scheme: "dark" },
  { key: "black", label: "极黑", name: "OLED 纯黑", scheme: "dark" },
];

const isOpen = ref(false);
const panelRef = ref(null);
const currentKey = ref(backgrounds[0].key);
const modeToast = ref("");
const isDarkMode = useDarkMode();
let modeToastTimer = null;

const currentBackground = computed(
  () =>
    backgrounds.find((background) => background.key === currentKey.value) ??
    backgrounds[0],
);

const normalizeKey = (key) =>
  backgrounds.some((background) => background.key === key)
    ? key
    : backgrounds[0].key;

const getScheme = (key) =>
  backgrounds.find((background) => background.key === normalizeKey(key))?.scheme ??
  backgrounds[0].scheme;

const clearModeToastTimer = () => {
  if (!modeToastTimer) return;

  window.clearTimeout(modeToastTimer);
  modeToastTimer = null;
};

const showModeToast = (scheme, backgroundName) => {
  const modeName = scheme === "dark" ? "暗色" : "亮色";

  clearModeToastTimer();
  modeToast.value = `已自动切换为${modeName}模式，以适配「${backgroundName}」阅读背景`;
  modeToastTimer = window.setTimeout(() => {
    modeToast.value = "";
    modeToastTimer = null;
  }, 2800);
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
    // Ignore storage errors in restricted browser modes.
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
    // Ignore storage errors in restricted browser modes.
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
  applyBackground(backgrounds[0].key);
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

watch(isDarkMode, () => {
  if (!isCompatibleWithCurrentMode(currentKey.value)) {
    applyBackground(backgrounds[0].key, { syncColorMode: false });
  }
});

onMounted(() => {
  let savedKey = backgrounds[0].key;

  try {
    savedKey = window.localStorage.getItem(STORAGE_KEY) || savedKey;
  } catch {
    savedKey = backgrounds[0].key;
  }

  applyBackground(savedKey, { notifyModeSwitch: true });

  document.addEventListener("click", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  document.addEventListener(PANEL_EVENT, handlePanelOpen);
});

onBeforeUnmount(() => {
  if (typeof document === "undefined") return;

  clearModeToastTimer();
  document.removeEventListener("click", handleDocumentClick);
  document.removeEventListener("keydown", handleKeydown);
  document.removeEventListener(PANEL_EVENT, handlePanelOpen);
});
</script>

<template>
  <div ref="panelRef" class="reading-background">
    <button
      class="reading-background-trigger"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      :aria-label="`阅读背景：${currentBackground.name}`"
      :title="`阅读背景：${currentBackground.name}`"
      @click.stop="togglePanel"
    >
      <span class="reading-mark" aria-hidden="true">阅</span>
      <span class="reading-current">{{ currentBackground.label }}</span>
    </button>

    <div
      v-if="isOpen"
      class="reading-background-panel"
      role="dialog"
      aria-label="阅读背景设置"
    >
      <div class="panel-head">
        <span class="panel-title">阅读背景</span>
        <button
          class="close-button"
          type="button"
          aria-label="关闭阅读背景设置"
          @click="closePanel"
        >
          ×
        </button>
      </div>

      <div class="reading-options">
        <button
          v-for="background in backgrounds"
          :key="background.key"
          class="reading-option"
          :class="[`theme-${background.key}`, { active: background.key === currentKey }]"
          type="button"
          @click="chooseBackground(background.key)"
        >
          <span class="reading-swatch" aria-hidden="true" />
          <span>
            <span class="reading-label">{{ background.label }}</span>
            <span class="reading-name">{{ background.name }}</span>
          </span>
        </button>
      </div>

      <button class="reset-button" type="button" @click="resetBackground">
        恢复默认
      </button>
    </div>

    <Transition name="reading-toast">
      <div
        v-if="modeToast"
        class="reading-mode-toast"
        role="status"
        aria-live="polite"
      >
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
  min-width: 4.1rem;
  padding: 0 0.62rem;
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
  font-size: 0.92rem;
  font-weight: 800;
}

.reading-current {
  min-width: 2rem;
  text-align: center;
}

.reading-background-panel {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
  width: min(17rem, calc(100vw - 1.5rem));
  padding: 0.72rem;
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

.reset-button {
  width: 100%;
  height: 1.85rem;
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
    width: 2.35rem;
    min-width: 2.35rem;
    padding: 0;
  }

  .reading-current {
    display: none;
  }

  .reading-background-panel {
    position: fixed;
    top: calc(var(--navbar-height) + 0.5rem);
    right: 0.75rem;
    left: auto;
    width: min(17rem, calc(100vw - 1.5rem));
  }

  .reading-mode-toast {
    right: 0.75rem;
    left: 0.75rem;
    max-width: none;
    padding: 0.66rem 0.78rem;
    font-size: 0.78rem;
  }
}

@media (max-width: 340px) {
  .reading-background-panel {
    right: 0.55rem;
    left: 0.55rem;
    width: auto;
  }
}
</style>
