import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import MonthSwiperContainer from './MonthSwiperContainer';
import BreakDownContainer from './BreakDownContainer';

const Container = styled.header(mediaquery({
  width: ['80%', '80%', '70%', '60%', '50%'],
  height: ['3em', '3.5em', '4.5em', '6em', '7em'],
  margin: '0 auto',
  borderRadius: '.2em',
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
