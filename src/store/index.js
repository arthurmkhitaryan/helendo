import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import watchers from './sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const saga = createSagaMiddleware();


const store = createStore(
    reducers,
    composeEnhancers(applyMiddleware(saga, thunk)),
);

saga.run(watchers);
window.stor = store

export default store;
