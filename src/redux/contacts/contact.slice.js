import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contacts: {},
  selectedContactId: null,
  evenCheck: false,
  isFetching: false,
  error: null,
  query: {},
};

export const contactSlice = createSlice({
  name: 'CONTACTS',
  initialState,
  reducers: {
    fetchContactByPage: (state, { payload }) => ({
      ...state,
      error: null,
      isFetching: true,
      page: payload.page,
    }),
    searchContact: (state, { payload }) => ({
      ...state,
      error: null,
      isFetching: true,
      query: payload.query,
      page: 0,
      contacts: {},
    }),
    addContacts: (state, action) => {
      return {
        ...state,
        error: null,
        isFetching: false,
        contacts: Object.assign({}, state.contacts, action.payload.contacts),
        total: action.payload.total,
      };
    },
    selectContactId: (state, action) => ({
      ...state,
      selectedContactId: action.payload,
    }),
    evenCheckbox: (state, action) => ({
      ...state,
      evenCheck: action.payload,
    }),
  }
});

export const {
  fetchContactByPage,
  addContacts,
  selectContactId,
  evenCheckbox,
  searchContact,
} = contactSlice.actions;
export const selectContacts = (state) => state.contacts;

export default contactSlice.reducer;
