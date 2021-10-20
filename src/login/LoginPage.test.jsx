import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import LoginPage from './LoginPage';

jest.mock('react-redux');

describe('LoginPage', () => {
  beforeEach(() => {
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

  it('로그인 폼이 그려진다.', () => {
    const { container } = render((
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('로그인');
  });

  context('accessToken이 없을 경우', () => {
    given('accessToken', () => undefined);

    it('이메일, 패스워드 입력창이 그려진다.', () => {
      const { getByLabelText } = render((
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      ));

      expect(getByLabelText('E-mail')).not.toBeNull();
      expect(getByLabelText('Password')).not.toBeNull();
    });

    it('로그인 버튼이 그려진다.', () => {
      const { container } = render((
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('Log In');
    });

    it('회원가입 버튼이 그려진다.', () => {
      const { container } = render((
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('회원가입');
    });
  });

  context('accessToken이 있을 경우', () => {
    given('accessToken', () => 'ACCESS_TOKEN');

    useSelector.mockImplementation((selector) => selector({
      user: {
        loginFields: {
          email: '123@test.com',
          password: '123test',
        },
      },
    }));

    it('oo 사용자의 로그인 성공에 대한 환영 문구가 그려진다.', () => {
      const { container } = render((
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('환영합니다');
    });

    it('로그아웃 버튼이 그려진다.', () => {
      const { container } = render((
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      ));

      expect(container).toHaveTextContent('Log out');
    });
  });
});
