import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import TransactionModal from './TransactionModal';

import mockInitState from '../../fixtures/mockInitState';

jest.mock('react-redux');

describe('TransactionModal', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
    }));
  });

  const handleOpenModal = jest.fn();
  const monthlyTransaction = [];
  const dailyData = {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
  };

  function renderTransactionModal() {
    return render((
      <TransactionModal
        monthlyTransaction={monthlyTransaction}
        dailyData={dailyData}
        onClick={handleOpenModal}
      />
    ));
  }

  it('renders transaction modal', () => {
    const { container } = renderTransactionModal();

    expect(container).toHaveTextContent('1일');
    expect(container).toHaveTextContent('X');
    expect(container).toHaveTextContent('내역추가');
  });

  it('litens "X" button click event', () => {
    const onClick = jest.fn();

    const { getByText } = renderTransactionModal();

    fireEvent.click(getByText('X'));

    expect(onClick).not.toBeFalsy();
  });

  it('listens "내역추가" button click event', () => {
    const { getByText } = renderTransactionModal();

    const onClick = jest.fn();

    fireEvent.click(getByText('내역추가'));

    expect(onClick).not.toBeFalsy();
  });
});
