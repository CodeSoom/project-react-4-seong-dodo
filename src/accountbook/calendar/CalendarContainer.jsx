import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import CalendarDays from './CalendarDays';
import CalendarMonth from './CalendarMonth';
import DailyTransactionModal from '../dailyTransaction/DailyTransactionModal';

import {
  setDailyData,
  clearTransactionFields,
} from '../../reducers/accountbook';

const CalendarBox = styled.div({
  minHeight: '20em',
  margin: '1.5em auto',
});

export default function CalendarContainer() {
  const dispatch = useDispatch();
  const [isDisplay, setDisplay] = useState(false);

  const {
    year, month, dailyData, monthlyTransaction,
  } = useSelector((state) => ({
    year: state.accountbook.year,
    month: state.accountbook.month,
    dailyData: state.accountbook.dailyData,
    monthlyTransaction: state.accountbook.monthlyTransaction,
  }));

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
