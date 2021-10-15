import {
  Link,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import TabBarCard from './tabBar/TabBarCard';

const Container = styled.div(mediaquery({
  width: '90%',
  height: '100%',
  margin: [
    '2em auto',
    '2em auto',
    '1.2em auto',
    '7em auto',
    '10em auto',
  ],
  textAlign: 'center',
}));

const LinkBox = styled.div(mediaquery({
  width: ['95%', '95%', '95%', '85%', '80%'],
  height: ['5em', '5em', '5.5em', '6em', '6em'],
  margin: [
    '1.5em auto',
    '1.5em auto',
    '1.5em auto',
    '1em auto',
    '1.5em auto',
  ],
  borderRadius: '.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['1.3em', '1.3em', '1.6em', '2.6em', '3.2em'],
  textAlign: 'center',
  '& a': {
    color: `${colors.white}`,
    fontWeight: 'bold',
    lineHeight: ['5em', '5em', '5.5em', 6, 6],
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.white}`,
    },
  },
}));

export default function AccountBookPage() {
  return (
    <Container>
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
      <TabBarCard />
    </Container>
  );
}
