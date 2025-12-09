---
date: 2025-12-01
category:
  - 说明文档
tag:
  - SSE
---


# SSE实践

## 概述

该实践基于nodejs的express框架搭建的后端，然后通过vuejs的前端进行请求学习。

后端部分通过设置SSE必需的响应头以及相应的定时器发送数据来建立sse接口，前端部分则通过`eventSource.value = new EventSource(sse数据接口地址)`来进行连接，利用`eventSource.value.onopen`,`eventSource.value.onmessage` 以及 `eventSource.value.addEventListener('自定义事件名'，函数)`来实现对后端数据的接收。

当然有更方便不涉及业务逻辑的方式，就是封装一个类，具体见：[sseService文件解析.js](../sse/sseService文件解析.md)

## 代码

前端主要组件代码：[SSEDemoFronted](../codes/SSEDemoFronted.md)

后端nodejs代码：[sseDomeServer](../codes/sseDomeServer.md)

当服务器发送

```js
	res.write("event: status\n");
    res.write(`data: ${JSON.stringify({ ...data, status: "pause" })}\n\n`);
```

浏览器的 EventSource 会把它识别为一个自定义事件名为 "status" 的事件。

前端通过 `addEventListener('status', handler) `或`es.onstatus`（非标准）来接收；没有`event: `行的消息走默认的 `onmessage`。

示例前端代码（最小、实际可用）：

```js
// 建立连接
const es = new EventSource('/sse-data');

// 接收默认消息（没有 event: 指定时）
es.onmessage = (e) => {
  // e.data 是字符串，通常是 JSON 字符串
  try { console.log('default', JSON.parse(e.data)); }
  catch (err) { console.log('default', e.data); }
};

// 接收自定义消息 event: status
es.addEventListener('status', (e) => {
  // e.data 同样是服务器发送的字符串
  const payload = JSON.parse(e.data);
  console.log('status event', payload);
});

// 可选：监听连接状态
es.onopen = () => console.log('SSE opened');
es.onerror = (err) => {
  if (es.readyState === EventSource.CLOSED) console.log('SSE closed');
  else console.log('SSE error', err);
};
```

额外提示：

- 服务器发送自定义事件时必须保证每条事件以空行结束（\n\n），否则不会触发。
- data 可以跨多行（以 "data:" 开头多行），最终会合并为一条字符串。
- 若发送 JSON，前端需 JSON.parse(e.data)。
- 跨域时确保服务器返回允许的 CORS 头（你代码中已有 Access-Control-Allow-Origin）。

## 前端文字流处理部分代码

### 代码解析：流式文本处理（基于浏览器 ReadableStream + SSE 协议）

这段代码是**浏览器端基于 Fetch API 处理服务器推送的流式文本**的核心逻辑（适配 SSE 协议），常用于 AI 对话、实时日志展示等场景，以下分模块拆解核心逻辑：

#### 一、核心功能概述

异步发起流式请求 → 逐块读取服务器推送的二进制数据流 → 解码并解析符合 SSE 格式的文本 → 实时拼接展示文本 → 处理流式结束 / 异常 → 优化用户体验（自动滚动）。

#### 二、逐行 / 模块解析

##### 1. 函数入口与状态控制（防重复请求）

```javascript
if (isStreaming.value) return;
outputText.value = '';
isStreaming.value = true;
```

- `isStreaming.value`：响应式状态（如 Vue 的 ref），标记是否正在进行流式传输，避免重复发起请求；
- `outputText.value`：响应式状态，清空历史输出文本，准备接收新的流式内容。

##### 2. 发起流式 Fetch 请求

```javascript
const response = await fetch('http://localhost:3000/stream-text');
if (!response.ok || !response.body) {
  throw new Error('流请求失败');
}
```

- 向本地 `stream-text` 接口发起 GET 请求（默认）；
- 校验响应状态：`response.ok` 确保 HTTP 状态码为 200-299，`response.body` 确保返回**可读流（ReadableStream）**（流式接口核心特征）。

##### 3. 流式数据读取 / 解码核心 API

```javascript
const reader = response.body.getReader(); // 获取流读取器
const decoder = new TextDecoder(); // 二进制→字符串解码器
```

- `ReadableStreamDefaultReader`：浏览器原生 API，用于逐块读取 `response.body` 中的二进制数据流；
- `TextDecoder`：将 Uint8Array 格式的二进制块解码为 UTF-8 字符串（默认），处理多字节字符（如中文）跨块的场景。

##### 4. 递归处理流式分块（核心逻辑）

```javascript
const processStream = ({ done, value }) => {
  // 1. 流读取完毕的终止条件
  if (done) {
    isStreaming.value = false;
    return;
  }

  // 2. 解码当前二进制块（stream: true 保留未完成字符，避免解码错误）
  const chunk = decoder.decode(value, { stream: true });
  // 3. 拆分行：适配 SSE 协议（每行以 data: 开头传输数据）
  const lines = chunk.split('\n');

  // 4. 遍历解析每一行 SSE 格式数据
  for (const line of lines) {
    if (line.startsWith('data: ')) { // 筛选有效 SSE 数据行
      try {
    //line.substring(6) 是为了精准剔除 SSE 协议规定的 data: 前缀（注意：data: 后有一个空格所以为6）
        const data = JSON.parse(line.substring(6)); 

        // 5. 处理流式结束标记
        if (data.done) {
          isStreaming.value = false;
          return;
        }

        // 6. 拼接文本（区分换行符和普通字符）
        outputText.value += data.char === '\n' ? '\n' : data.char;

        // 7. 自动滚动：Vue nextTick 确保 DOM 更新后执行滚动
        nextTick(() => {
          if (outputElement.value) {
            outputElement.value.scrollTop = outputElement.value.scrollHeight;
          }
        });
      } catch (e) {
        console.error('解析消息错误:', e); // 容错：JSON 解析失败不中断整个流
      }
    }
  }

  // 8. 递归读取下一个块：实现流式持续处理
  return reader.read().then(processStream);
};
```

- 入参 `{ done, value }`：`done` 为布尔值（流是否读取完毕），`value` 为当前读取的二进制块（Uint8Array）；
- 递归逻辑：`reader.read()` 读取下一个块 → 调用 `processStream` 处理 → 直到 `done === true`；
- SSE 协议适配：服务器推送的流式数据需遵循「每行以 `data: `开头」的 SSE 格式，这是前端拆分 / 筛选的核心依据；
- 容错设计：JSON 解析异常仅打印日志，不终止整个流式处理。

##### 5. 启动流式读取 + 全局异常捕获

```javascript
// 启动第一次读取，读取器读取数据后结果作为参数给processStream并调用它，	触发递归
reader.read().then(processStream);
} catch (error) {
  console.error('流式请求错误:', error);
  isStreaming.value = false; // 异常时重置状态
}
```

- 外层 `try-catch` 捕获 Fetch 请求、流读取过程中的所有异常，确保 `isStreaming` 状态最终重置为 `false`。

#### 三、关键设计亮点

1. **防重复请求**：通过 `isStreaming` 状态拦截重复调用；
2. **流式解码容错**：`decoder.decode({ stream: true })` 处理多字节字符跨块问题；
3. **SSE 协议适配**：按行拆分 + 筛选 `data: `前缀，符合主流流式接口规范；
4. **用户体验优化**：`nextTick` 确保 DOM 更新后自动滚动到底部；
5. **异常容错**：局部捕获 JSON 解析错误，全局捕获请求 / 流错误，避免整体崩溃。