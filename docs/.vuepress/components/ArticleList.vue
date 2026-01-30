<script setup>
// 这个是一个被复用的组件
const props = defineProps({
  /** Article items */
  items: {
    type: Array,
    required: true,
  },
  /** Whether is timeline or not */
  isTimeline: Boolean,
  kind: String
})

const handleTagClick = (event, tags) => {
      event.stopPropagation();  // 明确阻止冒泡
      event.preventDefault();   // 阻止默认行为
      console.log('Tags clicked:', tags);
}
</script>

<template>
  <div class="article-wrapper">
    <!-- 是文章列表页或时间线页就显示标题 -->
    <div v-if="kind === 'Article' || isTimeline" class="page-header">
      <div class="header-content">
        <h1 class="page-title">{{ isTimeline ? "时间线" : "文章列表" }}</h1>
       
      </div>
       <div class="header-animation">
          <img
            src="https://i.ibb.co/WWRQQZxM/1.gif"
            class="floating-gif"
            alt="动画装饰"
            loading="lazy"
          />
        </div>
    </div>
    
    <!-- 空状态 -->
    <div v-if="!items.length" class="empty-state">
      <div class="empty-animation">
        <img
          src="https://i.ibb.co/svVCKB6j/2.gif"
          class="pulse-gif"
          alt="空状态动画"
          loading="lazy"
        />
      </div>
      <p class="empty-text">暂无内容，期待你的第一篇创作 ✨</p>
    </div>
    
    <!-- 文章列表 -->
    <div v-else class="article-list">
      <article 
        v-for="{ info, path } in items" 
        :key="path" 
        class="article-card"
        @click="$router.push(path)"
      >
        <div class="article-content">
          <header class="article-header">
            <div class="title-wrapper">
              <h2 class="article-title">
                {{
                  (isTimeline ? `${new Date(info.date).toLocaleDateString()}: ` : '') +
                  info.title
                }}
              </h2>
              <div class="title-underline"></div>
            </div>
            ·
            <!-- 元信息标签 -->
            <div class="meta-tags">
              <span v-if="info.author" class="meta-tag author">
                <svg class="tag-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                {{ info.author }}
              </span>
              
              <span v-if="info.date && !isTimeline" class="meta-tag date">
                <svg class="tag-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zM5 6v2h14V6H5zm2 7h10v2H7zm0 4h7v2H7z"/>
                </svg>
                {{ new Date(info.date).toLocaleDateString() }}
              </span>
              
              <span v-if="info.category" class="meta-tag category">
                <svg class="tag-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                </svg>
                {{ info.category[0] || '暂无分类' }}
              </span>
              
              <span v-if="info.tag && info.tag.length" class="meta-tag tag-list" >
                <svg class="tag-icon" viewBox="0 0 24 24" width="16" height="16">
                  <path fill="currentColor" d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"/>
                </svg>
                <span class="tags">
                  <span v-for="(tag, index) in info.tag.slice(0, 3)" :key="index" class="tag-item">
                    {{ tag }}
                  </span>
                  <span v-if="info.tag.length > 3" class="tag-more">+{{ info.tag.length - 3 }}</span>
                </span>
              </span>
            </div>
          </header>
          
          <!-- 摘要内容 -->
          <div v-if="info.excerpt" class="article-excerpt" v-html="info.excerpt" />
          
          <!-- 阅读更多指示 -->
          <div class="read-more">
            <span class="read-more-text">阅读全文</span>
            <svg class="read-more-icon" viewBox="0 0 24 24" width="20" height="20">
              <path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
            </svg>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@vuepress/theme-default/styles/mixins';

.article-wrapper {
  @include mixins.content-wrapper;
  padding-top: calc(var(--navbar-height) );
  min-height: calc(100vh - var(--navbar-height));
  background: linear-gradient(135deg, var(--vp-c-bg-soft) 0%, var(--vp-c-bg) 100%);
}

/* 页面头部样式 */
.page-header {
  margin-bottom: -1rem;
  animation: fadeInDown 0.6s ease-out;

  .header-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    flex-wrap: wrap;
    padding-top: 2rem;
  }

  .page-title {
    font-size: 2.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, var(--vp-c-brand) 0%, var(--vp-c-brand-light) 100%);
    background-clip: text;
    -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
    margin: 0;
  }

  .header-animation {
  position: relative;
  width: 280px;
  height: 60px;
  overflow: visible;
  
  .floating-gif {
    width: 60px;
    height: 60px;
    object-fit: contain;
    filter: drop-shadow(0 4px 12px rgba(var(--vp-c-brand-rgb), 0.3));
    animation: elasticRun 10s ease-out infinite;
    
    &:hover {
      filter: brightness(1.2) drop-shadow(0 8px 20px rgba(var(--vp-c-brand-rgb), 0.5));
      animation-play-state: paused;
    }
  }
}
}
@keyframes elasticRun {
  /* 去程：从左侧边缘外到右侧边缘外 */
  0% {
    transform: translateX(0vw) rotateY(0deg);
  }
  49.9% {
    transform: translateX(40vw) rotateY(0deg);
    animation-timing-function: ease-in;
  }
  
  /* 在右边界转身 */
  50% {
    transform: translateX(40vw) rotateY(0deg);
  }
  50.1% {
    transform: translateX(40vw) rotateY(180deg);
    animation-timing-function: ease-out;
  }
  
  /* 回程：从右侧边缘外回到左侧边缘外 */
  99.9% {
    transform: translateX(0vw) rotateY(180deg);
    animation-timing-function: ease-in;
  }
  
  /* 在左边界转身 */
  100% {
    transform: translateX(0vw) rotateY(180deg);
  }
  0.1% {
    transform: translateX(0vw) rotateY(0deg);
  }
}
/* 空状态样式 */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  animation: fadeIn 0.8s ease-out;

  .empty-animation {
    

    .pulse-gif {
      width: 200px;
      height: 100px;
      object-fit: contain;
      animation: pulse 2s ease-in-out infinite;
      filter: drop-shadow(0 8px 24px rgba(var(--vp-c-gray-rgb), 0.25));
    }
  }

  .empty-text {
    font-size: 1.2rem;
    color: var(--vp-c-text-2);
    margin: 0;
    animation: typing 2s steps(20, end);
  }
}

/* 文章列表样式 */
.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

/* 文章卡片样式 */
.article-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.5s ease-out;
  animation-fill-mode: both;

  @for $i from 1 through 10 {
    &:nth-child(#{$i}) {
      animation-delay: #{$i * 0.1}s;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(var(--vp-c-brand-rgb), 0.1) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: var(--vp-c-brand);
    box-shadow: 0 12px 32px rgba(var(--vp-c-brand-rgb), 0.15);

    &::before {
      opacity: 1;
    }

    .title-underline {
      transform: scaleX(1);
    }

    .read-more-icon {
      transform: translateX(4px);
    }
  }
}

.article-content {
  position: relative;
  z-index: 1;
}

.article-header {
  margin-bottom: 1.5rem;
}

.title-wrapper {
  position: relative;
  display: inline-block;
  margin-bottom: 0.75rem;
}

.article-title {
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem 0;
  transition: color 0.3s ease;
}

.title-underline {
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 100%;
  height: 3px;
  background: linear-gradient(90deg, var(--vp-c-brand), var(--vp-c-brand-light));
  border-radius: 2px;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* 元信息标签样式 */
.meta-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.meta-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(var(--vp-c-gray-soft-rgb), 0.5);
  border: 1px solid var(--vp-c-border);
  border-radius: 20px;
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(var(--vp-c-brand-rgb), 0.1);
    border-color: var(--vp-c-brand);
    color: var(--vp-c-brand);
  }

  .tag-icon {
    flex-shrink: 0;
    opacity: 0.7;
  }
}

.tag-list {
  .tags {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .tag-item {
    &:not(:last-child)::after {
      content: '•';
      margin-left: 0.25rem;
      opacity: 0.5;
    }
  }

  .tag-more {
    margin-left: 0.25rem;
    font-size: 0.75rem;
    opacity: 0.7;
  }
}

/* 摘要内容样式 */
.article-excerpt {
  color: var(--vp-c-text-2);
  line-height: 1.7;
  margin: 1.5rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp:2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  :deep(h1) { display: none; }
  :deep(h2) { font-size: 1.2em; margin: 0.75rem 0; }
  :deep(h3) { font-size: 1.15em; margin: 0.5rem 0; }
  :deep(p) { margin: 0.5rem 0; }
}

/* 阅读更多指示 */
.read-more {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-brand);
  font-size: 0.95rem;
  font-weight: 500;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  .article-card:hover & {
    opacity: 1;
    transform: translateY(0);
  }

  .read-more-icon {
    transition: transform 0.3s ease;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header .header-content {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .article-list {
    grid-template-columns: 1fr;
  }

  .meta-tags {
    gap: 0.5rem;
  }

  .meta-tag {
    font-size: 0.8125rem;
    padding: 0.25rem 0.5rem;
  }
}

@media (max-width: 419px) {
  .article-card {
    border-radius: 8px;
    padding: 1.25rem;
  }

  .article-title {
    font-size: 1.3rem;
  }
}

/* 动画关键帧 */
@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(2deg);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.9;
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

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}
</style>