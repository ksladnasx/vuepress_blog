<script setup>
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { RouteLink, useRoutePath } from 'vuepress/client'
import ArticleList from '../components/ArticleList.vue'
import FontSwitcher from '../components/FontSwitcher.vue'

const tagMap = useBlogCategory('tag')
const routePath = useRoutePath()
</script>

<template>
  <ParentLayout>
    <template #navbar-after>
      <FontSwitcher />
    </template>

    <template #page>
      <main class="page">
        <div class="tag-wrapper">
          <div class="tag-header">
            <h1 class="tag-title">标签</h1>
            <p class="tag-count">共 {{ Object.keys(tagMap.map).length }} 个标签</p>
          </div>
          
          <div class="tag-cloud">
            <RouteLink
              v-for="({ items, path }, name) in tagMap.map"
              :key="name"
              :to="path"
              :active="routePath === path"
              class="tag"
            >
              <span class="tag-name">{{ name }}</span>
              <span class="tag-num" >
                {{ items.length }}
              </span>
            </RouteLink>
          </div>
        </div>

        <ArticleList :items="tagMap.currentItems ?? []" />
      </main>
    </template>
  </ParentLayout>
</template>

<style lang="scss">
@use '@vuepress/theme-default/styles/mixins';

.page {
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
  min-height: calc(100vh - var(--navbar-height));
}

.tag-wrapper {
  @include mixins.content-wrapper;
  box-sizing: border-box;
  width: min(1180px, calc(100vw - 2rem));
  max-width: none;
  padding-top: calc(var(--navbar-height) + 0rem) !important;
  padding-right: clamp(1rem, 3vw, 2.5rem);
  padding-left: clamp(1rem, 3vw, 2.5rem);

  .tag-header {
    text-align: center;
    margin-bottom: 2rem;
    // animation: fadeInDown 0.6s ease-out;
    
    .tag-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
    }
    
    .tag-count {
      font-size: 1.1rem;
      color: var(--vp-c-text-2);
      
    }
  }
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  justify-content: center;
  max-width: none;
  width: 100%;
  margin: 0 auto;
  
  
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.28rem;
    margin: 0;
    padding: 0.36rem 0.58rem;
    border-radius: 999px;
    font-size: calc(var(--xh-font-size) * 0.76);
    font-weight: 650;
    line-height: 1.35;
    cursor: pointer;
    text-decoration: none;
    transition:
      background-color 0.2s ease,
      box-shadow 0.2s ease,
      color 0.2s ease,
      transform 0.2s ease;
    // animation: fadeInUp 0.5s ease-out;
    background: var(--vp-c-bg-elv);
    border: 1px solid rgba(var(--vp-c-gray-soft-rgb), 0.4);
    color: var(--vp-c-text-mute);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18);
    max-width: 100%;
    min-width: 0;
    overflow: hidden;
    position: relative;
    
    &:hover {
      border-color: var(--vp-c-brand);
      box-shadow: 0 6px 16px rgba(var(--vp-c-brand-rgb), 0.12);
      background: var(--vp-c-accent-soft);
      color: var(--vp-c-accent);
      transform: translateY(-1px);

      .tag-num {
        border-color: rgba(var(--vp-c-brand-rgb), 0.24);
        background: rgba(var(--vp-c-brand-rgb), 0.1);
        color: var(--vp-c-accent);
        
      }
    }
    
    .tag-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      min-width: 0;
    }
    
    .tag-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 0.82rem;
      height: 0.82rem;
      padding: 0 0.22rem;
      border: 1px solid rgba(var(--vp-c-gray-soft-rgb), 0.32);
      border-radius: 0.9rem;
      background: transparent;
      color: var(--vp-c-text-subtle);
      font-family: var(--xh-system-code-font-family, Consolas, monospace);
      font-size: calc(var(--xh-font-size) * 0.54);
      font-weight: 700;
      line-height: 1;
      font-size: calc(var(--xh-font-size) * 0.6) !important;
      transform: translateY(-0.04rem);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    
    &.route-link-active {
      background: var(--vp-c-accent-soft);
      border-color: var(--vp-c-brand);
      color: var(--vp-c-brand);
      font-weight: 750;
      box-shadow: 
        0 6px 18px rgba(var(--vp-c-brand-rgb), 0.14),
        0 0 0 1px rgba(var(--vp-c-brand-rgb), 0.08) inset;
      
      .tag-num {
        border-color: transparent;
        background: var(--vp-c-brand);
        color: var(--vp-c-accent-text);
      }
      
      &::after {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        background: var(--vp-c-brand);
        z-index: -1;
        opacity: 0.12;
        // animation: rotate 3s linear infinite;
      }
    }
  }
}

// @keyframes fadeInDown {
//   from {
//     opacity: 0;
//     transform: translateY(-20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(20px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }

// @keyframes rotate {
//   from {
//     transform: rotate(0deg);
//   }
//   to {
//     transform: rotate(360deg);
//   }
// }

@media (max-width: 768px) {
  .tag-header .tag-title {
    font-size: 2rem;
  }

  .tag-wrapper {
    width: 100%;
  }
  
  .tag-cloud {
    gap: 0.5rem;
    
    .tag {
      padding: 0.32rem 0.52rem;
      font-size: calc(var(--xh-font-size) * 0.72);
    }
  }
}

@media (max-width: 419px) {
  .tag-header .tag-title {
    font-size: 1.8rem;
  }
  
  .tag-cloud {
    gap: 0.42rem;
    
    .tag {
      padding: 0.28rem 0.46rem;
      font-size: calc(var(--xh-font-size) * 0.68);
    }
  }
}
</style>
