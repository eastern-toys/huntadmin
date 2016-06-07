export const PERMISSIONS = [
  '*',
  'submissions:read:*',
  'visibilities:read:*',
  'events:create:*',
];

export function userMayAccess(permissions, route) {
  if (permissions.includes('*')) {
    return true;
  }

  if (route === '/') {
    return true;
  }

  switch (route) {
  case '/callqueue':
    return permissions.includes('submissions:read:*');
  case '/huntstatus':
    return permissions.includes('submissions:read:*') &&
      permissions.includes('visibilities:read:*');
  case '/teamstatus':
    return permissions.includes('visibilities:read:*');
  case '/admintools':
    return permissions.includes('events:create:*');
  default:
    return false;
  }
}
