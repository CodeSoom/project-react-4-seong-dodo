import styled from '@emotion/styled';
import mediaquery from '../../style/mediaquery';

const Button = styled.button(mediaquery({
  position: 'relative',
  width: '50%',
  bottom: ['3.3em', '3.3em', '2.4em', '2.7em', '3em'],
  fontSize: ['0.4em', '0.4em', '0.8em', '1em', '.8em'],
}));

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
