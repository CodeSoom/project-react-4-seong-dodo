import { render } from '@testing-library/react';

import Transaction from './Transaction';

describe('Transaction', () => {
  const dailyTransaction = {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
    transactionHistory: [
      {
        type: '수입',
        category: { value: '급여' },
        transactionFields: {
          breakdown: 10000,
          source: '회사',
          memo: '8월',
        },
      },
    ],
  };

  function renderTransaction() {
    return render((
      <Transaction
        dailyTransaction={dailyTransaction}
      />
    ));
  }

  it('renders transaction', () => {
    const { container } = renderTransaction();

    expect(container).toHaveTextContent('수입');
    expect(container).toHaveTextContent('급여');
    expect(container).toHaveTextContent('회사');
  });
});
