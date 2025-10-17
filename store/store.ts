import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import lockReducer from './slices/lockSlice';
import networkReducer from './slices/networkSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lock: lockReducer,
    network: networkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
