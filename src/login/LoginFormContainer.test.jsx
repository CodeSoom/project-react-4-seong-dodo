import { render, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');
/**
 * 로그인 폼 컨테이너 컴포넌트 테스트 코드 시나리오
 *
 * 1. accessToken이 없을 경우 (로그인 하지 않은 상태)
 * 1-1. 이메일, 패스워드 input filed에 입력값을 입력하면 입력값이 입력된다.(onChange event)
 * 1-2. 이메일, 패스워드 입력창에 모든 입력값이 입력되어야지 로그인 버튼을 클릭할 수 있다.
 * 1-3. 이메일, 패스워드 입력창에 모든 입력값이 입력된 다음 엔터 키보드를 눌렀을 때 로그인을 할 수 있다.
 * 1-4. 회원가입 버튼을 누르면 회원가입 링크로 이동할 수 있다.
 *
 * 2. accessToken이 있을 경우 (로그인 성공 상태)
 * 2-1. 로그인 성공하면 '환영합니다 :)'문구가 보여진다.
 * 3-2. 로그아웃 버튼을 클릭하면 로딩 컴포넌트가 true-> 로그아웃이 됨-> 로그인 필드 초기화-> 거래내역 초기화 -> 로딩컴포넌트 false
 */

describe('LoginFormContainer', () => {
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

  function renderLoginFormContainer() {
    return render((
      <MemoryRouter>
        <LoginFormContainer />
      </MemoryRouter>
    ));
  }

  context('로그인 하지 않은 상태일 경우', () => {
    given('accessToken', () => undefined);

    it('renders input controls', () => {
      const { getByLabelText } = renderLoginFormContainer();

      expect(getByLabelText('E-mail').value).toBe('');
      expect(getByLabelText('Password').value).toBe('');
    });

    it('listens change events', () => {
      const { getByLabelText } = renderLoginFormContainer();

      fireEvent.change(getByLabelText('E-mail'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'user/changeLoginField',
        payload: { name: 'email', value: 'new email' },
      });
    });

    describe('엔터 키보드 이벤트', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          loginFields: {
            email: '123@test.com',
            password: '123test',
          },
        },
      }));

      it('listens "E-mail" keypress event', async () => {
        const { getByLabelText } = renderLoginFormContainer();

        fireEvent.keyPress(getByLabelText('E-mail'), {
          key: 'Enter', keyCode: 13,
        });

        await waitFor(() => expect(dispatch).toBeCalled());
      });

      it('listens "Password" keypress event', async () => {
        const { getByLabelText } = renderLoginFormContainer();

        fireEvent.keyPress(getByLabelText('Password'), {
          key: 'Enter', keyCode: 13,
        });
        await waitFor(() => expect(dispatch).toBeCalled());
      });

      describe('이메일 입력 후 엔터 키보드 누르지 않았을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            loginFields: {
              email: '123@test.com',
              password: '123test',
            },
          },
        }));

        it('이벤트가 발생하지 않는다.', async () => {
          const { getByLabelText } = renderLoginFormContainer();

          fireEvent.keyPress(getByLabelText('E-mail'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('패스워드 입력 후 엔터 키보드 누르지 않았을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            loginFields: {
              email: '123@test.com',
              password: '123test',
            },
          },
        }));

        it('이벤트가 발생하지 않는다.', async () => {
          const { getByLabelText } = renderLoginFormContainer();

          fireEvent.keyPress(getByLabelText('Password'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });
    });

    it('renders “Log In” button', async () => {
      const { getByText } = renderLoginFormContainer();

      fireEvent.click(getByText('Log In'));

      await waitFor(() => expect(dispatch).toBeCalled());
    });

    it('renders "회원가입" 버튼', () => {
      const { container } = renderLoginFormContainer();

      expect(container).toHaveTextContent('회원가입');
    });
  });

  context('로그인 성공하였을 경우', () => {
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
      const { container } = renderLoginFormContainer();

      expect(container).toHaveTextContent('환영합니다');
    });

    it('renders “Log out” button', () => {
      const { container } = renderLoginFormContainer();

      expect(container).toHaveTextContent('Log out');
    });

    it('listens click event of “Log out” button', async () => {
      const { getByText } = renderLoginFormContainer();

      fireEvent.click(getByText('Log out'));

      await waitFor(() => expect(dispatch).toBeCalled());
    });
  });
});
