import React from 'react';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import { exchangeRegEX, removeDecimalPoint, replaceString } from '../../utils/utils';

const DataBox = styled.div(mediaquery({
  width: '95%',
  height: ['10%', '10%', '10%', '5%', '5%'],
  margin: '0 auto',
  padding: '.2em .5em',
  borderBottom: `${colors.gray_backgroud} solid 1px`,
  fontSize: ['.3em', '.6em', '.6em', '.8em', '.8em'],
  color: `${colors.gray_text03}`,
  textAlign: 'left',
}));

const CountBox = styled.div(mediaquery({
  float: 'left',
  width: '30%',
  textAlign: 'left',
}));

const TotalExpenseBox = styled.div(mediaquery({
  float: 'left',
  width: '35%',
  textAlign: 'right',
  color: `${colors.blue_text02}`,
}));

const TotalIncomeBox = styled.div(mediaquery({
  float: 'left',
  width: '35%',
  textAlign: 'right',
  color: `${colors.red_text02}`,
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
          <DataBox>
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
          </DataBox>
        )}
    </>
  );
}
