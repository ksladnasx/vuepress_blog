---
date: 2025-12-10
category:
  - 说明文档
tag:
  - React
  - TypeScript

---

# React基础入门

## 基础入门

### 一、核心认知：React 是什么？（类比 Vue）

Vue3 是「渐进式框架」，有完整的模板、指令、响应式体系；React 是「UI 库」（核心只管视图渲染），更像「函数式的视图生成器」，核心思想：**用函数描述 UI，数据变了函数重新执行，UI 就更新**。

### 关键类比（Vue3 → React）

| Vue3 概念         | React 对应概念            | 核心差异                          |
| ----------------- | ------------------------- | --------------------------------- |
| 单文件组件.vue    | 组件文件.tsx/.jsx         | React 用 JSX 写模板（HTML 嵌 JS） |
| setup () 语法糖   | 函数组件                  | React 组件本质是返回 JSX 的函数   |
| ref/reactive      | useState/useReducer       | React 响应式是「显式更新」        |
| watch/watchEffect | useEffect/useLayoutEffect | 副作用监听需手动指定依赖          |
| Props 传值        | Props 传值                | 逻辑一致，TS 类型声明方式不同     |
| 插槽 Slot         | 组件传子元素 / Props      | React 无插槽，用「传元素」替代    |

### 二、极速上手：从「写一个按钮」开始

#### 1. 环境准备（类比 Vue CLI/Vite）

React 常用构建工具：

- Vite：`npm create vite@latest my-react -- --template react-ts`（和 Vue3 用 Vite 几乎一样）
- 启动：`cd my-react && npm i && npm run dev`

#### 2. 第一个组件（TSX 版，类比 Vue3 单文件组件）

Vue3 你习惯这么写：

```vue
<template>
  <button @click="count++">点击{{ count }}次</button>
</template>
<script setup lang="ts">
const count = ref(0)
</script>
```

React 等价写法（TSX）：

```tsx
// src/Button.tsx
import { useState } from 'react'

// 函数组件 = Vue3 setup + template 合体
export default function MyButton() {
  // useState：类比 ref(0)，返回[值, 修改值的方法]（React 必须用方法更新，不能直接改）
  const [count, setCount] = useState<number>(0)

  // JSX = Vue 模板，语法更贴近 JS
  return (
    <button onClick={() => setCount(count + 1)}>
      点击{count}次
    </button>
  )
}
```

#### 核心形象化理解：

- React 组件 = 「UI 工厂函数」：输入 Props / 状态，输出 JSX（UI）；
- useState = 「状态盒子」：盒子里装着 count，只有用 setCount 才能打开盒子改值（Vue 的 ref 是「自动更新的盒子」）；
- onClick = 「事件触发器」：和 Vue 的 @click 一样，只是 React 用驼峰命名（onClick、onChange）。

#### 3. 组件传值（Props，类比 Vue Props）

Vue3 传值：

```vue
<!-- 父组件 -->
<MyButton title="测试按钮" />

<!-- 子组件 -->
<script setup lang="ts">
defineProps<{ title: string }>()
</script>
```

React 等价写法：

```tsx
// 子组件 Button.tsx
interface ButtonProps {
  title: string
  count?: number // 可选属性，类比 Vue Props 可选
}

// Props 作为函数参数传入
export default function MyButton(props: ButtonProps) {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(count + 1)}>
      {props.title}：点击{count}次
    </button>
  )
}

// 父组件 App.tsx
import MyButton from './Button'

export default function App() {
  return (
    <div>
      <MyButton title="测试按钮" />
    </div>
  )
}
```

#### 形象化：

React Props = 「工厂的原材料」：父组件把 title 传给子组件（工厂），工厂用原材料生产 UI。

#### 4. 副作用（类比 Vue watch/watchEffect）

Vue3 监听 count 变化：

```ts
watch(count, (newVal) => {
  console.log('count变了：', newVal)
})
```

React 用 useEffect 实现：

```tsx
import { useState, useEffect } from 'react'

export default function MyButton() {
  const [count, setCount] = useState(0)

  // useEffect = 「副作用容器」：组件渲染/更新后执行
  useEffect(() => {
    console.log('count变了：', count)
    // 依赖数组 = 监听的状态，类比 Vue watch 的第一个参数
  }, [count])

  return (
    <button onClick={() => setCount(count + 1)}>点击{count}次</button>
  )
}
```

#### 核心形象化：

useEffect = 「善后处理员」：组件渲染完（UI 画好），处理异步、监听、DOM 操作等「善后工作」；依赖数组 = 「触发开关」：只有数组里的状态变了，才会重新执行 useEffect（空数组 = 只执行一次，类比 Vue 的 watch 立即执行 + 只监听一次）。

### 三、React 核心灵魂：JSX 语法（类比 Vue 模板）

JSX 是「JS 的语法扩展」，可以理解为「能写 HTML 的 JS」，核心规则：

1. 标签必须闭合：`<div />`（类比 Vue 自闭合标签）；
2. 只能有一个根节点：用 `<></>`（空标签，类比 Vue 的 `<template>` 根节点）包裹；
3. 插值用 `{}`：`{count}`、`{props.title}`（类比 Vue 的 `{{}}`）；
4. 样式用对象：`style={{ color: 'red', fontSize: '16px' }}`（类比 Vue 的 :style）；
5. class 用 className：`<div className="box" />`（因为 class 是 JS 关键字）。

形象化：

JSX = 「HTML 和 JS 的混血儿」：既像 HTML 一样写结构，又能直接在里面写 JS 逻辑（比如 `{count > 5 && <span>超过5次</span>}`，类比 Vue 的 `v-if`）。

### 四、Vue3 → React 核心思维转换

1. 「自动响应式」→「显式更新」：Vue 改 ref/reactive 自动更 UI，React 必须调用 setXxx 触发重渲染；
2. 「模板分离」→「JSX 融合」：Vue 模板和逻辑分开，React 逻辑和 UI 写在同一个函数里（更贴近「数据驱动 UI」的本质）；
3. 「指令化」→「函数式」：Vue 用 v-if/v-for 指令，React 用 JS 的 if/for 写逻辑（比如 `{list.map(item => <li key={item.id}>{item.name}</li>)}` 类比 v-for）。



## Pick

### 一、核心含义

`Pick<SearchCriteria, "page" | "pageSize">`  ，这是 TypeScript 内置的**工具类型 `Pick`**，作用是**从一个已有类型中「挑选」指定的属性，生成一个全新的、仅包含这些属性的类型**，是 TS 类型编程中最常用的工具之一（你有 Vue3+TS 基础，理解这个会很轻松）。

#### 1. 语法拆解

```typescript
Pick<原类型, 要挑选的属性名 | 多个属性用 | 分隔>
```

对应到代码里：

- `SearchCriteria`：原类型（你项目中定义的筛选条件完整类型，包含 `page`、`pageSize`、`startTime`、`keyword`、`minExecutionTime` 等所有字段）；
- `"page" | "pageSize"`：要挑选的属性（仅保留分页相关的 `page` 和 `pageSize`，排除其他筛选字段）；
- 最终 `Pick<SearchCriteria, "page" | "pageSize">` 生成的新类型 = **只有 `page` 和 `pageSize` 两个属性的类型**，没有 `startTime`、`keyword` 等其他字段。

#### 2. 形象化理解（类比 Vue3+TS 场景）

假设你的 `SearchCriteria` 完整类型是这样的：

```typescript
// 完整的筛选条件类型
interface SearchCriteria {
  page: number; // 页码
  pageSize: number; // 页大小
  keyword?: string; // 关键词
  startTime?: string; // 开始时间
  endTime?: string; // 结束时间
  minExecutionTime?: number; // 最小执行时间
  databaseName?: string; // 数据库名
}
```

用 `Pick<SearchCriteria, "page" | "pageSize">` 后，生成的新类型等价于：

```typescript
// Pick 自动生成的新类型（无需手动写）
interface PickedCriteria {
  page: number;
  pageSize: number;
}
```

#### 3. 为什么要用 `Pick`（核心价值）

在之前的代码中，`getBaseCriteria` 函数的目的是「仅返回分页相关的基础字段」，用 `Pick` 有 3 个关键作用：

- **类型安全**：强制函数返回值只能包含 `page` 和 `pageSize`，如果不小心返回了 `startTime` 等字段，TS 会直接报错（避免手写漏检）；
- **复用已有类型**：不用重新写一个只有 `page`/`pageSize` 的新接口，直接复用 `SearchCriteria`，后续如果 `SearchCriteria` 里的 `page` 类型从 `number` 改成其他，这里会自动同步，减少维护成本；
- **语义清晰**：一眼就能看出「从完整筛选条件中挑选分页字段」，比手动写新接口更易读。

#### 4. 对比：不用 `Pick` 会怎么样？

如果不用 `Pick`，你需要手动写一个新接口：

```typescript
// 手动定义基础分页类型（等价于 Pick 的效果，但冗余）
interface BaseCriteria {
  page: number;
  pageSize: number;
}

const getBaseCriteria = (): BaseCriteria => {
  return { page: 1, pageSize: 10 };
};
```

这种方式可行，但如果 `SearchCriteria` 中的 `page`/`pageSize` 类型修改（比如 `pageSize` 改成 `10 | 20 | 50`），你需要同时改 `BaseCriteria`，而用 `Pick` 会自动同步，更高效。

### 二、代码中 `Pick` 的实际作用

在 `getBaseCriteria` 函数中：

```typescript
const getBaseCriteria = (): Pick<SearchCriteria, "page" | "pageSize"> => {
  return {
    page: 1, // 快捷筛选强制重置到第1页
    pageSize: localCriteria.pageSize || 10, // 保留用户之前设置的页大小
  };
};
```

- 返回值类型被 `Pick` 约束，确保函数只能返回 `page` 和 `pageSize`，不会混入 `startTime` 等筛选字段；
- 结合后续的 `...getBaseCriteria()` + `...filterCriteria`，能精准实现「仅保留分页字段 + 当前快捷筛选条件」，彻底避免旧筛选条件残留。

## useCallback

在 `useCallback`中列出依赖项数组，本质上是在告诉 React：“**只有当这个数组里的值发生变化时，才需要重新创建我包裹的这个函数。**” 这是 React 用来优化性能、避免不必要的函数重建和组件重新渲染的核心机制。

为了快速抓住要点，我们先通过下面这个表格来直观理解不同依赖项设置的作用：

| 依赖项数组配置                  | 函数何时重新创建？                                           | 常见使用场景与注意事项                                       |
| :------------------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **空数组 `[]`**                 | **仅在组件首次渲染时创建一次**，之后无论组件如何重新渲染，函数引用始终不变。 | 适用于不依赖任何组件内部状态或props的函数，例如一个固定的操作提示。需**确保函数内部确实不依赖任何会变化的值**，否则可能引用到旧的 state 或 props（闭包陷阱）。 |
| **包含特定依赖 `[dep1, dep2]`** | 在**首次渲染时创建**，之后**仅当 `dep1`或 `dep2`的值发生变化时**才会重新创建。 | 这是**最常用和推荐**的方式。用于函数内部使用了某些状态、props或函数的情况。能精准控制函数更新，平衡性能与逻辑正确性。 |
| **省略依赖项（不推荐）**        | **每次组件渲染时都会重新创建**一个新的函数，等同于没有使用 `useCallback`。 | **基本失去了使用 `useCallback`的意义**。ESLint 规则通常会对此发出警告，应避免这种写法。 |

### 💡 核心机制：理解闭包与稳定性

依赖项列表之所以如此重要，深层原因与 JavaScript 的**闭包**机制有关。

- **保证逻辑正确性**：当函数内部引用了组件状态（如 `state`）、`props`或其他在函数外部定义的变量时，这个函数会“记住”它被创建时所处的作用域（即形成闭包）。如果你在依赖项数组中遗漏了某个变量，`useCallback`返回的函数将继续使用该变量最初被“捕获”的值（旧值），从而导致逻辑错误。明确列出所有依赖，就是确保函数总能访问到这些变量的最新值。
- **提供稳定性**：在 React 中，一个函数如果被传递给子组件，或者作为其他 Hook（如 `useEffect`）的依赖，其引用的稳定性至关重要。`useCallback`通过依赖项数组来控制函数引用的变化，只有依赖项真的变了，函数引用才变。这种稳定性是 `React.memo`等优化手段能够生效的前提。

## useEffect

### 一、基础用法

`useEffect(() => { fetchUserList(); }, [fetchUserList])` 核心拆解：这行代码是 React 中「副作用管理 + 依赖控制」的典型写法，我们先拆成**基础结构**和**业务逻辑**两层讲解，再对比 Vue3 帮你理解，最后讲这么写的「为什么」。

#### 1. 先懂 `useEffect` 基础语法

`useEffect` 是 React 处理「副作用」的核心 Hook，语法结构：

```tsx
useEffect(
  // 第一个参数：副作用回调函数（要执行的逻辑，比如请求、DOM操作、监听）
  () => { /* 要执行的代码 */ },
  // 第二个参数：依赖数组（决定回调函数「什么时候执行」）
  [依赖1, 依赖2, ...]
);
```

- **副作用**：指「不属于组件渲染本身，但需要在渲染后执行的逻辑」（比如网络请求、操作 DOM、添加事件监听、修改全局变量等）；

- 依赖数组的规则

  ：只有数组里的变量 / 函数「引用发生变化」时，回调函数才会重新执行；

  - 依赖数组为空 `[]`：仅在组件**首次挂载**时执行 1 次（类比 Vue3 的 `onMounted`）；
  - 依赖数组有值：组件挂载时执行 1 次 + 依赖项变化时再执行；
  - 不写依赖数组：组件**每次渲染 / 更新**都执行（极度不推荐，会导致无限循环）。

#### 2. 拆解你问的这段代码

```tsx
useEffect(() => {
  fetchUserList(); // 执行「获取用户列表」的网络请求
}, [fetchUserList]); // 依赖：fetchUserList 函数的引用
```

##### （1）回调函数：`() => { fetchUserList(); }`

作用很简单：执行封装好的网络请求函数 `fetchUserList`，获取用户列表数据。

##### （2）依赖数组：`[fetchUserList]`

核心是「监听 `fetchUserList` 函数的引用变化」—— 只有 `fetchUserList` 的引用变了，这个 `useEffect` 才会重新执行。

结合之前案例中 `fetchUserList` 被 `useCallback` 包裹的背景：

```tsx
const fetchUserList = useCallback(async () => {
  // 依赖 searchParams 做请求
}, [searchParams]); // fetchUserList 仅在 searchParams 变化时，引用才会更新
```

所以这行 `useEffect` 的**实际执行逻辑**是：

| 场景                                         | 执行行为                                                     | 类比 Vue3                                                    |
| -------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 组件首次挂载                                 | `fetchUserList` 有初始引用 → `useEffect` 执行 → 调用 `fetchUserList` 发初始请求 | `onMounted(() => fetchUserList())`                           |
| `searchParams` 变化（比如关键词 / 页码改了） | `fetchUserList` 的 `useCallback` 检测到 `searchParams` 变 → `fetchUserList` 引用更新 → `useEffect` 检测到依赖变化 → 重新执行 → 调用新的 `fetchUserList` 发请求 | `watch(searchParams, () => fetchUserList(), { immediate: true })` |
| 组件其他状态变化（比如弹窗显隐）             | `searchParams` 没变化 → `fetchUserList` 引用不变 → `useEffect` 不执行 → 避免重复请求 | 无对应操作（Vue3 不监听无关状态）                            |

### 二、为什么要这么写？

（核心：避免闭包陷阱 + 减少无效请求）你可能会问：「为什么不直接把依赖写成 `[searchParams]`，比如 `useEffect(() => { fetchUserList(); }, [searchParams])`？」两种写法都能实现「searchParams 变化时重新请求」，但 `[fetchUserList]` 是更严谨的写法，原因如下：

#### 1. 避免「闭包陷阱」

React 函数组件每次渲染都会创建新的变量 / 函数，`fetchUserList` 内部如果依赖多个外部变量（比如 `setLoading`、`message`、`searchParams`），直接依赖 `searchParams` 可能导致 `fetchUserList` 捕获「旧的闭包值」：

```tsx
// 反例：直接依赖 searchParams，可能出问题
useEffect(() => {
  // 假设 fetchUserList 没包 useCallback，这里的 fetchUserList 是「当前渲染周期的旧版本」
  // 可能拿到的是旧的 searchParams/setLoading 引用
  fetchUserList();
}, [searchParams]);
```

而通过依赖「被 `useCallback` 包裹的 `fetchUserList`」，能保证每次执行的 `fetchUserList` 都是「最新的」（包含最新的 `searchParams`、`setLoading` 等依赖），彻底避免闭包陷阱。

#### 2. 符合 React Hooks 规则

ESLint 的 `react-hooks/exhaustive-deps` 规则要求：**useEffect 回调中用到的所有外部变量 / 函数，必须加入依赖数组**。因为 `fetchUserList` 是回调中调用的外部函数，所以必须加入依赖；如果漏加，会触发报错，且可能导致逻辑异常。

### 三、和 Vue3 对比

React 的 `useEffect(() => { fetchUserList(); }, [fetchUserList])` 等价于 Vue3 中：

```ts
// Vue3 写法（onMounted + watch，且 watch 立即执行）
import { onMounted, watch } from 'vue';

// 组件挂载时执行一次
onMounted(() => {
  fetchUserList();
});

// 监听 fetchUserList 的依赖（searchParams）变化，重新执行
// （Vue3 中无需监听函数本身，因为 Vue 的响应式是「自动的」）
watch(
  () => [searchParams.page, searchParams.keyword, searchParams.pageSize], // 监听 searchParams 核心字段
  () => {
    fetchUserList();
  },
  { immediate: true } // 立即执行（等价于组件挂载时执行）
);
```

核心差异：

- Vue3：响应式是「自动的」，监听数据即可，无需关心函数引用；
- React：是「显式依赖」，必须通过依赖数组声明要监听的变量 / 函数，且函数引用的稳定性需要用 `useCallback` 保证。

### 四、常见误区 & 注意事项

1. 依赖数组漏写 `fetchUserList`：

   ESLint 会报错，且可能导致fetchUserList捕获旧的闭包值（比如拿到旧的searchParams），请求参数错误。

2. `fetchUserList` 不包 `useCallback`：

   每次组件渲染都会创建新的fetchUserList引用，导致useEffect每次都执行，触发重复请求（比如组件渲染 10 次，请求 10 次）。

3. 依赖数组写空 `[]`

   仅挂载时执行 1 次，后续searchParams变化不会重新请求，筛选 / 分页功能失效。

### 总结

`useEffect(() => { fetchUserList(); }, [fetchUserList])` 的核心目的是：**保证「只有当搜索参数（searchParams）变化时，才重新执行用户列表请求」，同时通过 `useCallback` 保证 `fetchUserList` 引用稳定，避免重复请求和闭包陷阱，完全符合 React Hooks 的规则**。



## prev

### 一、`prev` 核心含义

`prev` 是 React 状态更新函数（如 `setSearchParams`）传给「函数式更新回调」的**参数**，代表「当前要更新的状态的最新快照」（即更新操作执行前，`searchParams` 的完整值）。

简单说：`prev = 更新前的 searchParams`，你可以把它理解为「状态的临时替身」，用来基于旧状态生成新状态。

### 二、代码场景拆解

你的代码：

```tsx
const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setSearchParams(prev => ({
    ...prev, // 复制更新前的所有搜索参数（如pageSize、startTime等）
    keyword: e.target.value, // 覆盖关键词字段
    page: 1, // 重置页码为1
  }));
};
```

#### 1. 为什么要用「函数式更新」（`prev => {...}`）？

React 的 `setXxx` 状态更新**可能是异步的**（比如频繁触发时，React 会批量更新），如果直接写：

```tsx
// 不推荐：可能拿到旧的 searchParams（闭包陷阱）
setSearchParams({
  ...searchParams, // 这里的 searchParams 可能是组件渲染时的旧值
  keyword: e.target.value,
  page: 1,
});
```

而用 `prev` 作为参数的函数式更新，能**保证 `prev` 永远是「更新前的最新状态」**，避免因异步更新导致的状态错误。

#### 2. 举个具体例子（帮你理解）

假设当前 `searchParams` 是：

```ts
{ keyword: "", page: 3, pageSize: 10, startTime: "2025-01-01" }
```

用户输入关键词「张三」触发 `handleKeywordChange` 时：

- `prev` = `{ keyword: "", page: 3, pageSize: 10, startTime: "2025-01-01" }`（更新前的完整状态）；
- `...prev` 复制所有旧字段；
- 覆盖 `keyword` 为「张三」，重置 `page` 为 1；
- 最终新的 `searchParams` = `{ keyword: "张三", page: 1, pageSize: 10, startTime: "2025-01-01" }`。

### 三、关键注意点

1. `prev` 是「只读快照」：你可以读取 `prev` 的值，但不要直接修改它（比如 `prev.page = 1`），必须通过「解构 + 覆盖」生成新对象（React 状态不可变）；

2. 函数式更新的适用场景：只要你的新状态「依赖旧状态」（比如修改旧状态的某个字段、基于旧值计算新值），就用 `prev => {...}` 这种写法；

3. 类比 Vue3：Vue3 中ref的函数式更新和这个逻辑一致，比如：

   

   ```ts
   // Vue3 函数式更新（和 React prev 作用相同）
   const count = ref(0);
   count.value = (prev) => prev + 1; // prev = 更新前的 count 值
   ```

### 四、总结

`prev` 就是「更新前的状态副本」，用函数式更新（`prev => {...}`）能保证基于最新的旧状态生成新状态，避免 React 异步更新导致的「闭包陷阱」，是修改「对象 / 数组类型状态」的标准写法（因为 React 状态不可直接修改，必须基于旧状态创建新状态）。