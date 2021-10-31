import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

export default function MonthButton({ direction, onClick }) {
  return (
    <>
      <Button
        type="button"
        name={direction}
        onClick={onClick}
      >
        {direction}
      </Button>
    </>
  );
}

const Button = styled.button(mediaquery({
  position: 'relative',
  bottom: ['2.9em', '2.4em', '2.6em', '1.8em', '1.8em', '1.6em'],
  width: '50%',
  fontSize: ['0.5em', '0.6em', '0.7em', '1.4em', '1.6em', '2em'],
}));
