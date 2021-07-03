import styled from '@emotion/styled';

import MonthlyBudgetContainer from './MonthlyBudgetContainer';
import TabBar from './TabBar';

const BodyContainer = styled.div({
  width: '90%',
  height: '50%',
  margin: '12em auto',
  textAlign: 'center',
});

export default function CalendarPage() {
  return (
    <BodyContainer>
      <MonthlyBudgetContainer />
      <div>
        서비스가 업데이트 될 예정입니다.
      </div>
      <TabBar />
    </BodyContainer>
  );
}
