import styled from '@emotion/styled';
import colors from '../style/colors';

import LoginFormContainer from './LoginFormContainer';

const Container = styled.div({
  width: '40%',
  margin: '7em auto',
  padding: '1em',
  backgroundColor: `${colors.teal_login}`,
  borderRadius: '.5em',
});

const Title = styled.h2({
  textAlign: 'center',
  letterSpacing: '.2em',
});

export default function LoginPage() {
  return (
    <Container>
      <Title>로그인</Title>
      <LoginFormContainer />
    </Container>
  );
}
