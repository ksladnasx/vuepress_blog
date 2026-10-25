<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import { computed } from "vue";
import { useRoute } from "vuepress/client";
import { useDarkMode } from "@vuepress/theme-default/lib/client/composables/useDarkMode.js";
import SettingsEntry from "../components/SettingsEntry.vue";
import SiteSettingsEngine from "../components/SiteSettingsEngine.vue";
import ColorModeToggle from "../components/ColorModeToggle.vue";
import ReadingBackgroundMenu from "../components/ReadingBackgroundMenu.vue";
import CollapsibleSidebar from "../components/CollapsibleSidebar.vue";
import ArticleReadingLinks from "../components/ArticleReadingLinks.vue";
import TextReader from "../components/TextReader.vue";
import { useFeatureToggles } from "../composables/useFeatureToggles.js";

const route = useRoute();
const isDarkMode = useDarkMode();
const isHomePage = computed(() => route.path === "/");
const { toggles: featureToggles } = useFeatureToggles();

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
    <template #navbar-after>
      <!-- 阅读页：亮暗切换按钮换成阅读背景菜单入口 -->
      <ReadingBackgroundMenu v-if="showComment" />
      <ColorModeToggle v-else />
      <SettingsEntry />
      <SiteSettingsEngine />
    </template>

    <template #sidebar>
      <CollapsibleSidebar />
    </template>

    <template #page-bottom>
      <TextReader v-if="showComment && featureToggles.textReader" />
      <ArticleReadingLinks v-if="showComment" />
      <div v-if="showComment" class="comment-wrapper">
        <!-- 评论插件：传入 darkmode 以跟随站点明/暗主题 -->
        <CommentService :darkmode="isDarkMode" />
      </div>
    </template>
  </ParentLayout>
</template>

<style scoped>
.comment-wrapper {
  /* 与正文内容同宽：使用主题的 content-wrapper 约束 */
  max-width: var(--content-width);
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  padding: 2rem 2.5rem;
  border-top: 1px solid var(--c-border);
}

@media (max-width: 959px) {
  .comment-wrapper {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}

@media (max-width: 419px) {
  .comment-wrapper {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
</style>
