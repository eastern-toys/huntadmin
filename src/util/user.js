export function userMayAccess(user, route) {
  const permissions = user.get('permissions');

  if (permissions.includes('*')) {
    return true;
  }

  if (route === '/') {
    return true;
  }

  function domainExists(domain) {
    return permissions.find(p => p.startsWith(domain)) !== undefined;
  }

  switch (route) {
  case '/callqueue':
    return domainExists('submissions');
  case '/huntstatus':
    return domainExists('submissions') && domainExists('visibilities');
  case '/teamstatus':
    return domainExists('visibilities');
  case '/admintools':
    return domainExists('events');
  default:
    return false;
  }
}
