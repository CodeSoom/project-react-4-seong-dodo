import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

const Year = styled.div(mediaquery({
  height: ['2.5m', '2.2em', '2em', '2em', '2.4em', '2.5em'],
  margin: '0.2em',
  fontSize: ['0.7em', '0.8em', '0.8em', '1.3em', '1.6em', '2em'],
  textAlign: 'center',
  lineHeight: [2.5, 2.2, 2, 2, 2.4, 2.5],
}));

const Month = styled.div(mediaquery({
  width: '50%',
  height: ['1.5em', '1.5em', '2em', '1.5em', '1.7em', '1.5em'],
  margin: '0 auto',
  fontSize: ['1em', '1.1em', '1.1em', '2.2em', '2.4em', '2.6em'],
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: [1.5, 1.5, 2, 1.5, 1.7, 1.5],
}));

export default function MonthItem({ year, month }) {
  return (
    <>
      <Year>
        {year}
      </Year>
      <Month>
        {month}
        월
      </Month>
    </>
  );
}
