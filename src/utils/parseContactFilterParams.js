const allowedTypes = ['personal', 'work', 'home'];
function parseType(type) {
  if (typeof type === 'string' && allowedTypes.includes(type)) {
    return type;
  }
  return undefined;
}
function parseIsFavourite(isFavourite) {
  if (typeof isFavourite === 'string') {
    if (isFavourite === 'true') {
      return true;
    }
    if (isFavourite === 'false') {
      return false;
    }
  }
  return undefined;
}

export function parseContactFilterParams(query) {
  const { type, isFavourite } = query;

  const parsedType = parseType(type);
  const parsedIsFavourite = parseIsFavourite(isFavourite);
  const filter = {};
  if (parsedType !== undefined) {
    filter.contactType = parsedType;
  }
  if (parsedIsFavourite !== undefined) {
    filter.isFavourite = parsedIsFavourite;
  }
  return filter;
}
