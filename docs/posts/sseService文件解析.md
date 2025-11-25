---
date: 2025-11-25
category:
  - 说明文档
tag:
  - SSE
---

# SSE服务代码解读

完整代码地址：[sseService.js](./sseService.md)

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

### 1. 引用计数管理

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

### 2. 智能重连策略

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

### 3. 完整的事件生命周期管理

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

### 环境自适应URL构建

```js
// 开发环境：完整URL
// 生产环境：相对路径（通过nginx代理）
if (this.baseUrl.startsWith('http')) {
  this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`
} else {
  this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`
}
```

### 连接超时控制

```js
const connectionTimeout = setTimeout(() => {
  if (this.isConnecting && !this.isConnected) {
    reject(new Error('SSE连接超时'))
  }
}, 120000) // 2分钟超时，适应生产环境
```

## 🛡️ 健壮性设计

### 错误处理与恢复

```js
eventSource.onerror = (event) => {
  // 根据readyState采取不同策略
  if (this.eventSource.readyState === EventSource.CLOSED) {
    this.handleReconnect() // 连接关闭时重连
  }
  // CONNECTING/OPEN状态下的错误有不同处理逻辑
}
```

### 资源清理机制

```js
setupPageUnloadHandler() {
  window.addEventListener('beforeunload', () => {
    this.disconnect() // 页面卸载时自动清理
  })
}
```

## 📊 监控与诊断

### 连接状态监控

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

### 详细的日志记录

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

# SSE服务事件监听器详解

## 🎯 事件监听器设计原理

### 为什么使用 `Map`存储监听器？

```js
this.listeners = new Map()
```

**设计原因：**

1. **事件类型作为键** - 每个事件类型(`device-online`, `device-offline`等)对应一个回调函数数组
2. **支持多个监听器** - 同一事件可以有多个处理函数
3. **快速查找** - Map的键查找时间复杂度O(1)
4. **内存管理** - 便于精确添加/移除监听器

## 🔧 事件系统实现解析

### 1. 监听器注册机制

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

### 2. 事件触发机制

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

### 3. 监听器移除机制

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

## 🎪 实际调用方式

### 在Vue组件中的使用示例

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

### 为什么这样调用？

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

## 🔄 事件触发流程

### 完整的事件流转

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

### 错误处理机制

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

## 💡 设计优势总结

1. **解耦性强** - SSE服务不关心具体业务逻辑
2. **扩展性好** - 新组件可以轻松添加监听
3. **维护性高** - 事件处理逻辑分散在各组件
4. **错误隔离** - 单个监听器错误不影响整体
5. **内存安全** - 支持精确的监听器管理

这种设计让SSE服务成为一个纯粹的**事件中转站**，业务组件按需订阅感兴趣的事件，实现了完美的关注点分离。