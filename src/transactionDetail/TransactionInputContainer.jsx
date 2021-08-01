import { useDispatch, useSelector } from 'react-redux';

import TransactionInput from './TransactionInput';

import { get } from '../utils/utils';

import {
  changeTransactionFields,
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
