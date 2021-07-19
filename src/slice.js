import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    budget: 0,
    year: 2021,
    month: 7,
    selectedType: null,
    transaction: {
      type: '',
      category: '',
      transactionFields: {
        breakdown: 0,
        source: '',
        memo: '',
      },
    },
    dailyTransaction: {
      year: 2021,
      month: 7,
      date: 1,
      day: 4,
      transactionHistory: [],
    },
  },
  reducers: {
    changeBudget(state, { payload: { value } }) {
      return {
        ...state,
        budget: value,
      };
    },
    selectType(state, { payload: name }) {
      return {
        ...state,
        selectedType: name,
      };
    },
    changeTransactionFields(state, { payload: { name, value } }) {
      const newTransaction = {
        ...state.Transaction,
        transactionFields: {
          ...state.transactionFields,
          [name]: value,
        },
      };
      return {
        ...state,
        transaction: newTransaction,
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
  selectType,
  changeTransactionFields,
  setPreviousMonth,
  setNextMonth,
  setDailyTransaction,
} = actions;

export default reducer;
