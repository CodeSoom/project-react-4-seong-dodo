import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import StateBarCard from '../stateBar/StateBarCard';
import BudgetContainer from './BudgetContainer';
import TabBarCard from '../tabBar/TabBarCard';

const Container = styled.div({
  margin: '0 auto',
  padding: 0,
  textAlign: 'center',

  // backgroundColor: 'rgb(232, 191, 155)',
});

const Layout = styled.div(mediaquery({
  width: '100%',
  height: ['30em', '23.5em', '28em', '45.5em', '62em', '76.5em'],
  margin: [
    '2em auto 0',
    '2em auto 0',
    '2em auto 0',
    '3em auto 0',
    '3em auto 0',
    '3em auto 0',
  ],

  // backgroundColor: ['beige', 'pink', 'gray', 'skyblue', 'green', 'plum'],
}));

export default function BudgetPage() {
  return (
    <Container>
      <Layout>
        <StateBarCard />
        <BudgetContainer />
      </Layout>
      <TabBarCard />
    </Container>
  );
}
