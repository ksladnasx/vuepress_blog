<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useRouter } from 'vuepress/client'
import { computed } from 'vue'
import FontSwitcher from '../components/FontSwitcher.vue'

const router = useRouter()
const timelines = useBlogType('timeline')

const filteredItems = computed(() =>
  (timelines.value?.items ?? []).filter(
    (item) =>
      item?.path &&
      item?.info &&
      !item.path.includes('/posts/codes/') &&
      !item.path.includes('/posts/meaningless/'),
  ),
)

const goTo = (path) => {
  if (path) router.push(path)
}

const formatDate = (date) => {
  if (!date) return '未注明'

  return new Date(date).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}

const toDateTime = (date) => {
  if (!date) return undefined
  return new Date(date).toISOString()
}

const getCategory = (info) => {
  const category = info?.category

  if (Array.isArray(category)) return category[0] || ''
  return category || ''
}

const cleanExcerpt = (excerpt) => {
  const text = String(excerpt || '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim()

  return text || '保留问题背景、处理过程和最终结论。'
}
</script>

<template>
  <ParentLayout>
    <template #navbar-after>
      <FontSwitcher />
    </template>

    <template #page>
      <main class="timeline-page">
        <section class="timeline-wrapper">
          <header class="timeline-hero">
            <p class="timeline-kicker">Timeline</p>
            <h1 class="timeline-title">时间线</h1>
            <p class="timeline-desc">
              按时间顺序回看 {{ filteredItems.length }} 篇笔记，保留学习和项目推进的轨迹。
            </p>
          </header>

          <div v-if="!filteredItems.length" class="timeline-empty">
            暂无可展示的时间线内容。
          </div>

          <div v-else class="timeline-track">
            <article
              v-for="({ info, path }, index) in filteredItems"
              :key="path"
              class="timeline-item"
              :class="{ 'is-right': index % 2 === 1 }"
              tabindex="0"
              @click="goTo(path)"
              @keydown.enter.prevent="goTo(path)"
              @keydown.space.prevent="goTo(path)"
            >
              <div class="timeline-node" aria-hidden="true">
                <span />
              </div>

              <div class="timeline-card">
                <time class="timeline-date" :datetime="toDateTime(info?.date)">
                  {{ formatDate(info?.date) }}
                </time>

                <h2>{{ info?.title || '未命名文章' }}</h2>

                <p class="timeline-excerpt">
                  {{ cleanExcerpt(info?.excerpt) }}
                </p>

                <div class="timeline-meta">
                  <span v-if="getCategory(info)" class="timeline-category">
                    {{ getCategory(info) }}
                  </span>

                  <span v-if="info?.tag?.length" class="timeline-tags">
                    <span v-for="tag in info.tag.slice(0, 3)" :key="tag">
                      {{ tag }}
                    </span>
                  </span>
                </div>
              </div>
            </article>
          </div>
        </section>
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss" scoped>
.timeline-page {
  min-height: calc(100vh - var(--navbar-height));
  background: transparent;
}

.timeline-wrapper {
  box-sizing: border-box;
  width: min(1120px, calc(100vw - 2rem));
  margin: 0 auto;
  padding: calc(var(--navbar-height) + 2rem) clamp(1rem, 3vw, 2.5rem) 4rem;
}

.timeline-hero {
  display: grid;
  gap: 0.45rem;
  margin-bottom: 2.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.timeline-kicker {
  margin: 0;
  color: var(--vp-c-accent);
  font-size: calc(var(--xh-font-size) * 0.82);
  font-weight: 750;
}

.timeline-title {
  margin: 0;
  color: var(--vp-c-text);
  font-size: calc(var(--xh-font-size) * 2.4);
  font-weight: 820;
  line-height: 1.25;
}

.timeline-desc {
  max-width: 38rem;
  margin: 0.35rem 0 0;
  color: var(--vp-c-text-mute);
  font-size: calc(var(--xh-font-size) * 0.98);
  line-height: 1.75;
}

.timeline-empty {
  padding: 2rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-mute);
  text-align: center;
}

.timeline-track {
  position: relative;
  display: grid;
  gap: 1.25rem;
  padding: 0.5rem 0 1rem;
}

.timeline-track::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 1px;
  background: linear-gradient(
    180deg,
    transparent,
    var(--vp-c-border-hard) 10%,
    var(--vp-c-border-hard) 90%,
    transparent
  );
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 3rem minmax(0, 1fr);
  align-items: start;
  outline: none;
}

.timeline-card {
  grid-column: 1;
  position: relative;
  padding: 1rem 1.1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--xh-shadow-soft);
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.2s ease,
    background-color 0.2s ease;
}

.timeline-item.is-right .timeline-card {
  grid-column: 3;
}

.timeline-node {
  grid-column: 2;
  grid-row: 1;
  z-index: 1;
  display: grid;
  justify-items: center;
  padding-top: 1.25rem;
}

.timeline-node span {
  width: 0.85rem;
  height: 0.85rem;
  border: 3px solid var(--vp-c-accent);
  border-radius: 999px;
  background: var(--vp-c-bg);
  box-shadow: 0 0 0 6px var(--vp-c-accent-soft);
}

.timeline-item:hover .timeline-card,
.timeline-item:focus-visible .timeline-card {
  border-color: var(--vp-c-accent);
  background: var(--vp-c-bg);
  box-shadow: var(--xh-shadow-hover);
  transform: translateY(-3px);
}

.timeline-item:hover .timeline-node span,
.timeline-item:focus-visible .timeline-node span {
  background: var(--vp-c-accent);
}

.timeline-date {
  display: inline-flex;
  color: var(--vp-c-accent);
  font-family: var(--xh-system-code-font-family, Consolas, monospace);
  font-size: calc(var(--xh-font-size) * 0.78);
  font-weight: 750;
}

.timeline-card h2 {
  margin: 0.55rem 0 0.45rem;
  color: var(--vp-c-text);
  font-size: calc(var(--xh-font-size) * 1.18);
  font-weight: 760;
  line-height: 1.45;
}

.timeline-excerpt {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: calc(var(--xh-font-size) * 0.9);
  line-height: 1.65;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
}

.timeline-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.9rem;
}

.timeline-category,
.timeline-tags span {
  display: inline-flex;
  max-width: 10rem;
  padding: 0.24rem 0.55rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 999px;
  overflow: hidden;
  background: var(--vp-c-control);
  color: var(--vp-c-text-mute);
  font-size: calc(var(--xh-font-size) * 0.78);
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.timeline-category {
  border-color: transparent;
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
}

.timeline-tags {
  display: inline-flex;
  flex-wrap: nowrap;
  gap: 0.35rem;
  min-width: 0;
}

@media (max-width: 820px) {
  .timeline-wrapper {
    width: 100%;
    padding-right: 1rem;
    padding-left: 1rem;
  }

  .timeline-track {
    gap: 1rem;
  }

  .timeline-track::before {
    left: 0.7rem;
  }

  .timeline-item {
    grid-template-columns: 1.4rem minmax(0, 1fr);
    gap: 0.8rem;
  }

  .timeline-card,
  .timeline-item.is-right .timeline-card {
    grid-column: 2;
  }

  .timeline-node {
    grid-column: 1;
  }

  .timeline-title {
    font-size: calc(var(--xh-font-size) * 1.9);
  }
}
</style>
