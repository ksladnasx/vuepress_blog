import { defineClientConfig } from 'vuepress/client'
import Layout from './layouts/Layout.vue'
import Article from './layouts/Article.vue'
import Category from './layouts/Category.vue'
import Tag from './layouts/Tag.vue'
import Timeline from './layouts/Timeline.vue'
import HomePage from './components/HomePage.vue'

export default defineClientConfig({
  layouts: {
    Layout,
    Article,
    Category,
    Tag,
    Timeline,
    HomePage
  },
})
