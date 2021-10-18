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
    'none',
  ],
  borderLeft: [
    'none',
    'none',
    'none',
    'none',
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
  ],
  overflow: 'auto',
}));

const Box = styled.div(mediaquery({
  width: ['13.7em', '14.8em', '17.5em', '34.5em', '21.3em', '27.7em'],
  height: ['13.3em', '12.6em', '14.6em', '17.9em', '28em', '24em'],
  margin: [0, 0, 0, 0, '0.5em', '0.5em'],
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
