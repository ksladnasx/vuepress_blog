import { blogPlugin } from "@vuepress/plugin-blog";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { slimsearchPlugin } from "@vuepress/plugin-slimsearch";
import { socialSharePlugin } from 'vuepress-plugin-social-share'
import { commentPlugin } from '@vuepress/plugin-comment'

export default defineUserConfig({
  lang: "zh-CN",
  title: "xh's blog ",
  base: "/vuepress_blog/",
  description: "A VuePress bolg Site for personal useage",
  sidebar: {
    auto: { 
      collapsible: true, // 所有层级默认可折叠（默认就是true）
      maxDepth: 3, // 自动生成到 h3（三级标题），左侧侧边栏显示 h1/h2，h3 不显示在左侧（留给右侧）
      minDepth: 2, // 左侧侧边栏仅显示 h1/h2（避免左侧太拥挤）
    },
  },
  theme: defaultTheme({
    logo: "https://images.icon-icons.com/1113/PNG/512/1486071332-wordpress-blog-multimedia-media-internet-chating-message_79296.png",
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
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1;

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            );
          },
        },
        {
          key: "timeline",
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: "Timeline",
          frontmatter: () => ({
            title: "Timeline",
            sidebar: false,
          }),
        },
      ],

      hotReload: true,
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
        'weibo',    // 微博
        'wechat',   // 微信
        'qq',       // QQ
        'twitter',  // Twitter
        'facebook', // Facebook
        'linkedin', // LinkedIn
        'copy',     // 复制链接（实用功能）
      ],
      // 2. 可选配置：分享按钮位置（默认 bottom-right，底部右侧）
      position: 'top-left', // 可选值：top-left/top-right/bottom-left/bottom-right
      // 3. 可选配置：图标样式（默认 circle，圆形）
      iconStyle: 'circle', // 可选值：circle/square/rounded-square
      // 4. 可选配置：触发方式（默认 hover，鼠标悬浮显示）
      trigger: 'hover', // 可选值：hover/click（点击显示分享面板）
      // 5. 可选配置：分享时的默认标题（优先级：页面 frontmatter.title > 插件配置 title > 站点 title）
      title: '我发现一篇好文章，分享给你！',
      // 6. 可选配置：分享时的默认描述（优先级：页面 frontmatter.description > 插件配置 description）
      description: '来自 Vuepress 站点的优质内容',
    }),

    //评论插件
     commentPlugin({
      provider: 'Giscus',
      options: {
        repo: "ksladnasx/vuepress_blog",
        repoId: "R_kgDOQQMX1A",
        category: "Announcements",
        categoryId: "DIC_kwDOQQMX1M4CzSLA",
        mapping: "pathname",
        reactionsEnabled: "1",
        emitMetadata: "0",
        inputPosition: "top",
        theme: "preferred_color_scheme",
        lang: "zh-CN",
        crossorigin: "anonymous",
      },
    }),
  ],

  bundler: viteBundler(),
});
