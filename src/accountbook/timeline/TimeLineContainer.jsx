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

const ItemBox = styled.div(mediaquery({
  margin: [
    '1em auto 0',
    '1em auto 0',
    '1em auto 0',
    '1.5em auto 0',
    '30px auto 0',
  ],
  // width: '800px',
  // height: '170px',
  width: ['90%', '90%', '90%', '85%', '800px'],
  height: ['6em', '6em', '7em', '10em', '170px'],
  border: '1px solid #E1E4E7',
  borderRadius: '5px',
}));

const DateText = styled.div(mediaquery({
  marginTop: ['1em', '1em', '1em', '1em', '20px'],
  marginLeft: ['1em', '1em', '1em', '1em', '30px'],
  // width: '90px',
  // height: '19px',
  width: ['50%', '50%', '50%', '50%', '90px'],
  height: ['10%', '10%', '10%', '10%', '19px'],
  textAlign: 'left',
  fontSize: ['0.7em', '0.7em', '0.7em', '0.9em', '.9em'],
  lineHeight: 1.5,
  color: '#495057',

  // backgroundColor: 'beige',
}));

const UnderLine = styled.div(mediaquery({
  margin: [
    '0.4em auto',
    '0.4em auto',
    '0.5em auto',
    '1em auto',
    '10px 30px 15px',
  ],
  // marginTop: '10px',
  // marginBottom: '15px',
  // marginLeft: '30px',
  // marginRight: '30px',
  // width: '740px',
  width: ['90%', '90%', '95%', '95%', '740px'],
  height: '1px',
  background: '#E1E4E7 0% 0% no-repeat padding-box',
}));

const TypeBox = styled.div(mediaquery({
  marginBottom: ['0.5em', '0.5em', '0.5em', '0.5em', '10px'],
  // marginBottom: '10px',
  // width: '800px',
  // height: '25px',
  width: ['100%', '100%', '100%', '100%', '800px'],
  height: ['15%', '15%', '15%', '15%', '25px'],
  lineHeight: [1.5, 1.5, 1.5, 1.5, '25px'],

  // backgroundColor: 'pink',
}));

const TypeText = styled.div(mediaquery({
  float: 'left',
  // marginLeft: '30px',
  // width: '40px',
  // height: '25px',
  // color: '#00C854',
  // fontSize: '.8em',
  marginLeft: ['1em', '1em', '1em', '1em', '30px'],
  width: ['10%', '10%', '12%', '15%', '40px'],
  height: ['15%', '15%', '15%', '15%', '25px'],
  textAlign: 'left',
  color: `${colors.blue_text}`,
  fontSize: ['0.7em', '0.7em', '0.7em', '0.9em', '0.8em'],
}));

const SectionBar = styled.div(mediaquery({
  float: 'left',
  display: 'inline-block',
  // margin: '3px 20px',
  // height:  '19px',
  margin: [
    '0 0.5em',
    '0 0.5em',
    '0 0.5em',
    '0 1em',
    '3px 20px',
  ],
  width: '1px',
  height: ['0.8em', '0.8em', '0.9em', '1em', '19px'],
  background: '#E1E4E7 0% 0% no-repeat padding-box',
}));

const CategoryText = styled.div(mediaquery({
  float: 'left',
  // width: '200px',
  // height: '25px',
  // fontSize: '.8em',
  width: ['20%', '20%', '25%', '30%', '200px'],
  height: ['15%', '15%', '15%', '15%', '25px'],
  textAlign: 'left',
  color: '#495057',
  fontSize: ['0.7em', '0.7em', '0.7em', '0.9em', '0.8em'],
}));

const BreakdownBox = styled.div(mediaquery({
  float: 'left',
  // marginRight: '30px',
  // width:  400px',
  // height: '25px',
  // fontSize: '1em',
  marginRight: ['1.2em', '1.2em', '1.2em', '1.2em', '30px'],
  width: ['45%', '45%', '40%', '35%', '400px'],
  height: ['15%', '15%', '15%', '15%', '25px'],
  textAlign: 'right',
  color: '#282C30',
  fontSize: ['0.8em', '0.8em', '0.8em', '1em', '1em'],
}));

const SourceText = styled.div(mediaquery({
  // marginBottom: '10px',
  // marginLeft: '30px',
  // marginRight: '30px',
  // width: '740px',
  // height: '25px',
  // fontSize: '.9em',
  // lineHeight: '25px',
  margin: [
    '0 auto 0.4em',
    '0 auto 0.4em',
    '0 auto 0.4em',
    '0 30px 10px',
    '0 30px 10px',
  ],
  width: ['90%', '90%', '90%', '90%', '740px'],
  height: ['15%', '15%', '15%', '15%', '25px'],
  textAlign: 'left',
  color: '#495057',
  fontSize: ['0.7em', '0.7em', '0.7em', '0.9em', '0.9em'],
  lineHeight: [1.5, 1.5, 1.5, 1.5, '25px'],

  // backgroundColor: 'skyblue',
}));

const MemoText = styled.div(mediaquery({
  // marginBottom: '20px',
  // marginLeft: '30px',
  // marginRight: '30px',
  // width: '740px',
  // height: '15px',
  // fontSize: '.7em',
  margin: [
    '0 auto 0.5em',
    '0 auto 0.5em',
    '0 auto 0.5em',
    '0 30px 20px',
    '0 30px 20px',
  ],
  width: ['90%', '90%', '90%', '90%', '740px'],
  height: ['10%', '10%', '10%', '10%', '15px'],
  textAlign: 'left',
  color: '#495057',
  fontSize: ['0.7em', '0.7em', '0.7em', '0.8em', '0.7em'],
  lineHeight: '15px',

  // backgroundColor: 'beige',
}));

const Exception = styled.p({
  margin: '8em auto',
  color: `${colors.gray_text}`,
  fontSize: '0.8em',
  textAlign: 'center',
  lineHeight: '10em',
});

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
