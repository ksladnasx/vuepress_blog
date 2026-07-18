---
title: 介绍
description: 王涵的个人介绍、技术方向与博客入口
sidebar: false
---

<script setup>
const experiences = [
  {
    time: "2025.12 - 2026.05",
    title: "农担智能体开发平台",
    description:
      "参与工作流、知识库、Agent 对话、模型配置、审计日志等模块建设；用配置驱动思路重构工作流节点渲染，优化权限查询链路、文件上传校验和运行时异常兜底。",
  },
  {
    time: "2025.10 - 2025.12",
    title: "流量调度平台",
    description:
      "基于 Vue 3、Pinia 和 Element Plus 参与 RBAC 权限、动态路由和 ELB 监听器创建流程开发，完成多步表单、数据转换和接口串联。",
  },
  {
    time: "2025.10 - 2025.11",
    title: "电信 IT 慢 SQL 分析系统",
    description:
      "基于 React、Redux 和 Ant Design 做接口适配、慢 SQL 多条件筛选、结果弹窗展示及 PDF 导出样式处理。",
  },
];
</script>

# 介绍

<div class="get-started-page">
  <section class="about-hero">
    <p class="eyebrow">About xh's blog</p>
    <h2>把学习、项目和排查记录整理成以后还能翻回来的笔记。</h2>
    <p class="lead">
      我目前就读于重庆邮电大学网络工程专业，方向是前端开发，也在实习中接触并参与了 AI Agent 平台和 Python 后端业务开发。这个站点主要用来记录我在前端工程、全栈协作、AI 应用和课程学习中的实践经验。
    </p>
    <div class="hero-actions">
      <a class="action primary" href="/article/">阅读文章</a>
      <a class="action secondary" href="https://www.xhblog.cc.cd/" target="_blank" rel="noopener noreferrer">访问站点</a>
    </div>
  </section>

  <section class="profile-strip" aria-label="个人概览">
    <div>
      <span>方向</span>
      <strong>前端开发工程师</strong>
    </div>
    <div>
      <span>城市</span>
      <strong>成都 / 重庆</strong>
    </div>
    <div>
      <span>学校</span>
      <strong>重庆邮电大学</strong>
    </div>
    <div>
      <span>毕业</span>
      <strong>2027 年</strong>
    </div>
  </section>

  <section class="about-section">
    <div class="section-head">
      <p>Profile</p>
      <h2>我在做什么</h2>
    </div>
    <div class="two-column">
      <article class="text-panel">
        <h3>技术方向</h3>
        <p>
          我主要关注 Vue 3、React、TypeScript 和现代前端工程实践，喜欢把复杂业务拆成清晰的页面状态、组件边界和接口约定。实习期间参与过通信运营商数字化平台、流量调度平台、慢 SQL 分析系统，以及企业级 AI Agent 开发平台。
        </p>
        <p>
          除了前端，我也会参与 FastAPI、SQLModel、MySQL 相关的后端接口调整、业务逻辑修复和前后端联调。对我来说，全栈经验的价值不是“什么都写一点”，而是能更快理解数据从数据库到页面的完整链路。
        </p>
      </article>
      <article class="text-panel">
        <h3>这个博客</h3>
        <p>
          这里不是作品集模板，也不是堆关键词的地方。我会把平时踩过的坑、复盘过的项目、课程里的重点和一些 AI Coding 实践写下来，尽量保留问题出现时的上下文、排查路径和最后的取舍。
        </p>
        <p>
          如果你也是前端、全栈或 AI 应用方向的学习者，希望这些笔记能提供一点参考；如果过了一段时间我自己忘了，也能在这里重新把思路捡起来。
        </p>
      </article>
    </div>
  </section>

  <section class="about-section">
    <div class="section-head">
      <p>Skills</p>
      <h2>常用技术栈</h2>
    </div>
    <div class="skill-cloud">
      <span>HTML / CSS</span>
      <span>JavaScript / TypeScript</span>
      <span>Vue 3</span>
      <span>React</span>
      <span>Pinia / Redux</span>
      <span>Element Plus</span>
      <span>Ant Design</span>
      <span>Tailwind CSS</span>
      <span>FastAPI</span>
      <span>SQLModel</span>
      <span>MySQL</span>
      <span>Docker / Nginx</span>
      <span>Git Flow</span>
      <span>Dify / AI Agent</span>
      <span>Cursor / AI Coding</span>
    </div>
  </section>

  <section class="about-section">
    <div class="section-head">
      <p>Experience</p>
      <h2>最近的项目经历</h2>
    </div>
    <ResumeExperienceList :items="experiences" />
  </section>

  <section class="about-section">
    <div class="section-head">
      <p>Notes</p>
      <h2>从哪里开始看</h2>
    </div>
    <div class="entry-grid">
      <a class="entry-card" href="/article/">
        <span>全部文章</span>
        <strong>按更新时间浏览所有笔记</strong>
      </a>
      <a class="entry-card" href="/category/">
        <span>分类</span>
        <strong>按前端、后端、课程等主题查找</strong>
      </a>
      <a class="entry-card" href="/tag/">
        <span>标签</span>
        <strong>用关键词快速定位相关内容</strong>
      </a>
      <a class="entry-card" href="/timeline/">
        <span>时间线</span>
        <strong>按写作顺序回看学习轨迹</strong>
      </a>
    </div>
  </section>

  <section class="about-section contact-section">
    <div class="section-head">
      <p>Contact</p>
      <h2>保持联系</h2>
    </div>
    <div class="contact-links">
      <a href="mailto:wh82614088@126.com">wh82614088@126.com</a>
      <a href="https://github.com/ksladnasx" target="_blank" rel="noopener noreferrer">GitHub</a>
      <a href="https://github.com/ksladnasx/vuepress_blog" target="_blank" rel="noopener noreferrer">本站仓库</a>
    </div>
  </section>
</div>

<style>
.get-started-page {
  margin-top: 1.5rem;
  color: var(--vp-c-text);
}

.get-started-page a {
  text-decoration: none !important;
}

.get-started-page .about-hero {
  padding: 2rem;
  border: 1px solid rgb(var(--xh-accent-rgb) / 16%);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgb(var(--xh-accent-rgb) / 9%), transparent 42%),
    var(--vp-c-bg-elv);
  box-shadow: var(--xh-shadow-soft);
}

.get-started-page .eyebrow,
.get-started-page .section-head p {
  margin: 0 0 0.45rem;
  color: var(--vp-c-accent);
  font-size: 0.78rem !important;
  font-weight: 800 !important;
  letter-spacing: 0.08em !important;
  line-height: 1.35 !important;
  text-transform: uppercase;
}

.get-started-page .about-hero h2 {
  max-width: 46rem;
  margin: 0;
  color: var(--vp-c-text);
  font-size: 2.35rem !important;
  font-weight: 850 !important;
  line-height: 1.22 !important;
}

.get-started-page .lead {
  max-width: 47rem;
  margin: 1.15rem 0 0;
  color: var(--vp-c-text-mute);
  font-size: calc(var(--xh-font-size) * 1.02) !important;
  line-height: calc(var(--xh-line-height) + 0.02) !important;
}

.get-started-page .hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.35rem;
}

.get-started-page .action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.35rem;
  padding: 0 1rem;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 800;
  transition:
    background-color var(--vp-t-color),
    border-color var(--vp-t-color),
    color var(--vp-t-color),
    transform var(--vp-t-transform);
}

.get-started-page .action:hover {
  transform: translateY(-1px);
}

.get-started-page .action.primary {
  background: var(--vp-c-accent-bg);
  color: var(--vp-c-accent-text, #ffffff) !important;
}

.get-started-page .action.primary:hover {
  background: var(--vp-c-accent-hover);
}

.get-started-page .action.secondary {
  border-color: rgb(var(--xh-accent-rgb) / 22%);
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent) !important;
}

.get-started-page .profile-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
  margin: 1rem 0 2.2rem;
}

.get-started-page .profile-strip div,
.get-started-page .text-panel,
.get-started-page .entry-card {
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
}

.get-started-page .profile-strip div {
  padding: 0.85rem 1rem;
}

.get-started-page .profile-strip span,
.get-started-page .entry-card span {
  display: block;
  color: var(--vp-c-text-subtle);
  font-size: 0.78rem !important;
  font-weight: 700 !important;
  line-height: 1.45 !important;
}

.get-started-page .profile-strip strong {
  display: block;
  margin-top: 0.25rem;
  color: var(--vp-c-text);
  font-size: 0.98rem !important;
  line-height: 1.45 !important;
}

.get-started-page .about-section {
  margin-top: 2.4rem;
}

.get-started-page .section-head {
  margin-bottom: 0.9rem;
}

.get-started-page .section-head h2 {
  margin: 0;
  border: 0;
  padding: 0;
  color: var(--vp-c-text);
  font-size: 1.45rem !important;
  font-weight: 850 !important;
  line-height: 1.35 !important;
}

.get-started-page .two-column {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
}

.get-started-page .text-panel {
  padding: 1.2rem;
}

.get-started-page .text-panel h3 {
  /* margin: 0 0 0.5rem; */
  color: var(--vp-c-text);
  /* font-size: 1.05rem !important; */
  font-weight: 820 !important;
  line-height: 1.45 !important;
}

.get-started-page .text-panel p {
  margin: 0.65rem 0 0;
  color: var(--vp-c-text-mute);
  line-height: calc(var(--xh-line-height) + 0.02) !important;
}

.get-started-page .skill-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
}

.get-started-page .skill-cloud span {
  display: inline-flex;
  align-items: center;
  min-height: 2rem;
  padding: 0 0.75rem;
  border: 1px solid rgb(var(--xh-accent-rgb) / 16%);
  border-radius: 8px;
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
  font-size: calc(var(--xh-font-size) * 0.78) !important;
  font-weight: 780 !important;
  line-height: 1.35 !important;
}

.get-started-page .entry-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
}

.get-started-page .entry-card {
  display: flex;
  min-height: 4rem;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  color: var(--vp-c-text) !important;
  transition:
    border-color var(--vp-t-color),
    background-color var(--vp-t-color),
    transform var(--vp-t-transform),
    box-shadow var(--vp-t-transform);
}

.get-started-page .entry-card:hover {
  border-color: rgb(var(--xh-accent-rgb) / 28%);
  background: var(--vp-c-accent-soft);
  box-shadow: var(--xh-shadow-soft);
  transform: translateY(-2px);
}

.get-started-page .entry-card strong {
  margin-top: 1rem;
  color: var(--vp-c-text);
  font-size: 0.92rem !important;
  line-height: 1.55 !important;
}

.get-started-page .contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.get-started-page .contact-links a {
  display: inline-flex;
  align-items: center;
  min-height: 2.25rem;
  padding: 0 0.85rem;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  background: var(--vp-c-bg-elv);
  color: var(--vp-c-text) !important;
  font-weight: 760;
  overflow-wrap: anywhere;
}

.get-started-page .contact-links a:hover {
  border-color: rgb(var(--xh-accent-rgb) / 26%);
  color: var(--vp-c-accent) !important;
}

html[data-theme="dark"] .get-started-page .about-hero {
  background:
    linear-gradient(135deg, rgb(var(--xh-accent-rgb) / 12%), transparent 46%),
    var(--vp-c-bg-elv);
}

@media (max-width: 900px) {
  .get-started-page .profile-strip,
  .get-started-page .entry-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .get-started-page .two-column {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .get-started-page .about-hero {
    padding: 1.35rem;
  }

  .get-started-page .about-hero h2 {
    font-size: 1.85rem !important;
  }

  .get-started-page .profile-strip,
  .get-started-page .entry-grid {
    grid-template-columns: 1fr;
  }
}
</style>
