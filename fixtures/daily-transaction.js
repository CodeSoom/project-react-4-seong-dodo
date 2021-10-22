const dailyTransaction = [
  {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
    totalExpense: '1000.0',
    totalIncome: '0.0',
    transactionHistories: [
      {
        id: 1,
        transactionDateTime: '2021-07-01',
        type: '지출',
        category: { value: '식비' },
        transactionFields: {
          breakdown: '1000.0',
          source: '과자',
          memo: '마트',
        },
      },
    ],
  },
];

export default dailyTransaction;
