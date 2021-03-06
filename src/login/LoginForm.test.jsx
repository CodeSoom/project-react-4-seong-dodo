import { render, fireEvent } from '@testing-library/react';

import LoginForm from './LoginForm';

describe('LoginForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleKeypress = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
    handleKeypress.mockClear();
  });

  function renderLoginForm({ email, password } = {}) {
    return render((
      <LoginForm
        fields={{ email, password }}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onKeypress={handleKeypress}
      />
    ));
  }

  it('renders input controls', () => {
    const email = '123@test.com';
    const password = '123test';

    const { getByLabelText } = renderLoginForm({ email, password });

    const controls = [
      { label: 'E-mail', value: email },
      { label: 'Password', value: password },
    ];

    controls.forEach(({ label, value }) => {
      const input = getByLabelText(label);
      expect(input.value).toBe(value);
    });
  });

  it('listens change events', () => {
    const { getByLabelText } = renderLoginForm();

    const controls = [
      { label: 'E-mail', name: 'email', value: '123@test.com' },
      { label: 'Password', name: 'password', value: '123test' },
    ];

    controls.forEach(({ label, name, value }) => {
      const input = getByLabelText(label);
      fireEvent.change(input, { target: { value } });
      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('listens keypress events', () => {
    const { getByLabelText } = renderLoginForm();

    const controls = [
      { label: 'E-mail', name: 'email', value: '123@test.com' },
      { label: 'Password', name: 'password', value: '123test' },
    ];

    controls.forEach(({ label }) => {
      const input = getByLabelText(label);
      fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
      expect(handleKeypress).toBeCalled();
    });
  });

  it('renders “Log In” button', () => {
    const { getByText } = renderLoginForm();

    fireEvent.click(getByText('Log In'));

    expect(handleSubmit).toBeCalled();
  });
});
