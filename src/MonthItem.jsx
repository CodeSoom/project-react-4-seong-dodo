import styled from '@emotion/styled';

const Year = styled.div({
  width: '35%',
  height: '1.8em',
  margin: '.2em',
  textAlign: 'center',
  fontSize: '1em',
  lineHeight: '1.8em',
});

const Month = styled.div({
  float: 'left',
  width: '35%',
  height: '1.8em',
  margin: '0 auto',
  fontSize: '2.2em',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: '1.8em',
});

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
