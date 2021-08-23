import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import CalendarDays from './CalendarDays';
import CalendarMonth from './CalendarMonth';
import DailyTransactionModal from '../dailyTransaction/DailyTransactionModal';

import { get } from '../utils/utils';

import {
  setDailyData,
  clearTransactionFields,
} from '../slice';

const CalendarBox = styled.div({
  minHeight: '20em',
  margin: '1.5em auto',
});

export default function CalendarContainer() {
  const dispatch = useDispatch();
  const [isDisplay, setDisplay] = useState(false);

  const year = useSelector(get('year'));
  const month = useSelector(get('month'));
  const dailyData = useSelector(get('dailyData'));
  const monthlyTransaction = useSelector(get('monthlyTransaction'));

  const handleOpenModal = (date, day) => {
    setDisplay(!isDisplay);
    dispatch(setDailyData({ date, day }));
    dispatch(clearTransactionFields());
  };

  return (
    <CalendarBox>
      <CalendarDays />
      <CalendarMonth
        year={year}
        month={month}
        monthlyTransaction={monthlyTransaction}
        onClick={handleOpenModal}
      />
      <div>
        {
          isDisplay === true
            ? (
              <DailyTransactionModal
                dailyData={dailyData}
                monthlyTransaction={monthlyTransaction}
                onClick={handleOpenModal}
              />
            )
            : null
        }
      </div>
    </CalendarBox>
  );
}
