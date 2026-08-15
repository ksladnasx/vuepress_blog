const REPOSITORY = "ksladnasx/vuepress_blog";
const BRANCH = "main";
const POSTS_ROOT = "docs/posts/";
const UPLOADS_ROOT = "docs/.vuepress/public/uploads/";
const THEME_KEY = "vuepress-color-scheme";
const UNCATEGORISED = "未分类";

const state = {
  token: "",
  articles: [],
  selectedPath: "",
  selectedSha: "",
  selectedCategories: [],
  selectedTags: [],
  folders: [],
  expandedCategories: new Set(),
  openMulti: "",
  toastTimer: 0,
};

const elements = {
  accessView: document.querySelector("#access-view"),
  workspace: document.querySelector("#workspace"),
  accessForm: document.querySelector("#access-form"),
  token: document.querySelector("#token"),
  tokenVisibility: document.querySelector("#token-visibility"),
  accessSubmit: document.querySelector("#access-submit"),
  accessStatus: document.querySelector("#access-status"),
  themeToggle: document.querySelector("#theme-toggle"),
  accountName: document.querySelector("#account-name"),
  signOut: document.querySelector("#sign-out"),
  newArticle: document.querySelector("#new-article"),
  emptyCreate: document.querySelector("#empty-create"),
  articleCount: document.querySelector("#article-count"),
  emptyCount: document.querySelector("#empty-count"),
  articleSearch: document.querySelector("#article-search"),
  articleList: document.querySelector("#article-list"),
  editorEmpty: document.querySelector("#editor-empty"),
  editorLoading: document.querySelector("#editor-loading"),
  editorPanel: document.querySelector("#editor-panel"),
  mobileBack: document.querySelector("#mobile-back"),
  resetEditor: document.querySelector("#reset-editor"),
  deleteArticle: document.querySelector("#delete-article"),
  publishArticle: document.querySelector("#publish-article"),
  editorMode: document.querySelector("#editor-mode"),
  filePath: document.querySelector("#file-path"),
  date: document.querySelector("#article-date"),
  folder: document.querySelector("#article-folder"),
  categoryControl: document.querySelector("#category-control"),
  categoryChips: document.querySelector("#category-chips"),
  categoryInput: document.querySelector("#category-input"),
  categoryMenu: document.querySelector("#category-menu"),
  tagControl: document.querySelector("#tag-control"),
  tagChips: document.querySelector("#tag-chips"),
  tagInput: document.querySelector("#tag-input"),
  tagMenu: document.querySelector("#tag-menu"),
  extra: document.querySelector("#article-extra"),
  body: document.querySelector("#article-body"),
  publishStatus: document.querySelector("#publish-status"),
  folderOptions: document.querySelector("#folder-options"),
  imageUpload: document.querySelector("#image-upload"),
  deleteDialog: document.querySelector("#delete-dialog"),
  deleteDescription: document.querySelector("#delete-description"),
  confirmDelete: document.querySelector("#confirm-delete"),
  toast: document.querySelector("#toast"),
  toastCopy: document.querySelector("#toast-copy"),
};

const multiSelects = {
  category: {
    control: elements.categoryControl,
    chips: elements.categoryChips,
    input: elements.categoryInput,
    menu: elements.categoryMenu,
    stateKey: "selectedCategories",
    sourceKey: "categories",
  },
  tag: {
    control: elements.tagControl,
    chips: elements.tagChips,
    input: elements.tagInput,
    menu: elements.tagMenu,
    stateKey: "selectedTags",
    sourceKey: "tags",
  },
};

const isMobile = () => window.matchMedia("(max-width: 780px)").matches;

const setStatus = (target, message = "", type = "") => {
  target.textContent = message;
  target.className = type ? `${target.id} is-${type}` : target.id;
};

const setBusy = (button, busy, text) => {
  if (!button.dataset.defaultText) {
    button.dataset.defaultText = button.textContent;
  }

  button.disabled = busy;
  button.textContent = busy ? text : button.dataset.defaultText;
};

const showToast = (message, type = "success", duration = 4500) => {
  window.clearTimeout(state.toastTimer);
  elements.toast.hidden = false;
  elements.toast.className = `toast is-${type}`;
  elements.toastCopy.textContent = message;
  elements.toast.style.removeProperty("--toast-duration");

  if (!duration) return;

  elements.toast.classList.add("is-timed");
  elements.toast.style.setProperty("--toast-duration", `${duration}ms`);
  state.toastTimer = window.setTimeout(() => {
    elements.toast.hidden = true;
  }, duration);
};

const encodePath = (path) => path.split("/").map(encodeURIComponent).join("/");

const encodeBase64 = (value) => {
  const bytes = new TextEncoder().encode(value);
  let binary = "";

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
};

const decodeBase64 = (value) => {
  const binary = atob(value.replace(/\s/g, ""));
  const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

const readFileAsBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error("图片读取失败。"));
    reader.onload = () => {
      const dataUrl = String(reader.result);
      resolve(dataUrl.slice(dataUrl.indexOf(",") + 1));
    };
    reader.readAsDataURL(file);
  });

const githubRequest = async (path, options = {}) => {
  const response = await fetch(`https://api.github.com${path}`, {
    ...options,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${state.token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...options.headers,
    },
  });

  if (response.status === 204) {
    return null;
  }

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || "GitHub 请求失败。");
  }

  return payload;
};

const today = () => new Date().toISOString().slice(0, 10);

const getTheme = () => {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyTheme = (theme, persist = false) => {
  document.documentElement.dataset.theme = theme;
  elements.themeToggle.setAttribute(
    "aria-label",
    theme === "dark" ? "切换到浅色主题" : "切换到深色主题",
  );

  if (!persist) return;

  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {}
};

const toggleTheme = () => {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(next, true);
};

const slugify = (value) => {
  const slug = value
    .trim()
    .replace(/[\\/:*?"<>|]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `article-${Date.now()}`;
};

const normaliseFolder = (value) =>
  value
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-zA-Z0-9_\-\u4e00-\u9fff/]/g, "");

const normaliseMetaValue = (value) => value.trim().replace(/\s+/g, " ");

const serialiseList = (key, items) => {
  if (!items.length) return "";
  return `${key}:\n${items.map((item) => `  - ${item}`).join("\n")}`;
};

const parseFrontmatter = (source) => {
  if (!source.startsWith("---\n") && !source.startsWith("---\r\n")) {
    return { frontmatter: "", content: source };
  }

  const marker = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!marker) {
    return { frontmatter: "", content: source };
  }

  return {
    frontmatter: marker[1],
    content: source.slice(marker[0].length),
  };
};

const parseListValue = (frontmatter, key) => {
  const block = frontmatter.match(
    new RegExp(`^${key}:\\s*\\r?\\n((?:\\s+- .*\\r?\\n?)*)`, "m"),
  );

  if (block) {
    return block[1]
      .split(/\r?\n/)
      .map((line) => line.replace(/^\s+-\s*/, "").trim())
      .filter(Boolean);
  }

  const inline = frontmatter.match(new RegExp(`^${key}:\\s*\\[(.*)\\]\\s*$`, "m"));

  if (inline) {
    return inline[1]
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return [];
};

const removeKnownFrontmatter = (frontmatter) => {
  const lines = frontmatter.split(/\r?\n/);
  const result = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (/^(date|category|tag):(?:\s.*)?$/.test(line)) {
      if (/^(category|tag):\s*$/.test(line)) {
        while (index + 1 < lines.length && /^\s+-\s/.test(lines[index + 1])) {
          index += 1;
        }
      }
      continue;
    }

    result.push(line);
  }

  return result.join("\n").trim();
};

const extractTitle = (source) => {
  const heading = source.match(/^#\s+(.+?)\s*$/m);
  return heading?.[1]?.trim() || "";
};

const parseArticle = (source) => {
  const { frontmatter, content } = parseFrontmatter(source);

  return {
    title: extractTitle(content),
    date: frontmatter.match(/^date:\s*([^\r\n]+)/m)?.[1]?.trim() || today(),
    categories: parseListValue(frontmatter, "category"),
    tags: parseListValue(frontmatter, "tag"),
    extra: removeKnownFrontmatter(frontmatter),
    body: content,
  };
};

const articleSource = () => {
  const metadata = [
    `date: ${elements.date.value || today()}`,
    serialiseList("category", state.selectedCategories),
    serialiseList("tag", state.selectedTags),
    elements.extra.value.trim(),
  ]
    .filter(Boolean)
    .join("\n");
  const body = elements.body.value.replace(/^\s+/, "");

  return `---\n${metadata}\n---\n\n${body}`;
};

const articlePath = (title) => {
  const folder = normaliseFolder(elements.folder.value);
  return `${POSTS_ROOT}${folder}/${slugify(title)}.md`;
};

const articleLabel = (path) => path.split("/").pop().replace(/\.md$/i, "");

const getFolderFromPath = (path) =>
  path.slice(POSTS_ROOT.length).split("/").slice(0, -1).join("/");

const sortArticles = (articles) =>
  [...articles].sort((articleA, articleB) => {
    const dateDifference =
      new Date(articleB.date || 0).getTime() - new Date(articleA.date || 0).getTime();

    if (dateDifference) return dateDifference;
    return articleA.title.localeCompare(articleB.title, "zh-CN");
  });

const mapWithConcurrency = async (items, limit, callback) => {
  const results = new Array(items.length);
  let nextIndex = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await callback(items[index]);
    }
  });

  await Promise.all(workers);
  return results;
};

const refreshFolderOptions = () => {
  state.folders = [...new Set(state.articles.map((article) => article.folder).filter(Boolean))]
    .sort((folderA, folderB) => folderA.localeCompare(folderB, "zh-CN"));
  elements.folderOptions.replaceChildren(
    ...state.folders.map((folder) => {
      const option = document.createElement("option");
      option.value = folder;
      return option;
    }),
  );
};

const setMobileView = (view) => {
  if (isMobile()) {
    elements.workspace.dataset.mobileView = view;
  }
};

const updateEditorMode = (isExisting) => {
  elements.editorMode.textContent = isExisting ? "编辑文章" : "新文章";
  elements.deleteArticle.hidden = !isExisting;
};

const getKnownMetaValues = (kind) => {
  const sourceKey = multiSelects[kind].sourceKey;
  const values = state.articles.flatMap((article) => article[sourceKey] || []);

  return [...new Set(values.map(normaliseMetaValue).filter(Boolean))]
    .sort((valueA, valueB) => valueA.localeCompare(valueB, "zh-CN"));
};

const getSelectedMetaValues = (kind) => state[multiSelects[kind].stateKey];

const setSelectedMetaValues = (kind, values) => {
  state[multiSelects[kind].stateKey] = [...new Set(values.map(normaliseMetaValue).filter(Boolean))];
};

const renderMultiSelect = (kind) => {
  const config = multiSelects[kind];
  const selected = getSelectedMetaValues(kind);
  const query = normaliseMetaValue(config.input.value);
  const knownValues = getKnownMetaValues(kind);
  const availableValues = knownValues.filter(
    (value) =>
      !selected.includes(value) &&
      (!query || value.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
  );
  const hasExactMatch = knownValues.some(
    (value) => value.toLocaleLowerCase() === query.toLocaleLowerCase(),
  );

  config.chips.replaceChildren(
    ...selected.map((value) => {
      const chip = document.createElement("span");
      const label = document.createElement("span");
      const remove = document.createElement("button");

      chip.className = "multi-chip";
      label.className = "multi-chip-label";
      label.textContent = value;
      remove.className = "multi-chip-remove";
      remove.type = "button";
      remove.dataset.multiRemove = kind;
      remove.dataset.value = value;
      remove.setAttribute("aria-label", `移除${value}`);
      remove.textContent = "×";
      chip.append(label, remove);
      return chip;
    }),
  );

  config.menu.replaceChildren(
    ...availableValues.map((value) => {
      const option = document.createElement("button");
      const text = document.createElement("span");
      const meta = document.createElement("span");

      option.type = "button";
      option.className = "multi-option";
      option.dataset.multiSelect = kind;
      option.dataset.value = value;
      text.textContent = value;
      meta.className = "multi-option-meta";
      meta.textContent = "选择";
      option.append(text, meta);
      return option;
    }),
  );

  if (query && !selected.includes(query) && !hasExactMatch) {
    const create = document.createElement("button");
    const text = document.createElement("span");
    const meta = document.createElement("span");

    create.type = "button";
    create.className = "multi-option is-add";
    create.dataset.multiAdd = kind;
    create.dataset.value = query;
    text.textContent = `新增 “${query}”`;
    meta.className = "multi-option-meta";
    meta.textContent = "添加";
    create.append(text, meta);
    config.menu.append(create);
  }

  config.menu.hidden = state.openMulti !== kind;
};

const renderMultiSelects = () => {
  renderMultiSelect("category");
  renderMultiSelect("tag");
};

const addMetaValue = (kind, value) => {
  const normalised = normaliseMetaValue(value);
  if (!normalised) return;

  setSelectedMetaValues(kind, [...getSelectedMetaValues(kind), normalised]);
  multiSelects[kind].input.value = "";
  state.openMulti = kind;
  renderMultiSelects();
  multiSelects[kind].input.focus();
};

const removeMetaValue = (kind, value) => {
  setSelectedMetaValues(
    kind,
    getSelectedMetaValues(kind).filter((item) => item !== value),
  );
  renderMultiSelects();
};

const fillEditor = (article = null) => {
  const isExisting = Boolean(article);
  state.selectedPath = article?.path || "";
  state.selectedSha = article?.sha || "";
  updateEditorMode(isExisting);
  elements.filePath.textContent = isExisting ? article.path : "发布时将创建新文件";
  elements.date.value = article?.date || today();
  elements.folder.value = article?.folder || state.folders[0] || "otherlearning";
  elements.folder.readOnly = isExisting;
  elements.folder.title = isExisting ? "已有文章保留原有文件路径" : "";
  setSelectedMetaValues("category", article?.categories || []);
  setSelectedMetaValues("tag", article?.tags || []);
  elements.extra.value = article?.extra || "";
  elements.body.value = article?.body || "";
  state.openMulti = "";
  renderMultiSelects();
};

const showOverview = () => {
  elements.editorPanel.hidden = true;
  elements.editorLoading.hidden = true;
  elements.editorEmpty.hidden = false;
  setMobileView("library");
  renderArticleList();
};

const showLoadingEditor = () => {
  elements.editorEmpty.hidden = true;
  elements.editorPanel.hidden = true;
  elements.editorLoading.hidden = false;
  setMobileView("editor");
  renderArticleList();
};

const showEditor = () => {
  elements.editorEmpty.hidden = true;
  elements.editorLoading.hidden = true;
  elements.editorPanel.hidden = false;
  setMobileView("editor");
  renderArticleList();
};

const updateSummary = () => {
  const categoryCount = new Set(
    state.articles.flatMap((article) => article.categories.length ? article.categories : [UNCATEGORISED]),
  ).size;
  elements.articleCount.textContent = `${state.articles.length} 篇文章 · ${categoryCount} 个分类`;
  elements.emptyCount.textContent = `${state.articles.length} 篇文章 · ${categoryCount} 个分类`;
};

const getVisibleGroups = () => {
  const query = elements.articleSearch.value.trim().toLocaleLowerCase();
  const groups = new Map();

  state.articles.forEach((article) => {
    const categories = article.categories.length ? article.categories : [UNCATEGORISED];
    const articleSearchText = [
      article.title,
      article.path,
      article.folder,
      ...categories,
      ...article.tags,
    ]
      .join(" ")
      .toLocaleLowerCase();

    if (query && !articleSearchText.includes(query)) return;

    categories.forEach((category) => {
      const group = groups.get(category) || [];
      group.push(article);
      groups.set(category, group);
    });
  });

  return [...groups.entries()]
    .sort(([categoryA], [categoryB]) => {
      if (categoryA === UNCATEGORISED) return 1;
      if (categoryB === UNCATEGORISED) return -1;
      return categoryA.localeCompare(categoryB, "zh-CN");
    })
    .map(([category, articles]) => ({ category, articles: sortArticles(articles) }));
};

const renderArticleList = () => {
  const groups = getVisibleGroups();
  const isSearching = Boolean(elements.articleSearch.value.trim());
  elements.articleList.replaceChildren();
  updateSummary();

  if (!groups.length) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = isSearching ? "没有匹配的文章" : "还没有文章";
    elements.articleList.append(empty);
    return;
  }

  groups.forEach(({ category, articles }) => {
    const group = document.createElement("section");
    const toggle = document.createElement("button");
    const chevron = document.createElement("span");
    const name = document.createElement("span");
    const count = document.createElement("span");
    const articleContainer = document.createElement("div");
    const isExpanded = isSearching || state.expandedCategories.has(category);

    group.className = "category-group";
    toggle.type = "button";
    toggle.className = "category-toggle";
    toggle.dataset.category = category;
    toggle.setAttribute("aria-expanded", String(isExpanded));
    chevron.className = "chevron-glyph";
    chevron.setAttribute("aria-hidden", "true");
    name.className = "category-name";
    name.textContent = category;
    count.className = "category-count";
    count.textContent = String(articles.length);
    toggle.append(chevron, name, count);

    articleContainer.className = "category-articles";
    articleContainer.hidden = !isExpanded;

    articles.forEach((article) => {
      const button = document.createElement("button");
      const title = document.createElement("span");
      const path = document.createElement("span");

      button.type = "button";
      button.className = `article-item${article.path === state.selectedPath ? " is-active" : ""}`;
      button.dataset.path = article.path;
      title.className = "article-item-title";
      title.textContent = article.title || articleLabel(article.path);
      path.className = "article-item-path";
      path.textContent = article.folder || article.path.replace(POSTS_ROOT, "");
      button.append(title, path);
      articleContainer.append(button);
    });

    group.append(toggle, articleContainer);
    elements.articleList.append(group);
  });
};

const loadArticleIndex = async () => {
  elements.articleCount.textContent = "正在读取文章";
  const tree = await githubRequest(`/repos/${REPOSITORY}/git/trees/${BRANCH}?recursive=1`);
  const posts = tree.tree.filter(
    (item) =>
      item.type === "blob" &&
      item.path.startsWith(POSTS_ROOT) &&
      item.path.toLowerCase().endsWith(".md"),
  );

  const articles = await mapWithConcurrency(posts, 6, async (item) => {
    try {
      const blob = await githubRequest(`/repos/${REPOSITORY}/git/blobs/${item.sha}`);
      const parsed = parseArticle(decodeBase64(blob.content));

      return {
        ...parsed,
        path: item.path,
        sha: item.sha,
        folder: getFolderFromPath(item.path),
      };
    } catch {
      return {
        path: item.path,
        sha: item.sha,
        folder: getFolderFromPath(item.path),
        title: articleLabel(item.path),
        date: "",
        categories: [],
        tags: [],
        extra: "",
        body: "",
      };
    }
  });

  state.articles = sortArticles(articles);
  refreshFolderOptions();
  renderArticleList();
};

const loadArticle = async (path) => {
  state.selectedPath = path;
  state.selectedSha = "";
  showLoadingEditor();

  try {
    const article = await githubRequest(
      `/repos/${REPOSITORY}/contents/${encodePath(path)}?ref=${encodeURIComponent(BRANCH)}`,
    );
    const parsed = parseArticle(decodeBase64(article.content));
    const completeArticle = {
      ...parsed,
      path,
      sha: article.sha,
      folder: getFolderFromPath(path),
    };

    fillEditor(completeArticle);
    showEditor();
    setStatus(elements.publishStatus);
  } catch (error) {
    state.selectedPath = "";
    state.selectedSha = "";
    showOverview();
    showToast(`文章读取失败：${error.message}`, "error", 5500);
  }
};

const beginNewArticle = () => {
  fillEditor();
  showEditor();
  elements.body.focus();
};

const saveArticle = async () => {
  const folder = normaliseFolder(elements.folder.value);
  const title = extractTitle(elements.body.value);

  if (!folder) {
    setStatus(elements.publishStatus, "请先填写存放目录。", "error");
    return;
  }

  if (!title) {
    setStatus(elements.publishStatus, "请在正文中添加一级标题，例如 # 文章标题。", "error");
    return;
  }

  const path = state.selectedPath || articlePath(title);
  setBusy(elements.publishArticle, true, "正在发布");
  setStatus(elements.publishStatus);
  showToast("正在提交到 GitHub...", "progress", 0);

  try {
    const source = articleSource();
    const payload = {
      message: `${state.selectedPath ? "docs: 更新" : "docs: 发布"} ${title}`,
      content: encodeBase64(source),
      branch: BRANCH,
    };

    if (state.selectedSha) {
      payload.sha = state.selectedSha;
    }

    const response = await githubRequest(
      `/repos/${REPOSITORY}/contents/${encodePath(path)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const parsed = parseArticle(source);
    const updatedArticle = {
      ...parsed,
      path,
      sha: response.content.sha,
      folder: getFolderFromPath(path),
    };

    state.selectedPath = path;
    state.selectedSha = response.content.sha;
    state.articles = sortArticles([
      ...state.articles.filter((article) => article.path !== path),
      updatedArticle,
    ]);
    refreshFolderOptions();
    fillEditor(updatedArticle);
    renderArticleList();
    showToast("已提交，GitHub 正在构建并发布网站。", "success", 4500);
  } catch (error) {
    showToast(`发布失败：${error.message}`, "error", 6000);
  } finally {
    setBusy(elements.publishArticle, false);
  }
};

const uploadImage = async (file) => {
  if (!file) return;

  const safeName = file.name
    .normalize("NFKD")
    .replace(/[^\w.\-\u4e00-\u9fff]/g, "-")
    .replace(/-+/g, "-");
  const year = new Date().getFullYear();
  const path = `${UPLOADS_ROOT}${year}/${Date.now()}-${safeName}`;

  setStatus(elements.publishStatus, "正在上传图片...");

  try {
    const payload = {
      message: `docs: 上传图片 ${safeName}`,
      content: await readFileAsBase64(file),
      branch: BRANCH,
    };
    await githubRequest(`/repos/${REPOSITORY}/contents/${encodePath(path)}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    insertAtCursor(elements.body, `![${file.name}](/uploads/${year}/${path.split("/").pop()})`);
    setStatus(elements.publishStatus, "图片已提交。文章发布时会引用它。", "success");
  } catch (error) {
    setStatus(elements.publishStatus, `图片上传失败：${error.message}`, "error");
  } finally {
    elements.imageUpload.value = "";
  }
};

const deleteSelectedArticle = async () => {
  const article = state.articles.find((item) => item.path === state.selectedPath);

  if (!article || !state.selectedSha) return;

  setBusy(elements.confirmDelete, true, "正在删除");

  try {
    await githubRequest(`/repos/${REPOSITORY}/contents/${encodePath(state.selectedPath)}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `docs: 删除 ${article.title || articleLabel(article.path)}`,
        sha: state.selectedSha,
        branch: BRANCH,
      }),
    });
    state.articles = state.articles.filter((item) => item.path !== state.selectedPath);
    state.selectedPath = "";
    state.selectedSha = "";
    refreshFolderOptions();
    elements.deleteDialog.close();
    showOverview();
    showToast("文章已删除，GitHub 正在构建并发布网站。", "success", 4500);
  } catch (error) {
    elements.deleteDescription.textContent = `删除失败：${error.message}`;
  } finally {
    setBusy(elements.confirmDelete, false);
  }
};

const openDeleteDialog = () => {
  const article = state.articles.find((item) => item.path === state.selectedPath);

  if (!article) return;

  elements.deleteDescription.textContent = `“${article.title || articleLabel(article.path)}”将从仓库中移除。`;
  elements.deleteDialog.showModal();
};

const insertAtCursor = (input, text) => {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.setRangeText(text, start, end, "end");
  input.focus();
};

const wrapSelection = (type) => {
  const input = elements.body;
  const selected = input.value.slice(input.selectionStart, input.selectionEnd) || "文本";
  const patterns = {
    strong: `**${selected}**`,
    emphasis: `*${selected}*`,
    code: `\`${selected}\``,
    link: `[${selected}](https://)`,
  };

  insertAtCursor(input, patterns[type]);
};

const signOut = () => {
  state.token = "";
  state.articles = [];
  state.selectedPath = "";
  state.selectedSha = "";
  state.selectedCategories = [];
  state.selectedTags = [];
  state.folders = [];
  state.expandedCategories.clear();
  state.openMulti = "";
  elements.token.value = "";
  elements.workspace.hidden = true;
  elements.accessView.hidden = false;
  elements.toast.hidden = true;
  setStatus(elements.accessStatus);
  setStatus(elements.publishStatus);
};

const openMulti = (kind) => {
  state.openMulti = kind;
  renderMultiSelects();
};

elements.accessForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  state.token = elements.token.value.trim();

  if (!state.token) return;

  setBusy(elements.accessSubmit, true, "验证中");
  setStatus(elements.accessStatus, "正在验证 GitHub Token...");

  try {
    const [user] = await Promise.all([
      githubRequest("/user"),
      githubRequest(`/repos/${REPOSITORY}`),
    ]);
    elements.accountName.textContent = user.login;
    await loadArticleIndex();
    elements.accessView.hidden = true;
    elements.workspace.hidden = false;
    showOverview();
  } catch (error) {
    state.token = "";
    setStatus(elements.accessStatus, `无法进入：${error.message}`, "error");
  } finally {
    setBusy(elements.accessSubmit, false);
  }
});

elements.tokenVisibility.addEventListener("click", () => {
  const isPassword = elements.token.type === "password";
  elements.token.type = isPassword ? "text" : "password";
  elements.tokenVisibility.setAttribute("aria-label", isPassword ? "隐藏 Token" : "显示 Token");
});

elements.themeToggle.addEventListener("click", toggleTheme);
elements.signOut.addEventListener("click", signOut);
elements.newArticle.addEventListener("click", beginNewArticle);
elements.emptyCreate.addEventListener("click", beginNewArticle);
elements.mobileBack.addEventListener("click", showOverview);
elements.resetEditor.addEventListener("click", () => {
  if (state.selectedPath) {
    loadArticle(state.selectedPath);
    return;
  }

  beginNewArticle();
});
elements.deleteArticle.addEventListener("click", openDeleteDialog);
elements.confirmDelete.addEventListener("click", deleteSelectedArticle);
elements.publishArticle.addEventListener("click", saveArticle);
elements.articleSearch.addEventListener("input", renderArticleList);
elements.articleList.addEventListener("click", (event) => {
  const categoryToggle = event.target.closest("[data-category]");
  const articleButton = event.target.closest("[data-path]");

  if (categoryToggle) {
    const { category } = categoryToggle.dataset;
    if (state.expandedCategories.has(category)) {
      state.expandedCategories.delete(category);
    } else {
      state.expandedCategories.add(category);
    }
    renderArticleList();
    return;
  }

  if (articleButton) {
    loadArticle(articleButton.dataset.path);
  }
});
elements.imageUpload.addEventListener("change", () => uploadImage(elements.imageUpload.files[0]));
document.querySelectorAll("[data-wrap]").forEach((button) => {
  button.addEventListener("click", () => wrapSelection(button.dataset.wrap));
});

Object.entries(multiSelects).forEach(([kind, config]) => {
  config.control.addEventListener("click", () => openMulti(kind));
  config.input.addEventListener("focus", () => openMulti(kind));
  config.input.addEventListener("input", () => openMulti(kind));
  config.input.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== ",") return;
    event.preventDefault();
    addMetaValue(kind, config.input.value);
  });
});

document.addEventListener("click", (event) => {
  const remove = event.target.closest("[data-multi-remove]");
  const select = event.target.closest("[data-multi-select]");
  const add = event.target.closest("[data-multi-add]");

  if (remove) {
    removeMetaValue(remove.dataset.multiRemove, remove.dataset.value);
    return;
  }

  if (select) {
    addMetaValue(select.dataset.multiSelect, select.dataset.value);
    return;
  }

  if (add) {
    addMetaValue(add.dataset.multiAdd, add.dataset.value);
    return;
  }

  if (!event.target.closest(".multi-field") && state.openMulti) {
    state.openMulti = "";
    renderMultiSelects();
  }
});

applyTheme(getTheme());
