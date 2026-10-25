<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/useDarkMode.js";
import {
  chooseBackground,
  useDisplaySettings,
} from "../composables/useDisplaySettings.js";

const isDarkMode = useDarkMode();
const { readingBackgrounds, currentKey } = useDisplaySettings();

const isOpen = ref(false);
const rootRef = ref(null);

const currentBackground = computed(
  () =>
    readingBackgrounds.find(
      (background) => background.key === currentKey.value,
    ) ?? readingBackgrounds[0],
);

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

// 选择背景（明暗不匹配时自动联动切换主题并 toast 提示）
const choose = (key) => {
  chooseBackground(key, isDarkMode);
  closeMenu();
};

const handleDocumentClick = (event) => {
  if (!rootRef.value?.contains(event.target)) {
    closeMenu();
  }
};

const handleKeydown = (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
};

// 捕获阶段监听：先于其他插件在 document 冒泡阶段可能的 stopImmediatePropagation 执行
onMounted(() => {
  document.addEventListener("click", handleDocumentClick, true);
  document.addEventListener("keydown", handleKeydown, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleDocumentClick, true);
  document.removeEventListener("keydown", handleKeydown, true);
});
</script>

<template>
  <div ref="rootRef" class="reading-bg-menu">
    <button
      class="reading-bg-trigger"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="dialog"
      :aria-label="`阅读背景，当前：${currentBackground.label}`"
      :title="`阅读背景：${currentBackground.label}`"
      @click.stop="toggleMenu"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.9"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="13.5" cy="6.5" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="17.5" cy="10.5" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="8.5" cy="7.5" r="0.6" fill="currentColor" stroke="none" />
        <circle cx="6.5" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
        <path
          d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"
        />
      </svg>
    </button>

    <!-- 不用 Transition：其元素移除依赖过渡结束回调，在后台/节流标签页会永久卡住 -->
    <div
      v-if="isOpen"
      class="reading-bg-panel"
      role="dialog"
      aria-label="阅读背景"
    >
        <div class="rbg-panel-head">
          <span class="rbg-panel-title">阅读背景</span>
          <button
            class="rbg-close"
            type="button"
            aria-label="关闭阅读背景菜单"
            @click="closeMenu"
          >
            ×
          </button>
        </div>

        <div class="rbg-options" role="listbox" aria-label="阅读背景选项">
          <button
            v-for="background in readingBackgrounds"
            :key="background.key"
            class="rbg-option"
            :class="[`theme-${background.key}`, { active: background.key === currentKey }]"
            type="button"
            role="option"
            :aria-selected="background.key === currentKey"
            @click="choose(background.key)"
          >
            <span class="rbg-swatch xh-reading-swatch" aria-hidden="true" />
            <span class="rbg-copy">
              <span class="rbg-label">{{ background.label }}</span>
              <span class="rbg-name">{{ background.name }}</span>
            </span>
          </button>
        </div>
    </div>
  </div>
</template>

<style scoped>
.reading-bg-menu {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.reading-bg-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border: 1px solid var(--vp-c-border);
  border-radius: 7px;
  background: var(--vp-c-control);
  color: var(--vp-c-text);
  transition:
    background-color var(--vp-t-color, 0.2s ease),
    border-color var(--vp-t-color, 0.2s ease),
    color var(--vp-t-color, 0.2s ease),
    transform 0.16s ease;
}

.reading-bg-trigger:hover,
.reading-bg-trigger[aria-expanded="true"] {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.reading-bg-trigger:focus-visible {
  outline: 2px solid var(--vp-c-accent);
  outline-offset: 2px;
}

.reading-bg-trigger svg {
  width: 1.05rem;
  height: 1.05rem;
}

.reading-bg-panel {
  position: absolute;
  top: calc(100% + 0.6rem);
  right: 0;
  z-index: 1000;
  box-sizing: border-box;
  width: min(17rem, calc(100vw - 1.5rem));
  padding: 0.65rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 10px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text);
  box-shadow: 0 14px 34px var(--vp-c-shadow);
}

.rbg-panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.55rem;
}

.rbg-panel-title {
  font-size: 0.88rem;
  font-weight: 750;
}

.rbg-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.7rem;
  height: 1.7rem;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-mute);
  font-size: 1.15rem;
  line-height: 1;
  cursor: pointer;
}

.rbg-close:hover {
  background: var(--vp-c-control);
  color: var(--vp-c-text);
}

.rbg-options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.4rem;
}

.rbg-option {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 0.45rem;
  min-height: 2.5rem;
  padding: 0.32rem 0.4rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.16s ease,
    background-color 0.16s ease,
    color 0.16s ease,
    transform 0.16s ease;
}

.rbg-option:hover,
.rbg-option.active {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.rbg-swatch {
  width: 1.45rem;
  height: 1.45rem;
}

.rbg-copy {
  display: grid;
  min-width: 0;
}

.rbg-label {
  overflow: hidden;
  font-size: 0.78rem;
  font-weight: 700;
  line-height: 1.2;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rbg-name {
  overflow: hidden;
  color: var(--vp-c-text-mute);
  font-size: 0.66rem;
  line-height: 1.25;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.rbg-option.active .rbg-name {
  color: inherit;
}

@media (max-width: 719px) {
  .reading-bg-trigger svg {
    width: 0.95rem;
    height: 0.95rem;
  }

  .reading-bg-panel {
    position: fixed;
    top: calc(var(--navbar-height) + 0.4rem);
    right: 0.6rem;
    left: auto;
    width: min(15.5rem, calc(100vw - 1.2rem));
    max-height: min(26rem, calc(100vh - var(--navbar-height) - 1rem));
    padding: 0.55rem;
    overflow-y: auto;
  }

  .rbg-option {
    min-height: 2.2rem;
    padding: 0.26rem 0.34rem;
  }

  .rbg-swatch {
    width: 1.3rem;
    height: 1.3rem;
  }

  .rbg-label {
    font-size: 0.74rem;
  }

  .rbg-name {
    font-size: 0.6rem;
  }
}
</style>
