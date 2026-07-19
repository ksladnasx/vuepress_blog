<script setup>
import VPNavbarItems from "@theme/VPNavbarItems.vue";
import CollapsibleSidebarItems from "./CollapsibleSidebarItems.vue";
import { onBeforeUnmount, onMounted, ref, watch } from "vue";

const STORAGE_KEY = "xh-sidebar-collapsed";
const isCollapsed = ref(false);

const applySidebarState = () => {
  if (typeof document === "undefined") return;

  document.documentElement.toggleAttribute(
    "data-sidebar-collapsed",
    isCollapsed.value,
  );
};

const persistSidebarState = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, String(isCollapsed.value));
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
};

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};

onMounted(() => {
  try {
    isCollapsed.value = window.localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    isCollapsed.value = false;
  }

  applySidebarState();
});

watch(isCollapsed, () => {
  applySidebarState();
  persistSidebarState();
});

onBeforeUnmount(() => {
  if (typeof document !== "undefined") {
    document.documentElement.removeAttribute("data-sidebar-collapsed");
  }
});
</script>

<template>
  <aside
    id="xh-article-sidebar"
    class="vp-sidebar xh-collapsible-sidebar"
    :class="{ collapsed: isCollapsed }"
    vp-sidebar
  >
    <VPNavbarItems />
    <CollapsibleSidebarItems />
  </aside>

  <button
    class="xh-sidebar-collapse-button"
    type="button"
    aria-controls="xh-article-sidebar"
    :aria-label="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    :aria-expanded="!isCollapsed"
    :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
    @click="toggleSidebar"
  >
    <span aria-hidden="true">{{ isCollapsed ? ">" : "<" }}</span>
  </button>
</template>
