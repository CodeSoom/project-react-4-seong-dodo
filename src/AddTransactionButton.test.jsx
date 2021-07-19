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

  it('listens click event', () => {
    const { getByText } = render(<AddTransactionButton />);

    const onClick = jest.fn();

    fireEvent.click(getByText('내역추가'));

    expect(onClick).not.toBeFalsy();
  });
});
