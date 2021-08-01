import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { get } from '../utils/utils';

import {
  selectType,
  changeTransactionType,
  changeTransactionCategory,
} from '../slice';

import colors from '../style/colors';

import ExpenseCategory from './ExpenseCategory';
import IncomeCategory from './IncomeCategory';
import TypeButton from './TypeButton';

const Container = styled.div({
  width: '100%',
  height: '47.5%',
  marginBottom: '.5em',
  textAlign: 'center',
  lineHeight: '4em',
  '& label': {
    float: 'left',
    width: '25%',
    height: '100%',
    fontSize: '0.7em',
  },
});

const TypeBox = styled.div({
  float: 'left',
  width: '37.5%',
  height: '100%',
  padding: '1em',
  '& button': {
    width: '50%',
    margin: '0 auto',
    padding: '.4em',
    fontSize: '.7em',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: '.4em',
  },
});

const Active = styled.div(({ active }) => ({
  width: '100%',
  height: '100%',
  lineHeight: '1em',
  borderRadius: '.5em',
  color: active ? `${colors.white}` : `${colors.gray_text03}`,
  backgroundColor: active ? `${colors.teal}` : 'none',
}));

export default function OptionsFieldContainer() {
  const dispatch = useDispatch();

  const selectedType = useSelector(get('selectedType'));

  const handleClick = (name) => {
    dispatch(selectType(name));
    dispatch(changeTransactionType(name));
  };

  const handleChange = (name) => {
    dispatch(changeTransactionCategory(name));
  };

  return (
    <>
      <Container>
        <label htmlFor="type">
          분류
        </label>
        <TypeBox>
          <Active
            active={selectedType === '지출'}
          >
            <TypeButton
              id="expense"
              name="지출"
              onClick={() => handleClick('지출')}
            />
          </Active>
        </TypeBox>
        <TypeBox>
          <Active
            active={selectedType === '수입'}
          >
            <TypeButton
              id="income"
              name="수입"
              onClick={() => handleClick('수입')}
            />
          </Active>
        </TypeBox>
      </Container>
      <Container>
        <label htmlFor="category">
          카테고리
        </label>
        <div>
          {
            selectedType === '지출'
              ? (
                <ExpenseCategory
                  onChange={handleChange}
                />
              )
              : (
                <IncomeCategory
                  onChange={handleChange}
                />
              )
          }
        </div>
      </Container>
    </>
  );
}
