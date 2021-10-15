import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import BreakdownContainer from './BreakdownContainer';
import TypeContainer from './TypeContainer';
import CategoryContainer from './CategoryContainer';
import InputFieldsContainer from './InputFieldsContainer';
import SubmitContainer from './SubmitContainer';

const Container = styled.div(mediaquery({
  width: '100%',
  height: '100%',
  padding: '0.5em 0 0',
  borderTop: [
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
    'none',
  ],
  borderLeft: [
    'none',
    'none',
    'none',
    'none',
    `${colors.gray_backgroud} solid 1px`,
  ],
  overflow: 'auto',
}));

const Box = styled.div(mediaquery({
  margin: [
    '0 auto',
    '0 auto',
    '0 auto',
    '0 auto',
    '1em auto'],
  width: ['100%', '100%', '100%', '100%', '95%'],
  height: ['100%', '100%', '100%', '100%', '95%'],
  border: `1px solid ${colors.gray_backgroud}`,
  borderRadius: '0.5em',
  color: `${colors.gray_test02}`,
}));

export default function TransactionDetailModal({ load }) {
  return (
    <Container>
      <Box>
        <BreakdownContainer />
        <TypeContainer />
        <CategoryContainer />
        <InputFieldsContainer />
        <SubmitContainer load={load} />
      </Box>
    </Container>
  );
}
