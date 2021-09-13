import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import {
  selectCategory,
  changeTransactionCategory,
} from '../../reducers/accountbook';

import ExpenseCategory from './ExpenseCategory';
import IncomeCategory from './IncomeCategory';

const OptionBox = styled.div(mediaquery({
  width: '100%',
  height: ['18%', '18%', '19%', '15%', '15%'],
  marginBottom: ['0', '0', '0', '.5em', '.5em'],
  textAlign: 'center',
  lineHeight: ['2.2em', '2.4em', '2.2em', '4em', '4em'],
  '& label': {
    float: 'left',
    width: '25%',
    height: '100%',
    fontSize: ['.6em', '.6em', '.7em', '.7em', '.7em'],
  },
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
