export function capitalize(text: string) {
  return text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export const capitalizeWords = (string: string) => {
  if (string) {
    return string
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
};

export function trim(text: string) {
  return text.trim().toLowerCase();
}