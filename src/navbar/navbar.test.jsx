import { render } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';

jest.mock('react-redux');

describe('navbar', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: '',
      },
    }));
  });

  it('renders navbar', () => {
    render((
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    ));
  });
});
