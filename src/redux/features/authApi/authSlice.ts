import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  photo: string | null;
  role: string | null;
}

interface AuthState {
  user: User;
  token: string | null;
}

const initialState: AuthState = {
  user: {
    id: null,
    name: null,
    email: null,
    photo: null,
    role: null,
  },
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        user: {
          _id: string;
          name: string;
          email: string;
          photo: string;
          role: string;
        };
        token: string;
      }>
    ) => {
      state.user = {
        id: action.payload.user._id,
        name: action.payload.user.name,
        email: action.payload.user.email,
        photo: action.payload.user.photo,
        role: action.payload.user.role,
      };
      state.token = action.payload.token;
    },
    clearCredentials: (state) => {
      state.user = {
        id: null,
        name: null,
        email: null,
        photo: null,
        role: null,
      };
      state.token = null;
    },
  },
});

export const getUser = (state: RootState) => state.auth.user;
export const getToken = (state: RootState) => state.auth.token;
export const getUserRole = (state: RootState) => state.auth.user.role;
export const isAuthenticated = (state: RootState) => !!state.auth.token;

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
