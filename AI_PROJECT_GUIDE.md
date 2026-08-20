# AI 项目上手说明：VuePress Blog

> 这份文档写给后续接手本仓库的 AI / 开发者，用来快速理解项目结构、自定义组件职责、关键状态存储和常见修改入口。  
> 建议优先阅读本文件，再看 `README.md`、`docs/.vuepress/config.js` 和 `docs/.vuepress/client.js`。

## 1. 项目定位

这是一个基于 **VuePress 2** 的个人博客项目，核心内容在 `docs/posts/`，站点配置和定制能力集中在 `docs/.vuepress/`。

主要能力：

- VuePress 2 静态博客构建。
- 文章、分类、标签、时间线归档。
- 首页仪表盘、文章列表、阅读页上下篇导航。
- 明暗主题、首页壁纸、阅读背景、页面亮度、字体设置。
- 自定义可折叠侧边栏。
- 文章页文本朗读。
- Giscus 评论、SlimSearch 搜索、Sitemap、社交分享。
- `/admin/` 静态文章后台，通过 GitHub API 发布文章和上传图片。

## 2. 先看哪些文件

```txt
vuepress_blog/
├─ package.json                          # 命令与依赖
├─ README.md                             # 项目整体说明
├─ AI_PROJECT_GUIDE.md                   # 本文件，给 AI 的快速上手说明
├─ docs/
│  ├─ README.md                          # VuePress 首页，使用 <HomeDashboard />
│  ├─ get-started.md                     # 介绍页，使用 <ResumeExperienceList />
│  ├─ posts/                             # Markdown 博客文章
│  └─ .vuepress/
│     ├─ config.js                       # VuePress 站点、插件、head、blogPlugin 配置
│     ├─ client.js                       # 客户端增强：布局注册、全局组件、Dify、KaTeX 二次渲染
│     ├─ backgrounds.js                  # 首页壁纸资源与取图工具函数
│     ├─ components/                     # 自定义 Vue 组件
│     ├─ layouts/                        # 自定义布局
│     ├─ styles/index.scss               # 全局主题、阅读背景、布局覆盖样式
│     └─ public/
│        ├─ admin/                       # 静态文章后台
│        ├─ uploads/                     # 上传图片等静态资源
│        └─ *.woff2                      # 字体文件
```

不建议优先阅读：

- `docs/.vuepress/.cache/`
- `docs/.vuepress/.temp/`
- `docs/.vuepress/dist/`
- `node_modules/`

这些是依赖、临时文件或构建产物，不是项目源代码主线。

## 3. 常用命令

```bash
npm install
npm run docs
npm run docs:build
```

- `npm run docs`：启动 VuePress 开发服务。
- `npm run docs:build`：构建静态站点，产物在 `docs/.vuepress/dist/`。
- 项目使用 npm / package-lock；仓库中也有 pnpm lock，但当前 README 和 scripts 以 npm 为主。

## 4. VuePress 配置主线

### 4.1 `docs/.vuepress/config.js`

这是服务端 / 构建期配置入口。

重点内容：

1. **站点基础信息**
   - `lang: "zh-CN"`
   - `title: "xh's blog "`
   - `base: "/"`
   - 默认主题 `defaultTheme(...)`

2. **head 注入**
   - 图片域名预连接：`https://i.ibb.co`
   - favicon。
   - KaTeX CSS / JS。
   - Dify Chatbot 配置和气泡窗口样式。
   - Google 站点验证 meta。
   - 早期恢复脚本：
     - `restoreBackgroundScript`：页面加载前恢复首页壁纸 CSS 变量，避免闪烁。
     - `restoreReadingBackgroundScript`：页面加载前恢复阅读背景 `data-reading-bg`。

3. **Markdown 扩展**
   - `markdown-it-katex`：支持数学公式。
   - `markdownHighlightPlugin`：保守处理 `==高亮==`，只在普通段落文本中转换为 `<mark>`。
   - `markdownImagePathPlugin`：把 HTML `<img src="...">` 中的反斜杠路径转成斜杠，兼容 Windows 路径。
   - `markdownPunctuationStrongPlugin`：支持以标点 / 符号开头的 `**加粗**` 内容。
   - `markdownChartPlugin({ mermaid: true })`：支持 ```mermaid 代码块。

4. **blogPlugin 文章系统**
   - 只把 `docs/posts/` 下的文件视作文章：`filePathRelative.startsWith("posts/")`。
   - `getInfo` 输出文章信息：`title`、`author`、`date`、`category`、`tag`、`excerpt`。
   - `category` 维度：生成 `/category/` 及分类详情页，使用 `Category` 布局。
   - `tag` 维度：生成 `/tag/` 及标签详情页，使用 `Tag` 布局。
   - `article` 类型：生成 `/article/`，过滤 `archive`，用置顶和日期排序，使用 `Article` 布局。
   - `timeline` 类型：生成 `/timeline/`，只收录有 date 的文章，按日期排序，使用 `Timeline` 布局。

5. **其他插件**
   - `mediumZoomPlugin`：图片放大，容器为 `#xh-medium-zoom-container`。
   - `sitemapPlugin`：站点地图。
   - `slimsearchPlugin`：全文搜索。
   - `socialSharePlugin`：社交分享。
   - `commentPlugin`：Giscus 评论。

6. **Vite bundler 配置**
   - 对 Vue、Vue Router、VueUse 等做 `dedupe`。
   - 给 `@vueuse/core`、`@vueuse/shared` 做 alias，避免依赖重复导致运行异常。
   - 本地开发时代理 GitHub API / assets，主要服务于调试。

### 4.2 `docs/.vuepress/client.js`

这是客户端增强入口。

职责：

- 注册自定义布局：`Layout`、`Article`、`Category`、`Tag`、`Timeline`。
- 全局注册 Markdown 可直接使用的组件：
  - `HomeDashboard`
  - `ResumeExperienceList`
- 引入全局样式：`./styles/index.scss`。
- 加载并增强 Dify Chatbot：
  - 插入 `https://udify.app/embed.min.js`。
  - 让聊天气泡可拖拽。
  - 将气泡位置保存到 localStorage：`xh-dify-chatbot-position`。
  - 根据气泡位置重新定位聊天窗口，避免溢出屏幕。
- 二次执行 KaTeX auto-render：路由切换后对 `.vp-page [vp-content]` 渲染公式。
- 确保图片放大插件使用的 `#xh-medium-zoom-container` 存在。

## 5. 自定义布局

布局目录：`docs/.vuepress/layouts/`

### 5.1 `Layout.vue`

默认页面布局的包装层，基于 VuePress 默认主题 `ParentLayout`。

用途：

- 给所有普通页面的 navbar 后面增加：
  - `/admin/` 文章后台入口。
  - `FontSwitcher` 字体设置。
  - `ReadingBackgroundSwitcher` 显示设置。
- 替换默认 sidebar 为 `CollapsibleSidebar`。
- 在文章正文页底部增加：
  - `TextReader` 文本朗读。
  - `ArticleReadingLinks` 同分类上一篇 / 下一篇导航。
  - Giscus `CommentService` 评论区。

文章正文页判断逻辑：路径以 `/posts/` 开头，且去掉 `/posts/` 后仍有具体路径。

### 5.2 `Article.vue`

文章列表页布局，对应 `/article/`。

用途：

- 从 `useBlogType('article')` 获取文章。
- 过滤掉：
  - `/posts/codes/`
  - `/posts/meaningless/`
- 使用 `ArticleList` 渲染卡片列表。
- navbar 后追加 `FontSwitcher` 和 `ReadingBackgroundSwitcher`。

### 5.3 `Category.vue`

分类页布局，对应 `/category/` 和具体分类页。

用途：

- 从 `useBlogCategory('category')` 获取分类映射。
- 渲染分类云：分类名 + 文章数量。
- 根据当前路由高亮分类。
- 使用 `ArticleList :items="categoryMap.currentItems ?? []"` 展示当前分类文章。

### 5.4 `Tag.vue`

标签页布局，对应 `/tag/` 和具体标签页。

用途：

- 从 `useBlogCategory('tag')` 获取标签映射。
- 渲染标签云：标签名 + 文章数量。
- 使用 `ArticleList` 展示当前标签文章。

### 5.5 `Timeline.vue`

时间线页布局，对应 `/timeline/`。

用途：

- 从 `useBlogType('timeline')` 获取所有带 date 的文章。
- 过滤掉：
  - `/posts/codes/`
  - `/posts/meaningless/`
- 提供年份 / 月份筛选。
- 用时间轴卡片展示文章日期、标题、分类、标签、摘要。
- 点击卡片跳转文章。

## 6. 自定义组件总览

组件目录：`docs/.vuepress/components/`

| 组件 | 当前使用位置 | 主要作用 |
| --- | --- | --- |
| `ArticleList.vue` | `Article.vue`、`Category.vue`、`Tag.vue` | 统一渲染文章卡片列表 |
| `ArticleReadingLinks.vue` | `Layout.vue` 文章页底部 | 同分类上一篇 / 下一篇导航 |
| `BackgroundSwitcher.vue` | 当前源代码中未被引用 | 早期 / 独立版首页背景切换组件 |
| `CollapsibleSidebar.vue` | `Layout.vue` sidebar slot | 可整体收起的侧边栏容器 |
| `CollapsibleSidebarItems.vue` | `CollapsibleSidebar.vue` | 读取 VuePress sidebar 数据并滚动到当前项 |
| `CollapsibleSidebarItem.vue` | `CollapsibleSidebarItems.vue`，递归调用自身 | 单个可折叠 sidebar 节点 |
| `FontSwitcher.vue` | 各布局 navbar 后 | 字体、字号、行高、字距、字重、文字颜色、代码字体设置 |
| `HomeDashboard.vue` | `docs/README.md` | 首页仪表盘：统计、最近文章、关注领域、技术栈 |
| `MermaidChart.vue` | 当前源代码中未被引用 | 手动传入 Mermaid 代码并渲染 SVG；现在主要由 markdown chart 插件承担代码块渲染 |
| `ReadingBackgroundSwitcher.vue` | 各布局 navbar 后 | 主题、阅读背景、页面亮度、首页壁纸设置 |
| `ResumeExperienceList.vue` | `docs/get-started.md` | 简历 / 项目经历列表 |
| `TextReader.vue` | `Layout.vue` 文章页底部 | 文章文本朗读浮动控件 |

## 7. 组件详情

### 7.1 `ArticleList.vue`

**作用**：统一文章卡片列表。

Props：

- `items: Array`，必传。来自 VuePress blog plugin 的文章条目。
- `isTimeline: Boolean`，旧逻辑保留；为 true 时标题显示“时间线”，并在卡片标题前拼接日期。
- `kind: String`，`Article.vue` 传入 `"Article"`，用于决定是否展示页头。

展示内容：

- 文章标题。
- 作者、日期、分类、标签。
- 摘要 `info.excerpt`，通过 `v-html` 输出。
- 空状态提示。
- “阅读全文”视觉提示。

点击行为：

- 点击整张卡片执行 `$router.push(path)`。
- `handleTagClick` 目前只阻止事件并打印日志，模板中没有实际绑定到标签跳转逻辑。

注意：

- `info.category` 在模板里按数组处理，显示 `info.category[0]`。
- 如果后续要支持点击标签 / 分类跳转，需要避免触发卡片整体跳转。

### 7.2 `ArticleReadingLinks.vue`

**作用**：文章底部同分类上一篇 / 下一篇导航。

数据来源：

- `useBlogType("article")`
- 当前路由 `useRoute()`

核心逻辑：

1. 根据当前路径找到当前文章。
2. 取当前文章的分类数组。
3. 在所有文章里筛选“同分类、不是当前文章、有有效 date”的文章。
4. `previousArticle`：发布时间晚于当前文章、但最接近当前文章的那一篇。
5. `nextArticle`：发布时间早于当前文章、但最接近当前文章的那一篇。

文案：

- 没有上一篇时显示“暂无更新文章”。
- 没有下一篇时显示“暂无更早文章”。

注意：

- “上一篇”在这里指同分类中更新的一篇；“下一篇”指同分类中更早的一篇。
- 如果文章没有 date，就不会给出上下篇。

### 7.3 `BackgroundSwitcher.vue`

**作用**：首页背景切换组件，但当前未在布局或 Markdown 中引用。

它使用 `docs/.vuepress/backgrounds.js` 中的资源：

- desktop light / dark 背景。
- mobile light / dark 背景。

主要能力：

- 识别移动端：`(max-width: 719px)`。
- 分别保存 desktop / mobile 背景索引。
- 把背景写入 CSS 变量：
  - `--xh-home-bg-desktop`
  - `--xh-home-bg-desktop-dark`
  - `--xh-home-bg-mobile`
  - `--xh-home-bg-mobile-dark`
- 保存到 localStorage：`xh-background-settings`。
- 在网络条件允许时低优先级预取其他背景图。

注意：

- 目前更完整的“显示设置 + 首页壁纸”能力已经放进 `ReadingBackgroundSwitcher.vue`。
- 如果不打算恢复独立背景切换按钮，可以保留为备用，或后续清理。

### 7.4 `CollapsibleSidebar.vue`

**作用**：替换默认主题 sidebar，提供整体收起 / 展开。

核心行为：

- 内部渲染：
  - `VPNavbarItems`
  - `CollapsibleSidebarItems`
- 点击右侧按钮切换 `isCollapsed`。
- 把状态写入 document 根节点属性：`data-sidebar-collapsed`。
- 保存到 localStorage：`xh-sidebar-collapsed`。
- 卸载时移除 `data-sidebar-collapsed`。

样式依赖：

- `docs/.vuepress/styles/index.scss` 中有大量基于 `html[data-sidebar-collapsed]` 的全局布局调整。

### 7.5 `CollapsibleSidebarItems.vue`

**作用**：读取 VuePress 默认主题提供的 sidebar 数据并渲染递归节点。

数据来源：

- `useSidebarItems()`

核心行为：

- 渲染顶层 `CollapsibleSidebarItem`。
- 监听 `route.path`、`route.hash`、`sidebarItems.value`。
- 路由变化后滚动当前激活项到可视区域。

### 7.6 `CollapsibleSidebarItem.vue`

**作用**：单个 sidebar 节点，支持递归折叠、激活判断和 hash 锚点匹配。

Props：

- `item: Object`，必传，VuePress sidebar 节点。
- `depth: Number`，默认 0，用于层级样式和默认展开策略。

核心逻辑：

- `normalizePath`：统一解码路径，去掉 hash、`index.md`、`.html` 等差异。
- `isLinkActive`：支持路径和 hash 精确匹配。
- `isSidebarItemActive`：递归判断自己或子节点是否激活。
- 顶层节点默认展开；当前激活节点会自动展开。
- 路由 path 变化后重新计算默认展开状态。

模板：

- 有 link 时用 `VPAutoLink`。
- 无 link 时用 button。
- 有 children 时显示箭头按钮，并递归渲染 `CollapsibleSidebarItem`。

### 7.7 `FontSwitcher.vue`

**作用**：navbar 中的字体与排版设置面板。

localStorage：

- 当前配置：`xh-font-settings`
- 兼容旧配置：`xh-font`

可选字体：

- `system`：系统字体。
- `lxgw`：霞鹜文楷，使用 `/LXGWWENKAI-REGULAR.woff2`。
- `simkai`：楷体，使用 `/SIMKAI.woff2`。
- `fangsong`：仿宋，使用 `/STFANGSO.woff2`。
- `fzstk`：方舒，使用 `/FZSTK.woff2`。
- `qingfeng`：清风手体，使用 `/KaiXinJiuXiaoLinYuJiuZou-2.woff2`。

默认设置：

```js
{
  font: "system",
  size: 20,
  lineHeight: 1.65,
  letterSpacing: 1,
  weight: 400,
  color: "",
  codeFont: true,
}
```

它会写入这些根节点状态 / CSS 变量：

- `html[data-font]`
- `html[data-code-font]`
- `html[data-font-color]`
- `--xh-font-size`
- `--xh-line-height`
- `--xh-letter-spacing`
- `--xh-font-weight`
- `--xh-font-stroke`
- `--xh-font-color`
- 多个 VuePress 文本色变量，如 `--vp-c-text`

其他行为：

- 使用 `FontFace` API 懒加载字体；不支持时注入 `@font-face` style。
- 监听主题变化，刷新“默认文字颜色”。
- 面板打开时通过自定义事件 `xh-settings-panel-open` 通知其他设置面板关闭。
- 点击外部或按 Escape 关闭面板。

注意：

- 字体文件在 `docs/.vuepress/public/`，构建后会映射到站点根路径，如 `/SIMKAI.woff2`。
- 改字体变量时应同步检查 `styles/index.scss` 中对这些变量的使用。

### 7.8 `HomeDashboard.vue`

**作用**：首页内容组件，在 `docs/README.md` 中通过 `<HomeDashboard />` 使用。

数据来源：

- `useBlogType("timeline")`
- `useBlogCategory("tag")`
- `useBlogCategory("category")`

展示区块：

- Hero / 引导文案。
- 最近文章：取过滤后的最新 4 篇。
- 统计卡片：公开笔记数、分类数、标签数、时间线数。
- 关注领域：项目复盘、前端工程、后端与部署、面试与基础。
- 技术栈卡片：Vue 3、VuePress、TypeScript、Docker、Nginx、Vitest、Nuxt。

过滤逻辑：

- 排除：
  - `/posts/codes/`
  - `/posts/meaningless/`
  - `/posts/classlearning/`

注意：

- 技术栈图标使用外部 URL。
- 首页组件被 `client.js` 全局注册，所以 Markdown 中可以直接写 `<HomeDashboard />`。

### 7.9 `MermaidChart.vue`

**作用**：手动渲染 Mermaid 代码为 SVG。

Props：

- `code: String`，必传。

核心行为：

- 动态导入 `mermaid`。
- `mermaid.initialize({ startOnLoad: false, securityLevel: "loose", theme: "default" })`。
- 调用 `mermaid.render(...)` 得到 SVG，并通过 `v-html` 渲染。
- 渲染失败时显示错误提示。

注意：

- 当前项目已经启用 `markdownChartPlugin({ mermaid: true })`，普通 Markdown Mermaid 代码块通常不需要手动使用这个组件。
- 如果后续发现 Mermaid 代码块无法满足定制需求，可以再启用此组件。

### 7.10 `ReadingBackgroundSwitcher.vue`

**作用**：navbar 中的“显示设置”面板，是当前主要的主题 / 阅读背景 / 首页壁纸入口。

Props：

- `isReadingPage: Boolean`：是否文章正文页。为 true 时显示阅读背景选项，并把背景应用到正文页。
- `isHomePage: Boolean`：是否首页。为 true 时显示首页壁纸设置。

localStorage：

- 阅读背景：`xh-reading-background`
- 页面亮度：`xh-page-brightness`
- VuePress 明暗主题：`vuepress-color-scheme`
- 首页壁纸设置：`xh-background-settings`

阅读背景选项：

- `default`：默认 / 跟随系统。
- 亮色背景：`paper`、`green`、`pearl`、`linen`。
- 暗色背景：`dusk`、`ink`、`midnight`、`graphite`、`black`。

它会写入：

- `html[data-reading-bg="..."]`
- `html[data-theme="light|dark"]`
- `--xh-page-brightness-overlay-color`
- `--xh-page-brightness-overlay-opacity`
- 首页背景 CSS 变量：
  - `--xh-home-bg-desktop`
  - `--xh-home-bg-desktop-dark`
  - `--xh-home-bg-mobile`
  - `--xh-home-bg-mobile-dark`

首页壁纸模式：

- `fixed`：使用 `backgrounds.js` 中固定资源，切换索引。
- `random`：使用外部随机图源：
  - PC：`https://esa-img.loliapi.cn/i/pc/img{index}.webp`
  - 移动端：`https://eo-img.iloli.love/i/pe/img{index}.webp`

其他行为：

- 页面亮度范围：60% - 120%，默认 100%。
- 选择特定阅读背景时会自动切换 light / dark 主题。
- 如果当前主题与阅读背景不兼容，会回退到默认背景。
- 使用 `xh-settings-panel-open` 事件与 `FontSwitcher` 互斥打开。
- 首页随机壁纸加载失败时回退固定壁纸并提示。

注意：

- `config.js` 中有早期恢复脚本配合它，避免刷新时背景闪烁。
- `styles/index.scss` 中定义了所有 `data-reading-bg` 对应的变量。

### 7.11 `ResumeExperienceList.vue`

**作用**：简历 / 介绍页中的项目经历列表。

Props：

- `items: Array`，默认空数组。

每个 item 约定字段：

```js
{
  time: "2025.12 - 2026.05",
  title: "项目名称",
  description: "项目描述"
}
```

当前使用位置：

- `docs/get-started.md`

注意：

- 它被 `client.js` 全局注册，Markdown 可以直接用 `<ResumeExperienceList :items="experiences" />`。

### 7.12 `TextReader.vue`

**作用**：文章页底部的文本朗读浮动控件，基于浏览器 Web Speech API。

localStorage：

- 悬浮按钮位置：`xh-text-reader-position`

核心能力：

- 检测浏览器是否支持 `window.speechSynthesis`。
- 从正文区域 `.vp-page [vp-content], .theme-default-content` 提取文本。
- 排除 `pre`、`script`、`style`、`button`、`select`、`.header-anchor`、`.xh-text-reader` 等不应朗读的内容。
- 支持从“当前位置”或“从头开始”朗读。
- “当前位置”优先根据 URL hash 找标题；没有 hash 时根据滚动位置找当前标题。
- 将文本按中文 / 英文标点拆成较短片段，单段大约不超过 180 字。
- 支持播放 / 暂停 / 继续 / 停止。
- 支持语速、音色、音调、音量设置。
- 切换文章时自动停止并重新准备文本。
- 悬浮按钮可拖拽，位置自动限制在窗口内并保存。
- 面板会根据视口空间自动决定向上 / 向下、向左 / 向右展开。

注意：

- Web Speech API 的可用音色取决于用户浏览器 / 操作系统。
- 语速、音调、音量等调整通常在下一段朗读时生效。
- 如果正文 DOM 结构变化，需要同步检查 `getArticleElement()` 和 `removeIgnoredContent()`。

## 8. 背景资源工具

文件：`docs/.vuepress/backgrounds.js`

导出内容：

- `desktopLightBackgrounds`
- `desktopDarkBackgrounds`
- `mobileLightBackgrounds`
- `mobileDarkBackgrounds`
- `backgroundGroups`
- `normalizeBackgroundIndex(value, count)`
- `getBackgroundCount(mode)`
- `getBackgroundUrl(mode, theme, index)`

主要使用者：

- `config.js` 的 `restoreBackgroundScript`
- `BackgroundSwitcher.vue`
- `ReadingBackgroundSwitcher.vue`

注意：

- 增加固定首页壁纸时，优先改这里。
- light / dark 数量可以不完全一致，`getBackgroundUrl` 有 fallback。

## 9. 全局样式约定

文件：`docs/.vuepress/styles/index.scss`

这不是普通的小样式文件，而是项目视觉系统的核心。

重点变量 / 状态：

- 字体与排版：
  - `--xh-font-family`
  - `--xh-code-font-family`
  - `--xh-font-size`
  - `--xh-line-height`
  - `--xh-letter-spacing`
  - `--xh-font-weight`
  - `--xh-font-stroke`
- 主题色：
  - `--xh-accent-rgb`
  - `--vp-c-accent`
  - `--vp-c-text`
  - `--vp-c-bg`
- 首页壁纸：
  - `--xh-home-bg-desktop`
  - `--xh-home-bg-desktop-dark`
  - `--xh-home-bg-mobile`
  - `--xh-home-bg-mobile-dark`
- 阅读背景：
  - `--xh-reading-page-bg`
  - `--xh-reading-content-bg`
  - `--xh-reading-content-border`
  - `--xh-reading-content-shadow`
  - `--xh-reading-text`
  - `--xh-reading-muted`
- 页面亮度遮罩：
  - `--xh-page-brightness-overlay-color`
  - `--xh-page-brightness-overlay-opacity`

重要 data 属性：

- `html[data-theme="dark"]`：暗色主题。
- `html[data-reading-bg="..."]`：阅读背景。
- `html[data-sidebar-collapsed]`：侧边栏整体收起。
- `html[data-font="..."]`：当前字体。
- `html[data-code-font="custom|system"]`：代码字体是否跟随正文。
- `html[data-font-color="custom|default"]`：文字颜色是否自定义。

修改建议：

- 改视觉效果前先搜变量名，避免只改组件不改全局变量。
- 阅读背景新增 key 时，需要同时改：
  1. `ReadingBackgroundSwitcher.vue` 的 `backgrounds` 数组。
  2. `config.js` 的 `restoreReadingBackgroundScript.allowedBackgrounds`。
  3. `styles/index.scss` 中新增 `html[data-reading-bg="key"]` 变量组。

## 10. 静态文章后台 `/admin/`

目录：`docs/.vuepress/public/admin/`

入口文件：

- `index.html`
- `styles.css`
- `app.js`
- `README.md`

作用：

- 提供一个纯前端文章管理后台。
- 用户输入 GitHub Fine-grained Personal Access Token。
- 在浏览器里调用 GitHub API 读取 / 提交仓库内容。
- 编辑、新建、删除、上传图片先进入本地草稿队列。
- 点击“发布修改”后统一提交到 `main` 分支。
- GitHub Actions 随后构建并发布到 `gh-pages`。

关键常量：

```js
const REPOSITORY = "ksladnasx/vuepress_blog";
const BRANCH = "main";
const POSTS_ROOT = "docs/posts/";
const UPLOADS_ROOT = "docs/.vuepress/public/uploads/";
const TOKEN_KEY = "xh-blog-admin-token";
const DB_NAME = "xh-blog-admin";
const DRAFT_STORE = "drafts";
```

本地存储：

- Token 保存到 localStorage：`xh-blog-admin-token`。
- 草稿、待删除状态、待上传图片保存到 IndexedDB：`xh-blog-admin`。

注意：

- 后台位于 `public/`，会原样复制到构建产物，不经过 Vue 编译。
- 修改后台时直接编辑原生 HTML / CSS / JS。
- 不要在代码中硬编码更高权限的 Token。
- 上传图片推荐在文章中使用：

```html
<img src="/uploads/2026/example.webp" alt="图片说明" style="width: 80%; height: auto;" />
```

## 11. 文章 frontmatter 约定

blogPlugin 会读取这些字段：

```yaml
---
title: 文章标题
author: 作者
date: 2026-01-01
category:
  - 分类名
tag:
  - 标签名
sticky: 1
archive: false
excerpt: 摘要内容
---
```

说明：

- `date` 影响文章列表、时间线、上下篇导航排序。
- `sticky` 越大越靠前，仅影响 article/category/tag 等文章列表排序。
- `archive: true` 会从 `/article/` 类型中排除。
- `category` 和 `tag` 最好保持数组形式。
- `excerpt: false` 可禁用自动摘要。
- `excerpt: "..."` 可手动指定摘要。

## 12. 常见修改入口

### 新增文章

- 手动新增：放到 `docs/posts/` 下，写好 frontmatter。
- 后台新增：访问 `/admin/`，通过 GitHub Token 发布。

### 新增首页固定壁纸

1. 修改 `docs/.vuepress/backgrounds.js` 中对应数组。
2. 如涉及视觉默认值，检查 `styles/index.scss` 根变量。
3. 构建检查首页 light / dark、desktop / mobile 效果。

### 新增阅读背景

1. `ReadingBackgroundSwitcher.vue`：给 `backgrounds` 数组加 key、label、name、scheme。
2. `config.js`：给 `restoreReadingBackgroundScript.allowedBackgrounds` 加同一个 key。
3. `styles/index.scss`：新增 `html[data-reading-bg="key"]` 变量组。
4. 检查亮色 / 暗色切换是否符合预期。

### 新增字体

1. 字体文件放入 `docs/.vuepress/public/`。
2. `FontSwitcher.vue`：
   - `fonts` 数组增加选项。
   - `customFontFaces` 增加 family 和 source。
3. `styles/index.scss`：如果需要特殊字体映射，补充相关规则。

### 调整文章列表过滤规则

需要同时检查：

- `Article.vue`
- `Timeline.vue`
- `HomeDashboard.vue`
- 可能还有 `ArticleReadingLinks.vue`，如果上下篇也需要排除某些目录。

当前过滤并不完全统一：

- `Article.vue` / `Timeline.vue` 排除 `codes`、`meaningless`。
- `HomeDashboard.vue` 额外排除 `classlearning`。
- `ArticleReadingLinks.vue` 当前不排除这些目录，只按同分类和日期找上下篇。

### 调整文章页阅读体验

优先看：

- `Layout.vue`：文章页底部挂载了哪些功能。
- `ReadingBackgroundSwitcher.vue`：阅读背景、亮度、主题。
- `TextReader.vue`：朗读。
- `ArticleReadingLinks.vue`：上下篇。
- `styles/index.scss`：正文布局、阅读页背景、代码块、表格等样式。

## 13. AI 接手时的建议流程

1. 先确认用户要改的是：内容文章、VuePress 配置、组件交互、样式，还是 `/admin/` 后台。
2. 普通站点功能优先看：
   - `docs/.vuepress/config.js`
   - `docs/.vuepress/client.js`
   - `docs/.vuepress/layouts/`
   - `docs/.vuepress/components/`
   - `docs/.vuepress/styles/index.scss`
3. 后台功能优先看：
   - `docs/.vuepress/public/admin/README.md`
   - `docs/.vuepress/public/admin/app.js`
   - `docs/.vuepress/public/admin/index.html`
   - `docs/.vuepress/public/admin/styles.css`
4. 避免编辑构建产物和缓存目录。
5. 修改涉及 localStorage key 或 data 属性时，要全仓库搜索同名 key。
6. 修改视觉设置时，同时检查组件逻辑和 `styles/index.scss`。
7. 修改后至少运行一次构建：`npm run docs:build`。

## 14. 当前可留意的代码现状

这些不是必须立刻处理的问题，但后续 AI 修改时应知道：

- `BackgroundSwitcher.vue` 当前未被引用，功能与 `ReadingBackgroundSwitcher.vue` 的首页壁纸部分有重叠。
- `MermaidChart.vue` 当前未被引用；Mermaid 主要由 `markdownChartPlugin` 处理。
- `ArticleList.vue` 中 `handleTagClick` 当前没有实际模板绑定。
- 文章过滤规则在 `Article.vue`、`Timeline.vue`、`HomeDashboard.vue`、`ArticleReadingLinks.vue` 中不完全一致。
- `/admin/` 是 public 静态后台，不走 VuePress/Vue SFC 编译链路。
