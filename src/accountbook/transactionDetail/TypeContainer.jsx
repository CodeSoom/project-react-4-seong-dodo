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
  height: ['2em', '1.8em', '2.2em', '2.5em', '4em', '3.5em'],
  margin: '0.2em auto',
  textAlign: 'center',
  lineHeight: [3, 2.8, 2.9, 2.5, 4, 3.4],
  '& label': {
    float: 'left',
    width: ['6.5em', '7.2em', '6.2em', '10em', '7em', '8em'],
    fontSize: ['0.5em', '0.5em', '0.7em', '1em', '1em', '1em'],
    letterSpacing: [1, 1, 1, 2, 1, 2],
  },
}));

const TypeBox = styled.div(mediaquery({
  float: 'left',
  width: ['5.1em', '5.5em', '6.5em', '12.1em', '7em', '9.5em'],
  '& button': {
    width: '50%',
    margin: '0 auto',
    padding: ['0.5em', '0.4em', '0.4em', '0.4em', '0.4em', '0.4em'],
    fontSize: ['0.6em', '0.5em', '0.6em', '0.9em', '1em', '1em'],
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: [0.5, 1, 1.2, 0.9, 1.3, 1.3],
    letterSpacing: '0.4em',
  },
}));

const Active = styled.div(({ active }) => (mediaquery({
  width: ['4em', '4em', '4.5em', '7.5em', '6em', '7em'],
  height: ['1.1em', '1.1em', '1.2em', '1.7em', '2.2em', '2.2em'],
  margin: [
    '0.4em auto',
    '0.3em auto',
    '0.4em auto',
    '0.4em auto',
    '0.9em auto',
    '0.6em auto',
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
