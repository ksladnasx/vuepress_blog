<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vuepress/client";

const POSITION_KEY = "xh-text-reader-position";
const EDGE_GAP = 12;

const route = useRoute();
const readerRef = ref(null);
const panelRef = ref(null);
const isBrowser = typeof window !== "undefined";
const isSupported = isBrowser && "speechSynthesis" in window;
const isPlaying = ref(false);
const isPaused = ref(false);
const isExpanded = ref(false);
const isRateMenuOpen = ref(false);
const isVoiceMenuOpen = ref(false);
const panelPlacement = ref({ vertical: "down", horizontal: "right" });
const shouldRestartOnResume = ref(false);
const currentChunk = ref(0);
const chunks = ref([]);
const voices = ref([]);
const selectedVoiceURI = ref("");
const startMode = ref("current");
const rate = ref(1);
const pitch = ref(1);
const volume = ref(1);
const position = ref(null);
const statusText = ref(isSupported ? "准备朗读" : "当前浏览器不支持朗读");
const startPointText = ref("起点：当前位置");

let utterance = null;
let speechRunId = 0;
let dragState = null;

const rateOptions = [
  { label: "0.5x 很慢", value: 0.5 },
  { label: "0.85x 舒缓", value: 0.85 },
  { label: "1.0x 标准", value: 1 },
  { label: "1.15x 稍快", value: 1.15 },
  { label: "1.5x 很快", value: 1.5 },
];

const startModeOptions = [
  { label: "当前位置", value: "current" },
  { label: "从头开始", value: "top" },
];

const playLabel = computed(() => {
  if (!isPlaying.value) return "播放";
  return isPaused.value ? "继续" : "暂停";
});

const selectedVoice = computed(() => (
  voices.value.find((voice) => voice.voiceURI === selectedVoiceURI.value) || null
));

const rateLabel = computed(() => (
  rateOptions.find((option) => option.value === rate.value)?.label || "1.0x 标准"
));

const voiceLabel = computed(() => {
  if (!voices.value.length) return "系统默认";
  return selectedVoice.value?.name || "选择音色";
});



const readerStyle = computed(() => {
  if (!position.value) return {};

  return {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    right: "auto",
    bottom: "auto",
  };
});

const cleanText = (text) => text
  .replace(/\s+/g, " ")
  .replace(/[#*`>\[\]{}]/g, "")
  .trim();

const getArticleElement = () => {
  if (!isBrowser) return null;
  return document.querySelector(".vp-page [vp-content], .theme-default-content");
};

const removeIgnoredContent = (element) => {
  element
    .querySelectorAll("pre, script, style, button, select, .header-anchor, .xh-text-reader")
    .forEach((child) => child.remove());
};

const splitText = (text) => {
  const normalized = cleanText(text);
  if (!normalized) return [];

  const sentences = normalized.match(/[^。！？!?；;：:\n]+[。！？!?；;：:]?/g) || [normalized];
  const nextChunks = [];
  let buffer = "";

  sentences.forEach((sentence) => {
    const next = `${buffer}${sentence}`;
    if (next.length > 180 && buffer) {
      nextChunks.push(buffer);
      buffer = sentence;
      return;
    }
    buffer = next;
  });

  if (buffer) nextChunks.push(buffer);
  return nextChunks.filter(Boolean);
};

const getHeadingIndexFromHash = (article, headings) => {
  if (!route.hash) return -1;

  const targetId = decodeURIComponent(route.hash.slice(1));
  return headings.findIndex((heading) => heading.id === targetId);
};

const getHeadingIndexFromScroll = (headings) => {
  const offset = 128;
  let currentIndex = -1;

  headings.forEach((heading, index) => {
    if (heading.getBoundingClientRect().top <= offset) {
      currentIndex = index;
    }
  });

  return currentIndex;
};

const getTextFromHeading = (article, headingIndex) => {
  if (!isBrowser) return "";

  const clone = article.cloneNode(true);
  removeIgnoredContent(clone);

  const clonedHeadings = [...clone.querySelectorAll("h1, h2, h3, h4, h5, h6")];
  const target = clonedHeadings[headingIndex];
  if (!target) return clone.innerText || clone.textContent || "";

  const range = document.createRange();
  range.setStartBefore(target);
  range.setEndAfter(clone.lastChild);

  const container = document.createElement("div");
  container.appendChild(range.cloneContents());
  return container.innerText || container.textContent || "";
};

const updateStartPointText = async () => {
  if (!isBrowser) return;

  await nextTick();

  if (startMode.value === "top") {
    startPointText.value = "起点：文章开头";
    return;
  }

  const article = getArticleElement();
  if (!article) {
    startPointText.value = "起点：当前位置";
    return;
  }

  const headings = [...article.querySelectorAll("h1, h2, h3, h4, h5, h6")];
  const headingIndex = getHeadingIndexFromHash(article, headings);
  const fallbackIndex = headingIndex >= 0 ? headingIndex : getHeadingIndexFromScroll(headings);
  const heading = headings[fallbackIndex];

  if (!heading) {
    startPointText.value = "起点：当前位置";
    return;
  }

  const title = cleanText(heading.innerText || heading.textContent || "");
  startPointText.value = title ? `起点：${title}` : "起点：当前位置";
};

const getArticleText = (mode = "top") => {
  if (!isBrowser) return "";

  const article = getArticleElement();
  if (!article) return "";

  if (mode === "current") {
    const headings = [...article.querySelectorAll("h1, h2, h3, h4, h5, h6")];
    const headingIndex = getHeadingIndexFromHash(article, headings);
    const fallbackIndex = headingIndex >= 0 ? headingIndex : getHeadingIndexFromScroll(headings);

    if (fallbackIndex >= 0) {
      const title = cleanText(headings[fallbackIndex].innerText || headings[fallbackIndex].textContent || "");
      startPointText.value = title ? `起点：${title}` : "起点：当前位置";
      return getTextFromHeading(article, fallbackIndex);
    }
  }

  startPointText.value = mode === "current" ? "起点：当前位置" : "起点：文章开头";

  const clone = article.cloneNode(true);
  removeIgnoredContent(clone);

  return clone.innerText || clone.textContent || "";
};

const prepareChunks = async (mode = "top") => {
  if (!isSupported) return;

  await nextTick();
  statusText.value = "准备朗读";
  chunks.value = splitText(getArticleText(mode));
  currentChunk.value = 0;
  if (!chunks.value.length) {
    statusText.value = "没有找到可朗读的正文";
  } else {
    statusText.value = "准备朗读";
  }
};

const loadVoices = () => {
  if (!isSupported) return;

  const voiceMap = new Map();
  window.speechSynthesis.getVoices().forEach((voice) => {
    voiceMap.set(voice.voiceURI || `${voice.name}-${voice.lang}`, voice);
  });

  const nextVoices = [...voiceMap.values()].sort((a, b) => {
    const aIsZh = a.lang.toLowerCase().startsWith("zh");
    const bIsZh = b.lang.toLowerCase().startsWith("zh");
    if (aIsZh !== bIsZh) return aIsZh ? -1 : 1;
    if (a.default !== b.default) return a.default ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
  voices.value = nextVoices;

  const selectedStillExists = nextVoices.some((voice) => voice.voiceURI === selectedVoiceURI.value);

  if ((!selectedVoiceURI.value || !selectedStillExists) && nextVoices.length) {
    const preferred = nextVoices.find((voice) => voice.lang.toLowerCase().startsWith("zh"));
    selectedVoiceURI.value = (preferred || nextVoices[0]).voiceURI;
  }
};

const toggleVoiceMenu = () => {
  loadVoices();
  isVoiceMenuOpen.value = !isVoiceMenuOpen.value;
  isRateMenuOpen.value = false;
};

const cancelSpeech = () => {
  if (!isSupported) return;

  speechRunId += 1;
  window.speechSynthesis.cancel();
  utterance = null;
};

const stopReading = (message = "已停止") => {
  if (!isSupported) return;
  cancelSpeech();
  isPlaying.value = false;
  isPaused.value = false;
  shouldRestartOnResume.value = false;
  currentChunk.value = 0;
  statusText.value = chunks.value.length ? message : "没有找到可朗读的正文";
};

const resetReading = async () => {
  stopReading("准备朗读");
  
};

const pauseForSettingChange = (message) => {
  if (!isSupported || !isPlaying.value) return;

  cancelSpeech();
  isPlaying.value = true;
  isPaused.value = true;
  shouldRestartOnResume.value = true;
  statusText.value = message;
};

const speakChunk = (index) => {
  if (!isSupported || !chunks.value[index]) {
    cancelSpeech();
    isPlaying.value = false;
    isPaused.value = false;
    shouldRestartOnResume.value = false;
    currentChunk.value = chunks.value.length;
    statusText.value = "朗读完成";
    return;
  }

  const runId = speechRunId;
  currentChunk.value = index;
  utterance = new SpeechSynthesisUtterance(chunks.value[index]);
  utterance.lang = selectedVoice.value?.lang || "zh-CN";
  utterance.voice = selectedVoice.value;
  utterance.rate = Number(rate.value);
  utterance.pitch = Number(pitch.value);
  utterance.volume = Number(volume.value);
  utterance.onend = () => {
    if (!isPlaying.value || isPaused.value || runId !== speechRunId) return;
    speakChunk(index + 1);
  };
  utterance.onerror = () => {
    if (runId !== speechRunId) return;
    isPlaying.value = false;
    isPaused.value = false;
    shouldRestartOnResume.value = false;
    statusText.value = "朗读被打断";
  };

  statusText.value = "正在朗读";
  window.speechSynthesis.speak(utterance);
};

const startReading = async () => {
  if (!isSupported) return;

  await prepareChunks(startMode.value);

  if (!chunks.value.length) return;

  cancelSpeech();
  isPlaying.value = true;
  isPaused.value = false;
  shouldRestartOnResume.value = false;
  speakChunk(currentChunk.value >= chunks.value.length ? 0 : currentChunk.value);
};

const toggleReading = () => {
  if (!isSupported) return;

  if (isPlaying.value && isPaused.value) {
    isPaused.value = false;
    if (shouldRestartOnResume.value || !utterance) {
      shouldRestartOnResume.value = false;
      speechRunId += 1;
      speakChunk(Math.min(currentChunk.value, Math.max(chunks.value.length - 1, 0)));
      return;
    }

    window.speechSynthesis.resume();
    statusText.value = "正在朗读";
    return;
  }

  if (isPlaying.value) {
    window.speechSynthesis.pause();
    isPaused.value = true;
    statusText.value = "已暂停";
    return;
  }

  startReading();
};

const chooseVoice = (voice) => {
  pauseForSettingChange("已暂停，音色已切换");
  selectedVoiceURI.value = voice.voiceURI;
  isVoiceMenuOpen.value = false;
};

const handleRateChange = () => {
  pauseForSettingChange("已暂停，语速已切换");
};

const chooseRate = (value) => {
  if (rate.value !== value) {
    rate.value = value;
    handleRateChange();
  }

  isRateMenuOpen.value = false;
};

const handleSliderChange = () => {
  if (isPlaying.value && !isPaused.value) {
    statusText.value = "音量/音调将在下一段生效";
  }
};

const chooseStartMode = (value) => {
  if (startMode.value === value) return;

  startMode.value = value;
  resetReading();
  updateStartPointText();
};

const updatePanelPlacement = async () => {
  if (!isBrowser || !isExpanded.value) return;

  await nextTick();

  const readerRect = readerRef.value?.getBoundingClientRect();
  const panelRect = panelRef.value?.getBoundingClientRect();
  if (!readerRect || !panelRect) return;

  const gap = 10;
  const wouldOverflowBottom = readerRect.bottom + gap + panelRect.height > window.innerHeight - EDGE_GAP;
  const hasSpaceAbove = readerRect.top - gap - panelRect.height > EDGE_GAP;
  const wouldOverflowLeft = readerRect.right - panelRect.width < EDGE_GAP;
  const wouldOverflowRight = readerRect.left + panelRect.width > window.innerWidth - EDGE_GAP;

  panelPlacement.value = {
    vertical: wouldOverflowBottom && hasSpaceAbove ? "up" : "down",
    horizontal: wouldOverflowLeft && !wouldOverflowRight ? "left" : "right",
  };
};

const togglePanel = async () => {
  isExpanded.value = !isExpanded.value;
  if (!isExpanded.value) {
    isRateMenuOpen.value = false;
    isVoiceMenuOpen.value = false;
    return;
  }

  updateStartPointText();
  updatePanelPlacement();
};

const closePanel = () => {
  isExpanded.value = false;
  isRateMenuOpen.value = false;
  isVoiceMenuOpen.value = false;
};

const clampPosition = (x, y) => {
  if (!isBrowser) return { x, y };

  const element = readerRef.value;
  const rect = element?.getBoundingClientRect();
  const width = rect?.width || 90;
  const height = rect?.height || 48;
  const maxX = Math.max(EDGE_GAP, window.innerWidth - width - EDGE_GAP);
  const maxY = Math.max(EDGE_GAP, window.innerHeight - height - EDGE_GAP);

  return {
    x: Math.min(Math.max(x, EDGE_GAP), maxX),
    y: Math.min(Math.max(y, EDGE_GAP), maxY),
  };
};

const savePosition = () => {
  if (!isBrowser) return;
  if (!position.value) return;

  try {
    window.localStorage.setItem(POSITION_KEY, JSON.stringify(position.value));
  } catch {
    // Ignore storage failures in private or restricted modes.
  }
};

const loadPosition = () => {
  if (!isBrowser) return;

  try {
    const saved = JSON.parse(window.localStorage.getItem(POSITION_KEY) || "null");
    if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
      position.value = clampPosition(saved.x, saved.y);
    }
  } catch {
    window.localStorage.removeItem(POSITION_KEY);
  }
};

const handleTogglePointerDown = (event) => {
  if (event.button !== 0 && event.pointerType === "mouse") return;

  const rect = readerRef.value.getBoundingClientRect();
  dragState = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    offsetX: event.clientX - rect.left,
    offsetY: event.clientY - rect.top,
    moved: false,
  };

  event.currentTarget.setPointerCapture?.(event.pointerId);
};

const handleTogglePointerMove = (event) => {
  if (!dragState || event.pointerId !== dragState.pointerId) return;

  const distance = Math.hypot(event.clientX - dragState.startX, event.clientY - dragState.startY);
  if (distance > 4) {
    dragState.moved = true;
  }

  if (!dragState.moved) return;

  event.preventDefault();
  closePanel();
  position.value = clampPosition(event.clientX - dragState.offsetX, event.clientY - dragState.offsetY);
};

const handleTogglePointerUp = (event) => {
  if (!dragState || event.pointerId !== dragState.pointerId) return;

  event.currentTarget.releasePointerCapture?.(event.pointerId);

  if (dragState.moved) {
    savePosition();
  } else {
    togglePanel();
  }

  dragState = null;
};

const handleTogglePointerCancel = () => {
  dragState = null;
};

const handleWindowResize = () => {
  if (!isBrowser) return;
  if (!position.value) return;
  position.value = clampPosition(position.value.x, position.value.y);
  savePosition();
  updatePanelPlacement();
};

watch(
  () => route.path,
  () => {
    stopReading();
    isRateMenuOpen.value = false;
    isVoiceMenuOpen.value = false;
    updateStartPointText();
    prepareChunks(startMode.value);
  },
  { immediate: true },
);

watch(
  () => route.hash,
  () => {
    updateStartPointText();
  },
);

onMounted(() => {
  loadPosition();
  loadVoices();
  window.addEventListener("resize", handleWindowResize);
  window.speechSynthesis?.addEventListener?.("voiceschanged", loadVoices);
});

onBeforeUnmount(() => {
  stopReading();
  window.removeEventListener("resize", handleWindowResize);
  window.speechSynthesis?.removeEventListener?.("voiceschanged", loadVoices);
});
</script>

<template>
  <aside
    ref="readerRef"
    class="xh-text-reader"
    :class="{ expanded: isExpanded, active: isPlaying, playing: isPlaying && !isPaused, paused: isPaused }"
    :style="readerStyle"
  >
    <button
      class="reader-toggle"
      type="button"
      :aria-expanded="isExpanded"
      aria-label="展开或拖动朗读控件"
      @pointerdown="handleTogglePointerDown"
      @pointermove="handleTogglePointerMove"
      @pointerup="handleTogglePointerUp"
      @pointercancel="handleTogglePointerCancel"
    >
      <span class="reader-mark" aria-hidden="true"></span>
      <span class="reader-toggle-text">朗读</span>
    </button>

    <div
      ref="panelRef"
      class="reader-panel"
      :class="[`panel-${panelPlacement.vertical}`, `panel-${panelPlacement.horizontal}`]"
    >
      <div class="reader-head">
        <div class="reader-heading">
          <p class="reader-title">文本朗读</p>
        </div>
        <div class="reader-head-actions">
          <button class="reader-reset" type="button" aria-label="重置朗读位置" @click="resetReading">
            刷新
          </button>
          <button class="reader-close" type="button" aria-label="收起朗读控件" @click="closePanel">
            ×
          </button>
        </div>
      </div>

      <div class="reader-meta">
        <div class="reader-meta-row">
          <span>状态</span>
          <strong>{{ statusText }}</strong>
        </div>
        <div class="reader-meta-row">
          <span>起点</span>
          <strong>{{ startPointText.replace(/^起点：/, '') }}</strong>
        </div>
      </div>

      <p class="reader-note">
        <span style="color:darkorange;">注意：</span>
        起点随阅读内容变化，需在刷新后生效。
      </p>

      <div class="reader-control-row">
        <button
          class="reader-play"
          type="button"
          :aria-label="playLabel"
          :disabled="!isSupported || !chunks.length"
          @click="toggleReading"
        >
          <span v-if="!isPlaying || isPaused" class="reader-play-icon" aria-hidden="true"></span>
          <span v-else class="reader-pause-icon" aria-hidden="true"></span>
        </button>

        <div class="reader-rate-select" @click.stop>
          <span>语速</span>
          <button
            class="reader-rate-button"
            type="button"
            :aria-expanded="isRateMenuOpen"
            :disabled="!isSupported"
            @click="isRateMenuOpen = !isRateMenuOpen; isVoiceMenuOpen = false"
          >
            <span>{{ rateLabel }}</span>
          </button>

          <div v-if="isRateMenuOpen" class="reader-rate-menu">
            <button
              v-for="option in rateOptions"
              :key="option.value"
              type="button"
              :class="{ active: rate === option.value }"
              @click="chooseRate(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>
      </div>

      <div class="reader-start-row" aria-label="朗读起点">
        <span>起点</span>
        <button
          v-for="option in startModeOptions"
          :key="option.value"
          type="button"
          :class="{ active: startMode === option.value }"
          @click="chooseStartMode(option.value)"
        >
          {{ option.label }}
        </button>
      </div>

      <div class="reader-settings">
        <div class="reader-voice" @click.stop>
          <span>音色</span>
          <button
            class="reader-voice-button"
            type="button"
            :aria-expanded="isVoiceMenuOpen"
            :disabled="!isSupported"
            @click="toggleVoiceMenu"
          >
            <span>{{ voiceLabel }}</span>
            <small>{{ selectedVoice?.lang || "默认" }}</small>
          </button>

          <div v-if="isVoiceMenuOpen" class="reader-voice-menu">
            <button
              v-for="voice in voices"
              :key="voice.voiceURI"
              type="button"
              :class="{ active: selectedVoiceURI === voice.voiceURI }"
              @click="chooseVoice(voice)"
            >
              <span>{{ voice.name }}</span>
              <small>{{ voice.lang }}</small>
            </button>
          </div>
        </div>

        <div class="reader-sliders">
          <label>
            <span>音调</span>
            <input v-model.number="pitch" type="range" min="0.75" max="1.35" step="0.05" @change="handleSliderChange" />
          </label>
          <label>
            <span>音量</span>
            <input v-model.number="volume" type="range" min="0.45" max="1" step="0.05" @change="handleSliderChange" />
          </label>
        </div>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.xh-text-reader {
  position: fixed;
  right: max(18px, calc((100vw - var(--content-width)) / 2 - 156px));
  top: 132px;
  z-index: 220;
  font-family: var(--xh-font-family);
  color: var(--vp-c-text);
}

.reader-toggle,
.reader-close,
.reader-reset,
.reader-play,
.reader-rate-select button,
.reader-start-row button,
.reader-voice button {
  font: inherit;
}

.reader-toggle {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 86px;
  height: 40px;
  padding: 0 13px;
  border: 1px solid rgb(var(--xh-accent-rgb) / 24%);
  border-radius: 999px;
  color: var(--vp-c-text);
  background:
    linear-gradient(135deg, rgb(var(--xh-accent-rgb) / 16%), transparent 60%),
    color-mix(in srgb, var(--xh-reading-content-bg) 88%, var(--vp-c-bg));
  box-shadow: 0 12px 28px rgb(31 41 55 / 13%);
  cursor: grab;
  touch-action: none;
  user-select: none;
  backdrop-filter: blur(16px);
  transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
}

.reader-toggle:active {
  cursor: grabbing;
}

.reader-toggle:hover,
.xh-text-reader.active .reader-toggle {
  border-color: rgb(var(--xh-accent-rgb) / 46%);
  box-shadow: 0 16px 34px rgb(31 41 55 / 17%);
  transform: translateY(-1px);
}

.reader-mark {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--vp-c-accent);
  box-shadow: inset 0 0 0 5px rgb(255 255 255 / 34%);
}

.reader-mark::before {
  content: "";
  position: absolute;
  top: 5px;
  left: 8px;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-bottom: 5px solid transparent;
  border-left: 7px solid white;
}

.reader-mark::after {
  content: none;
}

.xh-text-reader.playing .reader-mark::before,
.xh-text-reader.playing .reader-mark::after {
  content: "";
  position: absolute;
  top: 6px;
  width: 2px;
  height: 8px;
  border: 0;
  border-radius: 999px;
  background: white;
}

.xh-text-reader.playing .reader-mark::before {
  left: 7px;
}

.xh-text-reader.playing .reader-mark::after {
  right: 7px;
}

.reader-toggle-text {
  font-size: 14px;
  font-weight: 650;
}

.reader-panel {
  position: absolute;
  width: min(292px, calc(100vw - 28px));
  padding: 13px;
  border: 1px solid rgb(var(--xh-accent-rgb) / 20%);
  border-radius: 8px;
  background: color-mix(in srgb, var(--xh-reading-content-bg) 90%, var(--vp-c-bg));
  box-shadow: 0 20px 46px rgb(31 41 55 / 18%);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-6px) scale(0.98);
  transform-origin: top right;
  backdrop-filter: blur(18px);
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.reader-panel.panel-down {
  top: calc(100% + 10px);
  bottom: auto;
}

.reader-panel.panel-up {
  top: auto;
  bottom: calc(100% + 10px);
}

.reader-panel.panel-right {
  right: 0;
  left: auto;
}

.reader-panel.panel-left {
  right: auto;
  left: 0;
}

.reader-panel.panel-down.panel-right {
  transform-origin: top right;
}

.reader-panel.panel-down.panel-left {
  transform-origin: top left;
}

.reader-panel.panel-up.panel-right {
  transform-origin: bottom right;
}

.reader-panel.panel-up.panel-left {
  transform-origin: bottom left;
}

.xh-text-reader.expanded .reader-panel {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0) scale(1);
}

.reader-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.reader-heading {
  min-width: 0;
}

.reader-head-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.reader-title {
  margin: 0;
}

.reader-title {
  color: var(--vp-c-text);
  font-size: 15px;
  font-weight: 750;
  line-height: 1.25;
}

.reader-meta {
  position: relative;
  display: grid;
  gap: 5px;
  margin-top: 10px;
  padding: 9px 10px 9px 13px;
  border: 1px solid rgb(var(--xh-accent-rgb) / 16%);
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgb(var(--xh-accent-rgb) / 10%), transparent 70%),
    color-mix(in srgb, var(--vp-c-bg) 72%, transparent);
}

.reader-meta::before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 7px;
  width: 3px;
  border-radius: 999px;
  background: var(--vp-c-accent);
}

.reader-meta-row {
  display: grid;
  grid-template-columns: 36px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.reader-meta-row span {
  color: var(--vp-c-text-subtle);
  font-size: 11px;
  font-weight: 650;
}

.reader-meta-row strong {
  overflow: hidden;
  color: var(--vp-c-text);
  font-size: 12px;
  font-weight: 650;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reader-note {
  margin: 7px 2px 0;
  color: var(--vp-c-text-subtle);
  font-size: 11px;
  line-height: 1.45;
}

.reader-close {
  display: grid;
  width: 28px;
  height: 28px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: var(--vp-c-text-mute);
  background: transparent;
  cursor: pointer;
}

.reader-reset {
  height: 30px;
  padding: 0 11px;
  border: 1px solid rgb(var(--xh-accent-rgb) / 36%);
  border-radius: 8px;
  color: var(--vp-c-accent);
  background: rgb(var(--xh-accent-rgb) / 10%);
  cursor: pointer;
  font-size: 12px;
  font-weight: 700;
  transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
}

.reader-reset:hover {
  border-color: rgb(var(--xh-accent-rgb) / 52%);
  background: rgb(var(--xh-accent-rgb) / 16%);
  transform: translateY(-1px);
}

.reader-close:hover {
  color: var(--vp-c-text);
  background: var(--vp-c-control);
}

.reader-control-row {
  display: grid;
  grid-template-columns: 46px minmax(0, 1fr);
  align-items: center;
  gap: 10px;
  margin-top: 12px;
}

.reader-play {
  display: grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border: 0;
  border-radius: 50%;
  color: white;
  background:
    linear-gradient(135deg, rgb(var(--xh-accent-rgb) / 96%), var(--vp-c-accent-bg)),
    var(--vp-c-accent-bg);
  box-shadow: 0 12px 24px rgb(var(--xh-accent-rgb) / 24%);
  cursor: pointer;
}

.reader-play:disabled {
  cursor: not-allowed;
  opacity: 0.48;
}

.reader-play-icon {
  width: 0;
  height: 0;
  margin-left: 3px;
  border-top: 9px solid transparent;
  border-bottom: 9px solid transparent;
  border-left: 14px solid currentColor;
}

.reader-pause-icon {
  width: 15px;
  height: 18px;
  border-right: 5px solid currentColor;
  border-left: 5px solid currentColor;
}

.reader-rate-select {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-width: 0;
  height: 38px;
  padding: 0 9px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-mute);
  background: color-mix(in srgb, var(--vp-c-bg) 74%, transparent);
  font-size: 12px;
}

.reader-rate-select span {
  white-space: nowrap;
}

.reader-rate-button {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  width: 100%;
  min-width: 0;
  border: 0;
  border-radius: 6px;
  height: 30px;
  padding: 0 8px;
  color: var(--vp-c-text);
  background: rgb(var(--xh-accent-rgb) / 9%);
  cursor: pointer;
}

.reader-rate-button span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reader-rate-button:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.reader-rate-menu {
  position: absolute;
  right: 5px;
  left: 42px;
  top: calc(100% + 6px);
  z-index: 3;
  padding: 5px;
  border: 1px solid rgb(var(--xh-accent-rgb) / 18%);
  border-radius: 8px;
  background: color-mix(in srgb, var(--xh-reading-content-bg) 96%, var(--vp-c-bg));
  box-shadow: 0 16px 34px rgb(31 41 55 / 18%);
  backdrop-filter: blur(18px);
}

.reader-rate-menu button {
  display: block;
  width: 100%;
  min-height: 32px;
  padding: 5px 8px;
  border: 0;
  border-radius: 6px;
  color: var(--vp-c-text);
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.reader-rate-menu button:hover,
.reader-rate-menu button.active {
  background: rgb(var(--xh-accent-rgb) / 14%);
}

.reader-start-row {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  gap: 4px;
  min-height: 36px;
  margin-top: 10px;
  padding: 3px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-mute);
  background: color-mix(in srgb, var(--vp-c-bg) 74%, transparent);
  font-size: 12px;
}

.reader-start-row > span {
  padding: 0 7px;
  white-space: nowrap;
}

.reader-start-row button {
  height: 28px;
  border: 0;
  border-radius: 6px;
  color: var(--vp-c-text-mute);
  background: transparent;
  cursor: pointer;
}

.reader-start-row button.active {
  color: var(--vp-c-text);
  background: rgb(var(--xh-accent-rgb) / 16%);
  box-shadow: inset 0 0 0 1px rgb(var(--xh-accent-rgb) / 18%);
}

.reader-settings {
  display: grid;
  gap: 9px;
  margin-top: 11px;
}

.reader-voice {
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  align-items: center;
  gap: 8px;
  min-height: 36px;
  padding: 5px 5px 5px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-mute);
  background: color-mix(in srgb, var(--vp-c-bg) 74%, transparent);
  font-size: 12px;
}

.reader-voice > span {
  white-space: nowrap;
}

.reader-voice-button {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-width: 0;
  height: 30px;
  padding: 0 8px;
  border: 0;
  border-radius: 6px;
  color: var(--vp-c-text);
  background: rgb(var(--xh-accent-rgb) / 9%);
  cursor: pointer;
}

.reader-voice-button span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.reader-voice-button small,
.reader-voice-menu small {
  color: var(--vp-c-text-mute);
  font-size: 11px;
  white-space: nowrap;
}

.reader-voice-button:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

.reader-voice-menu {
  position: absolute;
  right: 5px;
  left: 46px;
  top: calc(100% + 6px);
  z-index: 2;
  max-height: 178px;
  overflow: auto;
  padding: 5px;
  border: 1px solid rgb(var(--xh-accent-rgb) / 18%);
  border-radius: 8px;
  background: color-mix(in srgb, var(--xh-reading-content-bg) 96%, var(--vp-c-bg));
  box-shadow: 0 16px 34px rgb(31 41 55 / 18%);
  backdrop-filter: blur(18px);
}

.reader-voice-menu button {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: center;
  gap: 8px;
  width: 100%;
  min-height: 32px;
  padding: 5px 7px;
  border: 0;
  border-radius: 6px;
  color: var(--vp-c-text);
  background: transparent;
  cursor: pointer;
  text-align: left;
}

.reader-voice-menu button span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reader-voice-menu button:hover,
.reader-voice-menu button.active {
  background: rgb(var(--xh-accent-rgb) / 14%);
}

.reader-sliders {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.reader-sliders label {
  display: grid;
  gap: 5px;
  padding: 8px 10px;
  border: 1px solid var(--vp-c-border);
  border-radius: 8px;
  color: var(--vp-c-text-mute);
  background: color-mix(in srgb, var(--vp-c-bg) 74%, transparent);
  font-size: 12px;
}

.reader-sliders input {
  width: 100%;
  accent-color: var(--vp-c-accent);
}

@media (max-width: 1170px) {
  .xh-text-reader {
    right: 18px;
  }
}

@media (max-width: 719px) {
  .xh-text-reader {
    top: auto;
    right: 12px;
    bottom: 14px;
  }

  .reader-toggle {
    min-width: 76px;
    height: 38px;
    padding: 0 12px;
  }

  .reader-panel {
    width: min(272px, calc(100vw - 24px));
    padding: 11px;
  }

  .reader-control-row {
    grid-template-columns: 42px minmax(0, 1fr);
    gap: 9px;
  }

  .reader-play {
    width: 42px;
    height: 42px;
  }
}

@media (max-width: 419px) {
  .xh-text-reader {
    right: 8px;
    bottom: 10px;
  }

  .reader-panel {
    width: calc(80vw - 16px);
  }

  .reader-sliders {
    grid-template-columns: 1fr;
  }
}
</style>
