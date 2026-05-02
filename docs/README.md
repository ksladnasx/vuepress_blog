---
home: true
heroImage: https://i.ibb.co/vCgfCfND/02d25d0526a02a24d22cc51be3d07b50.gif
heroText: xh's blog
tagline: 捕捉思想星火，留存实践足迹，探寻技术本质。
background: https://i.ibb.co/vCgfCfND/02d25d0526a02a24d22cc51be3d07b50.gif
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
    <span class="update-title">🔥
      {{ item.info.title || '暂无' }}
    </span>
    <span class="update-tag"> <svg class="tag-icon" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/></svg>
      {{ item.info.category && item.info.category[0] ? item.info.category[0] : '暂无分类' }}
      <span class="update-title" style="padding-left:8px"> ➡️ </span>
    </span>
    
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

<!-- 弹窗 -->
<template v-if="shouldShowAlert">
   <div class="domain-alert-overlay">
    <div class="domain-alert-modal">
      <div class="domain-alert-header">
        <div class="header-left">
          <span class="header-icon">🌐</span>
          <span class="header-title">域名提示</span>
        </div>
        <button class="close-btn" @click="closeDomainAlert">✕</button>
      </div>
      <div class="domain-alert-body">
        <p>您正在通过其他原始域名访问本站：</p>
        <p class="current-domain">{{ currentDomain }}</p>
        <p>✨ 使用新域名获得更好的体验（请勿用QQ或者微信的浏览器访问喵）：</p>
        <p class="suggested-domain">https://https://www.xhblog.cc.cd//</p>
      </div>
      <div class="domain-alert-footer">
        <button class="btn btn-primary" @click="goToCustomDomain">
          前往新域名
        </button>
        <button class="btn btn-secondary" @click="closeDomainAlert">
          关闭
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBlogType } from '@vuepress/plugin-blog/client'
import { useBlogCategory } from '@vuepress/plugin-blog/client'
import { computed, ref, onMounted } from 'vue';

// 弹窗相关的响应式变量
const showDomainAlert = ref(false);
const currentDomain = ref('');

// 在组件挂载后检查域名
onMounted(() => {
  if (typeof window !== 'undefined') {
    const fullUrl = window.location.href;
    const hostname = window.location.hostname;
    currentDomain.value = fullUrl;
    
    // 只在 GitHub Pages 老域名下显示弹窗
    if (hostname === "localhost"|| hostname === 'ksladnasx.github.io' || 
        fullUrl.startsWith('https://ksladnasx.github.io/vuepress_blog/')) {
      // 延迟一点显示，避免影响页面渲染
      setTimeout(() => {
        showDomainAlert.value = true;
      }, 500);
      console.log(`检测到原始域名${hostname}，显示提示弹窗`);
    }
    console.log(`当前访问网站的域名为：${hostname}`);
    // 新域名 https://https://www.xhblog.cc.cd// 下什么都不做，不弹窗
  }
});

// 关闭弹窗
const closeDomainAlert = () => {
  showDomainAlert.value = false;
};

// 跳转到新域名
const goToCustomDomain = () => {
  window.location.href = 'https://https://www.xhblog.cc.cd//';
};

// 计算是否显示弹窗
const shouldShowAlert = computed(() => {
  return showDomainAlert.value;
});

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
  return timelines.value.items.filter(item => !(item.path.includes('/posts/codes/') || item.path.includes('/posts/meaningless/')));
});
const tagMap = useBlogCategory('tag')
const articlenum = filteredItems.value.length
const tagnum = 30
const items = filteredItems.value.slice(0, 3);
</script>

<style scoped>
/* 基础样式 & 变量统一 */
:root {
  /* 基础变量 */
  --card-bg-light: rgba(255, 255, 255, 0.95);
  --card-bg-dark: rgba(30, 30, 40, 0.95);
  --card-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  --card-shadow-hover: 0 12px 40px rgba(0, 0, 0, 0.15);
  --card-border-light: rgba(230, 230, 240, 0.8);
  --card-border-dark: rgba(60, 60, 70, 0.8);
  
  /* 文字/边框变量 */
  --text-color-light: #2c3e50;
  --text-color-dark: #e4e6eb;
  --text-light-color-light: #666;
  --text-light-color-dark: #b0b3b8;
  --border-color-light: #eaecef;
  --border-color-dark: #3a3b3c;
}

/* 全局重置 & 模式适配 */
.home-content * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body:not(.dark) {
  --c-text: var(--text-color-light);
  --c-text-light: var(--text-light-color-light);
  --c-border: var(--border-color-light);
  --card-bg: var(--card-bg-light);
  --card-border: var(--card-border-light);
}
body.dark {
  --c-text: var(--text-color-dark);
  --c-text-light: var(--text-light-color-dark);
  --c-border: var(--border-color-dark);
  --card-bg: var(--card-bg-dark);
  --card-border: var(--card-border-dark);
}

/* 通用卡片样式（合并重复） */
.feature-card, .recent-updates, .tech-stack {
  background: var(--card-bg) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--card-border) !important;
  box-shadow: var(--card-shadow);
  color: var(--c-brand);
  border-radius: 16px;
  padding: 20px;
  animation: fadeInUp 0.6s ease-out;
}

/* 特性网格 */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  margin: 48px 0;
  padding: 0;
}
.feature-card {
  height: 90%;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
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
    rgba(130, 230, 160, 0.9) 0%,
    rgba(139, 194, 229, 0.9) 70%,
    rgba(136, 171, 186, 0.9) 100%
  ) !important;
}
.feature-card:hover::before { transform: scaleX(1); }
.feature-icon {
  font-size: 42px;
  margin-bottom: 20px;
  display: inline-block;
  transition: transform 0.3s ease;
}
.feature-card:hover .feature-icon { transform: scale(1.1) rotate(5deg); }
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
.recent-updates h2 {
  font-size: 28px;
  font-weight: 600;
  margin: 45px 0 32px;
  color: var(--c-brand);
  position: relative;
  padding-bottom: 16px;
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
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 12px rgba(var(--c-primary-rgb), 0.1);
  background: linear-gradient(135deg, 
    rgba(104, 168, 195, 0.9) 0%,
    rgba(139, 194, 229, 0.9) 30%,
    rgba(130, 230, 160, 0.9) 100%
  ) !important;
}
.update-item:hover::before { opacity: 1; }
.update-item:hover .update-title { transform: translateX(5px); }
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
  transition: color 0.2s ease, transform 0.3s ease;
}
.update-title:hover { color: rgba(246, 196, 44, 0.9); }
.update-tag {
  font-size: 13px;
  padding: 6px 14px;
  display: flex;
  align-items: center;
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

/* 统计数据 */
.stats-section {
  margin: 30px 0;
  animation: fadeInUp 0.6s ease-out 0.8s both;
}
.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
  text-align: center;
}
.stat {
  padding: 36px 24px;
  background: var(--card-shadow);
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
    rgba(130, 230, 160, 0.9) 0%,
    rgba(139, 194, 229, 0.9) 70%,
    rgba(136, 171, 186, 0.9) 100%
  ) !important;
}
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
.tech-tag a {
  padding-left: 5px;
  text-decoration: none;
}
.tech-tag:hover {
  background: var(--c-brand) !important;
  color: green !important;
  border-color: var(--c-brand) !important;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 20px rgba(var(--c-brand-rgb), 0.3);
}
.tech-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
  filter: var(--vp-c-icon-filter, none);
}

/* 弹窗样式 */
.domain-alert-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}
.domain-alert-modal {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  width: 90%;
  max-width: 500px;
  overflow: hidden;
  animation: slideIn 0.3s ease;
}
.domain-alert-header {
  padding: 16px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}
.header-icon { font-size: 1.2rem; line-height: 1; }
.header-title {
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.3px;
}
.close-btn {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s;
  padding: 0;
  line-height: 1;
}
.close-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}
.domain-alert-body {
  padding: 20px 20px 16px;
  color: #333;
  font-size: 0.95rem;
  line-height: 1.5;
}
.domain-alert-body p { margin: 8px 0; }
.current-domain, .suggested-domain {
  padding: 10px 12px;
  border-radius: 8px;
  font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', monospace;
  word-break: break-all;
  margin: 12px 0;
  border-left: 4px solid;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}
.current-domain {
  background-color: #f8f9fa;
  font-size: 0.85rem;
  border-left-color: #ff6b6b;
  color: #495057;
}
.suggested-domain {
  background-color: #f0f9ff;
  font-size: 0.9rem;
  border-left-color: #4caf50;
  color: #2c3e50;
  font-weight: 500;
}
.domain-alert-footer {
  padding: 16px 20px 20px;
  background-color: #f8f9fa;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e9ecef;
}
.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  transition: all 0.2s;
  font-weight: 500;
  letter-spacing: 0.3px;
}
.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}
.btn-secondary {
  background-color: white;
  color: #495057;
  border: 1px solid #dee2e6;
}
.btn-secondary:hover {
  background-color: #f1f3f5;
  border-color: #ced4da;
}

/* 动画（合并精简） */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@keyframes slideIn {
  from { transform: translateY(-20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

/* 动画延迟（精简写法） */
.feature-card:nth-child(1) { animation-delay: 0.1s; }
.feature-card:nth-child(2) { animation-delay: 0.2s; }
.feature-card:nth-child(3) { animation-delay: 0.3s; }
.feature-card:nth-child(4) { animation-delay: 0.4s; }
.feature-card:nth-child(5) { animation-delay: 0.5s; }
.feature-card:nth-child(6) { animation-delay: 0.6s; }
.recent-updates { animation-delay: 0.7s; }
.tech-stack { animation-delay: 0.9s; }

/* 响应式（合并精简） */
@media (max-width: 768px) {
  .features-grid { grid-template-columns: 1fr; gap: 20px; }
  .feature-card { padding: 28px; }
  .recent-updates, .tech-stack { padding: 32px; }
  .update-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    padding: 20px;
  }
  .update-date { min-width: auto; }
  .stats-container { grid-template-columns: repeat(2, 1fr); }
  .stat { padding: 28px 20px; }
  .stat-number { font-size: 36px; }
  .tech-tags { gap: 10px; }
  .tech-tag { padding: 8px 18px; font-size: 13px; }
}
@media (max-width: 480px) {
  .stats-container { grid-template-columns: 1fr; }
  .update-item { padding: 18px; }
  .stat { padding: 32px 24px; }
  .recent-updates, .tech-stack { padding: 24px; }
}

/* 暗色主题弹窗适配 */
@media (prefers-color-scheme: dark) {
  .domain-alert-modal {
    background-color: #1e2a3a;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
  .domain-alert-header {
    background: linear-gradient(135deg, #4a5a9e 0%, #5a3a7a 100%);
  }
  .domain-alert-body { color: #e9ecef; }
  .current-domain {
    background-color: #2a3a4a;
    color: #e9ecef;
    border-left-color: #ff8787;
  }
  .suggested-domain {
    background-color: #1a3340;
    color: #e9ecef;
    border-left-color: #69db7e;
  }
  .domain-alert-footer {
    background-color: #1a2735;
    border-top-color: #2a3a4a;
  }
  .btn-secondary {
    background-color: #2a3a4a;
    color: #e9ecef;
    border-color: #3a4a5a;
  }
  .btn-secondary:hover {
    background-color: #3a4a5a;
    border-color: #4a5a6a;
  }
}
</style>
