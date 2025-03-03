export const pageClasses = (classes: string, isBigScreen: boolean): string => {
    if (isBigScreen) return classes;
    return `${classes}--mobile`;
  };