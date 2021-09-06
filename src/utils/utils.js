export function get(key) {
  return (obj) => obj[key];
}

export function exchangeRegEX(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function replaceString(string) {
  return string.replace(/,/gi, '');
}

export function removeDecimalPoint(string) {
  return Math.floor(parseInt((string), 10)).toString();
}

export function exchangeLocalDate(x) {
  if (x < 10) {
    return `0${x}`;
  }
  return x;
}
