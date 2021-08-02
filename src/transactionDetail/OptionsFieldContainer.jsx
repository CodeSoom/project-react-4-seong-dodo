import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import { get } from '../utils/utils';

import {
  selectType,
  changeTransactionType,
  changeTransactionCategory,
} from '../slice';

import ExpenseCategory from './ExpenseCategory';
import IncomeCategory from './IncomeCategory';
import TypeButton from './TypeButton';

const Container = styled.div(mediaquery({
  width: '100%',
  height: ['50%', '50%', '50%', '47.5%', '47.5%'],
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

const TypeBox = styled.div(mediaquery({
  float: 'left',
  width: '37.5%',
  height: '100%',
  padding: ['0', '0', '0', '1em', '1em'],
  '& button': {
    width: '50%',
    margin: '0 auto',
    padding: '.4em',
    fontSize: ['.4em', '.6em', '.7em', '.7em', '.7em'],
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: ['1.5em', '2em', '1.5em', '2em', '2em'],
    letterSpacing: '.4em',
  },
}));

const Active = styled.div(({ active }) => (mediaquery({
  width: ['90%', '70%', '70%', '100%', '100%'],
  height: ['60%', '60%', '80%', '100%', '100%'],
  margin: ['.4em auto', '.4em auto', '.2em auto', '0 auto', '0 auto'],
  borderRadius: '.5em',
  color: active ? `${colors.white}` : `${colors.gray_text03}`,
  backgroundColor: active ? `${colors.teal}` : 'none',
  lineHeight: '1em',
})));

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
