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
  height: ['1.7em', '1.8em', '1.9em', '2.4em', '3.4em', '3em'],
  margin: '0 auto 0.3em',
  lineHeight: [2.5, 2.5, 2.5, 2.2, 3.3, 3],
  textAlign: 'center',
  '& label': {
    float: 'left',
    width: ['6.5em', '7.2em', '6.2em', '10em', '7em', '8em'],
    fontSize: ['0.5em', '0.5em', '0.7em', '1em', '1em', '1em'],
    letterSpacing: [1, 1, 1, 2, 1, 2],
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
