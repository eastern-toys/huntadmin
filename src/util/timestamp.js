const DATE_STRING_OPTIONS = {
  month: 'short',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export function timestampToString(timestamp) {
  if (!timestamp) {
    return 'never';
  }
  return new Date(timestamp).toLocaleDateString('en', DATE_STRING_OPTIONS);
}
