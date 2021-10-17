import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const CountBox = styled.div(mediaquery({
  // width: ['95%', '95%', '95%', '95%', '95%', '38em'],
  margin: '0 auto',
  borderBottom: `${colors.gray_backgroud} solid 1px`,
  fontSize: ['0.7em', '0.7em', '0.7em', '0.9m', '0.8em'],
  color: `${colors.gray_text03}`,
  textAlign: 'left',

  backgroundColor: 'azure',
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
