import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import JoinContainer from './JoinContainer';

const Container = styled.div(mediaquery({
  width: ['95%', '95%', '90%', '80%', '60%'],
  margin: [
    '2em auto',
    '2em auto',
    '2em auto',
    '6em auto',
    '7em auto',
  ],
  padding: ['0.5em', '0.5em', '0.5em', '0.5em', '1em'],
  backgroundColor: `${colors.teal_login}`,
  borderRadius: '0.5em',
}));

const Title = styled.h2(mediaquery({
  margin: [
    '1em auto',
    '1em auto',
    '1.3em auto',
    '1.3em auto',
    '1.5em auto',
  ],
  fontSize: ['1.2em', '1.2em', '1.4em', '1.6em', '1.5em'],
  textAlign: 'center',
  letterSpacing: '0.2em',
}));

export default function JoinPage({ history }) {
  return (
    <Container>
      <Title>회원가입</Title>
      <JoinContainer
        history={history}
      />
    </Container>
  );
}
