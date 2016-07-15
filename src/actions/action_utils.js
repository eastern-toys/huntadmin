import * as promise from 'es6-promise';
promise.polyfill();
import 'isomorphic-fetch';

function authHeader(state) {
  const username = state.getIn(['auth', 'username']);
  const password = state.getIn(['auth', 'password']);
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export function createGetRequest(state, route) {
  const cubeApiServer = state.getIn(['common', 'cubeApiServer']);
  return new Request(
    `${cubeApiServer}/${route}`,
    {
      mode: 'cors',
      credentials: 'include',
      headers: {
        Authorization: authHeader(state),
      },
    });
}

export function createPostRequest(state, route, body) {
  const cubeApiServer = state.getIn(['common', 'cubeApiServer']);
  return new Request(
    `${cubeApiServer}/${route}`,
    {
      body: JSON.stringify(body),
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        Authorization: authHeader(state),
        'Content-Type': 'application/json; charset=utf-8',
      },
    });
}

export function responseErrorPromise(request, response) {
  return response.json()
    .then(json => ({
      statusCode: json.code,
      statusText: response.statusText,
      description: json.description,
    }))
    .catch(() => ({
      statusCode: response.status,
      statusText: response.statusText,
      description: `Failed request for ${request.url ? request.url : request}`,
    }));
}

export function fetchToAction(request, actionType, actionCreator) {
  const action = {
    type: actionType,
  };
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        return responseErrorPromise(request, response).then(error => ({
          ...action,
          error,
        }));
      }
      return response.json().then(json => actionCreator(json, action));
    })
    .catch(error => {
      action.error = {
        statusCode: 0,
        statusText: 'Unknown error type',
        description: String(error),
      };
      return action;
    });
}
