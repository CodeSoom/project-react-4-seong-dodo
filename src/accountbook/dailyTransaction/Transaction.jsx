/* eslint-disable consistent-return */
import React, { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import { exchangeRegEX, replaceString, removeDecimalPoint } from '../../utils/utils';

const Container = styled.div(mediaquery({
  width: '100%',
  height: ['40%', '40%', '35%', '16%', '18%'],
  margin: '0.5em auto',
  padding: '0.5em',
  border: `${colors.gray_backgroud} solid 1px`,
  borderRadius: '0.3em',
}));

const DeleteBox = styled.div({
  float: 'left',
  width: '100%',
  fontSize: ['.8em', '.9em', '.9em', '.9em', '.9em'],
  opacity: 0.5,
  '& div': {
    float: 'right',
    padding: '0 0.3em',
    cursor: 'pointer',
  },
});

const OptionBox = styled.div(mediaquery({
  float: 'left',
  width: '40%',
  height: '80%',
  padding: '0.5em',
}));

const TextBox = styled.div(mediaquery({
  float: 'left',
  width: '60%',
  height: '80%',
  padding: '0.5em',
}));

const Category = styled.div(mediaquery({
  float: 'left',
  width: '70%',
  height: '50%',
  margin: '0.3em',
  // padding: '.4em',
  borderRadius: '0.2em',
  border: `${colors.gray_text04} solid 1px`,
  fontSize: ['0.4em', '0.4em', '.6em', '.8em', '.9em'],
  lineHeight: ['4em', '3em', '2em', '.8em', '1.2em'],
  opacity: 0.8,
}));

const Breakdown = styled.div(mediaquery({
  width: '95%',
  height: '40%',
  margin: '0 .5em',
  padding: '.5em',
  color: `${colors.gray_text02}`,
  fontSize: ['.5em', '.5em', '.6em', '.8em', '.9em'],
  fontWeight: '600',
  textAlign: 'right',
  lineHeight: ['2em', '2em', '1em', '.7em', '1em'],
}));

const Text = styled.div(mediaquery({
  width: '95%',
  height: '40%',
  margin: '0 .5em',
  padding: '.5em',
  color: `${colors.gray_text}`,
  fontSize: ['.1em', '.4em', '.5em', '.7em', '.8em'],
  textAlign: 'left',
  lineHeight: ['18em', '4.5em', '2em', '.7em', '1em'],
}));

const ExpenseStyle = {
  float: 'left',
  width: '70%',
  height: '45%',
  margin: '0.2em',
  borderRadius: '0.5em',
  backgroundColor: `${colors.gray_text03}`,
  fontSize: ['.1em', '0.5em', '.6em', '.8em', '.9em'],
  lineHeight: ['18em', '4em', '2.6em', '1.3em', '1.7em'],
  opacity: 0.8,
};

const IncomeStyle = {
  float: 'left',
  width: '70%',
  height: '45%',
  margin: '0.2em',
  borderRadius: '0.5em',
  backgroundColor: `${colors.red_text02}`,
  fontSize: ['.1em', '0.5em', '.6em', '.8em', '.9em'],
  lineHeight: ['18em', '4em', '2.6em', '1.3em', '1.7em'],
  opacity: 0.8,
};

export default function Transaction({
  histories, onClickEdit, onClickDelete, load,
}) {
  const typeStyle = (type) => {
    if (type === '수입') {
      return IncomeStyle;
    }
    if (type === '지출') {
      return ExpenseStyle;
    }
  };

  useEffect(async () => {
    await load();
  }, []);

  return (
    <>
      { histories === undefined
        ? null
        : (
          <>
            {
              histories.transactionHistories.map(({
                id, type, category, transactionFields,
              }) => (
                <Container
                  key={type}
                >
                  <DeleteBox>
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
                  </DeleteBox>
                  <OptionBox>
                    <div
                      style={typeStyle(type)}
                    >
                      {type}
                    </div>
                    <Category>
                      {category.value}
                    </Category>
                  </OptionBox>
                  <TextBox>
                    <Breakdown>
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
                    </Breakdown>
                    <Text>
                      {`${transactionFields.source} / ${transactionFields.memo}`}
                    </Text>
                  </TextBox>
                </Container>
              ))
            }
          </>
        )}
    </>

  );
}
