import reducer, {
  changeBudget,
  setPreviousMonth,
  setNextMonth,
} from './slice';

describe('reducer', () => {
  context('without state', () => {
    const initialState = {
      budget: '',
      year: 2021,
      month: 7,
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

  describe('setPreviousMonth action', () => {
    it('when July', () => {
      const initialState = {
        year: 2021,
        month: 7,
      };

      const state = reducer(initialState, setPreviousMonth({ month: 6 }));

      expect(state.month).toBe(6);
    });

    it('when January', () => {
      const initialState = {
        year: 2021,
        month: 1,
      };

      const state = reducer(initialState, setPreviousMonth({ month: 1 }));

      expect(state.year).toBe(2020);
    });
  });

  describe('setNextMonth action', () => {
    it('when July', () => {
      const initialState = {
        year: 2021,
        month: 7,
      };

      const state = reducer(initialState, setNextMonth({ month: 8 }));

      expect(state.month).toBe(8);
    });

    it('when December', () => {
      const initialState = {
        year: 2021,
        month: 12,
      };

      const state = reducer(initialState, setNextMonth({ month: 12 }));

      expect(state.year).toBe(2022);
    });
  });
});
