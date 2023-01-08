import { combineReducers } from 'redux';

import contactReducer from '../redux/contacts/contact.slice';

const createRootReducer = (history) => combineReducers({
	contacts: contactReducer,
});

export default createRootReducer;