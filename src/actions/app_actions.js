export function dismissError() {
  return {
    type: 'DISMISS_ERROR',
  };
}

export function logout(router) {
  return dispatch => {
    dispatch({
      type: 'AUTH_LOGOUT',
    });
    router.push('/login');
  };
}
