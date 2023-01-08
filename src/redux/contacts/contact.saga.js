import { all, call, put, takeLatest } from 'redux-saga/effects';

import APIService from '../../utils/api.service';

// import { CONTACT_ACTIONS, fetchContactAsync } from './contact.actions';
import { fetchContactByPage, addContacts, searchContact } from './contact.slice';

export const fetchContactAPI = (params) => {
  return APIService.get('/contacts.json', { params });
}

export function* fetchContactSaga({ payload }) {
  const params = {
    companyId: 171,
    page: payload.page || 0,
    query: payload.query || {},
  }
  try {
    const result = yield call(fetchContactAPI, params);
    console.log('result', result);
    if (result && result.data?.contacts) {
      const data = {
        contacts: result.data.contacts,
        total: result.data.total,
      }
      yield put(addContacts(data));
    }
  } catch (err) {
    console.error('error', err);
  }
}

export default function* contactSaga() {
	yield all([
		takeLatest(fetchContactByPage, fetchContactSaga),
    takeLatest(searchContact, fetchContactSaga),
	]);
}