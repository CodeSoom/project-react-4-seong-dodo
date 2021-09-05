import mockInitState from '../../fixtures/mockInitState';
import mockDailyData from '../../fixtures/mockDailyData';
import mockExpenseTransaction from '../../fixtures/mockExpenseTransaction';
import mockIncomeTransaction from '../../fixtures/mockIncomeTransaction';

import DAILY_TRANSACTION from '../../fixtures/daily-transaction';
import MONTHLY_TRANSACTION from '../../fixtures/monthly-transaction';

import reducer, {
  changeBudget,
  setTargetId,
  clearTargetId,
  selectType,
  selectCategory,
  changeTransactionType,
  changeTransactionCategory,
  changeBreakdownFields,
  changeTransactionFields,
  clearTransactionFields,
  setDailyData,
  setTransaction,
  setDailyTransaction,
  setMonthlyTransaction,
  addMonthlyTransaction,
  deleteTransaction,
  setPreviousMonth,
  setNextMonth,
} from './accountbook';

describe('accountbook reducer', () => {
  context('without state', () => {
    const today = new Date();
    const initialState = {
      ...mockInitState,
      year: today.getFullYear(),
      month: today.getMonth() + 1,
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

    const state = reducer(initialState, changeBudget({ value: '1000' }));

    expect(state.budget).toBe('1,000');
  });

  it('listens setTargetId action', () => {
    const initialState = {
      targetId: null,
    };

    const state = reducer(initialState, setTargetId({ id: 101 }));

    expect(state.targetId).toBe(101);
  });

  it('listens clearTargetId action', () => {
    const initialState = {
      targetId: 101,
    };

    const state = reducer(initialState, clearTargetId());

    expect(state.targetId).toBe(null);
  });

  it('listens selectType action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState, selectType('수입'));

    expect(state.selectedType).toBe('수입');
  });

  it('listens selectCategory action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState, selectCategory('식비'));

    expect(state.selectedCategory).toBe('식비');
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

  describe('change BreakdownFields action', () => {
    const initialState = {
      ...mockInitState,
    };

    it('changes a field of breakdown', () => {
      const state = reducer(
        initialState,
        changeBreakdownFields({ value: '1000' }),
      );

      expect(state.transaction.transactionFields.breakdown).toBe('1,000');
    });
  });

  describe('change TransactionFields action', () => {
    const initialState = {
      ...mockInitState,
    };

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

  it('listens clearTransactionFields action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState, clearTransactionFields());

    expect(state.transaction.transactionFields.breakdown).toBe('');
    expect(state.transaction.transactionFields.source).toBe('');
    expect(state.transaction.transactionFields.memo).toBe('');
  });

  it('listens setDailyData action', () => {
    const initialState = {
      dailyData: {
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
      },
    };

    const state = reducer(initialState, setDailyData({ date: 2, day: 5 }));

    expect(state.dailyData.date).toBe(2);
    expect(state.dailyData.day).toBe(5);
  });

  it('listens setTransaction action', () => {
    const initialState = {
      ...mockInitState,
    };

    const state = reducer(initialState,
      setTransaction({
        transaction: {
          type: '지출',
          category: { value: '카페' },
          transactionFields: {
            breakdown: '1,000',
            source: '스타벅스',
            memo: '혼자',
          },
        },
      }));

    expect(state.transaction.type).toBe('지출');
  });

  it('listens setDailyTransaction action', () => {
    const dailyTransaction = DAILY_TRANSACTION;
    const initialState = {
      dailyTransaction: [],
    };

    const state = reducer(initialState, setDailyTransaction({ dailyTransaction }));

    expect(state.dailyTransaction).toEqual(DAILY_TRANSACTION);
  });

  it('listens setMonthlyTransaction action', () => {
    const monthlyTransaction = MONTHLY_TRANSACTION;
    const initialState = {
      monthlyTransaction: [],
    };

    const state = reducer(initialState, setMonthlyTransaction({ monthlyTransaction }));

    expect(state.monthlyTransaction).toEqual(MONTHLY_TRANSACTION);
  });

  describe('listens addMonthlyTransaction action', () => {
    context('without dailyTransaction', () => {
      it('add monthlyTransaction', () => {
        const initialState = {
          ...mockInitState,
        };

        const state = reducer(initialState,
          addMonthlyTransaction({ transaction: mockIncomeTransaction }));

        expect(state.monthlyTransaction).toHaveLength(1);
      });
    });

    context('with dailyTransaction', () => {
      it('add transctionHistories when equal dailyData', () => {
        const initialState = {
          ...mockInitState,
          monthlyTransaction: [{
            ...mockDailyData,
            transactionHistories: [mockExpenseTransaction],
          }],
        };

        const state = reducer(initialState,
          addMonthlyTransaction({ transaction: mockIncomeTransaction }));

        expect(state.monthlyTransaction[0].transactionHistories).toHaveLength(2);
      });

      it('add dailyTransaction when not equal dailyData', () => {
        const initialState = {
          ...mockInitState,
          monthlyTransaction: [{
            year: 2021,
            month: 8,
            date: 13,
            day: 4,
            transactionHistories: [mockExpenseTransaction],
          }],
        };

        const state = reducer(initialState,
          addMonthlyTransaction({ transaction: mockIncomeTransaction }));

        expect(state.monthlyTransaction).toHaveLength(2);
      });
    });
  });

  describe('listens deleteTransaction action', () => {
    context('without Transaction id', () => {
      it('no changes', () => {
        const initialState = {
          ...mockInitState,
          monthlyTransaction: [
            {
              year: 2021,
              month: 7,
              date: 1,
              day: 4,
              transactionHistories: [],
            },
          ],
        };

        const state = reducer(initialState, deleteTransaction({ id: undefined }));

        expect(state.monthlyTransaction).toHaveLength(1);
      });
    });

    context('with Transaction id', () => {
      it('deletes target Transaction', () => {
        const initialState = {
          ...mockInitState,
          monthlyTransaction: [
            {
              year: 2021,
              month: 7,
              date: 1,
              day: 4,
              transactionHistories: [
                {
                  id: 1,
                  ...mockExpenseTransaction,
                },
                {
                  id: 2,
                  ...mockExpenseTransaction,
                },
              ],
            },
          ],
        };

        const state = reducer(initialState, deleteTransaction({ id: 1 }));

        expect(state.monthlyTransaction[0].transactionHistories).toHaveLength(1);
      });
    });
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
});
