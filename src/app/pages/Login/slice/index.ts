import { GenericReducerState } from 'types/RootState';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { loginFormSaga } from './saga';

export const initialState: GenericReducerState = {
  data: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'loginForm',
  initialState,
});

export const { actions, reducer } = slice;

export const useLoginFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: loginFormSaga });
  return { actions: slice.actions };
};
