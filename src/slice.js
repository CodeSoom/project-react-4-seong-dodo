import { createSlice } from '@reduxjs/toolkit';

const today = new Date();
const initialTransactionFields = {
  breakdown: 0,
  source: '',
  memo: '',
};

const { actions, reducer } = createSlice({
  name: 'application',
  initialState: {
    budget: 0,
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    dailyData: {
      year: 2021,
      month: 7,
      date: 1,
      day: 4,
    },
    monthlyTransaction: [],
    selectedType: '지출',
    transaction: {
      type: '지출',
      category: '',
      transactionFields: {
        ...initialTransactionFields,
      },
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
          breakdown: parseInt(value, 10),
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
      return {
        ...state,
        transaction,
      };
    },
    setMonthlyTransaction(state, { payload: { transaction } }) {
      const { monthlyTransaction, dailyData } = state;
      const { year, month, date } = dailyData;
      const newMonthlyTransaction = [...monthlyTransaction];
      const newTransaction = {
        ...dailyData,
        transactionHistories: [transaction],
      };

      const targetTransaction = newMonthlyTransaction
        .find((transactionData) => transactionData.year === year
      && transactionData.month === month
      && transactionData.date === date);
      // (targetTransaction !== undefined): 같은 날짜인 정보가 있다
      // 리액트는 기존 데이터 수정은 안되고 새로 만들 수 있으니깐 기존 내용이랑 새로운 내용을 합체
      if (targetTransaction !== undefined) {
        newTransaction.transactionHistories = [
          // 이미 안에 있는 히스토리
          ...targetTransaction.transactionHistories,
          // 새로 만들어서 넣을 히스토리
          ...newTransaction.transactionHistories,
        ];
      }
      // 중복 데이터 발생한 것을 삭제해야한다
      const targetIndex = newMonthlyTransaction
        .findIndex((transactionData) => transactionData.year === year
      && transactionData.month === month
      && transactionData.date === date);
      // (targetIndex > -1): 인덱스가 존재한다
      // 중복 데이터를 삭제해준다
      if (targetIndex > -1) {
        newMonthlyTransaction.splice(targetIndex, 1);
      }

      return {
        ...state,
        monthlyTransaction: [...newMonthlyTransaction, newTransaction],
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
  selectType,
  changeTransactionType,
  changeTransactionCategory,
  changeBreakdownFields,
  changeTransactionFields,
  clearTransactionFields,
  setDailyData,
  setTransaction,
  setMonthlyTransaction,
  setPreviousMonth,
  setNextMonth,
} = actions;

export default reducer;
