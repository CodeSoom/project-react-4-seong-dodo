import {
  get,
  exchangeRegEX,
  replaceString,
  exchangeLocalDate,
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

describe('exchangeLocalDate', () => {
  it('when "x < 10"', () => {
    const x = '9';

    const result = exchangeLocalDate(x);

    expect(result).toBe('09');
  });

  it('when "10 <= x"', () => {
    const x = '12';

    const result = exchangeLocalDate(x);

    expect(result).toBe('12');
  });
});
