import styled from '@emotion/styled';
import colors from './style/colors';

import CloseModalButton from './CloseModalButton';
import Transaction from './Transaction';
import AddTransactionButton from './AddTransactionButton';

const Container = styled.div({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  backgroundColor: `${colors.teal_modal}`,
  paddingTop: '100px',
  zIndex: 1,
  overflow: 'auto',
});

const TextBox = styled.div({
  bottom: 0,
  width: '80%',
  height: '90%',
  margin: 'auto',
  padding: '20px',
  border: `${colors.teal_border} solid 1px`,
  borderRadius: '.4em',
  color: `${colors.gray_text02}`,
  backgroundColor: `${colors.white}`,
});

const DateBox = styled.div({
  width: '40%',
  margin: '2em',
  fontSize: '1em',
  textAlign: 'left',
});

const Box = styled.div({
  width: '45%',
  height: '65%',
  margin: '3em',
  fontSize: '.8em',
  overflow: 'auto',
});

export default function TransactionModal({ dailyTransaction, onClick }) {
  const { date, day } = dailyTransaction;

  function convertDay() {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[day];
  }

  return (
    <Container>
      <TextBox>
        <CloseModalButton
          onClick={onClick}
        />
        <DateBox>
          {date}
          일
          {' '}
          {convertDay()}
          요일
        </DateBox>
        <Box>
          <Transaction
            dailyTransaction={dailyTransaction}
          />
        </Box>
        <AddTransactionButton />
      </TextBox>
    </Container>
  );
}
