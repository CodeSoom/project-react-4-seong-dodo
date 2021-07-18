import styled from '@emotion/styled';
import colors from './style/colors';

const Container = styled.div({
  height: '3em',
  margin: '.5em 1.2em',
  padding: '0 .2em',
  textAlign: 'center',
  lineHeight: '3em',
});

const LabelBox = styled.div({
  float: 'left',
  width: '5em',
  height: '3em',
  linehigt: '3em',
  '& label': {
    fontSize: '.8em',
    letterSpacing: '.3em',
  },
});

const InputBox = styled.div({
  float: 'left',
  '& input': {
    width: '20em',
    height: '3em',
    padding: '.5em',
    border: 'none',
    borderRadius: '1em',
    color: `${colors.gray_text02}`,
    fontSize: '.8em',
    textAlign: 'right',
    lineHeight: '3em',
    outlineStyle: 'none',
  },
});

export default function InputField({
  label, type = 'text', name, placeholder, value, onChange,
}) {
  const id = `input-${name}`;

  function handleChange(event) {
    const { target } = event;
    onChange({ name, value: target.value });
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
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </InputBox>
    </Container>
  );
}
