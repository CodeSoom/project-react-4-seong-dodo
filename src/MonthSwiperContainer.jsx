import { useDispatch, useSelector } from 'react-redux';

import { get } from './utils';

import MonthButton from './MonthButton';
import MonthItem from './MonthItem';

import {
  setPreviousMonth,
  setNextMonth,
} from './slice';

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
    <>
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
    </>
  );
}
