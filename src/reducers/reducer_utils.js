export function checkForError(state, action) {
  if (action.error) {
    return state.set('errorText', action.error);
  } else if (state.has('errorText')) {
    return state.delete('errorText');
  }
  return state;
}

export function setListDefault(state, listProperty, valueProperty) {
  const list = state.get(listProperty);
  const value = state.get(valueProperty);
  if (!list.includes(value)) {
    if (list.size > 0) {
      return state.set(valueProperty, list.get(0));
    }
    return state.set(valueProperty, '');
  }
  return state;
}
