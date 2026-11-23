import { Env, requireAdmin, respond, cleanText, readBody } from '../_shared';
export const onRequest: PagesFunction<Env> = async ctx => {
 const denied=await requireAdmin(ctx);if(denied)return denied;
 try {
 if(ctx.request.method==='GET'){const result=await ctx.env.DB.prepare('SELECT slot,image_key,alt FROM site_images ORDER BY slot').all();return respond({items:result.results});}
 if(ctx.request.method!=='PUT')return respond({error:'Method not allowed'},405);
 const data=await readBody(ctx.request);
 const slot=cleanText(data.slot,100),image_key=cleanText(data.image_key,100),alt=cleanText(data.alt,200);
 if(!/^(category|service|article|editorial|promo):[a-z0-9-]+$/.test(slot))return respond({error:'Invalid image slot'},400);
 if(!/^[a-f0-9-]{36}\.(jpg|png|webp)$/.test(image_key))return respond({error:'Select a valid uploaded image'},400);
 const exists=await ctx.env.DB.prepare('SELECT id FROM media WHERE object_key=?').bind(image_key).first();
 if(!exists)return respond({error:'Image not found'},400);
 await ctx.env.DB.prepare('INSERT INTO site_images(id,slot,image_key,alt) VALUES(?,?,?,?) ON CONFLICT(slot) DO UPDATE SET image_key=excluded.image_key,alt=excluded.alt,updated_at=CURRENT_TIMESTAMP').bind(crypto.randomUUID(),slot,image_key,alt).run();
 return respond({ok:true});
 }catch{return respond({error:'Unable to save image assignment'},500);}
};
