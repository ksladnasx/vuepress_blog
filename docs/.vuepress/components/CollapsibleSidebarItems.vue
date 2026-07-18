<script setup>
import { nextTick, onMounted, watch } from "vue";
import { useRoute } from "vuepress/client";
import { useSidebarItems } from "@theme/useSidebarItems";
import CollapsibleSidebarItem from "./CollapsibleSidebarItem.vue";

const route = useRoute();
const sidebarItems = useSidebarItems();

const scrollActiveItemIntoView = async () => {
  await nextTick();

  const sidebar = document.querySelector(".xh-collapsible-sidebar");
  if (!sidebar) return;

  const activeItems = sidebar.querySelectorAll(".vp-sidebar-item.active");
  const activeItem = activeItems[activeItems.length - 1];
  if (!activeItem) return;

  const { top: sidebarTop, height: sidebarHeight } =
    sidebar.getBoundingClientRect();
  const { top: itemTop, height: itemHeight } =
    activeItem.getBoundingClientRect();

  if (itemTop < sidebarTop) {
    activeItem.scrollIntoView(true);
  } else if (itemTop + itemHeight > sidebarTop + sidebarHeight) {
    activeItem.scrollIntoView(false);
  }
};

onMounted(() => {
  watch(
    () => [route.path, route.hash, sidebarItems.value],
    scrollActiveItemIntoView,
    { immediate: true },
  );
});
</script>

<template>
  <ul v-if="sidebarItems.length" class="vp-sidebar-items xh-sidebar-items">
    <CollapsibleSidebarItem
      v-for="item in sidebarItems"
      :key="`${item.text}${item.link || ''}`"
      :item="item"
    />
  </ul>
</template>

<style scoped>
.xh-sidebar-items {
  margin: 0;
  padding: 1.15rem 0.85rem 1.5rem;
  list-style: none;
}

@media (max-width: 719px) {
  .xh-sidebar-items {
    padding-top: 1rem;
  }
}
</style>

