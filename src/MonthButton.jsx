import styled from '@emotion/styled';

const Button = styled.button({
  position: 'relative',
  width: '10em',
  right: '18em',
  top: '1.2em',
});

export default function MonthSwiperContainer({ direction, onclick }) {
  return (
    <>
      <Button
        type="button"
        name={direction}
        onClick={onclick}
      >
        {direction}
      </Button>
    </>
  );
}
