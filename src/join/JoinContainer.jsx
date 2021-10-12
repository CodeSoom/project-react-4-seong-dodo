/* eslint-disable no-alert */
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import Loading from '../loading/Loading';

import {
  changeJoinField,
  requestJoin,
} from '../reducers/user';

import JoinForm from './JoinForm';

export default function JoinContainer({ history }) {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const joinFields = useSelector((state) => state.user.joinFields);
  const {
    age, email, password, repassword,
  } = joinFields;

  const handleChange = ({ name, value }) => {
    dispatch(changeJoinField({ name, value }));
  };

  const handleSubmit = async () => {
    const ageRegEx = /\d/;
    const emailRegEx = /[a-z0-9]{2,}@[a-z0-9-]{2,}\.[a-z0-9]{2,}/i;
    //  8 ~ 10자 영문, 숫자 조합
    const passwordRegEx = /^[a-zA-Z0-9]{8,10}$/;

    if (email === '') {
      alert('이메일 주소를 입력해 주세요');
      return;
    }
    if (!emailRegEx.test(email)) {
      alert('이메일 주소를 잘못 입력 하였습니다.');
      return;
    }
    if (!ageRegEx.test(age)) {
      alert('나이를 다시 입력해주세요.');
      return;
    }
    if (password === '') {
      alert('비밀번호를 입력해 주세요');
      return;
    }
    if (!passwordRegEx.test(password)) {
      alert('비밀번호를 8 ~ 10자 영문, 숫자 조합으로 다시 입력 해주세요.');
      return;
    }
    if (repassword === '') {
      alert('비밀번호 확인해 주세요.');
      return;
    }
    if (password !== repassword) {
      alert('비밀번호가 일치 하지 않습니다.');
      return;
    }
    setIsLoading(true);
    await dispatch(requestJoin({ history }));
    setIsLoading(false);
  };

  return (
    <>
      {
        isLoading
          ? <Loading />
          : (
            <JoinForm
              fields={joinFields}
              onChange={handleChange}
              onSubmit={handleSubmit}
            />
          )
      }
    </>
  );
}
