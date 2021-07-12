import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    budget: '',
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
  },
  reducers: {
    changeBudget(state, { payload: { value } }) {
      return {
        ...state,
        budget: value,
      };
    },
    setPreviousMonth(state, { payload: { month } }) {
      if (month === 1) {
        return {
          ...state,
          year: state.year - 1,
          month: state.month + 11,
        };
      }
      return {
        ...state,
        month: state.month - 1,
      };
    },
    setNextMonth(state, { payload: { month } }) {
      if (month === 12) {
        return {
          ...state,
          year: state.year + 1,
          month: state.month - 11,
        };
      }
      return {
        ...state,
        month: state.month + 1,
      };
    },
    setDailyTransaction(state, { payload: { date, day } }) {
      const newDailyTransaction = { ...state.dailyTransaction, date, day };
      return {
        ...state,
        dailyTransaction: newDailyTransaction,
      };
    },
  },
});

export const {
  changeBudget,
  setPreviousMonth,
  setNextMonth,
  setDailyTransaction,
} = actions;

export default reducer;
