import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

const Year = styled.div(mediaquery({
  height: ['3em', '3em', '3em', '2em', '1.8em'],
  margin: '0.2em',
  textAlign: 'center',
  fontSize: ['0.7em', '0.7em', '0.9em', '1.2em', '1em'],
  lineHeight: ['3em', '3em', '3em', 2, '1.8em'],
}));

const Month = styled.div(mediaquery({
  width: '50%',
  height: ['1em', '1em', '1.5em', '2em', '1.8em'],
  margin: '0 auto',
  fontSize: ['1em', '1em', '1.5em', '2em', '1.8em'],
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: ['1em', '1em', '1.5em', 2, '1.8em'],
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
