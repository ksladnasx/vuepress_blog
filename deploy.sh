#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 初始化Git并提交
git init
git add -A
git commit -m 'deploy'

# 推送到gh-pages分支
# 将下面的<USERNAME>和<REPO>替换为你的GitHub用户名和仓库名
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -