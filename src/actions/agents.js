import {
  FETCH_AGENT_IDS_REQUEST,
  FETCH_AGENT_IDS_SUCCESS,
  FETCH_AGENT_IDS_FAILURE,

  FETCH_AGENT_REQUEST,
  FETCH_AGENT_SUCCESS,
  FETCH_AGENT_FAILURE,

} from '../constants';

const BASE_API_URL = 'http://localhost:8080';

function requestAgents() {
  return {
    type: FETCH_AGENT_IDS_REQUEST,
    isFetching: true
  };
}

export function recieveAgents(agentIds) {
  return {
    type: FETCH_AGENT_IDS_SUCCESS,
    isFetching: false,
    agentIds
  };
}

function agentsError(message) {
  return {
    type: FETCH_AGENT_IDS_FAILURE,
    isFetching: false,
    message
  };
}

export function fetchAgents() {
  const config = {
    method: 'GET'
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestAgents());

    return fetch(`${BASE_API_URL}/agents`, config)
      .then((response) => {

        console.warn(response);

        return response.json().then(agentIds => ({ agentIds, response }));

      }).then(({ agentIds, response }) => {

        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(agentsError('something went wrong'));
          return Promise.reject('something went wrong');
        }

        dispatch(recieveAgents(agentIds));
        return 0;

      }).catch(err => console.log('Error: ', err)); // eslint-disable-line
  };
}


function requestAgent() {
  return {
    type: FETCH_AGENT_REQUEST,
    isFetching: true
  };
}

export function recieveAgent(agentIds) {
  return {
    type: FETCH_AGENT_SUCCESS,
    isFetching: false,
    agentIds
  };
}

function agentError(message) {
  return {
    type: FETCH_AGENT_FAILURE,
    isFetching: false,
    message
  };
}

export function fetchAgent(agentId) {
  const config = {
    method: 'GET'
  };

  return (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestAgent());

    return fetch(`${BASE_API_URL}/agent/${agentId}`, config)
      .then((response) => {

        return response.json().then(agent => ({ agent, response }));

      }).then(({ agent, response }) => {

        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(agentError('something went wrong'));
          return Promise.reject('something went wrong');
        }

        dispatch(recieveAgent(agent));
        return 0;

      }).catch(err => console.log('Error: ', err)); // eslint-disable-line
  };
}
