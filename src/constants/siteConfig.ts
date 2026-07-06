/** Production canonical domain — override via VITE_SITE_URL in .env */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://tech-giant.in').replace(/\/$/, '');

export const SITE_NAME = 'Tech Giant';

export const siteUrl = (path: string = '/'): string => {
  if (!path || path === '/') return `${SITE_URL}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
};
