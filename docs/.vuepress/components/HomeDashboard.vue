<template>
  <div class="home-dashboard">
    <section class="home-section recent-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">近期</p>
          <h2>最近在写</h2>
        </div>
        <a class="section-link" href="/article/" style="text-decoration: none !important;;">全部文章</a>
      </div>

      <div class="update-list">
        <button v-for="item in recentItems" :key="item.path" class="update-item" type="button" @click="goTo(item.path)">
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

    <section class="home-section exam-section">
      <div class="section-heading">
        <div>
          <p class="section-kicker">项目</p>
          <h2>个人项目入口</h2>
        </div>
      </div>

      <div class="exam-project-grid">
        <article class="exam-entry exam-entry-primary">
          <a class="exam-entry-main" :href="testExamUrl" aria-label="进入前端面试刷题系统">
            <span class="exam-entry-icon" aria-hidden="true">
              <img src="https://i.ibb.co/yn5XBnYC/shuati.webp" alt="" />
            </span>
            <span class="exam-entry-copy">
              <span class="exam-entry-tag">刷题系统</span>
              <strong>前端面试刷题系统</strong>
              <span>面向前端面试准备的专题练习与复盘入口。</span>
            </span>
            <span class="exam-entry-arrow" aria-hidden="true" v-html="projectIcons.arrow"></span>
            
          </a>
        </article>

        <article class="exam-entry">
          <a class="exam-entry-main" href="https://github.com/ksladnasx/vuepress_blog_plus" aria-label="查看个人博客系统抽离开源项目">
            <span class="exam-entry-icon" aria-hidden="true">
              <img src="https://i.ibb.co/spsLTy0w/blog.webp" alt="" />
            </span>
            <span class="exam-entry-copy">
              <span class="exam-entry-tag">博客系统</span>
              <strong>个人博客系统抽离开源</strong>
              <span>基于 VuePress 核心做深度定制的博客系统。</span>
            </span>
          </a>
          <span class="exam-entry-actions">
            <a class="exam-entry-action exam-entry-action-github" href="https://github.com/ksladnasx/vuepress_blog_plus" aria-label="查看 GitHub 仓库" title="GitHub">
              <span aria-hidden="true" v-html="projectIcons.github"></span>
            </a>
            <a class="exam-entry-action exam-entry-action-release" href="https://github.com/ksladnasx/vuepress_blog_plus/releases" aria-label="查看 Release" title="Release">
              <span aria-hidden="true" v-html="projectIcons.release"></span>
            </a>
          </span>
        </article>

        <article class="exam-entry">
          <a class="exam-entry-main" href="https://github.com/ksladnasx/Scrollark" aria-label="查看 Scrollark 项目">
            <span class="exam-entry-icon" aria-hidden="true">
              <img src="https://i.ibb.co/CKYtRRqC/Scrollark.webp" alt="" />
            </span>
            <span class="exam-entry-copy">
              <span class="exam-entry-tag">Scrollark</span>
              <strong>一个“刷知识”的软件</strong>
              <span>将 Markdown 文档解析为知识卡片并快速浏览。</span>
            </span>
          </a>
          <span class="exam-entry-actions">
            <a class="exam-entry-action exam-entry-action-github" href="https://github.com/ksladnasx/Scrollark" aria-label="查看 GitHub 仓库" title="GitHub">
              <span aria-hidden="true" v-html="projectIcons.github"></span>
            </a>
            <a class="exam-entry-action exam-entry-action-release" href="https://github.com/ksladnasx/Scrollark/releases" aria-label="查看 Release" title="Release">
              <span aria-hidden="true" v-html="projectIcons.release"></span>
            </a>
          </span>
        </article>
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
        <a v-for="tech in techStack" :key="tech.name" class="tech-tag" :href="tech.url"
          :target="tech.external ? '_blank' : '_self'" :rel="tech.external ? 'noopener noreferrer' : undefined"
          style="text-decoration: none !important;;">
          <img :src="tech.icon" :alt="tech.name" class="tech-icon" />
          <span>{{ tech.name }}</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useBlogCategory, useBlogType } from "@vuepress/plugin-blog/client";
import { useRouter, withBase } from "vuepress/client";
import { computed } from "vue";

const router = useRouter();
const testExamUrl = withBase("/testexam/");

const projectIcons = {
  arrow: `<svg t="1790676188994" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4862" width="25" height="25"><path d="M761.055557 532.128047c0.512619-0.992555 1.343475-1.823411 1.792447-2.848649 8.800538-18.304636 5.919204-40.703346-9.664077-55.424808L399.935923 139.743798c-19.264507-18.208305-49.631179-17.344765-67.872168 1.888778-18.208305 19.264507-17.375729 49.631179 1.888778 67.872168l316.960409 299.839269L335.199677 813.631716c-19.071845 18.399247-19.648112 48.767639-1.247144 67.872168 9.407768 9.791372 21.984142 14.688778 34.560516 14.688778 12.000108 0 24.000215-4.479398 33.311652-13.439914l350.048434-337.375729c0.672598-0.672598 0.927187-1.599785 1.599785-2.303346 0.512619-0.479935 1.056202-0.832576 1.567101-1.343475C757.759656 538.879828 759.199462 535.391265 761.055557 532.128047z" p-id="4863"></path></svg>`,
  github: `<svg t="1790676303035" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5891" width="25" height="25"><path d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z" p-id="5892"></path></svg>`,
  release: `<svg t="1790676472290" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9727" width="20" height="20"><path d="M302 223.3c-43.4 0-78.7 35.3-78.7 78.7s35.3 78.7 78.7 78.7 78.7-35.3 78.7-78.7-35.3-78.7-78.7-78.7z m0 105c-14.5 0-26.2-11.8-26.2-26.2 0-14.5 11.8-26.2 26.2-26.2 14.5 0 26.2 11.8 26.2 26.2 0 14.4-11.7 26.2-26.2 26.2z" p-id="9728"></path><path d="M912.6 541.4l-430-430c-9.8-9.8-23.2-15.4-37.1-15.4h-0.2l-296.1 0.9c-28.8 0.1-52.2 23.5-52.3 52.4l-0.9 296c0 14 5.5 27.4 15.4 37.3l430 430c10.3 10.3 23.7 15.4 37.1 15.4s26.9-5.1 37.1-15.4l297-297c20.5-20.5 20.5-53.7 0-74.2zM578.5 875.5l-430-430 0.9-296.1 295.9-0.9h0.2l430 430-297 297z" p-id="9729"></path></svg>`,
};

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
      !item.path.includes("/posts/classlearning/")&&
      !item.path.includes("/posts/interview"),
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
img {
  pointer-events: none;
}
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

.section-heading>div {
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
  text-decoration: none !important;
  ;
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

.exam-project-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.exam-entry {
  position: relative;
  display: grid;
  min-height: 7.1rem;
  padding: 0.85rem;
  border: 1px solid var(--home-border);
  border-radius: 10px;
  background:
    linear-gradient(135deg, rgb(39 132 95 / 6%), transparent 58%),
    var(--home-surface);
  box-shadow: none;
  transition:
    box-shadow 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;
}

.exam-entry-primary {
  grid-column: 1 / -1;
  min-height: 6.25rem;
  background:
    radial-gradient(circle at 5% 0%, rgb(39 132 95 / 18%), transparent 30%),
    linear-gradient(120deg, var(--home-accent-soft), var(--home-surface) 48%, rgb(34 122 137 / 8%));
}

[data-theme="dark"] .exam-entry-primary {
  background:
    radial-gradient(circle at 5% 0%, rgb(89 192 141 / 18%), transparent 32%),
    linear-gradient(120deg, var(--home-accent-soft), var(--home-surface) 52%, rgb(98 183 196 / 10%));
}

.exam-entry:hover {
  border-color: var(--home-accent);
  background:
    linear-gradient(135deg, rgb(39 132 95 / 9%), transparent 62%),
    var(--home-surface-soft);
  box-shadow: var(--home-shadow);
  transform: translateY(-2px);
}

.exam-entry-primary:hover {
  background:
    radial-gradient(circle at 5% 0%, rgb(39 132 95 / 22%), transparent 32%),
    linear-gradient(120deg, var(--home-accent-soft), var(--home-surface-soft) 50%, rgb(34 122 137 / 10%));
}

.exam-section a,
.exam-section a * {
  text-decoration: none !important;
}

.exam-section a::before,
.exam-section a::after,
.exam-section :deep(a::before),
.exam-section :deep(a::after) {
  display: none !important;
  content: none !important;
  background: none !important;
  -webkit-mask: none !important;
  mask: none !important;
}

.exam-section :deep(.external-link-icon),
.exam-section :deep(.vp-external-link-icon) {
  display: none !important;
}

.exam-entry-main {
  display: grid;
  grid-template-columns: 2.55rem minmax(0, 1fr) auto;
  gap: 0.68rem;
  align-items: center;
  min-width: 0;
  color: inherit;
}

.exam-entry-primary .exam-entry-main {
  grid-template-columns: 3rem minmax(0, 1fr) auto;
  height: 100%;
}

.exam-entry-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.55rem;
  height: 2.55rem;
  border: 1px solid var(--home-border);
  border-radius: 8px;
  background: var(--home-accent-soft);
  overflow: hidden;
}

.exam-entry-primary .exam-entry-icon {
  width: 3rem;
  height: 3rem;
}

.exam-entry-icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.exam-entry-copy {
  display: grid;
  gap: 0.25rem;
  min-width: 0;
}

.exam-entry:not(.exam-entry-primary) .exam-entry-copy {
  padding-right: 4.15rem;
}

.exam-entry-tag {
  color: var(--home-accent);
  font-size: 0.72rem;
  font-weight: 750;
  line-height: 1.25;
}

.exam-entry-copy strong {
  overflow: hidden;
  color: var(--home-text);
  font-size: 0.98rem;
  font-weight: 750;
  line-height: 1.35;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.exam-entry-copy>span:not(.exam-entry-tag) {
  display: -webkit-box;
  overflow: hidden;
  color: var(--home-muted);
  font-size: 0.82rem;
  line-height: 1.55;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.exam-entry-arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.15rem;
  height: 2.15rem;
  border: 1px solid rgb(39 132 95 / 20%);
  border-radius: 999px;
  background: rgb(255 255 255 / 58%);
  color: #1f2328;
  font-size: 1.65rem;
  font-weight: 500;
  line-height: 1;
  transition:
    background-color 0.18s ease,
    transform 0.18s ease;
}

[data-theme="dark"] .exam-entry-arrow {
  background: rgb(255 255 255 / 8%);
  border-color: rgb(255 255 255 / 18%);
  color: #ffffff;
}

.exam-entry-primary:hover .exam-entry-arrow {
  background: var(--home-accent-soft);
  transform: translateX(2px);
}

.exam-entry-actions {
  position: absolute;
  top: 50%;
  right: 0.78rem;
  display: inline-flex;
  flex-direction: column;
  gap: 0.35rem;
  transform: translateY(-50%);
}

.exam-entry-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.82rem;
  height: 1.82rem;
  border: 1px solid var(--home-border);
  border-radius: 999px;
  background: rgb(255 255 255 / 76%);
  color: #1f2328;
  font-size: 0.62rem;
  font-weight: 850;
  line-height: 1;
  white-space: nowrap;
  backdrop-filter: blur(8px);
  transition:
    color 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease,
    border-color 0.18s ease;
}

[data-theme="dark"] .exam-entry-action {
  background: rgb(255 255 255 / 7%);
  color: #ffffff;
}

.exam-entry-action:hover {
  border-color: var(--home-accent);
  background: var(--home-accent-soft);
  color: #1f2328;
  transform: translateY(-1px);
}

[data-theme="dark"] .exam-entry-action:hover {
  color: #ffffff;
}

.exam-entry-arrow :deep(svg),
.exam-entry-action :deep(svg) {
  display: block;
  width: 1.1rem;
  height: 1.1rem;
}

.exam-entry-arrow :deep(svg) {
  width: 1.35rem;
  height: 1.35rem;
}

.exam-entry-arrow :deep(path),
.exam-entry-action :deep(path) {
  fill: currentColor;
}

.stat-card {
  min-height: 6.5rem;
  padding: 1rem;
  border: 1px solid var(--home-border);
  border-radius: 8px;
  background: var(--home-surface);
  transition:
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
  text-decoration: none !important;
  ;
  transition:
    color 0.18s ease,
    transform 0.18s ease,
    background-color 0.18s ease;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
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

  .exam-project-grid {
    grid-template-columns: 1fr;
  }

  .exam-entry-primary {
    grid-column: 1;
  }

  .exam-entry,
  .exam-entry-primary {
    min-height: 0;
    padding: 0.68rem;
  }

  .exam-entry-main,
  .exam-entry-primary .exam-entry-main {
    grid-template-columns: 2.25rem minmax(0, 1fr);
    gap: 0.58rem;
    align-content: start;
    height: auto;
  }

  .exam-entry-icon,
  .exam-entry-primary .exam-entry-icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  .exam-entry-actions {
    right: 0.58rem;
  }

  .exam-entry:not(.exam-entry-primary) .exam-entry-copy {
    padding-right: 3.8rem;
  }

  .exam-entry-action {
    width: 1.65rem;
    height: 1.65rem;
    font-size: 0.58rem;
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

  .exam-project-grid {
    grid-template-columns: 1fr;
    gap: 0.6rem;
  }

  .exam-entry,
  .exam-entry-primary {
    min-height: 0;
    padding: 0.68rem;
  }

  .exam-entry-main,
  .exam-entry-primary .exam-entry-main {
    grid-template-columns: 2.25rem minmax(0, 1fr) auto;
    gap: 0.58rem;
  }

  .exam-entry-arrow {
    width: 1.75rem;
    height: 1.75rem;
  }

  .exam-entry-arrow :deep(svg) {
    width: 1.1rem;
    height: 1.1rem;
  }

  .exam-entry:not(.exam-entry-primary) .exam-entry-copy {
    padding-right: 3.5rem;
  }

  .exam-entry-icon,
  .exam-entry-primary .exam-entry-icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  .exam-entry-copy strong {
    font-size: 0.9rem;
  }

  .exam-entry-copy>span:not(.exam-entry-tag) {
    font-size: 0.76rem;
    line-height: 1.45;
    -webkit-line-clamp: 2;
  }

  .exam-entry-action {
    width: 1.58rem;
    height: 1.58rem;
  }

  .exam-entry-action :deep(svg) {
    width: 0.95rem;
    height: 0.95rem;
  }

  .exam-entry-actions {
    right: 0.5rem;
    gap: 0.3rem;
  }

  .stat-card,
  .focus-card,
  .update-item {
    padding: 0.5rem;
  }
}
</style>
