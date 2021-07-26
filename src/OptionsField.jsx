import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import { get } from './utils';

import {
  selectType,
  changeTransactionType,
  changeTransactionCategory,
} from './slice';

import colors from './style/colors';

import ExpenseCategory from './ExpenseCategory';
import IncomeCategory from './IncomeCategory';
import TypeButton from './TypeButton';

const Container = styled.div({
  height: '3em',
  margin: '.5em 1.2em',
  padding: '0 .2em',
  textAlign: 'center',
  lineHeight: '3em',
});

const LabelBox = styled.div({
  float: 'left',
  width: '5em',
  height: '3em',
  linehigt: '3em',
  '& label': {
    fontSize: '.8em',
    letterSpacing: '.3em',
  },
});

const TypeBox = styled.div({
  float: 'left',
  height: '3em',
  margin: '0 auto',
  padding: '.2em 2.2em',
  '& button': {
    margin: '0 auto',
    padding: '.4em',
    fontSize: '.7em',
    fontWeight: '500',
    textAlign: 'center',
    letterSpacing: '.4em',
  },
});

const Active = styled.div(({ active }) => ({
  width: '3.5em',
  height: '2em',
  marginTop: '.2em',
  lineHeight: '1.6em',
  borderRadius: '.5em',
  color: active ? `${colors.white}` : `${colors.gray_text03}`,
  backgroundColor: active ? `${colors.teal}` : 'none',
}));

export default function OptionsField() {
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
        <LabelBox>
          <label htmlFor="type">
            분류
          </label>
        </LabelBox>
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
        <LabelBox>
          <label htmlFor="category">
            카테고리
          </label>
        </LabelBox>
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
