import { useDispatch, useSelector } from 'react-redux';

import TransactionInput from './TransactionInput';

import { get } from '../utils/utils';

import {
  changeTransactionFields,
  clearTransactionFields,
  setTransaction,
  setMonthlyTransaction,
} from '../slice';

export default function TransactionInputContainer() {
  const dispatch = useDispatch();

  const transaction = useSelector(get('transaction'));

  const { transactionFields } = transaction;

  const handleChange = ({ name, value }) => {
    dispatch(changeTransactionFields({ name, value }));
  };

  const handleSubmit = () => {
    if (transactionFields.breakdown === 0) {
      // eslint-disable-next-line no-alert
      alert('금액을 입력해주세요.');
      return;
    }
    if (transaction.category === '') {
      // eslint-disable-next-line no-alert
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (transactionFields.source === '') {
      // eslint-disable-next-line no-alert
      alert('거래처를 입력헤주세요.');
      return;
    }
    dispatch(setTransaction({ transaction }));
    dispatch(setMonthlyTransaction({ transaction }));
    dispatch(clearTransactionFields());
  };

  return (
    <>
      <TransactionInput
        fields={transactionFields}
        onChange={handleChange}
        onClick={handleSubmit}
      />
    </>
  );
}
