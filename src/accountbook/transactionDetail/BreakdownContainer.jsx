import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import mediaquery from '../../style/mediaquery';

import BreakdownField from './BreakdownField';

import { exchangeRegEX, replaceString } from '../../utils/utils';

import {
  changeBreakdownFields,
} from '../../reducers/accountbook';

const InputBox = styled.div(mediaquery({
  height: ['2em', '2em', '2em', '2.5em', '3em', '3em'],
  margin: [
    '0.3em auto 0',
    '0.2em auto 0',
    '0.4em auto 0',
    '0.4em auto 0',
    '2em auto 0',
    '1em auto 0',
  ],
  padding: 0,

  // backgroundColor: 'skyblue',
}));

const Number = styled.div(mediaquery({
  float: 'left',
  width: '85%',
}));

const Child = styled.div(mediaquery({
  float: 'left',
  width: '15%',
  height: '100%',
  fontSize: ['0.5em', '0.5em', '0.6em', '0.9em', '1em', '1em'],
  lineHeight: [3, 3.2, 3.3, 2.6, 3.3, 3],
  letterSpacing: 1,
}));

export default function BreakdownContainer() {
  const dispatch = useDispatch();

  const transaction = useSelector((state) => state.accountbook.transaction);

  const { transactionFields } = transaction;
  const { breakdown } = transactionFields;

  const handleChange = ({ value }) => {
    dispatch(changeBreakdownFields({ value }));
  };

  return (
    <>
      <InputBox>
        <Number>
          <BreakdownField
            label=""
            placeholder="0"
            value={exchangeRegEX(replaceString(breakdown))}
            onChange={handleChange}
          />
        </Number>
        <Child>
          원
          {' '}
          <FontAwesomeIcon icon={faPen} />
        </Child>
      </InputBox>
    </>
  );
}
