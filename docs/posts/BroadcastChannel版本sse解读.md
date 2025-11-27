---
date: 2025-11-27
category:
  - 代码解读
tag:
  - SSE
  - BroadcastChannel
---



# sseService文件解读(BroadcastChannel版)

源文件地址：[sseServiceWithBroadcastChannel.js](./sseServiceWithBroadcastChannel.md)

相关文章：[BroadcastChannel方式解决sse连接数限制](BroadcastChannel方式解决sse连接数限制.md)

为了深入了解这个 SSE 服务类的完整工作原理和代码逻辑。下面我会分模块、按流程进行细致解析。

### 一、整体架构与核心目标

这个`SSEService`类实现了一个**支持多标签页共享的 Server-Sent Events 客户端**，核心目标是：

1. 突破浏览器对单个域名的 SSE 连接限制（通常为 6 个）
2. 仅让一个标签页（主标签页）建立实际 SSE 连接，其他标签页通过`BroadcastChannel`共享数据
3. 主标签页失效时自动选举新主，保证服务不中断
4. 对外提供统一接口，屏蔽内部复杂逻辑

### 二、核心模块解析

#### 1. 类初始化（constructor）

```javascript
constructor() {
  // 1. 禁用开关：通过环境变量控制SSE服务是否启用
  this.disabled = import.meta.env.VITE_SSE_DISABLED === 'true'
  if (this.disabled) { /* 初始化模拟对象，直接返回 */ }

  // 2. 主从模式核心属性
  this.isMaster = false // 是否为主标签页
  this.instanceId = this.generateInstanceId() // 按顺序生成的标签页ID（tab-1, tab-2...）
  this.broadcastChannel = new BroadcastChannel('sse-broadcast-channel') // 跨标签通信通道
  this.masterKey = 'sse-master-instance-id' // localStorage中存储主标签页ID的键名
  this.electionInProgress = false // 选举锁，防止并发选举冲突

  // 3. SSE连接属性
  this.eventSource = null // SSE连接实例
  this.reconnectAttempts = 0 // 重连次数
  this.maxReconnectAttempts = 5 // 最大重连次数
  this.reconnectInterval = 3000 // 基础重连间隔
  this.isConnected = false // 连接状态
  this.isConnecting = false // 连接中状态
  this.referenceCount = 0 // 引用计数（防止重复连接/提前断开）

  // 4. SSE服务配置
  this.baseUrl = import.meta.env.VITE_SSE_BASE_URL || 'http://localhost:8081'
  this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`

  // 5. 初始化工作流
  this.initMasterSlaveMode() // 初始化主从模式
  this.setupPageUnloadHandler() // 页面卸载处理
  this.startConnectionMonitor() // 连接状态监控
  this.setupTabCloseMonitor() // 标签页关闭监控
}
```

**关键点**：

- 通过环境变量`VITE_SSE_DISABLED`提供灵活的开关控制是否开启SSE功能
- 所有核心属性在初始化时声明，保证状态可追踪
- 初始化流程按依赖顺序执行（先主从模式，再生命周期管理）

#### 2. 标签页 ID 生成（generateInstanceId）

```javascript
generateInstanceId() {
  try {
    // 从localStorage获取当前标签页计数（初始为0）
    let tabCount = parseInt(localStorage.getItem(this.tabCountKey) || '0', 10)
    tabCount += 1 // 新标签页计数+1
    localStorage.setItem(this.tabCountKey, tabCount.toString()) // 保存新计数
    return `tab-${tabCount}` // 返回直观ID（tab-1, tab-2...）
  } catch (error) {
    // 降级方案：localStorage不可用时使用时间戳+随机数
    return `tab-fallback-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
  }
}
```

**设计思路**：

- 通过`localStorage`全局计数，保证 ID 严格按打开顺序生成
- ID 格式直观（`tab-N`），一眼就能识别标签页打开顺序
- 有异常降级方案，保证鲁棒性

#### 3. 主从模式管理（核心机制）

##### 3.1 初始化主从模式（initMasterSlaveMode）

```javascript
initMasterSlaveMode() {
  // 1. 监听跨标签通信消息
  this.broadcastChannel.onmessage = (event) => {
    const { type, data, instanceId } = event.data
    if (instanceId === this.instanceId) return // 忽略自己发的消息

    switch (type) {
      case 'master-announcement': // 主标签页宣告
        this.isMaster = false // 其他标签页收到宣告后放弃主身份
        break
      case 'sse-message': // SSE消息广播
        this.emit(data.eventType, data.payload) // 触发本地事件
        break
      case 'master-disconnected': // 主标签页断开
        if (!this.isMaster) this.electionMaster() // 触发重新选举
        break
      case 'tab-closed': // 标签页关闭
        if (data.instanceId === localStorage.getItem(this.masterKey)) {
          this.electionMaster() // 主标签页关闭则重新选举
        }
        break
    }
  }

  // 2. 监听localStorage变化（跨标签同步主标签页状态）
  window.addEventListener('storage', (event) => {
    if (event.key === this.masterKey) {
      const newMasterId = event.newValue
      if (!newMasterId && !this.isMaster) {
        this.electionMaster() // 主标签页标识被清除则选举
      } else if (newMasterId && newMasterId !== this.instanceId) {
        this.isMaster = false // 新主产生则放弃主身份
      }
    }
  })

  // 3. 启动首次选举
  this.electionMaster()
}
```

**核心逻辑**：

- 通过`BroadcastChannel`实现实时跨标签通信
- 通过`storage`事件监听`localStorage`变化，保证主标签页状态同步
- 不同消息类型对应不同处理逻辑，形成完整的主从协同机制

##### 3.2 主标签页选举（electionMaster）

```javascript
electionMaster() {
  if (this.electionInProgress) return // 选举锁：防止并发冲突
  this.electionInProgress = true

  // 延迟1秒：让所有标签页都有机会参与选举，避免抢锁
  setTimeout(() => {
    try {
      const currentMasterId = localStorage.getItem(this.masterKey)

      if (!currentMasterId) {
        // 无主则当前标签页当选
        localStorage.setItem(this.masterKey, this.instanceId)
        this.isMaster = true
        this.broadcastChannel.postMessage({ // 向其他标签页宣告
          type: 'master-announcement',
          instanceId: this.instanceId,
          data: { instanceId: this.instanceId }
        })
        if (!this.isConnected) this.connect() // 当选后主标签页建立SSE连接
      } else {
        // 已有主则更新自身状态
        this.isMaster = currentMasterId === this.instanceId
      }
    } finally {
      this.electionInProgress = false // 释放选举锁
    }
  }, 1000)
}
```

**选举机制**：

- **延迟选举**：1 秒延迟确保所有标签页都能检测到当前主状态
- **原子性保障**：通过`localStorage`的原子操作避免 "多主" 问题
- **宣告机制**：新主产生后主动宣告，其他标签页立即更新状态

#### 4. SSE 连接管理

##### 4.1 建立连接（connect）

```javascript
connect() {
  if (this.disabled) return Promise.resolve() // 禁用状态直接返回
  if (!this.isMaster) return Promise.resolve() // 从标签页不建立实际连接

  this.referenceCount++ // 引用计数+1（防止重复连接）
  
  if (this.isConnected || this.isConnecting) return Promise.resolve() // 已有连接则返回

  return new Promise((resolve, reject) => {
    this.isConnecting = true
    this.eventSource = new EventSource(this.sseEndpoint) // 建立SSE连接

    // 连接超时处理（2分钟）
    const connectionTimeout = setTimeout(() => {
      if (this.isConnecting && !this.isConnected) {
        this.eventSource.close()
        this.isConnecting = false
        reject(new Error('SSE连接超时'))
      }
    }, 120000)

    // 连接成功事件
    this.eventSource.addEventListener('connected', (event) => {
      if (this.eventSource.readyState === EventSource.OPEN) {
        this.isConnected = true
        this.isConnecting = false
        clearTimeout(connectionTimeout)
        this.emit('connected', event.data) // 触发本地事件
        this.broadcastSSEMessage('connected', event.data) // 广播给其他标签页
        resolve()
      }
    })

    // 各类业务事件监听（device-online/device-offline等）
    this.eventSource.addEventListener('device-online', (event) => {
      const data = JSON.parse(event.data)
      this.emit('device-online', data) // 触发本地事件
      this.broadcastSSEMessage('device-online', data) // 广播给其他标签页
    })

    // 错误处理与重连
    this.eventSource.onerror = (event) => {
      if (this.eventSource.readyState === EventSource.CLOSED) {
        this.isConnected = false
        this.isConnecting = false
        setTimeout(() => this.handleReconnect(), 2000) // 触发重连
        reject(new Error('SSE连接已关闭'))
      }
    }
  })
}
```

**连接机制**：

- **主标签页独占连接**：只有主标签页会创建`EventSource`实例
- **引用计数**：防止多次调用`connect()`导致重复连接
- **超时保护**：2 分钟超时避免无限等待
- **事件双向分发**：主标签页收到 SSE 事件后，既触发本地事件，也广播给其他标签页

##### 4.2 重连逻辑（handleReconnect）

```javascript
handleReconnect() {
  if (!this.isMaster || this.isConnecting) return // 非主/连接中则跳过

  if (this.reconnectAttempts >= this.maxReconnectAttempts) {
    this.emit('max-reconnect-reached') // 达到最大重连次数触发事件
    return
  }

  this.reconnectAttempts++
  const baseDelay = Math.min(this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1), 30000) // 指数退避

  setTimeout(() => {
    if (this.eventSource) this.eventSource.close() // 关闭旧连接
    this.eventSource = null
    this.connect().catch(error => { // 重新连接
      setTimeout(() => this.handleReconnect(), 5000)
    })
  }, baseDelay)
}
```

**重连策略**：

- **指数退避**：重连间隔按 2 的幂次增长（3s→6s→12s…），最大 30s
- **重连次数限制**：最多 5 次，避免无限重连
- **主标签页限制**：只有主标签页会执行重连

#### 5. 跨标签消息广播（broadcastSSEMessage）

```javascript
broadcastSSEMessage(eventType, payload) {
  if (!this.isMaster) return // 只有主标签页能广播

  this.broadcastChannel.postMessage({
    type: 'sse-message',
    instanceId: this.instanceId,
    data: { eventType, payload }
  })
}
```

**作用**：主标签页将 SSE 事件转发给所有从标签页，实现数据共享

#### 6. 生命周期管理

##### 6.1 页面卸载处理（setupPageUnloadHandler）

```javascript
setupPageUnloadHandler() {
  window.addEventListener('beforeunload', () => {
    // 广播自己关闭的消息
    this.broadcastChannel.postMessage({
      type: 'tab-closed',
      instanceId: this.instanceId,
      data: { instanceId: this.instanceId }
    })

    // 如果是主标签页，清除主标识并通知重选
    if (this.isMaster) {
      this.broadcastChannel.postMessage({
        type: 'master-disconnected',
        instanceId: this.instanceId
      })
      const currentMasterId = localStorage.getItem(this.masterKey)
      if (currentMasterId === this.instanceId) {
        localStorage.removeItem(this.masterKey) // 清除主标识
      }
    }

    this.disconnect() // 断开连接
    this.broadcastChannel.close() // 关闭通信通道
  })
}
```

**关键处理**：

- 主标签页关闭时主动清除`localStorage`中的主标识
- 广播 "主断开" 消息，触发其他标签页重新选举
- 清理资源（断开连接、关闭通道）

##### 6.2 连接状态监控（startConnectionMonitor）

```javascript
startConnectionMonitor() {
  setInterval(() => {
    if (this.isMaster) {
      // 主标签页检查连接状态
      if (this.eventSource && this.eventSource.readyState === EventSource.CLOSED && !this.isConnecting) {
        this.handleReconnect() // 连接关闭则重连
      }
    } else {
      // 从标签页检查主标签页是否存在
      const currentMasterId = localStorage.getItem(this.masterKey)
      if (!currentMasterId) {
        this.electionMaster() // 主不存在则选举
      }
    }
  }, 10000) // 每10秒检查一次
}
```

**监控机制**：

- 主标签页：检查自身 SSE 连接状态，异常则重连
- 从标签页：检查主标签页是否存活，无主则触发选举
- 高频检查（10 秒）：保证快速发现异常

### 三、完整工作流程

#### 1. 新标签页打开时：

1. 生成顺序 ID（如`tab-3`）

2. 初始化`BroadcastChannel`并监听消息

3. 检查
   `
   localStorage
   `
   中是否有主标签页

   - 无主：参与选举并当选，建立 SSE 连接
   - 有主：成为从标签页，通过广播接收数据

#### 2. 主标签页正常工作时：

1. 主标签页接收 SSE 事件，触发本地事件 + 广播给其他标签页
2. 从标签页通过`BroadcastChannel`接收事件，触发本地事件
3. 所有标签页对外表现一致的事件行为

#### 3. 主标签页关闭 / 刷新时：

1. 主标签页在卸载前广播 "主断开" 消息 + 清除主标识
2. 从标签页收到消息 / 检测到主标识消失，触发重新选举
3. ID 最小的存活标签页当选新主，建立新的 SSE 连接
4. 服务无缝切换，无感知中断

### 四、对外接口设计

#### 1. 事件监听 / 移除

```javascript
on(eventType, callback) { // 添加事件监听
  if (!this.listeners.has(eventType)) {
    this.listeners.set(eventType, [])
  }
  this.listeners.get(eventType).push(callback)
}

off(eventType, callback) { // 移除事件监听
  if (this.listeners.has(eventType)) {
    const callbacks = this.listeners.get(eventType)
    const index = callbacks.indexOf(callback)
    if (index > -1) callbacks.splice(index, 1)
  }
}
```

#### 2. 事件触发

```javascript
emit(eventType, data) { // 触发本地事件
  if (this.listeners.has(eventType)) {
    this.listeners.get(eventType).forEach(callback => {
      try {
        callback(data) // 执行回调
      } catch (error) {
        console.error(`事件处理器执行错误 [${eventType}]:`, error) // 错误隔离
      }
    })
  }
}
```

#### 3. 状态查询

```javascript
getConnectionStatus() { // 获取当前连接状态
  return {
    isMaster: this.isMaster,
    isConnected: this.isConnected,
    instanceId: this.instanceId,
    // 其他状态...
  }
}
```

### 五、主标签页超时检查逻辑

这段代码是**从标签页检测主标签页是否存活的核心逻辑**，`refreshTimeout`作为心跳超时定时器，用于判断主标签页是否失效，进而触发重新选举。以下是具体逻辑解析：

#### 一、`refreshTimeout`的核心作用

`refreshTimeout`是一个定时器引用，用于监控主标签页的心跳响应。当从标签页发送`ping`消息后，如果在规定时间（5 秒）内未收到主标签页的`pong`响应，`refreshTimeout`会触发重新选举主标签页的逻辑，确保 SSE 连接始终由有效的主标签页维护。

#### 二、围绕`refreshTimeout`的完整逻辑流程

代码位于`startActiveTabsMonitor`方法中，该方法每 30 秒执行一次（主标签页存活检查），具体流程如下：

##### 1. 触发时机：从标签页定期检查主标签页状态

```javascript
// 每30秒检查一次主标签页状态（仅从标签页执行）
setInterval(() => {
  if (!this.isMaster) { // 当前是从标签页
    const currentMasterInstanceId = localStorage.getItem(this.masterKey);
    
    if (!currentMasterInstanceId) {
      // 主标签页标识不存在，直接触发重新选举
      console.log('检测到主标签页不存在，触发重新选举')
      this.electionMaster()
    } else {
      // 主标签页标识存在，发送ping消息检查其是否存活
      this.broadcastChannel.postMessage({
        type: 'ping',
        tabId: this.tabId,
        instanceId: this.tabInstanceId
      })
      
      // 关键逻辑：设置超时定时器refreshTimeout
      if (this.refreshTimeout) clearTimeout(this.refreshTimeout); // 清除旧定时器（避免重复）
      this.refreshTimeout = setTimeout(() => {
        // 5秒内未收到pong响应，判定主标签页失效
        console.log('主标签页心跳超时，触发重新选举')
        this.electionMaster(); // 重新选举主标签页
      }, 5000);
    }
  }
}, 30000); // 每30秒执行一次
```

##### 2. 核心逻辑拆解

- **发送`ping`消息**：从标签页每 30 秒向主标签页发送`ping`消息（类似 “心跳探测”），询问主标签页是否存活。
- **设置`refreshTimeout`定时器**：发送`ping`后，立即设置一个 5 秒的定时器`refreshTimeout`。这个定时器的作用是：如果 5 秒内没收到主标签页的`pong`响应，就认为主标签页已崩溃 / 关闭 / 失去响应。
- **超时触发重新选举**：若 5 秒内未收到`pong`，`refreshTimeout`的回调函数执行，调用`this.electionMaster()`重新选举新的主标签页，确保 SSE 连接不中断。
- **避免重复定时器**：每次设置新的`refreshTimeout`前，先通过`clearTimeout(this.refreshTimeout)`清除旧的定时器，防止多个定时器叠加导致误触发。

##### 3. 本应存在的`pong`响应处理（原代码缺失）

正常逻辑中，主标签页收到`ping`后会回复`pong`消息，从标签页应在收到`pong`时清除`refreshTimeout`，避免误判超时。因此原`broadcastChannel.onmessage`处应处理`pong`消息，使`refreshTimeout`在收到主标签页的心跳后能正常清除：

```javascript
// 在broadcastChannel.onmessage的switch中添加pong处理
case 'pong':
  // 确认发送pong的是当前主标签页
  if (instanceId === localStorage.getItem(this.masterKey)) {
    console.log('收到主标签页pong响应，清除超时定时器')
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout); // 清除超时定时器，避免误触发选举
      this.refreshTimeout = null;
    }
  }
  break;
```

#### 三、总结

`refreshTimeout`是从标签页判断主标签页是否存活的 “超时判定器”，其逻辑设计的核心目的是：通过 “`ping`发送→`pong`等待→超时判定” 的流程，确保主标签页失效时能及时触发重新选举，维持 SSE 服务的连续性。（注：原代码因缺少`pong`处理导致`refreshTimeout`无法清除，会引发误判，需补充`pong`消息的处理逻辑。）

### 六、标签页活跃状态监控

```js
startActiveTabsMonitor() {
    // 定期更新当前标签页的时间戳，标记为活跃
    setInterval(() => {
      try {
        const activeTabs = JSON.parse(
          localStorage.getItem(this.activeTabsKey) || "[]"
        );
        const tabIndex = activeTabs.findIndex(
          (tab) => tab.instanceId === this.tabInstanceId
        );

        if (tabIndex !== -1) {
          activeTabs[tabIndex].timestamp = Date.now();
          localStorage.setItem(this.activeTabsKey, JSON.stringify(activeTabs));
        } else {
          // 重新注册
          this.registerActiveTab();
        }
      } catch (error) {
        console.error("更新活跃标签页时间戳失败:", error);
      }
    }, 60000); 
```

这段代码中 “定期更新当前标签页时间戳并标记为活跃” 的逻辑，是为了**维持标签页的 “活跃状态”，确保主标签页选举机制能基于真实有效的标签页列表进行，避免因标签页 “假死” 或 “失效” 导致的选举异常**。

#### 核心逻辑拆解

##### 1. 为什么需要 “标记活跃”？

在多标签页场景中，浏览器无法直接感知其他标签页是否仍在正常运行（可能被用户关闭、崩溃，或长时间未操作）。因此，代码通过`localStorage`维护了一个 “活跃标签页列表”（`activeTabsKey`对应的存储），每个标签页需要主动证明自己 “还活着”。

时间戳（`timestamp`）是标签页 “活跃度” 的凭证：**时间戳越新，说明标签页越可能处于正常运行状态**。

##### 2. 定时更新的具体作用

代码通过`setInterval`每 60 秒（1 分钟）执行一次更新操作，核心目的是：

- **避免被判定为 “过期标签页”**：代码中有一个`cleanExpiredTabs`方法，会定期清理 “5 分钟内未更新时间戳” 的标签页（认为这些标签页已失效）。当前标签页每 1 分钟更新一次时间戳，确保自己始终处于 “5 分钟有效期” 内，不会被清理。

  ```javascript
  // 清理过期标签页的逻辑（5分钟未更新则视为过期）
  cleanExpiredTabs() {
    const now = Date.now()
    const FIVE_MINUTES = 5 * 60 * 1000
    const validTabs = activeTabs.filter(tab => now - tab.timestamp < FIVE_MINUTES)
    // ...保存有效标签页
  }
  ```

  

- **确保主标签页选举的准确性**：主标签页选举（`electionMaster`）的前提是 “基于活跃标签页列表”。如果当前标签页不更新时间戳，会被`cleanExpiredTabs`移除，导致：

  - 若当前标签页是主标签页：会被判定为失效，触发重新选举（错误地失去主标签页身份）；
  - 若当前标签页是从标签页：会被排除在选举候选人之外，无法在主标签页失效时参与补选。

##### 3. 异常处理：重新注册

如果在更新时发现当前标签页已不在活跃列表中（`tabIndex === -1`），会调用`this.registerActiveTab()`重新注册。这是为了应对极端情况：

- 可能因`localStorage`数据意外丢失（如浏览器清理缓存），导致当前标签页的记录被删除；
- 重新注册能确保当前标签页重新加入活跃列表，避免 “明明在运行却被排除在外” 的问题。

#### 小结

定时更新时间戳的逻辑是多标签页协同的 “心跳维持机制”：通过主动刷新 “活跃度凭证”，确保当前标签页不会被系统误判为 “已失效”，从而保证主标签页选举基于真实有效的标签页列表，最终维持 SSE 服务的稳定运行（只有活跃的主标签页才会保持 SSE 连接）。

### 总结

这个`SSEService`的核心设计亮点：

1. **透明的主从模式**：对外接口统一，业务层无需关心主从身份
2. **健壮的选举机制**：通过`localStorage`+`BroadcastChannel`保证选举的原子性和实时性
3. **优雅的故障转移**：主标签页失效时自动选举新主，服务不中断
4. **直观的 ID 设计**：`tab-N`格式让标签页顺序一目了然
5. **完善的错误处理**：超时、重连、异常捕获全覆盖

整个类遵循 "内部复杂，外部简单" 的设计原则，将多标签协同的复杂性封装在内部，对外提供简洁一致的 API，让业务开发更高效。