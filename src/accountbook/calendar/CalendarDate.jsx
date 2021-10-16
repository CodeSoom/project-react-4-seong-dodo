import React, { useState } from 'react';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import DateData from './DateData';

const DateBox = styled.div(mediaquery({
  width: '10em',
  height: ['10em', '10em', '10em', '11em', '12em', '12em'],
  padding: '0.4em',
  borderBottom: `${colors.gray_backgroud} solid 1px`,
  fontSize: ['0.5em', '0.6em', '0.6em', '0.8em', '0.9em', '0.9em'],
  lineHeight: [2, 2.5, 2.5, 3, 3, 3],
  cursor: 'pointer',
  overflow: 'hidden',
}));

const TodayColor = {
  color: `${colors.teal_text}`,
  fontWeight: '600',
};

const OtherColor = {
  color: `${colors.gray_text04}`,
};

const BasicColor = {
  color: `${colors.gray_text}`,
};

const SaturdayColor = {
  color: `${colors.blue_text}`,
};

const SundayColor = {
  color: `${colors.red_text}`,
};

export default function CalendarDate({
  currentMonth, year, month, date, day, monthlyTransaction, onClick,
}) {
  const [today] = useState(new Date());

  function handleClick() {
    if (currentMonth === month) {
      onClick(date, day);
    }
  }

  const dateColorStyle = () => {
    if (day === 6 && currentMonth === month) {
      if (year === today.getFullYear()
      && month === today.getMonth() + 1
      && date === today.getDate()) {
        return TodayColor;
      }
      return SaturdayColor;
    }
    if (day === 0 && currentMonth === month) {
      if (year === today.getFullYear()
      && month === today.getMonth() + 1
      && date === today.getDate()) {
        return TodayColor;
      }
      return SundayColor;
    }
    if (year === today.getFullYear()
    && month === today.getMonth() + 1
    && date === today.getDate()) {
      return TodayColor;
    }
    if (currentMonth !== month) {
      return OtherColor;
    }
    return BasicColor;
  };

  const histories = monthlyTransaction.find(
    (daily) => daily.year === year
  && daily.month === month
  && daily.date === date
  && daily.day === day,
  );

  return (
    <DateBox
      style={dateColorStyle()}
    >
      <div
        onClick={handleClick}
        role="presentation"
      >
        {date}
        {
          histories === undefined ? null
            : (
              <DateData
                histories={histories}
              />
            )
        }
      </div>
    </DateBox>
  );
}
