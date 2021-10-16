import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import MonthButton from './MonthButton';
import MonthItem from './MonthItem';

import {
  loadMonthlyTransaction,
  setPreviousMonth,
  setNextMonth,
} from '../../reducers/accountbook';

const Container = styled.div(mediaquery({
  float: 'left',
  width: '40%',
  height: '100%',
  margin: '0 auto',
}));

export default function MonthSwiperContainer() {
  const dispatch = useDispatch();

  const { accessToken, year, month } = useSelector((state) => ({
    accessToken: state.user.accessToken,
    year: state.accountbook.year,
    month: state.accountbook.month,
  }));

  const handleChangePreviousMonth = () => {
    if (month > 0) {
      dispatch(setPreviousMonth({ month }));
      if (month === 1) {
        dispatch(loadMonthlyTransaction({
          accessToken,
          year: year - 1,
          month: month + 11,
          date: 1,
        }));
      } else {
        dispatch(loadMonthlyTransaction({
          accessToken,
          year,
          month: month - 1,
          date: 1,
        }));
      }
    }
  };

  const handleChangeNextMonth = () => {
    if (month < 13) {
      dispatch(setNextMonth({ month }));
      if (month === 12) {
        dispatch(loadMonthlyTransaction({
          accessToken,
          year: year + 1,
          month: month - 11,
          date: 1,
        }));
      } else {
        dispatch(loadMonthlyTransaction({
          accessToken,
          year,
          month: month + 1,
          date: 1,
        }));
      }
    }
  };

  return (
    <Container>
      <MonthItem
        year={year}
        month={month}
      />
      <MonthButton
        direction="&lt;"
        onClick={handleChangePreviousMonth}
      />
      <MonthButton
        direction="&gt;"
        onClick={handleChangeNextMonth}
      />
    </Container>
  );
}
