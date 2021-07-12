import styled from '@emotion/styled';
import colors from './style/colors';

const Container = styled.div({
  position: 'relative',
  float: 'right',
  width: '60%',
  bottom: '1.6em',
  margin: '0 auto',
  padding: '.2em',
  borderLeft: `${colors.gray_backgroud} solid .2em`,
  '& div': {
    padding: '.3em .8em',
    fontSize: '1em',
    fontWeight: '600',
    textAlign: 'left',
    lineHeight: '1em',
  },
});

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
