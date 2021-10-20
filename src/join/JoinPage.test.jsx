import { MemoryRouter } from 'react-router-dom';

import { render } from '@testing-library/react';

import { useSelector } from 'react-redux';

import JoinPage from './JoinPage';

jest.mock('react-redux');

describe('JoinPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        accessToken: '',
        joinFields: {
          age: '',
          email: '',
          password: '',
          repassword: '',
        },
      },
    }));
  });

  function renderJoinPage() {
    return render((
      <MemoryRouter>
        <JoinPage />
      </MemoryRouter>
    ));
  }

  it('회원가입 폼이 그려진다.', () => {
    const { container } = renderJoinPage();

    expect(container).toHaveTextContent('회원가입');
  });

  it('이메일 주소, 나이, 비밀번호 입력 및 비밀번호 재입력 폼이 그려진다.', () => {
    const { getByLabelText } = renderJoinPage();

    expect(getByLabelText('이메일 주소')).not.toBeNull();
    expect(getByLabelText('나이')).not.toBeNull();
    expect(getByLabelText('비밀번호 입력')).not.toBeNull();
    expect(getByLabelText('비밀번호 재입력')).not.toBeNull();
  });

  it('가입하기 버튼이 그려진다.', () => {
    const { container } = renderJoinPage();

    expect(container).toHaveTextContent('가입하기');
  });
});
