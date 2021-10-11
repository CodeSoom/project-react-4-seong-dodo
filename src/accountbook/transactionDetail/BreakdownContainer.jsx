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
  height: ['18%', '18%', '19%', '15%', '15%'],
  marginBottom: ['0', '0', '0', '.5em', '.5em'],
  padding: '.5em',
}));

const Number = styled.div(mediaquery({
  float: 'left',
  width: '85%',
  height: '100%',
  fontSize: ['.7em', '.7em', '.9em', '.9em', '.9em'],
}));

const Child = styled.div(mediaquery({
  float: 'left',
  width: '15%',
  height: '100%',
  fontSize: ['.3em', '.5em', '.8em', '.8em', '.8em'],
  lineHeight: ['6em', '3.5em', '2.5em', '3.6em', '3.6em'],
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
