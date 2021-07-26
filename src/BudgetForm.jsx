import styled from '@emotion/styled';
import colors from './style/colors';
import mediaquery from './style/mediaquery';

const Container = styled.div(mediaquery({
  width: ['80%', '65%', '60%', '55%', '50%'],
  height: ['8em', '9em', '8em', '14em', '15em'],
  margin: ['2em auto', '3.5em auto', '4em auto', '2em auto', '2em auto .5em'],
  borderBottom: [`${colors.teal} solid .3em`, `${colors.teal} solid .4em`, `${colors.teal} solid .4em`, `${colors.teal} solid .5em`, `${colors.teal} solid .8em`],
  textAlign: 'center',
}));

const Title = styled.h2(mediaquery({
  margin: '0 auto',
  fontWeight: 'bold',
  lineHeight: ['.5em', '2em', '1em', '3em', '3em'],
  fontSize: ['.5em', '.7em', '1em', '1.5em', '1.5em'],
}));

const SubTitle = styled.p(mediaquery({
  margin: ['4em auto', '2em auto', '1.5em auto', '.5em auto', '.5em auto'],
  color: `${colors.gray_text}`,
  fontSize: ['.4em', '.5em', '.7em', '1em', '1em'],
}));

const InputBox = styled.div(mediaquery({
  margin: ['3em auto', '10em auto', '6em auto', '5em auto', '5em auto'],
  fontSize: ['.1em', '.2em', '.3em', '.6em', '.7em'],
  '& input': {
    width: ['15em', '18em', '13em', '14em', '15em'],
    margin: '0 .5em',
    border: 'none',
    padding: '.4em',
    fontSize: '2em',
    textAlign: 'right',
    outlineStyle: 'none',
  },
  '& span': {
    fontSize: '2em',
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
          type="number"
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
