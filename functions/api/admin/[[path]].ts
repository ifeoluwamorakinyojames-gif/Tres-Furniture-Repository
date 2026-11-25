import { Env, requireAdmin, respond, cleanText, isSafePath, readBody } from '../_shared';
type Context = Parameters<PagesFunction<Env>>[0];
const allowed = ['products','banners','media'] as const;
type Table = typeof allowed[number];
const getPath = (ctx:Context) => {
  const raw=ctx.params.path;
  const parts=(Array.isArray(raw)?raw:[raw]).filter(Boolean).map(String);
  return parts;
};
async function handler(ctx:Context):Promise<Response> {
  const denial=await requireAdmin(ctx);
  if(denial) return denial;
  const [table,id]=getPath(ctx);
  if(!allowed.includes(table as Table)) return respond({error:'Unknown admin resource'},404);
  if(!ctx.env.DB) return respond({error:'Database connection unavailable'},503);
  try {
    if(ctx.request.method==='GET') {
      if(table==='media') {
        const result=await ctx.env.DB.prepare('SELECT * FROM media ORDER BY created_at DESC LIMIT 200').all();
        return respond({items:result.results});
      }
      const result=await ctx.env.DB.prepare('SELECT * FROM '+table+' ORDER BY sort_order,updated_at DESC LIMIT 200').all();
      return respond({items:result.results});
    }
    if(ctx.request.method==='POST' && table==='media') {

      const type=ctx.request.headers.get('content-type') || '';
      const mime=type.split(';')[0].toLowerCase();
      const extensions:Record<string,string>={'image/jpeg':'jpg','image/png':'png','image/webp':'webp'};
      if(!extensions[mime]) return respond({error:'Only JPG, PNG and WebP images are allowed'},415);
      const bytes=await ctx.request.arrayBuffer();
      if(bytes.byteLength<10 || bytes.byteLength>5*1024*1024) return respond({error:'Image must be under 5 MB'},413);
      const head=new Uint8Array(bytes.slice(0,12));
      const jpg=head[0]===255&&head[1]===216&&head[2]===255;
      const png=head[0]===137&&head[1]===80&&head[2]===78&&head[3]===71;
      const webp=String.fromCharCode(...head.slice(0,4))==='RIFF'&&String.fromCharCode(...head.slice(8,12))==='WEBP';
      if(!(mime==='image/jpeg'&&jpg||mime==='image/png'&&png||mime==='image/webp'&&webp)) return respond({error:'Image signature does not match format'},415);
      const key=crypto.randomUUID()+'.'+extensions[mime],mediaId=crypto.randomUUID();
      if(!ctx.env.MEDIA){
        if(bytes.byteLength>1500000)return respond({error:'Without R2, images must be under 1.5 MB. Please compress the image.'},413);
        await ctx.env.DB.prepare('CREATE TABLE IF NOT EXISTS media_blobs (object_key TEXT PRIMARY KEY, data BLOB NOT NULL, mime_type TEXT NOT NULL)').run();
        await ctx.env.DB.batch([
          ctx.env.DB.prepare('INSERT INTO media_blobs(object_key,data,mime_type) VALUES(?,?,?)').bind(key,bytes,mime),
          ctx.env.DB.prepare('INSERT INTO media(id,object_key,alt,mime_type,bytes) VALUES(?,?,?,?,?)').bind(mediaId,key,cleanText(new URL(ctx.request.url).searchParams.get('alt'),200),mime,bytes.byteLength)
        ]);
        return respond({id:mediaId,image_key:key,url:'/api/media/'+key},201);
      }
      await ctx.env.MEDIA.put(key,bytes,{httpMetadata:{contentType:mime}});
      try {await ctx.env.DB.prepare('INSERT INTO media(id,object_key,alt,mime_type,bytes) VALUES(?,?,?,?,?)').bind(mediaId,key,cleanText(new URL(ctx.request.url).searchParams.get('alt'),200),mime,bytes.byteLength).run();}
      catch(e){await ctx.env.MEDIA.delete(key);throw e;}
      return respond({id:mediaId,image_key:key,url:'/api/media/'+key},201);
    }
    if(table==='media') return respond({error:'Method not allowed'},405);
    if(ctx.request.method==='DELETE'){
      if(!id || !/^[a-f0-9-]{36}$/.test(id)) return respond({error:'Valid ID required'},400);
      await ctx.env.DB.prepare('DELETE FROM '+table+' WHERE id=?').bind(id).run();
      return respond({ok:true});
    }
    if(ctx.request.method!=='POST'&&ctx.request.method!=='PUT') return respond({error:'Method not allowed'},405);
    const data=await readBody(ctx.request);
    if(!data||typeof data!=='object') return respond({error:'Invalid payload'},400);
    const name=cleanText(table==='products'?data.name:data.title,140);
    if(!name) return respond({error:'Name/title is required'},400);
    const imageKey=cleanText(data.image_key,100)||null;
    if(imageKey&&!/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(imageKey)) return respond({error:'Invalid image reference'},400);
    if(imageKey){const exists=await ctx.env.DB.prepare('SELECT id FROM media WHERE object_key=?').bind(imageKey).first();if(!exists)return respond({error:'Image not found'},400);}
    const published=data.published===true||data.published===1?1:0;
    const sortOrder=Number.isInteger(data.sort_order)&&data.sort_order>=0&&data.sort_order<=100000?data.sort_order:0;
    const recordId=ctx.request.method==='PUT'?id:crypto.randomUUID();
    if(!recordId||!/^[a-f0-9-]{36}$/.test(recordId)) return respond({error:'Valid ID required'},400);
    if(table==='products'){
      const slug=cleanText(data.slug,100).toLowerCase();
      if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) return respond({error:'Slug must use lowercase letters, numbers and hyphens'},400);
      const seoTitle=cleanText(data.seo_title,140),metaDescription=cleanText(data.meta_description,300),primaryKeyword=cleanText(data.primary_keyword,140),specifications=cleanText(data.specifications,6000),brand=cleanText(data.brand,140),imageCaption=cleanText(data.image_caption,200),indexable=data.indexable===false||data.indexable===0?0:1;
      if(published&&(!cleanText(data.description,4000)||!seoTitle||!metaDescription||!imageKey||!cleanText(data.image_alt,200)))return respond({error:'Publishing requires description, SEO title, meta description, uploaded image and alt text'},400);
      const values=[slug,name,cleanText(data.category,100),cleanText(data.description,4000),imageKey,cleanText(data.image_alt,200),published,sortOrder,seoTitle,metaDescription,primaryKeyword,specifications,brand,imageCaption,indexable];
      if(ctx.request.method==='POST') await ctx.env.DB.prepare('INSERT INTO products(id,slug,name,category,description,image_key,image_alt,published,sort_order,seo_title,meta_description,primary_keyword,specifications,brand,image_caption,indexable) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(recordId,...values).run();
      else await ctx.env.DB.prepare('UPDATE products SET slug=?,name=?,category=?,description=?,image_key=?,image_alt=?,published=?,sort_order=?,seo_title=?,meta_description=?,primary_keyword=?,specifications=?,brand=?,image_caption=?,indexable=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(...values,recordId).run();
    }else{
      const href=cleanText(data.href,150)||'/collections';
      if(!isSafePath(href))return respond({error:'Only internal links are allowed'},400);
      const values=[name,cleanText(data.accent,140),cleanText(data.label,140),cleanText(data.description,1200),imageKey,cleanText(data.image_alt,200),href,cleanText(data.action_label,80)||'Explore collection',published,sortOrder];
      if(ctx.request.method==='POST')await ctx.env.DB.prepare('INSERT INTO banners(id,title,accent,label,description,image_key,image_alt,href,action_label,published,sort_order) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind(recordId,...values).run();
      else await ctx.env.DB.prepare('UPDATE banners SET title=?,accent=?,label=?,description=?,image_key=?,image_alt=?,href=?,action_label=?,published=?,sort_order=?,updated_at=CURRENT_TIMESTAMP WHERE id=?').bind(...values,recordId).run();
    }
    return respond({ok:true,id:recordId},ctx.request.method==='POST'?201:200);
  } catch(e) { return respond({error:'Unable to complete operation; check database configuration and unique slugs'},500); }
}
export const onRequest: PagesFunction<Env> = handler;
