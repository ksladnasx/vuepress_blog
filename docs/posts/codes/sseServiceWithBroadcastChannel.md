---
date: 2025-11-27
category:
  - code
tag:
  - BroadcastChannel
  - SSE
excerpt: <p><h2>介绍</h2>这里是最后突破了sse连接数限制的源代码，应用了BoradcastChannel的主从模式进行突破。当然主标签页的选举逻辑是先到先得，最先进行加载的标签页为主标签页。若主标签页被删除或者刷新，会进行重新选举。LocalStorage中始终存储了已有标签页的id数组以及主标签页的id以及最大id的值，便于快速为新标签页添加id和快速的选举。同时也包含了主标签页的心跳检测机制，每30秒检查主标签页状态，发送ping消息后立即设置五秒的定时器，主标签页收到后回复pong，如果主标签页成功回复会自动清除定时器，如果回复超时进行重新选举。</p>
---

# sseService源代码（BroadcastChannel版）

相关文章：

[BroadcastChannel方式解决sse连接数限制](../sse/BroadcastChannel方式解决sse连接数限制.md)

[BroadcastChannel版本sse文件解读.md](../sse/BroadcastChannel版本sse解读.md)

## 代码

```js
/**
 * Server-Sent Events (SSE) 服务
 * 用于接收后端实时推送的设备状态变化通知
 * 集成了BroadcastChannel主从模式以突破连接限制
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

    // 主从模式相关属性（这里注意初始化顺序）
    this.isMaster = false;
    // 第一步：先定义本地存储的键名
    this.masterKey = "sse-master-tab-id";
    this.tabCounterKey = "sse-tab-counter"; // 先在调用 assignTabId() 之前定义
    this.activeTabsKey = "sse-active-tabs";
    // 第二步：再分配 tabId（此时 tabCounterKey 已被正确初始化）
    this.tabId = this.assignTabId();
    this.tabInstanceId = `${this.tabId}-${Date.now()}`;
    this.broadcastChannel = new BroadcastChannel("sse-broadcast-channel");
    this.electionInProgress = false;
    this.refreshTimeout = null;

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
    if (this.baseUrl.startsWith("http")) {
      // 开发环境：使用完整URL
      this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`;
    } else {
      // 生产环境：使用相对路径，通过nginx代理
      this.sseEndpoint = `${this.baseUrl}/api/device/notifications/sse`;
    }

    // 注册当前标签页为活跃状态
    this.registerActiveTab();

    // 初始化主从模式
    this.initMasterSlaveMode();

    // 监听页面卸载事件，确保连接被正确关闭
    this.setupPageUnloadHandler();

    // 启动连接状态监控
    this.startConnectionMonitor();

    // 启动活跃标签页监控
    this.startActiveTabsMonitor();
  }

  /**
   * 按顺序分配标签页ID（tab-1, tab-2, tab-3...）
   * 错误逻辑：新建页面后，最新分配给这个标签页的ID最大，应该是与新建页面后的标签页数一样的值
   * 错误原因：按错误逻辑，若有id为1和2的两个页面，当刷新id为1的页面时，原来的id为1的页面会被移除，新刷新的页面计数器会变成2，导致原来id为2页面和刷新后的页面id冲突
   * 解决：应该使用一个单独的计数器键名，不依赖原本的活跃标签页数量
   */
  assignTabId() {
    try {
      // 获取当前计数器值
      let counter = parseInt(localStorage.getItem(this.tabCounterKey) || "0");

      // 如果是NaN或0，初始化为1
      if (isNaN(counter) || counter <= 0) {
        counter = 1;
      } else {
        counter++;
      }

      // 保存新的计数器值
      localStorage.setItem(this.tabCounterKey, counter.toString());
      console.log(`分配新的标签页计数器: ${counter}`);
      const tabId = `tab-${counter}`;
      console.log(`当前标签页ID: ${tabId}`);
      return tabId;
    } catch (error) {
      console.error("分配标签页ID失败，使用备用ID:", error);
      return `tab-fallback-${Date.now()}`;
    }
  }

  /**
   * 注册当前标签页为活跃状态
   */
  registerActiveTab() {
    try {
      const activeTabs = JSON.parse(
        localStorage.getItem(this.activeTabsKey) || "[]"
      );

      // 添加当前标签页
      if (!activeTabs.some((tab) => tab.instanceId === this.tabInstanceId)) {
        activeTabs.push({
          tabId: this.tabId,
          instanceId: this.tabInstanceId,
          timestamp: Date.now(),
        });
        localStorage.setItem(this.activeTabsKey, JSON.stringify(activeTabs));
      }

      console.log(`注册活跃标签页: ${this.tabId} (${this.tabInstanceId})`);
    } catch (error) {
      console.error("注册活跃标签页失败:", error);
    }
  }

  /**
   * 移除当前标签页的活跃状态
   */
  unregisterActiveTab() {
    try {
      const activeTabs = JSON.parse(
        localStorage.getItem(this.activeTabsKey) || "[]"
      );
      const updatedTabs = activeTabs.filter(
        (tab) => tab.instanceId !== this.tabInstanceId
      );
      localStorage.setItem(this.activeTabsKey, JSON.stringify(updatedTabs));

      console.log(`移除活跃标签页: ${this.tabId} (${this.tabInstanceId})`);

      // 如果没有活跃标签页了，重置计数器
      if (updatedTabs.length === 0) {
        localStorage.removeItem(this.tabCounterKey);
        localStorage.removeItem(this.masterKey);
        console.log("已无活跃标签页，重置计数器和主标签页标识");
      }
    } catch (error) {
      console.error("移除活跃标签页失败:", error);
    }
  }

  /**
   * 清理过期的标签页记录
   */
  cleanExpiredTabs() {
    try {
      const activeTabs = JSON.parse(
        localStorage.getItem(this.activeTabsKey) || "[]"
      );
      const now = Date.now();
      const FIVE_MINUTES = 5 * 60 * 1000;

      // 移除5分钟前的过期标签页
      const validTabs = activeTabs.filter(
        (tab) => now - tab.timestamp < FIVE_MINUTES
      );

      if (validTabs.length !== activeTabs.length) {
        localStorage.setItem(this.activeTabsKey, JSON.stringify(validTabs));
        console.log(
          `清理了 ${activeTabs.length - validTabs.length} 个过期标签页`
        );
      }

      return validTabs;
    } catch (error) {
      console.error("清理过期标签页失败:", error);
      return [];
    }
  }

  /**
   * 初始化主从模式
   */
  initMasterSlaveMode() {
    // 监听BroadcastChannel消息
    this.broadcastChannel.onmessage = (event) => {
      const { type, data, tabId, instanceId } = event.data;

      // 忽略自己发送的消息
      if (instanceId === this.tabInstanceId) return;

      switch (type) {
        case "master-announcement":
          console.log(`收到主标签页宣告: ${data.tabId} (${data.instanceId})`);
          this.isMaster = false;
          break;

        case "sse-message":
          // 从主标签页接收SSE消息并触发事件
          this.emit(data.eventType, data.payload);
          break;

        case "master-disconnected":
          console.log(`主标签页 ${tabId} 已断开连接，准备重新选举`);
          // 短暂延迟确保所有标签页都收到通知
          setTimeout(() => {
            if (!this.isMaster) {
              this.electionMaster();
            }
          }, 500);
          break;

          //这里是主标签页接收到ping消息后的处理逻辑，回复pong消息
        case "ping":
          // 响应心跳检查
          this.broadcastChannel.postMessage({
            type: "pong",
            tabId: this.tabId,
            instanceId: this.tabInstanceId,
          });
          break;

          // 处理主标签页的心跳响应的pong消息
        case "pong":
          const currentMasterInstanceId = localStorage.getItem(this.masterKey);
          if (instanceId === currentMasterInstanceId) {
            console.log(`主标签页心跳：收到主标签页 ${tabId} 的pong响应，清除超时器`);
            if (this.refreshTimeout) {
              clearTimeout(this.refreshTimeout);
              this.refreshTimeout = null; // 清空超时器引用
            }
          }
          break;
      }
    };

    // 监听localStorage变化
    window.addEventListener("storage", (event) => {
      if (event.key === this.masterKey) {
        const newMasterId = event.newValue;
        const oldMasterId = event.oldValue;

        if (!newMasterId && oldMasterId && !this.isMaster) {
          // 主标签页标识被清除且当前不是主标签页，触发重新选举
          console.log("检测到主标签页标识已移除，准备重新选举");
          setTimeout(() => this.electionMaster(), 1000);
        } else if (newMasterId && newMasterId !== this.tabInstanceId) {
          // 有新的主标签页当选
          console.log(`新的主标签页当选: ${newMasterId}`);
          this.isMaster = false;
        }
      }
    });

    // 页面刷新时的处理（beforeunload可能不触发）
    window.addEventListener("unload", () => {
      this.handleTabUnload();
    });

    // 尝试选举为主标签页
    this.electionMaster();
  }

  /**
   * 选举主标签页（按标签页ID顺序，最小的ID优先）
   */
  electionMaster() {
    if (this.electionInProgress) return;
    this.electionInProgress = true;

    console.log(`标签页 ${this.tabId} 参与主标签页选举`);

    try {
      // 先清理过期标签页
      const validTabs = this.cleanExpiredTabs();

      // 获取当前主标签页
      const currentMasterInstanceId = localStorage.getItem(this.masterKey);

      if (currentMasterInstanceId) {
        // 检查当前主标签页是否还活跃
        const masterIsActive = validTabs.some(
          (tab) => tab.instanceId === currentMasterInstanceId
        );

        if (masterIsActive) {
          // 主标签页仍活跃
          this.isMaster = currentMasterInstanceId === this.tabInstanceId;
          console.log(
            `主标签页 ${currentMasterInstanceId} 仍活跃，当前标签页${
              this.tabId
            } ${this.isMaster ? "是主标签页" : "是从标签页"}`
          );
          this.electionInProgress = false;
          return;
        } else {
          // 主标签页已失效，清除标识
          localStorage.removeItem(this.masterKey);
          console.log(`主标签页 ${currentMasterInstanceId} 已失效，清除标识`);
        }
      }

      // 按标签页ID排序，选择最小的ID作为主标签页
      validTabs.sort((a, b) => {
        const numA = parseInt(a.tabId.replace("tab-", ""));
        const numB = parseInt(b.tabId.replace("tab-", ""));
        return numA - numB;
      });

      if (validTabs.length > 0) {
        const firstTab = validTabs[0];

        if (firstTab.instanceId === this.tabInstanceId) {
          // 当前标签页ID最小，当选为主标签页
          localStorage.setItem(this.masterKey, this.tabInstanceId);
          this.isMaster = true;
          console.log(`标签页 ${this.tabId} 当选为主标签页（ID最小）`);

          // 向其他标签页宣告自己成为主标签页
          this.broadcastChannel.postMessage({
            type: "master-announcement",
            tabId: this.tabId,
            instanceId: this.tabInstanceId,
            data: { tabId: this.tabId, instanceId: this.tabInstanceId },
          });

          // 如果还没连接，建立SSE连接
          if (!this.isConnected && !this.isConnecting) {
            this.connect();
          }
        } else {
          // 有更小的ID存在
          this.isMaster = false;
          console.log(`标签页 ${firstTab.tabId} ID更小，将成为主标签页`);

          // 等待主标签页宣告
          setTimeout(() => {
            if (!this.isMaster) {
              const masterInstanceId = localStorage.getItem(this.masterKey);
              this.isMaster = masterInstanceId === this.tabInstanceId;
            }
          }, 2000);
        }
      }
    } catch (error) {
      console.error("主标签页选举出错:", error);
    } finally {
      this.electionInProgress = false;
    }
  }

  /**
   * 处理标签页卸载
   */
  handleTabUnload() {
    // 如果是主标签页，通知其他标签页
    if (this.isMaster) {
      console.log(`主标签页 ${this.tabId} 正在卸载，通知其他标签页重新选举`);
      try {
        this.broadcastChannel.postMessage({
          type: "master-disconnected",
          tabId: this.tabId,
          instanceId: this.tabInstanceId,
        });

        // 清除主标签页标识
        const currentMasterId = localStorage.getItem(this.masterKey);
        if (currentMasterId === this.tabInstanceId) {
          localStorage.removeItem(this.masterKey);
        }
      } catch (error) {
        console.error("通知主标签页断开失败:", error);
      }
    }

    // 移除活跃标签页记录
    this.unregisterActiveTab();

    // 断开连接和清理资源
    this.disconnect();
    try {
      this.broadcastChannel.close();
    } catch (error) {
      // 忽略关闭错误
    }
  }

  /**
   * 广播SSE消息到所有从标签页
   */
  broadcastSSEMessage(eventType, payload) {
    if (!this.isMaster) return;

    try {
      this.broadcastChannel.postMessage({
        type: "sse-message",
        tabId: this.tabId,
        instanceId: this.tabInstanceId,
        data: {
          eventType,
          payload,
        },
      });
    } catch (error) {
      console.error("广播SSE消息失败:", error);
    }
  }

  /**
   * 增加引用计数并连接到SSE服务（仅主标签页）
   */
  connect() {
    // 在方法开头添加检查，如果已经屏蔽服务则直接返回
    if (this.disabled) {
      console.log("SSE已禁用，跳过连接");
      return Promise.resolve();
    }

    // 从标签页不直接连接SSE
    if (!this.isMaster) {
      console.log(`标签页 ${this.tabId} 是从标签页，不直接连接SSE`);
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
        console.log(
          `主标签页 ${this.tabId} 正在连接SSE服务:`,
          this.sseEndpoint
        );
        console.log(
          "环境变量 VITE_SSE_BASE_URL:",
          import.meta.env.VITE_SSE_BASE_URL
        );
        console.log("当前环境:", import.meta.env.MODE);

        this.eventSource = new EventSource(this.sseEndpoint);

        // 设置连接超时
        const connectionTimeout = setTimeout(() => {
          if (this.isConnecting && !this.isConnected) {
            console.error("SSE连接超时，关闭连接并重试");
            this.eventSource.close();
            this.isConnecting = false;
            reject(new Error("SSE连接超时"));
          }
        }, 120000); // 2分钟超时

        // 连接成功事件
        this.eventSource.addEventListener("connected", (event) => {
          console.log("SSE连接成功:", event.data);

          if (this.eventSource.readyState === EventSource.OPEN) {
            this.isConnected = true;
            this.isConnecting = false;
            this.reconnectAttempts = 0;
            clearTimeout(connectionTimeout);
            this.emit("connected", event.data);
            // 广播连接成功事件
            this.broadcastSSEMessage("connected", event.data);
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
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的注册通知数据:", data);
            this.emit("device-registered", data);
            // 广播事件到从标签页
            this.broadcastSSEMessage("device-registered", data);
          } catch (error) {
            console.error("解析设备注册事件数据失败:", error);
          }
        });

        // 设备上线事件
        this.eventSource.addEventListener("device-online", (event) => {
          console.log("=== SSE收到设备上线事件 ===");
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的上线通知数据:", data);
            this.emit("device-online", data);
            // 广播事件到从标签页
            this.broadcastSSEMessage("device-online", data);
          } catch (error) {
            console.error("解析设备上线事件数据失败:", error);
          }
        });

        // 设备离线事件
        this.eventSource.addEventListener("device-offline", (event) => {
          console.log("=== SSE收到设备离线事件 ===");
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的离线通知数据:", data);
            this.emit("device-offline", data);
            // 广播事件到从标签页
            this.broadcastSSEMessage("device-offline", data);
          } catch (error) {
            console.error("解析设备离线事件数据失败:", error);
          }
        });

        // 设备告警事件
        this.eventSource.addEventListener("device-alert", (event) => {
          console.log("=== SSE收到设备告警事件 ===");
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的告警通知数据:", data);
            this.emit("device-alert", data);
            // 广播事件到从标签页
            this.broadcastSSEMessage("device-alert", data);
          } catch (error) {
            console.error("解析设备告警事件数据失败:", error);
          }
        });

        // 统计信息更新事件
        this.eventSource.addEventListener("statistics-update", (event) => {
          console.log("=== SSE收到统计信息更新事件 ===");
          try {
            const data = JSON.parse(event.data);
            console.log("解析后的统计信息数据:", data);
            this.emit("statistics-update", data);
            // 广播事件到从标签页
            this.broadcastSSEMessage("statistics-update", data);
          } catch (error) {
            console.error("解析统计信息事件数据失败:", error);
          }
        });

        // 连接打开事件
        this.eventSource.onopen = (event) => {
          console.log("=== SSE连接已打开 ===");
          this.emit("connection-opened", {
            url: this.eventSource.url,
            readyState: this.eventSource.readyState,
          });
          this.broadcastSSEMessage("connection-opened", {
            url: this.eventSource.url,
            readyState: this.eventSource.readyState,
          });
        };

        // 通用消息监听器
        this.eventSource.onmessage = (event) => {
          if (
            event &&
            typeof event.data === "string" &&
            event.data === "ping"
          ) {
            return;
          }
          console.log("=== SSE收到通用消息 ===");
          this.emit("message", event.data);
          this.broadcastSSEMessage("message", event.data);
        };

        // 显式监听心跳
        this.eventSource.addEventListener("heartbeat", () => {
          // 静默处理，确认链路存活
        });

        // 连接错误事件
        this.eventSource.onerror = (event) => {
          console.error("=== SSE连接错误 ===");
          console.error("错误事件:", event);
          console.error("连接状态:", this.eventSource.readyState);
          console.error("连接URL:", this.sseEndpoint);

          // 广播错误事件
          this.broadcastSSEMessage("error", {
            message: "SSE连接错误",
            readyState: this.eventSource.readyState,
          });

          // 根据连接状态决定处理方式
          if (this.eventSource.readyState === EventSource.CLOSED) {
            console.log("连接已关闭，标记为断开状态");
            this.isConnected = false;
            this.isConnecting = false;
            setTimeout(() => {
              this.handleReconnect();
            }, 2000);
            reject(new Error("SSE连接已关闭"));
          } else if (this.eventSource.readyState === EventSource.CONNECTING) {
            console.log("连接正在建立中，可能是正常的连接过程");
          } else if (this.eventSource.readyState === EventSource.OPEN) {
            console.log("连接已打开但出现错误，可能是临时网络问题");
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
   * 处理重连逻辑（仅主标签页）
   */
  handleReconnect() {
    // 从标签页不处理重连
    if (!this.isMaster) return;

    // 如果正在连接中，不重复重连
    if (this.isConnecting) {
      console.log("SSE正在连接中，跳过重连");
      return;
    }

    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("SSE重连次数超过限制，停止重连");
      this.emit("max-reconnect-reached");
      this.broadcastSSEMessage("max-reconnect-reached", null);
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

    // 指数退避重连策略
    const baseDelay = Math.min(
      this.reconnectInterval * Math.pow(2, this.reconnectAttempts - 1),
      30000
    );
    console.log(`${baseDelay}ms 后开始重连...`);

    setTimeout(() => {
      console.log("开始执行SSE重连...");
      this.connect().catch((error) => {
        console.error("SSE重连失败:", error);
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

    // 只有主标签页且引用计数为0时才真正断开连接
    if (this.isMaster && this.referenceCount <= 0 && this.eventSource) {
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
      tabId: this.tabId,
      instanceId: this.tabInstanceId,
      isMaster: this.isMaster,
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
      console.log(`标签页 ${this.tabId} 即将卸载，清理SSE相关资源`);
      this.handleTabUnload();
    });
  }

  /**
   * 启动活跃标签页监控
   * 这里会定期更新当前标签页的时间戳，标记为活跃。如果当前标签页的时间戳过期，其他标签页会认为它已不活跃，从而触发主标签页重新选举。
   */
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
    }, 60000); // 每分钟更新一次

    // 定期检查主标签页状态
    setInterval(() => {
      if (!this.isMaster) {
        const currentMasterInstanceId = localStorage.getItem(this.masterKey);

        if (!currentMasterInstanceId) {
          console.log("检测到主标签页不存在，触发重新选举");
          this.electionMaster();
        } else {
          // 发送心跳检查主标签页是否存活
          this.broadcastChannel.postMessage({
            type: "ping",
            tabId: this.tabId,
            instanceId: this.tabInstanceId,
          });
          //发送ping后，先清除已有的超时定时器，然后立即设置一个 5 秒的定时器refreshTimeout。
          // 这个定时器的作用是：如果 5 秒内没收到主标签页的pong响应，就认为主标签页已崩溃 / 关闭 / 失去响应。则重新选举
          if (this.refreshTimeout) clearTimeout(this.refreshTimeout);
          this.refreshTimeout = setTimeout(() => {
            console.log("主标签页心跳超时，触发重新选举");
            this.electionMaster();
          }, 5000);
        }
      }
    }, 30000); // 每30秒检查一次
  }

  /**
   * 启动连接状态监控
   */
  startConnectionMonitor() {
    // 每30秒检查一次连接状态
    setInterval(() => {
      // 主标签页检查连接状态
      if (this.isMaster) {
        if (this.eventSource) {
          console.log(`主标签页 ${this.tabId} SSE连接状态检查:`, {
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
      }
    }, 30000); // 30秒检查一次
  }

  /**
   * 强制重新连接（仅主标签页）
   */
  forceReconnect() {
    if (!this.isMaster) {
      console.log(`从标签页 ${this.tabId} 不执行强制重连，将触发主标签页重连`);
      this.broadcastChannel.postMessage({
        type: "force-reconnect",
        tabId: this.tabId,
        instanceId: this.tabInstanceId,
      });
      return Promise.resolve();
    }

    console.log(`主标签页 ${this.tabId} 强制重新连接SSE`);
    this.disconnect();
    this.reconnectAttempts = 0;
    return this.connect();
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





