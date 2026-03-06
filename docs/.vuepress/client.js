import { defineClientConfig, useRouter } from "vuepress/client";
import Layout from "./layouts/Layout.vue";
import Article from "./layouts/Article.vue";
import Category from "./layouts/Category.vue";
import Tag from "./layouts/Tag.vue";
import Timeline from "./layouts/Timeline.vue";
import HomePage from "./components/HomePage.vue";
import { nextTick, onMounted } from "vue";

const renderMath = () => {
  if (typeof window === "undefined") return;
  const renderMathInElement = window.renderMathInElement;
  if (typeof renderMathInElement !== "function") return;

  const el = document.querySelector(".vp-page [vp-content]");
  if (!el) return;

  renderMathInElement(el, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
  });
};

const renderMermaid = async () => {
  if (typeof window === "undefined") return;

  try {
    const mermaidModule = await import("mermaid");
    const mermaid = mermaidModule.default || mermaidModule;

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: "loose",
      theme: "default",
    });

    const blocks = document.querySelectorAll(
      "pre > code.language-mermaid"
    );

    let index = 0;
    blocks.forEach((codeBlock) => {
      const parent = codeBlock.parentElement;
      if (!parent) return;

      const code = codeBlock.textContent || "";
      const container = document.createElement("div");
      container.className = "mermaid-chart";

      parent.replaceWith(container);

      const id = `mermaid-${index++}-${Date.now()}`;
      mermaid.render(id, code, (svg) => {
        container.innerHTML = svg;
      });
    });
  } catch (error) {
    console.error("[Mermaid] render error:", error);
  }
};

export default defineClientConfig({
  layouts: {
    Layout,
    Article,
    Category,
    Tag,
    Timeline,
    HomePage,
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      nextTick(() => {
        renderMath();
        renderMermaid();
      });
    });

    router.afterEach(() => {
      nextTick(() => {
        renderMath();
        renderMermaid();
      });
    });
  },
});

