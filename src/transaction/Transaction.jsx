import React from 'react';

import { v4 as uuid } from 'uuid';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const Container = styled.div(mediaquery({
  width: '100%',
  height: ['31%', '34%', '35%', '16%', '18%'],
  margin: '.5em auto',
  padding: ' .5em',
  border: `${colors.gray_backgroud} solid 1px`,
  borderRadius: '.3em',
}));

const DeleteBox = styled.div({
  float: 'left',
  width: '100%',
  fontSize: ['.8em', '.9em', '.9em', '.9em', '.9em'],
  opacity: 0.5,
  '& div': {
    float: 'right',
    padding: '0 .3em',
  },
});

const OptionBox = styled.div(mediaquery({
  float: 'left',
  width: '35%',
  height: '80%',
  padding: '.5em',
}));

const TextBox = styled.div(mediaquery({
  float: 'left',
  width: '65%',
  height: '80%',
  padding: '.5em',
}));

const Type = styled.div(mediaquery({
  float: 'left',
  width: '40%',
  height: '40%',
  margin: '.2em',
  borderRadius: '5em',
  backgroundColor: 'pink',
  fontSize: ['.1em', '.5em', '.6em', '.8em', '.9em'],
  lineHeight: ['18em', '4.5em', '2.6em', '1.3em', '1.7em'],
  opacity: 0.8,
}));

const Category = styled.div(mediaquery({
  float: 'left',
  width: '70%',
  height: '45%',
  margin: '.3em',
  padding: '.4em',
  borderRadius: '.2em',
  backgroundColor: `${colors.teal_border}`,
  fontSize: ['.1em', '.5em', '.6em', '.8em', '.9em'],
  lineHeight: ['18em', '4em', '2em', '.8em', '1.2em'],
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

export default function DailyTransaction({ histories }) {
  return (
    <>
      { histories === undefined
        ? null
        : histories.transactionHistories.map(({ type, category, transactionFields }) => (
          <Container
            key={type}
          >
            <DeleteBox>
              <div>
                <FontAwesomeIcon icon={faEdit} />
              </div>
              <div>
                <FontAwesomeIcon icon={faTrashAlt} />
              </div>
            </DeleteBox>
            <OptionBox>
              <Type>{type}</Type>
              <Category>{category.value}</Category>
            </OptionBox>
            <TextBox>
              <Breakdown>
                {type === '수입'
                  ? '+'
                  : '-'}
                {' '}
                {transactionFields.breakdown}
                {' '}
                원
              </Breakdown>
              <Text>
                {`${transactionFields.source} / ${transactionFields.memo}`}
              </Text>
            </TextBox>
          </Container>
        ))}
    </>
  );
}
