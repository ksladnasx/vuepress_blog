<script setup>
import { computed, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vuepress/client";
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/useDarkMode.js";
import { initFontSettings } from "../composables/useFontSettings.js";
import {
  installDisplaySettingsEngine,
  modeToast,
} from "../composables/useDisplaySettings.js";
import { initFeatureToggles } from "../composables/useFeatureToggles.js";

const route = useRoute();
const isDarkMode = useDarkMode();

// 与原 Layout 逻辑一致：/posts/ 下的具体文章页视为阅读页
const isReadingPage = computed(() => {
  const path = route.path;
  if (!path.startsWith("/posts/")) return false;
  const rest = path.replace(/^\/posts\/?/, "").replace(/\/$/, "");
  return rest.length > 0;
});

const isHomePage = computed(() => route.path === "/");

let cleanupDisplayEngine = null;

onMounted(() => {
  initFontSettings();
  initFeatureToggles();
});

onBeforeUnmount(() => {
  cleanupDisplayEngine?.();
  cleanupDisplayEngine = null;
});

// 须在 setup 作用域内安装（watch 需要组件实例来自动销毁）
cleanupDisplayEngine = installDisplaySettingsEngine({
  isDarkMode,
  isReadingPage,
  isHomePage,
});
</script>

<template>
  <Transition name="xh-engine-toast">
    <div
      v-if="modeToast"
      class="xh-engine-toast"
      role="status"
      aria-live="polite"
    >
      {{ modeToast }}
    </div>
  </Transition>
</template>

<style scoped>
.xh-engine-toast {
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

.xh-engine-toast-enter-active,
.xh-engine-toast-leave-active {
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.xh-engine-toast-enter-from,
.xh-engine-toast-leave-to {
  opacity: 0;
  transform: translateY(-0.35rem);
}

@media (max-width: 719px) {
  .xh-engine-toast {
    right: 0.6rem;
    left: 0.6rem;
    max-width: none;
    padding: 0.58rem 0.68rem;
    font-size: 0.72rem;
  }
}
</style>
