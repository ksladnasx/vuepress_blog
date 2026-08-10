import { fileURLToPath } from "node:url";
import { blogPlugin } from "@vuepress/plugin-blog";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { sitemapPlugin } from "@vuepress/plugin-sitemap";
import { slimsearchPlugin } from "@vuepress/plugin-slimsearch";
import { socialSharePlugin } from "vuepress-plugin-social-share";
import { commentPlugin } from "@vuepress/plugin-comment";
import { markdownChartPlugin } from "@vuepress/plugin-markdown-chart";
import markdownItKatex from "markdown-it-katex";
import { backgroundGroups } from "./backgrounds.js";

const resolveProjectFile = (path) =>
  fileURLToPath(new URL(`../../${path}`, import.meta.url));

const vueUseCoreEntry = resolveProjectFile("node_modules/@vueuse/core/index.mjs");
const vueUseSharedEntry = resolveProjectFile(
  "node_modules/@vueuse/shared/index.mjs",
);

const getPagePathKey = (page) => page.path || page.filePathRelative || "";

const compareText = (textA = "", textB = "") => {
  if (textA === textB) return 0;
  return textA < textB ? -1 : 1;
};

const comparePagePath = (pageA, pageB) =>
  compareText(getPagePathKey(pageA), getPagePathKey(pageB));

const getPageDateTime = (page) => {
  const date = page.frontmatter.date;
  return date ? new Date(date).getTime() : Number.NEGATIVE_INFINITY;
};

const compareArticlePages = (pageA, pageB) => {
  const stickyDiff =
    Number(pageB.frontmatter.sticky || 0) -
    Number(pageA.frontmatter.sticky || 0);

  if (stickyDiff) return stickyDiff;

  const dateDiff = getPageDateTime(pageB) - getPageDateTime(pageA);
  if (dateDiff) return dateDiff;

  return comparePagePath(pageA, pageB);
};

const compareTimelinePages = (pageA, pageB) => {
  const dateDiff = getPageDateTime(pageB) - getPageDateTime(pageA);
  return dateDiff || comparePagePath(pageA, pageB);
};

const stablePageOrderPlugin = (name) => ({
  name,
  onInitialized: (app) => {
    app.pages.sort(comparePagePath);
  },
});

const markdownHighlightPlugin = {
  name: "conservative-markdown-highlight",
  extendsMarkdown: (md) => {
    md.core.ruler.after("inline", "conservative_mark", (state) => {
      const Token = state.Token;
      const markPattern = /==(?=\S)([^=\n]*?\S)==/g;
      const createTextToken = (content) => {
        const token = new Token("text", "", 0);
        token.content = content;
        return token;
      };

      state.tokens.forEach((token, index) => {
        const parentType = state.tokens[index - 1]?.type;

        if (
          token.type !== "inline" ||
          parentType !== "paragraph_open" ||
          !token.children?.length
        ) {
          return;
        }

        const nextChildren = [];
        let hasHighlight = false;

        token.children.forEach((child) => {
          if (child.type !== "text" || !child.content.includes("==")) {
            nextChildren.push(child);
            return;
          }

          const content = child.content;
          let lastIndex = 0;

          markPattern.lastIndex = 0;

          for (const match of content.matchAll(markPattern)) {
            const start = match.index;
            const end = start + match[0].length;

            if (content[start - 1] === "=" || content[end] === "=") {
              continue;
            }

            if (start > lastIndex) {
              nextChildren.push(createTextToken(content.slice(lastIndex, start)));
            }

            nextChildren.push(new Token("mark_open", "mark", 1));
            nextChildren.push(createTextToken(match[1]));
            nextChildren.push(new Token("mark_close", "mark", -1));
            hasHighlight = true;
            lastIndex = end;
          }

          if (lastIndex === 0) {
            nextChildren.push(child);
          } else if (lastIndex < content.length) {
            nextChildren.push(createTextToken(content.slice(lastIndex)));
          }
        });

        if (hasHighlight) {
          token.children = nextChildren;
        }
      });
    });
  },
};

const markdownPunctuationStrongPlugin = {
  name: "punctuation-strong-markdown",
  extendsMarkdown: (md) => {
    const punctuationStrongPattern = /^[\p{P}\p{S}]/u;
    const isEscaped = (source, index) => {
      let backslashCount = 0;

      for (let i = index - 1; i >= 0 && source[i] === "\\"; i--) {
        backslashCount += 1;
      }

      return backslashCount % 2 === 1;
    };

    md.inline.ruler.before("emphasis", "punctuation_strong", (state, silent) => {
      const { src, pos, posMax } = state;

      if (
        pos + 3 >= posMax ||
        src[pos] !== "*" ||
        src[pos + 1] !== "*" ||
        src[pos + 2] === "*"
      ) {
        return false;
      }

      const firstContentChar = src.slice(pos + 2).match(/^./u)?.[0] || "";

      if (!punctuationStrongPattern.test(firstContentChar)) {
        return false;
      }

      let closeIndex = pos + 2 + firstContentChar.length;

      while ((closeIndex = src.indexOf("**", closeIndex)) !== -1) {
        if (!isEscaped(src, closeIndex) && src[closeIndex + 2] !== "*") {
          break;
        }

        closeIndex += 2;
      }

      if (closeIndex === -1) {
        return false;
      }

      const content = src.slice(pos + 2, closeIndex);

      if (!/\S/.test(content)) {
        return false;
      }

      if (!silent) {
        const strongOpen = state.push("strong_open", "strong", 1);
        strongOpen.markup = "**";

        const strongContent = state.push("text", "", 0);
        strongContent.content = content;

        const strongClose = state.push("strong_close", "strong", -1);
        strongClose.markup = "**";
      }

      state.pos = closeIndex + 2;

      return true;
    });
  },
};

const backgroundGroupsScript = JSON.stringify(backgroundGroups);
const restoreBackgroundScript = `\
(() => {
  const storageKey = "xh-background-settings";
  const backgroundGroups = ${backgroundGroupsScript};
  const toCssUrl = (url) =>
    \`url("\${String(url).replace(/\\\\/g, "\\\\\\\\").replace(/"/g, '\\\\"')}")\`;
  const normalizeIndex = (value, count) => {
    if (!count || !Number.isInteger(value)) return 0;
    return ((value % count) + count) % count;
  };
  const getCount = (mode) => {
    const group = backgroundGroups[mode] || backgroundGroups.desktop;

    return Math.max(group.light.length, group.dark.length);
  };
  const getUrl = (mode, theme, index) => {
    const group = backgroundGroups[mode] || backgroundGroups.desktop;
    const primaryList = group[theme] || group.light;
    const fallbackList = theme === "dark" ? group.light : group.dark;
    const normalizedIndex = normalizeIndex(
      index,
      Math.max(primaryList.length, fallbackList.length),
    );

    return (
      primaryList[normalizedIndex] ||
      fallbackList[normalizedIndex] ||
      primaryList[0] ||
      fallbackList[0] ||
      ""
    );
  };

  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "null");

    if (!saved || typeof saved !== "object") return;

    const desktop = normalizeIndex(saved.desktop, getCount("desktop"));
    const mobile = normalizeIndex(saved.mobile, getCount("mobile"));
    const root = document.documentElement;

    root.style.setProperty(
      "--xh-home-bg-desktop",
      toCssUrl(getUrl("desktop", "light", desktop)),
    );
    root.style.setProperty(
      "--xh-home-bg-desktop-dark",
      toCssUrl(getUrl("desktop", "dark", desktop)),
    );
    root.style.setProperty(
      "--xh-home-bg-mobile",
      toCssUrl(getUrl("mobile", "light", mobile)),
    );
    root.style.setProperty(
      "--xh-home-bg-mobile-dark",
      toCssUrl(getUrl("mobile", "dark", mobile)),
    );
  } catch {
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }
})();
`;

const restoreReadingBackgroundScript = `\
(() => {
  const storageKey = "xh-reading-background";
  const colorSchemeKey = "vuepress-color-scheme";
  const allowedBackgrounds = [
    "default",
    "paper",
    "green",
    "pearl",
    "linen",
    "dusk",
    "ink",
    "midnight",
    "graphite",
    "black",
  ];
  const lightBackgrounds = ["paper", "green", "pearl", "linen"];
  const darkBackgrounds = ["dusk", "ink", "midnight", "graphite", "black"];

  const setColorScheme = (scheme) => {
    document.documentElement.dataset.theme = scheme;

    try {
      localStorage.setItem(colorSchemeKey, scheme);
    } catch {}
  };

  try {
    const saved = localStorage.getItem(storageKey) || "default";
    const next = allowedBackgrounds.includes(saved) ? saved : "default";

    document.documentElement.dataset.readingBg = next;

    if (darkBackgrounds.includes(next)) {
      setColorScheme("dark");
    } else if (lightBackgrounds.includes(next)) {
      setColorScheme("light");
    }
  } catch {
    document.documentElement.dataset.readingBg = "default";
  }
})();
`;

export default defineUserConfig({
  lang: "zh-CN",
  title: "xh's blog ",
  base: "/",
  description: "A VuePress bolg Site for personal useage",
  head: [
    [
      "link",
      {
        rel: "preconnect",
        href: "https://i.ibb.co",
      },
    ],
    [
      "link",
      {
        rel: "dns-prefetch",
        href: "https://i.ibb.co",
      },
    ],
    ["script", {}, restoreBackgroundScript],
    ["script", {}, restoreReadingBackgroundScript],
    [
      "link",
      {
        rel: "icon",
        href: "https://i.ibb.co/Df8Pv3Jf/myblog.png",
      },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css",
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.js",
        defer: true,
      },
    ],
    [
      "script",
      {
        src: "https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/contrib/auto-render.min.js",
        defer: true,
      },
    ],
    [
      "script",
      {},
      `
        window.difyChatbotConfig = {
          token: 'PRFQL6hdwlirsgQK',
          baseUrl: 'https://udify.app',
          inputs: {},
          systemVariables: {},
          userVariables: {
            avatar_url: 'https://i.ibb.co/Df8Pv3Jf/myblog.png',
            name: '我',
          },
        }
      `,
    ],
    [
      "style",
      {},
      `
        #dify-chatbot-bubble-button {
          position: fixed !important;
          right: 1.5rem !important;
          bottom: 1rem !important;
          width: 3.625rem !important;
          height: 3.625rem !important;
          border: 1px solid rgb(255 255 255 / 46%) !important;
          border-radius: 999px !important;
          background:
            radial-gradient(circle at 28% 20%, rgb(255 255 255 / 34%), transparent 34%),
            linear-gradient(135deg, #2563eb 0%, #0f9f8f 100%) !important;
          box-shadow:
            0 18px 42px rgb(37 99 235 / 28%),
            0 8px 18px rgb(15 23 42 / 18%),
            inset 0 1px 0 rgb(255 255 255 / 42%) !important;
          z-index: 10001 !important;
          transition:
            box-shadow 0.2s ease,
            filter 0.2s ease,
            transform 0.2s ease !important;
          user-select: none !important;
        }

        #dify-chatbot-bubble-button:hover {
          filter: saturate(1.08) brightness(1.03) !important;
          transform: translateY(-2px) scale(1.02) !important;
          box-shadow:
            0 24px 54px rgb(37 99 235 / 34%),
            0 10px 24px rgb(15 23 42 / 22%),
            inset 0 1px 0 rgb(255 255 255 / 46%) !important;
        }

        #dify-chatbot-bubble-button:active {
          transform: translateY(0) scale(0.98) !important;
        }

        #dify-chatbot-bubble-button:focus-visible {
          outline: 3px solid rgb(56 189 248 / 42%) !important;
          outline-offset: 4px !important;
        }

        #dify-chatbot-bubble-window {
          position: fixed !important;
          right: 1.5rem !important;
          bottom: 5.5rem !important;
          left: auto !important;
          top: auto !important;
          width: min(24rem, calc(100vw - 2rem)) !important;
          height: min(40rem, calc(100vh - 6rem)) !important;
          max-width: calc(100vw - 2rem) !important;
          max-height: calc(100vh - 6rem) !important;
          overflow: hidden !important;
          border: 1px solid rgb(148 163 184 / 28%) !important;
          border-radius: 16px !important;
          background:
            linear-gradient(180deg, rgb(255 255 255 / 98%), rgb(248 250 252 / 96%)) !important;
          box-shadow:
            0 28px 76px rgb(15 23 42 / 26%),
            0 8px 24px rgb(15 23 42 / 16%),
            inset 0 1px 0 rgb(255 255 255 / 80%) !important;
          z-index: 10000 !important;
          transition:
            opacity 0.16s ease,
            transform 0.16s ease,
            box-shadow 0.2s ease !important;
          transform-origin: bottom right !important;
        }

        html[data-theme="dark"] #dify-chatbot-bubble-window {
          border-color: rgb(148 163 184 / 24%) !important;
          background:
            linear-gradient(180deg, rgb(30 41 59 / 98%), rgb(15 23 42 / 98%)) !important;
          box-shadow:
            0 30px 86px rgb(0 0 0 / 50%),
            0 8px 26px rgb(0 0 0 / 30%),
            inset 0 1px 0 rgb(255 255 255 / 8%) !important;
        }

        #dify-chatbot-bubble-window:not([data-xh-positioned="true"]) {
          opacity: 0 !important;
          pointer-events: none !important;
          transform: scale(0.98) !important;
        }

        #dify-chatbot-bubble-window iframe {
          border: 0 !important;
          border-radius: 16px !important;
          background: transparent !important;
        }

        @media (max-width: 480px) {
          #dify-chatbot-bubble-button {
            right: 1rem !important;
            bottom: 1rem !important;
            width: 3.375rem !important;
            height: 3.375rem !important;
          }

          #dify-chatbot-bubble-window {
            right: 1rem !important;
            bottom: 5.5rem !important;
            left: auto !important;
            top: auto !important;
            width: calc(100vw - 2rem) !important;
            height: min(40rem, calc(100vh - 6rem)) !important;
          }
        }
      `,
    ],
    // ========== 新增 Google 验证 meta 标签 ==========
    [
      "meta",
      {
        name: "google-site-verification",
        content: "C4ZL9Ex1hjRQWnZoAkq9jJBLBmvtRbEjWveqGwgGWsc",
      },
    ],
  ],
  markdown: {
    extendMarkdown: (md) => {
      // KaTeX 公式
      md.use(markdownItKatex, {
        throwOnError: false,
        strict: "ignore",
      });
    },
  },
  sidebar: {
    auto: {
      collapsible: true, // 所有层级默认可折叠（默认就是true）
      maxDepth: 3, // 自动生成到 h3（三级标题），左侧侧边栏显示 h1/h2，h3 不显示在左侧（留给右侧）
      minDepth: 2, // 左侧侧边栏仅显示 h1/h2（避免左侧太拥挤）
    },
  },
  theme: defaultTheme({
    logo: "https://i.ibb.co/J0sk1b5/f89933c9d92ac0b5a82b3729a4af8b49.gif",
    logoDark: "https://i.ibb.co/hJTDWKm7/5755f5a31ed6b10208144c9a41166629.gif",
    navbar: [
      {
        text: "文章",
        link: "/article/",
      },
      {
        text: "分类",
        link: "/category/",
      },
      {
        text: "标签",
        link: "/tag/",
      },
      {
        text: "时间线",
        link: "/timeline/",
      },
    ],
    displayAllHeaders: false,
  }),

  plugins: [
    markdownPunctuationStrongPlugin,

    markdownHighlightPlugin,

    stablePageOrderPlugin("stable-page-order-before-blog"),

    // Mermaid 图表：识别并渲染 ```mermaid 代码块
    markdownChartPlugin({
      mermaid: true,
    }),

    blogPlugin({
      // Only files under posts are articles
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith("posts/") : false,

      // Getting article info
      getInfo: ({ frontmatter, title, data }) => ({
        title,
        author: frontmatter.author || "",
        date: frontmatter.date || null,
        category: frontmatter.category || [],
        tag: frontmatter.tag || [],
        excerpt:
          // Support manually set excerpt through frontmatter
          typeof frontmatter.excerpt === "string"
            ? frontmatter.excerpt
            : data?.excerpt || "",
      }),

      // Generate excerpt for all pages excerpt those users choose to disable
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== "string",

      category: [
        {
          key: "category",
          getter: (page) => page.frontmatter.category || [],
          sorter: compareArticlePages,
          layout: "Category",
          itemLayout: "Category",
          frontmatter: () => ({
            title: "Categories",
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: "tag",
          getter: (page) => page.frontmatter.tag || [],
          sorter: compareArticlePages,
          layout: "Tag",
          itemLayout: "Tag",
          frontmatter: () => ({
            title: "Tags",
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: "article",
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: "Article",
          frontmatter: () => ({
            title: "Articles",
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: compareArticlePages,
        },
        {
          key: "timeline",
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: compareTimelinePages,
          layout: "Timeline",
          frontmatter: () => ({
            title: "Timeline",
            sidebar: false,
          }),
        },
      ],

      hotReload: true,
    }),

    stablePageOrderPlugin("stable-page-order-after-blog"),

    // 站点地图（SEO）
    sitemapPlugin({
      hostname: "https://www.xhblog.cc.cd/", // 生产环境：改为你实际部署的域名
      devServer: true, // 开发环境下也生成 sitemap，可通过 http://localhost:8080/sitemap.xml 查看
      devHostname: "http://localhost:8080",
    }),

    // 官方全文搜索插件（替代search-pro）
    slimsearchPlugin({
      indexContent: true, // 关键：开启正文内容索引（支持搜索全文）
      maxSuggestions: 10, // 最多显示10条搜索结果
      locales: {
        "/": {
          placeholder: "搜索文档", // 搜索框占位符
        },
      },
    }),

    // 注册社交分享插件
    socialSharePlugin({
      // 1. 配置支持的分享平台（必选，按需选择）
      networks: [
        "weibo", // 微博
        "wechat", // 微信
        "qq", // QQ
        "twitter", // Twitter
        "facebook", // Facebook
        "linkedin", // LinkedIn
        "copy", // 复制链接（实用功能）
      ],
      // 2. 可选配置：分享按钮位置（默认 bottom-right，底部右侧）
      position: "top-left", // 可选值：top-left/top-right/bottom-left/bottom-right
      // 3. 可选配置：图标样式（默认 circle，圆形）
      iconStyle: "circle", // 可选值：circle/square/rounded-square
      // 4. 可选配置：触发方式（默认 hover，鼠标悬浮显示）
      trigger: "hover", // 可选值：hover/click（点击显示分享面板）
      // 5. 可选配置：分享时的默认标题（优先级：页面 frontmatter.title > 插件配置 title > 站点 title）
      title: "我发现一篇好文章，分享给你！",
      // 6. 可选配置：分享时的默认描述（优先级：页面 frontmatter.description > 插件配置 description）
      description: "来自 Vuepress 站点的优质内容",
    }),

    //评论插件（Giscus 配置需与 https://giscus.app/zh-CN 一致，且字段放在顶层）
    commentPlugin({
      provider: "Giscus",
      comment: true,
      repo: "ksladnasx/vuepress_blog",
      repoId: "R_kgDOQQMX1A",
      category: "Announcements",
      categoryId: "DIC_kwDOQQMX1M4CzSLA",
      mapping: "pathname",
      reactionsEnabled: "1",
      emitMetadata: "0",
      inputPosition: "top",
      lightTheme: "light",
      darkTheme: "dark",
      lang: "zh-CN",
    }),
  ],

  bundler: viteBundler({
    viteOptions: {
      resolve: {
        dedupe: [
          "vue",
          "vue-router",
          "@vueuse/core",
          "@vueuse/shared",
          "@vuepress/helper",
        ],
        alias: [
          {
            find: /^@vueuse\/core$/,
            replacement: vueUseCoreEntry,
          },
          {
            find: /^@vueuse\/shared$/,
            replacement: vueUseSharedEntry,
          },
        ],
      },
      optimizeDeps: {
        include: ["@vueuse/core", "@vueuse/shared"],
      },
      server: {
        proxy: {
          // 本地开发时代理 GitHub API / 资源，减轻 CORS（Giscus iframe 内请求仍由 giscus.app 发出，部署后无此问题）
          "/github-api": {
            target: "https://api.github.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/github-api/, ""),
          },
          "/github-assets": {
            target: "https://github.githubassets.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/github-assets/, ""),
          },
        },
      },
    },
  }),
});
