import { defineClientConfig, useRouter } from "vuepress/client";
import Layout from "./layouts/Layout.vue";
import Article from "./layouts/Article.vue";
import Category from "./layouts/Category.vue";
import Tag from "./layouts/Tag.vue";
import Timeline from "./layouts/Timeline.vue";
import HomeDashboard from "./components/HomeDashboard.vue";
import ResumeExperienceList from "./components/ResumeExperienceList.vue";
import { nextTick, onMounted } from "vue";
import "./styles/index.scss";

const DIFY_CHATBOT_TOKEN = "PRFQL6hdwlirsgQK";
const DIFY_POSITION_KEY = "xh-dify-chatbot-position";
const DIFY_BUTTON_SELECTOR = "#dify-chatbot-bubble-button";
const DIFY_WINDOW_SELECTOR = "#dify-chatbot-bubble-window";
const DIFY_EDGE_GAP = 16;

let difyDragObserver = null;
let difyPositionRaf = 0;

const loadDifyChatbot = () => {
  if (typeof window === "undefined") return;
  if (document.getElementById(DIFY_CHATBOT_TOKEN)) {
    makeDifyChatbotDraggable();
    return;
  }

  const script = document.createElement("script");
  script.src = "https://udify.app/embed.min.js";
  script.id = DIFY_CHATBOT_TOKEN;
  script.defer = true;
  script.addEventListener("load", makeDifyChatbotDraggable, { once: true });
  document.body.appendChild(script);
  makeDifyChatbotDraggable();
};

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const readDifyPosition = () => {
  try {
    const saved = JSON.parse(window.localStorage.getItem(DIFY_POSITION_KEY) || "null");

    if (
      saved &&
      Number.isFinite(saved.x) &&
      Number.isFinite(saved.y)
    ) {
      return saved;
    }
  } catch {
    window.localStorage.removeItem(DIFY_POSITION_KEY);
  }

  return null;
};

const saveDifyPosition = (x, y) => {
  try {
    window.localStorage.setItem(DIFY_POSITION_KEY, JSON.stringify({ x, y }));
  } catch {
    // Ignore storage errors in restricted browser modes.
  }
};

const setFixedPosition = (element, x, y) => {
  element.style.setProperty("position", "fixed", "important");
  element.style.setProperty("left", `${x}px`, "important");
  element.style.setProperty("top", `${y}px`, "important");
  element.style.setProperty("right", "auto", "important");
  element.style.setProperty("bottom", "auto", "important");
};

const getClampedButtonPosition = (button, x, y) => {
  const rect = button.getBoundingClientRect();
  const maxX = Math.max(DIFY_EDGE_GAP, window.innerWidth - rect.width - DIFY_EDGE_GAP);
  const maxY = Math.max(DIFY_EDGE_GAP, window.innerHeight - rect.height - DIFY_EDGE_GAP);

  return {
    x: clamp(x, DIFY_EDGE_GAP, maxX),
    y: clamp(y, DIFY_EDGE_GAP, maxY),
  };
};

const positionDifyWindow = () => {
  const button = document.querySelector(DIFY_BUTTON_SELECTOR);
  const chatWindow = document.querySelector(DIFY_WINDOW_SELECTOR);

  if (!button || !chatWindow) return;

  const buttonRect = button.getBoundingClientRect();
  const windowRect = chatWindow.getBoundingClientRect();
  const width = Math.min(windowRect.width || 384, window.innerWidth - DIFY_EDGE_GAP * 2);
  const height = Math.min(windowRect.height || 640, window.innerHeight - DIFY_EDGE_GAP * 2);
  const preferredTop = buttonRect.top - height - DIFY_EDGE_GAP;
  const fallbackTop = buttonRect.bottom + DIFY_EDGE_GAP;
  const top = preferredTop >= DIFY_EDGE_GAP
    ? preferredTop
    : clamp(fallbackTop, DIFY_EDGE_GAP, window.innerHeight - height - DIFY_EDGE_GAP);
  const left = clamp(
    buttonRect.left + buttonRect.width - width,
    DIFY_EDGE_GAP,
    window.innerWidth - width - DIFY_EDGE_GAP,
  );

  chatWindow.style.setProperty("position", "fixed", "important");
  chatWindow.style.setProperty("left", `${left}px`, "important");
  chatWindow.style.setProperty("top", `${top}px`, "important");
  chatWindow.style.setProperty("right", "auto", "important");
  chatWindow.style.setProperty("bottom", "auto", "important");
  chatWindow.dataset.xhPositioned = "true";
};

const scheduleDifyWindowPosition = () => {
  if (difyPositionRaf) return;

  difyPositionRaf = window.requestAnimationFrame(() => {
    difyPositionRaf = 0;
    positionDifyWindow();
  });
};

const applySavedDifyPosition = (button) => {
  const saved = readDifyPosition();
  const rect = button.getBoundingClientRect();
  const startX = saved?.x ?? rect.left;
  const startY = saved?.y ?? rect.top;
  const next = getClampedButtonPosition(button, startX, startY);

  setFixedPosition(button, next.x, next.y);
  scheduleDifyWindowPosition();
};

const wireDifyDrag = (button) => {
  if (button.dataset.xhDraggable === "true") return;

  button.dataset.xhDraggable = "true";
  button.style.setProperty("cursor", "grab", "important");
  button.style.setProperty("touch-action", "none", "important");

  let dragState = null;
  let suppressClick = false;

  button.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 && event.pointerType === "mouse") return;

    const rect = button.getBoundingClientRect();

    dragState = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      moved: false,
    };

    button.setPointerCapture?.(event.pointerId);
    button.style.setProperty("cursor", "grabbing", "important");
  });

  button.addEventListener("pointermove", (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;

    const distance = Math.hypot(
      event.clientX - dragState.startClientX,
      event.clientY - dragState.startClientY,
    );

    if (distance > 4) {
      dragState.moved = true;
    }

    if (!dragState.moved) return;

    event.preventDefault();

    const next = getClampedButtonPosition(
      button,
      event.clientX - dragState.offsetX,
      event.clientY - dragState.offsetY,
    );

    setFixedPosition(button, next.x, next.y);
    saveDifyPosition(next.x, next.y);
    scheduleDifyWindowPosition();
  });

  const stopDragging = (event) => {
    if (!dragState || event.pointerId !== dragState.pointerId) return;

    if (dragState.moved) {
      suppressClick = true;
      window.setTimeout(() => {
        suppressClick = false;
      }, 0);
    }

    button.releasePointerCapture?.(event.pointerId);
    button.style.setProperty("cursor", "grab", "important");
    dragState = null;
  };

  button.addEventListener("pointerup", stopDragging);
  button.addEventListener("pointercancel", stopDragging);
  button.addEventListener(
    "click",
    (event) => {
      if (!suppressClick) {
        window.setTimeout(scheduleDifyWindowPosition, 0);
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    },
    true,
  );
};

const makeDifyChatbotDraggable = () => {
  if (typeof window === "undefined") return;

  const setup = () => {
    const button = document.querySelector(DIFY_BUTTON_SELECTOR);

    if (!button) return;

    wireDifyDrag(button);
    applySavedDifyPosition(button);
  };

  setup();

  if (difyDragObserver) return;

  difyDragObserver = new MutationObserver(() => {
    setup();
    scheduleDifyWindowPosition();
  });

  difyDragObserver.observe(document.body, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("resize", () => {
    const button = document.querySelector(DIFY_BUTTON_SELECTOR);
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const next = getClampedButtonPosition(button, rect.left, rect.top);

    setFixedPosition(button, next.x, next.y);
    saveDifyPosition(next.x, next.y);
    scheduleDifyWindowPosition();
  });
};

const renderMath = () => {
  if (typeof window === "undefined") return;
  const renderMathInElement = window.renderMathInElement;
  if (typeof renderMathInElement !== "function") return;

  const el = document.querySelector(".vp-page [vp-content]");
  if (!el) return;

  renderMathInElement(el, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
  });
};

export default defineClientConfig({
  layouts: {
    Layout,
    Article,
    Category,
    Tag,
    Timeline,
  },
  enhance({ app }) {
    app.component("HomeDashboard", HomeDashboard);
    app.component("ResumeExperienceList", ResumeExperienceList);
  },
  setup() {
    const router = useRouter();

    onMounted(() => {
      nextTick(renderMath);
      nextTick(loadDifyChatbot);
    });

    router.afterEach(() => {
      nextTick(renderMath);
    });
  },
});
