import { useSelector } from 'react-redux';

import styled from '@emotion/styled';

import CalendarDates from './CalendarDates';
import CalendarDays from './CalendarDays';

import { get } from './utils';

const CalendarContainer = styled.div({
  width: '40em',
  minHeight: '20em',
  margin: '1.5em auto',
});

export default function Calendar() {
  const month = useSelector(get('month'));
  const year = useSelector(get('year'));

  const days = ['일', '월', '화', '수', '목', '금', '토'];

  return (
    <CalendarContainer>
      <CalendarDays
        days={days}
      />

      <CalendarDates
        month={month}
        year={year}
      />
    </CalendarContainer>
  );
}
