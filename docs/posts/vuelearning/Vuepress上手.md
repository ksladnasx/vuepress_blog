---
date: 2025-12-01
category:
  - 说明文档
tag:
  - Vue3
  - Vuepress
---

# Vuepress基础上手

## 安装

### 依赖环境

注意node版本要对，不对用nvm换
- [Node.js v20.9.0+](https://nodejs.org/)
- 包管理器，如:[pnpm](https://pnpm.io/zh/)[yarn](https://classic.yarnpkg.com/en/)[npm](https://www.npmjs.com/) 等。

提示

- 使用 [pnpm](https://pnpm.io/zh/)时，你需要安装 `vue` 作为 peer-dependencies 。
- 使用 [yarn 2+](https://yarnpkg.com/)时，你需要在 [`.yarnrc.yml`](https://yarnpkg.com/configuration/yarnrc#nodeLinker) 文件中设置 `nodeLinker: 'node-modules'` 。

### 创建项目

#### 通过命令行创建

你可以通过 [create-vuepress](https://www.npmjs.com/package/create-vuepress) 直接创建项目模板。

```bash
pnpm create vuepress vuepress-starter
```

#### 手动创建

这一章节会帮助你从头搭建一个简单的 VuePress 文档网站。

- 创建并进入一个新目录

```bash
mkdir vuepress-starter
cd vuepress-starter
```

- 初始化项目

```bash
git init
pnpm init
```

- 安装 VuePress

```bash
# 安装 vuepress 和 vue
pnpm add -D vuepress@next vue
# 安装打包工具和主题
pnpm add -D @vuepress/bundler-vite@next @vuepress/theme-default@next
```

- 创建 `docs` 目录和 `docs/.vuepress` 目录

```bash
mkdir docs
mkdir docs/.vuepress
```

- 创建 VuePress 配置文件 `docs/.vuepress/config.js`

```ts
import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
})
```

- 创建你的第一篇文档

```bash
echo '# Hello VuePress' > docs/README.md
```

## 目录结构

创建完成后，你项目的目录结构应该是这样的：

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
└─ package.json
```

`docs` 目录是你放置 Markdown 文件的地方，它同时也会作为 VuePress 的源文件目录。

`docs/.vuepress` 目录，即源文件目录下的 `.vuepress` 目录，是放置所有和 VuePress 相关的文件的地方。当前这里只有一个配置文件。默认还会在该目录下生成临时文件、缓存文件和构建输出文件。建议你把它们添加到 `.gitignore` 文件中。

## 安装插件依赖冲突

在项目根目录的`package.json`中添加`pnpm.peerDependencyRules`，忽略 VuePress 版本的严格校验：

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

## 推荐插件

### 搜索增强插件：

#### 安装

```bash
# 安装适配VuePress 2的slimsearch插件
pnpm add -D @vuepress/plugin-slimsearch@next --force
```

#### 配置`@vuepress/plugin-slimsearch`

修改`docs/.vuepress/config.js`，替换原搜索插件配置：

```javascript
import { defineUserConfig } from 'vuepress'
import { slimsearchPlugin } from '@vuepress/plugin-slimsearch'
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  theme: defaultTheme({
    // 保留你的主题配置（如导航栏、logo等）
  }),
  
  plugins: [
    // 官方全文搜索插件（替代search-pro）
    slimsearchPlugin({
      indexContent: true, // 关键：开启正文内容索引（支持搜索全文）
      maxSuggestions: 10, // 最多显示10条搜索结果
      locales: {
        '/': {
          placeholder: '搜索文档', // 搜索框占位符
        },
      },
    }),
    
    // 保留你原有的其他插件（如blog插件）
    require('@vuepress/plugin-blog')({
      // 你的博客插件配置
    }),
  ],
})
```
![image-20251124111838525](..\img\blog.png)