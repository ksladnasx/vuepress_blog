<script setup>
import { computed, onMounted, ref } from "vue";

const STORAGE_KEY = "xh-font";

const fonts = [
  { key: "simkai", label: "楷体" },
  { key: "lxgw", label: "霞鹜" },
  { key: "fangsong", label: "仿宋" },
];

const currentKey = ref(fonts[0].key);

const currentFont = computed(
  () => fonts.find((font) => font.key === currentKey.value) ?? fonts[0],
);

const applyFont = (fontKey) => {
  currentKey.value = fontKey;

  if (typeof document !== "undefined") {
    document.documentElement.dataset.font = fontKey;
  }

  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, fontKey);
    } catch {
      // Ignore storage errors in restricted browser modes.
    }
  }
};

const switchFont = () => {
  const currentIndex = fonts.findIndex((font) => font.key === currentKey.value);
  const nextFont = fonts[(currentIndex + 1) % fonts.length];

  applyFont(nextFont.key);
};

onMounted(() => {
  let savedFont = fonts[0].key;

  try {
    savedFont = window.localStorage.getItem(STORAGE_KEY) || savedFont;
  } catch {
    // Ignore storage errors in restricted browser modes.
  }

  applyFont(fonts.some((font) => font.key === savedFont) ? savedFont : fonts[0].key);
});
</script>

<template>
  <button
    class="font-switcher"
    type="button"
    :aria-label="`切换字体，当前：${currentFont.label}`"
    :title="`切换字体，当前：${currentFont.label}`"
    @click="switchFont"
  >
    <span class="font-icon" aria-hidden="true">字</span>
    <span class="font-name">{{ currentFont.label }}</span>
  </button>
</template>

<style scoped>
.font-switcher {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  height: 2rem;
  margin-inline-start: 0.5rem;
  padding: 0 0.65rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text);
  font-family: var(--xh-font-family);
  font-size: 0.86rem;
  line-height: 1;
  cursor: pointer;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color);
}

.font-switcher:hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
}

.font-icon {
  font-size: 1rem;
  font-weight: 600;
}

.font-name {
  min-width: 2.1rem;
  text-align: center;
}

@media (max-width: 719px) {
  .font-switcher {
    width: 2rem;
    margin-inline-start: 0.25rem;
    padding: 0;
  }

  .font-name {
    display: none;
  }
}
</style>
