import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CalendarContainer from './CalendarContainer';

import mockInitState from '../../../fixtures/mockInitState';

import MONTHLY_TRANSACTION from '../../../fixtures/monthly-transaction';

jest.mock('react-redux');

describe('CalendarContainer', () => {
  global.alert = jest.fn();

  const dispatch = jest.fn();

  beforeEach(() => {
    global.alert.mockClear();

    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: given.accessToken,
      },
      accountbook: {
        ...mockInitState,
        monthlyTransaction: given.monthlyTransaction,
        year: 2021,
        month: 7,
      },
    }));
  });

  function renderCalendarContainer() {
    return render((
      <CalendarContainer />
    ));
  }

  context('with loggeg-out', () => {
    given('accessToken', () => undefined);
    given('monthlyTransaction', () => []);

    it('renders calendar days', () => {
      const { container } = renderCalendarContainer();

      expect(container).toHaveTextContent('일');
    });

    describe('CalendarMonth', () => {
      it('renders calendar date', () => {
        const { container } = renderCalendarContainer();

        expect(container).toHaveTextContent(1);
      });

      it('listens click event and renders alert', () => {
        const { getByText } = renderCalendarContainer();

        fireEvent.click(getByText(1));

        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith('로그인이 필요한 서비스 입니다.');
      });
    });
  });

  context('with logged-in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');
    given('monthlyTransaction', () => MONTHLY_TRANSACTION);
  });
});
