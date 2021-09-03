import { render } from '@testing-library/react';

import DailyTransaction from './DailyTransaction';

import mockDailyData from '../../../fixtures/mockDailyData';
import mockExpenseTransaction from '../../../fixtures/mockExpenseTransaction';
import mockIncomeTransaction from '../../../fixtures/mockIncomeTransaction';

describe('DailyTransaction', () => {
  const handleClickEdit = jest.fn();
  const handleClickDelete = jest.fn();

  function renderDailyTransaction(monthlyTransaction = [], dailyData = mockDailyData) {
    return render((
      <DailyTransaction
        monthlyTransaction={monthlyTransaction}
        dailyData={dailyData}
        onClickEdit={handleClickEdit}
        onClickDelete={handleClickDelete}
      />
    ));
  }

  context('without transaction when daily data equal click date', () => {
    it('renders nothing', () => {
      const { queryByText } = renderDailyTransaction();

      expect(queryByText('지출')).toBeNull();
      expect(queryByText('식비')).toBeNull();
      expect(queryByText('1,000')).toBeNull();
      expect(queryByText('마트')).toBeNull();
    });
  });

  context('with transaction when daily data equal click date', () => {
    it('renders daily transaction and daily transaction data', () => {
      const monthlyTransaction = [{
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        totalExpense: '1,000',
        totalIncome: '1,000',
        transactionHistories: [mockExpenseTransaction, mockIncomeTransaction],
      }];

      const { container } = renderDailyTransaction(monthlyTransaction);

      expect(container).toHaveTextContent('지출');
      expect(container).toHaveTextContent('수입');
      expect(container).toHaveTextContent('마트');
      expect(container).toHaveTextContent('심부름');
      expect(container).toHaveTextContent('총 2 건');
      expect(container).toHaveTextContent('- 1,000 원');
      expect(container).toHaveTextContent('+ 1,000 원');
    });
  });
});
