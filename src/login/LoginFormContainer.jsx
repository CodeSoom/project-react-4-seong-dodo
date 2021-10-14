import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import {
  Link,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';
import Loading from '../loading/Loading';

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
  fontSize: ['0.8em', '0.8em', '0.9em', '1em', '.9em'],
  textAlign: 'right',
  '& a': {
    padding: '0.5em',
    color: `${colors.gray_text}`,
    fontWeight: '500',
    cursor: 'pointer',
    letterSpacing: '0.1em',
    '&:hover': {
      color: `${colors.blue_text}`,
      fontWeight: '600',
    },
  },
}));

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { accessToken, loginFields } = useSelector((state) => ({
    loginFields: state.user.loginFields,
    accessToken: state.user.accessToken,
  }));

  const handleChange = ({ name, value }) => {
    dispatch(changeLoginField({ name, value }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await dispatch(requestLogin());
    setIsLoading(false);
  };

  const handleClickLogout = async () => {
    setIsLoading(true);
    await dispatch(logout());
    await dispatch(clearLoginField());
    await dispatch(clearMonthlyTransaction());
    setIsLoading(false);
  };

  return (
    <>
      {
        accessToken
          ? (
            <>
              {
                isLoading
                  ? <Loading />
                  : (
                    <LogoutForm
                      loginFields={loginFields}
                      onClick={handleClickLogout}
                    />
                  )
              }
            </>
          )
          : (
            <>
              {
                isLoading
                  ? <Loading />
                  : (

                    <LoginForm
                      fields={loginFields}
                      onChange={handleChange}
                      onSubmit={handleSubmit}
                    />

                  )
              }
              <LinkBox>
                <Link to="/join">
                  회원가입
                </Link>
              </LinkBox>
            </>
          )
      }
    </>
  );
}
