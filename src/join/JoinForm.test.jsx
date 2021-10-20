import { render, fireEvent } from '@testing-library/react';

import JoinForm from './JoinForm';
/**
 * 회원가입 폼 테스트 시나리오
 *
 */
describe('JoinForm', () => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();
  const handleKeypress = jest.fn();

  beforeEach(() => {
    handleChange.mockClear();
    handleSubmit.mockClear();
    handleKeypress.mockClear();
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
        onKeypress={handleKeypress}
      />
    ));
  }

  it('renders input controls', () => {
    const email = '123@test.com';
    const age = '23';
    const password = '123test';
    const repassword = '123test';

    const { getByLabelText } = renderJoinForm({
      email, age, password, repassword,
    });

    const controls = [
      { label: '이메일 주소', value: email },
      { label: '나이', value: age },
      { label: '비밀번호 입력', value: password },
      { label: '비밀번호 재입력', value: repassword },
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

  it('listens keypress events', () => {
    const { getByLabelText } = renderJoinForm();

    const controls = [
      { label: '나이', name: 'age', value: '23' },
      { label: '이메일 주소', name: 'email', value: '123@test.com' },
      { label: '비밀번호 입력', name: 'password', value: '123test' },
      { label: '비밀번호 재입력', name: 'repassword', value: '123test' },
    ];

    controls.forEach(({ label }) => {
      const input = getByLabelText(label);
      fireEvent.keyPress(input, { key: 'Enter', keyCode: 13 });
      expect(handleKeypress).toBeCalled();
    });
  });

  it('renders “가입하기” button', () => {
    const { getByText } = renderJoinForm();

    fireEvent.click(getByText('가입하기'));

    expect(handleSubmit).toBeCalled();
  });
});
