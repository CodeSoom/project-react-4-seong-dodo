import styled from '@emotion/styled';
import colors from './style/colors';

const WeekRow = styled.div({
  display: 'flex',
  width: '40em',
  margin: '0 auto',
});

const Week = styled.div({
  width: '20em',
  height: '12em',
  padding: '.4em',
  borderBottom: `${colors.gray_backgroud} solid .1em`,
  color: `${colors.gray_text}`,
  fontSize: '.3em',
  lineHeight: '5em',
});

export default function CalendarDates({ month, year }) {
  const lastDateOfPreviousMonth = new Date(year, month - 1, 0).getDate();
  const lastDayOfPreviousMonth = new Date(year, month - 1, 0).getDay();

  const lastDateOfThisMonth = new Date(year, month, 0).getDate();
  const lastDayOfThisMonth = new Date(year, month, 0).getDay();

  const PreviousDates = [];
  const thisDates = [...Array(lastDateOfThisMonth + 1).keys()].slice(1);
  const nextDates = [];

  if (lastDayOfPreviousMonth !== 6) {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < lastDayOfPreviousMonth + 1; i++) {
      PreviousDates.unshift(lastDateOfPreviousMonth - i);
    }
  }
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i < 7 - lastDayOfThisMonth; i++) {
    nextDates.push(i);
  }

  const dates = PreviousDates.concat(thisDates, nextDates);

  const weeks = [];

  for (let i = 0; i <= 35; i += 7) {
    weeks.push([...dates].slice(i, i + 7));
  }

  return weeks.map((week) => (
    <WeekRow
      key={week}
    >
      {
        week.map((date) => (
          <Week
            key={date}
          >
            {date}
          </Week>
        ))
      }
    </WeekRow>
  ));
}
