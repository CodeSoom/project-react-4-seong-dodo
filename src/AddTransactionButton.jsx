import React, { useState } from 'react';

import styled from '@emotion/styled';
import colors from './style/colors';

import TransactionDetailModal from './TransactionDetailModal';

const AddBox = styled.div({
  position: 'fixed',
  bottom: '5em',
  margin: '.5em 10em',
  padding: '.5em 1em',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontWeight: '600',
  letterSpacing: '.3em',
});

const DefaultContainer = styled.div({
  position: 'fixed',
  top: 180,
  right: 160,
  width: '37%',
  height: '55%',
  borderLeft: `${colors.gray_backgroud} solid 1px`,
});

export default function AddTransactionButton() {
  const [isDisplay, setDisplay] = useState(false);

  // 내역추가 버튼 이벤트
  const handleClickDetailModal = () => {
    setDisplay(!isDisplay);
  };

  return (
    <div>
      <AddBox
        onClick={handleClickDetailModal}
        role="presentation"
      >
        내역추가
      </AddBox>
      <div>
        {
          isDisplay === true
            ? <TransactionDetailModal />
            : <DefaultContainer />
        }
      </div>
    </div>
  );
}
