import { useDispatch, useSelector } from 'react-redux';

import TransactionInput from './TransactionInput';

import { get } from './utils';

import {
  changeTransactionFields,
} from './slice';

export default function TransactionInputContainer() {
  const dispatch = useDispatch();

  const transaction = useSelector(get('transaction'));

  const { transactionFields } = transaction;

  const handleChange = ({ name, value }) => {
    dispatch(changeTransactionFields({ name, value }));
  };

  return (
    <>
      <TransactionInput
        fields={transactionFields}
        onChange={handleChange}
      />
    </>
  );
}
