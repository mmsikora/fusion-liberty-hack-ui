import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import agentData from './agentData';

export default combineReducers({
  agentData,
  alerts,
  auth,
  navigation,
});
