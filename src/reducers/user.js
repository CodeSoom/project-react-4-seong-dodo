import { createSlice } from '@reduxjs/toolkit';

import {
  postLogin,
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
  },
  reducers: {
    setAccessToken(state, { payload: accessToken }) {
      return {
        ...state,
        accessToken,
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

export default reducer;
