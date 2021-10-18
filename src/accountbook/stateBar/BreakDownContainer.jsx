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
    '1em 0.4em',
    '1.3em 0.4em',
    '1.2em 0.4em',
    '2.2em 0.4em',
    '3.5em 0.4em',
    '4.5em 0.4em',
  ],
}));

const TypeBox = styled.div(mediaquery({
  float: 'left',
  width: ['12em', '15em', '15em', '24em', '23em', '22em'],
  heiht: ['2em', '1.5em', '2em', '2em', '2em', '2em'],
  margin: '0 auto',
  padding: 0,
  borderLeft: [
    `${colors.gray_backgroud} solid 4px`,
    `${colors.gray_backgroud} solid 4px`,
    `${colors.gray_backgroud} solid 4px`,
    `${colors.gray_backgroud} solid 5px`,
    `${colors.gray_backgroud} solid 6px`,
    `${colors.gray_backgroud} solid 7px`,
  ],
  fontSize: ['0.6em', '0.6em', '0.6em', '0.9em', '1.1em', '1.4em'],
  fontWeight: '600',
  lineHeight: [2.2, 1.7, 2.2, 2.3, 2.1, 2],
  textAlign: 'left',
}));

const LabelBox = styled.div(mediaquery({
  float: 'left',
  width: ['4em', '4em', '4em', '5em', '5em', '5em'],
  padding: '0 0.4em',
  textAlign: 'center',
  letterSpacing: '0.3em',
}));

const NumberBox = styled.div(mediaquery({
  float: 'left',
  width: ['9em', '14em', '12em', '15em', '16em', '16em'],
  padding: '0 1em',
  color: `${colors.teal_modal}`,
  fontSize: ['0.8em', '0.7em', '0.8em', '1.1em', '1em', '1em'],
  lineHeight: [2, 1.5, 2, 2, 2, 2],
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
