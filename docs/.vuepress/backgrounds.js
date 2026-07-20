export const desktopLightBackgrounds = [
  "https://i.ibb.co/JjyqpjsF/background0.png",
  "https://i.ibb.co/bjkRdF3P/background1.png",
  "https://i.ibb.co/rGn7Yh0Q/background2.png",
];

export const desktopDarkBackgrounds = [
  "https://i.ibb.co/tPPvk19J/background-dark0.jpg",
  "https://i.ibb.co/5zz7J7x/background-dark1.jpg",
  "https://i.ibb.co/zVJ7Px42/background-dark2.png",
];

export const mobileLightBackgrounds = [
  "https://i.ibb.co/0pd3y8GQ/min-background0.jpg",
  "https://i.ibb.co/WpHsM7vH/min-background1.jpg",
];

export const mobileDarkBackgrounds = [
  "https://i.ibb.co/jZjzhbMp/min-background-dark0.jpg",
  "https://i.ibb.co/spp1771L/min-background-dark1.png",
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
