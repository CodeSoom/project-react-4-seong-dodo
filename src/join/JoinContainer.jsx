import { useDispatch, useSelector } from 'react-redux';

import {
  changeJoinField,
  requestJoin,
} from '../reducers/user';

import JoinForm from './JoinForm';

export default function JoinContainer() {
  const dispatch = useDispatch();

  const joinFields = useSelector((state) => state.user.joinFields);
  const {
    age, email, password, repassword,
  } = joinFields;

  const handleChange = ({ name, value }) => {
    dispatch(changeJoinField({ name, value }));
  };

  const handleSubmit = () => {
    const ageRegEx = /\d/;
    const emailRegEx = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i;
    //  8 ~ 10자 영문, 숫자 조합
    const passwordRegEx = /^[a-zA-Z0-9]{8,10}$/;

    if (email === '') {
      // eslint-disable-next-line no-alert
      alert('이메일 주소를 입력해 주세요');
      return;
    }
    if (!emailRegEx.test(email)) {
      // eslint-disable-next-line no-alert
      alert('이메일 주소를 잘못 입력 하였습니다.');
      return;
    }
    if (!ageRegEx.test(age)) {
      // eslint-disable-next-line no-alert
      alert('나이를 다시 입력해주세요.');
      return;
    }
    if (password === '') {
      // eslint-disable-next-line no-alert
      alert('비밀번호를 입력해 주세요');
      return;
    }
    if (!passwordRegEx.test(password)) {
      // eslint-disable-next-line no-alert
      alert('비밀번호를 8 ~ 10자 영문, 숫자 조합으로 다시 입력 해주세요.');
      return;
    }
    if (repassword === '') {
      // eslint-disable-next-line no-alert
      alert('비밀번호 확인해 주세요.');
      return;
    }
    if (password !== repassword) {
      // eslint-disable-next-line no-alert
      alert('비밀번호가 일치 하지 않습니다.');
      return;
    }
    dispatch(requestJoin());
  };

  return (
    <JoinForm
      fields={joinFields}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
