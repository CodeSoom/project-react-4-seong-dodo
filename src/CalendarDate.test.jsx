import { fireEvent, render } from '@testing-library/react';

import CalendarDate from './CalendarDate';

describe('CalendarDate', () => {
  const handleClick = jest.fn();
  const date = 1;
  const day = 4;

  function renderCalendarDate() {
    return render((
      <CalendarDate
        date={date}
        day={day}
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
});
