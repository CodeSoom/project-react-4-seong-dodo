import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import StateBarCard from '../stateBar/StateBarCard';
import CalendarContainer from './CalendarContainer';
import TabBarCard from '../tabBar/TabBarCard';

const Container = styled.div(mediaquery({
  margin: '0 auto',
  padding: 0,
  textAlign: 'center',
}));

const Layout = styled.div(mediaquery({
  width: '100%',
  margin: [
    '1em auto 0',
    '1em auto 0',
    '1em auto 0',
    '2em auto 0',
    '2em auto 0',
    '2em auto 0',
  ],
}));

export default function CalendarPage() {
  return (
    <Container>
      <Layout>
        <StateBarCard />
        <CalendarContainer />
      </Layout>
      <TabBarCard />
    </Container>
  );
}
