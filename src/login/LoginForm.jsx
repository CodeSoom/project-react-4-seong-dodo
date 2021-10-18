import { memo } from 'react';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const Container = styled.div({
  margin: '0 auto',
  padding: 0,
  textAlign: 'center',
});

const FormBox = styled.div(mediaquery({
  width: ['11em', '11em', '14em', '22em', '26em', '29em'],
  height: ['9em', '8em', '8em', '9em', '10em', '10.5em'],
  margin: '0 auto',
  padding: [
    '0.5em',
    '0 0.5em 0.5em',
    '0 0.5em 0.5em',
    '0 0.5em 0.5em',
    '0 0.5em 0.5em',
    '0 0.5em 0.5em',
  ],
  borderRadius: '0.2em',
  backgroundColor: `${colors.white}`,
  textAlign: 'center',
  '& label': {
    display: 'inline-block',
    width: ['14em', '13em', '17em', '6em', '6em', '6em'],
    padding: [
      '1em 0 0.5em',
      '1em 0 0.5em',
      '1em 0 0.5em',
      '1.5em 0.5em',
      '1.6em 0.5em',
      '1.5em 0.5em',
    ],
    color: `${colors.gray_text}`,
    fontSize: ['0.7em', '0.7em', '0.7em', '1em', '1.1em', '1.2em'],
    fontWeight: '600',
    textAlign: 'center',
  },
  '& input': {
    width: ['16em', '16em', '20em', '17em', '20em', '70%'],
    height: ['3em', '3em', '3em', '3em', '3.3em', '3.5em'],
    margin: '0 auto',
    padding: '0.5em',
    border: '1px solid #eee',
    borderRadius: '0.5em',
    color: `${colors.gray_text01}`,
    backgroundColor: 'transparent',
    fontSize: ['0.6em', '0.6em', '0.6em', '0.8em', '0.9em', '1em'],
    outlineStyle: 'none',
  },
}));

const Button = styled.button(mediaquery({
  display: 'block',
  width: ['16em', '15.5em', '20em', '22em', '22em', '21em'],
  height: ['1em', '1.2em', '1.2em', '1.5em', '1.5em', '1.8em'],
  margin: '1em auto 0.5em',
  padding: '0.5em 0',
  borderRadius: '0.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.7em', '0.7em', '0.7em', '1em', '1.2em', '1.4em'],
  fontWeight: '500',
  cursor: 'pointer',
  lineHeight: 1,
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
