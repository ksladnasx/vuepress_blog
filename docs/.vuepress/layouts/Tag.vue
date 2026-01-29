<script setup>
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { RouteLink, useRoutePath } from 'vuepress/client'
import ArticleList from '../components/ArticleList.vue'

const tagMap = useBlogCategory('tag')
const routePath = useRoutePath()
</script>

<template>
  <ParentLayout>
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
              <span class="tag-num">
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
  padding-top: calc(var(--navbar-height) + 0rem) !important;
  .tag-header {
    text-align: center;
    margin-bottom: 2rem;
    animation: fadeInDown 0.6s ease-out;
    
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
  gap: 0.8rem;
  justify-content: center;
  max-width: 800px;
  margin: 0 auto;
  
  .tag {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0;
    padding: 0.6rem 1rem;
    border-radius: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.5s ease-out;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-border);
    color: var(--vp-c-text-1);
    font-size: 0.95rem;
    
    &:hover {
      transform: translateY(-3px) scale(1.05);
      border-color: var(--vp-c-brand);
      box-shadow: 0 6px 16px rgba(var(--vp-c-brand-rgb), 0.15);
      background: rgba(var(--vp-c-brand-rgb), 0.05);
    }
    
    .tag-name {
      white-space: nowrap;
    }
    
    .tag-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 0.6rem;
      height: 1.1rem;
      padding: 0 0.3rem;
      border-radius: 0.7rem;
      font-size: 0.75rem;
      font-weight: 600;
      background: rgba(var(--vp-c-gray-soft-rgb), 0.5);
      transition: all 0.3s ease;
    }
    
    &.route-link-active {
      background: rgba(var(--vp-c-brand-rgb), 0.15);
      border-color: var(--vp-c-brand);
      border-width: 1.3px;
      color: var(--vp-c-brand);
      font-weight: 600;
      box-shadow: 
        0 6px 20px rgba(var(--vp-c-brand-rgb), 0.2),
        0 0 0 1px rgba(var(--vp-c-brand-rgb), 0.1) inset;
      
      .tag-num {
        background:var(--vp-c-border);
        color: rgb(255, 255, 255);
      }
      
      &::after {
        content: '';
        position: absolute;
        inset: -2px;
        border-radius: inherit;
        background: linear-gradient(45deg, var(--vp-c-brand), var(--vp-c-brand-light));
        z-index: -1;
        opacity: 0.3;
        animation: rotate 3s linear infinite;
      }
    }
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .tag-header .tag-title {
    font-size: 2rem;
  }
  
  .tag-cloud {
    gap: 0.6rem;
    
    .tag {
      padding: 0.5rem 0.8rem;
      font-size: 0.9rem;
    }
  }
}

@media (max-width: 419px) {
  .tag-header .tag-title {
    font-size: 1.8rem;
  }
  
  .tag-cloud {
    gap: 0.5rem;
    
    .tag {
      padding: 0.4rem 0.7rem;
      font-size: 0.85rem;
    }
  }
}
</style>