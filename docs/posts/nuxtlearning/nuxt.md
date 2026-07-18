---
date: 2025-08-26
category:
  - 说明文档
tag:
  - Nuxt
  - SSR
---

# Nust项目创建


```bash
pnpm create nuxt@latest nuxt4-project
```

然后我们按照提示创建即可，默认是自带 typescript 的

# 启动项目

```
cd nuxt4-project
pnpm dev
```

> tip: 如果跑不起来 就看具体报错 并且解决（一般是依赖缺少，下一下就好了）

# 项目配置

## 初始化

1、app/app.vue 删除原来的组件

2、改造 app/app.vue

```vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
```

3、添加 app/layouts/default.vue

```vue
<template>
  <div>
    <h1 class="header">header</h1>
    <div class="main" style="min-height: 80vh">
      <slot></slot>
    </div>
    <div class="footer">footer</div>
  </div>
</template>
```

这里还没开始添加样式 后续添加

4、在 app 目录下新建 pages 文件夹，并添加 index.vue
app/pages/index.vue

```vue
<template>
  <div>Home</div>
</template>
```

这下就可以看到浏览器里显示 Home 了

5、在 pages 文件夹下添加其他页面，比如 about.vue

```vue
<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
```

tip: 尝试切换 路由 /、/about

## 添加 插件（快速开发）

### unocss

```bash
pnpm add -D unocss @unocss/nuxt
```

在 nuxt.config.ts 文件中添加如下代码

```ts
export default defineNuxtConfig({
  modules: ["@unocss/nuxt"],
});
```

然后就可以在 项目里试一试 uno.css 了

### nuxt/icon

```bash
npx nuxi module add icon
```

添加一个配置 防止 nuxt icon 请求出错
在 nuxt.config.ts 文件中添加如下代码

```ts
export default defineNuxtConfig({
  icon: {
    localApiEndpoint: "/nuxt-icon",
  },
});
```

使用 icon:

```vue
<Icon name="simple-icons:github" size="1rem" />
```

> vscode 插件（用于代码中实时预览 icon 图标）：Iconify IntelliSense
>
> Icon 的图标库（进入后复制 icon 名字然后修改 Icon 标签的 name 值）：https://icones.js.org/

### pinia

引入以进行全局的状态管理

```bash
pnpm i pinia @pinia/nuxt
```

1、在 nuxt.config.ts 文件中添加如下代码

```ts
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
});
```

2、定义 testStore 测试
app/store/index.ts

```ts
export const useTestStore = defineStore("test", {
  state: () => ({
    count: 0 as number,
  }),
  getters: {
    getCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

3、在 app/pages/index.vue 中使用

```vue
<template>
  <div class="text-3xl">
    Home
    <Icon class="mr-3" name="simple-icons:github" size="1rem" />

    <button @click="store.increment">add</button>
    {{ store.count }}
  </div>
</template>

<script setup lang="ts">
import { useTestStore } from "~/store";

const store = useTestStore();
</script>
```

## 完善 nuxt.config.ts 配置

```ts
export default defineNuxtConfig({
  compatibilityDate: "2025-08-2",
  devtools: { enabled: true },
  // 模块
  modules: ["@unocss/nuxt", "@nuxt/icon", "@pinia/nuxt"],
  app: {
    // 设置 seo ，会设置到 html 的 head 里面
    head: {
      title: "Nuxt 4",
      meta: [
        { name: "description", content: "Nuxt 4" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
  icon: {
    localApiEndpoint: "/nuxt-icon",
  },
  ssr: true, // 是否开启 ssr
  devServer: {
    // 服务端口号
    port: 3000,
  },
  css: [], // css 入口文件
  nitro: {
    // 代理，前后端分离有用
    // devProxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     prependPath: true,
    //   },
    // },
  },
});
```

## 全局写一下样式

在 根目录下 创建 app/assets/index.css

```css
html {
  font-size: 16px;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

body {
  width: 100w;
  height: 100vh;
  overflow: auto;
}

* {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}
```

在 nuxt.config.ts 中 添加全局样式

```ts
export default defineNuxtConfig({
  css: ["~/assets/index.css"],
});
```

## 优化一下布局

[app/layouts/default.vue](../app/layouts/default.vue)

```vue
<template>
  <div>
    <div
      class="fixed top-0 left-0 h-60px w-full flex justify-center items-center bg-gray-200"
    >
      <nuxt-link class="mr-2" to="/">Home </nuxt-link>
      <nuxt-link class="mr-2" to="/about">About</nuxt-link>
      <Icon name="simple-icons:github" size="1rem" />
    </div>
    <div class="pt-60px mx-auto max-w-880px">
      <div class="p-[8px] min-h-[100vh]">
        <slot></slot>
      </div>
    </div>
    <div
      class="h-20vh w-full flex flex-col justify-center items-center bg-[#d4e2ff]"
    >
      Blog
      <div>footer</div>
    </div>
  </div>
</template>
```

## 编写首页

[app/pages/index.vue](../app/pages/index.vue)

```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li
        class="w-full min-h-60px border-2 border-solid border-purple-300 mb-2 p-8 rounded-md"
        v-for="item in list"
        :key="item.id"
      >
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-2">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const list = [
  {
    id: 1,
    name: "Nuxt 4",
    desc: "Nuxt 4 is a good idea",
    content: "Lamb chops are the best 1",
  },
  {
    id: 2,
    name: "Pinia",
    desc: "Pinia is a good idea",
    content: "Lamb chops are the best 2",
  },
  {
    id: 3,
    name: "Unocss",
    desc: "Unocss is a good idea",
    content: "Lamb chops are the best 3",
  },
  {
    id: 4,
    name: "Icon",
    desc: "Icon is a good idea",
    content: "Lamb chops are the best 4",
  },
  {
    id: 5,
    name: "Tailwindcss",
    desc: "Tailwindcss is a good idea",
    content: "Lamb chops are the best 5",
  },
  {
    id: 6,
    name: "Vue",
    desc: "Vue is a good idea",
    content: "Lamb chops are the best 6",
  },
];
</script>
```

## 编写 post 详情页面

app/pages 下创建 posts 文件夹
posts 下创建 [id].vue 文件

[app/pages/posts/[id].vue](../app/pages/posts/[id].vue)

```vue
<template>
  <div>
    post detail
    {{ id }}
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

const id = route.params.id;
console.log(id);
</script>
```

## 了解 useFetch 和 $fetch

> 官方文档地址:
> [$fetch](https://nuxt.com/docs/4.x/getting-started/data-fetching#fetch)
> ，[useFetch](https://nuxt.com/docs/4.x/getting-started/data-fetching#usefetch)

useFetch 和 $fetch 都是 Nuxt 提供的用于数据获取的 API
它们之间的主要区别是：useFetch 是在服务端执行，$fetch 在服务端执行一次、客户端执行一次

一般来说，我们推荐使用 useFetch，因为 useFetch 是在服务端执行，更安全。

通常我们会使用组合方式使用他们，使用 useAsyncData 和他们组合
[useasyncdata](https://nuxt.com/docs/getting-started/data-fetching#useasyncdata)

例子：

```ts
<script setup lang="ts">
const { data: discounts, status } = await useAsyncData('cart-discount', async () => {
  const [coupons, offers] = await Promise.all([
    $fetch('/api/test'),
  ])

  return { coupons, offers }
})
</script>
```

对 useFetch 和 $fetch 二次封装感兴趣的 可以去 github 上找一些 nuxt3 的项目看看

**封装 request **

我的封装，封装的比较简单 主要是对一些请求进行前置处理和错误拦截

```ts
// 类型接口定义
export interface IHttpOptions {
  method: any;
  url: string;
  params?: any;
  data?: any;
  options?: any;
}

export interface IApiResponse<T extends any> {
  data: T;
  code: number;
  message?: string;
}

// 使用 useFetch实现的http请求方法
// 该方法包含请求和响应的拦截器
export async function http<T = any>(options: IHttpOptions): Promise<IApiResponse<T>> {
  const { url, method, params, data, options: config = {} } = options;
  const baseURL = import.meta.env.VITE_API_BASE;
// { data: res }是 ​​对象解构赋值​​ 的一种语法，其核心含义是：​​从 useFetch返回的对象中提取 data属性，并将其重命名为变量 res​​
  const { data: res }: any = await useFetch(baseURL + url, {  
    method: method,
    onRequest: ({ options }) => { //请求拦截器
      options.body = data;
      options.query = params;
      options.timeout = 10000;
      Object.assign(options, config);
    },
    onResponse: async ({ response }) => {
      console.log("response=", response._data);
      const res = response._data as IApiResponse<T>;
      const code = Number(res.code);
      if (code !== Number(import.meta.env.VITE_API_SUCCESS_CODE)) {
        throw createError({
          statusCode: response?._data.code,
          statusMessage: response?._data.message,
        });
      }

      return response;
    },
    onRequestError({ request, options, error }) {
      // 处理请求错误
      console.warn("request error", error);
    },
    onResponseError({ request, response, options }) {
      // 处理响应错误
      // console.warn('response error', response);
      throw createError({ statusCode: response.status, statusMessage: response.statusText });
    },
  });

  return res;
}

// 使用 $fetch实现的http请求方法
// 该方法包含请求和响应的拦截器
export async function $http<T = any>(options: IHttpOptions): Promise<IApiResponse<T>> {
  const { url, method, params, data, options: config = {} } = options;
  const baseURL = import.meta.env.VITE_API_BASE;

  const res = (await $fetch(baseURL + url, {
    method: method,
    onRequest: ({ options }) => {
      options.body = data;
      options.query = params;
      options.timeout = 10000;
      Object.assign(options, config);
    },
    onResponse: ({ response }) => {},
    onRequestError: (error) => {
      console.error(error);
    },
    onResponseError: (error) => {
      console.error(error);
    },
  })) as IApiResponse<T>;

  return res;
}

```

这里面用到的 VITE*API_BASE、VITE_API_SUCCESS_CODE 是写在 .env 配置文件里的，需要以 VITE* 开头，后续就可以从 import.meta.env 里获取

根目录创建一个.env 文件：

```
VITE_API_BASE=http://localhost:3000

VITE_API_SUCCESS_CODE=200
```

## 编写简单的 api

> 官网文档：[server](https://nuxt.com/docs/4.x/guide/directory-structure/server)

在与 app 文件夹同级的目录（即项目的根目录）下创建 server 文件夹
server 下 新建 `data.ts`

```ts
export const list = [
  {
    id: 1,
    name: "Nuxt 4",
    desc: "Nuxt 4 is a good idea",
    content: "Lamb chops are the best 1",
  },
  {
    id: 2,
    name: "Pinia",
    desc: "Pinia is a good idea",
    content: "Lamb chops are the best 2",
  },
  {
    id: 3,
    name: "Unocss",
    desc: "Unocss is a good idea",
    content: "Lamb chops are the best 3",
  },
  {
    id: 4,
    name: "Icon",
    desc: "Icon is a good idea",
    content: "Lamb chops are the best 4",
  },
  {
    id: 5,
    name: "Tailwindcss",
    desc: "Tailwindcss is a good idea",
    content: "Lamb chops are the best 5",
  },
  {
    id: 6,
    name: "Vue",
    desc: "Vue is a good idea",
    content: "Lamb chops are the best 6",
  },
];
```

server 下新建 api/posts/list.ts

```ts
import { list } from "../../data";

export default defineEventHandler((event) => {
  return list;
});
```

## 首页服务端渲染（SSR）

> 服务端渲染，请求会返回 html 给你
> pages/index.vue

```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li
        class="w-full min-h-60px border-2 border-solid border-purple-300 mb-2 p-8 rounded-md"
        v-for="item in data"
        :key="item.id"
      >
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-2">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const { data } = await useFetch<any>("/api/posts/list");
</script>
```

## 首页客户端渲染（CSR）

> 利用 onMounted 触发生命周期获取数据，直接 Fetch 获取数据，不会返回 html 给你
> pages/index.vue

```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li
        class="w-full min-h-60px border-2 border-solid border-purple-300 mb-2 p-8 rounded-md"
        v-for="item in data"
        :key="item.id"
      >
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-2">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const data = ref<any>([]);
async function getPosts() {
  const res = await fetch("/api/posts/list");
  return res.json();
}

onMounted(async () => {
  data.value = await getPosts();
});
</script>
```

二者区别：
_区别就在请求数据时机，ssr 是在服务端加载数据和渲染然后给 html 给客户端，csr 则是在客户端渲染完成后再加载数据_

## 实在是需要客户端渲染怎么办

使用 ClientOnly 组件包裹需要渲染的内容

## 编写 post 详情接口

创建 `api/posts/[id].ts `文件

> defineEventHandler 是定义服务端 API 的核心函数,用于创建服务端路由处理函数，封装与 HTTP 请求（如 GET、POST）相关的业务逻辑。它接收一个回调函数，该函数通过 event 对象访问请求和响应信息，并返回数据（如 JSON、Promise 或原始响应）。
> Nuxt 会自动扫描 ~/server/api 或 ~/server/routes 目录中的文件，将 defineEventHandler 定义的处理函数注册为 API 接口，接口路径就是文件的路径。

```ts
import { list } from "../../data";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}; // 从URL获取动态参数
  const post = list.find((p) => p.id === Number(id)) || null; // 模拟数据查询
  return post; // 自动转为JSON响应
});
```

## 修改 post 详情页面

[pages/posts/[id].vue](../pages/posts/[id].vue)

```vue
<template>
  <div class="p-8" v-if="data">
    <h1>{{ data.name }}</h1>
    <p>{{ data.desc }}</p>
    <p>{{ data.content }}</p>
    <button @click="() => $router.push('/')">返回</button>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();

type Post = {
  id: number;
  name: string;
  desc: string;
  content: string;
};

const { data } = await useFetch<Post>(`/api/posts/${route.params.id}`);
</script>
```

## 实现文章分页

先编写一个根据函数，规范我们的返回值，即单独抽离一个公共的方法

> 此处并未单独抽离，而是直接添加到了 data.ts 的后面
> server/utils/data.ts

```ts
export const result = (data: any) => {
  return {
    code: 200,
    message: "",
    data,
  };
};
```

api/post/list.ts

```ts
import { list,} from "../../data";
import { getQuery } from "#imports";
import { result } from "../../utils/index";

export default defineEventHandler(async (event) => {
  const { page = 1, size = 5 } = getQuery<{
    page?: number;
    size?: number;
  }>(event);

  const offset = (page - 1) * size;
  const limit = size;
  const data = {
    currentPage: Number(page),
    pageSize: Number(size),
    list: list.slice(offset, offset + limit),
    total: list.length,
  };

  return result(data);
});
```

## 首页增加分页逻辑

[app/pages/index.vue](../app/pages/index.vue)

```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li
        class="w-full min-h-40px border-2 border-solid border-purple-300 mb-2 p-4 rounded-md"
        v-for="item in data.data.list"
        :key="item.id"
      >
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-3">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
    <div class="flex justify-between">
      <div>
        <span
          v-if="page > 1"
          @click="prev"
          class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue"
          >prev</span>
      </div>
      <div>
        <span
          v-if="page < total / 5"
          @click="next"
          class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue"
        >
          next</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const page = ref(1);
const size = ref(5);
const total = ref(6);
const { data, refresh } = await useFetch<any>(
  `http://localhost:3000/api/posts/list?page=${page.value}&size=${size.value}`
);

function next() {
  page.value += 1;
  refresh();
}

function prev() {
  page.value -= 1;
  refresh();
}
</script>
```

> tip 虽然我们增加了一个分页的逻辑，但是我们无法实时的获取到正确的文章列表，
因为 useFetch 传入的 url 和参数并没有更新(useFetch只能用一次，后续参数变化并不会再用新的参数进行请求)，也就是使用了之前的参数

解决方式：</br>
1、useAsyncData + $fetch </br>
2、watch 监听 page 变化，使用 $fetch 实时请求

## 首页最后优化的结果

> 此处通过封装好的 `$http`方法（可能是基于 useFetch或 $fetch的自定义请求工具），向 /api/posts/list发起 GET 请求，传递分页参数 page和 size。
​​响应返回 res.data（即接口响应中的业务数据部分），并将其赋值给 data响应式变量，供模板渲染使用。watch进行​​分页监听​​，而 [page]选项确保当 page的值变化时（如用户点击下一页），自动触发重新请求并更新数据。

$app/pages/index.vue$
```vue
<template>
  <div class="py-3">
    <ul class="w-full">
      <li class="w-full min-h-40px border-2 border-solid border-purple-300 mb-2 p-4 rounded-md" v-for="item in list"
        :key="item.id">
        <nuxt-link :to="`/posts/${item.id}`">
          <h1 class="mb-3">{{ item.name }}</h1>
        </nuxt-link>
        <p>{{ item.desc }}</p>
      </li>
    </ul>
    <div class="flex justify-between">
      <div>
        <span v-if="page > 1" @click="prev"
          class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue">prev</span>
      </div>
      <div>
        <span v-if="hasMore" @click="next"
          class="cursor-pointer inline-block px-6 py-3 rounded-full font-bold border-2 border-solid border-purple-300 duration-300 hover:border-purple-700 hover:text-blue">
          next</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAsyncData } from "#app";
import { $http } from "~/request/index";
const page = ref(1);
const size = ref(5);

const { data } = await useAsyncData(
  "posts",
  async () => {
    // 使用之前用$fetch封装好的方法进行请求
    const res = await $http({
      url: `/api/posts/list`,
      method: "GET",
      params: {
        page: page.value,
        size: size.value,
      },
    });
    return res.data;
  },
  {
    // 监听page的变化
    watch: [page],
  }
);

const list = computed(() => data.value.list);
const hasMore = computed(() => {
  const total = data.value.total;
  return total > page.value * size.value;
});

function next() {
  page.value += 1;
}

function prev() {
  page.value -= 1;
}
</script>
```

## 详情页面改造

规范我们的返回值 </br>

$api/post/[id].ts$
```ts
import { list } from "../../data";
import { result } from "../../utils/index";
export default defineEventHandler((event) => {
  const { id } = event.context.params || {};
  const post = list.find((item) => item.id === Number(id)) || null;
  return result(post);
});
```

详情页重新对接</br>
$app/pages/posts/[id].vue$
```vue
<template>
  <div class="p-8" v-if="data">
    <h1>{{ data.name }}</h1>
    <p>{{ data.desc }}</p>
    <p>{{ data.content }}</p>
    <button @click="() => $router.push('/')">返回</button>
  </div>
</template>

<script setup lang="ts">
import { $http } from "~/request";

const route = useRoute();

type Post = {
  id: number;
  name: string;
  desc: string;
  content: string;
};

const { data } = await $http<Post>({
  method: "get",
  url: `/api/posts/${route.params.id}`,
});
</script>
```

## seo 配置

### nuxt.config.ts 中配置 app

```ts
export default defineNuxtConfig({
  app: {
    // 设置 seo ，会设置到 html 的 head 里面
    head: {
      title: "Nuxt 4",
      meta: [
        { name: "description", content: "Nuxt 4" },
        { name: "keywords", content: "Nuxt 4" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
    },
  },
});
```

### sitemap.xml
> 提供网站地图等方便搜索引擎的爬虫爬取网站</br>
先安装包：
```bash
npx nuxi@latest module add sitemap
```
然后编写我们的站点信息
api/**sitemap**/url.ts
> 利用defineSitemapEventHandler编写
```ts
// server/api/__sitemap__/urls.ts
import type { SitemapUrlInput } from "#sitemap/types";
import { list } from "../../data";

export default defineSitemapEventHandler(() => {
  return list.map((v) => {
    return {
      loc: `/posts/${v.id}`,
      lastmod: new Date().toISOString(),
      changefreq: "weekly",
      priority: 0.8,
      _sitemap: "pages",
    };
  }) satisfies SitemapUrlInput[];
});
```

然后配置到 `nuxt.config.ts` 的`defineNuxtConfig`里去

```ts
export default defineNuxtConfig({
  site: {
    url: "http://localhost:3000",
    name: "localhost",
  },
  sitemap: {
    sources: ["/api/__sitemap__/urls"],
    exclude: ["/login/**"], //指定不生成sitemap的路由
    cacheMaxAgeSeconds: 6 * 60 * 60,
    autoLastmod: true,
    // 添加更多配置
    defaults: {
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date(),
    },
    // 确保sitemap可以被搜索引擎访问
    xslColumns: [
      { label: "URL", width: "50%" },
      { label: "Last Modified", select: "sitemap:lastmod", width: "25%" },
      { label: "Priority", select: "sitemap:priority", width: "12.5%" },
      {
        label: "Change Frequency",
        select: "sitemap:changefreq",
        width: "12.5%",
      },
    ],
  },
});
```

最后打开 http://localhost:3000/sitemap.xml 就可以看到sitemap了</br></br>
🗺️[sitemap官方文档](https://nuxtseo.com/docs/sitemap/guides/dynamic-urls)


# 项目问题
## **网络问题**
网络问题：创建nuxt4项目时出现`[nuxi 15:18:45]  ERROR  Error: Failed to download template from registry: Failed to download https://raw.githubusercontent.com/nuxt/starter/templates/templates/v4.json: TypeError: fetch failed`,应该挂梯子，开加速器

## **unocss**
利用npm安装好unocss后，需要下载vscode中的unocss插件，进行代码提示。注意，插件与Tailwind CSS IntelliSense插件有冲突，需要提前禁用

## **useAsyncData**
`useAsyncData` 是 Nuxt.js 框架中用于异步数据获取的组合式函数，专为服务端渲染（SSR）和客户端水合（Hydration）场景设计。其核心目标是统一服务端与客户端的数据获取逻辑，避免重复请求，并简化响应式状态管理。以下是其核心特性和工作机制的详细解析：

---

### 🔑 1. **核心功能与定位**
• 数据水合支持：  

  在 SSR 过程中，`useAsyncData` 在服务端执行异步请求，将获取的数据直接嵌入 HTML 返回给客户端。客户端水合时复用该数据，避免二次请求，提升加载效率并减少白屏时间。
• 响应式状态管理：  

  返回一个包含 `data`、`pending`、`error` 等响应式引用的对象，开发者可直接在模板中绑定这些状态，实现加载中、错误提示等交互逻辑。
• 请求去重与缓存：  

  通过唯一键（`key`）标识请求，确保相同参数的请求在服务端和客户端仅执行一次，避免重复请求导致的性能损耗。

---

### ⚙️ 2. **核心机制与优势**
#### **参数结构**
```typescript
const { data, pending, error, refresh } = await useAsyncData(
  key: string,                // 唯一标识请求的键（可省略，自动生成）
  handler: () => Promise<T>,  // 异步函数（如调用 API）
  options?: {                 // 配置选项
    server?: boolean,         // 是否在服务端执行（默认 true）
    lazy?: boolean,           // 是否阻塞导航（默认 false，阻塞）
    watch?: WatchSource[],    // 监听的响应式变量（自动刷新数据）
    // 其他选项：immediate、transform、pick 等
  }
)
```

#### **关键特性**
• SSR/CSR 统一处理：  

  服务端执行后，数据序列化到 `payload` 中，客户端直接复用，无需重新请求。
• 自动响应式更新：  

  通过 `watch` 选项监听响应式变量（如分页参数 `page`），变化时自动触发 `handler` 重新获取数据，无需手动调用 `refresh`。
• 性能优化选项：  

  • `lazy: true`：不阻塞导航，允许先渲染页面骨架，再异步加载数据。  

  • `pick: ["title"]`：仅提取接口返回的指定字段，减少数据传输量。

• 错误处理：  

  通过 `error` 响应式引用捕获异常，结合模板展示错误信息。

---

### 📦 3. **返回值详解**
| 属性       | 类型          | 作用                                                                 |
|----------------|-------------------|-------------------------------------------------------------------------|
| `data`         | `Ref<T \| null>`  | 异步请求的结果（初始为 `null`，请求完成后更新）                          |
| `pending`      | `Ref<boolean>`    | 请求状态标识（`true` 表示加载中）                                        |
| `error`        | `Ref<Error \| null>` | 请求失败时的错误对象（成功时为 `null`）                                 |
| `refresh`      | `() => Promise<void>` | 手动重新执行 `handler` 刷新数据                                         |
| `status`       | `Ref<string>`     | 请求状态（`"idle"`、`"pending"`、`"success"`、`"error"`）               |

---

### 🚀 4. **典型应用场景**
1. 分页/筛选列表：  
   监听 `page`、`filter` 等响应式变量，自动刷新列表数据。
   ```typescript
   const page = ref(1);
   const { data: posts } = await useAsyncData(
     "posts",
     () => $fetch("/api/posts", { params: { page: page.value } }),
     { watch: [page] } // 监听 page 变化
   );
   ```

2. SEO 关键页面：  
   在服务端预取数据，确保 HTML 包含完整内容（如商品详情页）。

3. 需要缓存的低频数据：  
   通过唯一键缓存配置数据，避免重复请求（如站点全局配置）。

---

### ⚠️ 5. **注意事项**
• 唯一键必要性：  

  多组件共享数据时，需确保 `key` 全局唯一，否则可能引发缓存冲突。
• 服务端与客户端差异：  

  若需客户端专属请求（如用户敏感数据），可设置 `server: false`。
• 错误拦截：  

  在 `handler` 内使用 `try/catch` 或通过 `error` 状态统一处理异常。

---

### 💎 **总结**
`useAsyncData` 是 Nuxt SSR 项目的核心数据获取方案，通过统一服务端与客户端逻辑、响应式状态管理、请求缓存等机制，显著提升渲染效率与开发体验。其设计充分契合 SSR 框架的数据水合需求，是替代直接使用 `$fetch` 或 `axios` 的更优选择。


## defineEventHandler
源代码：
```javascript
import {list} from '../../data';
export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  // Simulate fetching post data
  const post = list.find((p) => p.id === Number(id)) || null;
  return post;
});
```

在Nuxt 3的接口开发中，`defineEventHandler` 是定义服务端API的核心函数，其作用主要体现在以下几个方面：

### 1. **定义服务端API逻辑**  
   `defineEventHandler` 用于创建服务端路由处理函数，封装与HTTP请求（如GET、POST）相关的业务逻辑。它接收一个回调函数，该函数通过 `event` 对象访问请求和响应信息，并返回数据（如JSON、Promise或原始响应）。  
   示例：  
   ```javascript
   export default defineEventHandler((event) => {
     return { message: "Hello World" }; // 直接返回JSON数据
   });
   ```

### 2. **封装事件处理上下文**  
   通过 `event` 对象提供完整的请求上下文，包括：  
   • 请求参数：动态路由参数（`event.context.params`）和查询字符串（`event.context.query`或`getQuery(event)`）。  

   • 请求体：通过 `readBody(event)` 获取POST/PUT请求的提交数据。  

   • 请求头与方法：访问 `event.req.headers`（如用户代理）和 `event.req.method`（HTTP方法）。  


### 3. **简化服务端开发流程**  
   • 自动路由注册：Nuxt 3自动扫描 `~/server/api` 或 `~/server/routes` 目录中的文件，将 `defineEventHandler` 定义的处理函数注册为API接口，无需手动配置路由。  

   • HTTP方法匹配：支持通过文件名后缀（如 `.get.ts`、`.post.ts`）区分不同HTTP方法，例如：  

     ```bash
     server/api/user.get.ts   # 处理GET /api/user
     server/api/user.post.ts  # 处理POST /api/user
     ```

### 4. **支持异步操作与错误处理**  
   • 回调函数可标记为 `async`，方便处理数据库查询、文件读写等异步任务（如示例中的 `list.find` 模拟数据查询）。  

   • 通过 `createError` 抛出结构化错误（如参数校验失败）：  

     ```javascript
     if (!id) throw createError({ statusCode: 400, message: "ID无效" });
     ```

### 5. **统一响应规范**  
   直接返回对象会被自动序列化为JSON响应（状态码200）。需自定义响应时，可使用 `setResponseStatus(event, 201)` 或 `send(event, data)`。

---

### 在用户代码中的作用  
```javascript
export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}; // 从URL获取动态参数
  const post = list.find((p) => p.id === Number(id)) || null; // 模拟数据查询
  return post; // 自动转为JSON响应
});
```
• 功能解析：  

  该接口通过 `defineEventHandler` 定义了一个动态路由（如 `/api/post/:id`），从模拟数据中根据 `id` 查询并返回结果。若未找到数据，返回 `null` 而非错误，符合API设计的灵活性。

---

总结：`defineEventHandler` 是Nuxt 3服务端API的基石，它抽象了底层HTTP处理细节，提供声明式的接口定义方式，同时通过 `event` 对象暴露完整的请求上下文，显著提升开发效率与代码可维护性。