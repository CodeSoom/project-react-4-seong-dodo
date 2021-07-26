import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../style/mediaquery';

import { get } from '../utils/utils';

import MonthButton from './MonthButton';
import MonthItem from './MonthItem';

import {
  setPreviousMonth,
  setNextMonth,
} from '../slice';

const Container = styled.header(mediaquery({
  float: 'left',
  width: '40%',
  height: '100%',
  margin: '0 auto',
}));

export default function MonthSwiperContainer() {
  const dispatch = useDispatch();

  const month = useSelector(get('month'));
  const year = useSelector(get('year'));

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
        onclick={handleChangePreviousMonth}
      />
      <MonthButton
        direction="&gt;"
        onclick={handleChangeNextMonth}
      />
    </Container>
  );
}
