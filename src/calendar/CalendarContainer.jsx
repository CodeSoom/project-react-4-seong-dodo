import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import CalendarDays from './CalendarDays';
import CalendarMonth from './CalendarMonth';
import TransactionModal from '../transaction/TransactionModal';

import { get } from '../utils/utils';

import {
  setDailyTransaction,
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
  const dailyTransaction = useSelector(get('dailyTransaction'));

  const handleOpenModal = (date, day) => {
    setDisplay(!isDisplay);
    dispatch(setDailyTransaction({ date, day }));
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
                dailyTransaction={dailyTransaction}
                onClick={handleOpenModal}
              />
            )
            : null
        }
      </div>
    </CalendarBox>
  );
}
