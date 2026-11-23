import { Env, respond } from './_shared';
export const onRequestGet: PagesFunction<Env> = async ({env}) => {
 try {const result=await env.DB.prepare('SELECT slot,image_key,alt FROM site_images LIMIT 150').all();return new Response(JSON.stringify({images:result.results}),{headers:{'Content-Type':'application/json','Cache-Control':'public,max-age=30'}});}
 catch{return respond({images:[]},200);}
};
