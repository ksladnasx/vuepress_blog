# xiaohan 博客说明文档

这是一个基于 VuePress 构建的个人博客项目。本文档将指导你如何拉取项目、在本地启动开发环境，以及如何部署到服务器。

## 目录

- [拉取项目](#拉取项目)
- [安装依赖](#安装依赖)
- [本地启动](#本地启动)
- [构建静态文件](#构建静态文件)
- [部署](#部署)
  - [使用部署脚本](#使用部署脚本)
  - [手动部署](#手动部署)
- [目录结构](#目录结构)
- [自定义配置](#自定义配置)

## 拉取项目

首先，你需要将项目克隆到本地。打开终端，运行以下命令：

```bash
git clone https://github.com/ksladnasx/vuepress_blog.git
```

进入项目目录：

```bash
cd vuepress_blog
```

## 安装依赖

项目依赖 Node.js 和 npm/yarn。确保你已经安装了 Node.js（建议版本 14.x 或更高）。

使用 npm 安装依赖：

```bash
npm install
```

或者如果你更喜欢使用 yarn：

```bash
yarn install
```

## 本地启动

在开发模式下启动项目，实时预览修改：

```bash
npm run docs:dev
```

或者如果 `package.json` 中配置了 `docs` 脚本（如 `"docs": "vuepress dev docs"`）：

```bash
npm run docs
```

启动成功后，终端会显示本地访问地址，通常是 `http://localhost:8080`。在浏览器中打开该地址即可查看博客。

## 构建静态文件

当你准备部署时，需要先构建静态文件：

```bash
npm run docs:build
```

构建后的文件会生成在 `docs/.vuepress/dist` 目录中（取决于你的 VuePress 配置）。你可以将这个目录中的内容部署到任何静态服务器上。

## 部署

项目根目录下提供了一个 `deploy.sh` 脚本，用于自动化部署到 GitHub Pages 或其他静态托管服务。

### 使用部署脚本

1. **确保脚本有执行权限**（Linux/macOS/gitbash）：

   ```bash
   chmod +x deploy.sh
   ```

2. **运行部署脚本**：

   ```bash
   sh ./deploy.sh
   ```

脚本内容示例（假设部署到 GitHub Pages）：

```bash
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:ksladnasx/vuepress_blog.git master:gh-pages

cd -
```

根据你的实际情况修改仓库地址和分支。

### 手动部署

如果你不想使用脚本，也可以手动部署：

1. 运行 `npm run docs:build` 生成静态文件。
2. 将 `docs/.vuepress/dist` 目录下的所有文件复制到你的服务器或托管服务的相应目录。
3. 配置 Web 服务器（如 Nginx、Apache）或使用 GitHub Pages、Vercel、Netlify 等平台。

## 目录结构

```
vuepress_blog/
├── docs/               # 文档目录
│   ├── .vuepress/      # VuePress 配置目录
│   │   ├── config.js   # 主配置文件
│   │   ├── public/     # 静态资源（图片、favicon 等）
│   │   └── dist/       # 构建输出目录（生成后出现）
│   ├── README.md       # 首页文档
│   └── 其他 Markdown 文件 # 博客文章或页面
├── package.json        # 项目依赖和脚本
├── deploy.sh           # 部署脚本
└── README.md           # 项目说明文档（即本文档）
```

## 自定义配置

你可以在 `docs/.vuepress/config.js` 中修改博客的标题、主题、导航栏、侧边栏等。例如：

```js
module.exports = {
  title: '我的博客',
  description: '一个基于 VuePress 的个人博客',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/about/' },
    ],
    sidebar: 'auto',
  },
};
```


## Star History

<a href="https://www.star-history.com/?repos=ksladnasx%2Fvuepress_blog&type=date&legend=top-left">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=ksladnasx/vuepress_blog&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=ksladnasx/vuepress_blog&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/image?repos=ksladnasx/vuepress_blog&type=date&legend=top-left" />
 </picture>
</a>


更多配置请参考 [VuePress 官方文档](https://vuepress.vuejs.org/zh/)。

---

如有任何问题，欢迎提交 Issue 或 Pull Request。
