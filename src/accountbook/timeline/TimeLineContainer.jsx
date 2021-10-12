import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Loading from '../../loading/Loading';

import { exchangeRegEX, replaceString, removeDecimalPoint } from '../../utils/utils';

import {
  resetPage,
  setNextPage,
  loadAnnualTransaction,
} from '../../reducers/accountbook';

const ItemBox = styled.div({
  margin: '30px auto 0',
  width: '800px',
  height: '170px',
  border: '1px solid #E1E4E7',
  borderRadius: '5px',
});

const DateText = styled.div({
  marginTop: '20px',
  marginLeft: '30px',
  width: '90px',
  height: '19px',
  textAlign: 'left',
  fontSize: '.9em',
  lineHeight: 1.5,
  color: '#495057',
});

const UnderLine = styled.div({
  marginTop: '10px',
  marginBottom: '15px',
  marginLeft: '30px',
  marginRight: '30px',
  width: '740px',
  height: '1px',
  background: '#E1E4E7 0% 0% no-repeat padding-box',
});

const TypeBox = styled.div({
  marginBottom: '10px',
  width: '800px',
  height: '25px',
  lineHeight: '25px',
});

const TypeText = styled.div({
  float: 'left',
  marginLeft: '30px',
  width: '40px',
  height: '25px',
  textAlign: 'left',
  color: '#00C854',
  fontSize: '.8em',
});

const SectionBar = styled.div({
  float: 'left',
  display: 'inline-block',
  margin: '3px 20px',
  width: '1px',
  height: '19px',
  background: '#E1E4E7 0% 0% no-repeat padding-box',
});

const CategoryText = styled.div({
  float: 'left',
  width: '200px',
  height: '25px',
  textAlign: 'left',
  color: '#495057',
  fontSize: '.8em',
});

const BreakdownBox = styled.div({
  float: 'left',
  marginRight: '30px',
  width: '400px',
  height: '25px',
  textAlign: 'right',
  color: '#282C30',
  fontSize: '1em',
});

const SourceText = styled.div({
  marginBottom: '10px',
  marginLeft: '30px',
  marginRight: '30px',
  width: '740px',
  height: '25px',
  textAlign: 'left',
  color: '#495057',
  fontSize: '.9em',
  lineHeight: '25px',
});

const MemoText = styled.div({
  marginBottom: '20px',
  marginLeft: '30px',
  marginRight: '30px',
  width: '740px',
  height: '15px',
  textAlign: 'left',
  color: '#495057',
  fontSize: '.7em',
  lineHeight: '15px',
});

export default function TimeLineContainer() {
  const dispatch = useDispatch();

  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    accessToken, nextPage, totalPages, transactionHistoryResponseList,
  } = useSelector((state) => ({
    accessToken: state.user.accessToken,
    nextPage: state.accountbook.nextPage,
    totalPages: state.accountbook.totalPages,
    transactionHistoryResponseList: state.accountbook.transactionHistoryResponseList,
  }));

  const loadTransaction = async () => {
    // totalPages보다 같거나 크면 함수실행을 종료한다
    // 그렇지 않은 경우만 함수를 load하고 페이지를 올린다
    setIsLoading(true);
    await dispatch(loadAnnualTransaction());
    dispatch(setNextPage());
    setIsLoading(false);
  };

  const onIntersectScrollBar = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      await loadTransaction();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    dispatch(resetPage());
  }, []);

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersectScrollBar, {
        threshold: 0.5,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      {
        accessToken
          ? (
            <>
              <div>
                {
                  transactionHistoryResponseList.length === 0 && !isLoading
                    ? <div>내용없음</div>
                    : (
                      <>
                        <div>
                          {
                            transactionHistoryResponseList.map(({
                              id, transactionDateTime, type, category, transactionFields,
                            }) => (
                              <ItemBox key={id}>
                                <DateText>{transactionDateTime}</DateText>
                                <UnderLine />
                                <TypeBox>
                                  <TypeText>{type}</TypeText>
                                  <SectionBar />
                                  <CategoryText>{category.value}</CategoryText>
                                  <SectionBar />
                                  <BreakdownBox>
                                    { exchangeRegEX(replaceString(
                                      removeDecimalPoint(transactionFields.breakdown),
                                    ))}
                                    {' '}
                                    원
                                  </BreakdownBox>
                                </TypeBox>
                                <SourceText>
                                  거래처
                                  {' '}
                                  :
                                  {' '}
                                  {transactionFields.source}
                                </SourceText>
                                <MemoText>
                                  메모
                                  {' '}
                                  :
                                  {' '}
                                  {transactionFields.memo}
                                </MemoText>
                              </ItemBox>
                            ))
                          }
                        </div>
                      </>
                    )
                }
              </div>

              <div ref={setTarget} className="target-element">
                {isLoading && <Loading />}
              </div>
            </>
          )
          : <div>내역 페이지입니다. 로그인으로 이동하기</div>
      }
    </>
  );
}
