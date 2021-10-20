import { render, fireEvent, waitFor } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import LoginFormContainer from './LoginFormContainer';

jest.mock('react-redux');

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
