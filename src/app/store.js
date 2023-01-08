import { configureStore } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './rootSaga';
import createRootReducer from '../redux/rootReducer';

export default function configureAppStore() {
	const reduxSagaMonitorOptions = {};
	const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
	const { run: runSaga } = sagaMiddleware;

	const store = configureStore({
		reducer: createRootReducer(),
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
	});

	runSaga(rootSaga);

	return { store };
}


