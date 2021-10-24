import { render, fireEvent, act } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import DailyTransactionModal from './DailyTransactionModal';

import ACCESS_TOKEN from '../../../fixtures/access-token';
import DAILY_TRANSACTION from '../../../fixtures/daily-transaction';
import ACCOUNTBOOK_STATE from '../../../fixtures/accountbook-initialState';

jest.mock('react-redux');

describe('DailyTransactionModal', () => {
  const dispatch = jest.fn();
  const handleOpenModal = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);
  });

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
          onClick={handleOpenModal}
        />
      </MemoryRouter>
    ));
  }

  describe('로그인 했을 경우에만 달력의 원하는 날짜를 클릭했을 경우에 거래내역 모달창이 열린다.', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          accessToken: ACCESS_TOKEN,
        },
        accountbook: ACCOUNTBOOK_STATE,
      }));
    });

    it('클릭한 날짜의 모달창 화면을 확인할 수 있다.', () => {
      const { container } = renderDailyTransactionModal();

      expect(container).toHaveTextContent('1일 목요일');
      expect(container).toHaveTextContent('X');
      expect(container).toHaveTextContent('내역추가');
    });

    it('닫기 버튼을 클릭하면 모달창 화면을 닫을 수 있다.', () => {
      const { getByText } = renderDailyTransactionModal();

      fireEvent.click(getByText('X'));

      expect(handleOpenModal).not.toBeFalsy();
    });

    it('내역추가 버튼을 클릭하면 거래내역 입력 모달창 화면이 그려진다.', () => {
      const { getByText, queryAllByLabelText } = renderDailyTransactionModal();

      fireEvent.click(getByText('내역추가'));

      expect(handleOpenModal).not.toBeFalsy();

      expect(getByText('원')).not.toBeNull();
      expect(queryAllByLabelText('분류')).not.toBeNull();
      expect(queryAllByLabelText('카테고리')).not.toBeNull();
      expect(getByText('저장')).not.toBeNull();
    });
  });

  describe('로그인 했을 경우에 사용자의 거래내역이 화면에 리스팅 된다.', () => {
    context('거래내역이 있는 사용자의 경우', () => {
      it('등록한 거래내역이 그려진다.', async () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            accessToken: ACCESS_TOKEN,
          },
          accountbook: {
            dailyTransaction: DAILY_TRANSACTION,
          },
        }));

        await act(async () => {
          const { getByText } = renderDailyTransactionModal();
          expect(getByText('과자 / 마트')).not.toBeNull();
        });
      });
    });

    context('거래내역이 없는 사용자의 경우', () => {
      beforeEach(() => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            accessToken: ACCESS_TOKEN,
          },
          accountbook: ACCOUNTBOOK_STATE,
        }));
      });

      it('거래내역이 그려지지 않는다.', async () => {
        await act(async () => {
          const { queryByText } = renderDailyTransactionModal();
          // getByTest는 없는 태그를 get하려고하면 error가 발생한다.
          // 따라서 없는경우를 테스트하기위해서는 queryByText로 Null을 확인
          expect(queryByText('과자 / 마트')).toBeNull();
        });
      });
    });
  });
});
