export function capitalize(text: string) {
  return text.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());
}

export const capitalizeWords = (string: string) => {

  if (string) {
    const words = string.split(' ');

    const capitalizedWords = words.map(word => {
      return (word.toLowerCase() !== 'and') ? word.charAt(0).toUpperCase() + word.slice(1) : word;
    });

    const resultString = capitalizedWords.join(' ');

    return resultString;
  }
};

export function trim(text: string) {
  return text.trim().toLowerCase();
}