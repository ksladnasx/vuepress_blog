<template>
  <div class="home-page">
    <header v-if="$frontmatter.home" class="hero">
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

      <nav v-if="$frontmatter.actions" class="actions" aria-label="首页入口">
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
      </nav>
    </header>

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

    <Content class="theme-default-content custom-content" />

    <footer v-if="$frontmatter.footer" class="footer">
      {{ $frontmatter.footer }}
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
.home-page {
  max-width: var(--homepage-width, 1120px);
  margin: 0 auto;
  padding: 2.25rem 2rem 3rem;
}

.hero {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 1rem;
  text-align: center;
  padding: 4.5rem 0 3.5rem;
  border-bottom: 1px solid var(--vp-c-border);
}

.hero-image {
  width: 172px;
  height: 172px;
  object-fit: cover;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  box-shadow: var(--xh-shadow-soft, 0 14px 34px rgb(31 41 55 / 10%));
}

.hero-text {
  margin: 0;
  color: var(--vp-c-text);
  font-size: 3.2rem;
  font-weight: 800;
  line-height: 1.2;
}

.tagline {
  max-width: 42rem;
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: 1.16rem;
  font-weight: 400;
  line-height: 1.85;
}

.actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.75rem;
}

.action-button {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  padding: 0.65rem 1.1rem;
  border-radius: 8px !important;
  font-size: 0.96rem;
  font-weight: 700;
  text-decoration: none !important;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.action-button.primary {
  border: 1px solid var(--vp-c-accent-bg);
  background: var(--vp-c-accent-bg);
  color: var(--vp-c-accent-text);
  box-shadow: 0 12px 28px rgb(var(--xh-accent-rgb, 47 125 99) / 18%);
}

.action-button.primary:hover {
  border-color: var(--vp-c-accent-hover);
  background: var(--vp-c-accent-hover);
  transform: translateY(-1px);
}

.action-button.secondary {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text);
}

.action-button.secondary:hover {
  border-color: var(--vp-c-accent);
  color: var(--vp-c-accent);
  transform: translateY(-1px);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  margin: 3rem 0;
  padding: 2rem 0;
  border-top: 1px solid var(--vp-c-border);
  border-bottom: 1px solid var(--vp-c-border);
}

.feature {
  padding: 1.2rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  transition:
    border-color 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.feature:hover {
  border-color: var(--vp-c-accent);
  box-shadow: var(--xh-shadow-soft, 0 14px 34px rgb(31 41 55 / 10%));
  transform: translateY(-2px);
}

.feature h2 {
  margin: 0 0 0.65rem;
  color: var(--vp-c-text);
  font-size: 1.2rem;
}

.footer {
  text-align: center;
  padding: 1.75rem 0 0;
  margin-top: 3rem;
  border-top: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-subtle);
  font-size: 0.9rem;
}

.custom-content {
  margin-top: 2.5rem;
  padding: 0;
}

@media (max-width: 768px) {
  .home-page {
    padding: 1.4rem 1.1rem 2.5rem;
  }

  .hero {
    padding: 3rem 0 2.25rem;
  }

  .hero-image {
    width: 136px;
    height: 136px;
  }

  .hero-text {
    font-size: 2.35rem;
  }

  .tagline {
    font-size: 1rem;
  }
}

@media (max-width: 419px) {
  .actions {
    width: 100%;
  }

  .action,
  .action-button {
    width: 100%;
    justify-content: center;
  }
}
</style>
