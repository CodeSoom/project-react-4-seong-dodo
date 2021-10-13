import styled from '@emotion/styled';

import StateBarCard from '../stateBar/StateBarCard';
import CalendarContainer from './CalendarContainer';
import TabBarCard from '../tabBar/TabBarCard';

const Container = styled.div({
  width: '90%',
  margin: '0 auto',
  textAlign: 'center',
});

export default function CalendarPage() {
  return (
    <Container>
      <StateBarCard />
      <CalendarContainer />
      <TabBarCard />
    </Container>
  );
}
