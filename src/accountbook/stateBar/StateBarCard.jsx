import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import MonthSwiperContainer from './MonthSwiperContainer';
import BreakDownContainer from './BreakDownContainer';

const Container = styled.header(mediaquery({
  width: ['100%', '100%', '100%', '80%', '80%'],
  height: ['5em', '5em', '7em', '8em', '10em'],
  margin: [
    '1em auto',
    '1em auto',
    '1em auto',
    '1.5em auto',
    '1.5em auto',
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
