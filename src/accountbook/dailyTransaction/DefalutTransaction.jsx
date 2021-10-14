import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const CountBox = styled.div(mediaquery({
  width: '95%',
  margin: '0 auto',
  padding: '0.2em 0.5em',
  borderBottom: `${colors.gray_backgroud} solid 1px`,
  fontSize: ['0.7em', '0.7em', '0.7em', '.8em', '.8em'],
  color: `${colors.gray_text03}`,
  textAlign: 'left',
}));

export default function DefalutTransaction() {
  return (
    <CountBox>
      총
      {' '}
      0
      {' '}
      건
    </CountBox>
  );
}
