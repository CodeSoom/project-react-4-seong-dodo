import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import {
  selectType,
  changeTransactionType,
} from '../../reducers/accountbook';

import Button from './Button';

const OptionBox = styled.div(mediaquery({
  width: '100%',
  height: ['15%', '15%', '15%', '15%', '15%'],
  textAlign: 'center',
  lineHeight: [3.1, 3.1, 4, 3.5, 6],
  '& label': {
    float: 'left',
    width: ['25%', '25%', '25%', '30%', '30%'],
    height: '100%',
    fontSize: ['0.6em', '0.6em', '0.7em', '1em', '1em'],
  },

  // backgroundColor: 'pink',
}));

const TypeBox = styled.div(mediaquery({
  float: 'left',
  width: ['37.5%', '37.5%', '37.5%', '35%', '35%'],
  height: '100%',
  padding: 0,
  '& button': {
    width: '50%',
    margin: '0 auto',
    padding: '0.4em',
    fontSize: ['0.6em', '0.6em', '0.7em', '1em', '1em'],
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: [1, 1, 1.5, 1.5, 2],
    letterSpacing: '0.4em',
  },
}));

const Active = styled.div(({ active }) => (mediaquery({
  width: ['90%', '70%', '65%', '60%', '80%'],
  height: ['60%', '60%', '60%', '60%', '40%'],
  margin: [
    '0.4em auto',
    '0.4em auto',
    '0.5em auto',
    '0.5em auto',
    '2em auto',
  ],
  borderRadius: '0.5em',
  color: active ? `${colors.white}` : `${colors.gray_text03}`,
  backgroundColor: active ? `${colors.teal}` : 'none',
  lineHeight: 1,
})));

export default function TypeContainer() {
  const dispatch = useDispatch();

  const selectedType = useSelector((state) => state.accountbook.selectedType);

  const handleClick = (name) => {
    dispatch(selectType(name));
    dispatch(changeTransactionType(name));
  };

  return (
    <OptionBox>
      <label htmlFor="type">
        분류
      </label>
      <TypeBox>
        <Active
          active={selectedType === '지출'}
        >
          <Button
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
          <Button
            id="income"
            name="수입"
            onClick={() => handleClick('수입')}
          />
        </Active>
      </TypeBox>
    </OptionBox>
  );
}
