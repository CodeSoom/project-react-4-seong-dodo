import styled from '@emotion/styled';

import CalendarDate from './CalendarDate';

const WeekRowBox = styled.div({
  display: 'flex',
  width: '40em',
  margin: '0 auto',
});

export default function CalendarWeeks({ week, onClick }) {
  return (
    <WeekRowBox>
      {
        week.map((date) => (
          <CalendarDate
            date={date.date}
            day={date.day}
            onClick={onClick}
          />
        ))
      }
    </WeekRowBox>
  );
}
