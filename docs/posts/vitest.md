---
date: 2025-11-03
category:
  - 说明文档
tag:
  - Vue3
  - Vitest
  - TypeScript
---

# Vitest入门 

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

# 组件测试 

## 🎯 测试核心思想

Vitest 组件测试的核心是验证组件在各种场景下的行为是否符合预期。测试应该关注**组件做了什么**，而不是**组件如何实现**。

### 测试金字塔原则

```
/端到端测试\
   /集成测试  \
  /组件测试   \
 /单元测试   \
/___________\
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

通过遵循这些流程和逻辑，你可以建立健壮的组件测试体系，显著提升Vue应用的质量和可维护性。