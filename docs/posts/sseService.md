---
date: 2025-11-25
category:
  - 杂项
tag:
  - SSE
excerpt: <p><h2>介绍</h2>显然这里是封装了一个类来实现sse，其中开头的disabled是应用于全局禁用的，这个由实际环境进行配置。然后后续对类创建了全局的实例实现并进行了导出。</p>
---

# sseService.js

## 代码

这是项目中的某部分的代码，显然他只是实现基本的数据逻辑而不是具体实现，具体实现还需要调用的时候对类进行实现。

```js
/**
 * Server-Sent Events (SSE) 服务
 * 用于接收后端实时推送的设备状态变化通知
 */

class SSEService {
  constructor() {
    // 添加禁用标志
    this.disabled = import.meta.env.VITE_SSE_DISABLED === "true";

    if (this.disabled) {
      console.log("SSE服务已被禁用");
      // 初始化模拟对象，避免后续操作出错
      this.eventSource = {
        readyState: EventSource.CLOSED,
        close: () => {},
      };
      this.listeners = new Map();
      this.isConnected = false;
      this.isConnecting = false;
      return; // 直接返回，不进行后续初始化
    }

    this.eventSource = null;
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 3000; // 3秒
    this.isConnected = false;
    this.isConnecting = false; // 添加连接状态标志
    this.referenceCount = 0; // 引用计数

    // 获取SSE服务基础URL - 使用数据服务 (backend_server:8081)
    this.baseUrl = import.meta.env.VITE_SSE_BASE_URL || "http://localhost:8081";

    // 构建SSE端点URL
    // 生产环境：VITE_SSE_BASE_URL=/data-api -> /data-api/api/device/notifications/sse
    // 开发环境：VITE_SSE_BASE_URL=http://localhost:8081 -> http://localhost:8081/api/device/notifications/sse
    if (this.baseUrl.startsWith("http")) {
      // 开发环境：使用完整URL
      this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`;
    } else {
      // 生产环境：使用相对路径，通过nginx代理
      this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`;
    }

    // 监听页面卸载事件，确保连接被正确关闭
    this.setupPageUnloadHandler();

    // 启动连接状态监控
    this.startConnectionMonitor();
  }

  /**
   * 增加引用计数并连接到SSE服务
   */
  connect() {
    // 在方法开头添加检查，如果已经屏蔽服务则直接返回
    if (this.disabled) {
      console.log("SSE已禁用，跳过连接");
      return Promise.resolve();
    }

    this.referenceCount++;
    console.log(`SSE服务引用计数: ${this.referenceCount}`);

    // 如果已经连接或正在连接，则不重复连接
    if (this.isConnected || this.isConnecting) {
      console.log("SSE连接已存在或正在连接中，跳过重复连接");
      return Promise.resolve();
    }

    // 如果存在旧连接，先断开
    if (
      this.eventSource &&
      this.eventSource.readyState !== EventSource.CLOSED
    ) {
      console.log("断开现有SSE连接");
      this.disconnect();
    }

    return new Promise((resolve, reject) => {
      try {
        this.isConnecting = true;

        // 创建EventSource连接
        console.log("正在连接SSE服务:", this.sseEndpoint);
        console.log(
          "环境变量 VITE_SSE_BASE_URL:",
          import.meta.env.VITE_SSE_BASE_URL
        );
        console.log("当前环境:", import.meta.env.MODE);

        // 创建EventSource时不设置额外的配置
        this.eventSource = new EventSource(this.sseEndpoint);

        // 设置连接超时 - 生产环境需要更长的超时时间
        const connectionTimeout = setTimeout(() => {
          if (this.isConnecting && !this.isConnected) {
            console.error("SSE连接超时，关闭连接并重试");
            this.eventSource.close();
            this.isConnecting = false;
            reject(new Error("SSE连接超时"));
          }
        }, 120000); // 30秒超时，适应生产环境的网络延迟

        // 连接成功事件 - 服务器发送的确认消息
        this.eventSource.addEventListener("connected", (event) => {
          console.log("SSE连接成功:", event.data);
          console.log("连接状态:", this.eventSource.readyState);

          // 只有在readyState为OPEN(1)时才确认连接成功
          if (this.eventSource.readyState === EventSource.OPEN) {
            this.isConnected = true;
            this.isConnecting = false;
            this.reconnectAttempts = 0;
            clearTimeout(connectionTimeout); // 清除连接超时
            this.emit("connected", event.data);
            resolve();
          } else {
            console.warn(
              "收到connected事件但连接状态不是OPEN:",
              this.eventSource.readyState
            );
          }
        });

        // 设备注册事件
        this.eventSource.addEventListener("device-registered", (event) => {
          console.log("=== SSE收到设备注册事件 ===");
          console.log("原始事件数据:", event);
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的注册通知数据:", data);
            this.emit("device-registered", data);
            console.log("设备注册事件已触发");
          } catch (error) {
            console.error("解析设备注册事件数据失败:", error);
          }
        });

        // 设备上线事件
        this.eventSource.addEventListener("device-online", (event) => {
          console.log("=== SSE收到设备上线事件 ===");
          console.log("原始事件数据:", event);
          console.log("事件数据内容:", event.data);
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的上线通知数据:", data);
            this.emit("device-online", data);
            console.log("设备上线事件已触发");
          } catch (error) {
            console.error("解析设备上线事件数据失败:", error);
          }
        });

        // 设备离线事件
        this.eventSource.addEventListener("device-offline", (event) => {
          console.log("=== SSE收到设备离线事件 ===");
          console.log("原始事件数据:", event);
          console.log("事件数据内容:", event.data);
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的离线通知数据:", data);
            this.emit("device-offline", data);
            console.log("设备离线事件已触发");
          } catch (error) {
            console.error("解析设备离线事件数据失败:", error);
          }
        });

        // 设备告警事件
        this.eventSource.addEventListener("device-alert", (event) => {
          console.log("=== SSE收到设备告警事件 ===");
          console.log("原始事件数据:", event);
          console.log("事件数据内容:", event.data);
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的告警通知数据:", data);
            this.emit("device-alert", data);
            console.log("设备告警事件已触发");
          } catch (error) {
            console.error("解析设备告警事件数据失败:", error);
          }
        });

        // 统计信息更新事件
        this.eventSource.addEventListener("statistics-update", (event) => {
          console.log("=== SSE收到统计信息更新事件 ===");
          console.log("原始事件数据:", event);
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的统计信息数据:", data);
            this.emit("statistics-update", data);
            console.log("统计信息更新事件已触发");
          } catch (error) {
            console.error("解析统计信息事件数据失败:", error);
          }
        });

        // 连接打开事件
        this.eventSource.onopen = (event) => {
          console.log("=== SSE连接已打开 ===");
          console.log("连接事件:", event);
          console.log("连接状态:", this.eventSource.readyState);
          console.log("连接URL:", this.eventSource.url);

          // 注意：onopen事件触发时，readyState可能仍然是CONNECTING(0)
          // 真正的连接确认应该等待第一个消息（如connected事件）
          console.log("连接通道已打开，等待服务器确认...");

          // 发送连接打开的自定义事件
          this.emit("connection-opened", {
            url: this.eventSource.url,
            readyState: this.eventSource.readyState,
          });
        };

        // 通用消息监听器 - 捕获所有SSE消息
        this.eventSource.onmessage = (event) => {
          // 某些代理会把具名事件降级为默认message事件，这里做容错分发
          if (event && typeof event.data === "string") {
            // 心跳消息快捷处理，避免刷屏
            if (event.data === "ping") {
              return;
            }
          }
          console.log("=== SSE收到通用消息 ===");
          console.log("消息事件:", event);
          console.log("消息类型:", event.type);
          console.log("消息数据:", event.data);
          console.log("消息来源:", event.origin);
          console.log("消息ID:", event.lastEventId);
        };

        // 显式监听心跳，便于诊断但不干扰界面
        this.eventSource.addEventListener("heartbeat", () => {
          // 静默处理，确认链路存活
        });

        // 连接错误事件
        this.eventSource.onerror = (event) => {
          console.error("=== SSE连接错误 ===");
          console.error("错误事件:", event);
          console.error("连接状态:", this.eventSource.readyState);
          console.error("连接URL:", this.sseEndpoint);

          // 根据连接状态决定处理方式
          if (this.eventSource.readyState === EventSource.CLOSED) {
            console.log("连接已关闭，标记为断开状态");
            this.isConnected = false;
            this.isConnecting = false;
            // 延迟重连，避免立即重连导致的问题
            setTimeout(() => {
              this.handleReconnect();
            }, 2000);
            reject(new Error("SSE连接已关闭"));
          } else if (this.eventSource.readyState === EventSource.CONNECTING) {
            console.log(
              "连接正在建立中，可能是正常的连接过程，等待连接完成..."
            );
            // 在CONNECTING状态下的error事件可能是正常的，不立即处理
            // 等待连接完成或真正失败
          } else if (this.eventSource.readyState === EventSource.OPEN) {
            console.log("连接已打开但出现错误，可能是临时网络问题");
            // 连接仍然打开，可能是临时问题，不立即重连
          } else {
            console.log("未知连接状态，延迟重连...");
            this.isConnected = false;
            this.isConnecting = false;
            setTimeout(() => {
              this.handleReconnect();
            }, 3000);
          }
        };
      } catch (error) {
        console.error("创建SSE连接失败:", error);
        this.isConnecting = false;
        this.handleReconnect();
        reject(error);
      }
    });
  }

  /**
   * 处理重连逻辑
   */
  handleReconnect() {
    // 如果正在连接中，不重复重连
    if (this.isConnecting) {
      console.log("SSE正在连接中，跳过重连");
      return;
    }

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("SSE重连次数超过限制，停止重连");
      this.emit("max-reconnect-reached");
      return;
    }

    this.reconnectAttempts++;
    console.log(
      `SSE重连尝试 ${this.reconnectAttempts}/${this.maxReconnectAttempts}`
    );

    // 先断开现有连接，但不减少引用计数
    if (this.eventSource) {
      try {
        this.eventSource.close();
      } catch (e) {
        console.warn("关闭现有SSE连接时出错:", e.message);
      }
      this.eventSource = null;
    }

    // 指数退避重连策略，但限制最大延迟
    const baseDelay = Math.min(
      this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1),
      30000
    );
    console.log(`${baseDelay}ms 后开始重连...`);

    setTimeout(() => {
      console.log("开始执行SSE重连...");
      this.connect().catch((error) => {
        console.error("SSE重连失败:", error);
        // 如果重连失败，等待更长时间再尝试
        setTimeout(() => this.handleReconnect(), 5000);
      });
    }, baseDelay);
  }

  /**
   * 减少引用计数并断开SSE连接
   */
  disconnect() {
    if (this.referenceCount > 0) {
      this.referenceCount--;
    }
    console.log(`SSE服务引用计数: ${this.referenceCount}`);

    // 只有在引用计数为0时才真正断开连接
    if (this.referenceCount <= 0 && this.eventSource) {
      console.log("引用计数为0，正在断开SSE连接...");
      this.eventSource.close();
      this.eventSource = null;
      this.isConnected = false;
      this.isConnecting = false;
      this.referenceCount = 0; // 确保不为负数
      console.log("SSE连接已断开");
    } else if (this.referenceCount > 0) {
      console.log(`还有 ${this.referenceCount} 个引用，保持SSE连接`);
    }
  }

  /**
   * 添加事件监听器
   */
  on(eventType, callback) {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType).push(callback);
  }

  /**
   * 移除事件监听器
   */
  off(eventType, callback) {
    if (this.listeners.has(eventType)) {
      const callbacks = this.listeners.get(eventType);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * 触发事件
   */
  emit(eventType, data) {
    if (this.listeners.has(eventType)) {
      this.listeners.get(eventType).forEach((callback) => {
        try {
          callback(data);
        } catch (error) {
          console.error(`事件处理器执行错误 [${eventType}]:`, error);
        }
      });
    }
  }

  /**
   * 获取连接状态
   */
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      isConnecting: this.isConnecting,
      readyState: this.eventSource
        ? this.eventSource.readyState
        : EventSource.CLOSED,
      reconnectAttempts: this.reconnectAttempts,
    };
  }

  /**
   * 设置页面卸载处理器
   */
  setupPageUnloadHandler() {
    // 监听页面刷新和关闭事件
    window.addEventListener("beforeunload", () => {
      console.log("页面即将卸载，断开SSE连接");
      this.disconnect();
    });

    // 监听页面隐藏事件（切换标签页等）
    // 暂时禁用页面可见性监听，避免重连问题
    /*
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        console.log('页面隐藏，保持SSE连接')
        // 不断开连接，只是记录状态
      } else {
        console.log('页面显示，检查SSE连接状态')
        // 如果连接断开了，尝试重连
        if (!this.isConnected && !this.isConnecting) {
          console.log('页面显示时发现连接断开，重新连接SSE')
          this.connect().catch(error => {
            console.error('页面显示时重连失败:', error)
          })
        }
      }
    })
    */
  }

  /**
   * 强制重新连接
   */
  forceReconnect() {
    console.log("强制重新连接SSE");
    this.disconnect();
    this.reconnectAttempts = 0;
    return this.connect();
  }

  /**
   * 启动连接状态监控
   */
  startConnectionMonitor() {
    // 每30秒检查一次连接状态
    setInterval(() => {
      if (this.eventSource) {
        console.log("SSE连接状态检查:", {
          readyState: this.eventSource.readyState,
          isConnected: this.isConnected,
          isConnecting: this.isConnecting,
          reconnectAttempts: this.reconnectAttempts,
          url: this.eventSource.url,
        });

        // 如果连接状态异常，尝试重连
        if (
          this.eventSource.readyState === EventSource.CLOSED &&
          !this.isConnecting
        ) {
          console.warn("检测到SSE连接已关闭，尝试重连...");
          this.handleReconnect();
        }
      } else if (!this.isConnecting) {
        console.warn("检测到SSE连接对象不存在，尝试重连...");
        this.connect().catch((error) => {
          console.error("监控重连失败:", error);
        });
      }
    }, 30000); // 30秒检查一次
  }
}

// 创建全局单例实例
let sseServiceInstance = null;

const getSseService = () => {
  if (!sseServiceInstance) {
    console.log("创建新的SSE服务实例");
    sseServiceInstance = new SSEService();
  } else {
    console.log("使用现有的SSE服务实例");
  }
  return sseServiceInstance;
};

// 导出单例实例
const sseService = getSseService();

export default sseService;
```
