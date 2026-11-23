export type SeoEnv = { DB:D1Database; SITE_URL?:string };
export function escapeHtml(value:unknown):string {return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]||c));}
export function baseUrl(request:Request,env:SeoEnv):string{
 const origin=new URL(request.url).origin;
 const configured=(env.SITE_URL||'').trim();
 if(configured){try{const url=new URL(configured);if(url.protocol==='https:')return url.origin;}catch{}}
 return origin;
}
export function jsonLd(data:unknown){return JSON.stringify(data).replace(/</g,'\\u003c');}
export function htmlResponse(body:string,status=200,headers:Record<string,string>={}):Response{
 return new Response(body,{status,headers:{'Content-Type':'text/html; charset=utf-8','X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=60',...headers}});
}
