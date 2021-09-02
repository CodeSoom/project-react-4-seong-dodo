import {
  Link,
} from 'react-router-dom';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import TabBarCard from './tabBar/TabBarCard';

const Container = styled.div({
  width: '90%',
  height: '50%',
  margin: '.5em auto',
  textAlign: 'center',
});

const LinkBox = styled.div(mediaquery({
  width: '60%',
  height: ['3.5em', '3.5em', '3.5em', '3em', '3.5em'],
  margin: ['.6em auto', '.6em auto', '.8em auto', '.8em auto', '.8em auto'],
  borderRadius: '.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['.6em', '1.2em', '1.4em', '2.5em', '3em'],
  textAlign: 'center',
  '& a': {
    color: `${colors.white}`,
    fontWeight: 'bold',
    lineHeight: ['3.5em', '3.5em', '3.5em', '3em', '3.5em'],
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
