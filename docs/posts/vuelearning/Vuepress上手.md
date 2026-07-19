---
date: 2026-07-18
category:
  - 说明文档
tag:
  - Vue3
  - Vuepress
---

# VuePress 基础上手

本文将带你从零创建一个 VuePress 2 文档项目，并了解常用配置、插件安装以及默认主题的布局扩展方式。

---

# 一、环境准备

在开始之前，请确保已经安装以下环境：

* Node.js **v20.9.0 及以上**
* 一个包管理器（推荐 `pnpm`）

推荐安装：

* Node.js：[https://nodejs.org/](https://nodejs.org/)
* pnpm：[https://pnpm.io/](https://pnpm.io/)

> **注意**
>
> 如果 Node 版本不符合要求，建议使用 **nvm** 进行版本切换。

## 使用 pnpm 的注意事项

如果使用 `pnpm`，需要额外安装 `vue`，因为它属于 VuePress 的 Peer Dependency。

```bash
pnpm add -D vue
```

## 使用 Yarn 2+

如果使用 Yarn 2+，需要在 `.yarnrc.yml` 中配置：

```yaml
nodeLinker: node-modules
```

---

# 二、创建项目

VuePress 官方提供了两种创建方式。

## 方法一：脚手架创建（推荐）

官方提供了项目模板，可以一键生成完整工程。

```bash
pnpm create vuepress vuepress-starter
```

适合第一次接触 VuePress。

---

## 方法二：手动创建

如果希望了解 VuePress 的项目结构，可以手动完成搭建。

### 1）创建项目

```bash
mkdir vuepress-starter
cd vuepress-starter
```

初始化 Git 和 package.json：

```bash
git init
pnpm init
```

---

### 2）安装依赖

安装 VuePress 及默认主题：

```bash
pnpm add -D vuepress@next vue
pnpm add -D @vuepress/bundler-vite@next
pnpm add -D @vuepress/theme-default@next
```

---

### 3）创建目录

```text
docs/
└── .vuepress/
```

对应命令：

```bash
mkdir docs
mkdir docs/.vuepress
```

---

### 4）配置 VuePress

在 `docs/.vuepress/config.js` 中编写：

```ts
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { defaultTheme } from "@vuepress/theme-default";

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
});
```

---

### 5）创建首页

```bash
echo '# Hello VuePress' > docs/README.md
```

至此，一个最简单的 VuePress 项目已经创建完成。

---

# 三、项目目录说明

最终目录如下：

```text
vuepress-starter
├── docs
│   ├── README.md
│   └── .vuepress
│       └── config.js
└── package.json
```

其中：

| 目录             | 作用               |
| -------------- | ---------------- |
| docs           | 存放所有 Markdown 文档 |
| docs/.vuepress | VuePress 配置目录    |
| config.js      | 站点配置             |
| README.md      | 首页               |

除了配置文件，这个目录下还会生成缓存、临时文件以及构建产物，建议将它们加入 `.gitignore`。

---

# 四、解决 pnpm 依赖冲突

部分插件会因为 Peer Dependency 校验导致安装失败。

可以在 `package.json` 中添加：

```json
{
  "pnpm": {
    "peerDependencyRules": {
      "ignoreMissing": ["vuepress"],
      "allowedVersions": {
        "vuepress": "2.0.0-rc.20"
      }
    }
  }
}
```

这样可以避免 VuePress 版本校验导致的安装问题。

---

# 五、推荐插件

## 全文搜索插件

VuePress 官方推荐使用 **SlimSearch** 实现本地全文搜索。

安装：

```bash
pnpm add -D @vuepress/plugin-slimsearch@next --force
```

配置：

```ts
import { slimsearchPlugin } from "@vuepress/plugin-slimsearch";

export default defineUserConfig({
  plugins: [
    slimsearchPlugin({
      indexContent: true,
      maxSuggestions: 10,
      locales: {
        "/": {
          placeholder: "搜索文档",
        },
      },
    }),
  ],
});
```

其中：

* `indexContent`：是否建立正文索引
* `maxSuggestions`：搜索结果数量
* `placeholder`：搜索框占位文字

开启后即可支持全文搜索。

---

# 六、布局自定义（Slot）

VuePress 默认主题提供了大量 **Slot（插槽）**，无需修改源码即可扩展页面。

大多数情况下，我们并不需要修改 `Layout.vue`，只需要使用对应插槽即可。

## 常用插槽

| 插槽             | 用途    |
| -------------- | ----- |
| navbar-before  | 导航栏左侧 |
| navbar-after   | 导航栏右侧 |
| sidebar-top    | 侧边栏顶部 |
| sidebar-bottom | 侧边栏底部 |
| page-top       | 正文顶部  |
| page-bottom    | 正文底部  |

例如：

```vue
<template #navbar-after>
  <FontSwitcher />
</template>
```

这样便会在导航栏右侧增加一个字体切换按钮。

---

## 页面级自定义

如果只希望某一个页面生效，可以直接在当前页面中编写：

```vue
<template #sidebar>
  <CollapsibleSidebar />
</template>
```

不会影响其他页面。

---

## 全站自定义

如果希望整个网站统一修改布局，可以覆盖主题的 `Layout.vue`。

目录：

```text
docs
└── .vuepress
    └── theme
        └── Layout.vue
```

例如：

```vue
<slot name="sidebar">
  <MySidebar />
</slot>
```

以后所有页面都会使用新的默认侧边栏。

---

## 什么时候该使用 Slot？

推荐遵循下面的原则：

| 需求       | 推荐方式          |
| -------- | ------------- |
| 增加按钮     | Slot          |
| 增加评论区    | Slot          |
| 修改侧边栏    | Slot          |
| 某一页特殊布局  | Slot          |
| 调整整体页面结构 | 覆盖 Layout.vue |

一般来说：

> **能使用 Slot，就不要覆盖 Layout。**

只有当需要修改整个页面结构时，再考虑重写 `Layout.vue`。

---

# 七、常见问题

## 插槽为什么没有生效？

通常可以检查以下几个方面：

1. 插槽名称是否正确（区分大小写）。
2. 是否在正确的页面或组件中使用。
3. 是否存在多个 `Layout.vue`，导致主题被覆盖。

---

## 什么情况下必须重写 Layout？

只有以下几种情况建议重写：

* 删除默认布局组件；
* 修改页面整体结构；
* 全站统一替换布局。

除此之外，绝大多数扩展需求都可以通过 Slot 完成。

---

## 总结

完成以上步骤后，你已经掌握了 VuePress 的基本使用流程：

1. 准备 Node 与包管理器环境。
2. 创建并配置 VuePress 项目。
3. 了解项目目录结构。
4. 安装常用插件（如全文搜索）。
5. 使用 Slot 扩展默认主题，而不是直接修改源码。
