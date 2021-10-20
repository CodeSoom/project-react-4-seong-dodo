/* eslint-disable no-alert */
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import styled from '@emotion/styled';
import mediaquery from '../style/mediaquery';

import JoinForm from './JoinForm';
import Loading from '../loading/Loading';

import {
  changeJoinField,
  requestJoin,
} from '../reducers/user';

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
    if (age === '') {
      alert('나이를 입력해주세요.');
      return;
    }
    if (!ageRegEx.test(age)) {
      alert('나이를 다시 입력해주세요.');
      return;
    }
    if (age === '0') {
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

  const handleKeypress = async (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    await handleSubmit();
  };

  return (
    <>
      {
        isLoading
          ? (
            <LoadingLayout>
              <Loading />
            </LoadingLayout>
          )
          : (
            <JoinForm
              fields={joinFields}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onKeypress={handleKeypress}
            />
          )
      }
    </>
  );
}

const LoadingLayout = styled.div(mediaquery({
  '& div': {
    marginTop: ['8em', '8em', '8em', '8em', '9em', '10em'],
  },
}));
