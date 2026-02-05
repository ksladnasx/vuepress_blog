---
home: true
heroImage: https://i.ibb.co/vCgfCfND/02d25d0526a02a24d22cc51be3d07b50.gif
heroText: xh's blog
tagline: 捕捉思想星火，留存实践足迹，探寻技术本质。
actions:
  - text: 开始
    link: get-started.md
    type: primary
  - text: 文章
    link: /article/
    type: secondary
footer: MIT Licensed | Copyright © 2025-present VuePress Community
---



<!-- 最近更新 -->
<div class="recent-updates">
  <h2>最近更新</h2>
 <div class="update-list" id="recent-updates-list">
  <div 
    class="update-item" 
    v-for="(item, index) in items" 
    :key="index"
    @click="$router.push(item.path)"
  >
    <span class="update-date">
     ⏱   {{ item.info.date ? new Date(item.info.date).toLocaleDateString() : '暂无' }}
    </span>
    <span class="update-title">
      {{ item.info.title || '暂无' }}
    </span>
    <span class="update-tag"> <svg class="tag-icon" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
      {{ item.info.category && item.info.category[0] ? item.info.category[0] : '暂无分类' }}
    </span>
    -->
  </div>
</div>
</div>

<!-- 统计数据 -->
<div class="stats-section">
  <div class="stats-container">
    <div class="stat">
      <div class="stat-number" data-target="128">{{articlenum}}</div>
      <div class="stat-label">文章总数</div>
    </div>
    <div class="stat">
      <div class="stat-number" data-target="42">{{tagnum}}</div>
      <div class="stat-label">标签分类</div>
    </div>
    <div class="stat">
      <div class="stat-number" data-target="12">10</div>
      <div class="stat-label">专题系列</div>
    </div>
    <div class="stat">
      <div class="stat-number" data-target="256000" data-unit="万">58.16k</div>
      <div class="stat-label">累计字数</div>
    </div>
  </div>
</div>



<!-- 主要特性展示 -->
<div class="features-grid">
    <div 
      v-for="(feature, index) in features" 
      :key="index" 
      class="feature-card"
    >
      <div class="feature-icon">{{ feature.icon }}</div>
      <h3>{{ feature.title }}</h3>
      <p>{{ feature.description }}</p>
    </div>
  </div>

<!-- 技术栈 -->
<div class="tech-stack">
    <h2>技术栈</h2>
    <div class="tech-tags">
    <span 
      v-for="tech in techStack" 
      :key="tech.name" 
      class="tech-tag"
    >
      <img :src="tech.icon" :alt="tech.name" class="tech-icon" />
      <a 
        :href="tech.url" 
        :target="tech.external ? '_blank' : '_self'"
        :rel="tech.external ? 'noopener noreferrer' : undefined"
      >
        {{ tech.name }}
      </a>
    </span>
  </div>
  </div>




<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import { computed, ref } from 'vue';

const techStack = ref([
  {
    name: 'Vue3',
    icon: 'https://tse1-mm.cn.bing.net/th/id/OIP-C.AqyudVa9weRE215AAm8LUgAAAA?w=155&h=158&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3',
    url: 'https://cn.vuejs.org/',
    external: false
  },
  {
    name: 'ElementPlus',
    icon: 'https://element-plus.org/images/element-plus-logo-small.svg',
    url: 'https://element-plus.org/zh-CN/',
    external: false
  },
  {
    name: 'TypeScript',
    icon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
    url: 'https://www.typescriptlang.org/',
    external: false
  },
  {
    name: 'Docker',
    icon: 'https://tse4-mm.cn.bing.net/th/id/OIP-C.bfNVfuKq5NOy_tB-ZD3RMQAAAA?w=140&h=158&c=7&r=0&o=5&dpr=1.5&pid=1.7',
    url: 'https://www.docker.com/',
    external: false
  },
  {
    name: 'Nginx',
    icon: 'https://nginx.org/favicon.ico',
    url: 'https://nginx.org/',
    external: false
  },
  {
    name: 'Vitest',
    icon: 'https://vitest.vite.org.cn/logo.svg',
    url: 'https://vitest.vite.org.cn/',
    external: true
  },
  {
    name: 'Nuxt',
    icon: 'https://nuxt.uihtm.com/logo.svg',
    url: 'https://nuxt.nodejs.cn/',
    external: true
  }
])

const features = ref([
  {
    icon: '📝',
    title: '技术文章',
    description: '涵盖前端开发、后端架构、算法设计等领域的深度文章，每篇都包含可运行的代码示例。'
  },
  {
    icon: '🔍',
    title: '全文搜索',
    description: '基于 @vuepress/plugin-slimsearch 的全文搜索功能，快速定位所需内容，支持中文分词。'
  },
  {
    icon: '🏷️',
    title: '标签分类',
    description: '完善的标签和分类系统，帮助系统化整理知识，方便按主题浏览相关内容。'
  },
  {
    icon: '📱',
    title: '响应式设计',
    description: '完美适配各种设备屏幕，在手机、平板、桌面电脑上都能获得良好的阅读体验。'
  },
  {
    icon: '🎨',
    title: '代码高亮',
    description: '支持多种编程语言的语法高亮，内置数学公式渲染，技术文档展示更专业。'
  },
  {
    icon: '⚡',
    title: '性能优化',
    description: '基于 VuePress 2.0 构建，静态页面生成，加载速度快，SEO 友好。'
  }
])

const timelines = useBlogType('timeline')
const filteredItems = computed(() => {
  // 在 <script setup> 中直接使用 props.items，不需要 this
  return timelines.value.items.filter(item => !(item.path.includes('/posts/codes/') || item.path.includes('/posts/meaningless/')));
});
const tagMap = useBlogCategory('tag')
const articlenum = filteredItems.value.length
const tagnum = 30
const items = filteredItems.value.slice(0, 3);
</script>

<style scoped>
/* 基础样式重置 */
.home-content * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 暗色模式适配 - 修复关键问题 */
:root {
  --card-bg-light: rgba(255, 255, 255, 0.95);
  --card-bg-dark: rgba(30, 30, 40, 0.95);
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.15);
  --card-border-light: rgba(230, 230, 240, 0.8);
  --card-border-dark: rgba(60, 60, 70, 0.8);
  
  /* 新增暗色模式适配变量 */
  --text-color-light: #2c3e50;
  --text-color-dark: #e4e6eb;
  --text-light-color-light: #666;
  --text-light-color-dark: #b0b3b8;
  --border-color-light: #eaecef;
  --border-color-dark: #3a3b3c;
}


body:not(.dark) {
  --c-text: var(--text-color-light);
  --c-text-light: var(--text-light-color-light);
  --c-border: var(--border-color-light);
}

/* 深色模式 */
body.dark {
  --c-text: var(--text-color-dark);
  --c-text-light: var(--text-light-color-dark);
  --c-border: var(--border-color-dark);
}

.feature-card,
.recent-updates,
.tech-stack {
  background: var(--card-bg) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--card-border) !important;
  box-shadow: var(--card-shadow);
  color: var(--c-brand);
}



/* 特性网格布局 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 48px 0;
  padding: 0;
}

.feature-card {
  border-radius: 16px;
  padding: 16px;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  height: 90%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tech-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: var(--vp-c-icon-filter, none);
}
.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--c-brand), var(--c-brand-light));
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-6px);
  border-color: var(--c-brand) !important;
  box-shadow: var(--card-shadow-hover) !important;
  background: linear-gradient(135deg, 
    rgba(130, 230, 160, 0.9) 0%,     /* 中等亮度的绿色 */
    rgba(139, 194, 229, 0.9) 70%,    /* 中间灰色调 */
    rgba(136, 171, 186, 0.9) 100%       /* 较深的灰色 */
) !important;
}

.feature-card:hover::before {
  transform: scaleX(1);
}

.feature-icon {
  font-size: 42px;
  margin-bottom: 20px;
  display: inline-block;
  transition: transform 0.3s ease;
}

.feature-card:hover .feature-icon {
  transform: scale(1.1) rotate(5deg);
}

.feature-card h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
 color: var(--c-brand);
}

.feature-card p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--c-text-lighter);
  margin: 0;
}

/* 最近更新 */
.recent-updates {
  border-radius: 20px;
  padding: 40px;
  margin: 20px 0;
   
}

.recent-updates h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--c-brand);
  position: relative;
  padding-bottom: 16px;
  padding-top:45px
}

.recent-updates h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--c-brand), var(--c-brand-light));
  border-radius: 2px;
}

.update-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.update-item {
  display: flex;
  cursor: pointer;
  align-items: center;
  gap: 20px;
  padding: 20px 24px;
  background: rgba(var(--c-bg-rgb), 0.6);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  border: 1px solid rgba(var(--c-border-rgb), 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.update-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(var(--c-primary-rgb), 0.1), 
    rgba(var(--c-secondary-rgb), 0.05)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
  
}

.update-item:hover {
  transform: translateY(-3px);
  box-shadow: 
    0 12px 40px rgba(0, 0, 0, 0.15),
    0 4px 12px rgba(var(--c-primary-rgb), 0.1);
  background: linear-gradient(135deg, 
    rgba(104, 168, 195, 0.9)  0%,     /* 中等亮度的绿色 */
    rgba(139, 194, 229, 0.9) 30%,    /* 中间灰色调 */
    rgba(130, 230, 160, 0.9)100%       /* 较深的灰色 */
) !important;
}

.update-item:hover::before {
  opacity: 1;
}

.update-item:hover .update-title {
  transform: translateX(5px);
}

.update-item .update-title {
  transition: color 0.3s ease, transform 0.3s ease;
}



.update-date {
  font-size: 14px;
  color: var(--c-text-lighter);
  min-width: 100px;
  font-family: 'SF Mono', Monaco, monospace;
  font-weight: 500;
}

.update-title {
  font-size: 17px;
  font-weight: 500;
  color: var(--c-text-lighter);
  text-decoration: none;
  flex: 1;
  transition: color 0.2s ease;
}

.update-title:hover {
  color: rgba(246, 196, 44, 0.9)
}

.update-tag {
  font-size: 13px;
  padding: 6px 14px;
  display:flex;
  align-items:center;
  background: rgba(var(--c-brand-rgb), 0.1);
  color: var(--c-brand);
  border-radius: 20px;
  border: 1px solid rgba(var(--c-brand-rgb), 0.3);
  font-weight: 500;
  transition: all 0.2s ease;
}

.update-tag:hover {
  background: rgba(var(--c-brand-rgb), 0.2);
  transform: scale(1.05);
}

/* 统计数据 - 修复数字颜色问题 */
.stats-section {
  margin: 60px 0;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  text-align: center;
}

.stat {
  padding: 36px 24px;
  background:var(--card-shadow);
  backdrop-filter: blur(10px);
  border-radius: 18px;
  border: 1px solid rgba(230, 230, 240, 0.8);
  box-shadow: var(--card-shadow);
  transition: all 0.3s ease;
}

.stat:hover {
  transform: translateY(-6px);
  border-color: var(--c-brand) !important;
  box-shadow: var(--card-shadow-hover) !important;
  background: linear-gradient(135deg, 
    rgba(130, 230, 160, 0.9) 0%,     /* 中等亮度的绿色 */
    rgba(139, 194, 229, 0.9) 70%,    /* 中间灰色调 */
    rgba(136, 171, 186, 0.9) 100%       /* 较深的灰色 */
) !important;
}



/* 数字颜色修复 - 确保在两种模式下都可见 */
.stat-number {
 font-size: 48px;
  font-weight: 700;
  color: var(--c-brand);
  line-height: 1;
  margin-bottom: 8px;
}


.stat-label {
  font-size: 16px;
  color: var(--c-text-light);
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 技术栈 */
.tech-stack {
  margin: 60px 0;
  padding: 40px;
  border-radius: 20px;
}

.tech-stack h2 {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 32px;
   color: var(--c-text-lighter);
  text-align: center;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
}

.tech-tag {
  padding: 10px 22px;
  display: flex;
  justify-content: center;
  background: rgba(var(--c-bg-rgb), 0.7);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(var(--c-border-rgb), 0.6);
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  color: var(--c-text-lighter);
  transition: all 0.25s ease;
  cursor: default;
}

.tech-tag a{
  padding-left:5px;
  text-decoration: none;
}


.tech-tag:hover {
  background: var(--c-brand) !important;
  color: green !important;
  border-color: var(--c-brand) !important;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(var(--c-brand-rgb), 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .features-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .feature-card {
    padding: 28px;
  }
  
  .recent-updates,
  .tech-stack {
    padding: 32px;
  }
  
  .update-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 20px;
  }
  
  .update-date {
    min-width: auto;
  }
  
  .stats-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stat {
    padding: 28px 20px;
  }
  
  .stat-number {
    font-size: 36px;
  }
  
  .tech-tags {
    gap: 10px;
  }
  
  .tech-tag {
    padding: 8px 18px;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .stats-container {
    grid-template-columns: 1fr;
  }
  
  .update-item {
    padding: 18px;
  }
  
  .stat {
    padding: 32px 24px;
  }
  
  .recent-updates,
  .tech-stack {
    padding: 24px;
  }
}

/* 动画效果增强 */
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

.feature-card,
.recent-updates,
.stats-section,
.tech-stack {
  animation: fadeInUp 0.6s ease-out;
}

.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }
.feature-card:nth-child(6) { animation-delay: 0.6s; }
.recent-updates { animation-delay: 0.7s; }
.stats-section { animation-delay: 0.8s; }
.tech-stack { animation-delay: 0.9s; }
</style>

