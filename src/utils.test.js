import { get } from './utils';

test('get', () => {
  const state = {
    age: '10',
  };

  const kim = get('age');

  expect(kim(state)).toBe('10');
});
