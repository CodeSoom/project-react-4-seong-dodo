import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

const Container = styled.div(mediaquery({
  margin: '0 auto',
  // padding: '0.5em',
  padding: [0, 0, 0, 0, '0.5em'],
  textAlign: 'center',
}));

const FormBox = styled.div(mediaquery({
  width: '90%',
  height: '100%',
  margin: '0 auto',
  padding: [
    '0.5em 0.5em 1em',
    '0.5em 0.5em 1em',
    '1em 0.5em 1.5em',
    '1.5em 0.5em',
    '.5em',
  ],
  textAlign: 'center',
  borderRadius: '0.2em',
  backgroundColor: `${colors.white}`,
  '& label': {
    display: 'inline-block',
    width: ['100%', '100%', '100%', '30%', '30%'],
    padding: ['1em', '1em', '1em', '1.5em', '0.5em'],
    color: `${colors.gray_text}`,
    fontSize: ['0.7em', '0.7em', '0.8em', '0.9em', '.9em'],
    fontWeight: '500',
    textAlign: ['center', 'center', 'center', 'left', 'left'],
  },
  '& input': {
    width: ['90%', '90%', '95%', '60%', '60%'],
    height: ['4em', '4em', '3.5em', '3.5em', '3em'],
    padding: ['1em', '1em', '1em', '1em', '0.5em'],
    margin: [0, 0, 0, 0, '0 1em'],
    border: '1px solid #eee',
    borderRadius: '0.5em',
    color: `${colors.gray_text01}`,
    fontSize: ['0.6em', '0.6em', '0.7em', '0.9em', '.8em'],
    outlineStyle: 'none',
    backgroundColor: 'transparent',
  },
}));

const Button = styled.button(mediaquery({
  width: '90%',
  height: ['2em', '2em', '2em', '2em', '2em'],
  margin: [
    '1.2em auto 0.7em',
    '1.2em auto 0.7em',
    '2em auto 1em',
    '1.5em auto',
    '2em auto 0',
  ],
  padding: '0.5em 0',
  borderRadius: '0.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.8em', '0.8em', '1em', '1.1em', '1em'],
  fontWeight: '500',
  cursor: 'pointer',
  letterSpacing: '0.2em',
  '&:hover': {
    color: `${colors.white}`,
    backgroundColor: `${colors.blue_text}`,
    fontWeight: '600',
  },
}));

export default function JoinForm({ fields, onChange, onSubmit }) {
  const {
    email, age, password, repassword,
  } = fields;

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  return (
    <Container>
      <FormBox>
        <label htmlFor="join-email">
          이메일 주소
        </label>
        <input
          type="email"
          id="join-email"
          name="email"
          placeholder="이메일 주소를 입력 해주세요"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="join-age">
          나이
        </label>
        <input
          type="number"
          id="join-age"
          name="age"
          placeholder="나이를 입력해 주세요"
          value={age}
          onChange={handleChange}
        />
        <label htmlFor="join-password">
          비밀번호 입력
        </label>
        <input
          type="password"
          id="join-password"
          name="password"
          placeholder="비밀번호를 입력해 주세요"
          value={password}
          onChange={handleChange}
        />
        <label htmlFor="join-repassword">
          비밀번호 재입력
        </label>
        <input
          type="repassword"
          id="join-repassword"
          name="repassword"
          placeholder="비밀번호를 재입력해 주세요"
          value={repassword}
          onChange={handleChange}
        />
      </FormBox>
      <Button
        type="button"
        onClick={onSubmit}
      >
        가입하기
      </Button>
    </Container>
  );
}
