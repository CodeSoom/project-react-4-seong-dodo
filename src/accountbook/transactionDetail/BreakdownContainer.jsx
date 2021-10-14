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
  width: '100%',
  height: ['20%', '20%', '18%', '18%', '15%'],
  margin: [0, 0, 0, '0.7em 0 0', 0],
  // marginBottom: [0, 0, 0, 0, '.5em'],
  padding: ['0.5em', '0.5em', '0.5em', '1em', '0.5em'],
}));

const Number = styled.div(mediaquery({
  float: 'left',
  width: '85%',
  height: '100%',
  fontSize: ['1em', '1em', '1em', '1.2em', '.9em'],
}));

const Child = styled.div(mediaquery({
  float: 'left',
  width: '15%',
  height: '100%',
  fontSize: ['0.5em', '0.5em', '0.7em', '1em', '.8em'],
  lineHeight: [2.5, 2.5, 2.4, 2, '3.6em'],
  letterSpacing: 3,
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
