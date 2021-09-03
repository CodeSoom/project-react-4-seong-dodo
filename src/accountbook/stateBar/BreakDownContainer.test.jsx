import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import BreakDownContainer from './BreakDownContainer';

import mockExpenseTransaction from '../../../fixtures/mockExpenseTransaction';

jest.mock('react-redux');

describe('BreakDownContainer', () => {
  context('without monthlyTransaction', () => {
    beforeEach(() => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          year: 2021,
          month: 8,
          monthlyTransaction: [],
        },
      }));
    });

    it('renders breakDown container', () => {
      const { container } = render(<BreakDownContainer />);

      expect(container).toHaveTextContent('수입');
      expect(container).toHaveTextContent('지출');
      expect(container).toHaveTextContent('원');
    });
  });

  context('with monthlyTransaction', () => {
    it('renders breakDown container', () => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          year: 2021,
          month: 8,
          monthlyTransaction: [
            {
              year: 2021,
              month: 8,
              date: 13,
              day: 4,
              totalExpense: '1,000',
              totalIncome: '',
              transactionHistories: [{ transaction: mockExpenseTransaction }],
            },
            {
              year: 2021,
              month: 7,
              date: 1,
              day: 4,
              totalExpense: '1,000',
              totalIncome: '',
              transactionHistories: [{ transaction: mockExpenseTransaction }],
            },
          ],
        },
      }));

      const { container } = render(<BreakDownContainer />);

      expect(container).toHaveTextContent('수입');
      expect(container).toHaveTextContent('지출');
      expect(container).toHaveTextContent('1,000 원');
    });
  });
});
