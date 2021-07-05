import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from './style/colors';

import { get } from './utils';

import {
  setPreviousMonth,
  setNextMonth,
} from './slice';

const TopContainer = styled.header({
  position: 'fixed',
  top: '8em',
  left: '25%',
  width: '50%',
  height: '7em',
  margin: '0 auto',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
});

const Year = styled.div({
  width: '35%',
  height: '1.8em',
  margin: '.2em',
  textAlign: 'center',
  fontSize: '1em',
  lineHeight: '1.8em',
});

const MonthBox = styled.div({
  float: 'left',
  width: '35%',
  height: '1.8em',
  margin: '0 auto',
  fontSize: '2.2em',
  fontWeight: 'bold',
  textAlign: 'center',
  lineHeight: '1.8em',
});

const DecreaseButton = styled.button({
  position: 'absolute',
  width: '6%',
  height: '1.8em',
  left: '.2em',
  top: '1em',
});

const IncreaseButton = styled.button({
  position: 'absolute',
  width: '6%',
  height: '1.8em',
  left: '5.2em',
  fontWeight: 'bold',
});

const BudgetBox = styled.div({
  float: 'right',
  width: '60%',
  margin: '0 auto',
  padding: '.2em',
  borderLeft: `${colors.gray_backgroud} solid .2em`,
  '& div': {
    padding: '.3em .8em',
    fontSize: '1em',
    fontWeight: '600',
    textAlign: 'left',
    lineHeight: '1em',
  },
});

export default function MonthlyBudgetContainer() {
  const dispatch = useDispatch();

  const month = useSelector(get('month'));
  const year = useSelector(get('year'));

  const handleChangePreviousMonth = () => {
    if (month !== 0) {
      dispatch(setPreviousMonth({ month }));
    }
  };

  const handleChangeNextMonth = () => {
    if (month !== 13) {
      dispatch(setNextMonth({ month }));
    }
  };

  return (
    <TopContainer>
      <Year>{year}</Year>
      <MonthBox>
        <DecreaseButton
          type="button"
          onClick={handleChangePreviousMonth}
        >
          &lt;
        </DecreaseButton>
        {month}
        월
        <IncreaseButton
          type="button"
          onClick={handleChangeNextMonth}
        >
          &gt;
        </IncreaseButton>
      </MonthBox>
      <BudgetBox>
        <div>
          수입
        </div>
        <div>
          지출
        </div>
      </BudgetBox>
    </TopContainer>
  );
}
