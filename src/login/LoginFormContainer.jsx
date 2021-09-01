import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';
import LogoutForm from './LogoutForm';

import {
  changeLoginField,
  clearLoginField,
  requestLogin,
  logout,
} from '../reducers/user';

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
          <LoginForm
            fields={loginFields}
            onChange={handleChange}
            onSubmit={handleSubmit}
          />
        )}
    </>
  );
}
