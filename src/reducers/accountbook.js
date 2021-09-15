import { createSlice } from '@reduxjs/toolkit';

import { exchangeRegEX, replaceString } from '../utils/utils';

import {
  fetchDailyTransaction,
  fetchMonthlyTransaction,
  postTransaction,
  putTransaction,
  deleteTransaction,
} from '../services/api';

const today = new Date();
const initialTransactionFields = {
  breakdown: '',
  source: '',
  memo: '',
};

const { actions, reducer } = createSlice({
  name: 'accountbook',
  initialState: {
    budget: '',
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    dailyData: {
      year: 2021,
      month: 7,
      date: 1,
      day: 4,
    },
    targetId: null,
    dailyTransaction: [],
    monthlyTransaction: [],
    selectedType: null,
    selectedCategory: null,
    transaction: {
      type: '지출',
      category: { value: '미분류' },
      transactionFields: {
        ...initialTransactionFields,
      },
    },
  },
  reducers: {
    changeBudget(state, { payload: { value } }) {
      return {
        ...state,
        budget: exchangeRegEX(replaceString(value)),
      };
    },
    setTargetId(state, { payload: { id } }) {
      return {
        ...state,
        targetId: id,
      };
    },
    clearTargetId(state) {
      return {
        ...state,
        targetId: null,
      };
    },
    selectType(state, { payload: name }) {
      return {
        ...state,
        selectedType: name,
      };
    },
    selectCategory(state, { payload: name }) {
      return {
        ...state,
        selectedCategory: name,
      };
    },
    changeTransactionType(state, { payload: name }) {
      const selectedType = {
        ...state.transaction,
        type: name,
      };
      return {
        ...state,
        transaction: selectedType,
      };
    },
    changeTransactionCategory(state, { payload: name }) {
      const selectedCategory = {
        ...state.transaction,
        category: name,
      };
      return {
        ...state,
        transaction: selectedCategory,
      };
    },
    changeBreakdownFields(state, { payload: { value } }) {
      const newBreakdown = {
        ...state.transaction,
        transactionFields: {
          ...state.transaction.transactionFields,
          breakdown: exchangeRegEX(value.replace(/,/gi, '')),
        },
      };
      return {
        ...state,
        transaction: newBreakdown,
      };
    },
    changeTransactionFields(state, { payload: { name, value } }) {
      const newTransactionFields = {
        ...state.transaction,
        transactionFields: {
          ...state.transaction.transactionFields,
          [name]: value,
        },
      };
      return {
        ...state,
        transaction: newTransactionFields,
      };
    },
    clearTransactionFields(state) {
      return {
        ...state,
        transaction: {
          ...state.transaction,
          type: state.selectedType,
          category: { value: '미분류' },
          transactionFields: {
            ...initialTransactionFields,
          },
        },
      };
    },
    setDailyData(state, { payload: { date, day } }) {
      const newDailyData = {
        ...state.dailyData,
        year: state.year,
        month: state.month,
        date,
        day,
      };
      return {
        ...state,
        dailyData: newDailyData,
      };
    },
    setTransaction(state, { payload: { transaction } }) {
      const newTransaction = {
        ...state.transaction,
        transactionFields: {
          ...state.transaction.transactionFields,
        },
        transaction,
      };
      return {
        ...state,
        transaction: newTransaction,
      };
    },
    setDailyTransaction(state, { payload: { dailyTransaction } }) {
      return {
        ...state,
        dailyTransaction,
      };
    },
    setMonthlyTransaction(state, { payload: { monthlyTransaction } }) {
      return {
        ...state,
        monthlyTransaction,
      };
    },
    clearMonthlyTransaction(state) {
      return {
        ...state,
        monthlyTransaction: [],
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
  },
});

export const {
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
  clearMonthlyTransaction,
  setPreviousMonth,
  setNextMonth,
} = actions;

export function loadDailyTransaction({
  accessToken, year, month, date,
}) {
  return async (dispatch) => {
    const dailyTransaction = await fetchDailyTransaction({
      accessToken,
      dailyData: {
        year, month, date,
      },
    });

    dispatch(setDailyTransaction({ dailyTransaction }));
  };
}

export function loadMonthlyTransaction({
  accessToken, year, month, date,
}) {
  return async (dispatch) => {
    const monthlyTransaction = await fetchMonthlyTransaction({
      accessToken,
      dailyData: {
        year, month, date,
      },
    });

    dispatch(setMonthlyTransaction({ monthlyTransaction }));
  };
}

export function sendTransaction() {
  return async (dispatch, getState) => {
    const {
      user: { accessToken },
      accountbook: {
        dailyData: { year, month, date },
        transaction: { type, category, transactionFields },
      },
    } = getState();

    await postTransaction({
      accessToken,
      dailyData: { year, month, date },
      transaction: { type, category, transactionFields },
    });

    dispatch(loadDailyTransaction({
      accessToken, year, month, date,
    }));
    dispatch(clearTransactionFields());
  };
}

export function sendEditTransaction({ id }) {
  return async (dispatch, getState) => {
    const {
      user: { accessToken },
      accountbook: {
        dailyData: { year, month, date },
        transaction: {
          type, category, transactionFields,
        },
      },
    } = getState();

    await putTransaction({
      accessToken,
      dailyData: { year, month, date },
      transaction: {
        id, type, category, transactionFields,
      },
    });

    dispatch(loadDailyTransaction({
      accessToken, year, month, date,
    }));
    dispatch(clearTransactionFields());
    dispatch(clearTargetId());
  };
}

export function sendDeleteTransaction({ id }) {
  return async (dispatch, getState) => {
    const {
      user: { accessToken },
      accountbook: {
        dailyData: { year, month, date },
      },
    } = getState();
    await deleteTransaction({ accessToken, id });

    dispatch(loadDailyTransaction({
      accessToken, year, month, date,
    }));
  };
}

export default reducer;
