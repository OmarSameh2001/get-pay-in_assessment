import { createSlice } from '@reduxjs/toolkit';
import { useEffect } from 'react';

const lockSlice = createSlice({
  name: 'lock',
  initialState: { isLocked: false },
  reducers: {
    lock(state){ state.isLocked = true; },
    unlock(state){ state.isLocked = false; },
  },
});

export const { lock, unlock } = lockSlice.actions;
export default lockSlice.reducer;
