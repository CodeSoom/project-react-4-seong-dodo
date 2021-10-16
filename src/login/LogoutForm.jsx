import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const LoginBox = styled.div(mediaquery({
  width: ['12em', '12em', '15em', '23em', '27em', '30em'],
  margin: '0 auto',
  padding: '0.5em',
  textAlign: 'center',
  '& div': {
    height: ['5em', '4.8em', '3.8em', '3.5em', '4em', '4em'],
    marginBottom: '0.5em',
    fontSize: ['0.8em', '0.8em', '0.9em', '1.2em', '1.4em', '1.5em'],
    lineHeight: [5, 4.8, 3, 3.5, 4, 4],
  },
}));

const Button = styled.button(mediaquery({
  display: 'block',
  width: ['15.5em', '15em', '17.5em', '18.5em', '21.5em', '21em'],
  height: ['1.5em', '1.5em', '1.6em', '1.5em', '1.7em', '1.8em'],
  margin: '1em auto 0.5em',
  padding: '0.5em 0',
  borderRadius: '0.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.7em', '0.7em', '0.8em', '1.2em', '1.2em', '1.4em'],
  fontWeight: '500',
  cursor: 'pointer',
  lineHeight: 1,
  '&:hover': {
    color: `${colors.white}`,
    backgroundColor: `${colors.blue_text}`,
    fontWeight: '600',
  },
}));

export default function LogoutForm({ loginFields, onClick }) {
  const { email } = loginFields;

  return (
    <LoginBox>
      <div>
        {email}
        {' '}
        사용자님
      </div>
      <div>
        환영합니다
        {' '}
        :)
      </div>
      <Button
        type="button"
        onClick={onClick}
      >
        Log out
      </Button>
    </LoginBox>
  );
}
