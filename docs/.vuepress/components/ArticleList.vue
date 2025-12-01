<script setup>
import { computed } from 'vue';

const props = defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
})

// 定义一个计算属性，返回过滤后的列表
const filteredItems = computed(() => {
  // 在 <script setup> 中直接使用 props.items，不需要 this
  return props.items.filter(item => item.info && item.info.title);
});
</script>

<template>
  <div class="article-wrapper">
    <div v-if="!items.length">Nothing in here.</div>

    <article v-for="{ info, path } in filteredItems" :key="path" class="article" @click="$router.push(path)">
      <header class="title">
        {{
          (isTimeline ? `${new Date(info.date).toLocaleDateString()}: ` : '') +
          info.title
        }}
      </header>

      <hr />

      <div class="article-info">
        <span v-if="info.author" class="author">Author: {{ info.author }}</span>

        <span v-if="info.date && !isTimeline" class="date">Date: {{ new Date(info.date).toLocaleDateString() }}</span>

        <span v-if="info.category" class="category">Category: {{ info.category.join(', ') }}</span>

        <span v-if="info.tag" class="tag">Tag: {{ info.tag.join(', ') }}</span>
      </div>

      <div v-if="info.excerpt" class="excerpt" v-html="info.excerpt" />
    </article>
  </div>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';

.article-wrapper {
  @include mixins.content-wrapper;
  padding-top: calc(var(--navbar-height) + 1rem) !important;
  text-align: center;
}

.article {
  position: relative;

  box-sizing: border-box;
  width: 100%;
  margin: 0 auto 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 0.4rem;

  color: var(--vp-c-text);

  text-align: start;

  @media (max-width: 419px) {
    border-radius: 0;
  }

  &:hover {
    cursor: pointer;
  }

  .title {
    position: relative;
    display: inline-block;
    font-size: 1.28rem;
    line-height: 2rem;

    &::after {
      content: '';

      position: absolute;
      inset-inline-start: 0;
      bottom: 0;

      width: 100%;
      height: 2px;

      background: var(--vp-c-accent-bg);

      visibility: hidden;

      transition: transform var(--vp-t-transform);

      transform: scaleX(0);
    }

    &:hover::after {
      visibility: visible;
    }
  }

  .article-info {
    display: flex;
    flex-shrink: 0;

    >span {
      margin-inline-end: 0.5em;
      line-height: 1.8;
    }
  }

  .excerpt {
    h1 {
      display: none;
    }

    h2 {
      font-size: 1.2em;
    }

    h3 {
      font-size: 1.15em;
    }
  }
}
</style>
