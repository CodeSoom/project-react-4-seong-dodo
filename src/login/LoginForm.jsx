import { memo } from 'react';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const LoginBox = styled.div({
  margin: '0 auto',
  padding: '0.5em',
  textAlign: 'center',
});

const InputBox = styled.div({
  width: '90%',
  height: '100%',
  margin: '0 auto',
  padding: '.5em',
  textAlign: 'center',
  borderRadius: '.2em',
  backgroundColor: `${colors.white}`,
});

const Label = styled.label(mediaquery({
  display: 'inline-block',
  width: ['100%', '100%', '35%', '20%', '20%'],
  padding: '.5em',
  color: `${colors.gray_text}`,
  fontSize: ['.6em', '.7em', '.7em', '.8em', '.9em'],
  fontWeight: '600',
  textAlign: ['left', 'left', 'center', 'center', 'center'],
}));

const Input = styled.input(mediaquery({
  width: ['100%', '100%', '55%', '70%', '70%'],
  height: '3em',
  padding: '.2em .5em',
  marginLeft: '1em',
  border: 'none',
  color: `${colors.gray_text01}`,
  fontSize: ['.5em', '.6em', '.6em', '.7em', '.8em'],
  outlineStyle: 'none',
  backgroundColor: 'transparent',
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
    <LoginBox>
      <InputBox>
        <Label htmlFor="login-email">
          E-mail
        </Label>
        <Input
          type="email"
          id="login-email"
          name="email"
          placeholder="이메일을 입력해 주세요"
          value={email}
          onChange={handleChange}
        />
        <Label htmlFor="login-password">
          Password
        </Label>
        <Input
          type="password"
          id="login-password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={handleChange}
        />
      </InputBox>
      <Button
        type="button"
        onClick={onSubmit}
      >
        Log In
      </Button>
    </LoginBox>
  );
});

export default LoginForm;
