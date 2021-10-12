import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Loading from '../../loading/Loading';
import TransactionList from './TransactionList';

import {
  loadAnnualTransaction,
} from '../../reducers/accountbook';

export default function TimeLineContainer() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const {
    accessToken, transactionHistoryResponseList,
  } = useSelector((state) => ({
    accessToken: state.user.accessToken,
    // nextPage: state.accountbook.nextPage,
    // totalCount: state.accountbook.totalCount,
    transactionHistoryResponseList: state.accountbook.transactionHistoryResponseList,
  }));

  useEffect(async () => {
    setIsLoading(true);
    if (accessToken) {
      await dispatch(loadAnnualTransaction());
    }
    setIsLoading(false);
  }, []);

  return (
    <>
      {
        accessToken
          ? (
            <>
              {
                isLoading
                  ? <Loading />
                  : (
                    <>
                      <TransactionList
                        transactionList={transactionHistoryResponseList}
                        loadAnnualTransaction={loadAnnualTransaction}
                      />
                    </>
                  )
              }
            </>
          )
          : <div>내역 페이지입니다. 로그인으로 이동하기</div>
      }
    </>
  );
}
