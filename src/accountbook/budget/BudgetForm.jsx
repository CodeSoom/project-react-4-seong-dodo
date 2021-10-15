import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Container = styled.div(mediaquery({
  width: ['80%', '80%', '80%', '70%', '65%'],
  height: ['8em', '11em', '12em', '25em', '30em'],
  margin: [
    '2em auto',
    '1.5em auto 2.5em',
    '3em auto 2em',
    '3em auto 4em',
    '6em auto',
  ],
  borderBottom: [
    `${colors.teal} solid 0.3em`,
    `${colors.teal} solid 0.3em`,
    `${colors.teal} solid 0.4em`,
    `${colors.teal} solid 0.5em`,
    `${colors.teal} solid 0.7em`,
  ],
  textAlign: 'center',
}));

const Title = styled.h2(mediaquery({
  margin: '0 auto',
  fontWeight: 'bold',
  lineHeight: ['4em', '4em', '3em', '5em', '6em'],
  fontSize: ['1em', '1em', '1.3em', '2.2em', '2.3em'],
}));

const SubTitle = styled.p(mediaquery({
  margin: [
    '1.5em auto 3em',
    '1.5em auto 3em',
    '1.5em auto 3em',
    '2em auto 4em',
    '2em auto 4em',
  ],
  color: `${colors.gray_text}`,
  fontSize: ['0.7em', '0.7em', '0.9em', '1.3em', '1.5em'],
}));

const InputBox = styled.div(mediaquery({
  margin: '0 auto',
  fontSize: ['0.4em', '0.4em', '0.5em', '0.7em', '0.8em'],
  '& label': {
    fontSize: ['1em', '1em', '1.5em', '1.5em', '1.5em'],
  },
  '& input': {
    width: ['10em', '10em', '10em', '12em', '15em'],
    margin: '0 0.5em',
    border: 'none',
    padding: '0.4em',
    fontSize: '2em',
    textAlign: 'right',
    outlineStyle: 'none',
  },
  '& span': {
    fontSize: ['2em', '2em', '2em', '2em', '2em'],
  },
}));

export default function BudgetForm({ budget, onChange }) {
  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <Container>
      <Title>한 달 예산을 세워볼까요?</Title>
      <SubTitle>예산을 설정하고 계획적으로 관리 해보세요.</SubTitle>
      <InputBox>
        <label htmlFor="budget">
          한 달 예산
        </label>
        <input
          type="text"
          placeholder="0"
          id="budget"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
        <span>원</span>
      </InputBox>
    </Container>
  );
}
