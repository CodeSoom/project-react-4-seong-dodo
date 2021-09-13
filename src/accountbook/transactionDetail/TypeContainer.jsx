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
