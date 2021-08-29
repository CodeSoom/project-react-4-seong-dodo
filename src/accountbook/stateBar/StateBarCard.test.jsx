import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import StateBarCard from './StateBarCard';

jest.mock('react-redux');

describe('StateBarCard', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      accountbook: {
        year: 2021,
        month: 7,
        monthlyTransaction: [],
      },
    }));
  });

  it('listens click event and move the previous month', () => {
    const { getByText } = render(<StateBarCard />);

    fireEvent.click(getByText('<'));

    expect(dispatch).toBeCalled();
  });

  it('listens click event and move the next month', () => {
    const { getByText } = render(<StateBarCard />);

    fireEvent.click(getByText('>'));

    expect(dispatch).toBeCalled();
  });

  describe('renders conditional statement', () => {
    it('when month > 0', () => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          year: 2021,
          month: 0,
          monthlyTransaction: [],
        },
      }));

      const { queryByText } = render(<StateBarCard />);

      fireEvent.click(queryByText('<'));

      expect(dispatch).not.toBeCalled();
    });

    it('when month < 13', () => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          year: 2021,
          month: 13,
          monthlyTransaction: [],
        },
      }));

      const { queryByText } = render(<StateBarCard />);

      fireEvent.click(queryByText('>'));

      expect(dispatch).not.toBeCalled();
    });
  });
});
