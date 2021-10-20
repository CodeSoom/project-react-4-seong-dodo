import styled from '@emotion/styled';
import colors from '../style/colors';
import mediaquery from '../style/mediaquery';

export default function JoinForm({
  fields, onChange, onSubmit, onKeypress,
}) {
  const {
    email, age, password, repassword,
  } = fields;

  function handleChange(event) {
    const { target: { name, value } } = event;
    onChange({ name, value });
  }

  const handleKeypress = (e) => {
    onKeypress(e);
  };

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
          onKeyPress={handleKeypress}
          autoComplete="off"
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
          onKeyPress={handleKeypress}
          autoComplete="off"
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
          onKeyPress={handleKeypress}
          autoComplete="off"
        />
        <label htmlFor="join-repassword">
          비밀번호 재입력
        </label>
        <input
          type="password"
          id="join-repassword"
          name="repassword"
          placeholder="비밀번호를 재입력해 주세요"
          value={repassword}
          onChange={handleChange}
          onKeyPress={handleKeypress}
          autoComplete="off"
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

const Container = styled.div(mediaquery({
  margin: '0 auto',
  padding: 0,
  textAlign: 'center',
}));

const FormBox = styled.div(mediaquery({
  width: ['12em', '12em', '16em', '24em', '26em', '35em'],
  height: ['19em', '19em', '22em', '20em', '22em', '24em'],
  margin: '0 auto',
  padding: '0.5em',
  borderRadius: '0.2em',
  backgroundColor: `${colors.white}`,
  textAlign: 'center',
  '& label': {
    display: 'inline-block',
    width: ['100%', '100%', '100%', '30%', '32%', '30%'],
    padding: [
      '1em',
      '1em',
      '1em',
      '2em 0.5em',
      '2em 0.5em',
      '2em 0.5em',
    ],
    color: `${colors.gray_text}`,
    fontSize: ['0.7em', '0.7em', '0.8em', '0.9em', '1em', '1.1em'],
    fontWeight: '500',
    textAlign: ['center', 'center', 'center', 'left', 'left', 'left'],
  },
  '& input': {
    width: ['90%', '90%', '95%', '65%', '65%', '65%'],
    height: ['3.5em', '3.5em', '3.5em', '3em', '3em', '3.5emem'],
    margin: 0,
    padding: '1em',
    border: '1px solid #eee',
    borderRadius: '0.5em',
    color: `${colors.gray_text01}`,
    backgroundColor: 'transparent',
    fontSize: ['0.6em', '0.6em', '0.7em', '0.9em', '0.9em', '0.9em'],
    outlineStyle: 'none',
  },
}));

const Button = styled.button(mediaquery({
  width: ['17em', '15em', '17.5em', '22em', '24em', '27em'],
  height: ['1.5em', '1.3em', '1.3em', '1.7em', '1.7em', '1.7em'],
  margin: '1em auto 0.5em',
  padding: '0.5em 0',
  borderRadius: '0.2em',
  backgroundColor: `${colors.teal}`,
  fontSize: ['0.7em', '0.8em', '0.9em', '1.1em', '1.1em', '1.3em'],
  fontWeight: '500',
  cursor: 'pointer',
  letterSpacing: '0.2em',
  '&:hover': {
    color: `${colors.white}`,
    backgroundColor: `${colors.blue_text}`,
    fontWeight: '600',
  },
}));
