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

当然有更方便不涉及业务逻辑的方式，就是封装一个类，具体见：[sseService文件解析.js](./sseService文件解析.md)

## 代码

前端主要组件代码：[SSEDemoFronted](./code/SSEDemoFronted.md)

后端nodejs代码：[sseDomeServer](./code/sseDomeServer.md)

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