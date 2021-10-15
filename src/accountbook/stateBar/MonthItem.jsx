import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

const Year = styled.div(mediaquery({
  height: ['3em', '3em', '3em', '2em', '2em'],
  margin: '0.2em',
  textAlign: 'center',
  fontSize: ['0.7em', '0.7em', '0.9em', '1.2em', '1.4em'],
  lineHeight: ['3em', '3em', '3em', 2, 3],
}));

const Month = styled.div(mediaquery({
  width: '50%',
  height: ['1em', '1em', '1.5em', '2em', '2em'],
  margin: '0 auto',
  fontSize: ['1em', '1em', '1.5em', '2em', '2.2em'],
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: ['1em', '1em', '1.5em', 2, 2.5],
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
