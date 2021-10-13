import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const LoginBox = styled.div(mediaquery({
  margin: '0 auto',
  padding: '0.5em',
  textAlign: 'center',
  '& div': {
    marginBottom: ['0.5em', '0.5em', '.5em', '.5em', '1em'],
    fontSize: ['0.8em', '0.8em', '.8em', '.9em', '1em'],
  },
}));

const Button = styled.button(mediaquery({
  width: '90%',
  height: ['2em', '2em', '2em', '2em', '2em'],
  margin: '2em auto 0',
  padding: '0.5em 0',
  borderRadius: '0.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.7em', '0.9em', '.8em', '.9em', '1em'],
  fontWeight: '500',
  cursor: 'pointer',
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
