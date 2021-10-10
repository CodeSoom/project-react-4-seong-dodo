import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import colors from '../style/colors';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Container = styled.div({
  width: '80px',
  margin: '0 auto',
});

const LoadindSpinner = styled.div({
  display: 'block',
  width: '40px',
  height: '40px',
  border: `7px solid ${colors.loading_01}`,
  borderRadius: '50%',
  borderTopColor: `${colors.loading_02}`,
  animation: `${spin} 1s linear infinite`,
});

export default function Loading() {
  return (
    <Container>
      <LoadindSpinner />
    </Container>
  );
}
