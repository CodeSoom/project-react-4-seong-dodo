import { render, fireEvent, act } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Navbar from './Navbar';

import ACCESS_TOKEN from '../../fixtures/access-token';
import MONTHLY_TRANSACTION from '../../fixtures/monthly-transaction';

jest.mock('react-redux');

/**
 * 테스트 시나리오
 * 1. accessToken이 있을 경우
 * 2. accessToken이 없을 경우
 */

describe('Navbar', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: given.accessToken,
        loginFields: {
          email: '',
          password: '',
        },
      },
    }));
  });

  function renderNavbar() {
    return render((
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    ));
  }

  context('accessToken이 없을 경우', () => {
    given('accessToken', () => undefined);

    it('로그인 버튼이 그려진다.', () => {
      const { container } = renderNavbar();

      expect(container).toHaveTextContent('Log in');
    });
  });

  context('accessToken이 있을 경우', () => {
    it('로그인 아웃 버튼이 그려진다.', async () => {
      given('accessToken', () => 'ACCESS_TOKEN');

      const { container } = renderNavbar();

      expect(container).toHaveTextContent('Log out');
    });

    it('로그인 상태에서는 로그아웃 버튼을 클릭할 수 있다.', async () => {
      useSelector.mockImplementation((selector) => selector({
        accountbook: {
          monthlyTransaction: MONTHLY_TRANSACTION,
        },
        user: {
          accessToken: ACCESS_TOKEN,
          loginFields: {
            email: 'test@test.com',
            password: 'test1234',
          },
        },
      }));

      await act(async () => {
        const { getByText } = renderNavbar();
        fireEvent.click(getByText('Log out'));
      });
      expect(dispatch).toBeCalledTimes(3);
    });
  });
});
