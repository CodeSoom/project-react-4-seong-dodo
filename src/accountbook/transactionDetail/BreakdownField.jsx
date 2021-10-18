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
  width: '1em',
  height: ['2em', '1.9em', '2em', '2.4em', '3em', '3em'],
}));

const InputBox = styled.div(mediaquery({
  float: 'left',
  width: ['10em', '11em', '11em', '28em', '16.6em', '22em'],
  height: ['2em', '1.9em', '2em', '2.4em', '3em', '3em'],
  '& input': {
    width: ['21em', '19em', '19.7em', '35em', '18em', '24.5em'],
    height: ['3em', '2.5em', '2.4em', '2.5em', '3em', '3em'],
    margin: [
      '0.4em auto',
      '0.2em auto',
      '0.1em auto',
      '0.2em auto',
      '0.1em auto',
      '0.1em auto',
    ],
    padding: '0.5em',
    border: 'none',
    borderRadius: '0.5em',
    color: `${colors.gray_text02}`,
    fontSize: ['0.5em', '0.6em', '0.7em', '0.8em', '0.9em', '0.9em'],
    textAlign: 'right',
    outlineStyle: 'none',
  },
}));

export default function BreakdownField({
  label, placeholder, value, onChange,
}) {
  const id = 'input-breakdown';

  function handleChange(event) {
    const { target } = event;
    onChange({ value: target.value });
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
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
        />
      </InputBox>
    </Container>
  );
}
