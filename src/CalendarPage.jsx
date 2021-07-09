import styled from '@emotion/styled';

import StateBarCard from './StateBarCard';
import CalendarContainer from './CalendarContainer';
import TabBarCard from './TabBarCard';

const Container = styled.div({
  width: '90%',
  height: '50%',
  margin: '.5em auto',
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
