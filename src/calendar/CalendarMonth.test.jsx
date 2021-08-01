import { render, fireEvent } from '@testing-library/react';

import CalendarMonth from './CalendarMonth';

describe('CalendarMonth', () => {
  const handleClick = jest.fn();
  const month = 7;
  const year = 2021;

  function renderCalendarMonth() {
    return render((
      <CalendarMonth
        month={month}
        year={year}
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
