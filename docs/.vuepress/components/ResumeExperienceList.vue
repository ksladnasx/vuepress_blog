<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<template>
  <ol class="resume-experience-list">
    <li
      v-for="item in items"
      :key="`${item.time}-${item.title}`"
      class="resume-experience-card"
    >
      <div class="experience-meta">
        <time>{{ item.time }}</time>
        <h3>{{ item.title }}</h3>
      </div>
      <p>{{ item.description }}</p>
    </li>
  </ol>
</template>

<style scoped>
.resume-experience-list {
  display: grid;
  gap: 0.85rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.resume-experience-card {
  display: grid;
  grid-template-columns: minmax(12rem, 0.48fr) minmax(0, 0.52fr);
  gap: clamp(0.85rem, 2vw, 1.25rem);
  align-items: start;
  padding: 1rem 1.1rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  transition:
    background-color var(--vp-t-color),
    box-shadow var(--vp-t-transform),
    transform var(--vp-t-transform);
}

.resume-experience-card:hover {
  border-color: rgb(var(--xh-accent-rgb) / 26%);
  background:
    linear-gradient(90deg, rgb(var(--xh-accent-rgb) / 8%), transparent 42%),
    var(--vp-c-bg-elv);
  box-shadow: var(--xh-shadow-soft);
  transform: translateY(-1px);
}

.experience-meta {
  display: flex;
  min-width: 0;
  flex-direction: column;
  gap: 0.4rem;
  padding-inline-end: 1rem;
  border-inline-end: 1px solid rgb(var(--xh-accent-rgb) / 14%);
}

.experience-meta time {
  display: block;
  color: var(--vp-c-accent);
  font-size: calc(var(--xh-font-size) * 0.74) !important;
  font-weight: 820 !important;
  letter-spacing: 0 !important;
  line-height: 1.35 !important;
}

.experience-meta h3 {
  margin: 0;
  color: var(--vp-c-text);
  font-size: calc(var(--xh-font-size) * 1.02) !important;
  font-weight: 850 !important;
  letter-spacing: 0 !important;
  line-height: 1.38 !important;
}

.resume-experience-card p {
  margin: 0;
  color: var(--vp-c-text-mute);
  font-size: calc(var(--xh-font-size) * 0.94) !important;
  line-height: calc(var(--xh-line-height) + 0.02) !important;
}

:global(html[data-theme="dark"]) .resume-experience-card:hover {
  background:
    linear-gradient(90deg, rgb(var(--xh-accent-rgb) / 10%), transparent 46%),
    var(--vp-c-bg-elv);
}

@media (max-width: 640px) {
  .resume-experience-card {
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .experience-meta {
    padding: 0 0 0.75rem;
    border-inline-end: 0;
    border-bottom: 1px solid rgb(var(--xh-accent-rgb) / 14%);
  }
}
</style>
