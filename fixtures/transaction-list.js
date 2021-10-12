const transactionList = [
  {
    id: 1,
    type: '지출',
    category: {
      value: '술/유흥',
    },
    transactionFields: {
      memo: '',
      source: '커피',
      breakdown: '2000.00',
    },
    transactionDateTime: '2021-10-13',
  },
  {
    id: 2,
    type: '지출',
    category: {
      value: '카페/간식',
    },
    transactionFields: {
      memo: '지출했음 커피 사먹음',
      source: '커피',
      breakdown: '4000.00',
    },
    transactionDateTime: '2021-10-13',
  },
  {
    id: 3,
    type: '수입',
    category: {
      value: '금융수입',
    },
    transactionFields: {
      memo: 'y',
      source: 'f',
      breakdown: '3000000.00',
    },
    transactionDateTime: '2021-10-14',
  },
];

export default transactionList;
