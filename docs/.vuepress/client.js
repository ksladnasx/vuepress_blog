import { defineClientConfig, useRouter } from "vuepress/client";
import Layout from "./layouts/Layout.vue";
import Article from "./layouts/Article.vue";
import Category from "./layouts/Category.vue";
import Tag from "./layouts/Tag.vue";
import Timeline from "./layouts/Timeline.vue";
import HomeDashboard from "./components/HomeDashboard.vue";
import { nextTick, onMounted } from "vue";
import "./styles/index.scss";

const DIFY_CHATBOT_TOKEN = "PRFQL6hdwlirsgQK";

const loadDifyChatbot = () => {
  if (typeof window === "undefined") return;
  if (document.getElementById(DIFY_CHATBOT_TOKEN)) return;

  const script = document.createElement("script");
  script.src = "https://udify.app/embed.min.js";
  script.id = DIFY_CHATBOT_TOKEN;
  script.defer = true;
  document.body.appendChild(script);
};

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
  },
  enhance({ app }) {
    app.component("HomeDashboard", HomeDashboard);
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      nextTick(renderMath);
      nextTick(loadDifyChatbot);
    });

    router.afterEach(() => {
      nextTick(renderMath);
    });
  },
});
