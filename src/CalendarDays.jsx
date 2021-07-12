import React, { useState } from 'react';

import styled from '@emotion/styled';
import colors from './style/colors';

const DaysBox = styled.div({
  margin: '0 auto ',
  textAlign: 'center',
});

const DaysRow = styled.div({
  display: 'flex',
  width: '40em',
  height: '3em',
  margin: '0 auto',
  lineHeight: '3.5em',
});

const Day = styled.div({
  width: '8em',
  borderBottom: `${colors.gray_backgroud} solid .1em`,
  color: `${colors.gray_text02}`,
  fontSize: '.8em',
});

export default function CalendarDays() {
  const [days] = useState(['일', '월', '화', '수', '목', '금', '토']);

  return (
    <DaysBox>
      <DaysRow>
        {
          days.map((day) => (
            <Day
              key={day}
            >
              {day}
            </Day>
          ))
        }
      </DaysRow>
    </DaysBox>
  );
}
