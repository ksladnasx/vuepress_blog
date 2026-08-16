const REPOSITORY = "ksladnasx/vuepress_blog";
const BRANCH = "main";
const POSTS_ROOT = "docs/posts/";
const UPLOADS_ROOT = "docs/.vuepress/public/uploads/";
const THEME_KEY = "vuepress-color-scheme";
const TOKEN_KEY = "xh-blog-admin-token";
const AUTO_SAVE_DELAY = 30 * 1000;
const UNCATEGORISED = "未分类";
const DB_NAME = "xh-blog-admin";
const DB_VERSION = 1;
const DRAFT_STORE = "drafts";

const state = {
  token: "",
  db: null,
  remoteArticles: [],
  drafts: new Map(),
  currentId: "",
  selectedCategories: [],
  selectedTags: [],
  folders: [],
  expandedCategories: new Set(),
  openMulti: "",
  folderMenuOpen: false,
  dateMenuOpen: false,
  calendarMonth: new Date(),
  toastTimer: 0,
  saveTimer: 0,
  isDirty: false,
  isHydrating: false,
};

const elements = {
  accessView: document.querySelector("#access-view"),
  workspace: document.querySelector("#workspace"),
  accessForm: document.querySelector("#access-form"),
  token: document.querySelector("#token"),
  tokenVisibility: document.querySelector("#token-visibility"),
  accessSubmit: document.querySelector("#access-submit"),
  accessStatus: document.querySelector("#access-status"),
  accessLoading: document.querySelector("#access-loading"),
  accessLoadingText: document.querySelector("#access-loading-text"),
  themeToggle: document.querySelector("#theme-toggle"),
  accountName: document.querySelector("#account-name"),
  signOut: document.querySelector("#sign-out"),
  publishAll: document.querySelector("#publish-all"),
  changeBadge: document.querySelector("#change-badge"),
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
  saveDraft: document.querySelector("#save-draft"),
  resetEditor: document.querySelector("#reset-editor"),
  undoDelete: document.querySelector("#undo-delete"),
  deleteArticle: document.querySelector("#delete-article"),
  deleteBanner: document.querySelector("#delete-banner"),
  draftStatus: document.querySelector("#draft-status"),
  editorMode: document.querySelector("#editor-mode"),
  filePath: document.querySelector("#file-path"),
  date: document.querySelector("#article-date"),
  dateControl: document.querySelector("#date-control"),
  datePicker: document.querySelector("#date-picker"),
  dateMenu: document.querySelector("#date-menu"),
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
  folderControl: document.querySelector("#folder-control"),
  folderMenu: document.querySelector("#folder-menu"),
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

const editableFields = [
  elements.date,
  elements.folder,
  elements.categoryInput,
  elements.tagInput,
  elements.extra,
  elements.body,
  elements.imageUpload,
];

const isMobile = () => window.matchMedia("(max-width: 780px)").matches;

const openDatabase = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(DRAFT_STORE)) {
        db.createObjectStore(DRAFT_STORE, { keyPath: "id" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const storeRequest = (mode, callback) =>
  new Promise((resolve, reject) => {
    const transaction = state.db.transaction(DRAFT_STORE, mode);
    const store = transaction.objectStore(DRAFT_STORE);
    const request = callback(store);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

const loadDrafts = async () => {
  const drafts = await storeRequest("readonly", (store) => store.getAll());
  state.drafts = new Map(drafts.map((draft) => [draft.id, draft]));
};

const saveDraftRecord = async (draft) => {
  draft.updatedAt = Date.now();
  await storeRequest("readwrite", (store) => store.put(draft));
  state.drafts.set(draft.id, draft);
  refreshAfterDraftChange();
};

const removeDraftRecord = async (id) => {
  await storeRequest("readwrite", (store) => store.delete(id));
  state.drafts.delete(id);
  refreshAfterDraftChange();
};

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

const setAccessLoading = (loading, message = "") => {
  elements.accessLoading.hidden = !loading;
  if (message) elements.accessLoadingText.textContent = message;
  elements.token.disabled = loading;
  elements.tokenVisibility.disabled = loading;
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

  if (response.status === 204) return null;

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || "GitHub 请求失败。");
  return payload;
};

const today = () => new Date().toISOString().slice(0, 10);

const padDatePart = (value) => String(value).padStart(2, "0");

const formatLocalDate = (date) =>
  `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;

const parseDateValue = (value) => {
  const match = String(value || "").match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;

  const date = new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
  return Number.isNaN(date.getTime()) ? null : date;
};

const getCalendarBaseDate = () => parseDateValue(elements.date.value) || new Date();

const setCalendarMonthFromValue = () => {
  const base = getCalendarBaseDate();
  state.calendarMonth = new Date(base.getFullYear(), base.getMonth(), 1);
};

const getTheme = () => {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
  } catch {}

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const readStoredToken = () => {
  try {
    return window.localStorage.getItem(TOKEN_KEY) || "";
  } catch {
    return "";
  }
};

const saveStoredToken = (token) => {
  try {
    window.localStorage.setItem(TOKEN_KEY, token);
  } catch {}
};

const clearStoredToken = () => {
  try {
    window.localStorage.removeItem(TOKEN_KEY);
  } catch {}
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
  if (!marker) return { frontmatter: "", content: source };

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
  if (!inline) return [];

  return inline[1]
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter(Boolean);
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

const buildSource = ({ date, categories, tags, extra, body }) => {
  const metadata = [
    `date: ${date || today()}`,
    serialiseList("category", categories || []),
    serialiseList("tag", tags || []),
    (extra || "").trim(),
  ]
    .filter(Boolean)
    .join("\n");

  return `---\n${metadata}\n---\n\n${(body || "").replace(/^\s+/, "")}`;
};

const articleSourceFromEditor = () =>
  buildSource({
    date: elements.date.value,
    categories: state.selectedCategories,
    tags: state.selectedTags,
    extra: elements.extra.value,
    body: elements.body.value,
  });

const getArticlePath = (title, folderValue) =>
  `${POSTS_ROOT}${normaliseFolder(folderValue)}/${slugify(title)}.md`;

const articleLabel = (path) => path.split("/").pop().replace(/\.md$/i, "");

const getFolderFromPath = (path) =>
  path.slice(POSTS_ROOT.length).split("/").slice(0, -1).join("/");

const sortArticles = (articles) =>
  [...articles].sort((articleA, articleB) => {
    const dateDifference =
      new Date(articleB.date || 0).getTime() - new Date(articleA.date || 0).getTime();

    if (dateDifference) return dateDifference;
    return (articleA.title || "").localeCompare(articleB.title || "", "zh-CN");
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

const getRemoteById = (id) => state.remoteArticles.find((article) => article.id === id);

const getEffectiveArticles = () => {
  const byId = new Map(state.remoteArticles.map((article) => [article.id, { ...article }]));

  state.drafts.forEach((draft) => {
    if (draft.type === "delete") {
      const remote = byId.get(draft.id);
      if (remote) {
        byId.set(draft.id, { ...remote, draft, isDraft: true, isDelete: true });
      }
      return;
    }

    const parsed = parseArticle(draft.source);
    byId.set(draft.id, {
      ...parsed,
      id: draft.id,
      path: draft.path,
      sha: draft.baseSha || "",
      folder: getFolderFromPath(draft.path),
      source: draft.source,
      draft,
      isDraft: true,
      isNew: draft.isNew,
      isDelete: false,
    });
  });

  return sortArticles([...byId.values()]);
};

const getCurrentArticle = () =>
  getEffectiveArticles().find((article) => article.id === state.currentId);

const refreshFolderOptions = () => {
  state.folders = [
    ...new Set(getEffectiveArticles().map((article) => article.folder).filter(Boolean)),
  ].sort((folderA, folderB) => folderA.localeCompare(folderB, "zh-CN"));
  renderFolderMenu();
};

const setMobileView = (view) => {
  if (isMobile()) {
    elements.workspace.dataset.mobileView = view;
  }
};

const getChangeCount = () => {
  const currentHasDraft = state.currentId && state.drafts.has(state.currentId);
  return state.drafts.size + (state.isDirty && !currentHasDraft ? 1 : 0);
};

const updatePublishButton = () => {
  if (elements.publishAll.dataset.busy === "true") return;

  const count = getChangeCount();
  elements.publishAll.disabled = count === 0;
  elements.changeBadge.hidden = count === 0;
  elements.changeBadge.textContent = String(count);
};

const refreshAfterDraftChange = () => {
  refreshFolderOptions();
  renderArticleList();
  renderMultiSelects();
  updatePublishButton();

  if (state.currentId) {
    updateEditorChrome();
  }
};

const setDraftStatus = (article) => {
  if (state.isDirty && !article?.isDelete) {
    elements.draftStatus.textContent = "未保存";
    elements.draftStatus.className = "draft-status is-unsaved";
    return;
  }

  if (!article?.isDraft) {
    elements.draftStatus.textContent = "已同步";
    elements.draftStatus.className = "draft-status";
    return;
  }

  if (article.isDelete) {
    elements.draftStatus.textContent = "待删除";
    elements.draftStatus.className = "draft-status is-delete";
    return;
  }

  elements.draftStatus.textContent = article.isNew ? "新草稿" : "未发布";
  elements.draftStatus.className = "draft-status is-draft";
};

const setEditorDisabled = (disabled) => {
  editableFields.forEach((field) => {
    field.disabled = disabled;
  });
  elements.saveDraft.disabled = disabled;
  elements.datePicker.disabled = disabled;
  document.querySelectorAll(".multi-chip-remove").forEach((button) => {
    button.disabled = disabled;
  });
};

const updateEditorChrome = () => {
  const article = getCurrentArticle();
  if (!article) return;

  const isExisting = !article.isNew;
  elements.editorMode.textContent = article.isDelete
    ? "待删除"
    : article.isNew
      ? "新文章"
      : "编辑文章";
  elements.filePath.textContent = article.path || "选择目录和标题后生成文件路径";
  elements.deleteArticle.hidden = !isExisting || article.isDelete;
  elements.undoDelete.hidden = !article.isDelete;
  elements.deleteBanner.hidden = !article.isDelete;
  elements.resetEditor.textContent = article.isNew ? "丢弃草稿" : "还原";
  setDraftStatus(article);
  setEditorDisabled(article.isDelete);
};

const getKnownMetaValues = (kind) => {
  const sourceKey = multiSelects[kind].sourceKey;
  const values = getEffectiveArticles().flatMap((article) => article[sourceKey] || []);

  return [...new Set(values.map(normaliseMetaValue).filter(Boolean))]
    .sort((valueA, valueB) => valueA.localeCompare(valueB, "zh-CN"));
};

const getSelectedMetaValues = (kind) => state[multiSelects[kind].stateKey];

const setSelectedMetaValues = (kind, values) => {
  state[multiSelects[kind].stateKey] = [
    ...new Set(values.map(normaliseMetaValue).filter(Boolean)),
  ];
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
      remove.textContent = "x";
      remove.disabled = getCurrentArticle()?.isDelete || false;
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
    text.textContent = `新增 "${query}"`;
    meta.className = "multi-option-meta";
    meta.textContent = "添加";
    create.append(text, meta);
    config.menu.append(create);
  }

  config.menu.hidden = state.openMulti !== kind || getCurrentArticle()?.isDelete;
};

const renderMultiSelects = () => {
  renderMultiSelect("category");
  renderMultiSelect("tag");
};

const addMetaValue = (kind, value) => {
  const normalised = normaliseMetaValue(value);
  if (!normalised || getCurrentArticle()?.isDelete) return;

  setSelectedMetaValues(kind, [...getSelectedMetaValues(kind), normalised]);
  multiSelects[kind].input.value = "";
  state.openMulti = kind;
  renderMultiSelects();
  scheduleCurrentDraftSave();
  multiSelects[kind].input.focus();
};

const removeMetaValue = (kind, value) => {
  if (getCurrentArticle()?.isDelete) return;

  setSelectedMetaValues(
    kind,
    getSelectedMetaValues(kind).filter((item) => item !== value),
  );
  renderMultiSelects();
  scheduleCurrentDraftSave();
};

const renderFolderMenu = () => {
  const canEdit = getCurrentArticle()?.isNew && !getCurrentArticle()?.isDelete;
  const query = normaliseFolder(elements.folder.value);
  const availableFolders = state.folders.filter((folder) =>
    !query || folder.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
  );
  const hasExactMatch = state.folders.some(
    (folder) => folder.toLocaleLowerCase() === query.toLocaleLowerCase(),
  );

  elements.folderMenu.replaceChildren(
    ...availableFolders.map((folder) => {
      const option = document.createElement("button");
      const text = document.createElement("span");
      const meta = document.createElement("span");

      option.type = "button";
      option.className = "multi-option";
      option.dataset.folderSelect = folder;
      text.textContent = folder;
      meta.className = "multi-option-meta";
      meta.textContent = "选择";
      option.append(text, meta);
      return option;
    }),
  );

  if (query && !hasExactMatch) {
    const create = document.createElement("button");
    const text = document.createElement("span");
    const meta = document.createElement("span");

    create.type = "button";
    create.className = "multi-option is-add";
    create.dataset.folderAdd = query;
    text.textContent = `新建 "${query}"`;
    meta.className = "multi-option-meta";
    meta.textContent = "目录";
    create.append(text, meta);
    elements.folderMenu.append(create);
  }

  elements.folderMenu.hidden = !state.folderMenuOpen || !canEdit;
};

const openFolderMenu = () => {
  const current = getCurrentArticle();
  if (!current?.isNew || current.isDelete || elements.folder.disabled) return;

  state.folderMenuOpen = true;
  renderFolderMenu();
};

const selectFolder = (value) => {
  if (!getCurrentArticle()?.isNew) return;

  elements.folder.value = normaliseFolder(value);
  state.folderMenuOpen = false;
  renderFolderMenu();
  scheduleCurrentDraftSave();
  elements.folder.focus();
};

const renderDateMenu = () => {
  const selectedValue = elements.date.value;
  const selectedDate = parseDateValue(selectedValue);
  const month = state.calendarMonth;
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const firstWeekday = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const todayValue = formatLocalDate(new Date());
  const weekdays = ["一", "二", "三", "四", "五", "六", "日"];

  const header = document.createElement("div");
  const prev = document.createElement("button");
  const title = document.createElement("strong");
  const next = document.createElement("button");
  const weekRow = document.createElement("div");
  const grid = document.createElement("div");

  header.className = "date-menu-header";
  prev.type = "button";
  prev.className = "date-nav-button";
  prev.dataset.datePrev = "true";
  prev.setAttribute("aria-label", "上个月");
  prev.textContent = "‹";
  title.textContent = `${year} 年 ${monthIndex + 1} 月`;
  next.type = "button";
  next.className = "date-nav-button";
  next.dataset.dateNext = "true";
  next.setAttribute("aria-label", "下个月");
  next.textContent = "›";
  header.append(prev, title, next);

  weekRow.className = "date-weekdays";
  weekdays.forEach((weekday) => {
    const item = document.createElement("span");
    item.textContent = weekday;
    weekRow.append(item);
  });

  grid.className = "date-grid";
  for (let index = 0; index < firstWeekday; index += 1) {
    const empty = document.createElement("span");
    empty.className = "date-empty";
    grid.append(empty);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const value = formatLocalDate(new Date(year, monthIndex, day));
    const button = document.createElement("button");
    button.type = "button";
    button.className = "date-day";
    button.dataset.dateSelect = value;
    button.textContent = String(day);
    if (value === todayValue) button.classList.add("is-today");
    if (selectedDate && value === selectedValue) button.classList.add("is-selected");
    grid.append(button);
  }

  elements.dateMenu.replaceChildren(header, weekRow, grid);
  elements.dateMenu.hidden = !state.dateMenuOpen || getCurrentArticle()?.isDelete;
};

const openDateMenu = () => {
  if (getCurrentArticle()?.isDelete || elements.date.disabled) return;
  setCalendarMonthFromValue();
  state.dateMenuOpen = true;
  renderDateMenu();
};

const changeCalendarMonth = (offset) => {
  state.calendarMonth = new Date(
    state.calendarMonth.getFullYear(),
    state.calendarMonth.getMonth() + offset,
    1,
  );
  renderDateMenu();
};

const selectDate = (value) => {
  elements.date.value = value;
  state.dateMenuOpen = false;
  renderDateMenu();
  scheduleCurrentDraftSave();
};

const fillEditor = (article) => {
  state.isHydrating = true;
  state.currentId = article.id;
  elements.date.value = article.date || today();
  setCalendarMonthFromValue();
  elements.folder.value = article.isNew ? article.folder : article.folder || state.folders[0] || "";
  elements.folder.readOnly = !article.isNew;
  elements.folder.title = article.isNew ? "" : "已有文章保留原有文件路径";
  setSelectedMetaValues("category", article.categories || []);
  setSelectedMetaValues("tag", article.tags || []);
  elements.extra.value = article.extra || "";
  elements.body.value = article.body || "";
  state.openMulti = "";
  state.folderMenuOpen = false;
  state.dateMenuOpen = false;
  renderMultiSelects();
  renderFolderMenu();
  renderDateMenu();
  updateEditorChrome();
  state.isHydrating = false;
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
  const articles = getEffectiveArticles();
  const categoryCount = new Set(
    articles.flatMap((article) => article.categories.length ? article.categories : [UNCATEGORISED]),
  ).size;
  const changeCount = getChangeCount();
  const suffix = changeCount ? ` · ${changeCount} 条未发布` : "";
  elements.articleCount.textContent = `${articles.length} 篇文章 · ${categoryCount} 个分类${suffix}`;
  elements.emptyCount.textContent = `${articles.length} 篇文章 · ${categoryCount} 个分类${suffix}`;
};

const getVisibleGroups = () => {
  const query = elements.articleSearch.value.trim().toLocaleLowerCase();
  const groups = new Map();

  getEffectiveArticles().forEach((article) => {
    const categories = article.categories.length ? article.categories : [UNCATEGORISED];
    const articleSearchText = [
      article.title,
      article.path,
      article.folder,
      article.isDraft ? "未发布 草稿 修改" : "",
      article.isDelete ? "待删除 删除" : "",
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

const getArticleStatusText = (article) => {
  if (article.isDelete) return "待删除";
  if (article.isNew) return "新草稿";
  if (article.isDraft) return "未发布";
  return "";
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
      const status = getArticleStatusText(article);

      button.type = "button";
      button.className = [
        "article-item",
        article.id === state.currentId ? "is-active" : "",
        article.isDraft ? "has-draft" : "",
        article.isDelete ? "is-delete" : "",
      ]
        .filter(Boolean)
        .join(" ");
      button.dataset.id = article.id;
      title.className = "article-item-title";
      title.textContent = article.title || articleLabel(article.path);
      path.className = "article-item-path";
      path.textContent = article.folder || article.path.replace(POSTS_ROOT, "") || "未选择目录";
      button.append(title, path);

      if (status) {
        const statusEl = document.createElement("span");
        statusEl.className = "article-status-pill";
        statusEl.textContent = status;
        button.append(statusEl);
      }

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
      const source = decodeBase64(blob.content);
      const parsed = parseArticle(source);

      return {
        ...parsed,
        id: item.path,
        path: item.path,
        sha: item.sha,
        folder: getFolderFromPath(item.path),
        source,
        isDraft: false,
        isNew: false,
        isDelete: false,
      };
    } catch {
      return {
        id: item.path,
        path: item.path,
        sha: item.sha,
        folder: getFolderFromPath(item.path),
        title: articleLabel(item.path),
        date: "",
        categories: [],
        tags: [],
        extra: "",
        body: "",
        source: "",
        isDraft: false,
        isNew: false,
        isDelete: false,
      };
    }
  });

  state.remoteArticles = sortArticles(articles);
  refreshFolderOptions();
  refreshAfterDraftChange();
};

const loadArticle = (id) => {
  window.clearTimeout(state.saveTimer);
  state.saveTimer = 0;
  state.isDirty = false;
  state.folderMenuOpen = false;
  state.dateMenuOpen = false;
  state.currentId = id;
  showLoadingEditor();

  const article = getEffectiveArticles().find((item) => item.id === id);

  if (!article) {
    state.currentId = "";
    showOverview();
    showToast("文章不存在或已被移除。", "error", 4500);
    return;
  }

  window.setTimeout(() => {
    fillEditor(article);
    showEditor();
    setStatus(elements.publishStatus);
  }, 120);
};

const getEditorValidationError = () => {
  if (!parseDateValue(elements.date.value)) return "请选择有效日期。";
  if (!normaliseFolder(elements.folder.value)) return "请先选择存放目录。";
  if (!extractTitle(elements.body.value)) {
    return "请在正文中添加一级标题，例如 # 文章标题。";
  }
  return "";
};

const getDraftValidationError = (draft) => {
  if (draft.type === "delete") return "";

  const parsed = parseArticle(draft.source || "");
  const title = parsed.title || "未命名文章";
  if (!normaliseFolder(getFolderFromPath(draft.path))) {
    return `“${title}”尚未选择存放目录。`;
  }
  if (!parsed.title) {
    return `“${title}”缺少一级标题。`;
  }
  return "";
};

const getPublishValidationError = () => {
  const draftError = [...state.drafts.values()]
    .filter((draft) => draft.id !== state.currentId || !state.isDirty)
    .map(getDraftValidationError)
    .find(Boolean);
  if (draftError) return draftError;

  if (state.isDirty) return getEditorValidationError();
  return "";
};

const createDraftFromEditor = () => {
  const validationError = getEditorValidationError();
  if (validationError) {
    setStatus(elements.publishStatus, validationError, "error");
    return null;
  }

  const source = articleSourceFromEditor();
  const parsed = parseArticle(source);
  const title = parsed.title;
  const folder = normaliseFolder(elements.folder.value);

  const current = getCurrentArticle();
  const remote = current?.isNew ? null : getRemoteById(state.currentId);
  const path = current?.isNew ? getArticlePath(title, folder) : current.path;
  const baseSha = current?.isNew ? "" : remote?.sha || current?.sha || "";
  const draft = {
    id: state.currentId || `new:${Date.now()}`,
    type: "upsert",
    isNew: current?.isNew || state.currentId.startsWith("new:"),
    path,
    basePath: current?.isNew ? "" : path,
    baseSha,
    source,
    attachments: current?.draft?.attachments || [],
    createdAt: current?.draft?.createdAt || Date.now(),
    updatedAt: Date.now(),
  };

  const remoteSource = remote?.source || "";
  if (!draft.isNew && !draft.attachments.length && source === remoteSource) {
    return { unchanged: true, draft };
  }

  return { unchanged: false, draft };
};

const saveCurrentDraftNow = async ({ reason = "manual", force = false } = {}) => {
  if (state.isHydrating || !state.currentId || getCurrentArticle()?.isDelete) return true;
  if (!state.isDirty && !force) return true;

  window.clearTimeout(state.saveTimer);
  state.saveTimer = 0;
  elements.draftStatus.textContent = "正在保存";
  elements.draftStatus.className = "draft-status is-unsaved";

  const result = createDraftFromEditor();
  if (!result) return false;

  if (result.unchanged) {
    await removeDraftRecord(result.draft.id);
    elements.draftStatus.textContent = "已同步";
    elements.draftStatus.className = "draft-status";
    state.isDirty = false;
    updatePublishButton();
    return true;
  }

  await saveDraftRecord(result.draft);
  state.currentId = result.draft.id;
  elements.filePath.textContent = result.draft.path;
  elements.draftStatus.textContent = reason === "auto" ? "已自动保存" : "已保存";
  elements.draftStatus.className = "draft-status is-draft";
  state.isDirty = false;
  updatePublishButton();
  return true;
};

const scheduleCurrentDraftSave = () => {
  if (state.isHydrating || !state.currentId || getCurrentArticle()?.isDelete) return;

  window.clearTimeout(state.saveTimer);
  state.isDirty = true;
  elements.draftStatus.textContent = "未保存";
  elements.draftStatus.className = "draft-status is-unsaved";
  updatePublishButton();
  state.saveTimer = window.setTimeout(() => {
    const validationError = getEditorValidationError();
    if (validationError) {
      setStatus(elements.publishStatus, validationError, "error");
      showToast(`自动保存未执行：${validationError}`, "error", 5200);
      return;
    }

    saveCurrentDraftNow({ reason: "auto" })
      .catch((error) => showToast(`草稿保存失败：${error.message}`, "error", 5500));
  }, AUTO_SAVE_DELAY);
};

const saveBeforeLeavingCurrentArticle = async () => {
  const current = getCurrentArticle();
  const validationError = getEditorValidationError();
  if ((state.isDirty || current?.isNew) && validationError) {
    showToast(`${validationError} 请先完成文章或丢弃草稿。`, "error", 5200);
    return false;
  }

  if (!state.isDirty) return true;

  try {
    const saved = await saveCurrentDraftNow({ reason: "switch" });
    if (saved) {
      showToast("当前文章已自动保存到本机。", "success", 2800);
    }
    if (!saved) {
      showToast("请先补全文章的一级标题和存放目录，再切换文章。", "error", 5200);
    }
    return saved;
  } catch (error) {
    showToast(`草稿保存失败：${error.message}`, "error", 5500);
    return false;
  }
};

const beginNewArticle = async () => {
  const id = `new:${Date.now()}`;
  const body = `# 新文章\n\n`;
  const source = buildSource({
    date: today(),
    categories: [],
    tags: [],
    extra: "",
    body,
  });
  const draft = {
    id,
    type: "upsert",
    isNew: true,
    path: "",
    basePath: "",
    baseSha: "",
    source,
    attachments: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await saveDraftRecord(draft);
  loadArticle(id);
  elements.body.focus();
};

const resetCurrentArticle = async () => {
  const current = getCurrentArticle();
  if (!current) return;

  window.clearTimeout(state.saveTimer);
  state.saveTimer = 0;
  state.isDirty = false;
  await removeDraftRecord(current.id);
  if (current.isNew) {
    state.currentId = "";
    showOverview();
    return;
  }

  loadArticle(current.id);
};

const uploadImage = async (file) => {
  if (!file || getCurrentArticle()?.isDelete) return;

  const safeName = file.name
    .normalize("NFKD")
    .replace(/[^\w.\-\u4e00-\u9fff]/g, "-")
    .replace(/-+/g, "-");
  const year = new Date().getFullYear();
  const path = `${UPLOADS_ROOT}${year}/${Date.now()}-${safeName}`;
  const publicUrl = `/uploads/${year}/${path.split("/").pop()}`;
  const base64 = await readFileAsBase64(file);

  insertAtCursor(elements.body, `![${file.name}](${publicUrl})`);
  await saveCurrentDraftNow();

  const current = getCurrentArticle();
  const draft = current?.draft || state.drafts.get(state.currentId);
  if (!draft) return;

  draft.attachments = [
    ...(draft.attachments || []),
    { path, publicUrl, name: file.name, base64 },
  ];
  await saveDraftRecord(draft);
  showToast("图片已加入草稿，发布修改时会一起上传。", "success", 4200);
  elements.imageUpload.value = "";
};

const markSelectedArticleForDelete = async () => {
  const article = getCurrentArticle();
  if (!article) return;

  if (article.isNew) {
    await resetCurrentArticle();
    showToast("新文章草稿已丢弃。", "success", 3600);
    return;
  }

  const draft = {
    id: article.id,
    type: "delete",
    isNew: false,
    path: article.path,
    basePath: article.path,
    baseSha: article.sha,
    source: article.source,
    attachments: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await saveDraftRecord(draft);
  fillEditor(getEffectiveArticles().find((item) => item.id === draft.id));
  showToast("已加入待删除队列。", "success", 3600);
};

const undoDelete = async () => {
  const current = getCurrentArticle();
  if (!current?.isDelete) return;

  await removeDraftRecord(current.id);
  loadArticle(current.id);
};

const openDeleteDialog = () => {
  const article = getCurrentArticle();
  if (!article) return;

  if (article.isNew) {
    elements.deleteDescription.textContent = "这篇新文章还没有发布，确认后会丢弃本地草稿。";
  } else {
    elements.deleteDescription.textContent = `"${article.title || articleLabel(article.path)}" 会进入待删除队列，点击顶部“发布修改”后才会真正从 GitHub 删除。`;
  }
  elements.deleteDialog.showModal();
};

const publishFile = async ({ path, content, sha, message }) => {
  const payload = {
    message,
    content,
    branch: BRANCH,
  };

  if (sha) payload.sha = sha;

  return githubRequest(`/repos/${REPOSITORY}/contents/${encodePath(path)}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
};

const deleteFile = async ({ path, sha, message }) =>
  githubRequest(`/repos/${REPOSITORY}/contents/${encodePath(path)}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, sha, branch: BRANCH }),
  });

const publishAllDrafts = async () => {
  const validationError = getPublishValidationError();
  if (validationError) {
    showToast(`无法发布：${validationError}`, "error", 5600);
    return;
  }

  if (state.isDirty) {
    try {
      const saved = await saveCurrentDraftNow({ reason: "publish" });
      if (!saved) {
        showToast("无法发布：请先完成当前文章的目录和一级标题。", "error", 5600);
        return;
      }
    } catch (error) {
      showToast(`草稿保存失败：${error.message}`, "error", 5500);
      return;
    }
  }

  const drafts = [...state.drafts.values()].sort((draftA, draftB) => draftA.updatedAt - draftB.updatedAt);
  const draftError = drafts.map(getDraftValidationError).find(Boolean);
  if (draftError) {
    showToast(`无法发布：${draftError}`, "error", 5600);
    return;
  }

  if (!drafts.length) return;

  elements.publishAll.dataset.busy = "true";
  elements.publishAll.disabled = true;
  showToast(`正在发布 ${drafts.length} 条修改...`, "progress", 0);

  try {
    for (const draft of drafts) {
      const parsed = parseArticle(draft.source || "");
      const title = parsed.title || articleLabel(draft.path);

      if (draft.type === "delete") {
        await deleteFile({
          path: draft.path,
          sha: draft.baseSha,
          message: `docs: 删除 ${title}`,
        });
        await removeDraftRecord(draft.id);
        continue;
      }

      const referencedAttachments = (draft.attachments || []).filter((attachment) =>
        draft.source.includes(attachment.publicUrl),
      );

      for (const attachment of referencedAttachments) {
        await publishFile({
          path: attachment.path,
          content: attachment.base64,
          message: `docs: 上传图片 ${attachment.name}`,
        });
      }

      await publishFile({
        path: draft.path,
        content: encodeBase64(draft.source),
        sha: draft.isNew ? "" : draft.baseSha,
        message: `${draft.isNew ? "docs: 发布" : "docs: 更新"} ${title}`,
      });
      await removeDraftRecord(draft.id);
    }

    state.currentId = "";
    await loadArticleIndex();
    showOverview();
    showToast("全部修改已发布，GitHub 正在构建网站。", "success", 5200);
  } catch (error) {
    showToast(`发布中断：${error.message}`, "error", 7000);
  } finally {
    elements.publishAll.dataset.busy = "false";
    updatePublishButton();
  }
};

const insertAtCursor = (input, text) => {
  const start = input.selectionStart;
  const end = input.selectionEnd;
  input.setRangeText(text, start, end, "end");
  input.focus();
  scheduleCurrentDraftSave();
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
  clearStoredToken();
  state.token = "";
  state.remoteArticles = [];
  state.currentId = "";
  state.selectedCategories = [];
  state.selectedTags = [];
  state.folders = [];
  state.expandedCategories.clear();
  state.openMulti = "";
  state.folderMenuOpen = false;
  state.dateMenuOpen = false;
  elements.token.value = "";
  elements.workspace.hidden = true;
  elements.accessView.hidden = false;
  elements.toast.hidden = true;
  setStatus(elements.accessStatus);
  setStatus(elements.publishStatus);
};

const openMulti = (kind) => {
  if (getCurrentArticle()?.isDelete) return;
  state.openMulti = kind;
  renderMultiSelects();
};

const enterBackend = async (token, { auto = false } = {}) => {
  const normalizedToken = token.trim();
  if (!normalizedToken) return;

  state.token = normalizedToken;
  setBusy(elements.accessSubmit, true, auto ? "进入中" : "验证中");
  setAccessLoading(true, auto ? "正在使用已保存的 Token 进入后台..." : "正在进入后台...");
  setStatus(elements.accessStatus, auto ? "正在恢复后台会话..." : "正在验证 GitHub Token...");

  try {
    if (!state.db) {
      setAccessLoading(true, "正在打开本地草稿...");
      state.db = await openDatabase();
      await loadDrafts();
    }

    setAccessLoading(true, "正在验证 GitHub 权限...");
    const [user] = await Promise.all([
      githubRequest("/user"),
      githubRequest(`/repos/${REPOSITORY}`),
    ]);
    elements.accountName.textContent = user.login;
    setAccessLoading(true, "正在读取文章列表...");
    await loadArticleIndex();
    saveStoredToken(normalizedToken);
    elements.accessView.hidden = true;
    elements.workspace.hidden = false;
    showOverview();
    showToast(auto ? "已自动进入后台。" : "已进入后台，Token 已保存在本机浏览器。");
  } catch (error) {
    state.token = "";
    clearStoredToken();
    setStatus(
      elements.accessStatus,
      auto ? `已保存的 Token 无法使用，请重新填写：${error.message}` : `无法进入：${error.message}`,
      "error",
    );
  } finally {
    setAccessLoading(false);
    setBusy(elements.accessSubmit, false);
  }
};

elements.accessForm.addEventListener("submit", (event) => {
  event.preventDefault();
  enterBackend(elements.token.value);
});

elements.tokenVisibility.addEventListener("click", () => {
  const isPassword = elements.token.type === "password";
  elements.token.type = isPassword ? "text" : "password";
  elements.tokenVisibility.setAttribute("aria-label", isPassword ? "隐藏 Token" : "显示 Token");
});

elements.themeToggle.addEventListener("click", toggleTheme);
elements.signOut.addEventListener("click", signOut);
elements.publishAll.addEventListener("click", publishAllDrafts);
elements.newArticle.addEventListener("click", async () => {
  if (!(await saveBeforeLeavingCurrentArticle())) return;
  beginNewArticle().catch((error) => showToast(error.message, "error", 5000));
});
elements.emptyCreate.addEventListener("click", async () => {
  if (!(await saveBeforeLeavingCurrentArticle())) return;
  beginNewArticle().catch((error) => showToast(error.message, "error", 5000));
});
elements.mobileBack.addEventListener("click", async () => {
  if (await saveBeforeLeavingCurrentArticle()) showOverview();
});
elements.saveDraft.addEventListener("click", async () => {
  if (!state.isDirty) {
    showToast("当前没有未保存的修改。", "success", 2600);
    return;
  }

  try {
    const saved = await saveCurrentDraftNow({ reason: "manual" });
    if (saved) showToast("草稿已保存到本机。", "success", 3200);
  } catch (error) {
    showToast(`草稿保存失败：${error.message}`, "error", 5500);
  }
});
elements.resetEditor.addEventListener("click", () => {
  resetCurrentArticle().catch((error) => showToast(`还原失败：${error.message}`, "error", 5000));
});
elements.deleteArticle.addEventListener("click", openDeleteDialog);
elements.undoDelete.addEventListener("click", () => undoDelete().catch((error) => showToast(error.message, "error", 5000)));
elements.confirmDelete.addEventListener("click", () => {
  markSelectedArticleForDelete()
    .then(() => elements.deleteDialog.close())
    .catch((error) => {
      elements.deleteDescription.textContent = `操作失败：${error.message}`;
    });
});
elements.articleSearch.addEventListener("input", renderArticleList);
elements.articleList.addEventListener("click", async (event) => {
  const categoryToggle = event.target.closest("[data-category]");
  const articleButton = event.target.closest("[data-id]");

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

  if (!articleButton) return;

  if (articleButton.dataset.id === state.currentId) {
    if (isMobile() && elements.workspace.dataset.mobileView === "library") {
      showEditor();
    }
    return;
  }

  if (await saveBeforeLeavingCurrentArticle()) loadArticle(articleButton.dataset.id);
});
elements.imageUpload.addEventListener("change", () => {
  uploadImage(elements.imageUpload.files[0]).catch((error) =>
    showToast(`图片草稿失败：${error.message}`, "error", 5500),
  );
});
document.querySelectorAll("[data-wrap]").forEach((button) => {
  button.addEventListener("click", () => wrapSelection(button.dataset.wrap));
});

[elements.extra, elements.body].forEach((field) => {
  field.addEventListener("input", scheduleCurrentDraftSave);
});

elements.dateControl.addEventListener("click", openDateMenu);
elements.date.addEventListener("focus", openDateMenu);
elements.date.addEventListener("input", () => {
  const parsed = parseDateValue(elements.date.value);
  if (parsed) setCalendarMonthFromValue();
  renderDateMenu();
  scheduleCurrentDraftSave();
});
elements.datePicker.addEventListener("click", openDateMenu);

elements.folderControl.addEventListener("click", openFolderMenu);
elements.folder.addEventListener("focus", openFolderMenu);
elements.folder.addEventListener("input", () => {
  openFolderMenu();
  scheduleCurrentDraftSave();
});
elements.folder.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  selectFolder(elements.folder.value);
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
  const folderSelect = event.target.closest("[data-folder-select]");
  const folderAdd = event.target.closest("[data-folder-add]");
  const dateSelect = event.target.closest("[data-date-select]");
  const datePrev = event.target.closest("[data-date-prev]");
  const dateNext = event.target.closest("[data-date-next]");

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

  if (folderSelect) {
    selectFolder(folderSelect.dataset.folderSelect);
    return;
  }

  if (folderAdd) {
    selectFolder(folderAdd.dataset.folderAdd);
    return;
  }

  if (dateSelect) {
    selectDate(dateSelect.dataset.dateSelect);
    return;
  }

  if (datePrev) {
    changeCalendarMonth(-1);
    return;
  }

  if (dateNext) {
    changeCalendarMonth(1);
    return;
  }

  if (!event.target.closest(".multi-field") && state.openMulti) {
    state.openMulti = "";
    renderMultiSelects();
  }

  if (!event.target.closest(".folder-field") && state.folderMenuOpen) {
    state.folderMenuOpen = false;
    renderFolderMenu();
  }

  if (!event.target.closest(".date-field") && state.dateMenuOpen) {
    state.dateMenuOpen = false;
    renderDateMenu();
  }
});

applyTheme(getTheme());
updatePublishButton();

const storedToken = readStoredToken();
if (storedToken) {
  elements.token.value = storedToken;
  enterBackend(storedToken, { auto: true });
}
