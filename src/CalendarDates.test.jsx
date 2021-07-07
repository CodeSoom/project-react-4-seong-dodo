import { render } from '@testing-library/react';

import CalendarDates from './CalendarDates';

jest.mock('react-redux');

describe('CalendarDates', () => {
  it('renders calendar dates', () => {
    const month = 7;
    const year = 2021;

    const { queryByText } = render((
      <CalendarDates
        month={month}
        year={year}
      />
    ));

    expect(queryByText(1)).not.toBeNull();
  });
});
