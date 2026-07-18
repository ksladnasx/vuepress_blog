<template>
  <div class="home-dashboard">
    <section class="home-section recent-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">近期</p>
          <h2>最近在写</h2>
        </div>
        <a class="section-link" href="/article/" style="text-decoration: none;">全部文章</a>
      </div>

      <div class="update-list">
        <button
          v-for="item in recentItems"
          :key="item.path"
          class="update-item"
          type="button"
          @click="goTo(item.path)"
        >
          <span class="update-date">{{ formatDate(item.info?.date) }}</span>
          <span class="update-main">
            <span class="update-title">{{ item.info?.title || "未命名文章" }}</span>
            <span class="update-excerpt">{{ cleanExcerpt(item.info?.excerpt) }}</span>
          </span>
          <span class="update-tag">{{ getCategory(item) }}</span>
        </button>
      </div>
    </section>

    <section class="stats-section" aria-label="站点统计">
      <div v-for="stat in statCards" :key="stat.label" class="stat-card">
        <span class="stat-value">{{ stat.value }}</span>
        <span class="stat-label">{{ stat.label }}</span>
      </div>
    </section>

    <section class="home-section focus-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">方向</p>
          <h2>主要整理这些</h2>
        </div>
      </div>

      <div class="focus-grid">
        <article v-for="area in focusAreas" :key="area.title" class="focus-card">
          <span class="focus-index">{{ area.index }}</span>
          <h3>{{ area.title }}</h3>
          <p>{{ area.description }}</p>
        </article>
      </div>
    </section>

    <section class="home-section tech-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">工具</p>
          <h2>常用技术栈</h2>
        </div>
      </div>

      <div class="tech-list">
        <a
          v-for="tech in techStack"
          :key="tech.name"
          class="tech-tag"
          style="text-decoration:none;"
          :href="tech.url"
          :target="tech.external ? '_blank' : '_self'"
          :rel="tech.external ? 'noopener noreferrer' : undefined"
        >
          <img :src="tech.icon" :alt="tech.name" class="tech-icon" />
          <span>{{ tech.name }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBlogCategory, useBlogType } from "@vuepress/plugin-blog/client";
import { useRouter } from "vuepress/client";
import { computed } from "vue";

const router = useRouter();

const techStack = [
  {
    name: "Vue 3",
    icon: "https://cn.vuejs.org/logo.svg",
    url: "https://cn.vuejs.org/",
    external: true,
  },
  {
    name: "VuePress",
    icon: "https://vuepress.vuejs.org/images/hero.png",
    url: "https://vuepress.vuejs.org/",
    external: true,
  },
  {
    name: "TypeScript",
    icon: "https://www.typescriptlang.org/favicon-32x32.png",
    url: "https://www.typescriptlang.org/",
    external: true,
  },
  {
    name: "Docker",
    icon: "https://www.docker.com/wp-content/uploads/2022/03/Moby-logo.png",
    url: "https://www.docker.com/",
    external: true,
  },
  {
    name: "Nginx",
    icon: "https://nginx.org/favicon.ico",
    url: "https://nginx.org/",
    external: true,
  },
  {
    name: "Vitest",
    icon: "https://vitest.dev/logo.svg",
    url: "https://vitest.dev/",
    external: true,
  },
  {
    name: "Nuxt",
    icon: "https://nuxt.com/icon.png",
    url: "https://nuxt.com/",
    external: true,
  },
];

const focusAreas = [
  {
    index: "01",
    title: "项目复盘",
    description: "记录需求、实现、调试和部署中的真实取舍，方便后续快速回看。",
  },
  {
    index: "02",
    title: "前端工程",
    description: "沉淀 Vue、React、构建工具、测试和性能优化相关的实践笔记。",
  },
  {
    index: "03",
    title: "后端与部署",
    description: "整理接口服务、容器化、Nginx、环境配置和上线流程中的经验。",
  },
  {
    index: "04",
    title: "面试与基础",
    description: "把零散知识点按专题归档，保留推导过程和容易混淆的边界。",
  },
];

const timelines = useBlogType("timeline");
const tagMap = useBlogCategory("tag");
const categoryMap = useBlogCategory("category");

const filteredItems = computed(() =>
  (timelines.value?.items ?? []).filter(
    (item) =>
      item?.path &&
      item?.info &&
      !item.path.includes("/posts/codes/") &&
      !item.path.includes("/posts/meaningless/") &&
      !item.path.includes("/posts/interview/") &&
      !item.path.includes("/posts/classlearning/"),
  ),
);

const recentItems = computed(() => filteredItems.value.slice(0, 4));

const categoryCount = (source) => Object.keys(source.value?.map ?? {}).length;

const statCards = computed(() => [
  { value: filteredItems.value.length, label: "公开笔记" },
  { value: categoryCount(categoryMap), label: "分类" },
  { value: categoryCount(tagMap), label: "标签" },
  { value: timelines.value?.items?.length ?? 0, label: "时间线" },
]);

const goTo = (path) => {
  if (path) router.push(path);
};

const formatDate = (date) => {
  if (!date) return "未注明";

  return new Date(date).toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

const getCategory = (item) => {
  const category = item?.info?.category;

  if (Array.isArray(category)) return category[0] || "未分类";
  return category || "未分类";
};

const cleanExcerpt = (excerpt) => {
  const text = String(excerpt || "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return text || "保留问题背景、处理过程和最终结论。";
};
</script>

<style scoped>

.home-dashboard {
  --home-surface: #ffffff;
  --home-surface-soft: #f7f8f8;
  --home-border: #dfe5e1;
  --home-text: var(--vp-c-text);
  --home-muted: var(--vp-c-text-mute);
  --home-accent: #27845f;
  --home-accent-soft: rgb(39 132 95 / 10%);
  --home-cyan: #227a89;
  --home-amber: #9a6b16;
  --home-shadow: 0 10px 28px rgb(27 45 37 / 8%);

  display: grid;
  gap: clamp(2rem, 4vw, 3.5rem);
  margin-top: clamp(2rem, 4vw, 3.25rem);
  color: var(--home-text);
}

[data-theme="dark"] .home-dashboard {
  --home-surface: #202127;
  --home-surface-soft: #181a1f;
  --home-border: #363c3c;
  --home-accent: #59c08d;
  --home-accent-soft: rgb(89 192 141 / 14%);
  --home-cyan: #62b7c4;
  --home-amber: #d6a448;
  --home-shadow: 0 16px 36px rgb(0 0 0 / 24%);
}

.home-section {
  display: grid;
  gap: 1.25rem;
}

.section-heading {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 0.85rem;
  border-bottom: 1px solid var(--home-border);
}

.section-heading > div {
  min-width: 0;
}

.section-heading h2 {
  margin: 0.25rem 0 0;
  padding: 0;
  border: 0;
  color: var(--home-text);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1.35;
}

.section-kicker {
  margin: 0;
  color: var(--home-accent);
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0;
}

.section-link {
  flex: 0 0 auto;
  margin-left: auto;
  color: var(--home-muted);
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
}

.section-link:hover {
  color: var(--home-accent);
}

.update-list {
  display: grid;
  gap: 0.75rem;
}

.update-item {
  display: grid;
  grid-template-columns: 7.5rem minmax(0, 1fr) auto;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 1rem 1.1rem;
  border: 1px solid var(--home-border);
  border-radius: 8px;
  background: var(--home-surface);
  color: inherit;
  text-align: left;
  box-shadow: none;
  cursor: pointer;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;
}

.update-item:hover {
  border-color: var(--home-accent);
  background: var(--home-surface-soft);
  box-shadow: var(--home-shadow);
  transform: translateY(-2px);
}

.update-date {
  color: var(--home-muted);
  font-family: var(--xh-system-code-font-family, Consolas, monospace);
  font-size: 0.82rem;
}

.update-main {
  display: grid;
  gap: 0.25rem;
  min-width: 0;
}

.update-title {
  overflow: hidden;
  color: var(--home-text);
  font-size: 1rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.update-excerpt {
  overflow: hidden;
  color: var(--home-muted);
  font-size: 0.86rem;
  line-height: 1.5;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.update-tag {
  max-width: 8rem;
  padding: 0.28rem 0.6rem;
  border-radius: 999px;
  background: var(--home-accent-soft);
  color: var(--home-accent);
  font-size: 0.78rem;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
}

.stat-card {
  min-height: 6.5rem;
  padding: 1rem;
  border: 1px solid var(--home-border);
  border-radius: 8px;
  background: var(--home-surface);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;
}

.stat-card:hover {
  border-color: var(--home-accent);
  background: var(--home-surface-soft);
  box-shadow: var(--home-shadow);
  transform: translateY(-3px);
}

.stat-card:hover .stat-value {
  color: var(--home-cyan);
}

.stat-value {
  display: block;
  color: var(--home-accent);
  font-size: 2.15rem;
  font-weight: 800;
  line-height: 1;
}

.stat-label {
  display: block;
  margin-top: 0.7rem;
  color: var(--home-muted);
  font-size: 0.86rem;
}

.focus-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.9rem;
}

.focus-card {
  position: relative;
  min-height: 11rem;
  padding: 1.1rem;
  border: 1px solid var(--home-border);
  border-radius: 8px;
  background: var(--home-surface);
  overflow: hidden;
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;
}

.focus-card::before {
  content: "";
  position: absolute;
  inset: 0 auto 0 0;
  width: 3px;
  background: var(--home-accent);
  opacity: 0;
  transition: opacity 0.18s ease;
}

.focus-card:hover {
  border-color: var(--home-accent);
  background: var(--home-surface-soft);
  box-shadow: var(--home-shadow);
  transform: translateY(-3px);
}

.focus-card:hover::before {
  opacity: 1;
}

.focus-card:hover .focus-index {
  transform: translateY(-1px);
}

.focus-card:nth-child(2n) .focus-index {
  color: var(--home-cyan);
}

.focus-card:nth-child(3n) .focus-index {
  color: var(--home-amber);
}

.focus-index {
  display: inline-flex;
  color: var(--home-accent);
  font-family: var(--xh-system-code-font-family, Consolas, monospace);
  font-size: 0.8rem;
  font-weight: 800;
  transition: transform 0.18s ease;
}

.focus-card h3 {
  margin: 0.55rem 0 0.45rem;
  padding: 0;
  border: 0;
  color: var(--home-text);
  font-size: 1.08rem;
  font-weight: 750;
  line-height: 1.45;
}

.focus-card p {
  margin: 0;
  color: var(--home-muted);
  font-size: 0.92rem;
  line-height: 1.75;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  padding-bottom: 0.75rem;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.4rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid var(--home-border);
  border-radius: 999px;
  background: var(--home-surface);
  color: var(--home-text);
  font-size: 0.9rem;
  font-weight: 650;
  text-decoration: none;
  transition:
    border-color 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;
}

.tech-tag:hover {
  border-color: var(--home-cyan);
  background: var(--home-surface-soft);
  color: var(--home-cyan);
  transform: translateY(-1px);
}

.tech-icon {
  width: 1.15rem;
  height: 1.15rem;
  object-fit: contain;
}

[data-theme="dark"] .tech-icon {
  filter: saturate(0.95) brightness(1.08);
}

@media (max-width: 768px) {
  .section-heading {
    align-items: end;
    flex-direction: row;
    gap: 0.75rem;
  }

  .section-heading h2 {
    font-size: 1.5rem;
  }

  .update-item {
    grid-template-columns: 1fr;
    gap: 0.55rem;
  }

  .update-tag {
    max-width: 100%;
    justify-self: start;
  }

  .stats-section,
  .focus-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 480px) {
  .section-heading {
    gap: 0.6rem;
  }

  .section-heading h2 {
    font-size: 1.28rem;
  }

  .section-kicker,
  .section-link {
    font-size: 0.76rem;
  }

  .stats-section,
  .focus-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stat-card,
  .focus-card,
  .update-item {
    padding: 0.5rem;
  }
}
</style>
