import React from 'react';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import {
  exchangeRegEX,
  removeDecimalPoint,
  replaceString,
} from '../../utils/utils';

export default function TransactionData({ histories }) {
  const getCount = () => {
    const count = histories.transactionHistories.length;
    return count;
  };

  // console.log(histories);
  return (
    <>
      <CountBox>
        총
        {' '}
        {getCount()}
        {' '}
        건
      </CountBox>
      <TotalExpenseBox>
        -
        {' '}
        {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalExpense)))}
        {' '}
        원
      </TotalExpenseBox>
      <TotalIncomeBox>
        +
        {' '}
        {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalIncome)))}
        {' '}
        원
      </TotalIncomeBox>
    </>
  );
}

const CountBox = styled.div(mediaquery({
  float: 'left',
  width: ['6em', '5em', '6em', '11em', '6em', '8em'],
  textAlign: 'left',
}));

const TotalExpenseBox = styled.div(mediaquery({
  float: 'left',
  width: ['12em', '10em', '10em', '17em', '11em', '13em'],
  color: `${colors.gray_text05}`,
  textAlign: 'right',
}));

const TotalIncomeBox = styled.div(mediaquery({
  float: 'left',
  width: ['11em', '10em', '10em', '17em', '11em', '13em'],
  color: `${colors.teal_text02}`,
  textAlign: 'right',
}));
