import { memo } from 'react';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const Container = styled.div({
  margin: '0 auto',
  padding: '0.5em',
  textAlign: 'center',
});

const FormBox = styled.div(mediaquery({
  width: ['90%', '95%', '90%', '90%', '90%'],
  height: '100%',
  margin: '0 auto',
  padding: '0.5em 0.5em 1em',
  textAlign: 'center',
  borderRadius: '0.2em',
  backgroundColor: `${colors.white}`,
  '& label': {
    display: 'inline-block',
    width: ['100%', '100%', '100%', '30%', '25%'],
    padding: ['1em', '1em', '1em', '1.5em', '2em 1em'],
    color: `${colors.gray_text}`,
    fontSize: ['0.7em', '0.7em', '0.8em', '1em', '1.1em'],
    fontWeight: '600',
    textAlign: ['left', 'center', 'center', 'center', 'center'],
  },
  '& input': {
    width: ['95%', '95%', '95%', '65%', '65%'],
    height: ['3em', '4em', '3.5em', '3.5em', '4em'],
    padding: ['1em', '1em', '0.5em', '0.5em', '0.5em'],
    margin: '0 auto',
    border: '1px solid #eee',
    borderRadius: '0.5em',
    color: `${colors.gray_text01}`,
    fontSize: ['0.6em', '0.6em', '0.7em', '0.9em', '1em'],
    outlineStyle: 'none',
    backgroundColor: 'transparent',
  },
}));

const Button = styled.button(mediaquery({
  width: ['90%', '95%', '90%', '90%', '90%'],
  height: '2em',
  margin: '2em auto 0',
  padding: '0.5em 0',
  borderRadius: '0.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.9em', '0.9em', '1em', '1.1em', '1.3em'],
  fontWeight: '500',
  cursor: 'pointer',
  '&:hover': {
    color: `${colors.white}`,
    backgroundColor: `${colors.blue_text}`,
    fontWeight: '600',
  },
}));

const LoginForm = memo(({ fields, onChange, onSubmit }) => {
  const { email, password } = fields;

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <Container>
      <FormBox>
        <label htmlFor="login-email">
          E-mail
        </label>
        <input
          type="email"
          id="login-email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="login-password">
          Password
        </label>
        <input
          type="password"
          id="login-password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={handleChange}
        />
      </FormBox>
      <Button
        type="button"
        onClick={onSubmit}
      >
        Log In
      </Button>
    </Container>
  );
});

export default LoginForm;
