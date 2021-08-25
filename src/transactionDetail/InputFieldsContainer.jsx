import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../style/mediaquery';

import InputField from './InputField';

import { get } from '../utils/utils';

import {
  changeTransactionFields,
} from '../slice';

const InputBox = styled.div(mediaquery({
  width: '100%',
  height: ['18%', '18%', '19%', '15%', '15%'],
  marginBottom: ['0', '0', '0', '.5em', '.5em'],
  padding: '.5em',
}));

export default function InputFieldsContainer() {
  const dispatch = useDispatch();
  const transaction = useSelector(get('transaction'));

  const { transactionFields } = transaction;
  const { source, memo } = transactionFields;

  const handleChange = ({ name, value }) => {
    dispatch(changeTransactionFields({ name, value }));
  };

  return (
    <>
      <InputBox>
        <InputField
          label="거래처"
          id="source"
          name="source"
          placeholder="거래처명을 입력하세요."
          value={source}
          onChange={handleChange}
        />
      </InputBox>
      <InputBox>
        <InputField
          label="메모"
          id="memo"
          name="memo"
          placeholder="메모를 입력하세요."
          value={memo}
          onChange={handleChange}
        />
      </InputBox>
    </>
  );
}
