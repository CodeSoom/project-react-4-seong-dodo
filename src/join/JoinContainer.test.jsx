import { render, fireEvent, waitFor } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import JoinContainer from './JoinContainer';

jest.mock('react-redux');

describe('JoinContainer', () => {
  global.alert = jest.fn();

  const dispatch = jest.fn();

  beforeEach(() => {
    global.alert.mockClear();

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

  function renderJoinContainer() {
    return render((
      <JoinContainer />
    ));
  }

  it('renders input controls', () => {
    const { getByLabelText } = renderJoinContainer();

    expect(getByLabelText('이메일 주소')).not.toBeNull();
    expect(getByLabelText('나이')).not.toBeNull();
    expect(getByLabelText('비밀번호 입력')).not.toBeNull();
    expect(getByLabelText('비밀번호 재입력')).not.toBeNull();
  });

  it('listens change events', () => {
    const { getByLabelText } = renderJoinContainer();

    fireEvent.change(getByLabelText('이메일 주소'), {
      target: { value: 'new email' },
    });

    expect(dispatch).toBeCalledWith({
      type: 'user/changeJoinField',
      payload: { name: 'email', value: 'new email' },
    });
  });

  describe('이메일 주소 입력 폼', () => {
    context('엔터 키보드 이벤트', () => {
      describe('입력 폼에 입력값이 없을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            joinFields: {
              age: '23',
              email: '',
              password: 'test1234',
              repassword: 'test1234',
            },
          },
        }));

        it('엔터 키보드를 누르면 알림창이 보여지고, 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('이메일 주소'), {
            key: 'Enter', keyCode: 13,
          });

          expect(global.alert).toHaveBeenCalledTimes(1);
          expect(global.alert).toHaveBeenCalledWith('이메일 주소를 입력해 주세요');

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 이메일 형식으로 입력하지 않았을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            joinFields: {
              age: '23',
              email: 'test@',
              password: 'test1234',
              repassword: 'test1234',
            },
          },
        }));

        it('엔터 키보드를 누르면 알림창이 뜨고, 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('이메일 주소'), {
            key: 'Enter', keyCode: 13,
          });

          expect(global.alert).toHaveBeenCalledTimes(1);

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 이메일 형식으로 입력했을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            joinFields: {
              age: '23',
              email: '',
              password: 'test1234',
              repassword: 'test1234',
            },
          },
        }));

        it('엔터 키보드를 누르면 서버에 회원가입 요청을 보낸다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('이메일 주소'), {
            target: { value: 'test@test.com' },
          });

          fireEvent.keyPress(getByLabelText('이메일 주소'), {
            key: 'Enter', keyCode: 13,
          });

          await waitFor(() => expect(dispatch).toBeCalled());
        });
      });
    });

    context('엔터 제외 키보드 이벤트', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '23',
            email: '',
            password: 'test1234',
            repassword: 'test1234',
          },
        },
      }));

      describe('입력 폼에 입력값이 없을 경우', () => {
        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('이메일 주소'), {
            target: { value: '' },
          });

          fireEvent.keyPress(getByLabelText('이메일 주소'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 이메일 형식으로 입력했을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            joinFields: {
              age: '23',
              email: 'test@test.com',
              password: 'test1234',
              repassword: 'test1234',
            },
          },
        }));

        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('이메일 주소'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });
    });
  });

  describe('나이 입력 폼', () => {
    context('엔터 키보드 이벤트 ', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '',
            email: 'test@test.com',
            password: 'test1234',
            repassword: 'test1234',
          },
        },
      }));

      describe('입력 폼에 입력값이 없을 경우', () => {
        it('엔터 키보드를 누르면 알림창이 보여지고, 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('나이'), {
            key: 'Enter', keyCode: 13,
          });

          expect(global.alert).toHaveBeenCalledTimes(1);
          // expect(global.alert).toHaveBeenCalledWith('나이를 입력해 주세요');

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 "0"을 입력한 경우', () => {
        it('엔터 키보드를 누르면 알림창이 보여진다.', () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('나이'), {
            target: { value: '0' },
          });

          fireEvent.keyPress(getByLabelText('나이'), {
            key: 'Enter', keyCode: 13,
          });

          expect(global.alert).toHaveBeenCalledTimes(1);
        });
      });

      describe('입력 폼에 숫자 형식으로 입력한 경우', () => {
        it('엔터 키보드를 누르면 서버에 회원가입 요청을 보낸다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('나이'), {
            target: { value: '23' },
          });

          fireEvent.keyPress(getByLabelText('나이'), {
            key: 'Enter', keyCode: 13,
          });

          await waitFor(() => expect(dispatch).toBeCalled());
        });
      });
    });

    context('엔터 제외 키보드 이벤트', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '',
            email: 'test@test.com',
            password: 'test1234',
            repassword: 'test1234',
          },
        },
      }));

      describe('입력 폼에 입력값이 없을 경우', () => {
        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('나이'), {
            target: { value: '' },
          });

          fireEvent.keyPress(getByLabelText('나이'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 숫자 형식으로 입력했을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            joinFields: {
              age: '23',
              email: 'test@test.com',
              password: 'test1234',
              repassword: 'test1234',
            },
          },
        }));

        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('나이'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });
    });
  });

  describe('비밀번호 입력 폼', () => {
    context('엔터 키보드 이벤트 ', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '23',
            email: 'test@test.com',
            password: '',
            repassword: 'test1234',
          },
        },
      }));

      describe('입력 폼에 입력값이 없을 경우', () => {
        it('엔터 키보드를 누르면 알림창이 보여지고, 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('비밀번호 입력'), {
            key: 'Enter', keyCode: 13,
          });

          expect(global.alert).toHaveBeenCalledTimes(1);
          // expect(global.alert).toHaveBeenCalledWith('비밀번호를 입력해 주세요');

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 비밀번호 재입력값과 동일한 입력값을 입력한 경우', () => {
        it('엔터 키보드를 누르면 서버에 회원가입 요청을 보낸다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('비밀번호 입력'), {
            target: { value: 'test1234' },
          });

          fireEvent.keyPress(getByLabelText('비밀번호 입력'), {
            key: 'Enter', keyCode: 13,
          });

          await waitFor(() => expect(dispatch).toBeCalled());
        });
      });
    });

    context('엔터 제외 키보드 이벤트', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '23',
            email: 'test@test.com',
            password: '',
            repassword: 'test1234',
          },
        },
      }));

      describe('입력 폼에 입력값이 없을 경우', () => {
        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('비밀번호 입력'), {
            target: { value: '' },
          });

          fireEvent.keyPress(getByLabelText('비밀번호 입력'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 비밀번호 재입력값과 동일한 입력값으로 입력했을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            joinFields: {
              age: '23',
              email: 'test@test.com',
              password: 'test1234',
              repassword: 'test1234',
            },
          },
        }));

        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('비밀번호 입력'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });
    });
  });

  describe('비밀번호 재입력 폼', () => {
    context('엔터 키보드 이벤트 ', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '23',
            email: 'test@test.com',
            password: 'test1234',
            repassword: '',
          },
        },
      }));

      describe('입력 폼에 입력값이 없을 경우', () => {
        it('엔터 키보드를 누르면 알림창이 보여지고, 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('비밀번호 재입력'), {
            key: 'Enter', keyCode: 13,
          });

          expect(global.alert).toHaveBeenCalledTimes(1);
          // expect(global.alert).toHaveBeenCalledWith('비밀번호를 확인해 주세요');

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 비밀번호 입력값과 동일한 입력값을 입력한 경우', () => {
        it('엔터 키보드를 누르면 서버에 회원가입 요청을 보낸다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('비밀번호 재입력'), {
            target: { value: 'test1234' },
          });

          fireEvent.keyPress(getByLabelText('비밀번호 재입력'), {
            key: 'Enter', keyCode: 13,
          });

          await waitFor(() => expect(dispatch).toBeCalled());
        });
      });
    });

    context('엔터 제외 키보드 이벤트', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '23',
            email: 'test@test.com',
            password: 'test1234',
            repassword: '',
          },
        },
      }));

      describe('입력 폼에 입력값이 없을 경우', () => {
        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.change(getByLabelText('비밀번호 재입력'), {
            target: { value: '' },
          });

          fireEvent.keyPress(getByLabelText('비밀번호 재입력'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });

      describe('입력 폼에 비밀번호 입력값과 동일한 입력값으로 입력했을 경우', () => {
        useSelector.mockImplementation((selector) => selector({
          user: {
            joinFields: {
              age: '23',
              email: 'test@test.com',
              password: 'test1234',
              repassword: 'test1234',
            },
          },
        }));

        it('엔터 제외 키보드를 누르면 서버에 회원가입 요청을 보내지 못한다.', async () => {
          const { getByLabelText } = renderJoinContainer();

          fireEvent.keyPress(getByLabelText('비밀번호 재입력'), {
            key: 'Spacebar', keyCode: 32,
          });

          await waitFor(() => expect(dispatch).not.toBeCalled());
        });
      });
    });
  });

  describe('가입하기 버튼', () => {
    describe('이메일 주소 폼에 입력값이 올바르게 입력되지 않았을 경우', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '25',
            email: '',
            password: 'test1234',
            repassword: 'test1234',
          },
        },
      }));

      it('이메일 주소를 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', async () => {
        const { getByText } = renderJoinContainer();

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);
        expect(global.alert).toHaveBeenCalledWith('이메일 주소를 입력해 주세요');

        await waitFor(() => expect(dispatch).not.toBeCalled());
      });

      it('이메일 주소 형식으로 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', () => {
        const { getByLabelText, getByText } = renderJoinContainer();

        fireEvent.change(getByLabelText('이메일 주소'), {
          target: { value: 'test#' },
        });

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);
        // expect(global.alert).toHaveBeenCalledWith('이메일 주소를 잘못 입력 하였습니다.');
      });
    });

    describe('나이 폼에 입력값이 올바르게 입력되지 않았을 경우', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '',
            email: 'test@test.com',
            password: 'test1234',
            repassword: 'test1234',
          },
        },
      }));

      it('나이를 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', async () => {
        const { getByText } = renderJoinContainer();

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);
        // expect(global.alert).toHaveBeenCalledWith('나이를 입력해 주세요');

        await waitFor(() => expect(dispatch).not.toBeCalled());
      });

      it('나이 형식으로 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', () => {
        const { getByLabelText, getByText } = renderJoinContainer();

        fireEvent.change(getByLabelText('나이'), {
          target: { value: 'e' },
        });

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);
      });
    });

    describe('비밀번호 입력 폼에 입력값이 올바르게 입력되지 않았을 경우', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '23',
            email: 'test@test.com',
            password: '',
            repassword: 'test1234',
          },
        },
      }));

      it('비밀번호를 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', async () => {
        const { getByText } = renderJoinContainer();

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);

        await waitFor(() => expect(dispatch).not.toBeCalled());
      });

      it('비밀번호 형식으로 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', () => {
        const { getByLabelText, getByText } = renderJoinContainer();

        fireEvent.change(getByLabelText('비밀번호 입력'), {
          target: { value: 'test1234' },
        });

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);
      });
    });

    describe('비밀번호 재입력 폼에 입력값이 올바르게 입력되지 않았을 경우', () => {
      useSelector.mockImplementation((selector) => selector({
        user: {
          joinFields: {
            age: '23',
            email: 'test@test.com',
            password: 'test1234',
            repassword: '',
          },
        },
      }));

      it('비밀번호 재입력 폼에 값을 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', async () => {
        const { getByText } = renderJoinContainer();

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);

        await waitFor(() => expect(dispatch).not.toBeCalled());
      });

      it('비밀번호와 같은 입력값으로 입력하지 않고 가입하기 버튼을 클릭하면 알림창이 뜨고, 서버에 가입요청을 보내지 못한다.', () => {
        const { getByLabelText, getByText } = renderJoinContainer();

        fireEvent.change(getByLabelText('비밀번호 재입력'), {
          target: { value: 'test123' },
        });

        fireEvent.click(getByText('가입하기'));

        expect(global.alert).toHaveBeenCalledTimes(1);
      });
    });

    describe('이메일 주소, 나이, 비밀번호 입력 및 재입력 폼에 입력값이 올바르게 입력되었을 경우', () => {
      it('가입하기 버튼을 클릭하면 서버에 회원가입 요청을 보낸다.', async () => {
        const { getByText, getByLabelText } = renderJoinContainer();

        fireEvent.change(getByLabelText('이메일 주소'), {
          target: { value: 'test@test.com' },
        });
        fireEvent.change(getByLabelText('나이'), {
          target: { value: '23' },
        });
        fireEvent.change(getByLabelText('비밀번호 입력'), {
          target: { value: 'test1234' },
        });
        fireEvent.change(getByLabelText('비밀번호 재입력'), {
          target: { value: 'test1234' },
        });

        fireEvent.click(getByText('가입하기'));

        await waitFor(() => expect(dispatch).toBeCalled());
      });
    });
  });
});
