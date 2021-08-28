import { useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Container = styled.div(mediaquery({
  float: 'left',
  heiht: '100%',
  width: '60%',
  padding: ['.7em 0.2em', '.7em 0.2em', '1.3em 0.2em', '1.85em 0.2em', '2.05em 0.2em'],
}));

const TypeBox = styled.div(mediaquery({
  float: 'left',
  width: '100%',
  margin: '0 auto',
  padding: '0 .2em',
  borderLeft: `${colors.gray_backgroud} solid .2em`,
  fontSize: ['.1em', '.4em', '.6em', '.7em', '.8em'],
  fontWeight: '600',
  lineHeight: ['.1em', '.4em', '.6em', '.7em', '.8em'],
  textAlign: 'left',
}));

const LabelBox = styled.div(mediaquery({
  float: 'left',
  width: ['50%', '35%', '30%', '20%', '20%'],
  padding: ['4em', '1.1em', '.5em', '.5em', '.5em'],
  textAlign: 'center',
  letterSpacing: '.3em',
}));

const NumberBox = styled.div(mediaquery({
  float: 'left',
  width: ['50%', '65%', '70%', '80%', '80%'],
  padding: ['4.5em', '1.2em', '.5em 1.5em', '.5em 1.5em', '.5em 1.5em'],
  fontSize: ['.1em', '.3em', '.5em', '.6em', '.9em'],
  color: `${colors.teal_modal}`,
  lineHeight: ['70em', '6em', '2em', '1.8em', '1.1em'],
}));

export default function BreakDownContainer() {
  const { currentYear, currentMonth, monthlyTransaction } = useSelector((state) => ({
    currentYear: state.accountbook.year,
    currentMonth: state.accountbook.month,
    monthlyTransaction: state.accountbook.monthlyTransaction,
  }));

  const getTotalIncome = () => {
    const total = monthlyTransaction
      .filter(
        (monthly) => monthly.year === currentYear
      && monthly.month === currentMonth,
      )
      .reduce((sum, b) => sum + b.totalIncome, 0);

    return parseInt(total, 10);
  };

  const getTotalExpense = () => {
    const total = monthlyTransaction
      .filter(
        (monthly) => monthly.year === currentYear
      && monthly.month === currentMonth,
      )
      .reduce((sum, b) => sum + b.totalExpense, 0);

    return parseInt(total, 10);
  };

  return (
    <Container>
      <TypeBox>
        <LabelBox>
          수입
        </LabelBox>
        <NumberBox>
          {getTotalIncome()}
          {' '}
          원
        </NumberBox>
      </TypeBox>
      <TypeBox>
        <LabelBox>
          지출
        </LabelBox>
        <NumberBox>
          {getTotalExpense()}
          {' '}
          원
        </NumberBox>
      </TypeBox>
    </Container>
  );
}
