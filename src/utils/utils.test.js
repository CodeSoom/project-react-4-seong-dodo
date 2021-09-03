import {
  get,
  exchangeRegEX,
  replaceString,
} from './utils';

test('get', () => {
  const state = {
    age: '10',
  };

  const kim = get('age');

  expect(kim(state)).toBe('10');
});

test('exchangeRegEX', () => {
  const number = 1000000;

  const result = exchangeRegEX(number);

  expect(result).toBe('1,000,000');
});

test('replaceString', () => {
  const string = '1,000,000';

  const result = replaceString(string);

  expect(result).toBe('1000000');
});
