<!-- .vuepress/components/RightSidebarToc.vue -->
<template>
    <div class="right-toc">
        <h4 class="toc-title">当前章节三级标题</h4>
        <CustomToc v-if="currentPagePath" :page-path="currentPagePath" class="toc-list" />
        <p v-else class="toc-empty">请选择左侧二级标题</p>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarItems } from '@vuepress/plugin-sidebar/client'

const route = useRoute()
const currentPagePath = ref<string | null>(null)
const { sidebarItems } = useSidebarItems()

// 监听路由变化（左侧侧边栏点击二级标题会触发路由跳转）
watch(
    () => route.path,
    (newPath) => {
        // 过滤出左侧侧边栏中「二级标题对应的页面路径」（与 sidebar 配置匹配）
        const matchedItem = findMatchedSidebarItem(sidebarItems.value, newPath)
        if (matchedItem) {
            currentPagePath.value = newPath // 绑定当前页面路径，让 CustomToc 渲染该页面的 h3
        }
    },
    { immediate: true }
)

// 去除链接中的 hash（锚点），例如 '/posts/a.html#sec' -> '/posts/a.html'
const stripHash = (link: string | null | undefined): string | null | undefined => {
    if (!link) return link
    return link.split('#')[0]
}

// 递归查找左侧侧边栏中与当前路由匹配的项（确认是二级标题对应的页面）
const findMatchedSidebarItem = (items: any[], path: string): boolean => {
    for (const item of items) {
        const itemBase = stripHash(item.link)
        if (itemBase === path && item.depth === 2) { // depth=2 对应二级标题
            return true
        }
        if (item.children && item.children.length) {
            const matched = findMatchedSidebarItem(item.children, path)
            if (matched) return true
        }
    }
    return false
}
</script>

<style scoped>
.right-toc {
    padding: 16px;
    border-left: 1px solid #eee;
    height: 100vh;
    position: sticky;
    top: 0;
}

.toc-title {
    font-size: 16px;
    margin: 0 0 16px 0;
    color: #333;
}

.toc-list {
    list-style: none;
    padding: 0;
}

.toc-list li {
    margin: 8px 0;
}

.toc-list a {
    color: #666;
    text-decoration: none;
    transition: color 0.2s;
}

.toc-list a:hover {
    color: #42b983;
}

.toc-empty {
    color: #999;
    font-size: 14px;
}
</style>