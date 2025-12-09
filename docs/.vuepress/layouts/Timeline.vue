<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import ArticleList from '../components/ArticleList.vue'
import { computed } from 'vue';
const timelines = useBlogType('timeline')

// 过滤时间线页面
// 定义一个计算属性，返回过滤后的列表，过滤条件是路径不在posts/codes/目录下或者posts/meaningless/目录下
const filteredItems = computed(() => {
  // 在 <script setup> 中直接使用 props.items，不需要 this
  return timelines.value.items.filter(item => !(item.path.includes('/posts/codes/') || item.path.includes('/posts/meaningless/')));
});

</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <ArticleList :items="filteredItems" is-timeline />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">

</style>
