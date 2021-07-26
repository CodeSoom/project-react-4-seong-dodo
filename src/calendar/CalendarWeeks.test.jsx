import { fireEvent, render } from '@testing-library/react';

import CalendarWeeks from './CalendarWeeks';

describe('CalendarWeeks', () => {
  const handleClick = jest.fn();

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
        week={week}
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
