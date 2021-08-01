import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import TransactionInputContainer from './TransactionInputContainer';

const Container = styled.div(mediaquery({
  width: '100%',
  height: '100%',
  padding: '.5em',
  borderTop: [
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
    'none',
    'none',
  ],
  borderLeft: [
    'none',
    'none',
    'none',
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
  ],
  overflow: 'auto',
}));

export default function TransactionDetailModal() {
  return (
    <Container>
      <TransactionInputContainer />
    </Container>
  );
}
