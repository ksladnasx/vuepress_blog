---
date: 2025-11-25
category:
  - 代码解读
tag:
  - SSE
---

# SSE服务代码解读

完整代码地址：[sseService.js](../code/sseService.md)

这是一个功能完整的SSE（Server-Sent Events）客户端服务类，用于接收后端实时推送的设备状态变化通知。以下是对代码的详细解读：

## 🏗️ 整体架构设计

### 单例模式实现

```js
// 创建全局单例实例，确保整个应用只有一个SSE连接
let sseServiceInstance = null
const getSseService = () => {
  if (!sseServiceInstance) {
    sseServiceInstance = new SSEService()
  }
  return sseServiceInstance
}
```

### 核心属性说明

| 属性                         | 类型        | 作用                             |
| ---------------------------- | ----------- | -------------------------------- |
| `eventSource`                | EventSource | 原生SSE连接对象                  |
| `listeners`                  | Map         | 事件监听器集合                   |
| `referenceCount`             | number      | **引用计数机制**，支持多组件共享 |
| `isConnected`/`isConnecting` | boolean     | 连接状态管理                     |

## 🔄 核心功能机制

1. 引用计数管理

```js
// 连接时增加计数
connect() {
  this.referenceCount++
  // 只有第一个引用才真正建立连接
}

// 断开时减少计数
disconnect() {
  this.referenceCount--
  // 只有计数为0时才真正断开连接
}
```

**优势**：多个UI组件可以独立使用SSE服务，无需担心重复连接或过早断开。

2. 智能重连策略

```js
handleReconnect() {
  // 指数退避算法：重连延迟随尝试次数增加
  const baseDelay = Math.min(
    this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1), 
    30000 // 最大延迟30秒
  )
}
```

**特点**：

- 最大重试次数限制（5次）
- 避免网络拥塞的退避策略
- 连接状态检查防止重复重连

3. 完整的事件生命周期管理

```js
// 事件监听器管理
on(eventType, callback)    // 注册监听
off(eventType, callback)   // 移除监听  
emit(eventType, data)      // 触发事件

// 支持的事件类型
'device-registered'    // 设备注册
'device-online'        // 设备上线  
'device-offline'       // 设备离线
'device-alert'         // 设备告警
'statistics-update'    // 统计更新
```

## 🌐 连接配置与URL处理

环境自适应URL构建

```js
// 开发环境：完整URL
// 生产环境：相对路径（通过nginx代理）
if (this.baseUrl.startsWith('http')) {
  this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`
} else {
  this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`
}
```

连接超时控制

```js
const connectionTimeout = setTimeout(() => {
  if (this.isConnecting && !this.isConnected) {
    reject(new Error('SSE连接超时'))
  }
}, 120000) // 2分钟超时，适应生产环境
```

## 🛡️ 健壮性设计

错误处理与恢复

```js
eventSource.onerror = (event) => {
  // 根据readyState采取不同策略
  if (this.eventSource.readyState === EventSource.CLOSED) {
    this.handleReconnect() // 连接关闭时重连
  }
  // CONNECTING/OPEN状态下的错误有不同处理逻辑
}
```

资源清理机制

```js
setupPageUnloadHandler() {
  window.addEventListener('beforeunload', () => {
    this.disconnect() // 页面卸载时自动清理
  })
}
```

## 📊 监控与诊断

连接状态监控

```js
startConnectionMonitor() {
  setInterval(() => {
    // 每30秒检查连接健康状态
    if (this.eventSource.readyState === EventSource.CLOSED) {
      this.handleReconnect() // 自动恢复断开的连接
    }
  }, 30000)
}
```

详细的日志记录

代码中包含大量`console.log`语句，便于：

- 调试连接问题
- 监控事件流
- 诊断网络异常

## 🎯 使用示例

```js
// 在组件中使用
import sseService from './sse-service'

// 监听设备上线事件
sseService.on('device-online', (data) => {
  console.log('设备上线:', data)
  // 更新UI状态
})

// 建立连接
sseService.connect()

// 组件卸载时断开连接
sseService.disconnect()
```

## 💡 设计亮点

1. **单一职责**：专注SSE连接管理，不掺杂业务逻辑
2. **容错性强**：完善的错误处理和自动恢复机制
3. **资源友好**：引用计数避免重复连接，及时清理资源
4. **可扩展**：事件机制便于功能扩展
5. **生产就绪**：考虑多种边缘情况和网络环境



## **事件监听器的注册机制**

代码解析

以以下代码为例：

```ts
 on(eventType, callback) { 
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, [])
    }
    this.listeners.get(eventType).push(callback)
  }
```

1. 数据结构解析

`this.listeners`是什么？

```js
// listeners 是一个 Map 数据结构，存储格式如下：
this.listeners = new Map([
  // 键(key): 事件类型(string)
  // 值(value): 回调函数数组(Array<Function>)
  
  ['device-online', [callback1, callback2, callback3]],
  ['device-offline', [callback4, callback5]],
  ['device-alert', [callback6]],
  // ...
])
```

2. 代码执行步骤分解

步骤1：检查事件类型是否已存在

```js
if (!this.listeners.has(eventType)) {
    this.listeners.set(eventType, [])
}
```

**作用**：

- 检查 `this.listeners`Map 中是否已经有这个 `eventType`的条目
- 如果没有（即第一次注册该事件类型），就创建一个空数组作为值
- 相当于初始化这个事件类型的监听器列表

**示例**：

```js
// 第一次注册 'device-online' 事件
this.listeners.has('device-online') // false
// 执行后：创建空数组
this.listeners.set('device-online', [])
// 现在：listeners = Map { 'device-online' => [] }
```

步骤2：添加回调函数到对应数组

```js
this.listeners.get(eventType).push(callback)
```

**作用**：

get查找到其在字典中的字段，push将函数添加到该字段对应的值上

- 通过 `eventType`获取对应的回调函数数组
- 将新的 `callback`函数添加到数组末尾

**示例**：

```js
// 注册第一个监听器
sseService.on('device-online', callback1)
// listeners = Map { 'device-online' => [callback1] }

// 注册第二个监听器（同一事件类型）
sseService.on('device-online', callback2)  
// listeners = Map { 'device-online' => [callback1, callback2] }
```

3. 实际使用示例

场景：多个组件监听同一事件

```js
// 组件A - 设备列表
sseService.on('device-online', (data) => {
    console.log('组件A: 设备上线', data.deviceId)
    // 更新设备列表的UI显示
    updateDeviceStatus(data.deviceId, 'online')
})

// 组件B - 统计面板  
sseService.on('device-online', (data) => {
    console.log('组件B: 设备上线', data.deviceId)
    // 更新在线设备计数
    onlineCount.value++
})

// 组件C - 实时通知
sseService.on('device-online', (data) => {
    console.log('组件C: 设备上线', data.deviceId)
    // 显示桌面通知
    showNotification(`设备 ${data.deviceId} 已上线`)
})

// 当设备上线事件发生时，所有3个回调函数都会执行
```

内存中的数据结构：

```js
this.listeners = Map {
    'device-online' => [
        (data) => { /* 组件A的回调 */ },
        (data) => { /* 组件B的回调 */ }, 
        (data) => { /* 组件C的回调 */ }
    ],
    'device-offline' => [
        // 其他事件的回调函数...
    ]
}
```

4. 与 `emit`方法的配合

事件触发流程：

```js
// 当收到SSE消息时，调用emit触发事件
emit(eventType, data) {
    if (this.listeners.has(eventType)) {
        // 获取该事件类型的所有回调函数
        this.listeners.get(eventType).forEach(callback => {
            try {
                callback(data)  // 依次执行每个回调函数
            } catch (error) {
                console.error(`事件处理器执行错误:`, error)
            }
        })
    }
}

// 使用示例：
// 收到后端推送：执行 emit('device-online', deviceData)
// 结果：组件A、B、C的回调函数都会收到deviceData并执行
```

5. 设计模式的优势

观察者模式（Observer Pattern）

这种设计实现了经典的观察者模式：

```js
// 主题（Subject） - SSE服务
class SSEService {
    constructor() {
        this.listeners = new Map()  // 观察者列表
    }
    
    // 注册观察者
    on(eventType, callback) {
        // ... 上面的实现
    }
    
    // 通知观察者
    emit(eventType, data) {
        // ... 触发所有回调
    }
}

// 观察者（Observers） - 各个组件
componentA.onDeviceOnline = (data) => { /* 处理逻辑 */ }
componentB.onDeviceOnline = (data) => { /* 处理逻辑 */ }

// 注册观察者
sseService.on('device-online', componentA.onDeviceOnline)
sseService.on('device-online', componentB.onDeviceOnline)
```

6. 实际业务场景

模块化的事件处理

```js
// 设备管理模块
class DeviceManager {
    constructor() {
        this.setupEventHandlers()
    }
    
    setupEventHandlers() {
        sseService.on('device-online', this.handleDeviceOnline.bind(this))
        sseService.on('device-offline', this.handleDeviceOffline.bind(this))
        sseService.on('device-alert', this.handleDeviceAlert.bind(this))
    }
    
    handleDeviceOnline(data) {
        // 专门的设备上线处理逻辑
        this.updateDeviceCache(data.deviceId, 'online')
        this.refreshDeviceList()
    }
    
    // ... 其他处理方法
}

// 告警管理模块  
class AlertManager {
    constructor() {
        this.setupEventHandlers()
    }
    
    setupEventHandlers() {
        sseService.on('device-alert', this.handleNewAlert.bind(this))
        sseService.on('device-online', this.handleDeviceRecovery.bind(this))
    }
    
    handleNewAlert(data) {
        // 专门的告警处理逻辑
        this.storeAlert(data)
        this.notifyUsers(data)
    }
    
    // ... 其他处理方法
}
```

7. 总结

这个 `on`方法的核心作用：

1. **事件注册**：允许不同的代码模块注册对特定事件的兴趣
2. **多监听器支持**：同一事件类型可以注册多个回调函数
3. **解耦设计**：事件源（SSE服务）和事件处理逻辑（各个组件）完全解耦
4. **灵活扩展**：可以动态添加/移除事件监听器

这种设计让SSE服务成为了一个**事件总线**，各个业务模块只需要关心自己感兴趣的事件，而不需要知道其他模块的存在，大大提高了代码的可维护性和可扩展性。

## SSE服务事件监听器详解

### 🎯 事件监听器设计原理

为什么使用 `Map`存储监听器？

```js
this.listeners = new Map()
```

**设计原因：**

1. **事件类型作为键** - 每个事件类型(`device-online`, `device-offline`等)对应一个回调函数数组
2. **支持多个监听器** - 同一事件可以有多个处理函数
3. **快速查找** - Map的键查找时间复杂度O(1)
4. **内存管理** - 便于精确添加/移除监听器

> listeners 是一个 Map 数据结构，存储格式如下：
>
> this.listeners = new Map([  
>
> *// 键(key): 事件类型(string)*  
>
> *// 值(value): 回调函数数组(Array<函数>)*    
>
> ['device-online', [callback1, callback2, callback3]],  
>
> ['device-offline', [callback4, callback5]],
>
>   ['device-alert', [callback6]], 
>
>  *// ...*
>
>  ])

### 🔧 事件系统实现解析

#### 1. 监听器注册机制

```js
on(eventType, callback) {
  if (!this.listeners.has(eventType)) {
    this.listeners.set(eventType, [])  // 首次注册时创建数组
  }
  this.listeners.get(eventType).push(callback)  // 添加回调到数组
}
```

**为什么这样设计：**

- **动态扩展** - 不需要预先定义所有事件类型
- **批量处理** - 同一事件的所有回调存储在数组中
- **有序执行** - 回调按添加顺序执行

#### 2. 事件触发机制

```js
emit(eventType, data) {
  if (this.listeners.has(eventType)) {
    this.listeners.get(eventType).forEach(callback => {
      try {
        callback(data)  // 执行每个回调函数
      } catch (error) {
        console.error(`事件处理器执行错误 [${eventType}]:`, error)
      }
    })
  }
}
```

**关键设计点：**

- **错误隔离** - 单个回调错误不影响其他回调
- **数据传递** - 统一的数据格式传递
- **空安全** - 检查事件类型是否存在

#### 3. 监听器移除机制

```js
off(eventType, callback) {
  if (this.listeners.has(eventType)) {
    const callbacks = this.listeners.get(eventType)
    const index = callbacks.indexOf(callback)
    if (index > -1) {
      callbacks.splice(index, 1)  // 精确移除指定回调
    }
  }
}
```

**设计优势：**

- **精确控制** - 可以移除特定的回调函数
- **内存友好** - 避免内存泄漏
- **灵活管理** - 支持临时监听和永久监听

### 🎪 实际调用方式

#### 在Vue组件中的使用示例

```js
// 在Vue组件中
import sseService from './sseService'

export default {
  mounted() {
    // 注册事件监听器 - 这才是正确的调用方式！
    sseService.on('device-online', this.handleDeviceOnline)
    sseService.on('device-offline', this.handleDeviceOffline)
    sseService.on('device-alert', this.handleDeviceAlert)
    
    // 连接SSE服务
    sseService.connect()
  },
  
  methods: {
    // 设备上线处理函数
    handleDeviceOnline(data) {
      console.log('设备上线:', data)
      this.$store.commit('UPDATE_DEVICE_STATUS', {
        deviceId: data.deviceId,
        status: 'online'
      })
    },
    
    // 设备离线处理函数  
    handleDeviceOffline(data) {
      console.log('设备离线:', data)
      this.showNotification(`设备 ${data.deviceName} 已离线`)
    },
    
    // 设备告警处理函数
    handleDeviceAlert(data) {
      console.log('设备告警:', data)
      this.triggerAlarmSound()
      this.displayAlertPopup(data)
    }
  },
  
  beforeUnmount() {
    // 组件销毁时移除监听器 - 重要！
    sseService.off('device-online', this.handleDeviceOnline)
    sseService.off('device-offline', this.handleDeviceOffline) 
    sseService.off('device-alert', this.handleDeviceAlert)
    
    // 断开SSE连接
    sseService.disconnect()
  }
}
```

#### 为什么这样调用？

**1. 分离关注点**

```js
// ❌ 错误方式：在SSE服务中硬编码业务逻辑
eventSource.addEventListener('device-online', (event) => {
  // 这里直接写UI更新逻辑，耦合度高
  updateUI()
  sendNotification()
  playSound()
})

// ✅ 正确方式：SSE服务只负责事件分发
eventSource.addEventListener('device-online', (event) => {
  const data = JSON.parse(event.data)
  this.emit('device-online', data) // 纯数据传递，无业务逻辑
})
```

**2. 支持多组件监听**

```js
// 组件A - 设备管理页面
sseService.on('device-online', (data) => {
  this.refreshDeviceList() // 刷新设备列表
})

// 组件B - 告警中心  
sseService.on('device-online', (data) => {
  this.updateStatistics() // 更新统计信息
})

// 组件C - 实时监控大屏
sseService.on('device-online', (data) => {
  this.updateDashboard(data) // 更新监控面板
})

// 所有组件都会收到同一个事件，各自处理自己的业务逻辑
```

**3. 动态事件管理**

```js
// 临时监听 - 只在特定条件下监听
const tempHandler = (data) => {
  if (data.severity === 'high') {
    this.handleCriticalAlert(data)
    // 处理完后移除监听器
    sseService.off('device-alert', tempHandler)
  }
}
sseService.on('device-alert', tempHandler)

// 条件性监听
if (this.userRole === 'admin') {
  sseService.on('statistics-update', this.handleAdminStats)
}
```

### 🔄 事件触发流程

#### 完整的事件流转

```markdown
服务器发送事件 
    ↓
EventSource接收到原始事件
    ↓  
解析事件数据 JSON.parse(event.data)
    ↓
调用 emit('event-type', parsedData)
    ↓
查找Map中对应事件类型的所有回调函数
    ↓  
按顺序执行每个回调函数
    ↓
各组件处理自己的业务逻辑
```

#### 错误处理机制

```js
emit(eventType, data) {
  if (this.listeners.has(eventType)) {
    this.listeners.get(eventType).forEach(callback => {
      try {
        callback(data) // 执行回调
      } catch (error) {
        // 关键：单个回调错误不影响其他回调
        console.error(`事件处理器执行错误 [${eventType}]:`, error)
        // 可以添加错误上报逻辑
        this.reportError(error, eventType, data)
      }
    })
  }
}
```

### 💡 设计优势总结

1. **解耦性强** - SSE服务不关心具体业务逻辑
2. **扩展性好** - 新组件可以轻松添加监听
3. **维护性高** - 事件处理逻辑分散在各组件
4. **错误隔离** - 单个监听器错误不影响整体
5. **内存安全** - 支持精确的监听器管理

这种设计让SSE服务成为一个纯粹的**事件中转站**，业务组件按需订阅感兴趣的事件，实现了完美的关注点分离。