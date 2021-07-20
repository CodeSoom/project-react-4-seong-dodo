const mockInitState = {
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
};

export default mockInitState;
