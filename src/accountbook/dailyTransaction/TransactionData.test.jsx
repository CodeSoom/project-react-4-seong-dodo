import { render } from '@testing-library/react';

import TransactionData from './TransactionData';

import TRANSACTION_HISTORIES from '../../../fixtures/transaction-histories';

describe('TransactionData', () => {
  function renderTransactionData(histories = {}) {
    return render((
      <TransactionData
        histories={histories}
      />
    ));
  }

  context('일간 거래내역이 없을 경우', () => {
    it('일간 거래내역에 대한 총 건수 및 총 수입, 지출 금액이 화면 폼이 그려진다.', () => {
      const histories = {
        year: 2021,
        month: 10,
        date: 11,
        day: 1,
        totalExpense: '0.0',
        totalIncome: '0.0',
        transactionHistories: [],
      };

      const { queryByText } = renderTransactionData(histories);

      expect(queryByText('총 0 건')).not.toBeNull();
      expect(queryByText('- 0 원')).not.toBeNull();
      expect(queryByText('+ 0 원')).not.toBeNull();
    });
  });

  context('일간 거래내역이 있을 경우', () => {
    it('일간 거래내역에 대한 총 건수 및 총 수입, 지출 금액이 화면 폼이 그려진다.', () => {
      const histories = TRANSACTION_HISTORIES;

      const { container } = renderTransactionData(histories);

      expect(container).toHaveTextContent('총 1 건');
      expect(container).toHaveTextContent('- 1,000 원');
      expect(container).toHaveTextContent('+ 0 원');
    });
  });
});
