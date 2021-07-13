import { useDispatch, useSelector } from 'react-redux';

import TransactionInput from './TransactionInput';

import { get } from './utils';

import {
  changeBreakdown,
} from './slice';

export default function TransactionInputContainer() {
  const dispatch = useDispatch();

  const breakdown = useSelector(get('breakdown'));

  const handleChange = ({ value }) => {
    dispatch(changeBreakdown({ value }));
  };

  return (
    <div>
      <TransactionInput
        breakdown={breakdown}
        onChange={handleChange}
      />

      내역추가 상세페이지 업데이트 예정입니다.
    </div>
  );
}
