import reducer, {
  changeBudget,
  changeBreakdown,
  setPreviousMonth,
  setNextMonth,
  setDailyTransaction,
} from './slice';

describe('reducer', () => {
  context('without state', () => {
    const initialState = {
      budget: '',
      breakdown: '',
      year: 2021,
      month: 7,
      dailyTransaction: {
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistory: [
          { type: '수입', breakdown: 10000 },
          { type: '지출', breakdown: 20000 },
        ],
      },
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

  it('listens changeBreakdown action', () => {
    const initialState = {
      breakdown: { value: '' },
    };

    const state = reducer(initialState, changeBreakdown({ value: '1000' }));

    expect(state.breakdown).toBe('1000');
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
      expect(state.month).toBe(12);
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
      expect(state.month).toBe(1);
    });
  });

  it('listens setDailyTransaction action', () => {
    const initialState = {
      dailyTransaction: {
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistory: [
          { type: '수입', breakdown: 10000 },
          { type: '지출', breakdown: 20000 },
        ],
      },
    };

    const state = reducer(initialState, setDailyTransaction({ date: 2, day: 5 }));

    expect(state.dailyTransaction.date).toBe(2);
    expect(state.dailyTransaction.day).toBe(5);
  });
});
