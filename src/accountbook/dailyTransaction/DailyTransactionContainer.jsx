import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import Button from './Button';
import Loading from '../../loading/Loading';
import DailyTransaction from './DailyTransaction';
import TransactionDetailModal from '../transactionDetail/TransactionDetailModal';

import {
  setTargetId,
  selectType,
  selectCategory,
  changeTransactionType,
  changeTransactionCategory,
  changeBreakdownFields,
  changeTransactionFields,
  clearTransactionFields,
  clearTargetId,
  loadDailyTransaction,
  sendDeleteTransaction,
} from '../../reducers/accountbook';

import { exchangeRegEX, removeDecimalPoint, replaceString } from '../../utils/utils';

const Container = styled.div(mediaquery({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  height: '100%',
  backgroundColor: `${colors.teal_modal}`,
  paddingTop: ['1em', '1em', '2em', '4em', '4em'],
  zIndex: 1,
}));

const TextContainer = styled.div(mediaquery({
  bottom: 0,
  width: ['90%', '90%', '90%', '80%', '80%'],
  height: ['97%', '97%', '96%', '80%', '90%'],
  margin: '0 auto',
  padding: '0.5em',
  border: `${colors.teal_border} solid 1px`,
  borderRadius: '0.4em',
  color: `${colors.gray_text02}`,
  backgroundColor: `${colors.white}`,
}));

const CloseButtonBox = styled.div(mediaquery({
  textAlign: 'right',
  padding: '0.1em .5em',
  color: `${colors.gray_text}`,
  fontSize: ['0.8em', '0.8em', '0.9em', '.8em', '.9em'],
  fontWeight: '600',
}));

const DateBox = styled.div(mediaquery({
  width: '100%',
  padding: '0.2em 0.5em',
  fontSize: ['0.7em', '0.7em', '0.8em', '.8em', '.8em'],
  textAlign: 'left',
}));

const TextBox = styled.div(mediaquery({
  width: '100%',
  height: ['84%', '80%', '83%', '82%', '82%'],
  margin: '0.5em auto',
}));

const TransactionBox = styled.div(mediaquery({
  float: 'left',
  width: ['100%', '100%', '100%', '50%', '50%'],
  height: ['40%', '40%', '50%', '100%', '100%'],
  padding: '0.5em',
  fontSize: ['0.5em', '0.5em', '0.6em', '.7em', '.7em'],
  overflow: 'auto',
}));

const TransactionFieldsBox = styled.div(mediaquery({
  float: 'left',
  width: ['100%', '100%', '100%', '50%', '50%'],
  height: ['60%', '60%', '50%', '100%', '100%'],
}));

const AddButtonBox = styled.div(mediaquery({
  float: 'clear',
  width: ['80%', '75%', '100%', '35%', '30%'],
  margin: ['0 auto', '0 auto', '0 auto', '0 5em', '0 6em'],
  padding: '0.5em 1em',
  borderRadius: '0.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.7em', '0.7em', '0.8em', '.8em', '.8em'],
  fontWeight: '600',
  letterSpacing: '0.3em',
}));

const DefaultBox = styled.div(mediaquery({
  width: '100%',
  height: '100%',
  borderTop: [
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
    'none',
    'none',
  ],
  borderLeft: [
    'none',
    'none',
    'none',
    `${colors.gray_backgroud} solid 1px`,
    `${colors.gray_backgroud} solid 1px`,
  ],
}));

export default function DailyTransactionContainer({ dailyData, onClick }) {
  const dispatch = useDispatch();

  const [isDisplay, setDisplay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    year, month, date, day,
  } = dailyData;

  const { accessToken, dailyTransaction } = useSelector((state) => ({
    accessToken: state.user.accessToken,
    dailyTransaction: state.accountbook.dailyTransaction,
  }));

  const load = async () => {
    await dispatch(loadDailyTransaction({
      accessToken, year, month, date,
    }));
  };

  useEffect(async () => {
    setIsLoading(true);
    await load();
    setIsLoading(false);
  }, []);

  function convertDay() {
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    return days[day];
  }
  // 내역추가 버튼 이벤트
  const handleClickDetailModal = () => {
    setDisplay(!isDisplay);
    dispatch(clearTransactionFields());
    dispatch(clearTargetId());
  };

  const handleClickEdit = (id) => {
    setDisplay(true);
    dispatch(setTargetId({ id }));

    const targetDailyTransaction = dailyTransaction
      .find((target) => target.year === year
      && target.month === month
      && target.date === date);

    const targetTransaction = targetDailyTransaction.transactionHistories
      .find((target) => target.id === id);

    const { type, category, transactionFields } = targetTransaction;

    dispatch(changeTransactionType(type));
    dispatch(selectType(type));
    dispatch(changeTransactionCategory({ value: category.value }));
    dispatch(selectCategory({ value: category.value }));
    dispatch(changeBreakdownFields({
      value:
      exchangeRegEX(replaceString(removeDecimalPoint(transactionFields.breakdown))),
    }));
    dispatch(changeTransactionFields({
      name: 'source',
      value: transactionFields.source,
    }));
    dispatch(changeTransactionFields({
      name: 'memo',
      value: transactionFields.memo,
    }));
  };

  const handleClickDelete = async (id) => {
    setIsLoading(true);
    await dispatch(sendDeleteTransaction({ id }));
    await load();
    setIsLoading(false);
  };

  return (
    <Container>
      <TextContainer>
        <CloseButtonBox>
          <Button
            value="X"
            onClick={onClick}
          />
        </CloseButtonBox>
        <DateBox>
          {date}
          일
          {' '}
          {convertDay()}
          요일
        </DateBox>
        <TextBox>
          <TransactionBox>
            {
              isLoading
                ? <Loading />
                : (
                  <DailyTransaction
                    dailyTransaction={dailyTransaction}
                    dailyData={dailyData}
                    onClickEdit={handleClickEdit}
                    onClickDelete={handleClickDelete}
                    load={load}
                  />
                )
            }
          </TransactionBox>
          <TransactionFieldsBox>
            {
              isDisplay === true
                ? (
                  <TransactionDetailModal
                    load={load}
                  />
                )
                : <DefaultBox />
            }
          </TransactionFieldsBox>
        </TextBox>
        <AddButtonBox>
          <Button
            value="내역추가"
            onClick={handleClickDetailModal}
          />
        </AddButtonBox>
      </TextContainer>
    </Container>
  );
}
