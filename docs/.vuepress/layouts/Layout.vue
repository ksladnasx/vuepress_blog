<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import { useRoute } from "vuepress/client";
import { computed } from "vue";

const route = useRoute();

// 仅在文章正文页显示评论区（路径以 /posts/ 开头且不是列表页）
const showComment = computed(() => {
  const path = route.path;
  if (!path.startsWith("/posts/")) return false;
  const rest = path.replace(/^\/posts\/?/, "").replace(/\/$/, "");
  return rest.length > 0;
});
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <div v-if="showComment" class="comment-wrapper">
        <!-- 评论插件在 client 中全局注册的组件 -->
        <CommentService />
      </div>
    </template>
  </ParentLayout>
</template>

<style scoped>
.comment-wrapper {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid var(--c-border);
}
</style>
