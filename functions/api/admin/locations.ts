import { Env, requireAdmin, respond, cleanText, readBody } from '../_shared';
export const onRequest:PagesFunction<Env>=async ctx=>{
 const denied=await requireAdmin(ctx);if(denied)return denied;
 try{
 if(ctx.request.method==='GET'){const result=await ctx.env.DB.prepare('SELECT * FROM business_locations ORDER BY kind').all();return respond({items:result.results});}
 if(ctx.request.method!=='PUT')return respond({error:'Method not allowed'},405);
 const data=await readBody(ctx.request),kind=cleanText(data.kind,20);
 if(!['head_office','showroom'].includes(kind))return respond({error:'Invalid office type'},400);
 const city=cleanText(data.city,100),name=cleanText(data.name,150);
 if(!city||!name)return respond({error:'Name and city required'},400);
 const values=[name,cleanText(data.street_address,250),city,cleanText(data.region,100),cleanText(data.postal_code,20),cleanText(data.phone,50),kind];
 await ctx.env.DB.prepare('UPDATE business_locations SET name=?,street_address=?,city=?,region=?,postal_code=?,phone=?,updated_at=CURRENT_TIMESTAMP WHERE kind=?').bind(...values).run();
 return respond({ok:true});
 }catch{return respond({error:'Unable to update office'},500);}
};
