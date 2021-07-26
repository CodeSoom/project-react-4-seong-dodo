import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const Container = styled.div(mediaquery({
  float: 'left',
  width: '60%',
  margin: ['.5em auto', '.8em auto', '1.1em auto', '1.5em auto', '1.7em auto'],
  padding: '.2em',
  borderLeft: `${colors.gray_backgroud} solid .2em`,
  '& div': {
    padding: ['4em', '.8em', '.5em', '.6em', '.6em'],
    fontSize: ['.1em', '.4em', '.6em', '.7em', '.8em'],
    fontWeight: '600',
    textAlign: 'left',
    lineHeight: ['.1em', '.4em', '.6em', '.7em', '.8em'],
  },
}));

export default function BreakDownContainer() {
  return (
    <Container>
      <div>
        수입
      </div>
      <div>
        지출
      </div>
    </Container>
  );
}
