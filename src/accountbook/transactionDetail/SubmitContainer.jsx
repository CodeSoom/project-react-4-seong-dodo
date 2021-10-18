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
  width: ['12em', '10em', '11em', '15em', '14em', '18em'],
  height: ['2.6em', '2em', '2.1em', '2.3em', '2.5em', '2.5em'],
  margin: [
    '0.7em auto 0',
    '0.5em auto 0',
    '0.6em auto 0',
    '0.8em auto 0',
    '1.4em auto 0',
    '1.2em auto 0',
  ],
  textAlign: 'center',
  lineHeight: [2.1, 1.8, 2.1, 2.2, 2.3, 2.4],
  borderRadius: '0.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.6em', '0.7em', '0.8em', '1em', '1.1em', '1.1em'],
  fontWeight: '600',
  letterSpacing: '0.3em',

  // border: '1px solid black',
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
