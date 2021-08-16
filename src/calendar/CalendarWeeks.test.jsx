import { fireEvent, render } from '@testing-library/react';

import CalendarWeeks from './CalendarWeeks';

describe('CalendarWeeks', () => {
  const handleClick = jest.fn();
  const monthlyTransaction = [];
  const currentMonth = 7;
  const week = [
    {
      year: 2021,
      month: 7,
      date: 1,
      day: 4,
    },
  ];

  function renderCalendarWeeks() {
    return render((
      <CalendarWeeks
        currentMonth={currentMonth}
        week={week}
        monthlyTransaction={monthlyTransaction}
        onClick={handleClick}
      />
    ));
  }

  it('renders calendar weeks', () => {
    const { queryByText } = renderCalendarWeeks();

    expect(queryByText(1)).not.toBeNull();
  });

  it('listens click event', () => {
    const { queryByText } = renderCalendarWeeks();

    fireEvent.click(queryByText(1));

    expect(handleClick).toBeCalled();
  });
});
