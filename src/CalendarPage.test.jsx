import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import CalendarPage from './CalendarPage';

test('CalendarPage', () => {
  render((
    <MemoryRouter>
      <CalendarPage />
    </MemoryRouter>
  ));
});
