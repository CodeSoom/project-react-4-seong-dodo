import mockInitState from '../fixtures/mockInitState';

import reducer, {
  changeBudget,
  selectType,
  changeTransactionType,
  changeTransactionCategory,
  changeTransactionFields,
  setTransaction,
  setTransactionHistory,
  setPreviousMonth,
  setNextMonth,
  setDailyTransaction,
} from './slice';

describe('reducer', () => {
  context('without state', () => {
    const initialState = {
      ...mockInitState,
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  it('listens changeBudget action', () => {
    const initialState = {
      budget: { value: 0 },
    };

    const state = reducer(initialState, changeBudget({ value: 10 }));

    expect(state.budget).toBe(10);
  });

  it('listens selectType action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState, selectType('수입'));

    expect(state.selectedType).toBe('수입');
  });

  it('listens changeTransactionType action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState, changeTransactionType('수입'));

    expect(state.transaction.type).toBe('수입');
  });

  it('listens changeTransactionCategory action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState, changeTransactionCategory('식비'));

    expect(state.transaction.category).toBe('식비');
  });

  describe('change TransactionFields action', () => {
    const initialState = {
      ...mockInitState,
    };

    it('changes a field of breakdown', () => {
      const state = reducer(
        initialState,
        changeTransactionFields({ name: 'breakdown', value: 1000 }),
      );

      expect(state.transaction.transactionFields.breakdown).toBe(1000);
    });

    it('changes a field of source', () => {
      const state = reducer(
        initialState,
        changeTransactionFields({ name: 'source', value: '카페' }),
      );

      expect(state.transaction.transactionFields.source).toBe('카페');
    });

    it('changes a field of memo', () => {
      const state = reducer(
        initialState,
        changeTransactionFields({ name: 'memo', value: '친구들이랑' }),
      );

      expect(state.transaction.transactionFields.memo).toBe('친구들이랑');
    });
  });

  it('listens setTransaction action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState,
      setTransaction({
        transaction: {
          type: '지출',
          category: '카페',
          transactionFields: {
            breakdown: 1000,
            source: '스타벅스',
            memo: '혼자',
          },
        },
      }));

    expect(state.transaction.type).toBe('지출');
    expect(state.transaction.category).toBe('카페');
    expect(state.transaction.transactionFields.breakdown).toBe(1000);
    expect(state.transaction.transactionFields.source).toBe('스타벅스');
    expect(state.transaction.transactionFields.memo).toBe('혼자');
  });

  it('listens setTransactionHistory action', () => {
    const initialState = {
      dailyTransaction: {
        transactionHistory: [],
      },
    };

    const transaction = {
      type: '지출',
      category: '카페',
      transactionFields: {
        breakdown: 1000,
        source: '스타벅스',
        memo: '혼자',
      },
    };

    const state = reducer(initialState, setTransactionHistory({ transactionHistory: transaction }));

    expect(state.dailyTransaction.transactionHistory).toHaveLength(1);
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
        transactionHistory: [],
      },
    };

    const state = reducer(initialState, setDailyTransaction({ date: 2, day: 5 }));

    expect(state.dailyTransaction.date).toBe(2);
    expect(state.dailyTransaction.day).toBe(5);
  });
});
