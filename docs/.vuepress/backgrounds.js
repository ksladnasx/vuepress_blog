export const desktopLightBackgrounds = [
  "https://i.ibb.co/BhYnT7b/background0.webp",
  "https://i.ibb.co/qY25pDdr/background1.webp",
  "https://i.ibb.co/21mFb6VD/background2.webp",
];

export const desktopDarkBackgrounds = [
  "https://i.ibb.co/WvzTXWn0/background-dark0.webp",
  "https://i.ibb.co/mVs517MG/background-dark1.webp",
  "https://i.ibb.co/zVp6zf6V/background-dark2.webp",
];

export const mobileLightBackgrounds = [
  "https://i.ibb.co/SXSvfMv6/min-background0.webp",
  "https://i.ibb.co/RTQMH3zH/min-background1.webp",
  "https://i.ibb.co/j9V9WfCL/min-background2.webp",
  "https://i.ibb.co/xt6yG8pq/minbcg3.webp"
];

export const mobileDarkBackgrounds = [
  "https://i.ibb.co/8DtF8DM5/min-background-dark0.webp",
  "https://i.ibb.co/rfqgsxTC/min-background-dark1.webp",
  "https://i.ibb.co/8LgkC8YF/min-background2-dark.webp",
  "https://i.ibb.co/dsTTc50T/minbcgdark3.webp"
];

export const backgroundGroups = {
  desktop: {
    light: desktopLightBackgrounds,
    dark: desktopDarkBackgrounds,
  },
  mobile: {
    light: mobileLightBackgrounds,
    dark: mobileDarkBackgrounds,
  },
};

export const normalizeBackgroundIndex = (value, count) => {
  if (!count) return 0;
  if (!Number.isInteger(value)) return 0;

  return ((value % count) + count) % count;
};

export const getBackgroundCount = (mode) => {
  const group = backgroundGroups[mode] || backgroundGroups.desktop;

  return Math.max(group.light.length, group.dark.length);
};

export const getBackgroundUrl = (mode, theme, index) => {
  const group = backgroundGroups[mode] || backgroundGroups.desktop;
  const primaryList = group[theme] || group.light;
  const fallbackList = theme === "dark" ? group.light : group.dark;
  const normalizedIndex = normalizeBackgroundIndex(
    index,
    Math.max(primaryList.length, fallbackList.length),
  );

  return (
    primaryList[normalizedIndex] ||
    fallbackList[normalizedIndex] ||
    primaryList[0] ||
    fallbackList[0] ||
    ""
  );
};
