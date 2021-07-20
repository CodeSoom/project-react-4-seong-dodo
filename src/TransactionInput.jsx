import styled from '@emotion/styled';
import colors from './style/colors';

import InputField from './InputField';
import OptionsField from './OptionsField';

const Container = styled.div({
  width: '100%',
  margin: '0 auto',
  color: `${colors.gray_test02}`,
});

const NumberBox = styled.div({
  position: 'absolute',
  top: 0,
  left: 40,
  width: '90%',
  margin: '0 auto',
  fontSize: '.9em',
  lineHeight: '4em',
  '& span': {
    position: 'absolute',
    top: 0,
    right: 60,
  },
});

const InputBox = styled.div({
  width: '90%',
  height: '3em',
  margin: '.5em 2em',
  textAlign: 'left',
  lineHeight: '3em',
});

const OptionBox = styled.div({
  width: '85%',
  height: '7em',
  margin: '0 auto',
  marginTop: '2em',
});

const SubmitBox = styled.div({
  width: '75%',
  height: '2em',
  margin: '2.5em auto',
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
      <NumberBox>
        <InputField
          label=""
          id="breakdown"
          name="breakdown"
          type="number"
          placeholder="0"
          value={breakdown}
          onChange={onChange}
        />
        <span>
          원
          {' '}
          🖋️
        </span>
      </NumberBox>
      <OptionBox>
        <OptionsField />
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
