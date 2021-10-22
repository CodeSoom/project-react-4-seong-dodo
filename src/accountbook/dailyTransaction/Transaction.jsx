/* eslint-disable consistent-return */
import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import { exchangeRegEX, replaceString, removeDecimalPoint } from '../../utils/utils';

const ExpenseStyle = {
  borderRadius: '0.8em',
  backgroundColor: `${colors.gray_text03}`,
};

const IncomeStyle = {
  borderRadius: '0.8em',
  backgroundColor: `${colors.red_text02}`,
};

export default function Transaction({
  histories, onClickEdit, onClickDelete, load,
}) {
  const { transactionHistories } = histories;

  useEffect(async () => {
    await load();
  }, []);

  const typeStyle = (type) => {
    if (type === '수입') {
      return IncomeStyle;
    }
    if (type === '지출') {
      return ExpenseStyle;
    }
  };

  return (
    <>
      { transactionHistories.length === 0
        ? null
        : (
          <>
            {
              transactionHistories.map(({
                id, type, category, transactionFields,
              }) => (
                <Container
                  key={type}
                >
                  <DeleteLayout>
                    <div
                      onClick={() => onClickDelete(id)}
                      role="presentation"
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </div>
                    <div
                      onClick={() => onClickEdit(id)}
                      role="presentation"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </div>
                  </DeleteLayout>
                  <OptionLayoutGrid>
                    <TypeBox>
                      <div
                        style={typeStyle(type)}
                      >
                        {type}
                      </div>
                    </TypeBox>
                    <CategoryBox>
                      {category.value}
                    </CategoryBox>
                  </OptionLayoutGrid>
                  <TextLayoutGrid>
                    <BreakdownBox>
                      {type === '수입'
                        ? '+'
                        : '-'}
                      {' '}
                      {
                        exchangeRegEX(replaceString(removeDecimalPoint(
                          transactionFields.breakdown,
                        )))
                      }
                      {' '}
                      원
                    </BreakdownBox>
                    <TextBox>
                      {`${transactionFields.source} / ${transactionFields.memo}`}
                    </TextBox>
                  </TextLayoutGrid>
                </Container>
              ))
            }
          </>
        )}
    </>

  );
}

const Container = styled.div(mediaquery({
  width: ['14.5em', '16em', '18.5em', '36em', '25em', '29em'],
  height: ['4.5em', '4.5em', '4.5em', '6em', '6.5em', '6em'],
  margin: [
    '0 auto 0.5em',
    '0 auto 0.5em',
    '0 auto 0.6em',
    '0 auto 0.6em',
    '0 auto 0.6em',
    '0 auto 0.6em',
  ],
  padding: ['0.3em', '0.3em', '0.3em', '0.5em', '0.5em', '0.5em'],
  border: `${colors.gray_backgroud} solid 1px`,
  borderRadius: '0.3em',
}));

const DeleteLayout = styled.div(mediaquery({
  float: 'left',
  width: ['27.5em', '30.5em', '35.5em', '49.6em', '30em', '34.5em'],
  height: ['1.4em', '1.5em', '1.5em', '1.3em', '1.2em', '1.3em'],
  fontSize: ['0.5em', '0.5em', '0.5em', '0.7em', '0.8em', '0.8em'],
  opacity: 0.5,
  '& div': {
    float: 'right',
    padding: '0 0.3em',
    cursor: 'pointer',
  },
}));

const OptionLayoutGrid = styled.div(mediaquery({
  float: 'left',
  width: ['4em', '4.5em', '4.5em', '7em', '7em', '7em'],
  height: ['3em', '3em', '3em', '4em', '4.2em', '4em'],
  padding: [
    '0.4em 0',
    '0.4em 0',
    '0.2em 0',
    '0.3em',
    '0.5em',
    '0.5em',
  ],
}));

const TypeBox = styled.div(mediaquery({
  float: 'left',
  width: ['13em', '8.7em', '7em', '7.8em', '7.2em', '7em'],
  height: ['3.5em', '1.9em', '1.8em', '1.7em', '1.5em', '1.3em'],
  margin: '0.2em',
  fontSize: ['0.3em', '0.5em', '0.6em', '0.8em', '0.8em', '0.8em'],
  lineHeight: [1.5, 1.2, 1.5, 1.5, 1.5, 1.5],
  opacity: 0.8,
}));

const CategoryBox = styled.div(mediaquery({
  float: 'left',
  width: ['13em', '11em', '7em', '7.5em', '7em', '7em'],
  height: ['3em', '2em', '1.6em', '1.7em', '1.7em', '1.5em'],
  margin: '0.3em',
  border: `${colors.gray_text04} solid 1px`,
  borderRadius: '0.2em',
  fontSize: ['0.3em', '0.4em', '0.6em', '0.8em', '0.8em', '0.8em'],
  lineHeight: [1.2, 1.2, 1.5, 1.5, 1.5, 1.5],
  opacity: 0.8,
}));

const TextLayoutGrid = styled.div(mediaquery({
  float: 'left',
  width: ['9.7em', '10.7em', '13.2em', '27.6em', '16.8em', '20.7em'],
  height: ['3em', '3em', '3em', '4em', '4.2em', '4em'],
  margin: '0 auto',
  padding: [
    '0.5em 0.3em 0',
    '0.5em 0.3em 0',
    '0.5em 0.5em 0',
    '1em 0.5em 0',
    '1em 0.5em 0',
    '0.5em 0.5em 0',
  ],
}));

const BreakdownBox = styled.div(mediaquery({
  width: ['18em', '20em', '20.5em', '33.2em', '17.5em', '21.5em'],
  height: ['2em', '2em', '1.8em', '1.5em', '1.5em', '2em'],
  color: `${colors.gray_text02}`,
  fontSize: ['0.5em', '0.5em', '0.6em', '0.8em', '0.9em', '0.9em'],
  fontWeight: '600',
  textAlign: 'right',
  lineHeight: [1.5, 1.5, 1.5, 1.5, 1.6, 2],
}));

const TextBox = styled.div(mediaquery({
  width: ['22.5em', '25em', '24.5em', '33.2em', '19.5em', '27.5em'],
  height: ['2.5em', '2.5em', '2em', '1.5em', '1.6em', '2em'],
  color: `${colors.gray_text}`,
  fontSize: ['0.4em', '0.4em', '0.5em', '0.8em', '0.8em', '0.7em'],
  textAlign: 'left',
  lineHeight: [1.5, 1.5, 1.5, 1.5, 1.5, 2],
}));
