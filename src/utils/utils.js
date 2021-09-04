export function get(key) {
  return (obj) => obj[key];
}

export function exchangeRegEX(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function replaceString(string) {
  return string.replace(/,/gi, '');
}

export function exchangeLocalDate(x) {
  if (x < 10) {
    return `0${x}`;
  }
  return x;
}
