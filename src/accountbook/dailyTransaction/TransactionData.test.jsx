import { render } from '@testing-library/react';

import TransactionData from './TransactionData';

import mockExpenseTransaction from '../../../fixtures/mockExpenseTransaction';
import mockIncomeTransaction from '../../../fixtures/mockIncomeTransaction';
import mockDailyData from '../../../fixtures/mockDailyData';

describe('TransactionData', () => {
  function renderTransactionData(histories = undefined) {
    return render((
      <TransactionData
        histories={histories}
      />
    ));
  }

  context('without histories', () => {
    it('renders nothing', () => {
      const { queryByText } = renderTransactionData();

      expect(queryByText('총 1 건')).toBeNull();
      expect(queryByText('- 1,000 원')).toBeNull();
      expect(queryByText('+ 1,000 원')).toBeNull();
    });
  });

  context('with histories', () => {
    describe('renders transaction data with "지출" and "수입" type', () => {
      const histories = {
        dailyData: mockDailyData,
        totalExpense: '1000.0',
        totalIncome: '1000.0',
        transactionHistories: [mockExpenseTransaction, mockIncomeTransaction],
      };

      it('renders transaction data', () => {
        const { container } = renderTransactionData(histories);

        expect(container).toHaveTextContent('총 2 건');
        expect(container).toHaveTextContent('- 1,000 원');
        expect(container).toHaveTextContent('+ 1,000 원');
      });
    });

    it('when with only "지출" type data', () => {
      const histories = {
        dailyData: mockDailyData,
        totalExpense: '1000.0',
        totalIncome: '',
        transactionHistories: [mockExpenseTransaction],
      };

      const { container } = renderTransactionData(histories);

      expect(container).toHaveTextContent('총 1 건');
      expect(container).toHaveTextContent('- 1,000 원');
    });

    it('when with only "수입" type data', () => {
      const histories = {
        dailyData: mockDailyData,
        totalExpense: '',
        totalIncome: '1000.0',
        transactionHistories: [mockIncomeTransaction],
      };

      const { container } = renderTransactionData(histories);

      expect(container).toHaveTextContent('총 1 건');
      expect(container).toHaveTextContent('+ 1,000 원');
    });
  });
});
