import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  openModalName: '',
};

export const modalSlice = createSlice({
  name: 'MODAL',
  initialState,
  reducers: {
    setOpenModalName: (state, { payload }) => ({
      ...state,
      openModalName: payload,
    })
  }
});

export const { setOpenModalName } = modalSlice.actions;
export default modalSlice.reducer;