import styled from '@emotion/styled';
import colors from './style/colors';
import mediaquery from './style/mediaquery';

const Error = styled.p(mediaquery({
  margin: '8em auto',
  color: `${colors.gray_text}`,
  fontSize: ['0.8em', '0.8em', '0.9em', '1.2em', '1.5em', '1.5em'],
  textAlign: 'center',
  lineHeight: '10em',
}));

export default function NotFoundPage() {
  return (
    <Error>404 Not Found</Error>
  );
}
