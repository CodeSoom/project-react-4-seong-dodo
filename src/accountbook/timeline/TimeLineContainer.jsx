import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';

import Loading from '../../loading/Loading';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import { exchangeRegEX, replaceString, removeDecimalPoint } from '../../utils/utils';

import {
  resetPage,
  setNextPage,
  loadAnnualTransaction,
} from '../../reducers/accountbook';

export default function TimeLineContainer() {
  const dispatch = useDispatch();

  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    accessToken, transactionHistoryResponseList,
  } = useSelector((state) => ({
    accessToken: state.user.accessToken,
    nextPage: state.accountbook.nextPage,
    totalPages: state.accountbook.totalPages,
    transactionHistoryResponseList: state.accountbook.transactionHistoryResponseList,
  }));

  const loadTransaction = async () => {
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
                    ? <Exception>내용없음</Exception>
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
          : <Exception>내역 페이지입니다. 로그인으로 이동하기</Exception>
      }
    </>
  );
}

const ItemBox = styled.div(mediaquery({
  width: ['15em', '18em', '21em', '40em', '45em', '50em'],
  height: ['6.6em', '7.6em', '7.7em', '9.5em', '10.5em', '12.4em'],
  margin: [
    '1em auto 0',
    '1em auto 0',
    '1em auto 0',
    '1.5em auto 0',
    '1.8em auto 0',
    '1.8em auto 0',
  ],
  border: '1px solid #E1E4E7',
  borderRadius: '5px',
}));

const DateText = styled.div(mediaquery({
  width: ['6em', '6em', '6em', '6em', '6em', '7em'],
  height: '1.5em',
  marginTop: '1.2em',
  marginLeft: '1.8em',
  color: '#495057',
  fontSize: ['0.6em', '0.7em', '0.7em', '0.8em', '0.9em', '1em'],
  lineHeight: [1.5, 1.6, 1.7, 1.6, 1.7, 1.5],
  textAlign: 'left',
}));

const UnderLine = styled.div(mediaquery({
  width: ['13.4em', '15.4em', '18.6em', '37em', '42em', '46.4em'],
  height: '1px',
  margin: [
    '0.3em 0.8em 0.4em',
    '0.3em 1.1em 0.4em',
    '0.4em 1em 0.5em',
    '0.6em 1.2em 0.6em',
    '0.6em 1.3em 0.9em',
    '0.6em 1.8em 0.9em',
  ],
  background: '#E1E4E7 0% 0% no-repeat padding-box',
}));

const TypeBox = styled.div(mediaquery({
  width: ['14.9em', '17.9em', '20.9em', '39.9em', '44.9em', '50em'],
  height: ['1em', '1.2em', '1.2em', '1.5em', '1.8em', '2em'],
  marginBottom: ['0.4em', '0.4em', '0.5em', '0.5em', '0.5em', '0.6em'],
  lineHeight: [1.5, 1.7, 1.8, 2, 2, 2],
}));

const TypeText = styled.div(mediaquery({
  float: 'left',
  width: ['3em', '3em', '4em', '5em', '5em', '5em'],
  height: '2em',
  marginLeft: ['1.8em', '1.8em', '1.8em', '1.8em', '1.8em', '1.8em'],
  color: `${colors.blue_text}`,
  fontSize: ['0.5em', '0.6em', '0.6em', '0.8em', '0.9em', '1em'],
  textAlign: 'left',
  letterSpacing: '0.2em',
}));

const SectionBar = styled.div(mediaquery({
  float: 'left',
  display: 'inline-block',
  width: '1px',
  height: ['0.6em', '0.7em', '0.8em', '1.1em', '1.2em', '1.4em'],
  margin: '0.3em 0.6em',
  background: '#E1E4E7 0% 0% no-repeat padding-box',
}));

const CategoryText = styled.div(mediaquery({
  float: 'left',
  width: ['7em', '7em', '7em', '12.5em', '12.5em', '10em'],
  height: '2em',
  color: '#495057',
  fontSize: ['0.5em', '0.6em', '0.6em', '0.8em', '0.9em', '1em'],
  textAlign: 'left',
}));

const BreakdownBox = styled.div(mediaquery({
  float: 'left',
  width: ['9em', '11em', '13.5em', '22em', '23em', '23.5em'],
  height: ['2em', '2em', '1.8em', '1.8em', '1.8em', '1.7em'],
  color: '#282C30',
  fontSize: ['0.6em', '0.6em', '0.7em', '0.9em', '1em', '1.2em'],
  textAlign: 'right',
  lineHeight: [1.5, 1.7, 1.5, 1.8, 2, 1.5],
}));

const SourceText = styled.div(mediaquery({
  width: ['20.5em', '21em', '25.5em', '46em', '46em', '46.5em'],
  height: ['1.5em', '1.4em', '1.4em', '1.5em', '1.8em', '2em'],
  margin: '0 1.8em 0.6em',
  color: '#495057',
  fontSize: ['0.6em', '0.7em', '0.7em', '0.8em', '0.9em', '1em'],
  textAlign: 'left',
  lineHeight: [1.5, 1.5, 1.5, 1.5, 2, 2],
}));

const MemoText = styled.div(mediaquery({
  width: ['20.5em', '21em', '25.5em', '46em', '46em', '51em'],
  height: ['1.5em', '1.4em', '1.4em', '1.4em', '1.7em', '2em'],
  margin: '0 1.8em 1em',
  color: '#495057',
  fontSize: ['0.6em', '0.7em', '0.7em', '0.8em', '0.9em', '1em'],
  textAlign: 'left',
  lineHeight: [1.5, 1.5, 1.5, 1.6, 2, 2],
}));

const Exception = styled.p(mediaquery({
  margin: '8em auto',
  color: `${colors.gray_text}`,
  fontSize: ['0.7em', '0.8em', '0.9em', '1.2em', '1.5em', '1.5em'],
  textAlign: 'center',
  lineHeight: '10em',
}));
