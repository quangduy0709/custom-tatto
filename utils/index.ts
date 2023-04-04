export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const randID = () => {
  return Math.random().toString(36).slice(2);
};
