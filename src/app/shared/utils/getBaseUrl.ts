export function getBaseUrl() {
  if (typeof window !== 'undefined') return '';
  const protocol = process?.env.NODE_ENV==="development"?"http":"https"
  const host = process.env.VERCEL_URL || 'localhost:3000';
  return `${protocol}://${host}`;
}
