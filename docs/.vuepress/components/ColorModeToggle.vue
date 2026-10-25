<script setup>
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/useDarkMode.js";
import { setColorMode } from "../composables/useDisplaySettings.js";

const isDarkMode = useDarkMode();

const toggle = () => {
  setColorMode(isDarkMode.value ? "light" : "dark", isDarkMode);
};
</script>

<template>
  <button
    class="color-mode-toggle"
    type="button"
    :aria-label="isDarkMode ? '切换到亮色模式' : '切换到暗色模式'"
    :title="isDarkMode ? '切换到亮色模式' : '切换到暗色模式'"
    @click="toggle"
  >
    <svg
      v-if="isDarkMode"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path
        d="M12 2.5v2.2M12 19.3v2.2M4.6 4.6l1.6 1.6M17.8 17.8l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.6 19.4l1.6-1.6M17.8 6.2l1.6-1.6"
      />
    </svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M20.6 14.2A8.6 8.6 0 0 1 9.8 3.4a8.6 8.6 0 1 0 10.8 10.8z" />
    </svg>
  </button>
</template>

<style scoped>
.color-mode-toggle {
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

.color-mode-toggle:hover {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.color-mode-toggle:focus-visible {
  outline: 2px solid var(--vp-c-accent);
  outline-offset: 2px;
}

.color-mode-toggle svg {
  width: 1.02rem;
  height: 1.02rem;
}

@media (max-width: 719px) {
  .color-mode-toggle svg {
    width: 0.95rem;
    height: 0.95rem;
  }
}
</style>
