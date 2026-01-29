<script setup>
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import { RouteLink, useRoutePath } from 'vuepress/client'
import ArticleList from '../components/ArticleList.vue'

const categoryMap = useBlogCategory('category')
const routePath = useRoutePath()
</script>

<template>
  <ParentLayout>
    <template #page>
      <main class="page">
        <div class="category-wrapper">
          <div class="category-header">
            <h1 class="category-title">分类</h1>
            <p class="category-count">共 {{ Object.keys(categoryMap.map).length }} 个分类</p>
          </div>
          
          <div class="category-cloud">
            
            <RouteLink
              v-for="({ items, path }, name) in categoryMap.map"
              :key="name"
              :to="path"
              :active="routePath === path"
              class="category"
            > <svg class="tag-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                </svg>
              <span class="category-name">{{ name }}</span>
              <span class="category-num">
                {{ items.length }}
              </span>
            </RouteLink>
          </div>
        </div>

        <ArticleList :items="categoryMap.currentItems ?? []" />
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

.category-wrapper {
  @include mixins.content-wrapper;
  padding-top: calc(var(--navbar-height) ) !important;
  padding-bottom: 0rem !important;
  
  .category-header {
    text-align: center;
    margin-bottom: 2rem;
    animation: fadeInDown 0.6s ease-out;
    
    .category-title {
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
      background-clip: text;
      -webkit-background-clip: text;
      // -webkit-text-fill-color: transparent;
    }
    
    .category-count {
      font-size: 1.1rem;
      color: var(--vp-c-text-2);
    }
  }
}

.category-cloud {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.2rem;
  max-width: 900px;
  margin: 0 auto;
  
  .category {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0;
    padding: 1rem 1.25rem;
    border-radius: 1rem;
    font-weight: 500;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.5s ease-out;
    background: var(--vp-c-bg-soft);
    border: 1px solid var(--vp-c-border);
    color: var(--vp-c-text-1);
    font-size: 1.1rem;
    position: relative;
    overflow: hidden;
    
    &:hover {
      transform: translateY(-4px);
      border-color: var(--vp-c-brand);
      box-shadow: 0 8px 20px rgba(var(--vp-c-brand-rgb), 0.15);
      background: rgba(var(--vp-c-brand-rgb), 0.05);
      
      &::before {
        opacity: 1;
      }
    }
    
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        135deg,
        transparent 0%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    .category-name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 70%;
    }
    
    .category-num {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      min-width: 1rem;
      height: 2rem;
      padding: 0 0.5rem;
      border-radius: 1rem;
      font-size: 0.85rem;
      font-weight: 600;
      background: rgba(var(--vp-c-gray-soft-rgb), 0.5);
      transition: all 0.3s ease;
    }
    
    &.route-link-active {
      background: rgba(var(--vp-c-brand-rgb), 0.15);
      border-color: var(--vp-c-brand);
      color: var(--vp-c-brand);
      font-weight: 600;
      box-shadow: 
        0 8px 25px rgba(var(--vp-c-brand-rgb), 0.2),
        0 0 0 1px rgba(var(--vp-c-brand-rgb), 0.1) inset;
      
      .category-num {
        background: rgba(255, 255, 255, 0.9);;
        color: black;
      }
      
      &::after {
        content: '';
        position: absolute;
        top: -1px;
        left: -1px;
        right: -1px;
        bottom: -1px;
        border-radius: inherit;
        padding: 2px;
        background: linear-gradient(135deg, var(--vp-c-brand), var(--vp-c-brand-light));
        -webkit-mask: 
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        mask: 
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: borderFlow 2s linear infinite;
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

@keyframes borderFlow {
  0%, 100% {
    background-position: 0% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
}

@media (max-width: 768px) {
  .category-header .category-title {
    font-size: 2rem;
  }
  
  .category-cloud {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    
    .category {
      padding: 0.8rem 1rem;
      font-size: 1rem;
    }
  }
}

@media (max-width: 419px) {
  .category-header .category-title {
    font-size: 1.8rem;
  }
  
  .category-cloud {
    grid-template-columns: 1fr;
    gap: 0.8rem;
    
    .category {
      padding: 0.7rem 0.9rem;
      font-size: 0.95rem;
    }
  }
}
</style>