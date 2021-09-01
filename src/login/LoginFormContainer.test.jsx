import { render, fireEvent } from '@testing-library/react';

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
          email: '123@test.com',
          password: '123test',
        },
      },
    }));
  });

  context('when logged out', () => {
    given('accessToken', () => '');

    it('renders input controls', () => {
      const { getByLabelText } = render((
        <LoginFormContainer />
      ));

      expect(getByLabelText('E-mail').value).toBe('123@test.com');
      expect(getByLabelText('Password').value).toBe('123test');
    });

    it('listens change events', () => {
      const { getByLabelText } = render((
        <LoginFormContainer />
      ));

      fireEvent.change(getByLabelText('E-mail'), {
        target: { value: 'new email' },
      });

      expect(dispatch).toBeCalledWith({
        type: 'user/changeLoginField',
        payload: { name: 'email', value: 'new email' },
      });
    });

    it('renders “Log In” button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log In'));

      expect(dispatch).toBeCalled();
    });
  });

  context('when logged in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');

    it('renders “Log out” button', () => {
      const { container } = render((
        <LoginFormContainer />
      ));

      expect(container).toHaveTextContent('Log out');
    });

    it('listens click event of “Log out” button', () => {
      const { getByText } = render((
        <LoginFormContainer />
      ));

      fireEvent.click(getByText('Log out'));

      expect(dispatch).toBeCalledWith({
        type: 'user/logout',
      });

      expect(dispatch).toBeCalledWith({
        type: 'user/clearLoginField',
      });
    });
  });
});
