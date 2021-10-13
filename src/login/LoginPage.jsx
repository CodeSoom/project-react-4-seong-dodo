import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import LoginFormContainer from './LoginFormContainer';

const Container = styled.div(mediaquery({
  width: ['80%', '85%', '60%', '60%', '40%'],
  margin: ['3em auto', '3em auto', '7em auto', '7em auto', '7em auto'],
  padding: ['.5em', '.5em', '1em', '1em', '1em'],
  backgroundColor: `${colors.teal_login}`,
  borderRadius: '.5em',
}));

const Title = styled.h2(mediaquery({
  fontSize: ['1em', '1.3em', '1.2em', '1.4em', '1.5em'],
  textAlign: 'center',
  letterSpacing: '.2em',
}));

export default function LoginPage() {
  return (
    <Container>
      <Title>로그인</Title>
      <LoginFormContainer />
    </Container>
  );
}
