import { combineReducers } from 'redux';

import contactReducer from '../redux/contacts/contact.slice';
import modalReducer from '../redux/modal/modal.slice';

const createRootReducer = (history) => combineReducers({
	contacts: contactReducer,
	modal: modalReducer,
});

export default createRootReducer;