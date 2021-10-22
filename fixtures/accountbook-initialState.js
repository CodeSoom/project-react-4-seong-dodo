const accountbookState = {
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
  nextPage: 0,
  totalPages: 0,
  totalCount: 0,
  transactionHistoryResponseList: [],
  selectedType: null,
  selectedCategory: null,
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

export default accountbookState;
