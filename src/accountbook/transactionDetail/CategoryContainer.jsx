import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import ExpenseCategory from './ExpenseCategory';
import IncomeCategory from './IncomeCategory';

import {
  selectCategory,
  changeTransactionCategory,
} from '../../reducers/accountbook';

const OptionBox = styled.div(mediaquery({
  width: '100%',
  height: ['15%', '15%', '16%', '15%', '15%'],
  marginBottom: 0,
  textAlign: 'center',
  lineHeight: [3, 3, 4, 3.5, 7],
  '& label': {
    float: 'left',
    width: ['25%', '25%', '25%', '32%', '30%'],
    height: '100%',
    fontSize: ['0.6em', '0.6em', '0.7em', '1em', '1em'],
  },

  // backgroundColor: 'beige',
}));

export default function CategoryContainer() {
  const dispatch = useDispatch();

  const { selectedType, transaction } = useSelector((state) => ({
    selectedType: state.accountbook.selectedType,
    transaction: state.accountbook.transaction,
  }));

  const handleChange = (name) => {
    dispatch(selectCategory(name));
    dispatch(changeTransactionCategory(name));
  };

  return (
    <OptionBox>
      <label htmlFor="category">
        카테고리
      </label>
      <div>
        {
          selectedType === '지출'
            ? (
              <ExpenseCategory
                transaction={transaction}
                onChange={handleChange}
              />
            )
            : (
              <IncomeCategory
                transaction={transaction}
                onChange={handleChange}
              />
            )
        }
      </div>
    </OptionBox>
  );
}
