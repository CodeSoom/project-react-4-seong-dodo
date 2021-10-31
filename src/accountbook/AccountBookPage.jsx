import {
  Link,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import TabBarCard from './tabBar/TabBarCard';

export default function AccountBookPage() {
  return (
    <Container>
      <LinkLayout>
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
      </LinkLayout>
      <TabBarCard />
    </Container>
  );
}

const Container = styled.div(mediaquery({
  margin: '0 auto',
  padding: 0,
  textAlign: 'center',
}));

const LinkLayout = styled.div(mediaquery({
  width: '100%',
  height: ['26em', '21.5em', '25em', '41.5em', '55em', '68em'],
  margin: [
    '6em auto 0',
    '4em auto 0',
    '5em auto 0',
    '7em auto 0',
    '10em auto 0',
    '12em auto 0',
  ],
}));

const LinkBox = styled.div(mediaquery({
  width: ['12em', '12em', '12em', '19em', '16em', '20em'],
  height: ['5em', '6em', '5em', '6em', '5em', '7em'],
  margin: '0 auto 1.5em',
  borderRadius: '0.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['1.2em', '1.3em', '1.4em', '2em', '3em', '3em'],
  textAlign: 'center',
  '& a': {
    color: `${colors.white}`,
    fontWeight: 'bold',
    lineHeight: [5, 6, 5, 6, 5, 7],
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.white}`,
    },
  },
}));
