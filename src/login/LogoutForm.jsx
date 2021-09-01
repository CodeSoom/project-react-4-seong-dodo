import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const LoginBox = styled.div({
  margin: '0 auto',
  padding: '0.5em',
  textAlign: 'center',
});

const Button = styled.button(mediaquery({
  width: '90%',
  margin: '2em auto 0',
  padding: '.5em 0',
  borderRadius: '.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['.7em', '.8em', '.8em', '.9em', '1em'],
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
        {' '}
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
