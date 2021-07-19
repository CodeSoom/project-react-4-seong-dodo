import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TransactionDetailModal from './TransactionDetailModal';

jest.mock('react-redux');

describe('TransactionDetailModal', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      budget: 0,
      year: 2021,
      month: 7,
      selectedType: null,
      transaction: {
        type: '',
        category: '',
        transactionFields: {
          breakdown: 0,
          source: '',
          memo: '',
        },
      },
      dailyTransaction: {
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistory: [],
      },
    }));
  });

  it('renders transaction modal', () => {
    const { container } = render(
      <TransactionDetailModal />,
    );

    expect(container).toHaveTextContent('거래처');
    expect(container).toHaveTextContent('메모');
  });
});
