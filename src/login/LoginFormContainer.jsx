import { useDispatch, useSelector } from 'react-redux';

import LoginForm from './LoginForm';

import {
  changeLoginField,
} from '../reducers/user';

export default function LoginFormContainer() {
  const dispatch = useDispatch();

  const { loginFields } = useSelector((state) => ({
    loginFields: state.user.loginFields,
  }));

  const handleChange = ({ name, value }) => {
    dispatch(changeLoginField({ name, value }));
  };

  const handleSubmit = () => {
    // dispatch(requestLogin());
  };

  return (
    <>
      <LoginForm
        fields={loginFields}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
