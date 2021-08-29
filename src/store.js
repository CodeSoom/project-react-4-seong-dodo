import { configureStore } from '@reduxjs/toolkit';

import combineReducers from './reducers/index';

const reducer = combineReducers;

const store = configureStore({
  reducer,
  devTools: true,
});

export default store;
