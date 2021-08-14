import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const Container = styled.div(mediaquery({
  width: '100%',
  height: '98%',
  textAlign: 'center',
}));

const LabelBox = styled.div(mediaquery({
  float: 'left',
  width: '25%',
  height: '100%',
  padding: ['0', '0', '0', '.5em', '.5em'],
  '& label': {
    fontSize: ['.5em', '.6em', '.7em', '.7em', '.7em'],
    letterSpacing: '.3em',
  },
}));

const InputBox = styled.div(mediaquery({
  float: 'left',
  width: '75%',
  height: '100%',
  '& input': {
    width: ['90%', '90%', '90%', '100%', '100%'],
    height: ['95%', '95%', '95%', '80%', '80%'],
    margin: ['0 auto', '0 auto', '0 auto', '0.5em auto', '0.5em auto'],
    padding: '.5em',
    border: 'none',
    borderRadius: '1em',
    color: `${colors.gray_text02}`,
    fontSize: ['.5em', '.6em', '.7em', '.8em', '.8em'],
    textAlign: 'right',
    outlineStyle: 'none',
  },
}));

export default function InputBreakdownField({
  label, placeholder, value, onChangeBreakdown,
}) {
  const id = 'input-breakdown';

  function handleChange(event) {
    const { target } = event;
    onChangeBreakdown({ value: target.value });
  }

  return (
    <Container>
      <LabelBox>
        <label htmlFor={id}>
          {label}
        </label>
      </LabelBox>
      <InputBox>
        <input
          type="number"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </InputBox>
    </Container>
  );
}
