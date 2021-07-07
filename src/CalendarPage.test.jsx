import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import CalendarPage from './CalendarPage';

jest.mock('react-redux');

describe('CalendarPage', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      year: 2021,
      month: 7,
    }));
  });

  it('renders calendar page', () => {
    render((
      <MemoryRouter>
        <CalendarPage />
      </MemoryRouter>
    ));
  });
});
