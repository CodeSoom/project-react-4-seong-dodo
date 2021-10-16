import React, { useState } from 'react';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const DaysBox = styled.div({
  margin: '0 auto',
  textAlign: 'center',
});

const DaysRow = styled.div(mediaquery({
  display: 'flex',
  width: ['14em', '17em', '17em', '38em', '45em', '55em'],
  height: ['2em', '2em', '2em', '3em', '4em', '5em'],
  margin: '0 auto',
  lineHeight: [3.5, 3.5, 3.5, 4, 5, 6],
}));

const Day = styled.div(mediaquery({
  width: '10em',
  borderBottom: `${colors.gray_backgroud} solid 1px`,
  color: `${colors.gray_text02}`,
  fontSize: ['0.6em', '0.7em', '0.7em', '0.9em', '1.1em', '1.2em'],
}));

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
