import { render } from '@testing-library/react';

import Transaction from './Transaction';

import TRANSACTION_HISTORIES from '../../../fixtures/transaction-histories';

/**
 * [ 테스트 코드 커버리지 100% 미달성 ]
 * 1. Uncovered Line #34
 *   - 거래내역 타입이 수입일 경우 CSS에 대한 테스트 코드 미작성
 *   - 거래내역 타입이 지출일 경우 CSS에 대한 테스트 코드 미작성
 * 2. Uncovered Line #56,62
 *   - 폰트어썸 아이콘으로 작성된 수정 및 삭제에 대한 이벤트 핸들러에 대한 테스트 코드 미작성
 */

describe('Transaction', () => {
  const handleClickEdit = jest.fn();
  const handleClickDelete = jest.fn();

  function renderTransaction(histories = {}) {
    return render((
      <Transaction
        histories={histories}
        onClickEdit={handleClickEdit}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('일간 거래내역이 없을 경우', () => {
    it('화면에 거래내역 폼이 그려지지 않는다.', () => {
      const histories = {
        year: 2021,
        month: 10,
        date: 11,
        day: 1,
        totalExpense: '0.0',
        totalIncome: '0.0',
        transactionHistories: [],
      };

      const { queryByText } = renderTransaction(histories);

      expect(queryByText('지출')).toBeNull();
      expect(queryByText('식비')).toBeNull();
      expect(queryByText('1,000')).toBeNull();
    });
  });

  context('일간 거래내역이 있을 경우', () => {
    it('화면에 거래내역 폼을 그려낸다.', () => {
      const histories = TRANSACTION_HISTORIES;

      const { container } = renderTransaction(histories);

      expect(container).toHaveTextContent('지출');
      expect(container).toHaveTextContent('식비');
      expect(container).toHaveTextContent('- 1,000 원');
      expect(container).toHaveTextContent('과자 / 마트');
    });
  });
});
