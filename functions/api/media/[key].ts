import { Env, respond } from '../_shared';
export const onRequestGet: PagesFunction<Env> = async ({env,params}) => {
  const key = String(params.key || '');
  if (!/^[a-f0-9-]{36}\.(webp|png|jpg|jpeg)$/.test(key)) return respond({error:'Not found'},404);
  const image = env.MEDIA ? await env.MEDIA.get(key) : null;
  if (!image) {
    try {
      const row=await env.DB.prepare('SELECT data,mime_type FROM media_blobs WHERE object_key=?').bind(key).first<{data:ArrayBuffer|number[],mime_type:string}>();
      if(row)return new Response(new Uint8Array(row.data),{headers:{'Content-Type':row.mime_type,'Cache-Control':'public,max-age=31536000,immutable','X-Content-Type-Options':'nosniff'}});
    } catch {}
    return respond({error:'Not found'},404);
  }
  const headers = new Headers();
  headers.set('Content-Type',image.httpMetadata?.contentType || 'image/jpeg');
  headers.set('Cache-Control','public,max-age=31536000,immutable');
  headers.set('X-Content-Type-Options','nosniff');
  return new Response(image.body,{headers});
};
