import styled from '@emotion/styled';
import colors from './style/colors';

import MonthSwiperContainer from './MonthSwiperContainer';
import BreakDownContainer from './BreakDownContainer';

const Container = styled.header({
  position: 'relative',
  width: '50%',
  height: '7em',
  margin: '0 auto',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
});

export default function StateBarCard() {
  return (
    <Container>
      <MonthSwiperContainer />
      <BreakDownContainer />
    </Container>
  );
}
