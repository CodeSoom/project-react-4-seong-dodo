import { useDispatch, useSelector } from 'react-redux';

import {
  Link,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

import {
  changeLoginField,
  clearLoginField,
  requestLogin,
  logout,
} from '../reducers/user';

import {
  clearMonthlyTransaction,
} from '../reducers/accountbook';

const LinkBox = styled.div(mediaquery({
  width: '90%',
  margin: '1em auto',
  fontSize: ['.7em', '.8em', '.8em', '.9em', '.9em'],
  textAlign: 'right',
  '& a': {
    padding: '.5em',
    color: `${colors.gray_text}`,
    fontWeight: '500',
    cursor: 'pointer',
    letterSpacing: '.1em',
    '&:hover': {
      color: `${colors.blue_text}`,
      fontWeight: '600',
    },
  },
}));

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { accessToken, loginFields } = useSelector((state) => ({
    loginFields: state.user.loginFields,
    accessToken: state.user.accessToken,
  }));

  const handleChange = ({ name, value }) => {
    dispatch(changeLoginField({ name, value }));
  };

  const handleSubmit = () => {
    dispatch(requestLogin());
  };

  const handleClickLogout = () => {
    dispatch(logout());
    dispatch(clearLoginField());
    dispatch(clearMonthlyTransaction());
  };

  return (
    <>
      { accessToken
        ? (
          <LogoutForm
            loginFields={loginFields}
            onClick={handleClickLogout}
          />
        )
        : (
          <>
            <LoginForm
              fields={loginFields}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
            <LinkBox>
              <Link to="/join">
                회원가입
              </Link>
            </LinkBox>
          </>
        )}
    </>
  );
}
