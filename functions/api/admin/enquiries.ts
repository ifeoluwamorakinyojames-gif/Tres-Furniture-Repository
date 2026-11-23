import { Env, requireAdmin, respond, cleanText, readBody } from '../_shared';
export const onRequest: PagesFunction<Env> = async ctx => {
 const denied=await requireAdmin(ctx);if(denied)return denied;
 try{
 if(ctx.request.method==='GET'){const result=await ctx.env.DB.prepare('SELECT id,name,email,phone,product,message,status,created_at FROM enquiries ORDER BY created_at DESC LIMIT 200').all();return respond({items:result.results});}
 if(ctx.request.method==='PUT'){
 const data=await readBody(ctx.request);
 const id=cleanText(data.id,40),status=cleanText(data.status,30);
 if(!/^[a-f0-9-]{36}$/.test(id)||!['new','in_progress','completed'].includes(status))return respond({error:'Invalid update'},400);
 await ctx.env.DB.prepare('UPDATE enquiries SET status=? WHERE id=?').bind(status,id).run();
 return respond({ok:true});
 }
 return respond({error:'Method not allowed'},405);
 }catch{return respond({error:'Unable to process enquiries'},500);}
};
