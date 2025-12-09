<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import ArticleList from '../components/ArticleList.vue'
import { computed } from 'vue';
const articles = useBlogType('article')

// 过滤文章列表页面
// 定义一个计算属性，返回过滤后的列表，过滤条件是路径不在posts/codes/目录下或者posts/meaningless/目录下
const filteredItems = computed(() => {
  // 在 <script setup> 中直接使用 props.items，不需要 this
  return articles.value.items.filter(item => !(item.path.includes('/posts/codes/') || item.path.includes('/posts/meaningless/')));
});
const kind = 'Article'
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="filteredItems" :kind="kind"/>
      </main>
    </template>
  </ParentLayout>
</template>
