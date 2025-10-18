import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import lockReducer from './slices/lockSlice';
import networkReducer from './slices/networkSlice';

// configure the Redux store with auth, lock, and network slices
export const store = configureStore({
  reducer: {
    auth: authReducer,
    lock: lockReducer,
    network: networkReducer,
  },
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
