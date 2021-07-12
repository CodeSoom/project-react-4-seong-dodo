import { render } from '@testing-library/react';

import TransactionModal from './TransactionModal';

describe('TransactionModal', () => {
  const handleOpenModal = jest.fn();

  const dailyTransaction = {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
    transactionHistory: [
      { type: '수입', breakdown: 10000 },
      { type: '지출', breakdown: 20000 },
    ],
  };

  function renderTransactionModal() {
    return render((
      <TransactionModal
        dailyTransaction={dailyTransaction}
        onClick={handleOpenModal}
      />
    ));
  }

  it('renders transaction modal', () => {
    const { container } = renderTransactionModal();

    expect(container).toHaveTextContent('1일');
    expect(container).toHaveTextContent('내역추가');
  });
});
