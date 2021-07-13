import React, { useState } from 'react';

import styled from '@emotion/styled';
import colors from './style/colors';

import TransactionDetailModal from './TransactionDetailModal';

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
            ? (
              <TransactionDetailModal />
            )
            : null
        }
      </div>
    </div>
  );
}
