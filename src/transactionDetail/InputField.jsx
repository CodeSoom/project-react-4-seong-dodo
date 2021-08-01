import styled from '@emotion/styled';
import colors from '../style/colors';

const Container = styled.div({
  width: '100%',
  height: '98%',
  textAlign: 'center',
});

const LabelBox = styled.div({
  float: 'left',
  width: '25%',
  height: '100%',
  padding: '.5em',
  '& label': {
    fontSize: '.7em',
    letterSpacing: '.3em',
  },
});

const InputBox = styled.div({
  float: 'left',
  width: '75%',
  height: '100%',
  '& input': {
    width: '100%',
    height: '80%',
    margin: '0.5em auto',
    padding: '.5em',
    border: 'none',
    borderRadius: '1em',
    color: `${colors.gray_text02}`,
    fontSize: '.8em',
    textAlign: 'right',
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
