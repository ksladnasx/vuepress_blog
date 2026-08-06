---
date: 2026-07-16
category:
  - 后端学习
tag:
  - Python
  - FastAPI
---

#  虚拟环境venv搭建模式

## 基本安装流程

这是首先推荐的模式，因为不一定都有conda环境，且对docker部署更友好。

首先fastapi项目的基础结构类似以下：

```text
project/
├── app/
│   ├── main.py
│   └── api/
├── requirements.txt
├── pyproject.toml
├── .venv/
└── README.md
```

其中.venv/文件夹下就是该工作区的虚拟环境，

要搭建此环境，首先确保安装了uv管理工具，这玩意儿有点像js的npm，这里就不用老旧的pip了。

注意自己在基础环境下，然后运行：

```
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

> 请千万别`pip install uv`，你这样的话安装的是uv的一个依赖包（**不一定提供可执行的 `uv.exe` 到 PATH** ），而不是uv.exe这个程序，就跟npm一样，他不是随处都要安装的依赖，而是系统里已经安装好的程序。

然后通过uv安装虚拟环境：

```bash
uv venv
```

然后当然跟npm一样，有时候需要`uv init` 来创建类似`package.json`的文件，即`pyproject.toml`

然后激活这个工作区虚拟环境，每次进这种方式搭建环境的项目都要运行这个命令：

```bash
.venv\Scripts\Activate.ps1
```

然后安装`fastapi`:

```bash
uv add fastapi
```

特别的 ，激活了虚拟环境后，在vs code中需要选择正确解释器：“

VS Code按住快捷键`Ctrl + Shift + P`，然后输入：

```bash
Python: Select Interpreter
```

选择你创建的那个虚拟环境：

```bash
d:\Code\backend_demo\fastapi_demo\.venv\Scripts\python.exe
```

然后再按命令运行快捷键`Ctrl + Shift + P`，输入`Developer: Reload Window`重新加载资源。

最后，你有一个 `requirements.txt` 文件，你可以使用它来安装其中的软件包。

利用 uv 项目管理模式安装依赖，就和npm一样，他运行完后也会有一个`uv.lock`文件，类似那个`package-lock.json`

```bash
uv add -r requirements.txt
```

## 注意的点

### 启动路径问题

开头的项目结构中，main.py是在app文件夹下而不是在项目根目录，因此直接运行是不行的，运行命令中得指定一下启动的`main`文件的位置：

```
uv run fastapi dev app/main.py
```

或者运行：`fastapi dev app/main.py`

当然，你完全也可以配置你的pyproject.toml来指定入口来避免这个问题：

```toml
[tool.fastapi]
entrypoint = "app.main:app"
```

然后你直接运行`uv run fastapi dev`，就能启动了，不需要指定路径了。

部署的时候就：`uv run uvicorn app.main:app`

### 企业目录

一般企业为了模块化，入口文件`main.py`都是放在`app`文件夹下的，根目录下的`main.py`一般都是用做demo演示，一般会是`uv` 初始化项目的时候自动创建的。

```text
fastapi_demo
│
├── app
│   ├── main.py          # 应用入口
│   ├── api              # 路由
│   │   └── users.py
│   ├── models           # 数据模型
│   ├── schemas          # Pydantic模型
│   ├── services         # 业务逻辑
│   ├── crud             # 数据库操作
│   ├── db               # 数据库连接
│   └── core             # 配置、安全认证
│
├── tests
│
├── pyproject.toml
├── uv.lock
└── Dockerfile
```



### conda环境得退出

你终端终端中如下，说明同时激活了两种环境：

```
(base) (fastapi_demo) PS
(base)
↓
Conda环境

(fastapi_demo)
↓
venv环境
```

容易造成 Python 路径混乱。建议退出 conda，保持一个venv环境即可：

```
conda deactivate
```

当然如果你要退出venv虚拟环境，直接使用`deactivate`即可。

### fastapi标准模式

在官方文档中安装fastapi是安装的标准模式，他比起直接按照

FastAPI 有两种安装方式：

#### 基础安装

```
uv add fastapi
```

只安装核心，但是不会安装一些开发工具。：

```
fastapi
├── FastAPI框架
├── 路由
├── 请求校验
└── OpenAPI生成
```

------

#### 标准安装

```
uv add "fastapi[standard]"
```

会额外安装：fastapi+uvicorn+fastapi-cli+python-multipart+jinja2+其他常用工具

其中：`fastapi dev`个命令来自`fastapi-cli`不是 FastAPI 核心包。用他来启动项目出现找不到命令或者提示安装 standard，是正常的。

### 企业常用安装和启动模式

企业项目中更多使用`uvicorn`进行服务启动，只进行基础安装。

以开头的项目结构 `fastapi_demo`为例，目录包含app文件夹，`app`文件夹下存放`main.py`文件；`main.py`文件内部通过`from fastapi import FastAPI`导入框架，实例化得到app = FastAPI()，并编写接口@app.get("/")实现hello接口返回消息，启动命令为

```
uv run uvicorn app.main:app --reload
```

其中`app.main`代表`app`文件夹下的`main.py`模块，冒号后的`app`则对应代码里创建的FastAPI实例变量`app`。

# FastAPI 全栈项目环境搭建与 启动（Conda方式）

以 开源项目 [fastapi/full-stack-fastapi-template](https://github.com/fastapi/full-stack-fastapi-template)  为例，这类现代全栈后端项目通常同时包含 FastAPI 后端、PostgreSQL 数据库、Redis 缓存以及前端应用，并通过 Docker Compose 实现一键启动，同时也支持本地开发模式。整个项目的核心思想是：**开发环境标准化 + 服务容器化 + 依赖隔离化**。

------

## 一、Conda 虚拟环境的作用与安装方式

在本地开发 FastAPI 后端时，推荐使用 Conda 创建独立虚拟环境，其核心目的在于隔离不同项目的 Python 版本与依赖包，避免环境冲突。

例如可以为该项目创建独立环境：

```bash
conda create -n fastapi-template python=3.12
```

创建完成后进入环境：

```bash
conda activate fastapi-template
```

进入后，该环境将完全独立于 base 环境，所有 pip 或 conda 安装的依赖都只作用于当前项目，例如 FastAPI、SQLAlchemy、Pydantic 等均不会影响其他项目。

常用管理命令包括：

```bash
conda env list            # 查看所有环境
conda activate 环境名      # 进入环境
conda deactivate          # 退出环境
conda remove -n 环境名 --all   # 删除环境
```

在该环境中安装项目依赖通常使用：

```bash
pip install -r requirements.txt
```

或在支持现代工具的情况下使用 `uv sync ` 自动完成依赖安装。

当然，既然已经进入了 Conda 的一个虚拟环境，就直接让依赖装到这个环境里。

在 `backend` 目录执行：

```bash
uv sync --active
```

或者（如果你不用 `uv`）：

```bash
pip install -e .
```

这样依赖都会安装到 `(fastapi-template)` 这个 Conda 环境里，而不是额外创建一个 `.venv`。

然后项目默认的你是安装了uvicorn的，如果你没安装要先进行安装：

```bash
python -m pip install uvicorn
```



------

## 二、Docker Compose 一键启动的原理

该项目的核心能力之一是通过 Docker Compose 将整个系统的多个服务统一编排启动，本质上是通过一个 `docker-compose.yml`（或 compose.yaml）文件定义系统结构。

例如项目中通常会包含以下服务：

- PostgreSQL（数据库）
- Redis（缓存）
- Backend（FastAPI 服务）
- Frontend（前端服务）
- Adminer / Mailcatcher（辅助工具）

当执行以下命令时：

```bash
docker compose up -d
```

Docker 会自动完成以下流程：

第一步读取配置文件，解析所有 service 定义
第二步检查本地是否存在对应镜像
第三步如果没有镜像则自动 pull 或 build（构建本地镜像）
第四步按照依赖关系启动所有容器
第五步建立容器之间的网络通信

最终形成一个完整的本地微服务环境。

------

## 三、为什么可以做到“一键启动”

所谓“一键启动”，本质是 Docker Compose 将原本需要手动完成的步骤全部自动化，包括：

- 数据库安装与初始化（PostgreSQL 容器化）
- 环境依赖安装（Python / Node 镜像）
- 服务启动顺序管理
- 内部网络配置（容器互通）
- 环境变量注入（.env 配置）

因此开发者只需要执行：

```bash
docker compose up -d
```

就可以同时启动后端、数据库、前端等所有服务，而不需要分别运行多个终端命令。

------

## 四、本地开发模式 vs Docker 模式

该项目通常支持两种开发方式：

### 1. Docker 全家桶模式（推荐初学理解整体架构）

所有服务全部容器化：

- 后端运行在 Docker 中
- 数据库运行在 Docker 中
- 前端运行在 Docker 中

优点是环境统一、启动简单：

```bash
docker compose up -d
```

缺点是调试不够灵活，例如断点调试不方便。

------

### 2. 本地开发模式（推荐深入学习源码）

数据库使用 Docker 启动，而后端在本地运行：

```bash
docker compose up db -d
```

然后本地启动 FastAPI：

```bash
uvicorn app.main:app --reload
```

这种模式的优点是：

- 可以直接打断点调试
- 代码修改实时生效
- 更接近真实开发流程

------

## 五、Docker Compose 在部署中的作用

在生产环境中，Docker Compose 同样可以用于部署，只需要在服务器上执行：

```bash
docker compose up -d
```

即可完成整套系统的部署流程。

如果进一步升级，还可以使用：

- Kubernetes（大规模部署）
- CI/CD 自动构建镜像
- Docker Registry 镜像仓库

生产部署的核心思想是：

> 本地开发环境与线上运行环境完全一致，从而避免“开发能跑，上线不能跑”的问题。

------

## 六、整体架构总结

整个项目的运行逻辑可以抽象为：

```text
Conda（Python 环境隔离）
        ↓
FastAPI（后端服务）
        ↓
Docker Compose（服务编排）
        ↓
PostgreSQL / Redis / Frontend（容器化服务）
```

其本质是一套现代后端工程标准架构：

- Conda 解决“开发依赖隔离”
- FastAPI 解决“业务逻辑与 API”
- Docker 解决“环境一致性”
- Docker Compose 解决“多服务编排”

这个项目的核心价值不在于 FastAPI 本身，而在于它展示了一套完整的现代后端工程体系：通过 Conda 管理开发环境，通过 Docker Compose 统一编排多服务系统，从而实现开发与部署环境的一致性与可复现性。



