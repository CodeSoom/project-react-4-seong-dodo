export function get(key) {
  return (obj) => obj[key];
}

export function exchangeRegEX(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function replaceString(string) {
  return string.replace(/,/gi, '');
}
