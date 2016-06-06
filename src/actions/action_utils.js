import * as promise from 'es6-promise';
promise.polyfill();
import 'isomorphic-fetch';

function authHeader(state) {
  const username = state.getIn(['auth', 'username']);
  const password = state.getIn(['auth', 'password']);
  return `Basic ${btoa(`${username}:${password}`)}`;
}

export function createGetRequest(state, route) {
  return new Request(
    `${CUBE_API_SERVER}/${route}`,
    {
      mode: 'cors',
      credentials: 'include',
      headers: {
        Authorization: authHeader(state),
      },
    });
}

export function createPostRequest(state, route, body) {
  return new Request(
    `${CUBE_API_SERVER}/${route}`,
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

export function fetchToAction(request, actionType, actionCreator) {
  const action = {
    type: actionType,
  };
  return fetch(request)
    .then(response => {
      if (!response.ok) {
        return response.text().then(text => {
          action.error = `${response.statusText}: ${text}`;
          return action;
        });
      }
      return response.json().then(json => actionCreator(json, action));
    })
    .catch(error => {
      action.error = String(error);
      return action;
    });
}
