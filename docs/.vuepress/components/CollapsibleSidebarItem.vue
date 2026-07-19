<script setup>
import VPAutoLink from "@theme/VPAutoLink.vue";
import { computed, nextTick, ref, toRefs, watch } from "vue";
import { useRoute } from "vuepress/client";

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  depth: {
    type: Number,
    default: 0,
  },
});

const { item, depth } = toRefs(props);
const route = useRoute();

const safeDecode = (value) => {
  try {
    return decodeURI(value || "");
  } catch {
    return value || "";
  }
};

const normalizePath = (path) =>
  safeDecode(path)
    .replace(/#.*$/, "")
    .replace(/(index)?\.(md|html)$/, "");

const normalizeHash = (hash) => safeDecode(hash || "");

const getLinkParts = (link) => {
  const rawLink = String(link || "");
  const hashIndex = rawLink.indexOf("#");

  if (hashIndex < 0) {
    return {
      path: rawLink,
      hash: "",
    };
  }

  return {
    path: rawLink.slice(0, hashIndex),
    hash: rawLink.slice(hashIndex),
  };
};

const isLinkActive = (link, currentRoute) => {
  const { path, hash } = getLinkParts(link);

  if (hash) {
    return (
      normalizePath(path || currentRoute.path) === normalizePath(currentRoute.path) &&
      normalizeHash(hash) === normalizeHash(currentRoute.hash)
    );
  }

  return normalizePath(path) === normalizePath(currentRoute.path);
};

const isSidebarItemActive = (targetItem, currentRoute) => {
  if (targetItem.link && isLinkActive(targetItem.link, currentRoute)) {
    return true;
  }

  if (Array.isArray(targetItem.children)) {
    return targetItem.children.some((child) =>
      isSidebarItemActive(child, currentRoute),
    );
  }

  return false;
};

const hasChildren = computed(
  () => Array.isArray(item.value.children) && item.value.children.length > 0,
);
const isActive = computed(() => isSidebarItemActive(item.value, route));
const isDefaultOpen = computed(() => depth.value === 0 || isActive.value);
const isOpen = ref(isDefaultOpen.value);

const itemClasses = computed(() => ({
  "vp-sidebar-item": true,
  "vp-sidebar-heading": depth.value === 0,
  "auto-link": Boolean(item.value.link),
  active: isActive.value,
}));

const rowClasses = computed(() => ({
  "xh-sidebar-row": true,
  active: isActive.value,
  "has-children": hasChildren.value,
  [`depth-${depth.value}`]: true,
}));

const toggle = async () => {
  if (!hasChildren.value) return;

  isOpen.value = !isOpen.value;
  await nextTick();
};

watch(
  () => [route.path, route.hash, isActive.value],
  () => {
    if (isActive.value) {
      isOpen.value = true;
    }
  },
);

watch(
  () => route.path,
  () => {
    isOpen.value = isDefaultOpen.value;
  },
);
</script>

<template>
  <li class="xh-sidebar-node">
    <div :class="rowClasses">
      <VPAutoLink
        v-if="item.link"
        :class="itemClasses"
        :config="item"
        :title="item.text"
      >
        <span class="xh-sidebar-title">{{ item.text }}</span>
      </VPAutoLink>
      <button
        v-else
        type="button"
        :class="itemClasses"
        :title="item.text"
        @click="toggle"
      >
        <span class="xh-sidebar-title">{{ item.text }}</span>
      </button>

      <button
        v-if="hasChildren"
        class="xh-sidebar-toggle"
        type="button"
        :aria-label="isOpen ? `收起 ${item.text}` : `展开 ${item.text}`"
        :aria-expanded="isOpen"
        @click="toggle"
      >
        <span class="arrow" :class="isOpen ? 'down' : 'right'" />
      </button>
    </div>

    <Transition name="xh-sidebar-collapse">
      <ul
        v-show="hasChildren && isOpen"
        class="vp-sidebar-children xh-sidebar-children"
      >
        <CollapsibleSidebarItem
          v-for="child in item.children"
          :key="`${depth}${child.text}${child.link || ''}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </Transition>
  </li>
</template>

<style scoped>
.xh-sidebar-node,
.xh-sidebar-children {
  margin: 0;
  padding: 0;
  list-style: none;
}

.xh-sidebar-row {
  position: relative;
  display: flex;
  align-items: center;
  min-width: 0;
  margin: 0.1rem 0;
  border-radius: 8px;
  transition:
    background-color var(--vp-t-color),
    box-shadow var(--vp-t-transform);
}

.xh-sidebar-row.active {
  background: var(--vp-c-accent-soft);
}

.xh-sidebar-row.has-children {
  padding-inline-end: 0.25rem;
}

.vp-sidebar-item {
  min-width: 0;
  flex: 1;
  overflow: hidden;
  margin: 0;
  border: 0;
  border-radius: 8px;
  appearance: none;
  background: transparent;
  color: var(--vp-c-text-mute);
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.xh-sidebar-title {
  display: -webkit-box;
  overflow: hidden;
  max-height: 2.7em;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  line-height: inherit;
  overflow-wrap: anywhere;
  text-overflow: ellipsis;
  word-break: break-word;
}

.vp-sidebar-item:focus,
.xh-sidebar-toggle:focus {
  outline: none;
}

.vp-sidebar-item:focus-visible,
.xh-sidebar-toggle:focus-visible {
  background: var(--vp-c-control);
  box-shadow: inset 0 0 0 1px rgb(var(--xh-accent-rgb) / 20%);
}

.vp-sidebar-item:hover {
  color: var(--vp-c-accent);
}

.vp-sidebar-item.active {
  color: var(--vp-c-accent);
  font-weight: 800;
}

.vp-sidebar-heading {
  color: var(--vp-c-text);
  font-weight: 850;
}

.depth-0 > .vp-sidebar-item {
  padding: 0.58rem 0.62rem;
  font-size: calc(var(--xh-font-size) * 0.88) !important;
  line-height: 1.35 !important;
}

.depth-1 > .vp-sidebar-item {
  padding: 0.45rem 0.5rem 0.45rem 0.9rem;
  font-size: calc(var(--xh-font-size) * 0.82) !important;
  line-height: 1.35 !important;
}

.depth-2 > .vp-sidebar-item {
  padding: 0.36rem 0.45rem 0.36rem 1.28rem;
  color: var(--vp-c-text-subtle);
  font-size: calc(var(--xh-font-size) * 0.76) !important;
  line-height: 1.35 !important;
}

.depth-3 > .vp-sidebar-item {
  padding: 0.32rem 0.45rem 0.32rem 1.65rem;
  color: var(--vp-c-text-subtle);
  font-size: calc(var(--xh-font-size) * 0.72) !important;
  line-height: 1.35 !important;
}

.xh-sidebar-toggle {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  width: 1.55rem;
  height: 1.55rem;
  margin-inline-end: 0.22rem;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-subtle);
  cursor: pointer;
}

.xh-sidebar-toggle:hover {
  background: var(--vp-c-control-hover);
  color: var(--vp-c-accent);
}

.xh-sidebar-toggle .arrow {
  width: 0.95rem;
  height: 0.95rem;
}

.xh-sidebar-children {
  overflow: hidden;
  margin-inline-start: 0.45rem;
  border-inline-start: 1px solid rgb(var(--xh-accent-rgb) / 14%);
}

.xh-sidebar-collapse-enter-active,
.xh-sidebar-collapse-leave-active {
  transition:
    opacity 0.18s ease,
    transform 0.18s ease;
}

.xh-sidebar-collapse-enter-from,
.xh-sidebar-collapse-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
}

@media (max-width: 719px) {
  .depth-0 > .vp-sidebar-item,
  .depth-1 > .vp-sidebar-item,
  .depth-2 > .vp-sidebar-item,
  .depth-3 > .vp-sidebar-item {
    font-size: calc(var(--xh-font-size) * 0.86) !important;
  }
}
</style>
