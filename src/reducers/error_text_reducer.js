export default function (state = null, action) {
  if (action.error) {
    return action.error;
  } else if (action.type === 'DISMISS_ERROR') {
    return null;
  }
  return state;
}
