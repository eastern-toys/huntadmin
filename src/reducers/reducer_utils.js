import _ from 'lodash';

export function setListDefault(state, allowedValues, valueProperty) {
  const value = state.get(valueProperty);
  if (!_.includes(allowedValues, value)) {
    if (allowedValues.length > 0) {
      return state.set(valueProperty, allowedValues[0]);
    }
    return state.set(valueProperty, '');
  }
  return state;
}
