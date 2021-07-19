import styled from '@emotion/styled';
import colors from './style/colors';

const CloseBox = styled.div({
  position: 'fixed',
  right: '8em',
  margin: '.5em',
  color: `${colors.gray_text}`,
  fontSize: '1.2em',
  fontWeight: '600',
});

export default function CloseModalButton({ onClick }) {
  return (
    <CloseBox
      onClick={onClick}
      role="presentation"
    >
      X
    </CloseBox>
  );
}
