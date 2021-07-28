import styled from '@emotion/styled';
import colors from '../style/colors';

const DateBox = styled.div({
  width: '20em',
  height: '12em',
  padding: '.4em',
  borderBottom: `${colors.gray_backgroud} solid .1em`,
  color: `${colors.gray_backgroud}`,
  fontSize: '.3em',
  lineHeight: '5em',
});

const BasicColor = {
  color: `${colors.gray_text}`,
};

const SaturdayColor = {
  color: `${colors.blue_text}`,
};

const SundayColor = {
  color: `${colors.red_text}`,
};

export default function CalendarDate({ date, day, onClick }) {
  function dateColorStyle() {
    if (day === 6) {
      return SaturdayColor;
    }
    if (day === 0) {
      return SundayColor;
    }
    return BasicColor;
  }

  return (
    <DateBox
      style={dateColorStyle()}
    >
      <div
        onClick={() => onClick(date, day)}
        role="presentation"
      >
        {date}
      </div>
    </DateBox>
  );
}
