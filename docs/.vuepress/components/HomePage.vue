<template>
  <div class="home-page">
    <!-- Hero 区域 -->
    <div v-if="$frontmatter.home" class="hero">
      <img
        v-if="$frontmatter.heroImage"
        :src="$frontmatter.heroImage"
        :alt="$frontmatter.heroAlt"
        class="hero-image"
      />
      <h1 v-if="$frontmatter.heroText" class="hero-text">
        {{ $frontmatter.heroText }}
      </h1>
      <p v-if="$frontmatter.tagline" class="tagline">
        {{ $frontmatter.tagline }}
      </p>
      
      <!-- Actions -->
      <div v-if="$frontmatter.actions" class="actions">
        <div
          v-for="action in $frontmatter.actions"
          :key="action.text"
          class="action"
        >
          <NavLink
            :item="action"
            class="action-button"
            :class="[action.type, action.size]"
          />
        </div>
      </div>
    </div>
    
    <!-- Features -->
    <div v-if="$frontmatter.features" class="features">
      <div
        v-for="feature in $frontmatter.features"
        :key="feature.title"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>
    
    <!-- 默认插槽用于显示 README.md 内容 -->
    <Content class="theme-default-content custom-content" />
    
    <!-- Footer -->
    <footer v-if="$frontmatter.footer" class="footer">
      {{ $frontmatter.footer }}
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
.home-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
}

.hero {
  text-align: center;
  padding: 4rem 0;
}

.hero-image {
  max-height: 280px;
  margin-bottom: 2rem;
}

.hero-text {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.tagline {
  font-size: 1.8rem;
  font-weight: 300;
  color: var(--c-text-light);
  margin-bottom: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.action-button {
  padding: 0.8rem 1.6rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.action-button.primary {
  background-color: var(--c-brand);
  color: white;
  border: none;
}

.action-button.primary:hover {
  background-color: var(--c-brand-light);
}

.action-button.secondary {
  background-color: transparent;
  color: var(--c-brand);
  border: 2px solid var(--c-brand);
}

.action-button.secondary:hover {
  background-color: var(--c-brand);
  color: white;
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  padding: 2rem 0;
  border-top: 1px solid var(--c-border);
  border-bottom: 1px solid var(--c-border);
}

.feature {
  padding: 1.5rem;
  border-radius: 12px;
  background: var(--c-bg-soft);
  transition: transform 0.2s ease;
}

.feature:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.feature h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--c-brand);
}

.footer {
  text-align: center;
  padding: 2rem 0;
  margin-top: 4rem;
  border-top: 1px solid var(--c-border);
  color: var(--c-text-light);
  font-size: 0.9rem;
}

.custom-content {
  margin-top: 3rem;
}
</style>