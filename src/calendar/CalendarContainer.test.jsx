import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CalendarContainer from './CalendarContainer';

import {
  setDailyTransaction,
} from '../slice';

import mockInitState from '../../fixtures/mockInitState';

jest.mock('react-redux');

describe('CalendarContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      ...mockInitState,
    }));
  });

  function renderCalendarContainer() {
    return render((
      <CalendarContainer />
    ));
  }

  it('renders calendar days', () => {
    const { container } = renderCalendarContainer();

    expect(container).toHaveTextContent('일');
  });

  describe('CalendarMonth', () => {
    it('renders calendar date', () => {
      const { container } = renderCalendarContainer();

      expect(container).toHaveTextContent(1);
    });

    it('listens click event and renders transaction modal', () => {
      const { container, getByText } = renderCalendarContainer();

      fireEvent.click(getByText(1));

      expect(dispatch).toBeCalledWith(setDailyTransaction({ date: 1, day: 4 }));
      expect(container).toHaveTextContent('내역추가');
    });
  });
});
