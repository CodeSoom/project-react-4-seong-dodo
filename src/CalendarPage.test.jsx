import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CalendarPage from './CalendarPage';

jest.mock('react-redux');

describe('CalendarPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      year: 2021,
      month: 7,
      dailyTransaction: {
        year: 2021,
        month: 7,
        date: 1,
        day: 4,
        transactionHistory: [
          { type: '수입', breakdown: 10000 },
          { type: '지출', breakdown: 20000 },
        ],
      },
    }));
  });

  function renderCalendarPage() {
    return render(
      <MemoryRouter>
        <CalendarPage />
      </MemoryRouter>,
    );
  }

  it('renders state bar card', () => {
    const { container } = renderCalendarPage();

    expect(container).toHaveTextContent('7월');
    expect(container).toHaveTextContent('수입');
    expect(container).toHaveTextContent('지출');
  });

  it('renders calendar container', () => {
    const { container } = renderCalendarPage();

    expect(container).toHaveTextContent('목');
    expect(container).toHaveTextContent(7);
  });

  it('renders tab bar card', () => {
    const { container } = renderCalendarPage();

    expect(container).toHaveTextContent('예산');
    expect(container).toHaveTextContent('홈');
    expect(container).toHaveTextContent('달력');
  });
});
