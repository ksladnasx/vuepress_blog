---
date: 2025-11-27
category:
  - 经验总结
tag:
  - BroadcastChannel
  - SSE
---

# SSE最大连接次数突破

## 前言

在我们建立sse连接的时候，由于**HTTP/1.1**的限制，在该协议下，大多数现代浏览器（如Chrome、Firefox、Edge）对**同一域名（协议+域名+端口）的并发连接数限制通常为6个**。这意味着，同一个浏览器标签页（或同一浏览器实例）中，对相同域名最多只能同时建立约6个SSE连接，超出此数量的新连接会被浏览器阻塞，直到有连接被关闭。

若需要突破此限制，可考虑以下方案：

| 解决方案              | 描述                                                         | 适用场景                                                     |
| :-------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **升级至HTTP/2**      | HTTP/2支持**多路复用**，可在单个TCP连接上并行处理多个请求和响应，从而从根本上解决连接数限制问题。 | **长远和推荐方案**，需服务器和浏览器支持，通常要求使用HTTPS。 |
| **多域名/多端口策略** | 将SSE连接分散到不同的子域（如`sse1.example.com`, `sse2.example.com`）或不同端口号。每个子域或端口享有独立的6个连接限额。 | **过渡方案**，适用于暂无法升级HTTP/2的情况，但配置管理稍复杂。 |
| **优化连接使用**      | 利用标签页切换及时关闭不再需要的SSE连接，或尝试将多个数据流合并到一个SSE连接中传输（通过不同事件类型区分）。 | **基础优化**，良好的连接管理习惯。                           |

但是以上方法都存在一定缺陷，HTTP/2存在兼容性问题，多端口策略过于繁琐，动态切换策略又过于消耗资源。

然后自然想到的就是**SharedWorker**，他可以将多个标签页共享一个SSE连接，且 **SharedWorker**自动管理连接生命周期，但是存在的问题是后期调试特别复杂，同时其相当于一个中间层，会对业务代码进行改动，较为复杂。

最后根据学长的建议选择了**BroadcastChannel** 的主从模式这种解决方式，它在保证较为轻量级且兼容性更好的情况下，基本上避免了业务逻辑部分的代码的修改，只需要对SSE连接的代码的主体文件进行修改。

**BroadcastChannel** 的主从模式类似一个频道，对于每个打开的标签页进行选举，选举好主标签页后主标签页建立SSE连接，同时对各类服务器更新的事件，利用**BroadcastChannel**进行广播，从标签页在收到广播后触发本地的处理器并更新数据。其核心就是让多个标签页共享一个SSE连接，避免连接数超限。

### **核心思想**

1. **只有一个"主"标签页**真正建立SSE连接
2. **其他"从"标签页**通过消息通道接收事件
3. **自动选举和故障转移**确保高可用性

![BroadcastChannel主从模式消息传递演示](.\img\BroadcastChannel.png)



## 原理机制详解

### 1. 通信基础：BroadcastChannel

```js
// 所有标签页创建相同的频道
const channel = new BroadcastChannel('sse-connection');

// 发送消息（所有同源标签页都能收到）
channel.postMessage({ type: 'hello', data: '消息内容' });

// 接收消息
channel.onmessage = (event) => {
    console.log('收到消息:', event.data);
};
```

### 2. 主从选举机制

**目标**：在多个标签页中选出唯一的"主"

**选举流程**：

1. **宣布参选**：每个标签页启动时都宣布自己要参与选举
2. **收集候选**：等待一段时间收集所有参选的标签页
3. **确定主节点**：按特定规则（如ID最小）选出主标签页
4. **公布结果**：将选举结果广播给所有标签页



### 3. 消息广播机制

**主标签页职责**：

- 建立唯一真实的SSE连接
- 接收服务器推送的事件
- 将事件广播给所有从标签页

**从标签页职责**：

- 监听主标签页的广播消息
- 触发本地的事件处理器

![BroadcastChannel主从模式消息传递演示](.\img\BroadcastChannel.png)

### 4. 故障转移机制

**心跳检测**：

- 主标签页定期发送心跳信号
- 从标签页监控心跳，发现超时则重新选举

**主标签页异常处理**：

- 页面关闭前尝试转移控制权
- 崩溃时自动触发重新选举

## 需要改其他业务逻辑代码吗？

并不需要，其他页面使用 `sseService` 的方式可以保持不变，主从模式的逻辑是在 `SSEService` 内部实现的，对外部使用层是透明的。

### 具体使用方式（与之前兼容）

你仍然可以通过以下方式在页面中使用 SSE 服务，无需关心当前是主标签页还是从标签页：

1. **引入服务**：

```javascript
import sseService from '@/path/to/sseService.js';
```

2. **监听事件**（如设备上线、离线等）：

```javascript
// 监听设备上线事件
sseService.on('device-online', (data) => {
  console.log('设备上线:', data);
  // 处理业务逻辑（如更新UI、提示用户等）
});

// 监听连接状态事件
sseService.on('connected', (data) => {
  console.log('SSE连接成功:', data);
});

// 监听错误事件
sseService.on('error', (error) => {
  console.error('SSE错误:', error);
});
```

3. **建立连接**：

```javascript
// 调用connect()即可，内部会自动判断是否为主标签页（主标签页实际建立连接，从标签页通过BroadcastChannel接收事件）
sseService.connect().then(() => {
  console.log('连接请求已处理');
}).catch((error) => {
  console.error('连接处理失败:', error);
});
```

4. **断开连接**：

```javascript
// 调用disconnect()，内部会根据引用计数和主从状态判断是否实际断开连接
sseService.disconnect();
```

5. **移除事件监听**（避免内存泄漏）：

```javascript
const handleDeviceOffline = (data) => {
  console.log('设备离线:', data);
};

// 添加监听
sseService.on('device-offline', handleDeviceOffline);

// 页面卸载或不需要时移除
sseService.off('device-offline', handleDeviceOffline);
```

### 核心原因

主从模式通过 `BroadcastChannel` 和 `localStorage` 实现的是**内部连接管理逻辑**，对外暴露的 `on`/`off`/`connect`/`disconnect` 等接口并未改变。无论是主标签页（实际建立 SSE 连接）还是从标签页（通过广播接收事件），都会通过 `emit` 方法触发你注册的事件回调，因此业务层无需做任何调整。

## 核心设计

该代码实现了一个基于 Server-Sent Events (SSE) 的服务，核心设计围绕**主从标签页模式**展开，通过解决多标签页连接限制、确保连接稳定性、同步状态等问题，实现了高效的实时消息推送。以下是几个核心设计的详细说明：

### 1. 主从标签页模式（突破 SSE 连接限制）

浏览器对同一域名的并发连接数有限制（通常为 6 个），若多个标签页同时建立 SSE 连接，可能导致连接失败或阻塞。因此，代码设计了 “主从模式”：

- **主标签页**：唯一与后端建立 SSE 连接的标签页，负责接收实时消息并广播给所有从标签页。
- **从标签页**：不直接连接 SSE，通过`BroadcastChannel`接收主标签页转发的消息。

**核心实现**：

- 通过`electionMaster()`方法选举主标签页：按标签页 ID（`tab-1`、`tab-2`...）排序，ID 最小的标签页当选为主标签页。
- 主标签页通过`localStorage`存储自身标识（`masterKey`），并通过`BroadcastChannel`广播 “主标签页宣告”（`master-announcement`），同步状态给所有从标签页。
- 从标签页监听`localStorage`变化和广播消息，确认主标签页身份，避免重复连接。

### 2. 主标签页心跳检测（确保主标签页存活）

为防止主标签页崩溃、关闭或失去响应后导致整个 SSE 服务中断，设计了心跳检测机制：

- **从标签页发起心跳检查**：从标签页每 30 秒通过`BroadcastChannel`发送`ping`消息给主标签页。
- **主标签页响应心跳**：主标签页收到`ping`后，立即返回`pong`消息。
- **超时处理**：从标签页发送`ping`后设置 5 秒超时器（`refreshTimeout`），若未收到`pong`，判定主标签页失效，触发重新选举（`electionMaster()`）。

**核心代码**：

```javascript
// 从标签页定期发送ping并检测超时
setInterval(() => {
  if (!this.isMaster) {
    this.broadcastChannel.postMessage({ type: "ping", ... });
    if (this.refreshTimeout) clearTimeout(this.refreshTimeout);
    this.refreshTimeout = setTimeout(() => {
      console.log("主标签页心跳超时，触发重新选举");
      this.electionMaster();
    }, 5000); // 5秒超时
  }
}, 30000); // 每30秒检查一次

// 主标签页响应pong
this.broadcastChannel.onmessage = (event) => {
  if (event.data.type === "ping") {
    this.broadcastChannel.postMessage({ type: "pong", ... });
  }
};
```

### 3. 标签页状态监控（管理活跃标签页生命周期）

为准确维护标签页列表、及时清理无效标签页，设计了标签页状态监控机制：

- **活跃标签页注册与注销**：
  - 标签页初始化时通过`registerActiveTab()`将自身添加到`localStorage`的活跃列表（`activeTabsKey`），包含`tabId`、`instanceId`（唯一标识，避免刷新冲突）和时间戳。
  - 标签页关闭 / 刷新时通过`unregisterActiveTab()`从活跃列表移除自身，并在列表为空时重置计数器和主标签页标识。
- **过期标签页清理**：通过`cleanExpiredTabs()`定期清理 5 分钟内未更新时间戳的标签页（视为已关闭或失效），确保活跃列表准确。
- **活跃状态更新**：每 60 秒通过定时器更新当前标签页的时间戳，标记为 “活跃”，避免被误判为过期。

**核心代码**：

```javascript
// 定期更新当前标签页时间戳（保持活跃）
setInterval(() => {
  const activeTabs = JSON.parse(localStorage.getItem(this.activeTabsKey) || "[]");
  const tabIndex = activeTabs.findIndex(tab => tab.instanceId === this.tabInstanceId);
  if (tabIndex !== -1) {
    activeTabs[tabIndex].timestamp = Date.now(); // 更新时间戳
    localStorage.setItem(this.activeTabsKey, JSON.stringify(activeTabs));
  }
}, 60000); // 每分钟更新一次
```

### 4. 连接管理与重连机制（确保 SSE 连接稳定）

主标签页负责维护与后端的 SSE 连接，通过重连机制处理网络波动或连接失败：

- **连接状态标识**：通过`isConnected`（是否连接）、`isConnecting`（是否正在连接）跟踪状态，避免重复连接。
- 重连策略：
  - 连接失败时触发`handleReconnect()`，采用**指数退避策略**（重连间隔从 3 秒开始，每次翻倍，最大 30 秒）。
  - 限制最大重连次数（默认 5 次），超过后停止重连并触发`max-reconnect-reached`事件。
- **引用计数**：通过`referenceCount`跟踪对 SSE 服务的引用（如组件使用），仅当计数为 0 时才真正断开连接，避免频繁连接 / 断开。

**核心代码**：

```javascript
// 指数退避重连
const baseDelay = Math.min(
  this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1),
  30000 // 最大延迟30秒
);
setTimeout(() => this.connect(), baseDelay);
```

### 5. 跨标签页消息同步（基于 BroadcastChannel）

通过`BroadcastChannel`实现主从标签页的消息同步：

- 主标签页接收 SSE 消息后，通过`broadcastSSEMessage()`将消息广播给所有从标签页（如`device-online`、`device-offline`等事件）。
- 从标签页监听广播消息，触发本地事件回调，实现与主标签页的状态同步。

**核心代码**：

```javascript
// 主标签页广播消息
broadcastSSEMessage(eventType, payload) {
  if (this.isMaster) {
    this.broadcastChannel.postMessage({
      type: "sse-message",
      data: { eventType, payload }
    });
  }
}

// 从标签页接收消息并触发事件
this.broadcastChannel.onmessage = (event) => {
  if (event.data.type === "sse-message") {
    this.emit(event.data.data.eventType, event.data.data.payload);
  }
};
```

### 总结

该代码通过**主从模式**解决多标签页连接限制，通过**心跳检测**确保主标签页有效性，通过**状态监控**管理标签页生命周期，通过**重连机制**保证连接稳定性，最终实现了高效、可靠的跨标签页 SSE 实时消息推送服务。

## 源代码	

此处我为原有的SSE连接文件（`sseService.js`）添加BroadcastChannel 的主从模式逻辑以突破SSE的连接限制，选择主标签页的规则是先到先得，所有标签页都关闭的时候清除选举的标签页标志，也就是 **Localstorage** 里的标志。当然在撰写代码的同时也要注意主标签页如果被用户叉掉或者刷新，被刷新的标签页的id会进行重置，则要进行重新选举。

源代码：[sseServiceWithBroadcastChannel.js](./code/sseServiceWithBroadcastChannel.md)

相关文章：[BroadcastChannel版本sse文件解读.md](./BroadcastChannel版本sse解读.md)
