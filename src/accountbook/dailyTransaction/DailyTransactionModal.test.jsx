import { render, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import DailyTransactionModal from './DailyTransactionModal';

import ACCESS_TOKEN from '../../../fixtures/access-token';
// import DAILY_TRANSACTION from '../../../fixtures/daily-transaction';
import ACCOUNTBOOK_STATE from '../../../fixtures/accountbook-initialState';

jest.mock('react-redux');

/**
 * 테스트 시나리오
 *  (모달창에 보여지는 화면 부분에 대해서만 작성 예정 / 이벤트에 대한 것은 컨테이너 컴포넌트 테스트에서 작성할 예정)
 * 1. 로그인 했을 경우에만 해당됨
 * 2. 클릭한 날짜의 모달창이 열리고 모달창 화면이 그려진다
 *   - 모달창 닫기 버튼이 있고 내역추가 버튼이 있다
 * 3. 내역추가 버튼을 클릭하면 거래내역 입력 모달창이 열린다
 *   - 거래내역을 입력할 수 있는 입력 폼이 그려진다
 *   - 저장 버튼이 그려진다
 *
 * 4. 거래내역
 *  4-1) 거래내역이 있을 경우
 *    - 거래내역에 대한 정보가 그려진다
 *    - 거래내역 폼이 그려진다
 *  4-2) 거래내역이 없을 경우
 *    - 거래내역에 대한 정보가 그려진다
 *    - 거래내역 폼이 그려지지 않는다
 */

describe('DailyTransactionModal', () => {
  const dispatch = jest.fn();
  const handleOpenModal = jest.fn();

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
});
