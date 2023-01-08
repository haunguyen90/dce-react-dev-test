import { all, call, put, takeLatest } from 'redux-saga/effects';

import APIService from '../../utils/api.service';

// import { CONTACT_ACTIONS, fetchContactAsync } from './contact.actions';
import { CONTACT_ACTIONS, addContacts, fetchContactAsync } from './contact.slice';

export const fetchContactAPI = (params) => {
  return APIService.get('/contacts.json', { params });
}

export function* fetchContactSaga({ payload }) {
  const params = {
    companyId: 171,
  }
  try {
    const result = yield call(fetchContactAPI, params);
    if (result && result.data?.contacts) {
      yield put(addContacts(result.data.contacts));
    }
  } catch (err) {
    console.error('error', err);
  }
}

export default function* contactSaga() {
	yield all([
		takeLatest(fetchContactAsync, fetchContactSaga),
	]);
}