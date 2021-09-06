import { createSlice } from '@reduxjs/toolkit';

import { v4 as uuid } from 'uuid';

import { exchangeRegEX, replaceString } from '../utils/utils';

import {
  fetchDailyTransaction,
  fetchMonthlyTransaction,
  postTransaction,
  putTransaction,
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
    addMonthlyTransaction(state, { payload: { transaction } }) {
      const { monthlyTransaction, dailyData } = state;
      const { year, month, date } = dailyData;
      const newMonthlyTransaction = [...monthlyTransaction];
      const newDailyTransaction = {
        ...dailyData,
        totalExpense: '',
        totalIncome: '',
        transactionHistories: [{
          ...transaction,
          id: uuid(),
        }],
      };

      const targetTransaction = newMonthlyTransaction
        .find((target) => target.year === year
      && target.month === month
      && target.date === date);
      // (targetTransaction !== undefined): 같은 날짜인 정보가 있다
      // 리액트는 기존 데이터 수정은 안되고 새로 만들 수 있으니깐 기존 내용이랑 새로운 내용을 합체
      if (targetTransaction !== undefined) {
        newDailyTransaction.transactionHistories = [
          // 이미 안에 있는 히스토리
          ...targetTransaction.transactionHistories,
          // 새로 만들어서 넣을 히스토리
          ...newDailyTransaction.transactionHistories,
        ];
      }
      // 중복 데이터 발생한 것을 삭제해야한다
      const targetIndex = newMonthlyTransaction
        .findIndex((target) => target.year === year
      && target.month === month
      && target.date === date);
      // (targetIndex > -1): 인덱스가 존재한다
      // 중복 데이터를 삭제해준다
      if (targetIndex > -1) {
        newMonthlyTransaction.splice(targetIndex, 1);
      }

      const getTotal = (transactionType) => {
        const total = newDailyTransaction.transactionHistories
          .filter((history) => history.type === transactionType)
          .reduce((sum, b) => sum + parseInt(replaceString(b.transactionFields.breakdown), 10), 0);

        return exchangeRegEX(total);
      };

      newDailyTransaction.totalExpense = getTotal('지출');
      newDailyTransaction.totalIncome = getTotal('수입');

      return {
        ...state,
        monthlyTransaction: [...newMonthlyTransaction, newDailyTransaction],
      };
    },
    deleteTransaction(state, { payload: { id } }) {
      const { monthlyTransaction, dailyData } = state;
      const { year, month, date } = dailyData;
      const newMonthlyTransaction = [...monthlyTransaction];
      const targetDailyTransaction = newMonthlyTransaction
        .find((target) => target.year === year
      && target.month === month
      && target.date === date);
      const newDailyTransaction = {
        ...targetDailyTransaction,
      };

      const targetTransactionIndex = newDailyTransaction.transactionHistories
        .findIndex((target) => target.id === id);

      const newTransactionHistories = [...newDailyTransaction.transactionHistories];

      newTransactionHistories.splice(targetTransactionIndex, 1);

      newDailyTransaction.transactionHistories = [
        ...newTransactionHistories,
      ];

      const targetIndex = newMonthlyTransaction
        .findIndex((target) => target.year === year
       && target.month === month
       && target.date === date);

      if (targetIndex > -1) {
        newMonthlyTransaction.splice(targetIndex, 1);
      }

      const getTotal = (transactionType) => {
        const total = newDailyTransaction.transactionHistories
          .filter((history) => history.type === transactionType)
          .reduce((sum, b) => sum + parseInt(replaceString(b.transactionFields.breakdown), 10), 0);

        return exchangeRegEX(total);
      };

      newDailyTransaction.totalExpense = getTotal('지출');
      newDailyTransaction.totalIncome = getTotal('수입');

      return {
        ...state,
        monthlyTransaction: [...newMonthlyTransaction, newDailyTransaction],
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
  addMonthlyTransaction,
  deleteTransaction,
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
  };
}

export default reducer;
