import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import BudgetContainer from './BudgetContainer';

jest.mock('react-redux');

describe('BudgetContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      accountbook: {
        budget: 0,
      },
    }));
  });

  context('with budget', () => {
    it('listens change events', () => {
      const { getByLabelText } = render(<BudgetContainer />);

      fireEvent.change(getByLabelText('한 달 예산'), {
        target: { value: '100' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'accountbook/changeBudget',
        payload: { value: '100' },
      });
    });
  });

  context('without budget', () => {
    it('renders nothiong', () => {
      const { getByLabelText } = render(<BudgetContainer />);

      fireEvent.change(getByLabelText('한 달 예산'), { target: { value: 0 } });

      expect(dispatch).not.toBeCalled();
    });
  });
});
