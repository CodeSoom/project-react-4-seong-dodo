import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import JoinContainer from './JoinContainer';

jest.mock('react-redux');

describe('JoinContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();

    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      user: {
        joinFields: {
          age: '',
          email: '',
          password: '',
          repassword: '',
        },
      },
    }));
  });

  it('renders input controls', () => {
    const { getByLabelText } = render((
      <JoinContainer />
    ));

    expect(getByLabelText('이메일 주소')).not.toBeNull();
    expect(getByLabelText('나이')).not.toBeNull();
    expect(getByLabelText('비밀번호 입력')).not.toBeNull();
    expect(getByLabelText('비밀번호 재입력')).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByLabelText } = render((
      <JoinContainer />
    ));

    fireEvent.change(getByLabelText('이메일 주소'), {
      target: { value: 'new email' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'user/changeJoinField',
      payload: { name: 'email', value: 'new email' },
    });
  });

  it('renders “가입하기” button', () => {
    useSelector.mockImplementation((selector) => selector({
      user: {
        joinFields: {
          age: '25',
          email: 'test@test.com',
          password: 'test1234',
          repassword: 'test1234',
        },
      },
    }));

    const { getByText } = render((
      <JoinContainer />
    ));

    fireEvent.click(getByText('가입하기'));

    expect(dispatch).toBeCalled();
  });
});
