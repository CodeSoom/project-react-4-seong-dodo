import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Container = styled.div(mediaquery({
  margin: '0 auto',
  padding: 0,
  textAlign: 'center',
}));

const LabelBox = styled.div(mediaquery({
  float: 'left',
  width: ['3.2em', '3.5em', '4.2em', '9.8em', '7em', '8em'],
  height: ['1.8em', '1.8em', '2.1em', '2.4em', '3.9em', '3.4em'],
  lineHeight: [1.5, 1.5, 1.8, 2.2, 3.6, 3.2],
  '& label': {
    fontSize: ['0.4em', '0.5em', '0.7em', '1em', '1em', '1em'],
    letterSpacing: '0.2em',
  },
}));

const InputBox = styled.div(mediaquery({
  float: 'left',
  width: ['10.2em', '11em', '13em', '24.2em', '14em', '19.4em'],
  height: ['1.8em', '1.8em', '2.1em', '2.4em', '3.9em', '3.4em'],
  '& input': {
    width: ['18em', '16.5em', '17em', '24em', '15em', '20em'],
    height: ['2.7em', '2.1em', '2.2em', '2em', '3.6em', '3em'],
    margin: '0.3em auto',
    padding: '0.2em 0.7em',
    border: 'none',
    borderRadius: '0.5em',
    color: `${colors.gray_text02}`,
    fontSize: ['0.5em', '0.6em', '0.7em', '0.9em', '0.9em', '0.9em'],
    textAlign: 'right',
    outlineStyle: 'none',
  },
}));

export default function InputField({
  label, name, placeholder, value, onChange,
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
          type="text"
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete="off"
        />
      </InputBox>
    </Container>
  );
}
