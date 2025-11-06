---
date: 2025-11-03
category:
  - 说明文档
tag:
  - Vue3
  - Vitest
---


# 入门 

## 基本测试

### 📝 理解测试文件的基本结构

一个 Vitest 测试文件通常包含以下几个核心部分，它们共同构成了测试的基本骨架：

| 组成部分                  | 描述                                              | 代码示例                                                     |
| ------------------------- | ------------------------------------------------- | ------------------------------------------------------------ |
| **导入语句**              | 引入测试框架的功能和待测试对象。                  | `import { describe, it, expect } from 'vitest';``import { sum } from './math';` |
| **测试套件 (Test Suite)** | 使用 `describe`将一系列相关的测试用例组织在一起。 | `describe('数学工具函数', () => { ... });`                   |
| **测试用例 (Test Case)**  | 使用 `it`或 `test`定义单个具体的测试场景。        | `it('应该能正确计算两个数字的和', () => { ... });`           |
| **断言 (Assertion)**      | 使用 `expect`来验证代码的行为和输出是否符合预期。 | `expect(sum(1, 2)).toBe(3);`                                 |

一个完整的简单测试示例如下：

```ts
// 导入
import { describe, it, expect } from 'vitest';
import { sum } from '../src/utils/math';

// 组织测试套件
describe('数学工具函数', () => {
  // 定义测试用例
  describe('sum 函数', () => {
    it('应该能正确计算两个数字的和', () => {
      // 准备数据 (Arrange)
      const a = 1;
      const b = 2;
      // 执行函数 (Act)
      const result = sum(a, b);
      // 验证结果 (Assert)
      expect(result).toBe(3); // 断言
    });
  });
});
```

这个经典的 **Arrange-Act-Assert**(准备-执行-断言) 模式能让你的测试逻辑非常清晰。

### 🎯 掌握核心断言方法

断言是测试的灵魂，Vitest 提供了丰富多样的匹配器（Matcher）来满足各种验证需求。

| 断言目的           | 常用匹配器                                                   | 示例                                                         |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| **相等性判断**     | `.toBe()`, `.toEqual()`                                      | `expect(2 + 2).toBe(4);``expect({a: 1}).toEqual({a: 1});`    |
| **真实性判断**     | `.toBeTruthy()`, `.toBeFalsy()`, `.toBeNull()`, `.toBeUndefined()` | `expect('').toBeFalsy();``expect(null).toBeNull();`          |
| **数值比较**       | `.toBeGreaterThan()`, `.toBeLessThanOrEqual()`               | `expect(10).toBeGreaterThan(5);`                             |
| **字符串匹配**     | `.toContain()`, `.toMatch()`                                 | `expect('Hello Vitest').toContain('Vitest');`                |
| **数组或迭代对象** | `.toContain()`, `.toHaveLength()`                            | `expect([1, 2, 3]).toContain(2);``expect(array).toHaveLength(3);` |
| **异常抛出**       | `.toThrow()`                                                 | `expect(() => { throwError(); }).toThrow();`                 |
| **对象属性**       | `.toHaveProperty()`                                          | `expect(obj).toHaveProperty('key', 'value');`                |

### 🔧 使用生命周期钩子组织测试

对于复杂的测试场景，你可以使用生命周期钩子来设置测试环境和清理资源，这类似于 Vue 组件的生命周期。

```ts
import { beforeAll, beforeEach, afterEach, afterAll, describe, it } from 'vitest';

describe('测试用户管理模块', () => {
  let userService; // 声明变量，供所有测试用例使用

  // 在所有测试用例运行之前执行一次，常用于初始化全局资源
  beforeAll(async () => {
    console.log('开始运行用户管理模块测试...');
    // 例如，初始化数据库连接
  });

  // 在每个测试用例运行之前执行，常用于重置状态
  beforeEach(() => {
    userService = new UserService(); // 为每个测试创建一个干净的实例
  });

  // 在每个测试用例运行之后执行，常用于清理
  afterEach(() => {
    userService.cleanup(); // 清理测试产生的数据
  });

  // 在所有测试用例运行之后执行一次，常用于释放资源
  afterAll(() => {
    console.log('用户管理模块测试结束。');
    // 例如，关闭数据库连接
  });

  it('应该能创建新用户', () => {
    // 这里的 userService 是 beforeEach 中新建的实例
    const user = userService.create('Alice');
    expect(user.name).toBe('Alice');
  });

  it('不应该创建重名用户', () => {
    userService.create('Bob');
    expect(() => userService.create('Bob')).toThrow();
  });
});
```

### 🎭 模拟（Mock）外部依赖

模拟是单元测试的关键技术，用于隔离被测代码。Vitest 提供了强大的 `vi`工具进行模拟。

**1. 模拟一个函数**

```ts
import { vi, describe, it, expect } from 'vitest';

// 模拟一个函数
const fetchData = vi.fn(); // 创建一个空的模拟函数
// 设置模拟函数的返回值
fetchData.mockReturnValueOnce('mock data'); // 仅模拟一次返回值

it('模拟函数调用', () => {
  const result = fetchData();
  expect(fetchData).toHaveBeenCalled(); // 断言函数被调用
  expect(fetchData).toHaveBeenCalledTimes(1); // 断言调用次数
  expect(result).toBe('mock data');
});
```

**2. 模拟整个模块（例如 axios）**

当你的代码调用 API 时，你肯定不希望测试真的去发送网络请求。这时可以模拟整个 `axios`模块。

```ts
// api.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { fetchUser } from './api';

// 告诉 Vitest 模拟 axios 模块
vi.mock('axios');

describe('API 模块', () => {
  beforeEach(() => {
    // 在每个测试前重置所有模拟，避免测试间相互影响
    vi.resetAllMocks();
  });

  it('成功获取用户数据', async () => {
    // 1. 准备模拟数据
    const mockUser = { id: 1, name: 'John Doe' };
    // 2. 设置 axios.get 方法在被调用时返回模拟数据
    axios.get.mockResolvedValue({ data: mockUser });

    // 3. 执行被测函数
    const user = await fetchUser(1);

    // 4. 断言函数返回了正确数据，并且 axios.get 被以正确的参数调用
    expect(user).toEqual(mockUser);
    expect(axios.get).toHaveBeenCalledWith('/users/1');
  });

  it('处理 API 请求失败', async () => {
    // 模拟请求失败
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    // 断言函数抛出了错误
    await expect(fetchUser(999)).rejects.toThrow(errorMessage);
  });
});
```

### 💡 测试 Vue 单文件组件 (SFC)

对于 Vue 组件，我们使用 `@vue/test-utils`来挂载和交互。核心思路是：渲染组件、查找元素、模拟用户交互、断言渲染结果和事件。

```vue
<!-- Counter.vue -->
<template>
  <div>
    <p data-testid="count">当前计数: {{ count }}</p>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
const increment = () => count.value++;
const decrement = () => count.value--;
</script>

```

```ts
// Counter.test.ts
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Counter from './Counter.vue';

describe('Counter.vue', () => {
  it('渲染初始计数为 0', () => {
    const wrapper = mount(Counter);
    // 通过选择器或 testid 查找元素并断言其文本内容
    expect(wrapper.find('[data-testid="count"]').text()).toContain('当前计数: 0');
  });

  it('点击增加按钮后计数加一', async () => {
    const wrapper = mount(Counter);
    // 找到按钮并触发点击事件
    await wrapper.find('button:contains("增加")').trigger('click');
    // 断言计数更新
    expect(wrapper.find('[data-testid="count"]').text()).toContain('当前计数: 1');
  });

  it('点击减少按钮后计数减一', async () => {
    const wrapper = mount(Counter);
    // 先点击一次增加，让计数变为1
    await wrapper.find('button:contains("增加")').trigger('click');
    // 再点击减少
    await wrapper.find('button:contains("减少")').trigger('click');
    expect(wrapper.find('[data-testid="count"]').text()).toContain('当前计数: 0');
  });
});
```



### 🚀 实践工作流与建议

1. **组织测试文件**：通常将测试文件放在与被测代码相邻的 `__tests__`目录下，或使用 `.test.ts`/`.spec.ts`后缀。
2. **运行测试**：在 `package.json`中配置脚本 `"test": "vitest"`，然后使用 `npm run test`运行。添加 `--watch`参数可以进入监听模式，当文件改变时自动重新运行测试。
3. **查看覆盖率**：安装配置覆盖率工具（如 `@vitest/coverage-v8`），运行 `vitest run --coverage`可以生成详细的覆盖率报告，帮助你识别未测试的代码。



## 示例文件

这里对上周的echart图表组件进行测试

```ts
// tests/SalesChart.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import SalesChart from "/src/views/SalesChart.vue";

// 完整模拟echarts模块
vi.mock("echarts", () => {
  return {
    init: vi.fn(() => ({
      setOption: vi.fn(),
      resize: vi.fn(),
      dispose: vi.fn(),
      on: vi.fn(),
      off: vi.fn(),
    })),
  };
});

describe("SalesChart.vue - 基础测试", () => {
  let wrapper: any;
  let mockChartInstance: any;
//运用  beforeEach和 afterEach这两个生命周期钩子，这是保证测试独立性的关键
  beforeEach(async () => {
    // 在每个测试前重置所有mock，这是关键！清理所有模拟，确保测试间互不干扰
    vi.clearAllMocks();

    // 创建新的模拟实例（使用 vi.mock模拟 echarts库）
    const echarts = await import("echarts");
    mockChartInstance = {
      setOption: vi.fn(),
      resize: vi.fn(),
      dispose: vi.fn(),
      // 添加其他可能用到的echarts方法
    };
    vi.mocked(echarts.init).mockReturnValue(mockChartInstance);

    //2. 挂载组件，获得操作和查询的入口，注意每次测试只挂载一次组件
    wrapper = mount(SalesChart);

    // 使用更可靠的等待方式
    await new Promise((resolve) => setTimeout(resolve, 100));
  });

  afterEach(() => {
    // 确保每次测试后清理
    if (wrapper) {
      wrapper.unmount();
    }
  });

// 断言撰写
  it("应该正确渲染出图表容器和标题", () => {
    expect(wrapper.find(".chart-container").exists()).toBe(true);
    expect(wrapper.find("h2").text()).toBe("销售数据统计");
    expect(wrapper.find(".chart").exists()).toBe(true);
  });

  it("使用默认数据时应该初始化图表", async () => {
    const echarts = await import("echarts");

    // 现在应该只被调用一次
    expect(echarts.init).toHaveBeenCalledTimes(1);
    expect(mockChartInstance.setOption).toHaveBeenCalledTimes(1);
  });

  // 测试组件的响应式更新
  it("当chartData属性变化时应该更新图表", async () => {
    // 重置调用计数，只计算更新时的调用
    mockChartInstance.setOption.mockClear();

    // 更新chartData属性,将其变为只有三个数据点的数组，是为了测试更新逻辑
    await wrapper.setProps({ chartData: [20, 25, 30] });
    //只调用一次
    expect(mockChartInstance.setOption).toHaveBeenCalledTimes(1);
    expect(mockChartInstance.setOption).toHaveBeenCalledWith({
      series: [{ data: [20, 25, 30] }],
    });
  });
});

```

# Api详解

## Config

配置信息详解

Vitest 的配置是其强大功能的核心，正确的配置能显著提升测试效率与开发体验。下面这个表格汇总了其核心配置项，方便你快速查阅。

| 配置类别           | 核心配置项     |            常用值示例            | 主要作用                                              |
| :----------------- | :------------- | :------------------------------: | :---------------------------------------------------- |
| **环境与全局设置** | `environment`  |   `jsdom`, `happy-dom`, `node`   | 设置测试运行环境，模拟浏览器或Node.js                 |
|                    | `globals`      |         `true`, `false`          | 是否全局注入`describe`, `it`, `expect`等API，简化导入 |
|                    | `setupFiles`   |        `./tests/setup.ts`        | 指定一个文件，在测试运行前执行全局初始化代码          |
| **测试匹配与执行** | `include`      |  `['**/*.{test,spec}.{js,ts}']`  | 定义哪些文件被识别为测试文件                          |
|                    | `exclude`      |        `['node_modules']`        | 排除不需要测试的文件或目录                            |
|                    | `watch`        |         `true`, `false`          | 是否启用监听模式，文件变更时自动重新运行相关测试      |
| **覆盖率报告**     | `coverage`     | `{ reporter: ['html', 'text'] }` | 配置覆盖率工具，生成多种格式的报告                    |
| **模拟与别名**     | `alias`        |        `{ '@': '/src' }`         | 设置路径别名，与Vite项目配置保持一致                  |
|                    | `restoreMocks` |         `true`, `false`          | 是否在每个测试后自动重置所有模拟（mock）              |

### 💻 环境与全局设置

这是配置的基石，决定了测试代码的运行上下文。

- **`environment`（测试环境）**：这是非常重要的一个配置。

  - **`jsdom`/ `happy-dom`**：当测试**Vue、React等组件**时，需要模拟浏览器环境（如`window`, `document`对象）。`jsdom`是功能全面的标准选择，而`happy-dom`在某些场景下可能更快 

    。

  - **`node`**：如果测试的是**纯Node.js后端逻辑或工具函数**，则应选择此环境 

    。

  ```ts
  // vite.config.ts / vitest.config.ts
  import { defineConfig } from 'vite'
  
  export default defineConfig({
    test: {
      environment: 'jsdom', // 为组件测试启用浏览器环境模拟
    },
  })
  ```

- **`globals`（全局API）**：设置为`true`后，你可以在测试文件中直接使用`describe`, `it`, `expect`等函数，而无需在每个文件里单独导入，让代码更简洁 

  。

  ```ts
  // 当 globals: true 时，可以这样写：
  describe('my test suite', () => {
    it('should work', () => {
      expect(1).toBe(1)
    })
  })
  
  // 否则，需要从 'vitest' 显式导入：
  import { describe, it, expect } from 'vitest'
  ```

- **`setupFiles`（设置文件）**：用于指定一个或多个在每个测试运行**之前**会执行的脚本。通常在这里进行全局的测试环境设置，例如配置测试库、模拟全局变量或初始化数据库连接 

  。

  ```ts
  // vitest.config.ts
  export default defineConfig({
    test: {
      setupFiles: ['./tests/setup.ts'] // 指向你的设置文件
    }
  })
  ```

  ```ts
  // tests/setup.ts 示例：扩展断言、设置全局模拟
  import '@testing-library/jest-dom/vitest' // 扩展了如.toBeInTheDocument()等DOM断言
  
  // 模拟全局函数，如浏览器API
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
  ```

### 🔍 测试匹配与执行控制

这些配置控制着哪些测试会被执行以及如何执行。

- **`include`/ `exclude`**：使用全局模式来告诉Vitest哪些文件是测试文件。通常设置为匹配如`**/*.{test,spec}.{js,ts,jsx,tsx}`的模式，并排除`node_modules`等目录 

  。

- **`watch`（监听模式）**：在开发过程中，将此选项设置为`true`（或直接使用`vitest`命令，因为watch模式默认开启）非常有用。当你修改源代码或测试文件时，Vitest会自动重新运行相关的测试，提供即时反馈 

  。

### 📊 覆盖率报告

覆盖率工具帮助你了解测试是否全面覆盖了业务代码。

- **`coverage`（覆盖率配置）**：需要先安装覆盖率依赖（如`@vitest/coverage-v8`）。启用后，Vitest会分析测试执行过程中哪些代码行、函数、分支和语句被覆盖到了 

  。

  ```npm
  # 安装覆盖率工具
  npm install -D @vitest/coverage-v8
  ```

  ```ts
  // vitest.config.ts
  export default defineConfig({
    test: {
      coverage: {
        provider: 'v8', // 或 'istanbul'
        reporter: ['text', 'html', 'json'], // 在控制台、HTML文件等多种格式输出报告
        reportsDirectory: './coverage', // 报告输出目录
        exclude: ['tests/**'], // 排除测试文件本身
      }
    }
  })
  ```

  运行`vitest run --coverage`即可生成报告。HTML报告通常最直观，可以清晰地看到每个文件的覆盖情况。

### 🛠️ 高级与框架集成配置

- **路径别名（`alias`）**：为了让测试中的模块导入路径与你的Vite项目配置保持一致，需要配置相同的别名。这通常在Vite的`resolve.alias`中配置，Vitest会继承或需要你单独指定 

  。

  ```ts
  // vite.config.ts
  import { defineConfig } from 'vite'
  import path from 'node:path'
  
  export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      // ... 其他测试配置
    }
  })
  ```

- **处理CSS等静态资源**：在测试中引入CSS或Vue单文件组件时，可能会遇到`Unknown file extension`错误。这是因为Vitest需要知道如何处理这些非JS/TS资源。解决方案是确保已安装并配置了对应的Vite插件（如`@vitejs/plugin-vue`），并且测试配置正确关联了Vite的主配置 

  。

  ```ts
  // vitest.config.ts 应正确继承或合并 vite.config.ts 的配置
  import { defineConfig } from 'vitest/config'
  import vue from '@vitejs/plugin-vue'
  
  export default defineConfig({
    plugins: [vue()], // 确保处理.vue文件的插件已配置
    test: {
      // ... 其他测试配置
    }
  })
  ```

## TestApi

Vitest 提供了一套丰富而直观的测试 API，理解其核心接口的区别与适用场景，能帮助你更高效地编写测试。下面这个表格梳理了其主要的测试 API 及其核心作用。

### 🔑区别联系

|     API 分类     |                     关键 API                     |                        主要区别与作用                        |                           适用场景                           |
| :--------------: | :----------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
|   **用例定义**   |                   `test`/ `it`                   | 功能**完全相同**，均用于定义单个测试用例。`test`源自 Jest 风格，`it`源自 BDD（行为驱动开发）风格，选择其一并在团队内统一即可。 |                  定义每一个具体的测试案例。                  |
|   **测试套件**   |                    `describe`                    | 用于**组织**多个相关的测试用例（`test`/`it`）成一个组，支持嵌套，提供清晰的测试结构。 |           将同一功能模块或组件的测试用例分组管理。           |
|      **用**      |                     `.skip`                      |         **跳过**被修饰的测试用例或套件，使其不运行。         |              临时跳过尚未完成或存在问题的测试。              |
|      **例**      |                     `.only`                      |   **仅运行**被修饰的测试用例或套件，方便快速调试特定问题。   |               聚焦于单个失败或正在编写的测试。               |
|      **修**      |                     `.todo`                      | **标记**一个计划编写但尚未实现的测试用例，在测试报告中会显示为待办事项。 |                   规划测试用例，防止遗漏。                   |
|      **饰**      |                  `.concurrent`                   |    被修饰的测试用例会**并发**执行，可以显著提升测试速度。    |          适用于大量相互独立的 I/O 操作或异步测试。           |
|        符        |                  `.sequential`                   | 在已使用 `.concurrent`的套件内，确保某个测试用例**顺序**执行。 |                 需要控制执行顺序的特定测试。                 |
|                  |                     `.fails`                     | 明确表示该测试用例**预期会失败**（例如，验证代码在错误输入下会抛出异常）。 |                      测试错误处理逻辑。                      |
|  **断言与验证**  |                     `expect`                     | 断言库的入口函数，提供大量**匹配器**（Matchers）来验证结果是否符合预期。 |                验证代码的输出、行为、类型等。                |
| **生命周期钩子** | `beforeAll`/ `afterAll``beforeEach`/ `afterEach` |     用于在测试**生命周期**的特定阶段执行设置和清理代码。     | 测试前的初始化（如连接数据库）和测试后的清理（如重置状态）。 |

### 💡 核心 API 详解与使用技巧

#### 1. 组织测试的结构：`describe`和 `it`/`test`

`describe`块可以帮助你构建清晰的测试层次。你可以在其内部使用钩子函数，这些钩子的执行顺序是：外层 `beforeEach`-> 内层 `beforeEach`-> 测试用例 -> 内层 `afterEach`-> 外层 `afterEach`。

这有助于在不同层级进行公共的设置和清理。

```ts
import { describe, it, beforeEach, afterEach } from 'vitest';

describe('用户管理模块', () => {
  beforeEach(() => {
    // 每个测试用例前的公共设置，例如初始化用户数据
  });

  afterEach(() => {
    // 每个测试用例后的清理工作
  });

  describe('创建用户', () => {
    it('应该能成功创建新用户', () => {
      // ... 测试逻辑
    });

    it('应该拒绝创建重复用户', () => {
      // ... 测试逻辑
    });
  });
});
```

#### 2. 精准控制测试执行：修饰符

修饰符是非常实用的调试和管理工具。

- **快速定位问题**：当某个测试失败时，可以临时使用 `it.only`只运行这个测试，快速定位和调试问题。
- **规划与备忘**：使用 `test.todo`可以记录你计划要写的测试，它们会在测试报告中显示出来，有助于管理开发进度。

```ts
// 使用 only 进行调试
it.only('这个重要的测试现在失败了，我先专注解决它', () => {
  // ...
});

// 使用 todo 进行规划
test.todo('未来需要实现: 用户头像上传的成功和失败情况');
```

#### 3. 验证行为的多样性：`expect`断言

`expect`是测试验证的核心，它提供了多种匹配器来应对不同情况：

- **严格相等**：`expect(1 + 1).toBe(2)`
- **对象内容匹配**：`expect({ name: 'Vitest' }).toEqual({ name: 'Vitest' })`
- **错误抛出**：`expect(() => { someFunction(); }).toThrow()`
- **异步代码测试**：`await expect(Promise.resolve('data')).resolves.toBe('data')`

#### 4. 管理测试环境：生命周期钩子

生命周期钩子对于保持测试的独立性和可重复性至关重要。例如，你可以在 `beforeEach`中返回一个清理函数，这相当于在该测试用例的 `afterEach`阶段执行，有助于管理紧密关联的上下文。

```ts
import { describe, it, beforeEach } from 'vitest';

describe('数据库操作', () => {
  beforeEach(() => {
    const connection = establishDBConnection();
    // 返回一个清理函数，它会在当前测试结束后执行
    return () => {
      connection.close();
    };
  });

  it('测试查询', () => {
    // ... 使用连接进行测试
  }); // 测试结束后，连接会自动关闭
});
```

### 💎 实践建议

在实际项目中，结合 **`describe`**进行分组，善用 **`.skip`**、**`.only`**和 **`.todo`**来管理测试执行与规划，并利用生命周期钩子保持测试的整洁，这将极大提升你的测试效率和代码质量。

希望这些解释能帮助你更好地理解和运用 Vitest 的测试 API！如果你对某个特定的 API 或场景有更深入的疑问，我们可以继续探讨。

## MockApi

Vitest 提供了一套强大而灵活的 Mock API，用于在测试中模拟外部依赖、控制时间、拦截函数调用等。

### 📊 Vitest Mock API 概览

| API 分类       | 核心 API             | 主要作用                               | 适用场景                        |
| -------------- | -------------------- | -------------------------------------- | ------------------------------- |
| **函数模拟**   | `vi.fn()`            | 创建**可跟踪**的模拟函数，记录调用信息 | 模拟回调函数、事件处理器        |
| **模块模拟**   | `vi.mock()`          | 模拟整个模块的导入行为                 | 替换第三方库、外部依赖          |
| **对象监视**   | `vi.spyOn()`         | 监视对象方法调用，可选择是否模拟实现   | 验证特定方法是否被调用          |
| **定时器控制** | `vi.useFakeTimers()` | 模拟时间相关函数                       | 测试 setTimeout、setInterval 等 |
| **日期时间**   | `vi.setSystemTime()` | 固定系统时间                           | 测试时间相关逻辑                |
| **全局变量**   | `vi.stubGlobal()`    | 模拟全局变量                           | 测试 window、document 等        |

### 🔧 核心 Mock API 详解

#### 1. `vi.fn()`- 函数模拟

创建可跟踪的模拟函数，用于验证函数是否被调用、调用参数等信息。

```ts
import { vi, describe, it, expect } from 'vitest'

// 基础用法
const mockCallback = vi.fn()
mockCallback('hello', 123)

// 验证调用情况
expect(mockCallback).toHaveBeenCalled()
expect(mockCallback).toHaveBeenCalledWith('hello', 123)
expect(mockCallback).toHaveBeenCalledTimes(1)

// 设置返回值
const mockFn = vi.fn()
  .mockReturnValue('default value')           // 固定返回值
  .mockResolvedValue('async value')          // 异步返回值
  .mockImplementation((x, y) => x + y)       // 自定义实现

// 链式调用示例
const mockService = vi.fn()
  .mockReturnValueOnce('first call')          // 第一次调用返回
  .mockReturnValueOnce('second call')         // 第二次调用返回
  .mockReturnValue('default value')          // 后续调用返回

expect(mockService()).toBe('first call')
expect(mockService()).toBe('second call')
expect(mockService()).toBe('default value')
```

#### 2. `vi.mock()`- 模块模拟

模拟整个模块，适用于替换第三方库或外部依赖。

```ts
// 模拟整个模块
vi.mock('axios', () => ({
  get: vi.fn(() => Promise.resolve({ data: 'mocked data' })),
  post: vi.fn(() => Promise.reject(new Error('Network error')))
}))

// 在测试文件中使用
import axios from 'axios'
import { fetchUser } from './userService'

it('应该模拟axios调用', async () => {
  const user = await fetchUser(1)
  expect(axios.get).toHaveBeenCalledWith('/users/1')
  expect(user).toBe('mocked data')
})

// 使用 __mocks__ 目录的自动模拟
// 创建 __mocks__/api.js
vi.mock('./api') // 会自动查找 __mocks__/api.js
```

#### 3. `vi.spyOn()`- 对象方法监视

监视对象方法调用，可以选择是否替换原始实现。

```ts
import { vi, describe, it, expect } from 'vitest'

const api = {
  fetchData: () => 'real data',
  saveData: (data) => `saved: ${data}`
}

describe('spyOn 示例', () => {
  it('应该监视方法调用但不改变实现', () => {
    const spy = vi.spyOn(api, 'fetchData')
    
    const result = api.fetchData('test')
    
    expect(spy).toHaveBeenCalledWith('test')
    expect(result).toBe('real data') // 原始实现仍有效
    
    spy.mockRestore() // 清理spy
  })
  
  it('可以替换方法实现', () => {
    const spy = vi.spyOn(api, 'fetchData')
      .mockImplementation(() => 'mocked data')
    
    const result = api.fetchData()
    
    expect(result).toBe('mocked data')
    spy.mockRestore()
  })
})
```

#### 4. 定时器模拟

控制时间相关的函数，避免测试中的真实等待。

```ts
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('定时器测试', () => {
  beforeEach(() => {
    vi.useFakeTimers() // 启用假定时器
  })
  
  afterEach(() => {
    vi.useRealTimers() // 恢复真实定时器
  })
  
  it('测试 setTimeout', () => {
    const callback = vi.fn()
    
    setTimeout(callback, 1000)
    expect(callback).not.toHaveBeenCalled()
    
    vi.advanceTimersByTime(1000) // 快进1秒
    expect(callback).toHaveBeenCalled()
  })
  
  it('测试 setInterval', () => {
    const callback = vi.fn()
    
    setInterval(callback, 1000)
    
    vi.advanceTimersByTime(3000) // 快进3秒
    expect(callback).toHaveBeenCalledTimes(3)
  })
  
  it('运行所有定时器', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    
    setTimeout(callback1, 1000)
    setTimeout(callback2, 2000)
    
    vi.runAllTimers() // 运行所有定时器
    expect(callback1).toHaveBeenCalled()
    expect(callback2).toHaveBeenCalled()
  })
})
```

#### 5. 日期时间模拟

固定系统时间，确保时间相关测试的一致性。

```ts
import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest'

describe('日期时间测试', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    // 固定为特定日期
    vi.setSystemTime(new Date('2024-01-01'))
  })
  
  afterEach(() => {
    vi.useRealTimers()
  })
  
  it('应该模拟当前时间', () => {
    const now = new Date()
    expect(now.getFullYear()).toBe(2024)
    expect(now.getMonth()).toBe(0) // 0 = 一月
    expect(now.getDate()).toBe(1)
  })
  
  it('测试时间相关逻辑', () => {
    const isNewYear = () => {
      const today = new Date()
      return today.getMonth() === 0 && today.getDate() === 1
    }
    
    expect(isNewYear()).toBe(true)
  })
})
```

### 🎯 实际应用场景

#### 场景1：模拟 API 调用

```ts
// userService.test.js
import { vi, describe, it, expect } from 'vitest'
import { fetchUser, createUser } from './userService'

// 模拟 API 模块
vi.mock('./api', () => ({
  http: {
    get: vi.fn(),
    post: vi.fn()
  }
}))

import { http } from './api'

describe('用户服务测试', () => {
  it('成功获取用户', async () => {
    // 模拟成功响应
    http.get.mockResolvedValue({ 
      data: { id: 1, name: '张三' } 
    })
    
    const user = await fetchUser(1)
    
    expect(http.get).toHaveBeenCalledWith('/users/1')
    expect(user.name).toBe('张三')
  })
  
  it('处理API错误', async () => {
    // 模拟错误响应
    http.get.mockRejectedValue(new Error('网络错误'))
    
    await expect(fetchUser(1)).rejects.toThrow('网络错误')
  })
})
```

#### 场景2：测试 Vue 组件中的异步操作

```ts
// UserComponent.test.js
import { vi, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserComponent from './UserComponent.vue'
import { fetchUser } from './userService'

// 模拟用户服务
vi.mock('./userService')

describe('UserComponent', () => {
  it('组件加载时应该获取用户数据', async () => {
    // 模拟异步函数返回
    fetchUser.mockResolvedValue({ name: '李四', age: 25 })
    
    const wrapper = mount(UserComponent)
    
    // 等待异步操作完成
    await new Promise(resolve => setTimeout(resolve, 0))
    
    expect(wrapper.text()).toContain('李四')
    expect(fetchUser).toHaveBeenCalledTimes(1)
  })
})
```

#### 场景3：模拟第三方库

```ts
// chartUtils.test.js
import { vi, describe, it, expect } from 'vitest'

// 模拟 echarts
vi.mock('echarts', () => ({
  init: vi.fn(() => ({
    setOption: vi.fn(),
    resize: vi.fn(),
    dispose: vi.fn()
  }))
}))

import * as echarts from 'echarts'
import { initChart } from './chartUtils'

describe('图表工具测试', () => {
  it('应该正确初始化图表', () => {
    const div = document.createElement('div')
    
    initChart(div, { data: [1, 2, 3] })
    
    expect(echarts.init).toHaveBeenCalledWith(div)
  })
})
```

### 💡 最佳实践建议

1. **及时清理模拟**：在每个测试后使用 `vi.clearAllMocks()`或 `mockFn.mockClear()`清理模拟状态，避免测试间相互影响。
2. **优先使用 `vi.spyOn()`**：当只需要验证方法是否被调用时，使用 `spyOn`而不是完全模拟，这样可以保留原始实现。
3. **合理组织模拟代码**：将复杂的模拟逻辑放在 `beforeEach`或单独的辅助函数中，保持测试代码整洁。
4. **避免过度模拟**：只模拟必要的依赖，让测试尽可能接近真实环境。

通过这些 Mock API 的灵活运用，你可以有效地隔离测试目标，创建稳定可靠的测试用例。

### Puls:可跟踪

在 Vitest 的测试语境中，“**可跟踪**”指的是模拟函数（Mock Function）具备的一种核心能力：它能够自动、详细地记录下关于自身被调用的所有关键信息。这就像一个内置的“飞行记录仪”或“监控摄像头”，让你能在测试结束后，精确地回放和查验这个函数究竟是如何被使用的。

#### 🔍 具体跟踪哪些信息

一个被设置为可跟踪的模拟函数（通常通过 `vi.fn()`创建），主要会记录以下几类信息：

| 跟踪的信息       | 说明                                                   | 测试中常用的验证方法                             |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------ |
| **是否被调用**   | 记录函数是否被调用过，以及被调用的总次数。             | `.toHaveBeenCalled()``.toHaveBeenCalledTimes(n)` |
| **调用时的参数** | 记录每次调用时，传入的具体参数是什么。                 | `.toHaveBeenCalledWith(arg1, arg2...)`           |
| **返回值**       | 记录函数每次调用后返回了什么值。                       | `.toHaveReturnedWith(value)`                     |
| **调用上下文**   | 记录函数被调用时 `this`的指向。                        | 通过访问 mock 属性查看                           |
| **调用顺序**     | 当多个模拟函数存在时，可以结合其他工具验证其调用顺序。 | -                                                |

#### 💡 为什么“可跟踪”很重要

这种可跟踪的特性是单元测试能够**隔离**和**精确断言**的关键。它允许你将测试焦点完全放在被测试的代码单元上，而不需要关心其内部依赖的函数的具体实现。你只需要断言：“我期望这个依赖函数被以某种特定方式调用”，然后通过可跟踪的模拟函数来验证这一期望是否达成。

#### 🛠️ 简单代码示例

下面的代码展示了如何利用可跟踪的模拟函数进行测试。

```
import { vi, describe, it, expect } from 'vitest';

// 一个待测试的函数，它接受一个回调函数作为参数
function doSomethingAndCallBack(data, callback) {
  // 一些业务逻辑...
  if (data.isValid) {
    callback('success', data.value); // 在特定条件下调用回调函数
  }
}

describe('可跟踪的模拟函数', () => {
  it('应该正确记录回调函数的调用情况', () => {
    // 1. 创建一个可跟踪的模拟函数来模拟回调
    const mockCallback = vi.fn(); 

    // 2. 执行被测函数，并传入模拟回调
    doSomethingAndCallBack({ isValid: true, value: 100 }, mockCallback);

    // 3. 利用可跟踪性进行断言
    expect(mockCallback).toHaveBeenCalled(); // 断言回调函数被调用了
    expect(mockCallback).toHaveBeenCalledTimes(1); // 断言回调函数被调用了一次
    expect(mockCallback).toHaveBeenCalledWith('success', 100); // 断言回调函数被调用时传入了正确的参数
  });
});
```

#### 💎 总结

简单来说，在测试中，“可跟踪”就是给函数装上“监控”，让它能**自动记录下自己的每一次行动**。测试者则可以依据这些详细的“行动记录”（调用信息），来验证代码的行为是否完全符合预期，从而保证测试的**精准性和可靠性**。

希望这个解释能帮你更好地理解这个概念！

## 覆盖率报告

Vitest 的配置是其强大功能的核心，正确的配置能显著提升测试效率与开发体验。下面这个表格汇总了其核心配置项，方便你快速查阅。

| 配置类别           | 核心配置项     | 常用值示例                       | 主要作用                                              |
| :----------------- | :------------- | :------------------------------- | :---------------------------------------------------- |
| **环境与全局设置** | `environment`  | `jsdom`, `happy-dom`, `node`     | 设置测试运行环境，模拟浏览器或Node.js                 |
|                    | `globals`      | `true`, `false`                  | 是否全局注入`describe`, `it`, `expect`等API，简化导入 |
|                    | `setupFiles`   | `./tests/setup.ts`               | 指定一个文件，在测试运行前执行全局初始化代码          |
| **测试匹配与执行** | `include`      | `['**/*.{test,spec}.{js,ts}']`   | 定义哪些文件被识别为测试文件                          |
|                    | `exclude`      | `['node_modules']`               | 排除不需要测试的文件或目录                            |
|                    | `watch`        | `true`, `false`                  | 是否启用监听模式，文件变更时自动重新运行相关测试      |
| **覆盖率报告**     | `coverage`     | `{ reporter: ['html', 'text'] }` | 配置覆盖率工具，生成多种格式的报告                    |
| **模拟与别名**     | `alias`        | `{ '@': '/src' }`                | 设置路径别名，与Vite项目配置保持一致                  |
|                    | `restoreMocks` | `true`, `false`                  | 是否在每个测试后自动重置所有模拟（mock）              |

### 💻 环境与全局设置

这是配置的基石，决定了测试代码的运行上下文。

- **`environment`（测试环境）**：这是非常重要的一个配置。

  - **`jsdom`/ `happy-dom`**：当测试**Vue、React等组件**时，需要模拟浏览器环境（如`window`, `document`对象）。`jsdom`是功能全面的标准选择，而`happy-dom`在某些场景下可能更快 。
  - **`node`**：如果测试的是**纯Node.js后端逻辑或工具函数**，则应选择此环境 。

  ```ts
  // vite.config.ts / vitest.config.ts
  import { defineConfig } from 'vite'
  
  export default defineConfig({
    test: {
      environment: 'jsdom', // 为组件测试启用浏览器环境模拟
    },
  })
  ```

- **`globals`（全局API）**：设置为`true`后，你可以在测试文件中直接使用`describe`, `it`, `expect`等函数，而无需在每个文件里单独导入，让代码更简洁 

  。

  ```ts
  // 当 globals: true 时，可以这样写：
  describe('my test suite', () => {
    it('should work', () => {
      expect(1).toBe(1)
    })
  })
  
  // 否则，需要从 'vitest' 显式导入：
  import { describe, it, expect } from 'vitest'
  ```

- **`setupFiles`（设置文件）**：用于指定一个或多个在每个测试运行**之前**会执行的脚本。通常在这里进行全局的测试环境设置，例如配置测试库、模拟全局变量或初始化数据库连接 

  。

  ```ts
  // vitest.config.ts
  export default defineConfig({
    test: {
      setupFiles: ['./tests/setup.ts'] // 指向你的设置文件
    }
  })
  ```

  ```ts
  // tests/setup.ts 示例：扩展断言、设置全局模拟
  import '@testing-library/jest-dom/vitest' // 扩展了如.toBeInTheDocument()等DOM断言
  
  // 模拟全局函数，如浏览器API
  window.matchMedia = vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // 废弃
    removeListener: vi.fn(), // 废弃
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }))
  ```

### 🔍 测试匹配与执行控制

这些配置控制着哪些测试会被执行以及如何执行。

- **`include`/ `exclude`**：使用全局模式来告诉Vitest哪些文件是测试文件。通常设置为匹配如`**/*.{test,spec}.{js,ts,jsx,tsx}`的模式，并排除`node_modules`等目录 

  。

- **`watch`（监听模式）**：在开发过程中，将此选项设置为`true`（或直接使用`vitest`命令，因为watch模式默认开启）非常有用。当你修改源代码或测试文件时，Vitest会自动重新运行相关的测试，提供即时反馈 

  。

### 📊 覆盖率报告

覆盖率工具帮助你了解测试是否全面覆盖了业务代码。

- **`coverage`（覆盖率配置）**：需要先安装覆盖率依赖（如`@vitest/coverage-v8`）。启用后，Vitest会分析测试执行过程中哪些代码行、函数、分支和语句被覆盖到了 

  。

  ```cmd
  # 安装覆盖率工具
  npm install -D @vitest/coverage-v8
  ```

  ```ts
  // vitest.config.ts
  export default defineConfig({
    test: {
      coverage: {
        provider: 'v8', // 或 'istanbul'
        reporter: ['text', 'html', 'json'], // 在控制台、HTML文件等多种格式输出报告
        reportsDirectory: './coverage', // 报告输出目录
        exclude: ['tests/**'], // 排除测试文件本身
      }
    }
  })
  ```

  运行`vitest run --coverage`即可生成报告。HTML报告通常最直观，可以清晰地看到每个文件的覆盖情况。

### 🛠️ 高级与框架集成配置

- **路径别名（`alias`）**：为了让测试中的模块导入路径与你的Vite项目配置保持一致，需要配置相同的别名。这通常在Vite的`resolve.alias`中配置，Vitest会继承或需要你单独指定 

  。

  ```ts
  // vite.config.ts
  import { defineConfig } from 'vite'
  import path from 'node:path'
  
  export default defineConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      // ... 其他测试配置
    }
  })
  ```

- **处理CSS等静态资源**：在测试中引入CSS或Vue单文件组件时，可能会遇到`Unknown file extension`错误。这是因为Vitest需要知道如何处理这些非JS/TS资源。解决方案是确保已安装并配置了对应的Vite插件（如`@vitejs/plugin-vue`），并且测试配置正确关联了Vite的主配置 

  。

  ```ts
  // vitest.config.ts 应正确继承或合并 vite.config.ts 的配置
  import { defineConfig } from 'vitest/config'
  import vue from '@vitejs/plugin-vue'
  
  export default defineConfig({
    plugins: [vue()], // 确保处理.vue文件的插件已配置
    test: {
      // ... 其他测试配置
    }
  })
  ```

希望这份详细的配置解读能帮助你更好地驾驭Vitest！如果你对某个特定配置有更深入的疑问，我们可以继续探讨

# 组件测试 

## 🎯 测试核心思想

Vitest 组件测试的核心是验证组件在各种场景下的行为是否符合预期。测试应该关注**组件做了什么**，而不是**组件如何实现**。

### 测试金字塔原则

```
                                        /      \
                                       /端到端测试\
                                      /  集成测试  \
                                     /   组件测试   \
                                    /    单元测试    \
                                   /_________________\
```

组件测试处于测试金字塔的中层，既要保证覆盖关键功能，又要保持测试速度。

## 📋 完整测试流程

### 1. 环境搭建与配置

首先安装必要依赖并配置测试环境：

```
# 安装核心依赖
npm install -D vitest @vue/test-utils happy-dom
```

在 `vite.config.ts`中配置：

```
/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom', // 模拟浏览器环境
    globals: true, // 启用全局API
    setupFiles: './tests/setup.ts' // 可选全局配置
  }
})
```

### 2. 测试文件结构组织

采用清晰的测试文件组织结构：

```
src/
  components/
    MyComponent.vue
    __tests__/
      MyComponent.test.ts
tests/
  setup.ts          # 全局测试配置
  mocks/            # 模拟数据
```

## 🔍 测试编写逻辑模式

### AAA 模式（准备-执行-断言）

这是最基础的测试结构，每个测试用例都应遵循此模式：

```
it('应该正确渲染组件', () => {
  // Arrange (准备)：设置测试环境
  const wrapper = mount(MyComponent, {
    props: { title: '测试标题' }
  })
  
  // Act (执行)：触发行为
  await wrapper.find('button').trigger('click')
  
  // Assert (断言)：验证结果
  expect(wrapper.find('h1').text()).toBe('测试标题')
})
```

## 🧪 核心测试场景实现

### 1. 组件渲染测试

验证组件是否能正确渲染和显示内容：

```
describe('组件渲染测试', () => {
  it('应该正确渲染静态内容', () => {
    const wrapper = mount(MyComponent)
    expect(wrapper.find('.container').exists()).toBe(true)
    expect(wrapper.text()).toContain('预期文本')
  })
  
  it('应该根据props正确渲染', () => {
    const wrapper = mount(MyComponent, {
      props: { message: '自定义消息' }
    })
    expect(wrapper.text()).toContain('自定义消息')
  })
})
```

### 2. 用户交互测试

模拟用户操作并验证组件响应：

```
describe('用户交互测试', () => {
  it('点击按钮应该触发事件', async () => {
    const wrapper = mount(MyComponent)
    const button = wrapper.find('button')
    
    await button.trigger('click')
    
    expect(wrapper.emitted('click')).toBeTruthy()
    expect(wrapper.emitted('click')[0]).toEqual([/* 预期参数 */])
  })
  
  it('表单输入应该更新数据', async () => {
    const wrapper = mount(MyComponent)
    const input = wrapper.find('input')
    
    await input.setValue('新值')
    
    expect(wrapper.vm.inputValue).toBe('新值')
  })
})
```

### 3. 数据响应性测试

测试Vue的响应式系统：

```
it('数据变化应该更新UI', async () => {
  const wrapper = mount(MyComponent)
  
  // 直接修改组件数据
  await wrapper.setData({ count: 5 })
  await nextTick() // 等待DOM更新
  
  expect(wrapper.find('.count').text()).toBe('5')
})
```

### 4. 生命周期测试

验证组件挂载、更新和卸载行为：

```
describe('生命周期测试', () => {
  it('挂载时应该初始化资源', () => {
    const initSpy = vi.spyOn(MyComponent.methods, 'init')
    mount(MyComponent)
    expect(initSpy).toHaveBeenCalled()
  })
  
  it('卸载时应该清理资源', () => {
    const disposeSpy = vi.spyOn(MyComponent.methods, 'dispose')
    const wrapper = mount(MyComponent)
    
    wrapper.unmount()
    
    expect(disposeSpy).toHaveBeenCalled()
  })
})
```

## 🎭 模拟(Mock)策略

### 外部依赖模拟

模拟API调用、第三方库等外部依赖：

```
// 模拟API模块
vi.mock('@/api/user', () => ({
  fetchUser: vi.fn(() => Promise.resolve({ name: '测试用户' }))
}))

// 模拟整个库
vi.mock('echarts', () => ({
  init: vi.fn(() => ({
    setOption: vi.fn(),
    dispose: vi.fn()
  }))
}))
```

### 组件模拟

模拟子组件以隔离测试：

```
const wrapper = mount(ParentComponent, {
  global: {
    stubs: {
      ChildComponent: {
        template: '<div class="mocked-child"></div>'
      }
    }
  }
})
```

## 📊 高级测试技巧

### 1. 异步操作测试

处理组件中的异步逻辑：

```
it('应该处理异步数据加载', async () => {
  const wrapper = mount(AsyncComponent)
  
  // 初始加载状态
  expect(wrapper.find('.loading').exists()).toBe(true)
  
  // 等待异步操作完成
  await flushPromises()
  
  // 验证加载完成后的状态
  expect(wrapper.find('.loading').exists()).toBe(false)
  expect(wrapper.find('.content').exists()).toBe(true)
})
```

### 2. 路由和状态管理测试

测试与Vue Router和Pinia/Vuex集成的组件：

```
it('应该处理路由导航', async () => {
  const router = createRouter({ /* 路由配置 */ })
  const pinia = createPinia()
  
  const wrapper = mount(Component, {
    global: {
      plugins: [router, pinia]
    }
  })
  
  await wrapper.find('a').trigger('click')
  await router.isReady()
  
  expect(wrapper.find('.new-page').exists()).toBe(true)
})
```

## 🚀 测试优化策略

### 1. 测试组织最佳实践

- **单一职责**：每个测试只验证一个功能点
- **描述性命名**：测试名称应清晰描述测试意图
- **避免测试实现细节**：关注行为而非内部实现

### 2. 性能优化配置

```
// vitest.config.ts
export default defineConfig({
  test: {
    threads: true,     // 并行测试
    cache: true,       // 测试缓存
    isolate: true,      // 测试隔离
  }
})
```

## 📈 测试覆盖率与CI集成

### 覆盖率配置

```
// 配置覆盖率
test: {
  coverage: {
    provider: 'istanbul',
    reporter: ['text', 'html', 'json'],
    thresholds: {
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  }
}
```

### CI/CD集成

在GitHub Actions中集成测试：

```
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run test:coverage
```

## 💡 实用建议总结

1. **从简单开始**：先测试核心功能，再逐步增加复杂度
2. **测试用户行为**：模拟真实用户操作流程
3. **保持测试独立**：每个测试不应该依赖其他测试的状态
4. **定期重构测试**：随着组件演进，同步更新测试代码



