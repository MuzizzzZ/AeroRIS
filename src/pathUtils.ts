function normalizeBase(base: string) {
  if (!base || base === '.') {
    return '/';
  }

  const withLeadingSlash = base.startsWith('/') ? base : `/${base}`;
  return withLeadingSlash.endsWith('/') ? withLeadingSlash : `${withLeadingSlash}/`;
}

function isExternalPath(path: string) {
  return /^(https?:|mailto:|tel:|data:|blob:)/.test(path);
}

export function resolveAppPath(path: string, base = import.meta.env.BASE_URL) {
  if (!path || path.startsWith('#') || isExternalPath(path)) {
    return path;
  }

  const normalizedBase = normalizeBase(base);
  const normalizedPath = path.startsWith('/') ? path.slice(1) : path;

  if (normalizedBase !== '/' && path.startsWith(normalizedBase)) {
    return path;
  }

  return normalizedBase === '/' ? `/${normalizedPath}` : `${normalizedBase}${normalizedPath}`;
}

export function resolveRoutePath(path: string, base = import.meta.env.BASE_URL) {
  return resolveAppPath(path, base);
}

export function stripBasePath(pathname: string, base = import.meta.env.BASE_URL) {
  const normalizedBase = normalizeBase(base);

  if (normalizedBase === '/') {
    return pathname || '/';
  }

  const baseWithoutTrailingSlash = normalizedBase.slice(0, -1);

  if (pathname === baseWithoutTrailingSlash || pathname === normalizedBase) {
    return '/';
  }

  if (pathname.startsWith(normalizedBase)) {
    const stripped = pathname.slice(normalizedBase.length - 1);
    return stripped || '/';
  }

  return pathname || '/';
}
