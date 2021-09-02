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
  clearLoginField,
  logout,
} = actions;

export function requestLogin() {
  return async (dispatch, getState) => {
    const { user: { loginFields: { email, password } } } = getState();
    const accessToken = await postLogin({ email, password });

    saveItem('accessToken', accessToken);

    dispatch(setAccessToken(accessToken));
  };
}

export function requestJoin() {
  return async (dispatch, getState) => {
    const { user: { joinFields: { email, password, age } } } = getState();
    const data = await postJoin({ email, password, age });

    if (data.status === 201) {
      // eslint-disable-next-line no-alert
      alert('성공');
    // eslint-disable-next-line no-alert
    } else { alert('실패'); }

    dispatch();
  };
}

export default reducer;
