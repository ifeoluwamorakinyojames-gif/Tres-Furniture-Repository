import { SeoEnv,baseUrl } from './_seo';
const esc=(s:string)=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export const onRequestGet:PagesFunction<SeoEnv> = async ctx=>{
 const base=baseUrl(ctx.request,ctx.env);
 let staticPaths:string[]=[];
 try{
 const existing=await ctx.next();
 if(existing.ok){const xml=await existing.text();staticPaths=[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>new URL(m[1]).pathname);}
 }catch{}
 const paths=new Map<string,string>();
 for(const path of staticPaths)if(!path.startsWith('/admin')&&!path.startsWith('/api/'))paths.set(path,'');
 try{
 const rows=await ctx.env.DB.prepare('SELECT slug,updated_at FROM products WHERE published=1 AND indexable=1 ORDER BY updated_at DESC LIMIT 10000').all<{slug:string;updated_at:string}>();
 for(const row of rows.results||[])paths.set('/products/'+row.slug+'/',row.updated_at||'');
 }catch{}
 if(paths.size===0)return ctx.next();
 const body='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+[...paths].map(([path,lastmod])=>'<url><loc>'+esc(base+path)+'</loc>'+(lastmod?'<lastmod>'+esc(lastmod.slice(0,10))+'</lastmod>':'')+'</url>').join('\n')+'\n</urlset>';
 return new Response(body,{headers:{'Content-Type':'application/xml; charset=utf-8','Cache-Control':'public,max-age=300'}});
};
