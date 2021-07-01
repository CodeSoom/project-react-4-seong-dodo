import {
  Link,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from './style/colors';

const Container = styled.div({
  width: '90%',
  margin: '0 auto',
});

const Title = styled.h1({
  margin: '1.5em auto',
  fontSize: '3em',
  color: `${colors.black}`,
  textAlign: 'center',
});

const LinkBox = styled.div({
  width: '80%',
  height: '2.5em',
  margin: '.8em auto',
  backgroundColor: `${colors.teal}`,
  fontSize: '3.5em',
  textAlign: 'center',
  '& a': {
    color: `${colors.white}`,
    fontWeight: 'bold',
    lineHeight: '2.5em',
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.white}`,
    },
  },
});

export default function HomePage() {
  return (
    <Container>
      <Title>Mine</Title>
      <LinkBox>
        <Link to="/budget">
          한 달 예산을 세워볼까요?
        </Link>
      </LinkBox>
      <LinkBox>
        <Link to="/calendar">
          자산 관리 시작해볼까요?
        </Link>
      </LinkBox>
    </Container>
  );
}
