import { render, fireEvent } from '@testing-library/react';

import LogoutForm from './LogoutForm';

describe('LogoutForm', () => {
  const handleClick = jest.fn();

  const loginFields = {
    email: 'test@test.com',
    password: 'PASSWORD',
  };

  function renderLogoutForm() {
    return render((
      <LogoutForm
        loginFields={loginFields}
        onClick={handleClick}
      />
    ));
  }

  it('renders “Log out” button', () => {
    const { container } = renderLogoutForm(loginFields);

    expect(container).toHaveTextContent('Log out');
  });

  describe('when button is clicked', () => {
    it('calls click event handler', () => {
      const { getByText } = renderLogoutForm(loginFields);

      fireEvent.click(getByText('Log out'));

      expect(handleClick).toBeCalled();
    });
  });
});
