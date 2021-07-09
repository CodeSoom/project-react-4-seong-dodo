import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import CalendarContainer from './CalendarContainer';

jest.mock('react-redux');

test('CalendarContainer', () => {
  useSelector.mockImplementation((selector) => selector({
    year: 2021,
    month: 7,
  }));

  render(<CalendarContainer />);
});
