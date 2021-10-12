import React, { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import Loading from '../../loading/Loading';

import { exchangeRegEX, replaceString } from '../../utils/utils';

const ItemBox = styled.div({
  margin: '0 auto 30px',
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

export default function TransactionList({ transactionList, loadAnnualTransaction }) {
  const [target, setTarget] = useState(null);
  const [isLoading] = useState(false);

  const onIntersectScrollBar = async ([entry], observer) => {
    if (entry.isIntersectiong) {
      observer.unobserve(entry.target);
      await loadAnnualTransaction();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersectScrollBar, {
        threshold: 0.2,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      {
        transactionList.length === 0
          ? <div>등록된 내역이 없습니다.</div>
          : (
            <>
              {
                transactionList.map(({
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
                        {exchangeRegEX(replaceString(transactionFields.breakdown))}
                        {' '}
                        원
                      </BreakdownBox>
                    </TypeBox>
                    <SourceText>
                      거래처 :
                      {transactionFields.source}
                    </SourceText>
                    <MemoText>
                      메모:
                      {' '}
                      {transactionFields.memo}
                    </MemoText>
                  </ItemBox>
                ))
              }
              <div ref={setTarget} className="target-element">
                {isLoading && <Loading />}
              </div>
            </>
          )
      }
    </>
  );
}
