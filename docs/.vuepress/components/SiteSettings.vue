<script setup>
import { computed } from "vue";
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/useDarkMode.js";
import { useFontSettings } from "../composables/useFontSettings.js";
import {
  useDisplaySettings,
  setColorMode as applyColorMode,
} from "../composables/useDisplaySettings.js";
import { useFeatureToggles } from "../composables/useFeatureToggles.js";

const isDarkMode = useDarkMode();

const {
  fonts,
  settings: fontSettings,
  currentFont,
  pendingColor,
  colorPickerValue,
  updateFontSetting,
  updatePendingColor,
  applyPendingColor,
  resetFontColor,
  resetFontSettings,
} = useFontSettings();

const {
  readingBackgrounds,
  DEFAULT_BRIGHTNESS,
  MIN_BRIGHTNESS,
  MAX_BRIGHTNESS,
  FIXED_WALLPAPER,
  RANDOM_WALLPAPER,
  currentKey: readingBgKey,
  brightness,
  wallpaperMode,
  wallpaperSwitchLabel,
  isWallpaperLoading,
  applyBrightness,
  chooseBackground,
  resetDisplaySettings,
  selectWallpaperMode,
  switchHomeWallpaper,
} = useDisplaySettings();

const {
  toggles: featureToggles,
  resetFeatureToggles,
  updateFeatureToggle,
} = useFeatureToggles();

const currentColorMode = computed(() => (isDarkMode.value ? "dark" : "light"));
const fontColorLabel = computed(
  () => pendingColor.value || fontSettings.value.color || "跟随主题",
);

const switchColorMode = (scheme) => applyColorMode(scheme, isDarkMode);
const chooseReadingBackground = (key) => chooseBackground(key, isDarkMode);
const resetDisplay = () => resetDisplaySettings(isDarkMode);

const resetAllSettings = () => {
  resetFontSettings();
  resetDisplaySettings(isDarkMode);
  resetFeatureToggles();
};
</script>

<template>
  <div class="site-settings">
    <header class="settings-header">
      <h1 class="settings-title">站点设置</h1>
      <p class="settings-subtitle">设置保存在本地浏览器，修改后即时生效。</p>
    </header>

    <!-- 模块：显示设置 -->
    <section class="settings-card" aria-labelledby="settings-display-heading">
      <header class="settings-card-head">
        <span class="settings-card-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <circle cx="12" cy="12" r="8.6" />
            <path d="M12 3.4a8.6 8.6 0 0 1 0 17.2z" fill="currentColor" stroke="none" />
          </svg>
        </span>
        <h2 id="settings-display-heading" class="settings-card-title">显示设置</h2>
      </header>

      <div class="settings-card-body">
        <div class="settings-row">
          <div class="settings-row-info">
            <span class="settings-row-label">主题模式</span>
          </div>
          <div class="segmented" role="group" aria-label="主题模式">
            <button
              class="segmented-option"
              :class="{ active: currentColorMode === 'light' }"
              type="button"
              @click="switchColorMode('light')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
                <circle cx="12" cy="12" r="4.2" />
                <path d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6" />
              </svg>
              亮色
            </button>
            <button
              class="segmented-option"
              :class="{ active: currentColorMode === 'dark' }"
              type="button"
              @click="switchColorMode('dark')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8z" />
              </svg>
              暗色
            </button>
          </div>
        </div>

        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">页面亮度</span>
          </div>
          <div class="slider-control">
            <span class="slider-bound">60%</span>
            <input
              type="range"
              :min="MIN_BRIGHTNESS"
              :max="MAX_BRIGHTNESS"
              step="5"
              :value="brightness"
              aria-label="页面亮度"
              @input="applyBrightness($event.target.value)"
            />
            <span class="slider-bound">120%</span>
            <span class="slider-value">{{ brightness }}%</span>
          </div>
        </div>

        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">首页壁纸</span>
            <span class="settings-row-note">仅首页生效</span>
          </div>
          <div class="wallpaper-actions">
            <div class="segmented" role="group" aria-label="首页壁纸来源">
              <button
                class="segmented-option"
                :class="{ active: wallpaperMode === FIXED_WALLPAPER }"
                type="button"
                @click="selectWallpaperMode(FIXED_WALLPAPER)"
              >
                固定壁纸
              </button>
              <button
                class="segmented-option"
                :class="{ active: wallpaperMode === RANDOM_WALLPAPER }"
                type="button"
                @click="selectWallpaperMode(RANDOM_WALLPAPER)"
              >
                随机壁纸
              </button>
            </div>
            <button
              class="solid-button"
              type="button"
              :disabled="isWallpaperLoading"
              @click="switchHomeWallpaper"
            >
              {{ wallpaperSwitchLabel }}
            </button>
          </div>
        </div>

        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">阅读背景</span>
            <span class="settings-row-note">仅文章阅读页生效</span>
          </div>
          <div class="background-grid" role="listbox" aria-label="阅读背景">
            <button
              v-for="background in readingBackgrounds"
              :key="background.key"
              class="background-chip"
              :class="[`theme-${background.key}`, { active: background.key === readingBgKey }]"
              type="button"
              role="option"
              :aria-selected="background.key === readingBgKey"
              @click="chooseReadingBackground(background.key)"
            >
              <span class="background-swatch xh-reading-swatch" aria-hidden="true" />
              <span class="background-copy">
                <span class="background-label">{{ background.label }}</span>
                <span class="background-name">{{ background.name }}</span>
              </span>
            </button>
          </div>
        </div>

        <div class="settings-card-actions">
          <button class="ghost-button" type="button" @click="resetDisplay">恢复默认</button>
        </div>
      </div>
    </section>

    <!-- 模块：字体设置 -->
    <section class="settings-card" aria-labelledby="settings-font-heading">
      <header class="settings-card-head">
        <span class="settings-card-icon settings-card-icon-font" aria-hidden="true">Aa</span>
        <h2 id="settings-font-heading" class="settings-card-title">字体设置</h2>
      </header>

      <div class="settings-card-body">
        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">正文字体</span>
            <span class="settings-row-note">当前：{{ currentFont.name }}</span>
          </div>
          <div class="font-grid" role="listbox" aria-label="正文字体">
            <button
              v-for="font in fonts"
              :key="font.key"
              class="font-chip"
              :class="{ active: font.key === fontSettings.font }"
              type="button"
              role="option"
              :aria-selected="font.key === fontSettings.font"
              @click="updateFontSetting('font', font.key)"
            >
              <span class="font-chip-label">{{ font.label }}</span>
              <span class="font-chip-name">{{ font.name }}</span>
            </button>
          </div>
        </div>

        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">字号</span>
          </div>
          <div class="slider-control">
            <span class="slider-bound">14px</span>
            <input
              type="range"
              min="14"
              max="30"
              step="1"
              :value="fontSettings.size"
              aria-label="字号"
              @input="updateFontSetting('size', Number($event.target.value))"
            />
            <span class="slider-bound">30px</span>
            <span class="slider-value">{{ fontSettings.size }}px</span>
          </div>
        </div>

        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">行高</span>
          </div>
          <div class="slider-control">
            <span class="slider-bound">1.4</span>
            <input
              type="range"
              min="1.4"
              max="2"
              step="0.05"
              :value="fontSettings.lineHeight"
              aria-label="行高"
              @input="updateFontSetting('lineHeight', Number($event.target.value))"
            />
            <span class="slider-bound">2.0</span>
            <span class="slider-value">{{ fontSettings.lineHeight.toFixed(2) }}</span>
          </div>
        </div>

        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">字距</span>
          </div>
          <div class="slider-control">
            <span class="slider-bound">0px</span>
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              :value="fontSettings.letterSpacing"
              aria-label="字距"
              @input="updateFontSetting('letterSpacing', Number($event.target.value))"
            />
            <span class="slider-bound">2px</span>
            <span class="slider-value">{{ fontSettings.letterSpacing.toFixed(1) }}px</span>
          </div>
        </div>

        <div class="settings-row settings-row-block">
          <div class="settings-row-info">
            <span class="settings-row-label">字重</span>
          </div>
          <div class="slider-control">
            <span class="slider-bound">细</span>
            <input
              type="range"
              min="300"
              max="700"
              step="100"
              :value="fontSettings.weight"
              aria-label="字重"
              @input="updateFontSetting('weight', Number($event.target.value))"
            />
            <span class="slider-bound">粗</span>
            <span class="slider-value">{{ fontSettings.weight }}</span>
          </div>
        </div>

        <div class="settings-row">
          <div class="settings-row-info">
            <span class="settings-row-label">文字颜色</span>
          </div>
          <div class="color-control">
            <input
              type="color"
              :value="colorPickerValue"
              aria-label="选择文字颜色"
              @input="updatePendingColor($event.target.value)"
            />
            <span class="color-value">{{ fontColorLabel }}</span>
            <button
              v-if="pendingColor"
              class="solid-button solid-button-sm"
              type="button"
              @click="applyPendingColor"
            >
              应用
            </button>
            <button
              v-if="fontSettings.color"
              class="ghost-button ghost-button-sm"
              type="button"
              @click="resetFontColor"
            >
              恢复默认
            </button>
          </div>
        </div>

        <div class="settings-row">
          <div class="settings-row-info">
            <span class="settings-row-label">代码字体</span>
            <span class="settings-row-note">跟随正文字体</span>
          </div>
          <button
            class="xh-switch"
            type="button"
            role="switch"
            :aria-checked="fontSettings.codeFont"
            aria-label="代码字体跟随正文"
            @click="updateFontSetting('codeFont', !fontSettings.codeFont)"
          >
            <span class="xh-switch-thumb" aria-hidden="true" />
          </button>
        </div>

        <div class="settings-card-actions">
          <button class="ghost-button" type="button" @click="resetFontSettings">恢复默认</button>
        </div>
      </div>
    </section>

    <!-- 模块：悬浮组件 -->
    <section class="settings-card" aria-labelledby="settings-widgets-heading">
      <header class="settings-card-head">
        <span class="settings-card-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </span>
        <h2 id="settings-widgets-heading" class="settings-card-title">悬浮组件</h2>
      </header>

      <div class="settings-card-body">
        <div class="settings-row settings-row-inline">
          <div class="settings-row-info">
            <span class="settings-row-label">AI 助手悬浮球</span>
          </div>
          <button
            class="xh-switch"
            type="button"
            role="switch"
            :aria-checked="featureToggles.difyChatbot"
            aria-label="AI 助手悬浮球"
            @click="updateFeatureToggle('difyChatbot', !featureToggles.difyChatbot)"
          >
            <span class="xh-switch-thumb" aria-hidden="true" />
          </button>
        </div>

        <div class="settings-row settings-row-inline">
          <div class="settings-row-info">
            <span class="settings-row-label">朗读悬浮球</span>
          </div>
          <button
            class="xh-switch"
            type="button"
            role="switch"
            :aria-checked="featureToggles.textReader"
            aria-label="朗读悬浮球"
            @click="updateFeatureToggle('textReader', !featureToggles.textReader)"
          >
            <span class="xh-switch-thumb" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>

    <!-- 模块：管理后台 -->
    <section class="settings-card" aria-labelledby="settings-admin-heading">
      <header class="settings-card-head">
        <span class="settings-card-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <rect x="3.5" y="3.5" width="7.2" height="7.2" rx="1.6" />
            <rect x="13.3" y="3.5" width="7.2" height="7.2" rx="1.6" />
            <rect x="3.5" y="13.3" width="7.2" height="7.2" rx="1.6" />
            <rect x="13.3" y="13.3" width="7.2" height="7.2" rx="1.6" />
          </svg>
        </span>
        <h2 id="settings-admin-heading" class="settings-card-title">管理后台</h2>
      </header>

      <div class="settings-card-body">
        <div class="settings-row settings-row-inline">
          <div class="settings-row-info">
            <span class="settings-row-label">文章后台</span>
          </div>
          <a class="ghost-button" href="/admin/" aria-label="进入文章后台">进入后台</a>
        </div>
      </div>
    </section>

    <footer class="settings-footer">
      <p class="settings-footer-note">设置仅对当前浏览器生效。</p>
      <button class="ghost-button ghost-button-danger" type="button" @click="resetAllSettings">
        重置全部设置
      </button>
    </footer>
  </div>
</template>

<style scoped>
.site-settings {
  display: grid;
  max-width: 46rem;
  margin: 0 auto;
  gap: 1.25rem;
  font-family: var(--xh-font-family);
}

.settings-header {
  padding: 0.4rem 0 0.1rem;
}

.settings-title {
  margin: 0 0 0.45rem;
  color: var(--vp-c-text);
  font-size: 1.62rem;
  font-weight: 800;
  line-height: 1.25;
}

.settings-subtitle {
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: 0.88rem;
  line-height: 1.6;
}

/* ---------- 卡片 ---------- */
.settings-card {
  overflow: hidden;
  border: 1px solid var(--vp-c-border);
  border-radius: 14px;
  background: var(--vp-c-bg-elv);
  box-shadow: 0 6px 24px var(--vp-c-shadow, rgb(0 0 0 / 6%));
}

.settings-card-head {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 0.95rem 1.25rem;
  border-bottom: 1px solid var(--vp-c-border);
  background: linear-gradient(
    180deg,
    var(--vp-c-accent-soft) 0%,
    transparent 140%
  );
}

.settings-card-icon {
  display: grid;
  place-items: center;
  width: 2.35rem;
  height: 2.35rem;
  flex: 0 0 auto;
  border: 1px solid rgb(var(--xh-accent-rgb) / 22%);
  border-radius: 10px;
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
}

.settings-card-icon svg {
  width: 1.2rem;
  height: 1.2rem;
}

.settings-card-icon-font {
  font-family: Georgia, "Times New Roman", serif;
  font-size: 1.05rem;
  font-weight: 700;
}

.settings-card-title {
  margin: 0;
  color: var(--vp-c-text);
  font-size: 1.02rem;
  font-weight: 750;
  line-height: 1.3;
}

.settings-card-body {
  padding: 0.25rem 1.25rem 1.05rem;
}

/* ---------- 设置行 ---------- */
.settings-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 0;
  border-bottom: 1px dashed var(--vp-c-border);
}

.settings-row:last-of-type {
  border-bottom: 0;
}

.settings-row-block {
  flex-direction: column;
  align-items: stretch;
  gap: 0.6rem;
}

/* 开关类行：标签与开关始终同行（含移动端） */
.settings-row-inline {
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.settings-row-info {
  display: grid;
  min-width: 0;
  gap: 0.14rem;
}

.settings-row-label {
  color: var(--vp-c-text);
  font-size: 0.9rem;
  font-weight: 650;
  line-height: 1.35;
}

.settings-row-note {
  color: var(--vp-c-text-mute);
  font-size: 0.75rem;
  line-height: 1.45;
}

/* ---------- 分段选择 ---------- */
.segmented {
  display: inline-flex;
  flex: 0 0 auto;
  gap: 2px;
  padding: 2px;
  border: 1px solid var(--vp-c-border);
  border-radius: 9px;
  background: var(--vp-c-control);
}

.segmented-option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.32rem;
  padding: 0.4rem 0.95rem;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--vp-c-text-mute);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 650;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    color 0.18s ease,
    box-shadow 0.18s ease;
}

.segmented-option svg {
  width: 0.85rem;
  height: 0.85rem;
}

.segmented-option:hover {
  color: var(--vp-c-text);
}

.segmented-option.active {
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-accent);
  box-shadow: 0 1px 4px rgb(0 0 0 / 12%);
}

/* ---------- 滑杆 ---------- */
.slider-control {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  width: min(24rem, 100%);
}

.slider-bound {
  flex: 0 0 auto;
  color: var(--vp-c-text-mute);
  font-size: 0.7rem;
  font-variant-numeric: tabular-nums;
}

.slider-control input[type="range"] {
  flex: 1;
  min-width: 0;
  accent-color: var(--vp-c-accent);
  cursor: pointer;
}

.slider-value {
  flex: 0 0 auto;
  min-width: 3.1rem;
  color: var(--vp-c-text);
  font-size: 0.78rem;
  font-weight: 650;
  font-variant-numeric: tabular-nums;
  text-align: right;
}

/* ---------- 壁纸操作 ---------- */
.wallpaper-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

/* ---------- 阅读背景 ---------- */
.background-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(9.5rem, 1fr));
  gap: 0.5rem;
}

.background-chip {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
  min-height: 2.6rem;
  padding: 0.4rem 0.5rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 9px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.background-chip:hover,
.background-chip.active {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.background-swatch {
  width: 1.55rem;
  height: 1.55rem;
}

.background-copy {
  display: grid;
  min-width: 0;
}

.background-label {
  overflow: hidden;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.background-name {
  overflow: hidden;
  color: var(--vp-c-text-mute);
  font-size: 0.68rem;
  line-height: 1.3;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.background-chip.active .background-name {
  color: inherit;
}

/* ---------- 字体网格 ---------- */
.font-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.5rem;
}

.font-chip {
  display: flex;
  min-width: 0;
  min-height: 3.1rem;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.1rem;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 9px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    background-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.font-chip:hover,
.font-chip.active {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.font-chip-label {
  font-size: 0.88rem;
  font-weight: 700;
}

.font-chip-name {
  overflow: hidden;
  width: 100%;
  color: var(--vp-c-text-mute);
  font-size: 0.72rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.font-chip.active .font-chip-name {
  color: inherit;
}

/* ---------- 颜色选择 ---------- */
.color-control {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.55rem;
}

.color-control input[type="color"] {
  width: 2.4rem;
  height: 1.9rem;
  padding: 0.12rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-bg);
  cursor: pointer;
}

.color-value {
  overflow: hidden;
  max-width: 7rem;
  color: var(--vp-c-text-mute);
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ---------- 开关 ---------- */
.xh-switch {
  position: relative;
  flex: 0 0 auto;
  width: 2.6rem;
  height: 1.5rem;
  padding: 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  background: var(--vp-c-control);
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.xh-switch-thumb {
  position: absolute;
  top: 50%;
  left: 0.15rem;
  width: 1.05rem;
  height: 1.05rem;
  border-radius: 999px;
  background: #fff;
  box-shadow: 0 1px 3px rgb(0 0 0 / 28%);
  transform: translateY(-50%);
  transition: transform 0.2s ease;
}

.xh-switch[aria-checked="true"] {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent);
}

.xh-switch[aria-checked="true"] .xh-switch-thumb {
  transform: translateY(-50%) translateX(1.08rem);
}

.xh-switch:focus-visible {
  outline: 2px solid var(--vp-c-accent);
  outline-offset: 2px;
}

/* ---------- 按钮 ---------- */
.solid-button,
.ghost-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.45rem 1rem;
  border-radius: 8px;
  font: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
}

.solid-button {
  border: 1px solid var(--vp-c-accent);
  background: var(--vp-c-accent);
  color: var(--vp-c-accent-text, #fff);
}

.solid-button:hover:not(:disabled) {
  border-color: var(--vp-c-accent-hover);
  background: var(--vp-c-accent-hover);
  transform: translateY(-1px);
}

.solid-button:disabled {
  cursor: wait;
  opacity: 0.68;
}

.ghost-button {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
}

.ghost-button:hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
}

.ghost-button-danger {
  color: var(--vp-c-danger, #d33035);
}

.ghost-button-danger:hover {
  border-color: var(--vp-c-danger, #d33035);
  background: rgb(211 48 53 / 8%);
  color: var(--vp-c-danger, #d33035);
}

.solid-button-sm,
.ghost-button-sm {
  padding: 0.36rem 0.8rem;
  font-size: 0.76rem;
}

/* ---------- 卡片底部操作 / 页脚 ---------- */
.settings-card-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 0.85rem;
}

.settings-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  padding: 0.4rem 0 1rem;
}

.settings-footer-note {
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: 0.76rem;
}

/* ---------- 移动端适配 ---------- */
@media (max-width: 719px) {
  .site-settings {
    gap: 1rem;
  }

  .settings-title {
    font-size: 1.32rem;
  }

  .settings-subtitle {
    font-size: 0.8rem;
  }

  .settings-card {
    border-radius: 12px;
  }

  .settings-card-head {
    gap: 0.65rem;
    padding: 0.85rem 1rem;
  }

  .settings-card-icon {
    width: 2.1rem;
    height: 2.1rem;
    border-radius: 9px;
  }

  .settings-card-icon svg {
    width: 1.05rem;
    height: 1.05rem;
  }

  .settings-card-title {
    font-size: 0.94rem;
  }

  .settings-card-body {
    padding: 0.15rem 1rem 0.9rem;
  }

  .settings-row {
    flex-direction: column;
    align-items: stretch;
    gap: 0.55rem;
    padding: 0.75rem 0;
  }

  .settings-row-inline {
    flex-direction: row;
    align-items: center;
    gap: 1rem;
  }

  .settings-row-label {
    font-size: 0.84rem;
  }

  .settings-row-note {
    font-size: 0.71rem;
  }

  .segmented {
    width: 100%;
  }

  .segmented-option {
    flex: 1;
    padding: 0.45rem 0.5rem;
    font-size: 0.78rem;
  }

  .slider-control {
    width: 100%;
  }

  .slider-value {
    min-width: 2.8rem;
  }

  .wallpaper-actions {
    width: 100%;
  }

  .wallpaper-actions .solid-button {
    flex: 1;
  }

  .font-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.4rem;
  }

  .font-chip {
    min-height: 2.7rem;
    padding: 0.45rem 0.55rem;
  }

  .font-chip-label {
    font-size: 0.82rem;
  }

  .font-chip-name {
    font-size: 0.68rem;
  }

  .background-grid {
    grid-template-columns: repeat(auto-fill, minmax(8.2rem, 1fr));
    gap: 0.4rem;
  }

  .color-control {
    justify-content: space-between;
    width: 100%;
  }

  .color-value {
    flex: 1;
    max-width: none;
    margin-right: auto;
  }

  .settings-card-actions {
    padding-top: 0.7rem;
  }

  .settings-card-actions .ghost-button,
  .settings-footer .ghost-button {
    width: 100%;
  }
}
</style>
