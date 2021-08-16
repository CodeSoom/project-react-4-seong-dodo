import { render, fireEvent } from '@testing-library/react';

import CalendarMonth from './CalendarMonth';

describe('CalendarMonth', () => {
  const handleClick = jest.fn();
  const year = 2021;
  const month = 7;
  const monthlyTransaction = [];

  function renderCalendarMonth() {
    return render((
      <CalendarMonth
        year={year}
        month={month}
        monthlyTransaction={monthlyTransaction}
        onClick={handleClick}
      />
    ));
  }

  it('renders calendar date', () => {
    const { queryByText } = renderCalendarMonth();

    expect(queryByText(1)).not.toBeNull();
  });

  it('listens click event', () => {
    const { queryByText } = renderCalendarMonth(1);

    fireEvent.click(queryByText(1));

    expect(handleClick).toBeCalled();
  });
});
