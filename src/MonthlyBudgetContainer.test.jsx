import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MonthlyBudgetContainer from './MonthlyBudgetContainer';

jest.mock('react-redux');

describe('MonthlyBudgetContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({

    }));
  });

  it('renders "MonthlyBudgetContainer"', () => {
    render(<MonthlyBudgetContainer />);
  });
});
