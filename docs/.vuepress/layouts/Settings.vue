<script setup>
import ParentLayout from "@vuepress/theme-default/layouts/Layout.vue";
import SettingsEntry from "../components/SettingsEntry.vue";
import SiteSettingsEngine from "../components/SiteSettingsEngine.vue";
import ColorModeToggle from "../components/ColorModeToggle.vue";
import SiteSettings from "../components/SiteSettings.vue";
</script>

<template>
  <ParentLayout>
    <template #navbar-after>
      <ColorModeToggle />
      <SettingsEntry />
      <SiteSettingsEngine />
    </template>

    <template #page>
      <main class="settings-page">
        <SiteSettings />
      </main>
    </template>
  </ParentLayout>
</template>

<style scoped>
.settings-page {
  box-sizing: border-box;
  width: 100%;
  min-height: calc(100vh - var(--navbar-height));
  /* 导航栏为 fixed 定位，内容需整体下移避开 */
  padding: calc(var(--navbar-height) + 1.75rem) 1.5rem 3rem;
  background: var(--vp-c-bg);
}

@media (max-width: 719px) {
  .settings-page {
    padding: calc(var(--navbar-height) + 1.1rem) 0.9rem 2.5rem;
  }
}
</style>
