<script setup>
import { computed } from "vue";
import { useRoute } from "vuepress/client";

const route = useRoute();
const isActive = computed(() => route.path === "/settings/");
</script>

<template>
  <RouterLink
    class="settings-entry"
    :class="{ active: isActive }"
    to="/settings/"
    :aria-current="isActive ? 'page' : undefined"
    aria-label="站点设置"
    title="站点设置（字体 / 显示 / 悬浮组件）"
  >
    <svg
      class="settings-entry-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.9"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="3.2" />
      <path
        d="M19.1 14.7a1.7 1.7 0 0 0 .34 1.86l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.7 1.7 0 0 0-1.86-.34 1.7 1.7 0 0 0-1.03 1.56V21a2 2 0 1 1-4 0v-.11a1.7 1.7 0 0 0-1.11-1.56 1.7 1.7 0 0 0-1.86.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.7 1.7 0 0 0 .34-1.86 1.7 1.7 0 0 0-1.56-1.03H3a2 2 0 1 1 0-4h.11a1.7 1.7 0 0 0 1.56-1.11 1.7 1.7 0 0 0-.34-1.86l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.7 1.7 0 0 0 1.86.34h.08A1.7 1.7 0 0 0 10.1 3.9V3a2 2 0 1 1 4 0v.11a1.7 1.7 0 0 0 1.03 1.56 1.7 1.7 0 0 0 1.86-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.7 1.7 0 0 0-.34 1.86v.08a1.7 1.7 0 0 0 1.56 1.03H21a2 2 0 1 1 0 4h-.11a1.7 1.7 0 0 0-1.56 1.03z"
      />
    </svg>
  </RouterLink>
</template>

<style scoped>
.settings-entry {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  margin-inline-start: 0.35rem;
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

.settings-entry:hover,
.settings-entry.active {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.settings-entry:focus-visible {
  outline: 2px solid var(--vp-c-accent);
  outline-offset: 2px;
}

.settings-entry-icon {
  width: 1.02rem;
  height: 1.02rem;
}

@media (max-width: 719px) {
  .settings-entry {
    width: 2rem;
    height: 2rem;
    margin-inline-start: 0.08rem;
  }

  .settings-entry-icon {
    width: 0.95rem;
    height: 0.95rem;
  }
}
</style>
