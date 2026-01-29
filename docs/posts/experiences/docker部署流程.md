---
date: 2025-12-25
category:
  - 项目笔记
tag:
  - React
  - docker
  - nginx
---
# docker部署流程
国内访问很麻烦，有一些国内直达的地址（可以直接pull），收录在：[docker镜像站](https://docker.aityp.com/)

将 React 项目打包成 Docker 镜像需要结合**React 的构建流程**和**Docker 的镜像构建规范**，通常分为**开发环境**和**生产环境**两种构建方式。生产环境会采用**多阶段构建**来减小镜像体积，以下是详细步骤：

### 一、准备工作

1. 确保本地已安装：

   - [Node.js](https://nodejs.org/)（用于本地开发和构建 React 项目）
   - [Docker](https://www.docker.com/)（用于构建和运行镜像）

2. 已有一个 React 项目（可通过create-react-app快速创建）：

   

   ```bash
   npx create-react-app my-react-app
   cd my-react-app
   ```

### 二、生产环境 Docker 构建（推荐多阶段构建）

生产环境需要先构建 React 项目的静态文件，再用轻量级的 Web 服务器（如 Nginx）托管这些文件，**多阶段构建**可以避免将构建依赖带入最终镜像，大幅减小体积。 同时在构建镜像的时候指定

#### 步骤 1：编写`Dockerfile`

在 React 项目根目录创建`Dockerfile`，注意此处的node源和nginx源都替换为了公司私有的有源，用于解决网络问题。当然这里的pnpm 直接指定外部链接下载就行，这个的源没有墙的限制。同时注意此处的VITE_API_BASE_URL定义，这在构建镜像的时候需要指明内容，具体内容如下：

```dockerfile
# 构建 React 项目
FROM reg.un-net.com/node/node:20-alpine AS build-stage

# 1. 定义构建参数（接收后端地址，默认值可选）
ARG VITE_API_BASE_URL  # 用于后端接口地址定义

# 2. 将构建参数设置为容器内的环境变量
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL 

RUN npm config set registry https://registry.npmmirror.com

# 安装 pnpm
RUN npm install -g pnpm

RUN pnpm config set registry https://registry.npmmirror.com

WORKDIR /app

# 复制依赖文件
COPY package.json pnpm-lock.yaml ./

# 安装依赖（使用 pnpm）
RUN pnpm install --frozen-lockfile

# 复制源代码
COPY . .

# 构建项目（Vite 默认输出到 dist 目录）
RUN pnpm run build

# 替换为企业私有Nginx镜像
FROM reg.un-net.com/nginx/nginx:latest AS production-stage

# 复制第一阶段构建的静态文件到 Nginx 的默认静态文件目录
# Vite 构建输出在 dist 目录
COPY --from=build-stage /app/dist /usr/share/nginx/html

# 复制 Nginx 配置文件（解决 React 路由刷新 404 问题）
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 10801

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]       
```

#### 步骤 2：配置 Nginx 解决 React 路由问题

React 的前端路由（如`react-router-dom`）在刷新页面时会出现 404，需要修改 原本的Nginx 配置将所有请求转发到`index.html`。

在项目根目录创建`nginx.conf`文件，内容如下：

```nginx
server {
    listen 80;
    server_name localhost;

    # 根目录指向Nginx托管的静态文件
    root /usr/share/nginx/html;
    index index.html index.htm;

    # 解决React路由刷新404问题
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 静态资源缓存（可选）
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, max-age=2592000";
    }
}
```

#### 步骤 3：编写`.dockerignore`文件

排除不需要加入镜像的文件，减少构建上下文体积，在项目根目录创建`.dockerignore`：

```plaintext
node_modules
npm-debug.log
build
.git
.gitignore
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
```

### 三、构建并运行 Docker 镜像

#### 1. 构建 Docker 镜像

在本地能成功docker build后，将**全部代码**推到git云端，然后远程连接服务器，`git pull`拉取最新代码然后再进行部署，注意此处部署要指明dockerfile中声明的全局变量（这本来是在.env文件的，但是`dockerignore`掉了），用于前端后续的请求使用。注意此处镜像的命名要带上版本号，用于后期管理：

注意你是在你拉取到的代码的文件夹内运行的，因此结尾是一个点，否则会出现Dockerfile not found 的情况。

```bash
docker build -t slow-sql-web:1.0.1 --build-arg VITE_API_BASE_URL=http://172.20.20.128:10800 .
```

#### 2. 运行 Docker 容器

这样我就打好了一个请求地址为http://172.20.20.128:10800镜像，当然只用于本地测试。然后就可以创建容器运行并映射端口了（将容器暴露的10801端口映射到10801外部网络的端口）：

```bash
docker run -d -p 10801:10801 --name slow-sql-web-container6 slow-sql-web:1.0.1
```

#### 3. 访问项目

打开浏览器访问 `http://172.20.20.128:10801`，即可看到 React 项目。

### 四、开发环境 Docker 构建（可选）

开发环境需要支持**热更新**，可直接运行`npm start`，无需构建静态文件，`Dockerfile`如下：

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

运行命令（注意开发环境需要挂载本地目录实现热更新）：

```shell
docker build -t my-react-app:dev -f Dockerfile.dev .
docker run -d -p 3000:3000 -v $(pwd):/app -v /app/node_modules --name react-dev-container my-react-app:dev
```

- `-v $(pwd):/app`：将本地项目目录挂载到容器，实现代码修改后热更新。
- `-v /app/node_modules`：避免本地`node_modules`覆盖容器内的依赖（容器内的`node_modules`基于 Linux 系统，本地可能是 Windows/macOS）。

### 五、常见问题解决

1. 出现容器运行成功，且有容器id产生的情况，但是还是没法访问，那查看容器日志：

   ```shell
   docker log <容器id或者容器名称>
   ```

   然后复制log问ai什么情况，具体情况具体解决。

   但是一般都要删除错误的镜像和容器：

   ```shell
   # 先获取镜像ID
   docker images
   # 查找使用该镜像的容器
   docker ps -a --filter "ancestor=<镜像ID或名称>"
   # 停用并镜像下容器
   docker stop <容器id或者容器名称>
   docker rm <容器id或者容器名称>
   # 镜像下容器都被删除后可进行镜像删除
   docker rmi <镜像id或者镜像名称>
   ```

   

2. 偶尔会出现端口被占用的情况，一般是之前的容器没停，需要先查看什么容器占用了这个端口：

   ```cmd
   docker ps -a | grep 10801
   ```

   然后复制显示的容器的id，对容器进行一个停止，停止后也可以通过rm将没用的容器删除：

   ```shell
   docker stop <容器id>
   ```

3. 对于Vue的项目，有时候需要灵活进行配置

4. 有时候在远程的连接的服务器上不小心修改了某些文件的源码，合并的时候会出现冲突，要合并冲突很麻烦，因此要一个个先放弃你刚刚不小心修改的文件回到原始状态，然后再git pull 拉取最新代码。：

   ```shell
   git checkout -- <文件名>
   git pull
   ```

5. **React 路由刷新 404**：确保 Nginx 配置中添加了`try_files $uri $uri/ /index.html;`。

6. 构建镜像时依赖安装缓慢：可在Dockerfile中添加 npm 镜像源或者修改为内网的仓库地址：

   ```dockerfile
   RUN npm config set registry https://registry.npmmirror.com
   ```

   国内访问很麻烦，有一些国内直达的地址（可以直接pull），收录在：[docker镜像站](https://docker.aityp.com/)

7. **开发环境热更新不生效**：检查容器挂载目录是否正确，确保本地代码修改后同步到容器。

8. **镜像体积过大**：生产环境务必使用**多阶段构建**，仅保留 Nginx 和静态文件，避免携带 Node 依赖。