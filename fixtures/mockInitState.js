const mockInitState = {
  budget: 0,
  year: 2021,
  month: 7,
  dailyData: {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
  },
  targetId: null,
  monthlyTransaction: [],
  selectedType: '지출',
  selectedCategory: { value: '미분류' },
  transaction: {
    type: '지출',
    category: { value: '미분류' },
    transactionFields: {
      breakdown: 0,
      source: '',
      memo: '',
    },
  },
};

export default mockInitState;
