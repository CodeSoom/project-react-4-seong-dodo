import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import DailyTransactionContainer from './DailyTransactionContainer';

import mockInitState from '../../../fixtures/mockInitState';

import DAILY_TRANSACTION from '../../../fixtures/daily-transaction';

jest.mock('react-redux');

describe('DailyTransactionContainer', () => {
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
        dailyTransaction: given.dailyTransaction,
      },
    }));
  });

  const handleOpenModal = jest.fn();
  const dailyData = {
    year: 2021,
    month: 7,
    date: 1,
    day: 4,
  };

  function renderDailyTransactionContainer() {
    return render((
      <DailyTransactionContainer
        dailyData={dailyData}
        onClick={handleOpenModal}
      />
    ));
  }

  context('with loggeg-out', () => {
    given('accessToken', () => undefined);
    given('dailyTransaction', () => []);

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

    describe('내역추가 button', () => {
      it('listens click event', () => {
        const { getByText } = renderDailyTransactionContainer();

        fireEvent.click(getByText('내역추가'));

        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith('로그인이 필요한 서비스 입니다.');
      });
    });
  });

  context('with logged-in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');
    given('dailyTransaction', () => DAILY_TRANSACTION);

    it('사용자의 데이터를 불러온다', () => {
      const { container } = renderDailyTransactionContainer();

      expect(container).toHaveTextContent('지출');
      expect(container).toHaveTextContent('과자');
      expect(container).toHaveTextContent('- 1,000 원');
    });

    describe('내역추가 button', () => {
      it('listens click event', () => {
        const { container, getByText } = renderDailyTransactionContainer();

        const onClick = jest.fn();

        fireEvent.click(getByText('내역추가'));

        expect(onClick).not.toBeFalsy();
        expect(container).toHaveTextContent('분류');
      });
    });
  });
});
