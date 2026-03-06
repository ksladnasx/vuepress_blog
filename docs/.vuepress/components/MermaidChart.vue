<script setup>
import { onMounted, ref, watch } from "vue";

const props = defineProps({
  code: {
    type: String,
    required: true,
  },
});

const svgHtml = ref("");

const renderMermaid = async () => {
  if (!props.code) return;

  try {
    const mermaidModule = await import("mermaid");
    const mermaid = mermaidModule.default || mermaidModule;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "default",
    });

    const { svg } = await mermaid.render(
      `mermaid-${Math.random().toString(36).slice(2)}`,
      props.code
    );

    svgHtml.value = svg;
  } catch (error) {
    console.error("[MermaidChart] render error:", error);
    svgHtml.value =
      '<pre style="color: var(--c-danger); white-space: pre-wrap;">Mermaid 渲染失败，请检查语法或网络环境。</pre>';
  }
};

onMounted(renderMermaid);

watch(
  () => props.code,
  () => {
    renderMermaid();
  }
);
</script>

<template>
  <div class="mermaid-chart" v-html="svgHtml" />
</template>

<style scoped>
.mermaid-chart {
  max-width: 100%;
  overflow-x: auto;
}
</style>

