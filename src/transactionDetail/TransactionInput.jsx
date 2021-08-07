import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

import InputField from './InputField';
import OptionsFieldContainer from './OptionsFieldContainer';

const Container = styled.div(mediaquery({
  width: '95%',
  height: '100%',
  color: `${colors.gray_test02}`,
  margin: '0 auto',
}));

const InputBox = styled.div(mediaquery({
  width: '100%',
  height: ['18%', '18%', '19%', '15%', '15%'],
  marginBottom: ['0', '0', '0', '.5em', '.5em'],
  padding: '.5em',
}));

const Number = styled.div(mediaquery({
  float: 'left',
  width: '85%',
  height: '100%',
  fontSize: ['.7em', '.7em', '.9em', '.9em', '.9em'],
}));

const Child = styled.div(mediaquery({
  float: 'left',
  width: '15%',
  height: '100%',
  fontSize: ['.3em', '.5em', '.8em', '.8em', '.8em'],
  lineHeight: ['6em', '3.5em', '2.5em', '3.6em', '3.6em'],
  letterSpacing: 3,
}));

const OptionBox = styled.div(mediaquery({
  width: '100%',
  height: ['30%', '35%', '30%', '32%', '32%'],
  marginBottom: ['0', '0', '0', '.5em', '.5em'],
}));

const SubmitBox = styled.div(mediaquery({
  width: ['30%', '30%', '30%', '50%', '50%'],
  height: ['9%', '9%', '9%', '7%', '7%'],
  margin: ['0.5em auto 0', '0.5em auto 0', '0.5em auto 0', '3em auto 0', '3em auto 0'],
  textAlign: 'center',
  lineHeight: '2em',
  borderRadius: '.2em',
  color: `${colors.white}`,
  backgroundColor: `${colors.teal}`,
  fontSize: ['.7em', '.7em', '.8em', '.8em', '.8em'],
  fontWeight: '600',
  letterSpacing: 5,
}));

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
