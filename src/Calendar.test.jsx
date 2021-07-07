import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import Calendar from './Calendar';

jest.mock('react-redux');

test('Calendar', () => {
  useSelector.mockImplementation((selector) => selector({
    year: 2021,
    month: 7,
  }));

  render(<Calendar />);
});
