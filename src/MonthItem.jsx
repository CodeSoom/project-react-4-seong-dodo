import styled from '@emotion/styled';
import mediaquery from './style/mediaquery';

const Year = styled.div(mediaquery({
  height: ['6em', '3em', '2em', '2em', '1.8em'],
  margin: '.2em',
  textAlign: 'center',
  fontSize: ['.2em', '.6em', '.8em', '.9em', '1em'],
  lineHeight: ['6em', '3em', '2em', '2em', '1.8em'],
}));

const Month = styled.div(mediaquery({
  width: '50%',
  height: ['2em', '1em', '1.5em', '1.5em', '1.8em'],
  margin: '0 auto',
  fontSize: ['0.7em', '1em', '1.1em', '1.7em', '1.8em'],
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: ['2em', '1em', '1.5em', '1.5em', '1.8em'],
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
