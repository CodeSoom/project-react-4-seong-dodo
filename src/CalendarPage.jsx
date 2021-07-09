import styled from '@emotion/styled';

import MonthlyBudgetContainer from './MonthlyBudgetContainer';
import CalendarContainer from './CalendarContainer';
import TabBar from './TabBar';

const BodyContainer = styled.div({
  width: '90%',
  height: '50%',
  margin: '.5em auto',
  textAlign: 'center',
});

export default function CalendarPage() {
  return (
    <BodyContainer>
      <MonthlyBudgetContainer />
      <CalendarContainer />
      <TabBar />
    </BodyContainer>
  );
}
