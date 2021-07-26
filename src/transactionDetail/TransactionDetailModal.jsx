import styled from '@emotion/styled';
import colors from '../style/colors';

import TransactionInputContainer from './TransactionInputContainer';

const Container = styled.div({
  position: 'fixed',
  top: 180,
  right: 160,
  width: '37%',
  height: '55%',
  borderLeft: `${colors.gray_backgroud} solid 1px`,
  paddingTop: '3em',
  overflow: 'auto',
});

export default function TransactionDetailModal() {
  return (
    <Container>
      <TransactionInputContainer />
    </Container>
  );
}
