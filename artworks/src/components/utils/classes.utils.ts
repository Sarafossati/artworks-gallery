export const pageClasses = (classes: string, isDesktop: boolean): string => {
    if (isDesktop) return classes;
    return `${classes}--mobile`;
  };