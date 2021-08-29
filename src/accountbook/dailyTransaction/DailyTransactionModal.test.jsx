import { render, fireEvent } from '@testing-library/react';

import DailyTransactionModal from './DailyTransactionModal';

describe('DailyTransactionModal', () => {
  const handleOpenModal = jest.fn();
  const monthlyTransaction = [];
  const dailyData = {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
  };

  function renderDailyTransactionModal() {
    return render((
      <DailyTransactionModal
        dailyData={dailyData}
        monthlyTransaction={monthlyTransaction}
        onClick={handleOpenModal}
      />
    ));
  }

  it('renders daily transaction modal', () => {
    const { container } = renderDailyTransactionModal();

    expect(container).toHaveTextContent('1일');
    expect(container).toHaveTextContent('X');
    expect(container).toHaveTextContent('내역추가');
  });

  it('litens "X" button click event', () => {
    const onClick = jest.fn();

    const { getByText } = renderDailyTransactionModal();

    fireEvent.click(getByText('X'));

    expect(onClick).not.toBeFalsy();
  });
});
