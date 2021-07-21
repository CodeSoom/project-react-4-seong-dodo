import styled from '@emotion/styled';
import colors from './style/colors';

const Container = styled.div({
  width: '97%',
  height: '20%',
  margin: '1em .5em',
  padding: ' .5em',
  fontSize: '.8em',
});

const TypeBox = styled.div({
  float: 'left',
  width: '4em',
  height: '1.5em',
  padding: '0',
  borderRadius: '5em',
  backgroundColor: 'pink',
  fontSize: '.9em',
  lineHeight: '1.5em',
  opacity: 0.8,
});

const CategoryBox = styled.div({
  float: 'left',
  width: '8em',
  height: '2em',
  margin: '0 1em',
  padding: '.4em',
  borderRadius: '.2em',
  backgroundColor: `${colors.teal_border}`,
  opacity: 0.8,
});

const TextBox = styled.div({
  float: 'none',
  width: '35em',
  height: '2em',
  marginTop: '3em',
  marginLeft: '5em',
  padding: '0 1em',
  borderRadius: '3em',
  color: `${colors.gray_text}`,
  fontSize: '.8em',
  textAlign: 'left',
  lineHeight: '2em',
});

const BreakdownBox = styled.div({
  position: 'relative',
  bottom: '4.5em',
  left: '15em',
  width: '20em',
  height: '2em',
  color: `${colors.gray_text02}`,
  fontSize: '.9em',
  textAlign: 'right',
});

const DeleteBox = styled.div({
  position: 'relative',
  bottom: '16em',
  left: '90em',
  width: '8em',
  height: '3em',
  fontSize: '.4em',
  opacity: 0.5,
  '& button': {
    padding: '.5em',
  },
});

export default function Transaction({ dailyTransaction }) {
  const { transactionHistory } = dailyTransaction;

  return (
    <>
      {
        transactionHistory.map((transaction) => (
          <Container
            key={transaction}
          >
            <TypeBox>{transaction.type}</TypeBox>
            <CategoryBox>{transaction.category.value}</CategoryBox>
            <TextBox>
              {transaction.transactionFields.source}
              {' '}
              /
              {' '}
              {transaction.transactionFields.memo}
            </TextBox>
            <BreakdownBox>{transaction.transactionFields.breakdown}</BreakdownBox>
            <DeleteBox>
              <button
                type="button"
              >
                🔧
              </button>
              <button
                type="button"
              >
                ✂️
              </button>
            </DeleteBox>
          </Container>
        ))
      }

    </>

  );
}
