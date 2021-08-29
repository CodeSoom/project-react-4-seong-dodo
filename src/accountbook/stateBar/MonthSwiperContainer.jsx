import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import MonthButton from './MonthButton';
import MonthItem from './MonthItem';

import {
  setPreviousMonth,
  setNextMonth,
} from '../../reducers/accountbook';

const Container = styled.header(mediaquery({
  float: 'left',
  width: '40%',
  height: '100%',
  margin: '0 auto',
}));

export default function MonthSwiperContainer() {
  const dispatch = useDispatch();

  const { year, month } = useSelector((state) => ({
    year: state.accountbook.year,
    month: state.accountbook.month,
  }));

  const handleChangePreviousMonth = () => {
    if (month > 0) {
      dispatch(setPreviousMonth({ month }));
    }
  };

  const handleChangeNextMonth = () => {
    if (month < 13) {
      dispatch(setNextMonth({ month }));
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
