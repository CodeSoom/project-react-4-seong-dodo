const dailyTransaction = [
  {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
    totalExpense: '1,000',
    totalIncome: '',
    transactionHistories: [
      {
        type: '지출',
        category: { value: '식비' },
        transactionFields: {
          breakdown: '1,000',
          source: '과자',
          memo: '마트',
        },
      },
    ],
  },
];

export default dailyTransaction;
