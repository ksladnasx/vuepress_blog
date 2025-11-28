#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

echo "开始构建静态文件..."
npm run docs:build

echo "进入生成的文件夹..."
cd docs/.vuepress/dist

echo "初始化Git仓库..."
git init
git add -A
git commit -m 'deploy'

echo "添加远程仓库..."
git remote add origin git@github.com:ksladnasx/vuepress_blog.git || true

echo "强制推送到gh-pages分支..."
git push -f origin master:gh-pages

echo "部署成功！地址：https://ksladnasx.github.io/vuepress_blog/"
cd -