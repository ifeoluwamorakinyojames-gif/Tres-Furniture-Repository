import { Env, respond } from './_shared';
export const onRequestGet:PagesFunction<Env>=async ({env})=>{
 try{
 const result=await env.DB.prepare('SELECT kind,name,street_address,city,region,country,postal_code,phone FROM business_locations WHERE public_visible=1 ORDER BY kind').all();
 return new Response(JSON.stringify({locations:result.results}),{headers:{'Content-Type':'application/json','Cache-Control':'public,max-age=300'}});
 }catch{return respond({locations:[]});}
};
