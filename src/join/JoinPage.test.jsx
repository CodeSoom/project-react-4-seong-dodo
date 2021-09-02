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

  it('renders join title', () => {
    const { container } = render((
      <MemoryRouter>
        <JoinPage />
      </MemoryRouter>
    ));

    expect(container).toHaveTextContent('회원가입');
  });

  it('renders input control', () => {
    const { getByLabelText } = render((
      <MemoryRouter>
        <JoinPage />
      </MemoryRouter>
    ));

    expect(getByLabelText('이메일 주소')).not.toBeNull();
  });
});
