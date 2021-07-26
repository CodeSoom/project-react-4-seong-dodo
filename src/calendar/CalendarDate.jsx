import styled from '@emotion/styled';
import colors from '../style/colors';

const WeekBox = styled.div({
  width: '20em',
  height: '12em',
  padding: '.4em',
  borderBottom: `${colors.gray_backgroud} solid .1em`,
  color: `${colors.gray_text}`,
  fontSize: '.3em',
  lineHeight: '5em',
});

export default function CalendarDate({ date, day, onClick }) {
  return (
    <WeekBox>
      <div
        onClick={() => onClick(date, day)}
        role="presentation"
      >
        {date}
      </div>
    </WeekBox>
  );
}
