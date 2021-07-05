import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import MonthlyBudgetContainer from './MonthlyBudgetContainer';

jest.mock('react-redux');

describe('MonthlyBudgetContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      year: 2021,
      month: 7,
    }));
  });

  it('listens click event and move the previous month', () => {
    const { getByText } = render(<MonthlyBudgetContainer />);

    fireEvent.click(getByText('<'));

    expect(dispatch).toBeCalled();
  });

  it('listens click event and move the next month', () => {
    const { getByText } = render(<MonthlyBudgetContainer />);

    fireEvent.click(getByText('>'));

    expect(dispatch).toBeCalled();
  });

  describe('renders conditional statement', () => {
    it('when 0 month', () => {
      useSelector.mockImplementation((selector) => selector({
        year: 2021,
        month: 0,
      }));
      const { queryByText } = render(<MonthlyBudgetContainer />);

      fireEvent.click(queryByText('<'));

      expect(dispatch).not.toBeCalled();
    });

    it('when 13 month', () => {
      useSelector.mockImplementation((selector) => selector({
        year: 2021,
        month: 13,
      }));
      const { queryByText } = render(<MonthlyBudgetContainer />);

      fireEvent.click(queryByText('>'));

      expect(dispatch).not.toBeCalled();
    });
  });
});
