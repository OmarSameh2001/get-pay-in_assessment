import { LoginResp } from '@/api/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  token: string | null;
  username: string | null;
  isSuperadmin: boolean;
};

const initialState: AuthState = {
  token: null,
  username: null,
  isSuperadmin: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<{ user:LoginResp }>) {
      state.token = action.payload.user.accessToken;
      state.username = action.payload.user.username;
      state.isSuperadmin = action.payload.user.id === 24;
    },
    clearCredentials(state) {
      state.token = null;
      state.username = null;
      state.isSuperadmin = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
