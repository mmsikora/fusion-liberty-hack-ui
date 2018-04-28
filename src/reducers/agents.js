
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
  agents: {}
}, action) {
  let agentData = {};

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

      const agentsInState = state.agents;
      delete agentsInState[String(action.agentId)];

      // console.log('FETCH_AGENT_REQUEST is called! ');
      // console.log('agentData: ', agentData);

      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        agents: agentsInState,
      });

    case FETCH_AGENT_SUCCESS:

      agentData = {};
      // agentData[`agent-${String(agent.niprId)}`] = action.agent;
      agentData[String(action.agent.niprId)] = action.agent;

      // console.log('FETCH_AGENT_SUCCESS is called! ');
      // console.log('agentData: ', agentData);

      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        agents: Object.assign({}, state.agents, agentData),
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
