/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import Button from './Button';
import Loading from '../../loading/Loading';
import TransactionData from './TransactionData';
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
  paddingTop: ['1.2em', '1.5em', '2em', '6em', '14em', '5em'],
  backgroundColor: `${colors.teal_modal}`,
  zIndex: 1,
}));

const TextContainer = styled.div(mediaquery({
  bottom: 0,
  width: ['17em', '18em', '21em', '40em', '55em', '65em'],
  height: ['38em', '32em', '37.5em', '50em', '47em', '42.5em'],
  margin: '0 auto',
  padding: ['0.5em', '0.5em', '0.5em', '1em', '1em', '1em'],
  border: `${colors.teal_border} solid 1px`,
  borderRadius: '0.4em',
  color: `${colors.gray_text02}`,
  backgroundColor: `${colors.white}`,
}));

const CloseButtonLayout = styled.div(mediaquery({
  height: ['1.6em', '1.6em', '1.6em', '1.6em', '1.6em', '1.6em'],
  padding: '0.1em 0.5em',
  color: `${colors.gray_text}`,
  fontSize: ['0.8em', '0.8em', '0.9em', '1.1em', '1.2em', '1.1em'],
  fontWeight: '600',
  textAlign: 'right',
}));

const DateBoxLayOut = styled.div(mediaquery({
  height: ['1.8em', '1.8em', '1.8em', '1.7em', '1.8em', '2em'],
  padding: '0.2em 1em',
  fontSize: ['0.7em', '0.7em', '0.8em', '0.9em', '1em', '1em'],
  textAlign: 'left',
}));

const DataLayout = styled.div(mediaquery({
  height: ['1.8em', '1.8em', '1.7em', '1.7em', '1.7em', '1.5em'],
  margin: 0,
  padding: '0 1em',
  borderBottom: `${colors.gray_backgroud} solid 1px`,
  color: `${colors.gray_text03}`,
  fontSize: ['0.5em', '0.6em', '0.7em', '0.8em', '0.9em', '0.9em'],
  textAlign: 'left',
}));

const TextBoxLayout = styled.div(mediaquery({
  height: ['31em', '25em', '30em', '40em', '35em', '32em'],
  margin: '0 auto',
}));

const TransactionBox = styled.div(mediaquery({
  float: 'left',
  width: ['14.7em', '16em', '18.6em', '36em', '25em', '29em'],
  height: ['14em', '9em', '11.8em', '17em', '32.5em', '30em'],
  margin: [
    '0.5em 0.6em',
    '0.5em 0.4em',
    '0.5em 0.6em',
    '1em 0.8em',
    '1em 0.8em',
    '1em 0.8em',
  ],
  padding: 0,
  overflow: 'auto',
}));

const TransactionFieldsBox = styled.div(mediaquery({
  float: 'left',
  width: ['14.9em', '15.9em', '18.8em', '35.6em', '24em', '30.5em'],
  height: ['15em', '14em', '16.2em', '19.7em', '32em', '28em'],
  margin: [
    '0.3em 0.5em',
    '0.3em 0.5em',
    '0.3em 0.5em',
    '0.3em 1em',
    '1.5em 0.8em',
    '2em 0.8em',
  ],
  padding: ['0.5em', '0.5em', '0.5em', '0.5em', '1em', '1em'],
}));

const AddButtonLayout = styled.div(mediaquery({
  float: 'clear',
  width: ['18em', '20em', '23.4em', '20em', '22em', '20em'],
  height: ['2.6em', '2.4em', '2.4em', '2.4em', '2.6em', '2.4em'],
  margin: '0 auto',
  padding: '0.5em 1em',
  borderRadius: '0.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.8em', '0.8em', '0.8em', '1.1em', '1.1em', '1.2em'],
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
    `${colors.gray_backgroud} solid 1px`,
    'none',
    'none',
  ],
  borderLeft: [
    'none',
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
    if (confirm('정말 삭제하시겠습니까?') === false) {
      setIsLoading(true);
      await load();
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    await dispatch(sendDeleteTransaction({ id }));
    await load();
    setIsLoading(false);
  };

  const histories = dailyTransaction.find(
    (daily) => daily.year === dailyData.year
  && daily.month === dailyData.month
  && daily.date === dailyData.date
  && daily.day === dailyData.day,
  );

  return (
    <Container>
      <TextContainer>
        <CloseButtonLayout>
          <Button
            value="X"
            onClick={onClick}
          />
        </CloseButtonLayout>
        <DateBoxLayOut>
          {date}
          일
          {' '}
          {convertDay()}
          요일
        </DateBoxLayOut>
        <DataLayout>
          { histories === undefined
            ? null
            : (
              <>
                <TransactionData
                  histories={histories}
                />
              </>
            )}
        </DataLayout>
        <TextBoxLayout>
          <TransactionBox>
            {
              isLoading
                ? <Loading />
                : (
                  <DailyTransaction
                    histories={histories}
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
        </TextBoxLayout>
        <AddButtonLayout>
          <Button
            value="내역추가"
            onClick={handleClickDetailModal}
          />
        </AddButtonLayout>
      </TextContainer>
    </Container>
  );
}
