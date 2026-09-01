<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import { computed } from "vue";
import { RouteLink, useRoute } from "vuepress/client";
import FontSwitcher from "../components/FontSwitcher.vue";
import ReadingBackgroundSwitcher from "../components/ReadingBackgroundSwitcher.vue";

const route = useRoute();

const lostPath = computed(() => {
  const rawPath = route.path || "/404.html";
  try {
    return decodeURIComponent(rawPath);
  } catch {
    return rawPath;
  }
});

const quickLinks = [
  {
    to: "/article/",
    index: "01",
    title: "文章",
    desc: "查看全部笔记与文章",
  },
  {
    to: "/category/",
    index: "02",
    title: "分类",
    desc: "按主题重新定位内容",
  },
  {
    to: "/tag/",
    index: "03",
    title: "标签",
    desc: "通过关键词查找关联记录",
  },
  {
    to: "/timeline/",
    index: "04",
    title: "时间线",
    desc: "按发布时间回顾更新轨迹",
  },
];
</script>

<template>
  <ParentLayout>
    <template #navbar-after>
      <a class="xh-admin-entry" href="/admin/" aria-label="打开文章后台" title="文章后台">
        <span class="xh-admin-entry-icon" aria-hidden="true">
          <i></i>
          <i></i>
          <i></i>
          <i></i>
        </span>
      </a>
      <FontSwitcher />
      <ReadingBackgroundSwitcher :is-reading-page="false" :is-home-page="false" />
    </template>

    <!-- 404 页面不渲染默认侧边栏，避免 vp-sidebar 遮挡内容 -->
    <template #sidebar>
      <div class="xh-not-found-sidebar-placeholder" aria-hidden="true"></div>
    </template>

    <template #page>
      <main class="xh-not-found-page" aria-labelledby="xh-not-found-title">
        <section class="xh-not-found-shell">
          <div class="xh-not-found-main">
            <p class="xh-not-found-label">404 / PAGE NOT FOUND</p>
            <h1 id="xh-not-found-title">啊噢，页面走丢了</h1>
            <p class="xh-not-found-desc">
              可能是链接已更新、文章被移动，或者地址输入有误。你可以回到首页，
              也可以从文章、分类、标签里重新查找。
            </p>

            <p class="xh-not-found-path" :title="lostPath">
              <span>当前路径</span>
              <code>{{ lostPath }}</code>
            </p>

            <div class="xh-not-found-actions">
              <RouteLink class="xh-not-found-button xh-not-found-button-primary" to="/">
                回到首页
              </RouteLink>
              <RouteLink class="xh-not-found-button xh-not-found-button-ghost" to="/article/">
                浏览文章
              </RouteLink>
            </div>
          </div>

          <aside class="xh-not-found-mark" aria-hidden="true">
            <img src="/404.webp" alt="" loading="eager" decoding="async" />
          </aside>
        </section>

        <section class="xh-not-found-links" aria-label="推荐入口">
          <RouteLink
            v-for="item in quickLinks"
            :key="item.to"
            class="xh-not-found-link"
            :to="item.to"
          >
            <span class="xh-not-found-link-index">{{ item.index }}</span>
            <span class="xh-not-found-link-content">
              <strong>{{ item.title }}</strong>
              <em>{{ item.desc }}</em>
            </span>
          </RouteLink>
        </section>
      </main>
    </template>
  </ParentLayout>
</template>

<style scoped lang="scss">
.xh-not-found-sidebar-placeholder {
  display: none;
}

.xh-not-found-page {
  position: relative;
  min-height: calc(100vh - var(--navbar-height, 3.6rem));
  padding: calc(var(--navbar-height, 3.6rem) + 2.6rem) max(1.25rem, env(safe-area-inset-left)) 4rem;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 16%, rgb(var(--xh-accent-rgb) / 14%), transparent 26rem),
    radial-gradient(circle at 82% 0%, rgb(69 114 205 / 10%), transparent 24rem),
    var(--xh-page-bg, var(--vp-c-bg));
}

.xh-not-found-page::before {
  content: "";
  position: absolute;
  inset: auto 8% 8% auto;
  width: min(26rem, 65vw);
  height: min(26rem, 65vw);
  pointer-events: none;
  border-radius: 999px;
  background: rgb(var(--xh-accent-rgb) / 9%);
  filter: blur(34px);
}

.xh-not-found-shell,
.xh-not-found-links {
  position: relative;
  z-index: 1;
  width: min(var(--homepage-width, 1120px), calc(100vw - 2.5rem));
  margin-inline: auto;
}

.xh-not-found-shell {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(220px, 360px);
  gap: clamp(1.5rem, 4vw, 3.25rem);
  align-items: center;
  padding: clamp(1.6rem, 4vw, 3rem);
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 78%, transparent);
  border-radius: 28px;
  background:
    linear-gradient(135deg, rgb(var(--xh-accent-rgb) / 9%), transparent 42%),
    color-mix(in srgb, var(--xh-panel-bg, var(--vp-c-bg-elv)) 86%, transparent);
  box-shadow: var(--xh-shadow-soft);
  backdrop-filter: blur(16px) saturate(1.08);
}

.xh-not-found-main {
  min-width: 0;
  align-self: center;
}

.xh-not-found-label {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  margin: 0 0 1rem;
  color: var(--vp-c-accent);
  font-family: var(--xh-code-font-family, var(--vp-font-family-mono));
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.xh-not-found-label::before {
  content: "";
  width: 1.6rem;
  height: 1px;
  background: currentColor;
  opacity: 0.75;
}

.xh-not-found-main h1 {
  max-width: 10em;
  margin: 0;
  color: var(--vp-c-text);
  font-size: clamp(2rem, 5vw, 3.75rem);
  line-height: 1.12;
  letter-spacing: -0.04em;
}

.xh-not-found-desc {
  max-width: 42rem;
  margin: 1.1rem 0 0;
  color: var(--vp-c-text-mute);
  font-size: 1.02rem;
  line-height: 1.9;
}

.xh-not-found-path {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.7rem;
  align-items: center;
  max-width: 42rem;
  margin: 1.35rem 0 0;
  padding: 0.72rem 0.85rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 80%, transparent);
  border-radius: 14px;
  background: color-mix(in srgb, var(--vp-c-control) 68%, transparent);
}

.xh-not-found-path span {
  color: var(--vp-c-text-subtle);
  font-size: 0.84rem;
  font-weight: 700;
  white-space: nowrap;
}

.xh-not-found-path code {
  min-width: 0;
  overflow: hidden;
  color: var(--vp-c-text-mute);
  font-family: var(--xh-code-font-family, var(--vp-font-family-mono));
  font-size: 0.86rem;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.xh-not-found-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.55rem;
}

.xh-not-found-button,
.xh-not-found-link {
  text-decoration: none;
  transition:
    transform 0.18s ease,
    border-color 0.18s ease,
    background-color 0.18s ease,
    box-shadow 0.18s ease;
}

.xh-not-found-button {
  display: inline-flex;
  min-height: 2.75rem;
  align-items: center;
  justify-content: center;
  padding: 0 1.15rem;
  border-radius: 999px;
  font-weight: 800;
}

.xh-not-found-button-primary {
  color: #fff;
  background: linear-gradient(135deg, var(--vp-c-accent), var(--vp-c-accent-hover));
  box-shadow: 0 12px 24px rgb(var(--xh-accent-rgb) / 22%);
}

.xh-not-found-button-ghost {
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 76%, transparent);
  color: var(--vp-c-text);
  background: color-mix(in srgb, var(--xh-panel-bg, var(--vp-c-bg-elv)) 72%, transparent);
}

.xh-not-found-button:hover,
.xh-not-found-link:hover {
  transform: translateY(-2px);
}

.xh-not-found-button-ghost:hover,
.xh-not-found-link:hover {
  border-color: rgb(var(--xh-accent-rgb) / 36%);
  background: rgb(var(--xh-accent-rgb) / 9%);
}

.xh-not-found-mark {
  position: relative;
  display: grid;
  min-height: clamp(15rem, 28vw, 20rem);
  place-items: center;
  overflow: visible;
  isolation: isolate;
  padding: clamp(1rem, 2.5vw, 1.6rem);
  border: 1px solid rgb(var(--xh-accent-rgb) / 16%);
  border-radius: 24px;
  background:
    linear-gradient(145deg, rgb(var(--xh-accent-rgb) / 11%), transparent 58%),
    color-mix(in srgb, var(--vp-c-bg-alt) 70%, transparent);
}




.xh-not-found-mark img {
  position: relative;
  z-index: 1;
  display: block;
  width: min(100%, 22rem);
  max-height: 18rem;
  object-fit: contain;
  filter: drop-shadow(0 18px 30px rgb(var(--xh-accent-rgb) / 18%));
}

.xh-not-found-links {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.85rem;
  margin-top: 0.9rem;
}

.xh-not-found-link {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 0.8rem;
  min-height: 6.4rem;
  padding: 1rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-border) 72%, transparent);
  border-radius: 18px;
  color: var(--vp-c-text);
  background: color-mix(in srgb, var(--xh-panel-bg, var(--vp-c-bg-elv)) 78%, transparent);
  box-shadow: 0 10px 22px rgb(31 41 55 / 7%);
  backdrop-filter: blur(10px) saturate(1.04);
}

.xh-not-found-link-index {
  color: var(--vp-c-accent);
  font-family: var(--xh-code-font-family, var(--vp-font-family-mono));
  font-size: 0.82rem;
  font-weight: 800;
  line-height: 1.55;
}

.xh-not-found-link-content {
  min-width: 0;
}

.xh-not-found-link strong,
.xh-not-found-link em {
  display: block;
}

.xh-not-found-link strong {
  font-size: 1rem;
  line-height: 1.55;
}

.xh-not-found-link em {
  margin-top: 0.25rem;
  color: var(--vp-c-text-mute);
  font-size: 0.88rem;
  font-style: normal;
  line-height: 1.55;
}

@media (max-width: 959px) {
  .xh-not-found-page {
    padding-top: calc(var(--navbar-height, 3.6rem) + 1.5rem);
  }

  .xh-not-found-shell {
    grid-template-columns: 1fr;
  }

  .xh-not-found-mark {
    min-height: 12rem;
    order: -1;
    padding: 1rem;
  }

  .xh-not-found-mark img {
    width: min(100%, 16rem);
    max-height: 11rem;
  }

  .xh-not-found-main h1 {
    max-width: none;
  }

  .xh-not-found-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .xh-not-found-shell,
  .xh-not-found-links {
    width: min(100%, calc(100vw - 2rem));
  }

  .xh-not-found-shell {
    padding: 1.25rem;
    border-radius: 22px;
  }

  .xh-not-found-mark {
    min-height: 9rem;
    border-radius: 18px;
    padding: 0.75rem;
  }



  .xh-not-found-mark img {
    width: min(100%, 13rem);
    max-height: 8.5rem;
  }

  .xh-not-found-path {
    grid-template-columns: 1fr;
    gap: 0.35rem;
  }

  .xh-not-found-actions,
  .xh-not-found-button {
    width: 100%;
  }

  .xh-not-found-links {
    grid-template-columns: 1fr;
  }
}
</style>
