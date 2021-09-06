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
  width: '90%',
  height: '100%',
  margin: '0 auto',
  padding: '.5em',
  textAlign: 'center',
  borderRadius: '.2em',
  backgroundColor: `${colors.white}`,
  '& input': {
    width: ['100%', '100%', '55%', '70%', '70%'],
    height: '3em',
    padding: '.2em .5em',
    marginLeft: '1em',
    border: 'none',
    color: `${colors.gray_text01}`,
    fontSize: ['.5em', '.6em', '.6em', '.7em', '.8em'],
    outlineStyle: 'none',
    backgroundColor: 'transparent',
  },
  '& label': {
    display: 'inline-block',
    width: ['100%', '100%', '35%', '20%', '20%'],
    padding: '.5em',
    color: `${colors.gray_text}`,
    fontSize: ['.6em', '.7em', '.7em', '.8em', '.9em'],
    fontWeight: '600',
    textAlign: ['left', 'left', 'center', 'center', 'center'],
  },
}));

const Button = styled.button(mediaquery({
  width: '90%',
  margin: '2em auto 0',
  padding: '.5em 0',
  borderRadius: '.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['.7em', '.8em', '.8em', '.9em', '1em'],
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
