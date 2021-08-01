import styled from '@emotion/styled';
import mediaquery from '../style/mediaquery';

import CalendarDate from './CalendarDate';

const WeekRowBox = styled.div(mediaquery({
  display: 'flex',
  width: ['12em', '19em', '30em', '35em', '40em'],
  margin: '0 auto',
}));

export default function CalendarWeeks({ currentMonth, week, onClick }) {
  return (
    <WeekRowBox>
      {
        week.map((date) => (
          <CalendarDate
            currentMonth={currentMonth}
            year={date.year}
            month={date.month}
            date={date.date}
            day={date.day}
            onClick={onClick}
          />
        ))
      }
    </WeekRowBox>
  );
}
