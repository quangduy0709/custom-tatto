export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const randID = () => {
  return Math.random().toString(36).slice(2);
};

export function enumToArray<Type>(data: Type) {
  const prev: Type[Extract<keyof Type, string>][] = [];

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const element = data[key];

      if (element) prev.push(element);
    }
  }

  return prev;
}
