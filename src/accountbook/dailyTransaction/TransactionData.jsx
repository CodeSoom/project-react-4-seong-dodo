import React from 'react';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import { exchangeRegEX, removeDecimalPoint, replaceString } from '../../utils/utils';

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

export default function TransactionData({ histories }) {
  const getCount = () => {
    const count = histories.transactionHistories.length;

    return count;
  };

  return (
    <>
      {histories === undefined
        ? null
        : (
          <div>
            <CountBox>
              총
              {' '}
              {getCount()}
              {' '}
              건
            </CountBox>
            {
              histories.totalExpense === ''
                ? null
                : (
                  <>
                    <TotalExpenseBox>
                      -
                      {' '}
                      {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalExpense)))}
                      {' '}
                      원
                    </TotalExpenseBox>
                  </>
                )
            }
            {
              histories.totalIncome === ''
                ? null
                : (
                  <>
                    <TotalIncomeBox>
                      +
                      {' '}
                      {exchangeRegEX(replaceString(removeDecimalPoint(histories.totalIncome)))}
                      {' '}
                      원
                    </TotalIncomeBox>
                  </>
                )
            }
          </div>
        )}
    </>
  );
}
