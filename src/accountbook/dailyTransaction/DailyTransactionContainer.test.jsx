import { render, fireEvent, act } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import DailyTransactionContainer from './DailyTransactionContainer';

import ACCESS_TOKEN from '../../../fixtures/access-token';
import DAILY_TRANSACTION from '../../../fixtures/daily-transaction';
import ACCOUNTBOOK_STATE from '../../../fixtures/accountbook-initialState';

jest.mock('react-redux');

/**
 * 테스트 코드 시나리오
 *  - 로그인 했을 경우 (필수 조건)
 */
describe('DailyTransactionContainer', () => {
  const dispatch = jest.fn();
  const handleClickCloseModal = jest.fn();
  const handleClickOpenDetailModal = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: ACCESS_TOKEN,
      },
      accountbook: ACCOUNTBOOK_STATE,
    }));
  });

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
        onClick={handleClickCloseModal}
      />
    ));
  }

  describe('로그인 했을 경우에만 해당하는 날짜를 클릭했을 때 거래내역 모달창이 보여진다.', () => {
    it('클릭한 해당 날짜의 모달창이 그려진다.', () => {
      const { container } = renderDailyTransactionContainer();

      expect(container).toHaveTextContent('1일 목요일');
    });

    it('모달창을 닫을 수 있는 닫기 버튼이 그려진다.', () => {
      const { getByText } = renderDailyTransactionContainer();

      fireEvent.click(getByText('X'));

      expect(handleClickCloseModal).not.toBeFalsy();
    });

    it('내역추가 버튼을 클릭하면 거래내역을 입력할 수 있는 모달창이 보여진다.', () => {
      const { getByText, queryAllByLabelText } = renderDailyTransactionContainer();

      fireEvent.click(getByText('내역추가'));

      expect(handleClickOpenDetailModal).not.toBeFalsy();

      expect(queryAllByLabelText('분류')).not.toBeNull();
    });
  });

  context('해당 날짜 모달창에 거래내역이 있는 사용자일 경우', () => {
    it('거래내역이 화면에 보여진다.', async () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          accessToken: ACCESS_TOKEN,
        },
        accountbook: {
          dailyTransaction: DAILY_TRANSACTION,
        },
      }));

      await act(async () => {
        const { getByText } = renderDailyTransactionContainer();

        expect(getByText('총 1 건')).not.toBeNull();
        expect(getByText('과자 / 마트')).not.toBeNull();
      });
    });
  });

  context('해당 날짜 모달창에 거래내역이 없는 사용자일 경우', () => {
    it('거래내역이 화면에 보여지지 않는다.', async () => {
      await act(async () => {
        const { queryByText } = renderDailyTransactionContainer();

        expect(queryByText('과자 / 마트')).toBeNull();
      });
    });
  });
});
