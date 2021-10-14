/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import CalendarDays from './CalendarDays';
import CalendarMonth from './CalendarMonth';
import Loading from '../../loading/Loading';
import DailyTransactionModal from '../dailyTransaction/DailyTransactionModal';

import {
  setDailyData,
  clearTransactionFields,
  loadMonthlyTransaction,
} from '../../reducers/accountbook';

const CalendarBox = styled.div({
  // minHeight: '20em',
  margin: '1.5em auto',
});

export default function CalendarContainer() {
  const dispatch = useDispatch();

  const [isDisplay, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    accessToken, year, month, dailyData, monthlyTransaction,
  } = useSelector((state) => ({
    accessToken: state.user.accessToken,
    year: state.accountbook.year,
    month: state.accountbook.month,
    dailyData: state.accountbook.dailyData,
    monthlyTransaction: state.accountbook.monthlyTransaction,
  }));

  useEffect(async () => {
    setIsLoading(true);
    if (accessToken) {
      await dispatch(loadMonthlyTransaction({
        accessToken,
        year,
        month,
        date: 1,
      }));
    }
    setIsLoading(false);
  }, []);

  const handleOpenModal = async (date, day) => {
    if (accessToken === '' || accessToken === undefined) {
      alert('로그인이 필요한 서비스 입니다.');
      return;
    }
    if (accessToken !== '' || accessToken !== undefined) {
      setDisplay(!isDisplay);
      dispatch(setDailyData({ date, day }));
      if (isDisplay) {
        setIsLoading(true);
      }
      await dispatch(loadMonthlyTransaction({
        accessToken,
        year,
        month,
        date: 1,
      }));
      dispatch(clearTransactionFields());
      setIsLoading(false);
    }
  };

  return (
    <CalendarBox>
      {
        isLoading
          ? <Loading />
          : (
            <>
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
                        onClick={handleOpenModal}
                      />
                    )
                    : null
                }
              </div>
            </>
          )
      }
    </CalendarBox>
  );
}
