
import {
  FETCH_AGENT_IDS_REQUEST,
  FETCH_AGENT_IDS_SUCCESS,
  FETCH_AGENT_IDS_FAILURE,

  FETCH_AGENT_REQUEST,
  FETCH_AGENT_SUCCESS,
  FETCH_AGENT_FAILURE,

} from '../constants';

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export default function agents(state = {
  isFetching: false,
  isAuthenticated: false,
  agentIds: [],
  agent: {}
}, action) {
  switch (action.type) {
    case FETCH_AGENT_IDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        agentIds: [],
      });
    case FETCH_AGENT_IDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        agentIds: action.agentIds,
        errorMessage: '',
      });
    case FETCH_AGENT_IDS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      });

    case FETCH_AGENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
      });
    case FETCH_AGENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        agent: action.agent,
        errorMessage: '',
      });
    case FETCH_AGENT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message,
      });
    default:
      return state;
  }
}
