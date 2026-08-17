<script setup>
import { useBlogType } from "@vuepress/plugin-blog/client";
import { computed } from "vue";
import { useRoute } from "vuepress/client";

const route = useRoute();
const articles = useBlogType("article");

const articleItems = computed(() => articles.value?.items || []);
const currentPath = computed(() => route.path);
const normalizePath = (path = "") => {
  const normalizedPath = path.replace(/\/$/, "");

  try {
    return decodeURI(normalizedPath);
  } catch {
    return normalizedPath;
  }
};

const currentArticle = computed(() =>
  articleItems.value.find(
    (item) => normalizePath(item.path) === normalizePath(currentPath.value),
  ),
);

const normalizeCategories = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
};

const currentCategories = computed(() =>
  normalizeCategories(currentArticle.value?.info?.category),
);

const getPublishTime = (item) => {
  const time = item?.info?.date ? new Date(item.info.date).getTime() : NaN;
  return Number.isFinite(time) ? time : null;
};

const sameCategoryArticles = computed(() => {
  const categories = currentCategories.value;
  const currentPathValue = currentArticle.value?.path || currentPath.value;

  if (!categories.length) return [];

  return articleItems.value.filter(
    (item) =>
      normalizePath(item.path) !== normalizePath(currentPathValue) &&
      getPublishTime(item) !== null &&
      normalizeCategories(item.info?.category).some((category) =>
        categories.includes(category),
      ),
  );
});

const currentPublishTime = computed(() => getPublishTime(currentArticle.value));

const previousArticle = computed(() => {
  if (currentPublishTime.value === null) return null;

  return (
    sameCategoryArticles.value
      .filter((item) => getPublishTime(item) > currentPublishTime.value)
      .sort((itemA, itemB) => getPublishTime(itemA) - getPublishTime(itemB))[0] ||
    null
  );
});

const nextArticle = computed(() => {
  if (currentPublishTime.value === null) return null;

  return (
    sameCategoryArticles.value
      .filter((item) => getPublishTime(item) < currentPublishTime.value)
      .sort((itemA, itemB) => getPublishTime(itemB) - getPublishTime(itemA))[0] ||
    null
  );
});
</script>

<template>
  <nav class="article-reading-links" aria-label="文章阅读导航">
    <div class="article-reading-links-inner">
      <RouterLink
        v-if="previousArticle"
        class="article-reading-link previous"
        :to="previousArticle.path"
      >
        <span class="article-reading-link-kicker">上一篇</span>
        <span class="article-reading-link-title">{{ previousArticle.info.title }}</span>
      </RouterLink>

      <span
        v-else
        class="article-reading-link previous disabled"
        aria-disabled="true"
      >
        <span class="article-reading-link-kicker">上一篇</span>
        <span class="article-reading-link-title">暂无更新文章</span>
      </span>

      <RouterLink
        v-if="nextArticle"
        class="article-reading-link next"
        :to="nextArticle.path"
      >
        <span class="article-reading-link-kicker">下一篇</span>
        <span class="article-reading-link-title">{{ nextArticle.info.title }}</span>
      </RouterLink>

      <span
        v-else
        class="article-reading-link next disabled"
        aria-disabled="true"
      >
        <span class="article-reading-link-kicker">下一篇</span>
        <span class="article-reading-link-title">暂无更早文章</span>
      </span>
    </div>
  </nav>
</template>

<style scoped>
.article-reading-links {
  box-sizing: border-box;
  width: 100%;
  max-width: calc(var(--content-width) + 5rem);
  margin: 1.5rem auto 0;
  padding: 0;
}

.article-reading-links-inner {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.article-reading-link {
  position: relative;
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.28rem;
  overflow: hidden;
  min-height: 3.7rem;
  padding: 0.72rem 1rem;
  border: 1px solid var(--xh-reading-content-border, var(--vp-c-border));
  border-radius: 10px;
  background:
    linear-gradient(135deg, rgb(var(--xh-accent-rgb) / 13%), transparent 42%),
    linear-gradient(180deg, rgb(255 255 255 / 16%), transparent 58%),
    var(--xh-reading-content-bg, var(--vp-c-bg-elv));
  box-shadow: var(--xh-reading-content-shadow, var(--xh-shadow-soft));
  color: var(--xh-reading-text, var(--vp-c-text));
  text-decoration: none;
  isolation: isolate;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.article-reading-link::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background:
    linear-gradient(90deg, var(--vp-c-accent), transparent 36%) top left / 100% 3px no-repeat,
    radial-gradient(circle at 12% 0%, rgb(255 255 255 / 18%), transparent 11rem);
  opacity: 0.72;
  transition: opacity 0.2s ease;
}

.article-reading-link::after {
  position: absolute;
  top: 50%;
  color: var(--vp-c-accent);
  font-size: 1.35rem;
  font-weight: 760;
  line-height: 1;
  opacity: 0.78;
  transform: translateY(-50%);
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
}

.article-reading-link.previous {
  align-items: flex-start;
  padding-left: 2.4rem;
  text-align: left;
}

.article-reading-link.previous::after {
  content: "<";
  left: 1rem;
}

.article-reading-link.next {
  align-items: flex-end;
  padding-right: 2.4rem;
  background:
    linear-gradient(225deg, rgb(var(--xh-accent-rgb) / 13%), transparent 42%),
    linear-gradient(180deg, rgb(255 255 255 / 16%), transparent 58%),
    var(--xh-reading-content-bg, var(--vp-c-bg-elv));
  text-align: right;
}

.article-reading-link.next::before {
  background:
    linear-gradient(270deg, var(--vp-c-accent), transparent 36%) top right / 100% 3px no-repeat,
    radial-gradient(circle at 88% 0%, rgb(255 255 255 / 18%), transparent 11rem);
}

.article-reading-link.next::after {
  content: ">";
  right: 1rem;
}

.article-reading-link:not(.disabled):hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
  transform: translateY(-2px);
}

.article-reading-link:not(.disabled):hover::before {
  opacity: 1;
}

.article-reading-link:not(.disabled):hover::after {
  opacity: 1;
}

.article-reading-link.previous:not(.disabled):hover::after {
  transform: translate(-3px, -50%);
}

.article-reading-link.next:not(.disabled):hover::after {
  transform: translate(3px, -50%);
}

.article-reading-link.disabled {
  cursor: not-allowed;
  opacity: 0.62;
  box-shadow: none;
}

.article-reading-link.disabled::before {
  opacity: 0.35;
}

.article-reading-link-kicker {
  width: 100%;
  color: var(--xh-reading-muted, var(--vp-c-text-mute));
  font-size: 0.8rem;
  font-weight: 620;
  letter-spacing: 0;
  line-height: 1.35;
}

.article-reading-link-title {
  display: -webkit-box;
  overflow: hidden;
  width: 100%;
  min-width: 0;
  color: inherit;
  font-size: 1.05rem;
  font-weight: 720;
  line-height: 1.45;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

@media (max-width: 959px) {
  .article-reading-links {
    max-width: calc(var(--content-width) + 4rem);
  }
}

@media (max-width: 719px) {
  .article-reading-links-inner {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 419px) {
  .article-reading-links {
    max-width: calc(var(--content-width) + 3rem);
  }

  .article-reading-link {
    border-radius: 8px;
    padding: 0.68rem 0.85rem;
  }

  .article-reading-link.previous,
  .article-reading-link.next {
    padding-left: 2.15rem;
    padding-right: 2.15rem;
  }

  .article-reading-link.previous::after {
    left: 0.85rem;
  }

  .article-reading-link.next::after {
    right: 0.85rem;
  }
}
</style>
