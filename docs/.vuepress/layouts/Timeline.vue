<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { useRouter } from 'vuepress/client'
import { computed, ref, watch } from 'vue'
import FontSwitcher from '../components/FontSwitcher.vue'

const router = useRouter()
const timelines = useBlogType('timeline')
const selectedYear = ref('all')
const selectedMonth = ref('all')
const openFilter = ref('')

const filteredItems = computed(() =>
  (timelines.value?.items ?? []).filter(
    (item) =>
      item?.path &&
      item?.info &&
      !item.path.includes('/posts/codes/') &&
      !item.path.includes('/posts/meaningless/'),
  ),
)

const getYear = (date) => {
  if (!date) return ''
  const year = new Date(date).getFullYear()
  return Number.isFinite(year) ? String(year) : ''
}

const getMonth = (date) => {
  if (!date) return ''
  const month = new Date(date).getMonth() + 1
  return Number.isFinite(month) ? String(month).padStart(2, '0') : ''
}

const yearOptions = computed(() =>
  Array.from(
    new Set(filteredItems.value.map((item) => getYear(item.info?.date)).filter(Boolean)),
  ).sort((a, b) => Number(b) - Number(a)),
)

const monthOptions = computed(() => {
  const sourceItems =
    selectedYear.value === 'all'
      ? filteredItems.value
      : filteredItems.value.filter(
          (item) => getYear(item.info?.date) === selectedYear.value,
        )

  return Array.from(
    new Set(sourceItems.map((item) => getMonth(item.info?.date)).filter(Boolean)),
  ).sort((a, b) => Number(a) - Number(b))
})

const yearFilterOptions = computed(() => [
  { value: 'all', label: '全部年份' },
  ...yearOptions.value.map((year) => ({ value: year, label: `${year} 年` })),
])

const monthFilterOptions = computed(() => [
  { value: 'all', label: '全部月份' },
  ...monthOptions.value.map((month) => ({
    value: month,
    label: `${Number(month)} 月`,
  })),
])

const selectedYearLabel = computed(
  () =>
    yearFilterOptions.value.find((option) => option.value === selectedYear.value)
      ?.label || '全部年份',
)

const selectedMonthLabel = computed(
  () =>
    monthFilterOptions.value.find((option) => option.value === selectedMonth.value)
      ?.label || '全部月份',
)

const visibleItems = computed(() => {
  return filteredItems.value.filter(
    (item) =>
      (selectedYear.value === 'all' ||
        getYear(item.info?.date) === selectedYear.value) &&
      (selectedMonth.value === 'all' ||
        getMonth(item.info?.date) === selectedMonth.value),
  )
})

watch(selectedYear, () => {
  if (
    selectedMonth.value !== 'all' &&
    !monthOptions.value.includes(selectedMonth.value)
  ) {
    selectedMonth.value = 'all'
  }
})

const toggleFilter = (filterName) => {
  openFilter.value = openFilter.value === filterName ? '' : filterName
}

const chooseFilter = (filterName, value) => {
  if (filterName === 'year') {
    selectedYear.value = value
  } else {
    selectedMonth.value = value
  }

  openFilter.value = ''
}

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
      <main class="timeline-page" @click="openFilter = ''">
        <section class="timeline-wrapper">
          <header class="timeline-hero">
            <div class="timeline-hero-head">
              <div>
                <p class="timeline-kicker">Timeline</p>
                <h1 class="timeline-title">时间线</h1>
              </div>

              <div
                v-if="yearOptions.length"
                class="timeline-filters"
                @click.stop
              >
                <div class="timeline-select">
                  <span class="filter-label">年份</span>
                  <button
                    class="filter-trigger"
                    type="button"
                    :aria-expanded="openFilter === 'year'"
                    aria-haspopup="listbox"
                    @click="toggleFilter('year')"
                    @keydown.escape="openFilter = ''"
                  >
                    <span>{{ selectedYearLabel }}</span>
                    <span class="filter-arrow" aria-hidden="true" />
                  </button>

                  <Transition name="filter-pop">
                    <ul
                      v-if="openFilter === 'year'"
                      class="filter-menu"
                      role="listbox"
                    >
                      <li v-for="option in yearFilterOptions" :key="option.value">
                        <button
                          type="button"
                          class="filter-option"
                          :class="{ active: selectedYear === option.value }"
                          role="option"
                          :aria-selected="selectedYear === option.value"
                          @click="chooseFilter('year', option.value)"
                        >
                          {{ option.label }}
                        </button>
                      </li>
                    </ul>
                  </Transition>
                </div>

                <div class="timeline-select">
                  <span class="filter-label">月份</span>
                  <button
                    class="filter-trigger"
                    type="button"
                    :aria-expanded="openFilter === 'month'"
                    aria-haspopup="listbox"
                    @click="toggleFilter('month')"
                    @keydown.escape="openFilter = ''"
                  >
                    <span>{{ selectedMonthLabel }}</span>
                    <span class="filter-arrow" aria-hidden="true" />
                  </button>

                  <Transition name="filter-pop">
                    <ul
                      v-if="openFilter === 'month'"
                      class="filter-menu"
                      role="listbox"
                    >
                      <li v-for="option in monthFilterOptions" :key="option.value">
                        <button
                          type="button"
                          class="filter-option"
                          :class="{ active: selectedMonth === option.value }"
                          role="option"
                          :aria-selected="selectedMonth === option.value"
                          @click="chooseFilter('month', option.value)"
                        >
                          {{ option.label }}
                        </button>
                      </li>
                    </ul>
                  </Transition>
                </div>
              </div>
            </div>

            <p class="timeline-desc">
              按时间顺序回看 {{ visibleItems.length }} 篇笔记，保留学习和项目推进的轨迹。
            </p>
          </header>

          <div v-if="!visibleItems.length" class="timeline-empty">
            暂无可展示的时间线内容。
          </div>

          <div v-else class="timeline-track">
            <article
              v-for="({ info, path }, index) in visibleItems"
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

.timeline-hero-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
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

.timeline-filters {
  display: flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 0.65rem;
}

.timeline-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  min-height: 2.25rem;
  padding: 0.25rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text-mute);
}

.filter-label {
  padding-inline-start: 0.5rem;
  font-size: calc(var(--xh-font-size) * 0.78);
  font-weight: 750;
  white-space: nowrap;
}

.filter-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.45rem;
  min-width: 7rem;
  height: 1.8rem;
  padding: 0 0.55rem;
  border: 0;
  border-radius: 6px;
  background: var(--vp-c-control);
  color: var(--vp-c-text);
  font: inherit;
  font-size: calc(var(--xh-font-size) * 0.82);
  font-weight: 750;
  outline: none;
  cursor: pointer;
}

.filter-trigger:hover,
.filter-trigger[aria-expanded="true"] {
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
}

.filter-trigger:focus-visible {
  box-shadow: inset 0 0 0 1px rgb(var(--xh-accent-rgb) / 26%);
}

.filter-arrow {
  width: 0;
  height: 0;
  border-top: 4px solid currentColor;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  opacity: 0.7;
}

.filter-menu {
  position: absolute;
  top: calc(100% + 0.45rem);
  right: 0;
  z-index: 20;
  display: grid;
  gap: 0.18rem;
  box-sizing: border-box;
  min-width: 100%;
  max-height: 16rem;
  margin: 0;
  padding: 0.35rem;
  border: 1px solid rgb(var(--xh-accent-rgb) / 16%);
  border-radius: 8px;
  overflow-y: auto;
  background: var(--vp-c-bg-elv);
  box-shadow: var(--xh-shadow-soft);
  list-style: none;
}

.filter-option {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  min-height: 2rem;
  padding: 0 0.72rem;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--vp-c-text-mute);
  font: inherit;
  font-size: calc(var(--xh-font-size) * 0.82);
  font-weight: 720;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
}

.filter-option:hover,
.filter-option.active {
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
}

.filter-option.active::after {
  content: "";
  width: 0.42rem;
  height: 0.42rem;
  margin-inline-start: 0.8rem;
  border-radius: 999px;
  background: currentColor;
}

.filter-pop-enter-active,
.filter-pop-leave-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s ease;
}

.filter-pop-enter-from,
.filter-pop-leave-to {
  opacity: 0;
  transform: translateY(-0.25rem);
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

  .timeline-hero-head {
    align-items: start;
  }
}

@media (max-width: 560px) {
  .timeline-hero-head {
    display: grid;
  }

  .timeline-filters {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
    width: 100%;
  }

  .timeline-select {
    min-width: 0;
    box-sizing: border-box;
    justify-content: space-between;
    gap: 0.3rem;
  }

  .filter-label {
    padding-inline-start: 0.35rem;
    font-size: calc(var(--xh-font-size) * 0.72);
  }

  .filter-trigger {
    min-width: 0;
    width: 100%;
    padding: 0 0.45rem;
  }

  .filter-trigger span:first-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .filter-menu {
    right: 0;
    left: auto;
  }
}
</style>
