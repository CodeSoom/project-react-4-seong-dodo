import { createSlice } from '@reduxjs/toolkit';

import {
  postLogin,
  postJoin,
} from '../services/api';

import { saveItem } from '../services/storage';

const { reducer, actions } = createSlice({
  name: 'user',
  initialState: {
    accessToken: '',
    loginFields: {
      email: '',
      password: '',
    },
    joinFields: {
      age: '',
      email: '',
      password: '',
      repassword: '',
    },
  },
  reducers: {
    setAccessToken(state, { payload: accessToken }) {
      return {
        ...state,
        accessToken,
      };
    },
    changeJoinField(state, { payload: { name, value } }) {
      return {
        ...state,
        joinFields: {
          ...state.joinFields,
          [name]: value,
        },
      };
    },
    changeLoginField(state, { payload: { name, value } }) {
      return {
        ...state,
        loginFields: {
          ...state.loginFields,
          [name]: value,
        },
      };
    },
    clearJoinField(state) {
      return {
        ...state,
        joinFields: {
          ...state.joinFields,
          age: '',
          email: '',
          password: '',
          repassword: '',
        },
      };
    },
    clearLoginField(state) {
      return {
        ...state,
        loginFields: {
          ...state.loginFields,
          email: '',
          password: '',
        },
      };
    },
    logout(state) {
      return {
        ...state,
        accessToken: '',
      };
    },
  },
});

export const {
  setAccessToken,
  changeJoinField,
  changeLoginField,
  clearJoinField,
  clearLoginField,
  logout,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    const { user: { loginFields: { email, password } } } = getState();
    const { accessToken, message, data } = await postLogin({ email, password });

    saveItem('accessToken', accessToken);

    dispatch(setAccessToken(accessToken));

    if (data.status === 400) {
      // eslint-disable-next-line no-alert
      alert(message);
    }
  };
}

export function requestJoin() {
  return async (dispatch, getState) => {
    const { user: { joinFields: { email, password, age } } } = getState();
    const data = await postJoin({ email, password, age });

    dispatch(clearJoinField());

    if (data.status === 201) {
      // eslint-disable-next-line no-alert
      alert('성공');
      return;
    }
    if (data.status === 400) {
      // eslint-disable-next-line no-alert
      alert('이미 등록된 이메일 입니다. 이메일을 다시 확인해 주세요.');
      return;
    // eslint-disable-next-line no-alert
    } alert('실패');
  };
}

export default reducer;
