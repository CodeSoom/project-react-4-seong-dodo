import { useDispatch, useSelector } from 'react-redux';

import TransactionInput from './TransactionInput';

import { get } from '../utils/utils';

import {
  changeBreakdownFields,
  changeTransactionFields,
  clearTransactionFields,
  setTransaction,
  addMonthlyTransaction,
  deleteTransaction,
  clearTargetId,
} from '../slice';

export default function TransactionInputContainer() {
  const dispatch = useDispatch();
  const transaction = useSelector(get('transaction'));
  const targetId = useSelector(get('targetId'));
  const { transactionFields } = transaction;

  const handleChangeBreakdown = ({ value }) => {
    dispatch(changeBreakdownFields({ value }));
  };

  const handleChangeFields = ({ name, value }) => {
    dispatch(changeTransactionFields({ name, value }));
  };

  const handleSubmit = (id) => {
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
    if (targetId !== null && targetId === id) {
      dispatch(deleteTransaction({ id }));
      dispatch(setTransaction({ transaction }));
      dispatch(addMonthlyTransaction({ transaction }));
      dispatch(clearTransactionFields());
      dispatch(clearTargetId());
    }
    if (targetId === null) {
      dispatch(setTransaction({ transaction }));
      dispatch(addMonthlyTransaction({ transaction }));
      dispatch(clearTransactionFields());
    }
  };

  return (
    <>
      <TransactionInput
        targetId={targetId}
        fields={transactionFields}
        onChange={handleChangeFields}
        onChangeBreakdown={handleChangeBreakdown}
        onClick={handleSubmit}
      />
    </>
  );
}
