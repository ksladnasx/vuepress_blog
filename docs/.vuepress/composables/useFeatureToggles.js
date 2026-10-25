import { ref } from "vue";

const STORAGE_KEY = "xh-feature-toggles";
export const DIFY_TOGGLE_EVENT = "xh-dify-chatbot-toggle";
export const DIFY_DISABLED_ATTR = "data-xh-dify-chatbot-off";

export const defaultFeatureToggles = {
  difyChatbot: true,
  textReader: true,
};

// 模块加载时同步读取本地存储：客户端水合前即可拿到正确值，避免悬浮球闪烁
const readInitialToggles = () => {
  if (typeof window === "undefined") return { ...defaultFeatureToggles };

  try {
    const saved = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || "null",
    );

    if (saved && typeof saved === "object") {
      return {
        difyChatbot:
          typeof saved.difyChatbot === "boolean"
            ? saved.difyChatbot
            : defaultFeatureToggles.difyChatbot,
        textReader:
          typeof saved.textReader === "boolean"
            ? saved.textReader
            : defaultFeatureToggles.textReader,
      };
    }
  } catch {
    window.localStorage.removeItem(STORAGE_KEY);
  }

  return { ...defaultFeatureToggles };
};

export const toggles = ref(readInitialToggles());

const persistToggles = () => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(toggles.value));
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
};

// 通过 <html> 属性控制 Dify 悬浮球显隐（元素由第三方脚本动态注入，CSS 兜底最稳妥）
const applyDifyVisibility = () => {
  if (typeof document === "undefined") return;

  if (toggles.value.difyChatbot) {
    document.documentElement.removeAttribute(DIFY_DISABLED_ATTR);
  } else {
    document.documentElement.setAttribute(DIFY_DISABLED_ATTR, "true");
  }
};

export const updateFeatureToggle = (key, value) => {
  if (!(key in defaultFeatureToggles)) return;

  toggles.value = { ...toggles.value, [key]: Boolean(value) };
  persistToggles();

  if (key === "difyChatbot") {
    applyDifyVisibility();

    if (typeof document !== "undefined") {
      document.dispatchEvent(
        new CustomEvent(DIFY_TOGGLE_EVENT, {
          detail: toggles.value.difyChatbot,
        }),
      );
    }
  }
};

export const resetFeatureToggles = () => {
  toggles.value = { ...defaultFeatureToggles };
  persistToggles();
  applyDifyVisibility();

  if (typeof document !== "undefined") {
    document.dispatchEvent(
      new CustomEvent(DIFY_TOGGLE_EVENT, {
        detail: true,
      }),
    );
  }
};

export const initFeatureToggles = () => {
  applyDifyVisibility();
};

export const useFeatureToggles = () => ({
  toggles,
  defaultFeatureToggles,
  updateFeatureToggle,
  resetFeatureToggles,
});
