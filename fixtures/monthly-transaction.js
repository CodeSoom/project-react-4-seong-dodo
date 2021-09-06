const monthlyTransaction = [
  [
    {
      year: 2021,
      month: 7,
      date: 1,
      day: 4,
      totalExpense: '1000.0',
      totalIncome: '',
      transactionHistories: [
        {
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
  ],
  [
    {
      year: 2021,
      month: 7,
      date: 2,
      day: 5,
      totalExpense: '',
      totalIncome: '1,000',
      transactionHistories: [
        {
          type: '수입',
          category: { value: '용돈' },
          transactionFields: {
            breakdown: '1,000',
            source: '용돈',
            memo: '돼지저금통에',
          },
        },
      ],
    },
  ],
];

export default monthlyTransaction;
