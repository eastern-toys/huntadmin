import * as promise from 'es6-promise';
promise.polyfill();
import 'isomorphic-fetch';

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
