import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import DailyTransactionContainer from './DailyTransactionContainer';

import mockInitState from '../../fixtures/mockInitState';

jest.mock('react-redux');

describe('DailyTransactionContainer', () => {
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

  function renderDailyTransactionContainer() {
    return render((
      <DailyTransactionContainer
        monthlyTransaction={monthlyTransaction}
        dailyData={dailyData}
        onClick={handleOpenModal}
      />
    ));
  }

  it('renders daily transaction modal', () => {
    const { container } = renderDailyTransactionContainer();

    expect(container).toHaveTextContent('1일');
    expect(container).toHaveTextContent('X');
    expect(container).toHaveTextContent('내역추가');
  });

  it('litens "X" button click event', () => {
    const onClick = jest.fn();

    const { getByText } = renderDailyTransactionContainer();

    fireEvent.click(getByText('X'));

    expect(onClick).not.toBeFalsy();
  });

  it('listens "내역추가" button click event', () => {
    const { getByText } = renderDailyTransactionContainer();

    const onClick = jest.fn();

    fireEvent.click(getByText('내역추가'));

    expect(onClick).not.toBeFalsy();
  });
});
