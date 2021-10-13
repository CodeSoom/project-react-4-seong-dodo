import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import JoinContainer from './JoinContainer';

const Container = styled.div(mediaquery({
  width: ['95%', '95%', '60%', '60%', '60%'],
  margin: ['2em auto', '2em auto', '7em auto', '7em auto', '7em auto'],
  padding: ['0.5em', '0.5em', '1em', '1em', '1em'],
  backgroundColor: `${colors.teal_login}`,
  borderRadius: '0.5em',
}));

const Title = styled.h2(mediaquery({
  fontSize: ['1em', '1.1em', '1.2em', '1.4em', '1.5em'],
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
