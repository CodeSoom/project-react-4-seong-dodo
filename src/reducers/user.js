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
  },
});

export const {
  setAccessToken,
  changeLoginField,
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
