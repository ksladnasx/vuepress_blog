---
date: 2025-08-25
category:
  - 说明文档
tag:
  - Vue3
  - Docsify
---

# Docsify创建流程

### 📦 1. **环境准备**

- 

  安装 Node.js 和 npm

  

  - 从 [Node.js 官网](https://nodejs.org/) 下载安装包（建议 LTS 版本）

  - 安装后验证是否成功：

    ```
    node -v   # 检查 Node.js 版本
    npm -v    # 检查 npm 版本
    ```

### ⚙️ 2. **全局安装 docsify-cli**

```
npm install -g docsify-cli  # 安装官方命令行工具
docsify -v                  # 验证安装（显示版本号即成功）
```
> 注意，当通过nvm切换了node的版本后，docsify-cli要重新安装一次
### 🚀 3. **初始化项目**

- 创建项目目录并初始化：

  ```
  mkdir my-docs && cd my-docs   # 新建项目目录
  docsify init ./docs           # 在 docs 子目录生成基础结构
  ```

- 生成的文件结构：

  ```
  docs/
    ├── index.html     # 入口文件（核心配置）
    ├── README.md      # 默认主页内容
    └── .nojekyll      # 防止 GitHub Pages 忽略下划线文件
  ```

### 🔍 4. **本地实时预览**

- 启动本地服务器：

  ```
  docsify serve docs   # 默认访问 http://localhost:3000
  ```

- 修改 `docs/README.md` 内容后浏览器自动刷新，无需重启服务。

### ⚙️ 5. **基础配置自定义**

编辑 `docs/index.html` 文件，在 `<script>` 标签中扩展配置：

```
<script>
  window.$docsify = {
    name: '我的文档站',     // 站点名称（显示在侧边栏顶部）
    repo: 'https://github.com/your/repo',  // GitHub 徽标链接
    loadSidebar: true,     // 启用侧边栏（需创建 _sidebar.md）
    search: 'auto'         // 启用全文搜索
  }
</script>
```

### 🌐 6. **部署到线上环境**

#### 选项一：GitHub Pages（免费）

1. 将 `docs/` 目录推送到 GitHub 仓库
2. 仓库设置 → Pages → 选择分支（如 `main`）和 `docs/` 目录
3. 访问 `https://<用户名>.github.io/<仓库名>`
> 本博客地址：[GithubPages](https://ksladnasx.github.io/docsify/#/zh-cn/nuxt)

#### 选项二：Netlify（自动化部署）

1. 登录 Netlify，导入 GitHub 仓库
2. 构建命令填 `docsify serve docs`，发布目录选 `docs`

#### 选项三：自有服务器（Nginx 示例）

```
server {
  listen 80;
  server_name your-domain.com;
  root /var/www/docsify;   # 上传 docs/ 内容到此目录
  index index.html;
  location / {
    try_files $uri /index.html;  # 支持单页应用路由
  }
}
```

### 🧩 7. **高级功能扩展**

- 

  侧边栏

  ：创建 

  ```
  _sidebar.md
  ```

  ，按层级组织文档

  ```
  - [首页](README.md)
  - [指南](guide.md)
    - [子页面](subpage.md)
  ```

- **导航栏**：添加 `_navbar.md` 实现顶部导航

- 

  插件系统

  ：

  - 搜索插件：`search: 'auto'`
  - 代码高亮：引入 `prism.js`
  - 图片缩放：添加 `zoom-image` 插件

> 💡 **提示**：更多定制主题、嵌入 Vue 组件、服务端渲染（SSR）等进阶操作，可参考 [Docsify 官方文档](https://docsify.js.org/)。

### 常见问题解决（FAQ）❓

- **GitHub Pages 显示空白页** → 检查是否包含 `.nojekyll` 文件
- **侧边栏不生效** → 确认 `loadSidebar: true` 且 `_sidebar.md` 路径正确
- **本地端口冲突** → 指定端口：`docsify serve docs -p 4000`

按此流程操作后，你将拥有一个功能完备的文档站点，兼具轻量性（仅 ~21kB）和可扩展性。

# sealos部署

首先进入sealos官网，点击devbox，选好环境和内存配置之后创建容器，注意自己配置的端口号，我这里是8080

然后点击Vscode按钮（此处可选择其他支持的编辑器），打开本地电脑的vscode，根据提示安装需要的插件，然后会自动远程链接你刚刚创建的devbox容器

此时你已经远程链接那个主机了

然后将你写好的代码放入，进行上面的安装步骤（注意运行的端口号）

即`npm install -g docsify-cli`然后`docsify serve docs --port 8080`

然后回到devbox主界面，就能看到那个公网ip从准备中变成可用，访问即可。

注意到点击Vscode按钮后系统会自动帮你创建好几个文件，其中entrypoint.sh是你后续构建应用后每次启动服务器所执行的脚本，自然根据流程可知我们这里的entrypoint.sh文件内容如下：

```sh
#!/bin/bash

npm install -g docsify-cli
docsify serve docs --port 8080
```

后续再发布应用版本即可，很简单

