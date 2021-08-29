import styled from '@emotion/styled';

import StateBarCard from '../stateBar/StateBarCard';
import BudgetContainer from './BudgetContainer';
import TabBarCard from '../tabBar/TabBarCard';

const Container = styled.div({
  width: '90%',
  height: '50%',
  margin: '.5em auto',
  textAlign: 'center',
});

export default function BudgetPage() {
  return (
    <Container>
      <StateBarCard />
      <BudgetContainer />
      <TabBarCard />
    </Container>
  );
}
