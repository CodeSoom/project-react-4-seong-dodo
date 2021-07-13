import React, { useState } from 'react';

import styled from '@emotion/styled';
import colors from './style/colors';

import TransactionDetailModal from './TransactionDetailModal';

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

const Button = styled.button({
  position: 'fixed',
  right: '8em',
  margin: '.5em',
  color: `${colors.gray_text}`,
  fontSize: '1.2em',
  fontWeight: '600',
});

const DateInfor = styled.div({
  margin: '2em',
  fontSize: '1em',
});

const AddBox = styled.div({
  position: 'fixed',
  bottom: '5em',
  margin: '1em 27em',
  padding: '.5em 1em',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontWeight: '600',
  letterSpacing: '.3em',
});

export default function TransactionModal({ dailyTransaction, onClick }) {
  const { date, day } = dailyTransaction;
  const [isDisplay, setDisplay] = useState(false);

  function convertDay() {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[day];
  }

  const handleOpenModal = () => {
    setDisplay(!isDisplay);
  };
  return (
    <>
      <Container>
        <TextBox>
          <Button
            type="button"
            onClick={onClick}
          >
            X
          </Button>
          <DateInfor>
            {date}
            일
            {' '}
            {convertDay()}
            요일
          </DateInfor>
          <AddBox
            onClick={handleOpenModal}
            role="presentation"
          >
            내역추가
          </AddBox>
        </TextBox>
        <div>
          {
            isDisplay === true
              ? (
                <TransactionDetailModal />
              )
              : null
          }
        </div>
      </Container>
    </>
  );
}
