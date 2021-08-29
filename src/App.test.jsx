import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import mockInitState from '../fixtures/mockInitState';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      accountbook: {
        ...mockInitState,
      },
      user: {},
    }));
  });

  function renderApp({ path }) {
    return render((
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    ));
  }

  context('with path /', () => {
    it('renders home page', () => {
      const { container } = renderApp({ path: '/' });

      expect(container).toHaveTextContent('Mine');
    });
  });

  context('with path /budget', () => {
    it('renders budget page', () => {
      const { container } = renderApp({ path: '/budget' });

      expect(container).toHaveTextContent('예산');
    });
  });

  context('with path /calendar', () => {
    it('renders calendar page', () => {
      const { container } = renderApp({ path: '/calendar' });

      expect(container).toHaveTextContent('달력');
    });
  });
});
