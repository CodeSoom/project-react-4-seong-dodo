import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import styled from '@emotion/styled';
import colors from '../style/colors';

import InputField from './InputField';
import OptionsFieldContainer from './OptionsFieldContainer';

const Container = styled.div({
  width: '100%',
  height: '100%',
  color: `${colors.gray_test02}`,
});

const InputBox = styled.div({
  width: '100%',
  height: '15%',
  marginBottom: '.5em',
  padding: '.5em',
});

const Number = styled.div({
  float: 'left',
  width: '85%',
  height: '100%',
  fontSize: '.9em',
});

const Child = styled.div({
  float: 'left',
  width: '15%',
  height: '100%',
  fontSize: '.8em',
  lineHeight: '3.6em',
  letterSpacing: 3,
});

const OptionBox = styled.div({
  width: '100%',
  height: '32%',
  marginBottom: '.5em',
});

const SubmitBox = styled.div({
  width: '50%',
  height: '7%',
  margin: '3em auto 0',
  textAlign: 'center',
  lineHeight: '2em',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontSize: '.8em',
  fontWeight: '600',
  letterSpacing: 5,
});

export default function TransactionInput({ fields, onChange, onClick }) {
  const { breakdown, source, memo } = fields;

  return (
    <Container>
      <InputBox>
        <Number>
          <InputField
            label=""
            id="breakdown"
            name="breakdown"
            type="number"
            placeholder="0"
            value={breakdown}
            onChange={onChange}
          />
        </Number>
        <Child>
          원
          {' '}
          <FontAwesomeIcon icon={faPen} />
        </Child>
      </InputBox>
      <OptionBox>
        <OptionsFieldContainer />
      </OptionBox>
      <InputBox>
        <InputField
          label="거래처"
          id="source"
          name="source"
          type="text"
          placeholder="거래처명을 입력하세요."
          value={source}
          onChange={onChange}
        />
      </InputBox>
      <InputBox>
        <InputField
          label="메모"
          id="memo"
          name="memo"
          type="text"
          placeholder="메모를 입력하세요."
          value={memo}
          onChange={onChange}
        />
      </InputBox>
      <SubmitBox>
        <button
          type="button"
          onClick={onClick}
        >
          저장
        </button>
      </SubmitBox>
    </Container>
  );
}
