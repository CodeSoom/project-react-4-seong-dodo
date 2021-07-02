import styled from '@emotion/styled';

import BudgetContainer from './BudgetContainer';

const Container = styled.div({
  width: '90%',
  height: '50%',
  margin: '8em auto',
  textAlign: 'center',
});

export default function BudgetPage() {
  return (
    <Container>
      <BudgetContainer />
    </Container>
  );
}
