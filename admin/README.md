# 文章后台说明

访问 `/admin/` 后，使用专为 `ksladnasx/vuepress_blog` 创建的 GitHub Fine-grained Personal Access Token 进入后台。

创建令牌时：

1. Resource owner 选择自己的 GitHub 账号。
2. Repository access 选择 `Only select repositories`，再选择 `ksladnasx/vuepress_blog`。
3. Repository permissions 的 `Contents` 选择 `Read and write`。
4. 为令牌设置合适的过期时间。

令牌会保存到当前浏览器的 localStorage 中，刷新页面后会自动尝试进入后台；点击“退出后台”会清除已保存的令牌。后台还会使用浏览器 IndexedDB 保存未发布的文章草稿、待删除状态和待上传图片；这些内容只保存在当前浏览器里。

编辑文章、新建文章、标记删除、添加图片都只会进入本地草稿队列。顶部“发布修改”按钮会显示未发布修改数量，点击后才会统一提交到 `main`。GitHub Actions 随后运行 `deploy.sh`，将构建结果发布到 `gh-pages` 分支。

文章标题取自正文中的第一个一级标题，例如 `# 我的文章标题`。新建文章时，该标题也会用于生成文件名。

不要使用 GitHub 登录密码，也不要使用拥有更多仓库权限的通用 Token。
