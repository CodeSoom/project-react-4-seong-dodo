import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import {
  clearTargetId,
  sendTransaction,
  sendEditTransaction,
} from '../../reducers/accountbook';

const SubmitBox = styled.div(mediaquery({
  width: ['30%', '30%', '30%', '50%', '50%'],
  height: ['9%', '9%', '9%', '7%', '7%'],
  margin: ['0.5em auto 0', '0.5em auto 0', '0.5em auto 0', '3em auto 0', '3em auto 0'],
  textAlign: 'center',
  lineHeight: '2em',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontSize: ['.7em', '.7em', '.8em', '.8em', '.8em'],
  fontWeight: '600',
  letterSpacing: 5,
}));

export default function SubmitContainer() {
  const dispatch = useDispatch();

  const { transaction, targetId } = useSelector((state) => ({
    transaction: state.accountbook.transaction,
    targetId: state.accountbook.targetId,
  }));

  const { transactionFields } = transaction;

  const handleSubmit = (id) => {
    if (transactionFields.breakdown === '') {
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
      dispatch(sendEditTransaction({ id }));
      dispatch(clearTargetId());
      // eslint-disable-next-line no-alert
      alert('수정 완료');
      return;
    }
    if (targetId === null) {
      dispatch(sendTransaction());
    }
  };

  return (
    <SubmitBox>
      <button
        type="button"
        onClick={() => handleSubmit(targetId)}
      >
        저장
      </button>
    </SubmitBox>
  );
}
