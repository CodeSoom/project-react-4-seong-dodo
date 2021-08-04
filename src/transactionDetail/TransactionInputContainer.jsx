import { useDispatch, useSelector } from 'react-redux';

import TransactionInput from './TransactionInput';

import { get } from '../utils/utils';

import {
  changeTransactionType,
  changeTransactionFields,
  clearTransactionFields,
  setTransaction,
  setTransactionHistory,
} from '../slice';

export default function TransactionInputContainer() {
  const dispatch = useDispatch();

  const transaction = useSelector(get('transaction'));

  const { transactionFields } = transaction;

  const handleChange = ({ name, value }) => {
    dispatch(changeTransactionFields({ name, value }));
  };

  const handleSubmit = () => {
    dispatch(setTransaction({ transaction }));
    dispatch(setTransactionHistory({ transaction }));
    dispatch(clearTransactionFields());
    dispatch(changeTransactionType());
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
