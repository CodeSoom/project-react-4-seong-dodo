import { render, fireEvent } from '@testing-library/react';

import LogoutForm from './LogoutForm';

describe('LogoutForm', () => {
  const handleClick = jest.fn();

  function renderLogoutForm(loginFields = {}) {
    return render((
      <LogoutForm
        loginFields={loginFields}
        onClick={handleClick}
      />
    ));
  }

  it('renders “Log out” button', () => {
    const loginFields = {
      email: 'test@test.com',
      password: 'PASSWORD',
    };

    const { container, getByText } = renderLogoutForm(loginFields);

    expect(container).toHaveTextContent('Log out');

    fireEvent.click(getByText('Log out'));

    expect(handleClick).toBeCalled();
  });

  context('when button is clicked', () => {
    const loginFields = {
      email: 'test@test.com',
      password: 'PASSWORD',
    };

    it('calls click event handler', () => {
      const { getByText } = renderLogoutForm(loginFields);

      fireEvent.click(getByText('Log out'));

      expect(handleClick).toBeCalled();
    });
  });
});
