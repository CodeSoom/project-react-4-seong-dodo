const mockInitState = {
  budget: '',
  year: 2021,
  month: 7,
  dailyData: {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
  },
  targetId: null,
  dailyTransaction: [],
  monthlyTransaction: [],
  selectedType: '지출',
  selectedCategory: { value: '미분류' },
  transaction: {
    type: '지출',
    category: { value: '미분류' },
    transactionFields: {
      breakdown: '',
      source: '',
      memo: '',
    },
  },
};

export default mockInitState;
