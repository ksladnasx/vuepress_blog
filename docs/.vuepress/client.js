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
      nextTick(renderMath);
    });

    router.afterEach(() => {
      nextTick(renderMath);
    });
  },
});

