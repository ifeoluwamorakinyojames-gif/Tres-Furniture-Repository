import { createRemoteJWKSet, jwtVerify } from 'jose';

export interface Env { DB: D1Database; MEDIA: R2Bucket; ACCESS_TEAM_DOMAIN: string; ACCESS_AUD: string; }
export type Ctx = { request: Request; env: Env; params: Record<string,string>; };
const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
export const respond = (data: unknown, status = 200) => new Response(JSON.stringify(data), {status,headers:jsonHeaders});
export async function requireAdmin(ctx: Ctx): Promise<Response | null> {
  const { ACCESS_TEAM_DOMAIN, ACCESS_AUD } = ctx.env;
  if (!ACCESS_TEAM_DOMAIN || !ACCESS_AUD) return respond({error:'Admin authentication not configured'},503);
  const token = ctx.request.headers.get('Cf-Access-Jwt-Assertion');
  if (!token) return respond({error:'Authentication required'},401);
  try {
    const configured = ACCESS_TEAM_DOMAIN.trim().replace(/\/$/,'');
    const domain = configured.startsWith('https://') ? configured : 'https://' + configured;
    if (!/^https:\/\/[a-z0-9.-]+\.cloudflareaccess\.com$/i.test(domain)) return respond({error:'Invalid authentication configuration'},503);
    const jwks = createRemoteJWKSet(new URL(domain + '/cdn-cgi/access/certs'));
    await jwtVerify(token,jwks,{issuer:domain,audience:ACCESS_AUD.trim(),algorithms:['RS256']});
    return null;
  } catch { return respond({error:'Invalid administrator session'},403); }
}
export function cleanText(v: unknown, max=200): string { return typeof v === 'string' ? v.trim().slice(0,max) : ''; }
export function isSafePath(v: string): boolean { return /^\/(?:[a-z0-9-]+\/?)*$/.test(v) && !v.startsWith('//'); }
export async function readBody(req: Request) {
  if (Number(req.headers.get('content-length') || 0)>32768) throw new Error('Request too large');
  const raw = await req.text();
  if(raw.length>32768) throw new Error('Request too large');
  return JSON.parse(raw);
}
