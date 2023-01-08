import { all, call, put, takeLatest, select } from 'redux-saga/effects';

import APIService from '../../utils/api.service';
import { fetchContactByPage, addContacts, searchContact, flushContacts } from './contact.slice';
import { setOpenModalName } from '../modal/modal.slice';

export const fetchContactAPI = (params) => {
  return APIService.get('/contacts.json', { params });
}

export function* fetchContactSaga({ payload }) {
  const params = {
    ...payload,
    companyId: 171,
  }
  
  try {
    const result = yield call(fetchContactAPI, params);
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

export function* flushContactSaga() {
  console.log('flushContactSaga');
  yield put(flushContacts());
}

export default function* contactSaga() {
	yield all([
		takeLatest(fetchContactByPage, fetchContactSaga),
    takeLatest(searchContact, fetchContactSaga),
    takeLatest(setOpenModalName, flushContactSaga),
	]);
}