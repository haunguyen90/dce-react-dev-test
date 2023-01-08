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
  contacts: [],
  selectedContactId: null,
  evenCheck: false,
};

export const contactSlice = createSlice({
  name: 'CONTACTS',
  initialState,
  reducers: {
    addContacts: (state, action) => {
      return {
        ...state,
        contacts: action.payload
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

export const { addContacts, selectContactId, evenCheckbox } = contactSlice.actions;
export const selectContacts = (state) => state.contacts;

export default contactSlice.reducer;
