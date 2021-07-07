import styled from '@emotion/styled';
import colors from './style/colors';

const BodyContainer = styled.div({
  width: '50%',
  height: '15em',
  margin: '2em auto .5em',
  borderBottom: `${colors.teal} solid .8em`,
  textAlign: 'center',
});

const Title = styled.h2({
  margin: '0 auto',
  fontWeight: 'bold',
  lineHeight: '3em',
});

const SubTitle = styled.p({
  margin: '.5em auto',
  color: `${colors.gray_text}`,
});

const InputBox = styled.div({
  margin: '5em auto',
  fontSize: '.8em',
  '& input': {
    width: '15em',
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
});

export default function BudgetForm({ budget, onChange }) {
  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <BodyContainer>
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
    </BodyContainer>
  );
}
