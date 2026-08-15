# 文章后台说明

访问 `/admin/` 后，使用专为 `ksladnasx/vuepress_blog` 创建的 GitHub Fine-grained Personal Access Token 进入后台。

创建令牌时：

1. Resource owner 选择自己的 GitHub 账号。
2. Repository access 选择 `Only select repositories`，再选择 `ksladnasx/vuepress_blog`。
3. Repository permissions 的 `Contents` 选择 `Read and write`。
4. 为令牌设置合适的过期时间。

令牌不会保存到后台页面、浏览器存储或仓库中。浏览器的密码管理器是否记住输入内容，由浏览器自行处理。

后台发布文章或上传图片后，会向 `main` 提交文件。GitHub Actions 随后运行 `deploy.sh`，将构建结果发布到 `gh-pages` 分支。

不要使用 GitHub 登录密码，也不要使用拥有更多仓库权限的通用 Token。
