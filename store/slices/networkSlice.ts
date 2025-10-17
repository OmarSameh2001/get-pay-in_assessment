import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'network',
  initialState: { isOffline: false },
  reducers: {
    setOffline(state, action: PayloadAction<boolean>){ state.isOffline = action.payload; }
  }
});

export const { setOffline } = slice.actions;
export default slice.reducer;
