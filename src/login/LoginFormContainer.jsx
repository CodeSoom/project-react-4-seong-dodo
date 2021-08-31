import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import {
  changeLoginField,
  requestLogin,
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

  return (
    <>
      { accessToken
        ? (
          <div>
            {loginFields.email}
            {' '}
            님
            {' '}
            환영합니다
            {' '}
            :)
          </div>
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
