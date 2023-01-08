import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects';

import APIService from '../../utils/api.service';

import { CONTACT_ACTIONS } from './contact.actions';

export function* signOut() {}

export const fetchContactAPI = (params) => {
  return APIService.get('/contacts.json', { params });
}

export function* getContactSaga({ payload }) {
  const params = {
    companyId: 171,
  }
  try {
    console.log('here');
    const result = yield call(fetchContactAPI, params);
    if (result && result.data?.contacts) {
      yield put({
        type: CONTACT_ACTIONS.CONTACT_GET_SUCCESS,
        payload: result.data.contacts,
      });
    }
  } catch (err) {
    console.error('error', err);
  }
  
}

export default function* contactSaga() {
	yield all([
		takeLatest(CONTACT_ACTIONS.CONTACT_GET_REQUEST, getContactSaga),
	]);
}