import { v4 as uuid } from 'uuid';

import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import CalendarDate from './CalendarDate';

const WeekRowBox = styled.div(mediaquery({
  display: 'flex',
  width: ['18em', '18em', '21em', '35em', '50em'],
  margin: '0 auto',
}));

export default function CalendarWeeks({
  currentMonth, week, monthlyTransaction, onClick,
}) {
  return (
    <WeekRowBox>
      {
        week.map((date) => (
          <CalendarDate
            key={uuid()}
            currentMonth={currentMonth}
            year={date.year}
            month={date.month}
            date={date.date}
            day={date.day}
            monthlyTransaction={monthlyTransaction}
            onClick={onClick}
          />
        ))
      }
    </WeekRowBox>
  );
}
