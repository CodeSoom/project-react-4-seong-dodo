import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import CalendarDays from './CalendarDays';
import CalendarMonth from './CalendarMonth';
import TransactionModal from '../transaction/TransactionModal';

import { get } from '../utils/utils';

import {
  setDailyData,
} from '../slice';

const CalendarBox = styled.div({
  minHeight: '20em',
  margin: '1.5em auto',
});

export default function CalendarContainer() {
  const dispatch = useDispatch();
  const [isDisplay, setDisplay] = useState(false);

  const month = useSelector(get('month'));
  const year = useSelector(get('year'));
  const dailyData = useSelector(get('dailyData'));
  const monthlyTransaction = useSelector(get('monthlyTransaction'));

  const handleOpenModal = (date, day) => {
    setDisplay(!isDisplay);
    dispatch(setDailyData({ date, day }));
  };

  return (
    <CalendarBox>
      <CalendarDays />
      <CalendarMonth
        month={month}
        year={year}
        onClick={handleOpenModal}
      />
      <div>
        {
          isDisplay === true
            ? (
              <TransactionModal
                monthlyTransaction={monthlyTransaction}
                dailyData={dailyData}
                onClick={handleOpenModal}
              />
            )
            : null
        }
      </div>
    </CalendarBox>
  );
}
