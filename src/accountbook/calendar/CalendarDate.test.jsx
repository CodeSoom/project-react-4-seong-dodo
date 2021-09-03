import { fireEvent, render } from '@testing-library/react';

import CalendarDate from './CalendarDate';

describe('CalendarDate', () => {
  const handleClick = jest.fn();
  const currentMonth = 7;
  const year = 2021;
  const month = 7;
  const date = 1;
  const day = 4;

  function renderCalendarDate(monthlyTransaction = []) {
    return render((
      <CalendarDate
        currentMonth={currentMonth}
        year={year}
        month={month}
        date={date}
        day={day}
        monthlyTransaction={monthlyTransaction}
        onClick={handleClick}
      />
    ));
  }

  it('renders calendar date', () => {
    const { queryByText } = renderCalendarDate();

    expect(queryByText(1)).not.toBeNull();
  });

  it('listens click event', () => {
    const { queryByText } = renderCalendarDate();

    fireEvent.click(queryByText(1));

    expect(handleClick).toBeCalled();
  });

  context('without date data', () => {
    it('renders notiong', () => {
      const monthlyTransaction = [
        { histories: undefined },
      ];
      const { queryByText } = renderCalendarDate(monthlyTransaction);

      expect(queryByText('- 1,000 원')).toBeNull();
      expect(queryByText('+ 1,000 원')).toBeNull();
    });
  });
});
