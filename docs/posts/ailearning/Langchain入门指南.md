# 第一章 LangChain 基础认知



## 1.1 什么是 LangChain

随着大语言模型（Large Language Model，LLM）的快速发展，越来越多的软件系统开始接入 AI 能力，例如智能客服、企业知识库、AI 助手、自动化办公工具等。但是，大语言模型本身只负责理解用户输入并生成文本，它并不了解企业内部数据，也无法直接访问数据库、调用业务接口或执行具体任务。

例如，一个企业希望开发一个内部知识库问答系统，员工询问“公司的报销流程是什么”。如果直接调用大模型，模型并不知道企业自己的规章制度，因此无法给出准确答案。要解决这个问题，需要在用户问题和大模型之间增加一层应用逻辑，将企业数据、业务工具以及模型能力结合起来。

LangChain 就是在这种背景下产生的。它是一个用于构建大语言模型应用的开发框架，提供了模型调用、Prompt 管理、流程编排、数据检索、工具调用以及 Agent 构建等能力，帮助开发者更加方便地开发基于 LLM 的应用。([Docs by LangChain](https://docs.langchain.com/oss/python/langchain/overview?utm_source=chatgpt.com))

简单理解，LangChain 不是一个新的大模型，而是连接业务系统和大模型之间的应用开发框架。

传统的大模型调用流程通常比较简单：

用户输入问题 → 调用模型 API → 返回模型结果。

而实际业务中的 AI 应用通常需要更复杂的流程：

用户输入问题 → 业务系统处理 → 查询相关数据 → 调用大模型分析 → 调用工具执行任务 → 返回最终结果。

LangChain 主要负责中间这一层，将多个 AI 能力组合成完整的应用流程。

------

## 1.2 为什么需要 LangChain

如果只是实现简单的文本生成或聊天功能，直接调用 OpenAI、Claude、DeepSeek 等模型 API 即可。但是在企业级应用中，AI 通常需要结合业务数据和外部能力，例如：

- 根据企业文档回答问题。
- 根据数据库数据生成分析结果。
- 根据用户需求调用第三方接口。
- 根据任务自动选择执行步骤。
- 保存用户历史对话。

这些功能如果全部自行实现，需要开发者处理大量基础逻辑，包括：

- 模型接口封装。
- Prompt 管理。
- 上下文维护。
- 文档解析。
- 向量检索。
- 工具调用。
- 多步骤任务流程控制。

LangChain 对这些常见能力进行了抽象，使开发者可以通过统一接口快速构建 AI 应用。它目前提供了丰富的模型、工具、向量数据库以及数据处理组件集成能力。([Docs by LangChain](https://docs.langchain.com/oss/python/integrations/providers/overview?utm_source=chatgpt.com))

例如，一个 AI 简历优化助手的实现流程：

用户上传简历 → 系统解析简历内容 → 检索岗位要求 → 调用大模型分析 → 生成优化建议。

其中：

- FastAPI 负责接收文件上传请求。
- LangChain 负责组织 AI 处理流程。
- 大语言模型负责理解和生成内容。
- 数据库负责保存用户信息和历史记录。

通过这种分层设计，可以让 AI 能力更容易融入已有的软件系统。

------

## 1.3 LangChain 在 AI 应用开发中的位置

一个完整的 AI 应用通常可以分为多个层次：

```text
前端层
Vue / React

        ↓

接口层
FastAPI

        ↓

业务层
用户管理
权限控制
文件处理

        ↓

AI 应用层
LangChain

        ↓

模型层
GPT
Claude
Gemini
DeepSeek

        ↓

数据层
MySQL
Redis
向量数据库
```

在这个架构中，各部分职责不同。

FastAPI 主要负责 Web 服务相关逻辑，例如：

- 接收 HTTP 请求。
- 参数校验。
- 用户身份认证。
- 返回接口响应。

LangChain 负责 AI 应用逻辑，例如：

- 组织 Prompt。
- 调用模型。
- 查询知识库。
- 调用外部工具。
- 管理 Agent 流程。

大语言模型负责：

- 理解自然语言。
- 进行推理。
- 生成文本结果。

因此，在实际项目中，FastAPI 和 LangChain 通常是配合使用的：

FastAPI 作为后端服务入口，LangChain 作为 AI 能力编排层。

------

## 1.4 LangChain 核心组成

LangChain 的设计思想是将复杂的 AI 应用拆分为多个可以组合的模块。目前常用的核心组件包括 Model、Prompt、Chain、Retriever 和 Agent 等。([LangChain 参考文档](https://reference.langchain.com/python/langchain/overview?utm_source=chatgpt.com))

### 1.4.1 Model（模型）

Model 是 LangChain 中负责调用大语言模型的组件。

不同模型厂商通常提供不同的 API，例如：

- OpenAI 提供 GPT 系列模型。
- Anthropic 提供 Claude 系列模型。
- Google 提供 Gemini 系列模型。
- 国内厂商提供 DeepSeek、通义千问等模型。

不同模型的调用方式存在差异，而 LangChain 对这些模型进行了统一封装，使开发者可以使用类似的方式调用不同模型。

例如：

```python
response = llm.invoke("介绍一下 FastAPI")
```

开发者不需要关心底层具体调用的是哪一家模型，只需要通过 LangChain 提供的接口完成调用即可。

------

### 1.4.2 Prompt（提示词）

Prompt 是发送给大模型的输入内容。

大模型最终生成什么结果，很大程度取决于 Prompt 的设计。

例如：

普通问题：

“介绍一下 React。”

优化后的 Prompt：

“你是一名前端高级工程师，请从核心原理、使用场景和代码示例三个方面介绍 React。”

后者能够更加明确地限制模型输出方向。

在实际项目中，Prompt 通常不会直接写死，而是使用模板管理，例如：

```text
请回答下面的问题：

{question}
```

运行时再动态替换变量。

这样可以实现：

- Prompt 与业务代码分离。
- 统一管理提示词。
- 方便后续优化模型效果。

------

### 1.4.3 Chain（链）

Chain 表示多个处理步骤的组合。

一个简单的 AI 问答流程可以表示为：

用户问题 → Prompt 模板处理 → 调用模型 → 返回结果。

在 LangChain 中，可以将多个组件连接成一个 Chain：

```python
chain = prompt | llm
```

其中 `|` 表示将前一个组件的输出传递给后一个组件。

通过 Chain，可以将复杂流程拆分为多个简单模块，然后按照业务需求组合。

例如：

文档问答流程：

用户问题 → 文档检索 → Prompt 拼接 → 模型生成答案。

------

### 1.4.4 Retriever（检索器）

Retriever 是 RAG（Retrieval Augmented Generation，检索增强生成）的核心组件。

由于大模型并不知道企业内部数据，因此需要先从外部数据源中检索相关内容，再交给模型生成答案。

例如：

用户：

“公司的年假政策是什么？”

系统流程：

用户问题 → 查询企业文档 → 找到相关内容 → 发送给模型 → 生成回答。

Retriever 负责其中的数据检索部分。

常见应用场景：

- 企业知识库。
- 产品文档问答。
- 技术文档助手。
- 私有数据分析。

------

### 1.4.5 Agent（智能代理）

Agent 是 LangChain 中用于构建智能任务执行系统的组件。

普通 Chain 的流程通常是固定的：

步骤 A → 步骤 B → 步骤 C。

而 Agent 可以根据用户需求动态决定下一步操作。

例如用户输入：“查询成都今天的天气。”

Agent 可以：

1. 分析用户需求。
2. 判断需要调用天气接口。
3. 执行工具调用。
4. 根据结果生成回复。

因此 Agent 更适合处理复杂任务，例如：

- AI 助手。
- 数据分析助手。
- 自动化办公工具。
- 多工具调用系统。

------

## 1.5 LangChain 与大模型 API 的关系

LangChain 和 OpenAI API 并不是替代关系，而是上下层关系。

大模型 API 提供的是模型能力，例如：

输入文本 → 返回生成结果。

LangChain 提供的是应用开发能力，例如：

用户请求 → 判断任务 → 查询数据 → 调用模型 → 调用工具 → 返回结果。

可以理解为：

```text
AI 应用

    ↓

LangChain

    ↓

大语言模型 API

    ↓

GPT / Claude / Gemini / DeepSeek
```

如果项目只是简单调用模型，例如生成文章、聊天问答，直接使用模型 API 即可。

如果项目需要：

- 企业知识库。
- RAG 问答。
- Agent 工作流。
- 数据库查询。
- 多步骤任务处理。

则更适合使用 LangChain。

------

## 1.6 本章总结

本章主要介绍了 LangChain 的定位和核心概念。

需要掌握以下几点：

1. LangChain 是用于构建大语言模型应用的开发框架，而不是大模型本身。
2. FastAPI 负责后端接口和业务逻辑，LangChain 负责 AI 流程编排，大模型负责理解和生成内容。
3. LangChain 的核心组件包括 Model、Prompt、Chain、Retriever 和 Agent。
4. 企业级 AI 应用通常需要结合数据库、向量数据库以及后端框架共同开发。

# 第二章 LangChain 开发环境搭建

## 2.1 Python 环境准备

LangChain 基于 Python 开发，因此在开始使用之前需要准备 Python 开发环境。建议使用 Python 3.10 及以上版本，目前主流 AI 应用项目通常使用 Python 3.10 或 Python 3.11。

可以通过以下命令查看当前 Python 版本：

```bash
python --version
```

如果需要创建独立环境，推荐使用虚拟环境隔离项目依赖。

使用 venv 创建虚拟环境：

```bash
python -m venv .venv
```

激活虚拟环境：

Windows：

```bash
.venv\Scripts\activate
```

Linux / macOS：

```bash
source .venv/bin/activate
```

在实际开发中，也可以使用 Conda 或 uv 管理 Python 环境。对于 AI 应用开发项目，推荐使用 uv，因为它相比传统 pip 具有更快的依赖解析和安装速度，同时能够更方便地管理项目依赖。

例如创建项目：

```bash
uv init langchain-demo
```

进入项目目录：

```bash
cd langchain-demo
```

安装依赖：

```bash
uv add langchain langchain-openai fastapi uvicorn python-dotenv
```

------

## 2.2 创建 LangChain 项目

一个实际的 LangChain 应用通常不会将所有代码写在一个文件中，而是按照功能进行拆分。

一个基础项目结构如下：

```text
langchain-demo

├── app
│   ├── main.py          # FastAPI入口
│   ├── llm.py           # 大模型配置
│   ├── prompt.py        # Prompt模板
│   ├── chain.py         # LangChain流程
│   └── config.py        # 项目配置
│
├── .env                 # 环境变量
├── requirements.txt
└── pyproject.toml
```

其中：

- `main.py` 负责启动 FastAPI 服务以及定义接口。
- `llm.py` 负责初始化大模型客户端。
- `prompt.py` 用于集中管理提示词模板。
- `chain.py` 负责组合 LangChain 处理流程。
- `.env` 保存 API Key 等敏感配置。

这种结构与传统后端项目比较类似，可以方便后续扩展数据库、用户系统以及 RAG 等功能。

------

## 2.3 安装 LangChain 相关依赖

LangChain 本身采用模块化设计，不同功能对应不同 Python 包。

基础安装：

```bash
pip install langchain
```

如果需要调用 OpenAI 兼容模型，需要安装：

```bash
pip install langchain-openai
```

如果使用 FastAPI 构建接口：

```bash
pip install fastapi uvicorn
```

如果需要读取环境变量：

```bash
pip install python-dotenv
```

完整依赖：

```txt
langchain
langchain-openai
fastapi
uvicorn
python-dotenv
```

目前 LangChain 将核心能力和第三方模型连接器进行了拆分，例如：

- `langchain`：核心框架。
- `langchain-openai`：OpenAI 模型支持。
- `langchain-community`：社区维护的各种工具和数据连接组件。

这种设计可以避免安装大量不需要的依赖。

------

## 2.4 配置大模型 API

LangChain 本身不会提供大模型能力，它需要连接具体的大语言模型服务。

目前常见选择包括：

- OpenAI GPT 系列。
- Anthropic Claude 系列。
- Google Gemini 系列。
- DeepSeek、通义千问等国内模型。

这些模型大部分提供 OpenAI API 格式兼容接口，因此可以通过统一方式接入。

项目根目录创建 `.env` 文件：

```env
OPENAI_API_KEY=your_api_key
OPENAI_BASE_URL=https://api.openai.com/v1
```

其中：

- `OPENAI_API_KEY` 用于身份认证。
- `OPENAI_BASE_URL` 用于指定接口地址。

如果使用国内兼容 OpenAI API 的模型，只需要替换接口地址即可，例如：

```env
OPENAI_BASE_URL=https://api.deepseek.com
```

代码中通过环境变量读取配置：

```python
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")
```

这样可以避免将敏感信息直接写入代码。

------

## 2.5 第一次调用大模型

完成环境配置后，可以编写第一个 LangChain 程序。

创建 `llm.py`：

```python
from langchain_openai import ChatOpenAI
import os
from dotenv import load_dotenv

load_dotenv()

llm = ChatOpenAI(
    model="gpt-4o-mini",
    api_key=os.getenv("OPENAI_API_KEY"),
    base_url=os.getenv("OPENAI_BASE_URL"),
    temperature=0.7
)
```

这里创建了一个 `ChatOpenAI` 对象，它负责与大模型通信。

主要参数：

- `model`：指定使用的模型名称。
- `api_key`：模型服务访问密钥。
- `base_url`：模型服务地址。
- `temperature`：控制模型输出随机性。

其中 temperature 是实际开发中比较常用的参数。

较低的 temperature：

- 输出更加稳定。
- 适合代码生成、知识问答等场景。

较高的 temperature：

- 输出更加多样。
- 适合创意写作、内容生成等场景。

------

创建测试文件：

```python
from llm import llm

response = llm.invoke(
    "什么是LangChain？"
)

print(response.content)
```

运行：

```bash
python test.py
```

模型返回结果后，说明 LangChain 环境已经配置成功。

这里的调用流程为：

用户输入问题 → LangChain 封装请求 → 调用大模型 API → 返回模型生成结果。

------

## 2.6 LangChain 中的消息类型

在实际开发中，LangChain 不只是简单传递字符串，而是通过消息对象描述不同角色的信息。

常见消息类型包括：

### SystemMessage

用于设置模型行为。

例如：

“你是一名专业的软件工程师。”

### HumanMessage

表示用户输入。

例如：

“解释一下 React Hooks。”

### AIMessage

表示模型生成的回复。

例如：

“React Hooks 是 React 16.8 引入的特性。”

在多轮聊天场景中，通常会维护这样的消息列表：

```text
SystemMessage
        ↓
HumanMessage
        ↓
AIMessage
        ↓
HumanMessage
        ↓
AIMessage
```

这样模型才能理解完整上下文。

------

## 2.7 使用 ChatPromptTemplate 管理 Prompt

实际项目中不建议直接拼接字符串，而应该使用 Prompt 模板。

创建 `prompt.py`：

```python
from langchain.prompts import ChatPromptTemplate


prompt = ChatPromptTemplate.from_template(
    """
    你是一名专业的软件工程师。

    请回答以下问题：
    {question}
    """
)
```

调用：

```python
message = prompt.invoke(
    {
        "question": "什么是FastAPI"
    }
)
```

这样可以将 Prompt 和业务逻辑分离。

例如企业项目中：

- 产品人员可以调整 Prompt。
- 开发人员维护代码逻辑。
- 不同业务场景可以复用模板。

------

## 2.8 使用 LCEL 组合第一个 Chain

LangChain 推荐使用 LCEL（LangChain Expression Language）构建流程。

LCEL 允许通过 `|` 操作符连接多个组件。

例如：

```python
chain = prompt | llm
```

表示：

Prompt 模板的输出作为模型输入。

完整调用：

```python
result = chain.invoke(
    {
        "question": "介绍一下Vue3"
    }
)

print(result.content)
```

此时执行流程：

用户输入问题 → Prompt 模板格式化 → 调用模型 → 返回结果。

相比手动编写调用逻辑，Chain 可以让多个步骤更加清晰，也方便后续加入检索、工具调用等功能。

------

## 2.9 LangChain 开发中的基本调试方式

AI 应用开发与传统后端开发不同，模型输出具有一定的不确定性，因此调试重点不仅是代码是否运行，还包括 Prompt 和模型响应是否符合预期。

常见调试方式：

### 查看 Prompt 内容

确认发送给模型的实际内容是否正确。

```python
print(message)
```

### 调整模型参数

例如修改：

```python
temperature=0.2
```

观察输出变化。

### 保存模型输入输出日志

实际生产环境通常需要记录：

- 用户问题。
- 使用模型。
- Prompt 内容。
- 模型响应时间。
- Token 消耗。

方便后续优化成本和效果。

------

## 2.10 本章总结

本章完成了 LangChain 开发环境搭建，并了解了基础调用流程。

需要掌握以下内容：

1. LangChain 项目通常基于 Python 环境开发，可以使用 venv、Conda 或 uv 管理依赖。
2. LangChain 本身不提供模型，需要连接 OpenAI、DeepSeek 等大语言模型服务。
3. `ChatOpenAI` 用于初始化模型，`PromptTemplate` 用于管理提示词。
4. LCEL 可以将 Prompt、模型以及其他组件组合成 Chain。
5. 实际 AI 应用开发中，需要将 FastAPI、LangChain、数据库和模型服务进行分层设计。

下一章将进入 **第三章 LangChain 核心组件**，详细介绍 Model、Prompt、Output Parser、Chain、Runnable 等核心概念，并结合 Python 代码说明实际使用方式。



# 第三章 LangChain 核心组件

## 3.1 Model（模型调用）

Model 是 LangChain 中最基础的组件之一，负责与大语言模型进行交互。在传统开发中，不同模型服务商通常提供不同的调用方式，例如 OpenAI、Anthropic、Google 以及国内大模型厂商都有自己的 SDK 和接口规范。LangChain 通过统一的模型接口对这些服务进行了封装，使开发者可以使用类似的方式调用不同模型。

在 LangChain 中，模型主要分为两类：

- LLM（Large Language Model）：主要用于文本补全类型模型。
- ChatModel：主要用于聊天类型模型，也是目前实际项目中更常使用的方式。

目前主流的大语言模型大多属于 ChatModel，例如 GPT-4、Claude、Gemini 等。

------

### 3.1.1 ChatModel 基础使用

以 OpenAI 兼容模型为例：

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o-mini",
    temperature=0.3
)

response = llm.invoke(
    "解释一下什么是FastAPI"
)

print(response.content)
```

`invoke()` 是 LangChain 中最基础的调用方法，用于向模型发送输入并获取结果。

返回结果通常是一个 `AIMessage` 对象，而不是普通字符串：

```python
response.content
```

可以获取模型实际生成的文本内容。

------

### 3.1.2 模型参数配置

实际开发中，需要根据业务场景调整模型参数。model指定使用的大语言模型。

例如：

```python
model="gpt-4o-mini"
```

不同模型在能力、速度以及成本方面存在差异：

- 大模型通常理解能力更强，但调用成本更高。
- 小模型响应速度更快，适合简单任务。

在企业项目中，通常会根据任务复杂度选择不同模型，例如：

- 简单文本分类使用轻量模型。
- 复杂推理使用能力更强的模型。

temperature 用于控制模型输出的随机程度。例如：

```python
temperature=0.2
```

较低的 temperature 会让模型输出更加稳定，适合：

- 技术问答。
- 代码生成。
- 数据分析。

较高的 temperature 会增加输出多样性，适合：

- 创意写作。
- 文案生成。
- 内容 brainstorming。

实际项目中通常不会设置过高，否则可能导致回答不稳定。

------

max_tokens用于限制模型最大输出长度。例如：

```python
max_tokens=1000
```

主要作用：

- 控制响应内容长度。
- 降低 Token 消耗。
- 防止模型生成过长内容。

------

### 3.1.3 多模型切换

LangChain 的一个优势是统一了模型调用接口。

例如：

OpenAI：

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="gpt-4o-mini"
)
```

DeepSeek：

```python
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="deepseek-chat",
    base_url="https://api.deepseek.com"
)
```

虽然底层模型不同，但上层调用方式保持一致。

这使得企业项目可以根据成本、性能需求快速替换模型，而不需要修改大量业务代码。

------

## 3.2 Prompt（提示词模板）

Prompt 是控制模型输出的重要方式。

大语言模型本身并不知道用户真正想要什么，它只能根据输入内容进行预测。因此，合理设计 Prompt 可以明显提升模型输出质量。

在实际项目中，不推荐直接在代码中拼接字符串，而应该使用 Prompt Template 统一管理。

------

### 3.2.1 PromptTemplate

PromptTemplate 用于创建普通文本模板。

例如：

```python
from langchain.prompts import PromptTemplate


prompt = PromptTemplate.from_template(
    "请介绍一下{technology}"
)


message = prompt.invoke(
    {
        "technology":"React"
    }
)

print(message.text)
```

运行时，模板中的变量会被动态替换。

这种方式适用于：

- 单轮文本生成。
- 内容总结。
- 文案生成。

------

### 3.2.2 ChatPromptTemplate

在聊天模型中，更推荐使用 ChatPromptTemplate。

它可以区分不同角色的信息：

- System：定义模型行为。
- Human：用户输入。
- AI：模型回复。

例如：

```python
from langchain.prompts import ChatPromptTemplate


prompt = ChatPromptTemplate.from_messages(
    [
        (
            "system",
            "你是一名专业的软件工程师"
        ),
        (
            "human",
            "{question}"
        )
    ]
)
```

调用：

```python
message = prompt.invoke(
    {
        "question":"解释一下Vue3响应式原理"
    }
)
```

最终发送给模型的信息类似：

系统：

你是一名专业的软件工程师。

用户：

解释一下 Vue3 响应式原理。

这种结构更符合现代聊天模型的调用方式。

------

### 3.2.3 Few Shot Prompt

Few Shot Prompt 是通过提供示例，让模型学习输出格式。

例如：

希望模型按照 JSON 格式输出：

```text
示例：

输入：
React

输出：
{
  "type":"frontend",
  "language":"JavaScript"
}
```

然后输入新的内容：

```text
Vue
```

模型会参考示例生成类似结构。

这种方式适用于：

- 信息抽取。
- 分类任务。
- 固定格式输出。

------

## 3.3 Output Parser（输出解析）

大模型默认返回的是自然语言文本，但是实际业务通常需要结构化数据。

例如：

用户输入简历后，希望模型返回：

```json
{
  "score":85,
  "suggestions":[
    "优化项目描述",
    "补充技术细节"
  ]
}
```

这时就需要 Output Parser 对模型输出进行解析。

------

### 3.3.1 StrOutputParser

最简单的解析方式是将模型输出转换为字符串。

```python
from langchain_core.output_parsers import StrOutputParser


parser = StrOutputParser()

chain = prompt | llm | parser
```

执行后：

```python
result = chain.invoke(
    {
        "question":"介绍一下FastAPI"
    }
)
```

返回：

```text
FastAPI是一款现代化Python Web框架...
```

------

### 3.3.2 JSON 输出解析

在实际开发中，经常需要让模型返回固定结构。

例如：

用户：

分析下面的技术能力：

```text
React
Vue
FastAPI
```

希望返回：

```json
{
    "frontend": [
        "React",
        "Vue"
    ],
    "backend": [
        "FastAPI"
    ]
}
```

可以使用结构化输出。

示例：

```python
from pydantic import BaseModel


class Skill(BaseModel):
    frontend:list[str]
    backend:list[str]


structured_llm = llm.with_structured_output(
    Skill
)
```

这样模型输出会自动转换为 Python 对象。

在企业项目中，这种方式非常常见，例如：

- AI 简历分析。
- AI 数据抽取。
- AI 内容审核。

------

## 3.4 LCEL（LangChain Expression Language）

LCEL 是 LangChain 推荐的链式表达方式，用于组合不同 Runnable 组件。

它的核心思想是：

> 将每一个处理步骤看作一个独立组件，然后通过组合形成完整流程。

例如：

```python
chain = prompt | llm | parser
```

表示：

Prompt 处理输入 → 模型生成内容 → Parser 格式化结果。

------

### 3.4.1 Runnable

Runnable 是 LCEL 的基础接口。

LangChain 中很多组件都实现了 Runnable，例如：

- ChatModel。
- PromptTemplate。
- OutputParser。
- Retriever。

因此它们可以自由组合。

例如：

```python
prompt

↓

llm

↓

parser
```

每一步都可以独立替换。

------

## 3.4.2 Chain 调用方式

LCEL 支持几种常见调用方式。

### invoke

同步调用：

```python
result = chain.invoke(
    {
        "question":"什么是React"
    }
)
```

适合普通接口请求。

------

### batch

批量调用：

```python
results = chain.batch(
    [
        {
            "question":"介绍Vue"
        },
        {
            "question":"介绍React"
        }
    ]
)
```

适合批量处理任务。

例如：

- 批量分析简历。
- 批量总结文章。

------

### stream

流式输出：

```python
for chunk in chain.stream(
    {
        "question":"介绍FastAPI"
    }
):
    print(chunk)
```

适合聊天机器人场景。

用户可以像 ChatGPT 一样实时看到模型生成过程。

------

## 3.5 一个完整 Chain 示例

前面介绍了多个组件，现在组合一个简单流程：

需求：

用户输入技术问题，AI 返回专业解释。

流程：

用户问题 → Prompt 模板 → 大模型 → 输出解析。

代码：

```python
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser


llm = ChatOpenAI(
    model="gpt-4o-mini"
)


prompt = ChatPromptTemplate.from_template(
    """
    你是一名高级前端工程师。

    请回答：
    {question}
    """
)


parser = StrOutputParser()


chain = prompt | llm | parser


result = chain.invoke(
    {
        "question":"Vue3的响应式原理是什么"
    }
)


print(result)
```

这个流程已经具备实际 AI 应用的基本结构：

- Prompt 负责控制输入。
- Model 负责生成内容。
- Parser 负责处理输出。
- Chain 负责组织执行流程。

后续的 RAG、Agent 本质上也是在这个基础上继续扩展。

------

## 3.6 本章总结

本章介绍了 LangChain 最核心的基础组件。

需要掌握：

1. Model 负责统一调用不同的大语言模型。
2. Prompt Template 用于管理和优化模型输入。
3. Output Parser 用于将模型输出转换为业务需要的数据格式。
4. LCEL 可以将多个组件组合成完整处理链。
5. Runnable 是 LangChain 组件组合的基础。
6. 实际项目中的 AI 功能通常都是多个组件组合，而不是单独调用模型。

下一章将进入 **第四章 对话系统开发**，重点介绍多轮聊天、Message 管理、Memory、Chat History 以及 FastAPI 中如何实现类似 ChatGPT 的流式对话接口。



