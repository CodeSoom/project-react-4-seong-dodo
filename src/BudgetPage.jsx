import styled from '@emotion/styled';

import MonthlyBudgetContainer from './MonthlyBudgetContainer';
import BudgetContainer from './BudgetContainer';
import TabBar from './TabBar';

const BodyContainer = styled.div({
  width: '90%',
  height: '50%',
  margin: '.5em auto',
  textAlign: 'center',
});

export default function BudgetPage() {
  return (
    <BodyContainer>
      <MonthlyBudgetContainer />
      <BudgetContainer />
      <TabBar />
    </BodyContainer>
  );
}
