import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CalendarContainer from './CalendarContainer';

import {
  setDailyData,
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
      year: 2021,
      month: 7,
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

      expect(dispatch).toBeCalledWith(setDailyData({ date: 1, day: 4 }));
      expect(container).toHaveTextContent('내역추가');
    });
  });
});
