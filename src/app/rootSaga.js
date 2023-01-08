import { all } from 'redux-saga/effects';

import contactSaga from '../redux/contacts/contact.saga';

export default function* rootSaga(getState) {
	yield all([
    contactSaga(),
	]);
}