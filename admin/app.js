const REPOSITORY = "ksladnasx/vuepress_blog";
const BRANCH = "main";
const POSTS_ROOT = "docs/posts/";
const UPLOADS_ROOT = "docs/.vuepress/public/uploads/";

const state = {
  token: "",
  articles: [],
  selectedPath: "",
  selectedSha: "",
  folders: [],
  user: null,
};

const elements = {
  accessView: document.querySelector("#access-view"),
  workspace: document.querySelector("#workspace"),
  accessForm: document.querySelector("#access-form"),
  token: document.querySelector("#token"),
  tokenVisibility: document.querySelector("#token-visibility"),
  accessSubmit: document.querySelector("#access-submit"),
  accessStatus: document.querySelector("#access-status"),
  accountName: document.querySelector("#account-name"),
  signOut: document.querySelector("#sign-out"),
  articleCount: document.querySelector("#article-count"),
  articleSearch: document.querySelector("#article-search"),
  articleList: document.querySelector("#article-list"),
  newArticle: document.querySelector("#new-article"),
  resetEditor: document.querySelector("#reset-editor"),
  publishArticle: document.querySelector("#publish-article"),
  editorMode: document.querySelector("#editor-mode"),
  filePath: document.querySelector("#file-path"),
  title: document.querySelector("#article-title"),
  date: document.querySelector("#article-date"),
  folder: document.querySelector("#article-folder"),
  category: document.querySelector("#article-category"),
  tags: document.querySelector("#article-tags"),
  extra: document.querySelector("#article-extra"),
  body: document.querySelector("#article-body"),
  articleForm: document.querySelector("#article-form"),
  publishStatus: document.querySelector("#publish-status"),
  folderOptions: document.querySelector("#folder-options"),
  imageUpload: document.querySelector("#image-upload"),
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

const splitList = (value) =>
  value
    .split(/[，,]/)
    .map((item) => item.trim())
    .filter(Boolean);

const serialiseList = (key, items) => {
  if (!items.length) {
    return "";
  }

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

const parseArticle = (source) => {
  const { frontmatter, content } = parseFrontmatter(source);
  const heading = content.match(/^#\s+(.+?)\s*(?:\r?\n|$)/);
  const title = heading?.[1]?.trim() || "";

  return {
    title,
    date: frontmatter.match(/^date:\s*([^\r\n]+)/m)?.[1]?.trim() || today(),
    category: parseListValue(frontmatter, "category"),
    tags: parseListValue(frontmatter, "tag"),
    extra: removeKnownFrontmatter(frontmatter),
    body: heading ? content.slice(heading[0].length).replace(/^\r?\n/, "") : content,
  };
};

const articleSource = () => {
  const metadata = [
    `date: ${elements.date.value || today()}`,
    serialiseList("category", splitList(elements.category.value)),
    serialiseList("tag", splitList(elements.tags.value)),
    elements.extra.value.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  const title = elements.title.value.trim();
  const body = elements.body.value.replace(/^\s+/, "");

  return `---\n${metadata}\n---\n\n# ${title}\n\n${body}`;
};

const articlePath = () => {
  const folder = normaliseFolder(elements.folder.value);
  return `${POSTS_ROOT}${folder}/${slugify(elements.title.value)}.md`;
};

const setEditor = (article = null) => {
  const isExisting = Boolean(article);
  state.selectedPath = article?.path || "";
  state.selectedSha = article?.sha || "";
  elements.editorMode.textContent = isExisting ? "编辑文章" : "新文章";
  elements.filePath.textContent = isExisting ? article.path : "发布时将自动创建文件";
  elements.title.value = article?.title || "";
  elements.date.value = article?.date || today();
  elements.folder.value = article?.folder || state.folders[0] || "otherlearning";
  elements.folder.readOnly = isExisting;
  elements.folder.title = isExisting ? "已有文章保留原有文件路径" : "";
  elements.category.value = article?.category?.join(", ") || "";
  elements.tags.value = article?.tags?.join(", ") || "";
  elements.extra.value = article?.extra || "";
  elements.body.value = article?.body || "";
  renderArticleList();
};

const articleLabel = (path) => path.split("/").pop().replace(/\.md$/i, "");

const renderFolders = () => {
  elements.folderOptions.replaceChildren(
    ...state.folders.map((folder) => {
      const option = document.createElement("option");
      option.value = folder;
      return option;
    }),
  );
};

const renderArticleList = () => {
  const query = elements.articleSearch.value.trim().toLocaleLowerCase();
  const articles = state.articles.filter((article) =>
    `${article.title} ${article.path}`.toLocaleLowerCase().includes(query),
  );

  elements.articleList.replaceChildren();
  elements.articleCount.textContent = `${state.articles.length} 篇文章`;

  if (!articles.length) {
    const empty = document.createElement("p");
    empty.className = "empty-list";
    empty.textContent = query ? "没有匹配的文章" : "还没有文章";
    elements.articleList.append(empty);
    return;
  }

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
    path.textContent = article.path.replace(POSTS_ROOT, "");
    button.append(title, path);
    elements.articleList.append(button);
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

  state.folders = [...new Set(posts.map((item) => item.path.slice(POSTS_ROOT.length).split("/").slice(0, -1).join("/")))]
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));
  state.articles = posts
    .map((item) => ({ path: item.path, sha: item.sha, title: articleLabel(item.path) }))
    .sort((a, b) => a.path.localeCompare(b.path, "zh-CN"));

  renderFolders();
  renderArticleList();
};

const loadArticle = async (path) => {
  setStatus(elements.publishStatus, "正在打开文章...");
  const article = await githubRequest(
    `/repos/${REPOSITORY}/contents/${encodePath(path)}?ref=${encodeURIComponent(BRANCH)}`,
  );
  const parsed = parseArticle(decodeBase64(article.content));

  setEditor({
    ...parsed,
    path,
    sha: article.sha,
    folder: path.slice(POSTS_ROOT.length).split("/").slice(0, -1).join("/"),
  });
  setStatus(elements.publishStatus);
};

const saveArticle = async () => {
  const title = elements.title.value.trim();
  const folder = normaliseFolder(elements.folder.value);

  if (!title || !folder) {
    setStatus(elements.publishStatus, "请先填写标题和存放目录。", "error");
    return;
  }

  const path = state.selectedPath || articlePath();

  setBusy(elements.publishArticle, true, "正在发布");
  setStatus(elements.publishStatus, "正在提交到 GitHub...");

  try {
    const payload = {
      message: `${state.selectedPath ? "docs: 更新" : "docs: 发布"} ${title}`,
      content: encodeBase64(articleSource()),
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

    state.selectedPath = path;
    state.selectedSha = response.content.sha;
    elements.filePath.textContent = path;
    elements.editorMode.textContent = "编辑文章";
    setStatus(elements.publishStatus, "已提交。GitHub 正在自动构建并发布网站。", "success");

    await loadArticleIndex();
  } catch (error) {
    setStatus(elements.publishStatus, `发布失败：${error.message}`, "error");
  } finally {
    setBusy(elements.publishArticle, false);
  }
};

const uploadImage = async (file) => {
  if (!file) {
    return;
  }

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
  state.user = null;
  state.articles = [];
  state.selectedPath = "";
  state.selectedSha = "";
  elements.token.value = "";
  elements.workspace.hidden = true;
  elements.accessView.hidden = false;
  setStatus(elements.accessStatus);
  setStatus(elements.publishStatus);
};

elements.accessForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  state.token = elements.token.value.trim();

  if (!state.token) {
    return;
  }

  setBusy(elements.accessSubmit, true, "验证中");
  setStatus(elements.accessStatus, "正在验证 GitHub Token...");

  try {
    const [user] = await Promise.all([
      githubRequest("/user"),
      githubRequest(`/repos/${REPOSITORY}`),
    ]);
    state.user = user;
    elements.accountName.textContent = user.login;

    await loadArticleIndex();
    elements.accessView.hidden = true;
    elements.workspace.hidden = false;
    setEditor();
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

elements.signOut.addEventListener("click", signOut);
elements.newArticle.addEventListener("click", () => {
  setEditor();
  elements.title.focus();
});
elements.resetEditor.addEventListener("click", () => {
  if (state.selectedPath) {
    loadArticle(state.selectedPath).catch((error) =>
      setStatus(elements.publishStatus, `重置失败：${error.message}`, "error"),
    );
    return;
  }

  setEditor();
});
elements.publishArticle.addEventListener("click", saveArticle);
elements.articleSearch.addEventListener("input", renderArticleList);
elements.articleList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-path]");

  if (button) {
    loadArticle(button.dataset.path).catch((error) =>
      setStatus(elements.publishStatus, `文章读取失败：${error.message}`, "error"),
    );
  }
});
elements.imageUpload.addEventListener("change", () => uploadImage(elements.imageUpload.files[0]));
document.querySelectorAll("[data-wrap]").forEach((button) => {
  button.addEventListener("click", () => wrapSelection(button.dataset.wrap));
});
