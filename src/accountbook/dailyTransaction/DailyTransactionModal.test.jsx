import { render, fireEvent } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import DailyTransactionModal from './DailyTransactionModal';

jest.mock('react-redux');

describe('DailyTransactionModal', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: given.accessToken,
      },
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

  function renderDailyTransactionModal() {
    return render((
      <MemoryRouter>
        <DailyTransactionModal
          dailyData={dailyData}
          monthlyTransaction={monthlyTransaction}
          onClick={handleOpenModal}
        />
      </MemoryRouter>
    ));
  }

  context('with loggeg-out', () => {
    given('accessToken', () => undefined);

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

  context('with loggeg-in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');
  });
});
