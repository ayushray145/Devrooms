import app from '../backend/index.js';

// Vercel rewrites /api/* to this concrete function and passes the original
// API path in __path so Express can continue matching its /api/... routes.
export default function handler(req, res) {
  const requestUrl = new URL(req.url || '/', 'http://vercel.local');
  const routedPath = requestUrl.searchParams.get('__path') || '/';
  requestUrl.searchParams.delete('__path');

  const apiPath = routedPath.startsWith('/') ? routedPath : `/${routedPath}`;
  const query = requestUrl.searchParams.toString();
  req.url = `/api${apiPath}${query ? `?${query}` : ''}`;

  return app(req, res);
}
