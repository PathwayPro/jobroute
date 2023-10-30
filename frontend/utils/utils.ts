export function capitalize(text: string) {
  return text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())
}

export function trim(text: string) {
  return text.trim().toLowerCase();
}