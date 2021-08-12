import { render } from '@testing-library/react';

import Transaction from './Transaction';

import mockDailyData from '../../fixtures/mockDailyData';
import mockExpenseTransaction from '../../fixtures/mockExpenseTransaction';
import mockIncomeTransaction from '../../fixtures/mockIncomeTransaction copy';

describe('Transaction', () => {
  function renderTransaction(monthlyTransaction = [], dailyData = mockDailyData) {
    return render((
      <Transaction
        monthlyTransaction={monthlyTransaction}
        dailyData={dailyData}
      />
    ));
  }

  context('without monthlyTransaction', () => {
    it('renders nothing', () => {
      const { queryByText } = renderTransaction();

      expect(queryByText('지출')).toBeNull();
      expect(queryByText('식비')).toBeNull();
      expect(queryByText(1000)).toBeNull();
      expect(queryByText('마트')).toBeNull();
    });
  });

  context('with monthlyTransaction', () => {
    const dailyData = {
      year: 2021,
      month: 7,
      date: 1,
      day: 4,
    };

    it('renders transaction', () => {
      const monthlyTransaction = [{
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistories: [mockExpenseTransaction, mockIncomeTransaction],
      }];

      const { container } = renderTransaction(monthlyTransaction, dailyData);

      expect(container).toHaveTextContent('지출');
      expect(container).toHaveTextContent('수입');
      expect(container).toHaveTextContent('식비');
      expect(container).toHaveTextContent('용돈');
      expect(container).toHaveTextContent('마트');
      expect(container).toHaveTextContent('심부름');
    });

    it('renders "-" when "지출" type', () => {
      const monthlyExpenseTransaction = [{
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistories: [mockExpenseTransaction],
      }];

      const { container } = renderTransaction(monthlyExpenseTransaction, dailyData);

      expect(container).toHaveTextContent('-');
    });

    it('renders "+" when "수입" type', () => {
      const monthlyIncomeTransaction = [{
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistories: [mockIncomeTransaction],
      }];

      const { container } = renderTransaction(monthlyIncomeTransaction, dailyData);

      expect(container).toHaveTextContent('+');
    });
  });
});
