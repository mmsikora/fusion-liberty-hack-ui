import { combineReducers } from 'redux';
import auth from './auth';
import navigation from './navigation';
import alerts from './alerts';
import agents from './agents';

export default combineReducers({
  agents,
  alerts,
  auth,
  navigation,
});
