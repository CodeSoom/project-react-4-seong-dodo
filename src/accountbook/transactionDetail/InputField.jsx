import styled from '@emotion/styled';
import colors from '../../style/colors';
import mediaquery from '../../style/mediaquery';

const Container = styled.div(mediaquery({
  width: '100%',
  height: '100%',
  textAlign: 'center',
}));

const LabelBox = styled.div(mediaquery({
  float: 'left',
  width: ['25%', '25%', '25%', '30%', '30%'],
  height: '100%',
  padding: 0,
  '& label': {
    fontSize: ['0.6em', '0.6em', '0.7em', '1em', '1em'],
    letterSpacing: '0.3em',
  },
}));

const InputBox = styled.div(mediaquery({
  float: 'left',
  width: ['75%', '75%', '75%', '70%', '70%'],
  height: '100%',
  '& input': {
    width: ['90%', '90%', '90%', '90%', '95%'],
    height: ['100%', '100%', '95%', '85%', '60%'],
    margin: '0 auto',
    padding: '0.5em',
    border: 'none',
    borderRadius: '0.5em',
    color: `${colors.gray_text02}`,
    fontSize: ['0.5em', '0.6em', '0.7em', '1em', '0.9em'],
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
        />
      </InputBox>
    </Container>
  );
}
