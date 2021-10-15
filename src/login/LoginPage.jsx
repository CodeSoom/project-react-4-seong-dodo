import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import LoginFormContainer from './LoginFormContainer';

const Container = styled.div(mediaquery({
  width: ['85%', '85%', '80%', '70%', '60%'],
  margin: [
    '3em auto',
    '3em auto',
    '3em auto',
    '7em auto',
    '10em auto',
  ],
  padding: '0.5em',
  backgroundColor: `${colors.teal_login}`,
  borderRadius: '0.5em',
}));

const Title = styled.h2(mediaquery({
  fontSize: ['1.3em', '1.3em', '1.5em', '1.7em', '2em'],
  textAlign: 'center',
  letterSpacing: '0.2em',
}));

export default function LoginPage() {
  return (
    <Container>
      <Title>로그인</Title>
      <LoginFormContainer />
    </Container>
  );
}
