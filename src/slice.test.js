import reducer, { changeBudget } from './slice';

describe('reducer', () => {
  context('without state', () => {
    const initialState = {
      budget: '',
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  it('listens changeBudget action', () => {
    const initialState = {
      budget: { value: '' },
    };

    const state = reducer(initialState, changeBudget({ value: '10' }));

    expect(state.budget).toBe('10');
  });
});
