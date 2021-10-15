/* eslint-disable no-alert */
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import Loading from '../../loading/Loading';

import {
  sendTransaction,
  sendEditTransaction,
} from '../../reducers/accountbook';

const SubmitBox = styled.div(mediaquery({
  width: ['30%', '30%', '30%', '40%', '85%'],
  height: ['12%', '12%', '10%', '10%', '8%'],
  margin: [
    '0.5em auto',
    '0.5em auto',
    '1em auto',
    '1em auto 0',
    '2em auto 0',
  ],
  textAlign: 'center',
  // lineHeight: '2em',
  lineHeight: ['2em', '2em', '2em', '2em', 3],
  borderRadius: '0.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.7em', '0.7em', '0.8em', '1em', '1.2em'],
  fontWeight: '600',
  letterSpacing: 5,
}));

export default function SubmitContainer({ load }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const { transaction, targetId } = useSelector((state) => ({
    transaction: state.accountbook.transaction,
    targetId: state.accountbook.targetId,
  }));

  const { transactionFields } = transaction;

  const handleSubmit = async (id) => {
    if (transactionFields.breakdown === '') {
      alert('금액을 입력해주세요.');
      return;
    }
    if (transaction.category === '') {
      alert('카테고리를 선택해주세요.');
      return;
    }
    if (transactionFields.source === '') {
      alert('거래처를 입력헤주세요.');
      return;
    }
    if (targetId !== null && targetId === id) {
      setIsLoading(true);
      await dispatch(sendEditTransaction({ id }));
      await load();
      setIsLoading(false);
      alert('수정 완료');
      return;
    }
    if (targetId === null) {
      setIsLoading(true);
      await dispatch(sendTransaction());
      await load();
      setIsLoading(false);
    }
  };

  return (
    <>
      {
        isLoading
          ? <Loading />
          : (
            <SubmitBox>
              <button
                type="button"
                onClick={() => handleSubmit(targetId)}
              >
                저장
              </button>
            </SubmitBox>
          )
      }
    </>
  );
}
