import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import JoinContainer from './JoinContainer';

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

const Container = styled.div(mediaquery({
  width: ['14em', '14em', '18em', '28em', '30em', '40em'],
  height: ['25.5em', '26em', '30em', '30.5em', '33em', '37em'],
  margin: [
    '3em auto',
    '3em auto',
    '2em auto',
    '6em auto',
    '10em auto',
    '15em auto 0',
  ],
  borderRadius: '0.5em',
  backgroundColor: `${colors.teal_login}`,
}));

const Title = styled.h2(mediaquery({
  display: 'inline-block',
  width: ['14em', '14em', '16.4em', '18.6em', '16.6em', '20em'],
  height: ['1.2em', '1.3em', '1.3m', '1.3em', '1.2em', '1.3em'],
  margin: '1em auto',
  fontSize: ['1em', '1em', '1.1em', '1.5em', '1.8em', '2em'],
  textAlign: 'center',
  letterSpacing: '0.2em',
}));
