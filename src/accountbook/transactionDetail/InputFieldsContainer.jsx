import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

import InputField from './InputField';

import {
  changeTransactionFields,
} from '../../reducers/accountbook';

const InputBox = styled.div(mediaquery({
  height: ['1.9em', '1.8em', '2.2em', '2.5em', '4em', '3.5em'],
  margin: '0 auto 0.3em',
}));

export default function InputFieldsContainer() {
  const dispatch = useDispatch();

  const transaction = useSelector((state) => state.accountbook.transaction);

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
