import { useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import { exchangeRegEX, replaceString } from '../../utils/utils';

const Container = styled.div(mediaquery({
  float: 'left',
  heiht: '100%',
  width: '60%',
  padding: [
    '1.4em 0.2em',
    '1.4em 0.2em',
    '1.7em 0.2em',
    '1.9em 0.2em',
    '2.7em 0.2em',
  ],
}));

const TypeBox = styled.div(mediaquery({
  float: 'left',
  width: '100%',
  heiht: '50%',
  margin: '0 auto',
  padding: '0 0.2em',
  borderLeft: `${colors.gray_backgroud} solid 3px`,
  fontSize: ['0.7em', '0.7em', '0.8em', '1em', '1.1em'],
  fontWeight: '600',
  lineHeight: [1.5, 1.5, 2.1, 2, 2],
  textAlign: 'left',
}));

const LabelBox = styled.div(mediaquery({
  float: 'left',
  width: ['35%', '35%', '35%', '20%', '20%'],
  padding: 0,
  textAlign: 'center',
  letterSpacing: '0.3em',
}));

const NumberBox = styled.div(mediaquery({
  float: 'left',
  width: ['65%', '65%', '65%', '80%', '80%'],
  padding: [
    '0 1.2em',
    '0 1.2em',
    '0 1.5em',
    '0 1.5em',
    '0 1.5em',
  ],
  fontSize: ['0.8em', '0.8em', '0.9em', '1em', '1em'],
  color: `${colors.teal_modal}`,
  lineHeight: [1.5, 1.5, 2.3, 2, 2],

  backgroundColor: 'biege',
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
      .reduce((sum, b) => sum + parseInt(replaceString(b.totalIncome), 10), 0);

    return exchangeRegEX(total);
  };

  const getTotalExpense = () => {
    const total = monthlyTransaction
      .filter(
        (monthly) => monthly.year === currentYear
      && monthly.month === currentMonth,
      )
      .reduce((sum, b) => sum + parseInt(replaceString(b.totalExpense), 10), 0);

    return exchangeRegEX(total);
  };

  return (
    <Container>
      {
        monthlyTransaction.length !== 0
          ? (
            <>
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
            </>
          )
          : (
            <>
              <TypeBox>
                <LabelBox>
                  수입
                </LabelBox>
                <NumberBox>
                  0
                  {' '}
                  원
                </NumberBox>
              </TypeBox>
              <TypeBox>
                <LabelBox>
                  지출
                </LabelBox>
                <NumberBox>
                  0
                  {' '}
                  원
                </NumberBox>
              </TypeBox>
            </>
          )
      }
    </Container>
  );
}
