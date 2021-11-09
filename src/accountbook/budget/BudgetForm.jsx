import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

import Button from '../../component/Button';

export default function BudgetForm({ budget, onChange, onSubmit }) {
  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <Container>
      <Title>한 달 예산을 세워볼까요?</Title>
      <SubTitle>예산을 설정하고 계획적으로 관리 해보세요.</SubTitle>
      <InputBox>
        <form>
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
            autoComplete="off"
          />
          <span>원</span>
          <ButtonLayout>
            <Button
              value="등록"
              onClick={onSubmit}
            />
          </ButtonLayout>
        </form>
      </InputBox>
      <UnderLine />
    </Container>
  );
}

const Container = styled.div(mediaquery({
  width: ['14em', '17em', '17em', '38em', '45em', '55em'],
  height: ['18em', '15em', '16em', '30em', '40em', '55em'],
  margin: [
    '3em auto 0',
    '2em auto 0',
    '3em auto 0',
    '3em auto 0',
    '5em auto 0',
    '4em auto 0',
  ],
  textAlign: 'center',
}));

const Title = styled.h2(mediaquery({
  display: 'inline-block',
  margin: '2em auto 0',
  fontWeight: 'bold',
  fontSize: ['1.1em', '1.3em', '1.4em', '2.3em', '3em', '4em'],
  lineHeight: [5, 2, 3, 3, 3, 4],
}));

const SubTitle = styled.p(mediaquery({
  margin: [
    '2em auto 5em',
    '3em auto',
    '2em auto 3em',
    '3em auto 4em',
    '2em auto 4em',
    '3em auto 4em',
  ],
  color: `${colors.gray_text}`,
  fontSize: ['0.7em', '0.8em', '0.9em', '1.5em', '2.1em', '2.4em'],
}));

const InputBox = styled.div(mediaquery({
  margin: '0 auto',
  fontSize: ['0.5em', '0.5em', '0.5em', '0.9em', '1em', '1em'],
  '& label': {
    fontSize: ['1.4em', '1.4em', '1.7em', '1.4em', '1.8em', '2em'],
  },
  '& input': {
    width: ['9em', '9em', '9em', '16em', '12em', '16em'],
    height: ['2.5em', '2.5em', '2.2em', '2.5em', '2.8em', '3em'],
    margin: '0 0.5em',
    padding: '0.4em',
    border: 'none',
    fontSize: ['1.5em', '1.8em', '1.8em', '1.5em', '2em', '2em'],
    textAlign: 'right',
    outlineStyle: 'none',
  },
  '& span': {
    fontSize: ['1.5em', '1.5em', '1.8em', '1.5em', '1.9em', '2em'],
  },
}));

const UnderLine = styled.div(mediaquery({
  width: ['13.5em', '15em', '16em', '35em', '42.5em', '52em'],
  height: ['0.4em', '0.4em', '0.5em', '0.8em', '1em', '1em'],
  margin: '0 auto',
  backgroundColor: `${colors.teal}`,
}));

const ButtonLayout = styled.span(mediaquery({
  '& button': {
    marginLeft: '0.5em',
    padding: '0.2em 0.4em',
    borderRadius: '0.3em',
    color: `${colors.gray_text}`,
    backgroundColor: `${colors.teal_modal}`,
    fontSize: '0.7em',
    fontWeight: '500',
    cursor: 'pointer',
    '&:hover': {
      color: `${colors.gray_text02}`,
      fontWeight: '700',
    },
  },
}));
