import { render, fireEvent } from '@testing-library/react';

import JoinForm from './JoinForm';

describe('JoinForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
  });

  function renderJoinForm({
    age, email, password, repassword,
  } = {}) {
    return render((
      <JoinForm
        fields={{
          age, email, password, repassword,
        }}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    ));
  }

  it('renders input controls', () => {
    const email = '123@test.com';
    const password = '123test';

    const { getByLabelText } = renderJoinForm({ email, password });

    const controls = [
      { label: '이메일 주소', value: email },
      { label: '비밀번호 입력', value: password },
    ];

    controls.forEach(({ label, value }) => {
      const input = getByLabelText(label);
      expect(input.value).toBe(value);
    });
  });

  it('listens change events', () => {
    const { getByLabelText } = renderJoinForm();

    const controls = [
      { label: '나이', name: 'age', value: '23' },
      { label: '이메일 주소', name: 'email', value: '123@test.com' },
      { label: '비밀번호 입력', name: 'password', value: '123test' },
      { label: '비밀번호 재입력', name: 'repassword', value: '123test' },
    ];

    controls.forEach(({ label, name, value }) => {
      const input = getByLabelText(label);
      fireEvent.change(input, { target: { value } });
      expect(handleChange).toBeCalledWith({ name, value });
    });
  });

  it('renders “가입하기” button', () => {
    const { getByText } = renderJoinForm();

    fireEvent.click(getByText('가입하기'));

    expect(handleSubmit).toBeCalled();
  });
});
