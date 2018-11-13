import { routerReducer } from 'react-router-redux';
import { combineReducers } from 'redux';
import sessionReducer from './session';
import flashReducer from './flash';
import jobReducer from './jobs';

export default combineReducers({
	sessionState: sessionReducer,
	flashState: flashReducer,
	jobState: jobReducer,
	routerState: routerReducer
});
