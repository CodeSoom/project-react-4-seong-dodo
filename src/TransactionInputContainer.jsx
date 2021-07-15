import { useDispatch, useSelector } from 'react-redux';

import TransactionInput from './TransactionInput';

import { get } from './utils';

import {
  changeTransactionFields,
} from './slice';

export default function TransactionInputContainer() {
  const dispatch = useDispatch();

  const transactionFields = useSelector(get('transactionFields'));

  const handleChange = ({ name, value }) => {
    dispatch(changeTransactionFields({ name, value }));
  };

  return (
    <div>
      <TransactionInput
        fields={transactionFields}
        onChange={handleChange}
      />
    </div>
  );
}
