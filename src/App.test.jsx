import {
  MemoryRouter,
} from 'react-router-dom';

import { render } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import App from './App';

import USER_STATE from '../fixtures/user-initialState';
import ACCOUNTBOOK_STATE from '../fixtures/accountbook-initialState';

jest.mock('react-redux');

describe('App', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      accountbook: ACCOUNTBOOK_STATE,
      user: USER_STATE,
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

  context('with path /login', () => {
    it('renders login page', () => {
      const { container } = renderApp({ path: '/login' });

      expect(container).toHaveTextContent('로그인');
    });
  });

  context('with path /join', () => {
    it('renders join page', () => {
      const { container } = renderApp({ path: '/join' });

      expect(container).toHaveTextContent('회원가입');
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

  context('with path /accountbook', () => {
    it('renders accountbook page', () => {
      const { container } = renderApp({ path: '/accountbook' });

      expect(container).toHaveTextContent('예산');
      expect(container).toHaveTextContent('자산');
    });
  });

  context('with path /accountbook/timeline', () => {
    it('renders accountbook timeline page', () => {
      const { container } = renderApp({ path: '/accountbook/timeline' });

      expect(container).toHaveTextContent('로그인으로 이동하기');
    });
  });
});
