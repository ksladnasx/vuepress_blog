---
date: 2026-10-12
category:
  - 前端面试
tag:
  - 面试题
  - Node.js
---

# Node.js知识点

> 说明：本文档为前端面试题系列第12章，涵盖Node.js基础概念、事件循环、核心模块（fs、path、http、Buffer、Stream）、进程管理、框架（Express/Koa）、工程化等核心知识点。共18题，所有答案均为原创整理，可直接用于面试回答。持续更新......

## 第一章：Node.js 基础与概念

### 1.1 Node.js 是什么？有什么特点？

**面试回答（直接背）：**

Node.js 是一个基于 **Chrome V8 引擎**的 **JavaScript 运行时环境**，让 JavaScript 可以在服务端运行。

Node.js 的核心特点有三个：

**第一，非阻塞 I/O**。Node.js 所有 I/O 操作（文件读写、网络请求、数据库查询）都是异步非阻塞的，不会等待 I/O 完成再执行后续代码，而是通过回调函数在完成后通知。这使 Node.js 能高效处理大量并发请求。

**第二，事件驱动**。Node.js 基于事件循环（Event Loop）处理异步操作。当异步操作完成时，触发对应的事件，执行回调。所有 I/O 操作都通过事件机制调度。

**第三，单线程**。Node.js 主线程是单线程的，但底层 I/O 操作由 libuv 线程池处理。单线程避免了多线程编程的复杂性和资源竞争，但 CPU 密集型任务会阻塞主线程。

Node.js 适合 **I/O 密集型** 应用（API 服务、实时通信），不适合 **CPU 密集型** 应用（图像处理、大量计算）。

**核心要点（快速回忆）：**

+ **本质**：V8 引擎的 JavaScript 运行时
+ **特点**：非阻塞 I/O + 事件驱动 + 单线程
+ **适用**：I/O 密集型（API、实时通信）
+ **不适用**：CPU 密集型（计算、图像处理）



### 1.2 Node.js 的事件循环和浏览器有什么区别？

**面试回答（直接背）：**

Node.js 和浏览器的事件循环有相同点也有不同点：

**相同点**：都是基于事件循环的异步模型，都有宏任务和微任务的概念。

**不同点**：

**阶段划分不同**。浏览器的事件循环相对简单（宏任务 → 微任务 → 渲染）。Node.js 的事件循环分为 **6 个阶段**：timers（定时器）→ pending callbacks（系统回调）→ idle/prepare（内部）→ poll（I/O 轮询）→ check（setImmediate）→ close（关闭回调）。

**微任务执行时机不同**。浏览器在每个宏任务执行完后清空所有微任务。Node.js 在**每个阶段切换时**清空微任务队列，且在微任务队列中 `process.nextTick` 优先于 `Promise.then`。

**宏任务队列不同**。浏览器宏任务主要是 `setTimeout`/`setInterval`。Node.js 有多个宏任务队列，对应不同阶段。

**核心要点（快速回忆）：**

|            | 浏览器             | Node.js                 |
| ---------- | ------------------ | ----------------------- |
| 事件循环   | 宏任务→微任务→渲染 | 6个阶段循环             |
| 微任务执行 | 每个宏任务后       | 每个阶段切换时          |
| 特殊微任务 | -                  | `process.nextTick` 优先 |
| 宏任务队列 | 单一               | 多阶段多队列            |


**代码示例：**

```javascript
// Node.js 事件循环示例
console.log('1: 同步')

setTimeout(() => {
  console.log('2: setTimeout 宏任务（timers阶段）')
}, 0)

setImmediate(() => {
  console.log('3: setImmediate 宏任务（check阶段）')
})

Promise.resolve().then(() => {
  console.log('4: Promise.then 微任务')
})

process.nextTick(() => {
  console.log('5: process.nextTick 微任务（优先级最高）')
})

// 输出顺序：1 → 5 → 4 → 2/3（timers和check顺序不固定）
// 原因：nextTick 是最高优先级微任务

// 事件循环阶段顺序验证
const fs = require('fs')

fs.readFile(__filename, () => {
  console.log('6: I/O callback（poll阶段）')
  setTimeout(() => console.log('7: setTimeout（timers阶段）'), 0)
  setImmediate(() => console.log('8: setImmediate（check阶段）'))
})
// 在 poll 阶段中，先执行 check（setImmediate），再执行 timers（setTimeout）
```



### 1.3 `process.nextTick` 和 `setImmediate` 的区别是什么？

**面试回答（直接背）：**

两者都是 Node.js 的异步 API，但执行时机和优先级不同：

`process.nextTick`：在当前事件循环的**微任务队列中优先级最高**，在当前阶段结束后、下一阶段开始前立即执行。**会阻塞事件循环**，递归调用可能导致事件循环饥饿。

`setImmediate`：在**当前事件循环的 check 阶段**执行，位于 I/O 回调之后。**不会阻塞事件循环**，是设计用于执行低优先级任务。

执行顺序：`process.nextTick` 总是在 `setImmediate` 之前执行。

选择原则：**需要尽快执行且代码量小用 **`nextTick`**，需要延迟执行不阻塞事件循环用 **`setImmediate`。

**核心要点（快速回忆）：**

|          | `process.nextTick`       | `setImmediate`   |
| -------- | ------------------------ | ---------------- |
| 执行阶段 | 当前阶段结束，下一阶段前 | check 阶段       |
| 优先级   | 最高                     | 较低             |
| 会阻塞   | ✅ 可能                   | ❌ 不会           |
| 适用场景 | 紧急小任务               | 低优先级延迟任务 |


**代码示例：**

```javascript
// 执行顺序验证
setImmediate(() => {
  console.log('1: setImmediate')
})

process.nextTick(() => {
  console.log('2: process.nextTick')
})

// 输出：2 → 1

// nextTick 阻塞事件循环示例（危险）
function loop() {
  process.nextTick(loop)
}
// loop() // 会阻止事件循环进入下一阶段，导致 I/O 无法处理

// 正确用法：在事件循环中确保回调异步执行
function asyncOperation(callback) {
  // 确保回调异步执行，避免同步调用导致的调用栈问题
  process.nextTick(callback)
}

// 错误用法示例
let count = 0
setImmediate(() => {
  console.log('setImmediate 执行')
})

// 下面会导致 nextTick 永远执行不完，setImmediate 永远不执行
function recursiveNextTick() {
  process.nextTick(() => {
    count++
    if (count < 1000) recursiveNextTick()
  })
}
// recursiveNextTick()
```



## 第二章：核心模块

### 2.1 `fs` 模块的常用方法有哪些？

**面试回答（直接背）：**

`fs`（File System）是 Node.js 的核心模块，提供文件读写能力。所有方法都有同步和异步两种版本。

**文件读取**：

+ `fs.readFile(path, callback)`：异步读取文件内容
+ `fs.readFileSync(path)`：同步读取
+ `fs.createReadStream(path)`：创建可读流（大文件）

**文件写入**：

+ `fs.writeFile(path, data, callback)`：异步写入（覆盖）
+ `fs.writeFileSync(path, data)`：同步写入
+ `fs.appendFile(path, data, callback)`：追加写入
+ `fs.createWriteStream(path)`：创建可写流（大文件）

**目录操作**：

+ `fs.mkdir(path, callback)`：创建目录
+ `fs.readdir(path, callback)`：读取目录内容
+ `fs.rmdir(path, callback)`：删除空目录

**文件信息**：

+ `fs.stat(path, callback)`：获取文件/目录信息
+ `fs.existsSync(path)`：判断文件是否存在

**文件操作**：

+ `fs.rename(oldPath, newPath, callback)`：重命名/移动
+ `fs.unlink(path, callback)`：删除文件
+ `fs.copyFile(src, dest, callback)`：复制文件

**核心要点（快速回忆）：**

| 操作   | 异步               | 同步             |
| ------ | ------------------ | ---------------- |
| 读取   | `readFile`         | `readFileSync`   |
| 写入   | `writeFile`        | `writeFileSync`  |
| 追加   | `appendFile`       | `appendFileSync` |
| 删除   | `unlink`           | `unlinkSync`     |
| 流读取 | `createReadStream` | -                |


**代码示例：**

```javascript
const fs = require('fs')
const path = require('path')

// 异步读取
fs.readFile('./file.txt', 'utf8', (err, data) => {
  if (err) throw err
  console.log(data)
})

// 同步读取
try {
  const data = fs.readFileSync('./file.txt', 'utf8')
  console.log(data)
} catch (err) {
  console.error(err)
}

// 异步写入
fs.writeFile('./output.txt', 'Hello World', 'utf8', (err) => {
  if (err) throw err
  console.log('写入成功')
})

// 追加写入
fs.appendFile('./output.txt', '\n追加内容', (err) => {
  if (err) throw err
})

// 创建目录
fs.mkdir('./new-dir', { recursive: true }, (err) => {
  if (err) throw err
})

// 读取目录
fs.readdir('./', (err, files) => {
  if (err) throw err
  console.log(files)
})

// 获取文件信息
fs.stat('./file.txt', (err, stats) => {
  if (err) throw err
  console.log({
    isFile: stats.isFile(),
    isDirectory: stats.isDirectory(),
    size: stats.size,
    mtime: stats.mtime
  })
})

// 判断文件是否存在
if (fs.existsSync('./file.txt')) {
  console.log('文件存在')
}

// 删除文件
fs.unlink('./old-file.txt', (err) => {
  if (err) throw err
})

// 复制文件
fs.copyFile('./source.txt', './dest.txt', (err) => {
  if (err) throw err
})
```



### 2.2 `path` 模块的常用方法有哪些？

**面试回答（直接背）：**

`path` 模块用于处理文件和目录的路径，**自动处理跨平台路径分隔符**（Windows 用 `\`，Unix 用 `/`）。

**路径拼接**：

+ `path.join('a', 'b', 'c')` → `a/b/c`（自动处理分隔符）
+ `path.resolve('a', 'b')` → 绝对路径（从当前目录开始解析）

**路径信息提取**：

+ `path.basename('/a/b/file.js')` → `file.js`（文件名）
+ `path.dirname('/a/b/file.js')` → `/a/b`（目录名）
+ `path.extname('/a/b/file.js')` → `.js`（扩展名）

**路径解析**：

+ `path.parse('/a/b/file.js')` → 返回对象 `{ root, dir, base, name, ext }`
+ `path.format(obj)` → 从对象生成路径

**跨平台**：

+ `path.sep` → 路径分隔符（`/` 或 `\`）
+ `path.delimiter` → 环境变量分隔符（`:` 或 `;`）

**核心要点（快速回忆）：**

| 方法       | 作用                       |
| ---------- | -------------------------- |
| `join`     | 拼接路径（自动处理分隔符） |
| `resolve`  | 解析为绝对路径             |
| `basename` | 获取文件名                 |
| `dirname`  | 获取目录名                 |
| `extname`  | 获取扩展名                 |
| `parse`    | 解析路径为对象             |


**代码示例：**

```javascript
const path = require('path')

// 路径拼接
console.log(path.join('/a', 'b', 'c')) // /a/b/c
console.log(path.join('a', 'b', '..', 'c')) // a/c

// 绝对路径解析
console.log(path.resolve('a', 'b')) // /current/path/a/b
console.log(path.resolve('/a', 'b')) // /a/b

// 路径信息
const filePath = '/home/user/docs/file.js'
console.log(path.basename(filePath)) // file.js
console.log(path.basename(filePath, '.js')) // file
console.log(path.dirname(filePath)) // /home/user/docs
console.log(path.extname(filePath)) // .js

// 路径解析
const parsed = path.parse(filePath)
console.log(parsed)
// {
//   root: '/',
//   dir: '/home/user/docs',
//   base: 'file.js',
//   name: 'file',
//   ext: '.js'
// }

// 从对象生成路径
const formatted = path.format(parsed)
console.log(formatted) // /home/user/docs/file.js

// 跨平台
console.log(path.sep) // 不同平台不同：/ 或 \
console.log(path.delimiter) // 不同平台不同：: 或 ;
```



### 2.3 `Buffer` 是什么？有什么用途？

**面试回答（直接背）：**

`Buffer` 是 Node.js 中用于**处理二进制数据**的类，用于在 TCP 流、文件操作等场景中处理原始字节数据。Buffer 是**固定大小**的，创建后不能改变大小。

**创建 Buffer**：

+ `Buffer.alloc(size)`：分配指定大小的 Buffer（初始化填充 0，安全）
+ `Buffer.allocUnsafe(size)`：分配但**不初始化**（更快，可能包含旧数据）
+ `Buffer.from(data)`：从数组/字符串/Buffer 创建

**读写数据**：

+ `buf[index]`：读取/设置指定字节（0-255）
+ `buf.toString(encoding)`：转字符串（默认 utf8）
+ `buf.write(string, offset, length, encoding)`：写入字符串
+ `buf.slice(start, end)`：切片（共享内存，不是拷贝）

**编码支持**：`utf8`、`ascii`、`base64`、`hex`、`latin1` 等。

**核心要点（快速回忆）：**

+ **本质**：处理二进制数据的类
+ **创建**：`alloc`（安全）、`allocUnsafe`（快）、`from`
+ **固定大小**：创建后不可变
+ **用途**：文件操作、网络通信、加解密

**代码示例：**

```javascript
// 创建 Buffer
const buf1 = Buffer.alloc(10) // 分配10字节，全部填充0
console.log(buf1) // <Buffer 00 00 00 00 00 00 00 00 00 00>

const buf2 = Buffer.allocUnsafe(10) // 分配10字节，不初始化（快，可能有旧数据）

const buf3 = Buffer.from('hello') // 从字符串创建
console.log(buf3) // <Buffer 68 65 6c 6c 6f>

const buf4 = Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]) // 从数组创建

// 读写
const buf = Buffer.from('hello world')
console.log(buf[0]) // 104 (ASCII 'h')
buf[0] = 72 // 改为 'H'
console.log(buf.toString()) // Hello world

// 编码转换
const utf8Buf = Buffer.from('你好', 'utf8')
console.log(utf8Buf) // <Buffer e4 bd a0 e5 a5 bd>
console.log(utf8Buf.toString('base64')) // 5L2g5aW9
console.log(utf8Buf.toString('hex')) // e4bda0e5a5bd

// 切片（共享内存）
const slice = buf.slice(0, 5)
console.log(slice.toString()) // Hello
slice[0] = 104 // 修改切片
console.log(buf.toString()) // hello world（原Buffer也被修改）

// 拼接 Buffer
const parts = [Buffer.from('hello'), Buffer.from('world')]
const combined = Buffer.concat(parts)
console.log(combined.toString()) // helloworld
```



### 2.4 `Stream` 是什么？有什么用途？

**面试回答（直接背）：**

Stream（流）是 Node.js 中处理**大量数据**的抽象接口，将数据分成**小块**逐步处理，不需要一次性加载到内存。

**四种类型**：

+ **可读流（Readable）**：读取数据，如 `fs.createReadStream`
+ **可写流（Writable）**：写入数据，如 `fs.createWriteStream`
+ **双工流（Duplex）**：既可读又可写，如 `net.Socket`
+ **转换流（Transform）**：在读写过程中转换数据，如 `zlib.createGzip`

**核心方法**：

+ `stream.pipe(dest)`：管道连接，将可读流数据自动写入可写流
+ `stream.on('data', callback)`：监听数据事件
+ `stream.on('end', callback)`：数据读取完成
+ `stream.on('error', callback)`：错误处理

**优势**：**内存效率高**（不需要加载整个文件），**时间效率高**（边读边处理）。

**核心要点（快速回忆）：**

+ **本质**：分块处理数据，不一次性加载到内存
+ **类型**：可读、可写、双工、转换
+ **核心方法**：`pipe()` 管道连接
+ **适用**：大文件处理、网络传输、数据压缩

**代码示例：**

```javascript
const fs = require('fs')
const zlib = require('zlib')
const { pipeline } = require('stream')

// 1. 基本流操作：复制文件
const readStream = fs.createReadStream('./large-file.txt')
const writeStream = fs.createWriteStream('./copy.txt')

readStream.pipe(writeStream)

readStream.on('end', () => {
  console.log('复制完成')
})

// 2. 错误处理（pipe 不自动处理错误）
readStream.on('error', (err) => console.error('读取错误:', err))
writeStream.on('error', (err) => console.error('写入错误:', err))

// 3. 流事件监听
const stream = fs.createReadStream('./data.txt', { encoding: 'utf8' })

stream.on('data', (chunk) => {
  console.log('收到数据块:', chunk.length)
})

stream.on('end', () => {
  console.log('读取完成')
})

stream.on('error', (err) => {
  console.error('错误:', err)
})

// 4. 转换流：压缩文件（gzip）
const source = fs.createReadStream('./file.txt')
const dest = fs.createWriteStream('./file.txt.gz')
const gzip = zlib.createGzip()

source.pipe(gzip).pipe(dest)

// 5. 使用 pipeline 处理流（推荐，自动处理错误和清理）
pipeline(
  fs.createReadStream('./file.txt'),
  zlib.createGzip(),
  fs.createWriteStream('./file.txt.gz'),
  (err) => {
    if (err) {
      console.error('Pipeline 失败:', err)
    } else {
      console.log('压缩成功')
    }
  }
)

// 6. 手动实现可读流
const { Readable } = require('stream')
const myReadable = new Readable({
  read(size) {
    // 当消费者需要数据时调用
  }
})
myReadable.push('data chunk 1')
myReadable.push('data chunk 2')
myReadable.push(null) // 表示数据结束
```



## 第三章：事件与进程

### 3.1 `EventEmitter` 是什么？如何实现一个？

**面试回答（直接背）：**

`EventEmitter` 是 Node.js 的**事件核心**，几乎所有模块都继承自它。它基于**观察者模式**，实现事件的发布和订阅。

**核心方法**：

+ `on(event, listener)`：注册事件监听
+ `emit(event, ...args)`：触发事件
+ `once(event, listener)`：注册一次性监听（触发后自动移除）
+ `off(event, listener)` / `removeListener`：移除监听
+ `removeAllListeners(event)`：移除所有监听

**实现原理**：内部维护 `events` 对象，键是事件名，值是回调函数数组。`on` 向数组添加函数，`emit` 遍历数组执行。

**核心要点（快速回忆）：**

+ **模式**：观察者模式（发布-订阅）
+ **核心方法**：`on`、`emit`、`once`、`off`
+ **存储结构**：`{ eventName: [listener1, listener2] }`

**代码示例：**

```javascript
// 使用 EventEmitter
const EventEmitter = require('events')

// 1. 直接使用
const emitter = new EventEmitter()

emitter.on('greet', (name) => {
  console.log(`你好, ${name}`)
})

emitter.once('onceEvent', () => {
  console.log('只执行一次')
})

emitter.emit('greet', '张三') // 你好, 张三
emitter.emit('onceEvent') // 只执行一次
emitter.emit('onceEvent') // 不执行

// 2. 自定义类继承 EventEmitter
class Logger extends EventEmitter {
  log(level, message) {
    this.emit('log', { level, message, timestamp: Date.now() })
  }
}

const logger = new Logger()
logger.on('log', (data) => {
  console.log(`[${data.level}] ${data.message}`)
})

logger.log('INFO', '系统启动')
logger.log('ERROR', '发生错误')

// 3. 监听器数量限制
emitter.setMaxListeners(20) // 设置最大监听数（默认10）
console.log(emitter.getMaxListeners()) // 20

// 4. 错误处理（必须监听 error 事件）
emitter.on('error', (err) => {
  console.error('错误:', err)
})
emitter.emit('error', new Error('出错了'))

// 5. 手写 EventEmitter（精简版）
class MyEventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)
    return this
  }

  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args)
      this.off(event, wrapper)
    }
    this.on(event, wrapper)
    return this
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args))
    }
    return this
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener)
    }
    return this
  }
}
```



### 3.2 `process` 对象有哪些常用属性和方法？

**面试回答（直接背）：**

`process` 是 Node.js 的**全局对象**，提供当前进程的信息和控制。

**常用属性**：

+ `process.env`：环境变量对象（如 `process.env.NODE_ENV`）
+ `process.argv`：命令行参数数组（[node路径, 脚本路径, 参数...]）
+ `process.cwd()`：当前工作目录
+ `process.pid`：进程 ID
+ `process.platform`：操作系统平台（`win32`、`linux`、`darwin`）
+ `process.version`：Node.js 版本
+ `process.uptime()`：进程运行时间

**常用方法**：

+ `process.exit(code)`：退出进程（0 表示成功）
+ `process.kill(pid)`：杀死进程
+ `process.nextTick(callback)`：微任务（当前阶段结束后执行）

**事件**：

+ `process.on('exit', callback)`：进程退出时
+ `process.on('uncaughtException', callback)`：未捕获异常
+ `process.on('SIGINT', callback)`：Ctrl+C 中断信号

**核心要点（快速回忆）：**

| 属性/方法            | 用途         |
| -------------------- | ------------ |
| `process.env`        | 环境变量     |
| `process.argv`       | 命令行参数   |
| `process.cwd()`      | 当前目录     |
| `process.exit()`     | 退出进程     |
| `process.nextTick()` | 微任务调度   |
| `process.on('exit')` | 进程退出钩子 |


**代码示例：**

```javascript
// 环境变量
console.log(process.env.NODE_ENV) // 'production'
process.env.MY_CONFIG = 'some-value'

// 命令行参数
// node script.js --port 3000 --env dev
console.log(process.argv)
// ['node路径', 'script路径', '--port', '3000', '--env', 'dev']

// 解析命令行参数
const args = process.argv.slice(2)
const config = {}
for (let i = 0; i < args.length; i += 2) {
  config[args[i].replace('--', '')] = args[i + 1]
}
console.log(config) // { port: '3000', env: 'dev' }

// 当前工作目录
console.log(process.cwd()) // /home/user/project

// 进程信息
console.log(process.pid) // 12345
console.log(process.platform) // 'linux'
console.log(process.version) // 'v18.0.0'
console.log(process.uptime()) // 运行秒数

// 内存使用
console.log(process.memoryUsage())
// { rss: 50M, heapTotal: 10M, heapUsed: 5M, external: 1M }

// 退出进程
process.exit(0) // 正常退出
// process.exit(1) // 错误退出

// 进程事件
process.on('exit', (code) => {
  console.log(`进程退出，代码: ${code}`)
})

process.on('uncaughtException', (err) => {
  console.error('未捕获异常:', err)
  process.exit(1)
})

// 信号处理
process.on('SIGINT', () => {
  console.log('收到 Ctrl+C，清理资源...')
  process.exit(0)
})
```



### 3.3 子进程（child_process）是什么？

**面试回答（直接背）：**

`child_process` 模块用于**创建子进程**，执行外部命令或脚本，实现多进程处理。

**四种创建方式**：

+ `exec(command, callback)`：执行命令，缓冲输出，适合少量输出
+ `execFile(file, args, callback)`：执行可执行文件，比 exec 更安全
+ `spawn(command, args, options)`：执行命令，流式输出，适合大量输出
+ `fork(modulePath, args, options)`：创建 Node.js 子进程，支持 IPC 通信

**通信方式**：

+ 通过 `stdin/stdout/stderr` 流通信（spawn/exec）
+ 通过 `send()` 和 `message` 事件 IPC 通信（fork）

**使用场景**：执行系统命令、并行处理任务、隔离 CPU 密集型任务。

**核心要点（快速回忆）：**

| 方法       | 输出方式     | 适用场景           |
| ---------- | ------------ | ------------------ |
| `exec`     | 缓冲全部输出 | 少量输出，简单命令 |
| `execFile` | 缓冲全部输出 | 执行可执行文件     |
| `spawn`    | 流式输出     | 大量输出，长期运行 |
| `fork`     | 流式 + IPC   | Node.js 子进程     |


**代码示例：**

```javascript
const { exec, execFile, spawn, fork } = require('child_process')
const path = require('path')

// 1. exec：执行命令，缓冲输出
exec('ls -la', (error, stdout, stderr) => {
  if (error) {
    console.error(`错误: ${error}`)
    return
  }
  console.log(stdout)
})

// 2. execFile：执行文件（更安全，不启动shell）
execFile('node', ['--version'], (error, stdout) => {
  console.log('Node版本:', stdout)
})

// 3. spawn：流式输出（适合大量数据）
const ls = spawn('ls', ['-la', '/usr'])
ls.stdout.on('data', (data) => {
  console.log(`输出: ${data}`)
})
ls.stderr.on('data', (data) => {
  console.error(`错误: ${data}`)
})
ls.on('close', (code) => {
  console.log(`子进程退出: ${code}`)
})

// 4. fork：Node.js 子进程（IPC通信）
// parent.js
const child = fork('./child.js')
child.on('message', (msg) => {
  console.log('收到子进程:', msg)
})
child.send({ type: 'start', data: 100 })

// child.js
process.on('message', (msg) => {
  console.log('收到父进程:', msg)
  // 处理任务
  const result = msg.data * 2
  process.send({ type: 'result', data: result })
})

// 5. 并行任务处理（使用 fork）
const os = require('os')
const cpuCount = os.cpus().length

function runParallel(tasks, workerPath) {
  const workers = []
  let completed = 0
  const results = []

  return new Promise((resolve, reject) => {
    tasks.forEach((task, index) => {
      const worker = fork(workerPath)
      worker.send(task)
      worker.on('message', (result) => {
        results[index] = result
        completed++
        worker.kill()
        if (completed === tasks.length) {
          resolve(results)
        }
      })
      worker.on('error', reject)
      workers.push(worker)
    })
  })
}
```



## 第四章：框架与工程化

### 4.1 Express 和 Koa 的区别是什么？

**面试回答（直接背）：**

Express 和 Koa 都是 Node.js 的 Web 框架，但设计理念不同：

**Koa 是 Express 的升级版**，由同一个团队开发。

**中间件模型**：Express 是**线性中间件**（回调/函数），Koa 是**洋葱圈模型**（`async/await`，中间件可以双向传递控制权）。

**异步处理**：Express 使用回调或 `next()`，异步需要手动处理。Koa 原生支持 `async/await`，异步代码更简洁。

**上下文**：Express 用 `req` 和 `res` 两个对象，Koa 用 `ctx`（Context）封装请求和响应。

**错误处理**：Express 需要手动 `next(err)` 或 `try-catch`。Koa 的 `try-catch` 可以在洋葱圈中捕获错误。

**Koa 更轻量**，核心只提供基础能力，功能通过中间件扩展。Express 更成熟，生态更丰富。

**核心要点（快速回忆）：**

|            | Express     | Koa           |
| ---------- | ----------- | ------------- |
| 中间件模型 | 线性        | 洋葱圈        |
| 异步方式   | 回调/next   | `async/await` |
| 上下文     | `req`/`res` | `ctx`         |
| 体积       | 较大        | 轻量          |
| 生态       | 丰富        | 相对较少      |


**代码示例：**

```javascript
// Express 写法
const express = require('express')
const app = express()

// 中间件（线性）
app.use((req, res, next) => {
  console.log('中间件1 开始')
  next()
  console.log('中间件1 结束')
})

app.use((req, res, next) => {
  console.log('中间件2')
  next()
})

app.get('/', (req, res) => {
  res.send('Hello Express')
})

// 错误处理（需要手动 next）
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('服务器错误')
})

app.listen(3000)

// Koa 写法
const Koa = require('koa')
const app = new Koa()

// 中间件（洋葱圈）
app.use(async (ctx, next) => {
  console.log('中间件1 开始')
  await next() // 交给下一个中间件
  console.log('中间件1 结束')
})

app.use(async (ctx, next) => {
  console.log('中间件2 开始')
  await next()
  console.log('中间件2 结束')
})

app.use(async (ctx) => {
  ctx.body = 'Hello Koa'
})

// 错误处理（try-catch）
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = 500
    ctx.body = { error: err.message }
  }
})

app.listen(3000)
// 输出顺序（洋葱圈）：
// 中间件1 开始 → 中间件2 开始 → 中间件2 结束 → 中间件1 结束
```



### 4.2 Koa 的洋葱圈模型是什么？

**面试回答（直接背）：**

洋葱圈模型是 Koa 中间件的执行机制：**请求从外到内穿过中间件，响应从内到外穿出**，形成类似洋葱的层次结构。

执行流程：

1. 请求到达，进入第一个中间件
2. 执行中间件中 `await next()` 前的代码
3. 进入下一个中间件
4. 重复直到最后一个中间件
5. 最后一个中间件执行完，返回到上一个中间件
6. 执行 `await next()` 后的代码（反向执行）

**特点**：

+ 中间件可以**双向控制**（请求和响应都能处理）
+ 天然支持**错误处理**（外层中间件可以捕获内层异常）
+ 执行顺序**可预测**（洋葱结构）

**核心要点（快速回忆）：**

+ **模型**：请求从外到内，响应从内到外
+ **关键**：`await next()` 控制流转
+ **优势**：双向控制、错误捕获、顺序可控

**代码示例：**

```javascript
const Koa = require('koa')
const app = new Koa()

// 中间件1（最外层）
app.use(async (ctx, next) => {
  console.log('1: 请求到达 - 开始处理')
  ctx.startTime = Date.now()

  await next() // 进入下一个中间件

  console.log('1: 响应返回 - 完成处理')
  console.log(`总耗时: ${Date.now() - ctx.startTime}ms`)
})

// 中间件2
app.use(async (ctx, next) => {
  console.log('2: 进入中间件2')
  ctx.user = { name: '张三' }

  await next()

  console.log('2: 离开中间件2')
})

// 中间件3（最内层）
app.use(async (ctx, next) => {
  console.log('3: 执行业务逻辑')
  ctx.body = `Hello, ${ctx.user.name}`

  // 最内层没有 next，开始返回
})

app.listen(3000)

// 执行顺序（洋葱圈）：
// 1: 请求到达 - 开始处理
// 2: 进入中间件2
// 3: 执行业务逻辑
// 2: 离开中间件2
// 1: 响应返回 - 完成处理

// 错误处理示例（外层捕获内层错误）
app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    console.error('捕获到错误:', err.message)
    ctx.status = 500
    ctx.body = { error: err.message }
  }
})

app.use(async (ctx) => {
  throw new Error('业务逻辑错误')
})
```



### 4.3 中间件的实现原理是什么？

**面试回答（直接背）：**

中间件的核心原理是**函数组合（Compose）**，将多个中间件函数组合成一个执行链。

**核心机制**：

1. 每个中间件接收 `ctx` 和 `next` 参数
2. `next` 是下一个中间件的函数引用
3. 通过 `async/await` 或 `Promise` 控制执行流程

**简化实现**：

1. 将所有中间件存入数组
2. `compose` 函数将中间件组合成一个函数
3. 从最后一个中间件开始，依次将前一个中间件包装到 `next` 中
4. 最终返回第一个中间件的执行函数

**核心要点（快速回忆）：**

+ **本质**：函数组合（Compose）
+ **关键**：`ctx`（上下文）+ `next`（下一个函数）
+ **执行流程**：递归调用 `next`，形成洋葱圈

**代码示例：**

```javascript
// 中间件实现原理

// 1. 中间件函数
const middleware1 = async (ctx, next) => {
  console.log('中间件1 开始')
  await next()
  console.log('中间件1 结束')
}

const middleware2 = async (ctx, next) => {
  console.log('中间件2 开始')
  await next()
  console.log('中间件2 结束')
}

const middleware3 = async (ctx, next) => {
  console.log('中间件3（业务逻辑）')
  ctx.body = 'Hello'
}

// 2. compose 函数（核心）
function compose(middlewares) {
  return function(context) {
    let index = -1

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'))
      }
      index = i

      const middleware = middlewares[i]
      if (!middleware) {
        return Promise.resolve()
      }

      try {
        return Promise.resolve(
          middleware(context, () => dispatch(i + 1))
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}

// 3. 使用
const ctx = {}
const fn = compose([middleware1, middleware2, middleware3])

fn(ctx).then(() => {
  console.log('执行完成, body:', ctx.body)
})

// 输出：
// 中间件1 开始
// 中间件2 开始
// 中间件3（业务逻辑）
// 中间件2 结束
// 中间件1 结束
// 执行完成, body: Hello

// 4. 带错误处理的 compose（Koa 实际实现简化版）
function composeWithError(middlewares) {
  return function(context) {
    let index = -1

    function dispatch(i) {
      if (i <= index) {
        return Promise.reject(new Error('next() called multiple times'))
      }
      index = i

      let middleware = middlewares[i]
      if (!middleware) {
        return Promise.resolve()
      }

      try {
        return Promise.resolve(
          middleware(context, () => dispatch(i + 1))
        )
      } catch (err) {
        return Promise.reject(err)
      }
    }

    return dispatch(0)
  }
}
```



## 第五章：工程化与实践

### 4.4 JWT 鉴权的原理是什么？

**面试回答（直接背）：**

JWT（JSON Web Token）是一种**无状态**的身份认证方案，服务器不需要存储 Session，通过 Token 本身携带用户信息。

**JWT 结构**：由三部分组成，用 `.` 分隔：

+ **Header（头部）**：算法和类型，如 `{ alg: 'HS256', typ: 'JWT' }`
+ **Payload（载荷）**：用户信息（如 `userId`、`role`），**不存敏感信息**（Base64 可解码）
+ **Signature（签名）**：对 Header + Payload 用密钥签名，防篡改

**认证流程**：

1. 用户登录，服务器验证账号密码
2. 生成 JWT 返回给客户端
3. 客户端存储（localStorage/Cookie），后续请求在 Header 中携带 `Authorization: Bearer <token>`
4. 服务器验证签名，解析用户信息

**优缺点**：

+ **优点**：无状态（不需要存储 Session），跨域支持好，适合分布式系统
+ **缺点**：Token 无法主动失效（除非设置短有效期 + 刷新 Token），Payload 不加密（不要存敏感信息）

**核心要点（快速回忆）：**

+ **结构**：Header.Payload.Signature（三部分，`.` 分隔）
+ **流程**：登录生成 → 客户端存储 → 请求携带 → 服务端验证
+ **特点**：无状态、跨域友好、可解码（不存敏感信息）

**代码示例：**

```javascript
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'your-secret-key'

// 1. 生成 JWT
function generateToken(user) {
  const payload = {
    userId: user.id,
    username: user.username,
    role: user.role
  }

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: '7d', // 7天过期
    algorithm: 'HS256'
  })
}

// 2. 验证 JWT（中间件）
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: '未提供Token' })
  }

  const token = authHeader.substring(7) // 去掉 'Bearer '

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded // 挂载用户信息
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token已过期' })
    }
    return res.status(401).json({ error: '无效的Token' })
  }
}

// 3. 刷新 Token
function refreshToken(oldToken) {
  try {
    const decoded = jwt.verify(oldToken, SECRET_KEY, {
      ignoreExpiration: true // 允许过期Token刷新
    })

    // 重新生成（更新过期时间）
    const { userId, username, role } = decoded
    return jwt.sign({ userId, username, role }, SECRET_KEY, {
      expiresIn: '7d'
    })
  } catch (err) {
    return null
  }
}

// 4. Express 中使用
const express = require('express')
const app = express()

app.post('/login', (req, res) => {
  // 验证用户名密码...
  const user = { id: 1, username: '张三', role: 'admin' }
  const token = generateToken(user)
  res.json({ token })
})

app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: `你好, ${req.user.username}`, user: req.user })
})
```



### 4.5 文件上传怎么实现？

**面试回答（直接背）：**

文件上传在 Node.js 中通常使用 `multer`（Express）或 `koa-multer`（Koa）中间件。

**实现步骤**：

1. 前端使用 `multipart/form-data` 格式提交文件
2. 服务端使用 Multer 解析
3. 配置存储位置（磁盘或内存）
4. 处理上传后的文件（保存、重命名、压缩等）

**Multer 配置**：

+ `storage`：存储引擎（`diskStorage` 存磁盘，`memoryStorage` 存内存）
+ `limits`：文件大小限制
+ `fileFilter`：文件类型过滤

**核心要点（快速回忆）：**

+ **前端**：`enctype="multipart/form-data"` + `input[type="file"]`
+ **服务端**：Multer 中间件解析
+ **配置**：存储位置 + 大小限制 + 文件类型

**代码示例：**

```javascript
// Express + Multer 实现文件上传
const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()

// 1. 配置存储
const storage = multer.diskStorage({
  // 存储路径
  destination: (req, file, cb) => {
    const uploadDir = './uploads/'
    // 确保目录存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true })
    }
    cb(null, uploadDir)
  },
  // 文件名
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`
    const ext = path.extname(file.originalname)
    cb(null, `${uniqueName}${ext}`)
  }
})

// 2. 文件过滤
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('只允许上传图片'), false)
  }
}

// 3. 创建 multer 实例
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter
})

// 4. 单文件上传
app.post('/upload/single', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: '未上传文件' })
  }
  res.json({
    message: '上传成功',
    file: {
      filename: req.file.filename,
      originalName: req.file.originalname,
      size: req.file.size,
      path: req.file.path
    }
  })
})

// 5. 多文件上传
app.post('/upload/multiple', upload.array('files', 5), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: '未上传文件' })
  }
  res.json({
    message: `上传成功 ${req.files.length} 个文件`,
    files: req.files.map(f => ({
      filename: f.filename,
      originalName: f.originalname,
      size: f.size
    }))
  })
})

// 6. 错误处理
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'FILE_TOO_LARGE') {
      return res.status(413).json({ error: '文件过大，最大5MB' })
    }
    return res.status(400).json({ error: err.message })
  }
  next(err)
})

// 7. 前端示例
/*
<form action="/upload/single" method="post" enctype="multipart/form-data">
  <input type="file" name="file">
  <button type="submit">上传</button>
</form>
*/
```

| 序号 | 模块             | 题数                |
| ---- | ---------------- | ------------------- |
| 1    | HTML & CSS       | 25                  |
| 2    | JavaScript 核心  | 27                  |
| 3    | ES6+ 新特性      | 24                  |
| 4    | TypeScript       | 16                  |
| 5    | Vue 2.x          | 21                  |
| 6    | Vue 3.x          | 17                  |
| 7    | React            | 27                  |
| 8    | 前端工程化       | 19                  |
| 9    | 浏览器与网络     | 22                  |
| 10   | 性能优化         | 19                  |
| 11   | 数据结构与算法   | 刷LeetCode100题即可 |
| 12   | Node.js          | 21                  |
| 13   | 小程序           | 15                  |
| 14   | 设计模式         | 12                  |
| 15   | 项目架构与开放题 | 14                  |

