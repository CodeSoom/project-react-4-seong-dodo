import styled from '@emotion/styled';
import colors from './style/colors';

const TopContainer = styled.header({
  position: 'fixed',
  top: '8em',
  left: '25%',
  right: '25%',
  width: '50%',
  height: '7em',
  margin: '0 atuo',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
});

const Month = styled.div({
  float: 'left',
  width: '35%',
  margin: '.2em',
  fontSize: '3em',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '2em',
});

const Income = styled.div({
  float: 'right',
  width: '55%',
  height: '40%',
  margin: '.3em .5em',
  fontSize: '1em',
  fontWeight: '600',
  textAlign: 'left',
  lineHeight: '4em',
});

const Expense = styled.div({
  float: 'right',
  width: '55%',
  height: '40%',
  margin: '.3em .5em',
  fontSize: '1em',
  fontWeight: '600',
  textAlign: 'left',
  lineHeight: '1.2em',
});

export default function MonthlyBudgetContainer() {
  return (
    <TopContainer>
      <Month>
        12월
      </Month>
      <Income>
        수입
      </Income>
      <Expense>
        지출
      </Expense>
    </TopContainer>
  );
}
