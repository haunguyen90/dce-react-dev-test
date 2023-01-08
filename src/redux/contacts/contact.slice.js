import { createSlice } from '@reduxjs/toolkit';

import { createAction } from '@reduxjs/toolkit';

export const fetchContactAsync = createAction('CONTACTS/fetchContactAsync');

export const CONTACT_ACTIONS = {
  CONTACT_GET_REQUEST: 'CONTACT_GET/Request',
  CONTACT_GET_SUCCESS: 'CONTACT_GET/Success',
  CONTACT_GET_FAILURE: 'CONTACT_GET/Failure',
};

export const getContact = (payload) => ({
  type: CONTACT_ACTIONS.CONTACT_GET_REQUEST,
  payload,
});

const initialState = {
  contacts: {},
  selectedContactId: null,
  evenCheck: false,
  isFetching: false,
  error: null,
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
} = contactSlice.actions;
export const selectContacts = (state) => state.contacts;

export default contactSlice.reducer;
