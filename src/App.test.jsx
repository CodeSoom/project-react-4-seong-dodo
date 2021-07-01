import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import App from './App';

describe('App', () => {
  context('with path /', () => {
    it('renders home page', () => {
      const { container } = render((
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('Mine');
    });
  });

  context('with path /budget', () => {
    it('renders budget page', () => {
      render((
        <MemoryRouter initialEntries={['/budget']}>
          <App />
        </MemoryRouter>
      ));
    });
  });

  context('with path /calendar', () => {
    it('renders calendar page', () => {
      render((
        <MemoryRouter initialEntries={['/calendar']}>
          <App />
        </MemoryRouter>
      ));
    });
  });
});
