import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import MonthSwiperContainer from './MonthSwiperContainer';
import BreakDownContainer from './BreakDownContainer';

const Container = styled.header(mediaquery({
  width: ['100%', '100%', '100%', '80%', '50%'],
  height: ['5em', '5em', '7em', '8em', '7em'],
  margin: [
    '1em auto',
    '1em auto',
    '1em auto',
    '1.5em auto',
    '0 auto',
  ],
  borderRadius: '0.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
}));

export default function StateBarCard() {
  return (
    <Container>
      <MonthSwiperContainer />
      <BreakDownContainer />
    </Container>
  );
}
