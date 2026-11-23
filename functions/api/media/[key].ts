import { Env, respond } from '../_shared';
export const onRequestGet: PagesFunction<Env> = async ({env,params}) => {
  const key = String(params.key || '');
  if (!/^[a-f0-9-]{36}\.(webp|png|jpg|jpeg)$/.test(key)) return respond({error:'Not found'},404);
  const image = await env.MEDIA.get(key);
  if (!image) return respond({error:'Not found'},404);
  const headers = new Headers();
  headers.set('Content-Type',image.httpMetadata?.contentType || 'image/jpeg');
  headers.set('Cache-Control','public,max-age=31536000,immutable');
  headers.set('X-Content-Type-Options','nosniff');
  return new Response(image.body,{headers});
};
