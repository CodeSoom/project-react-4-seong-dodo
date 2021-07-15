import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import AddTransactionButton from './AddTransactionButton';

jest.mock('react-redux');

describe('AddTransactionButton', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      budget: '',
      year: 2021,
      month: 7,
      transactionFields: {
        breakdown: '',
        source: '',
        memo: '',
      },
      dailyTransaction: {
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistory: [
          { type: '수입', breakdown: 10000 },
          { type: '지출', breakdown: 20000 },
        ],
      },
    }));
  });

  it('listens click event', () => {
    const { getByText } = render(<AddTransactionButton />);

    const onClick = jest.fn();

    fireEvent.click(getByText('내역추가'));

    expect(onClick).not.toBeFalsy();
  });
});
