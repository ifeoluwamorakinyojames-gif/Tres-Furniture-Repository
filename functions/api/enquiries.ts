import { Env, respond, cleanText, readBody } from './_shared';
export const onRequestPost: PagesFunction<Env> = async ({request,env}) => {
 try{
 const data=await readBody(request);
 const name=cleanText(data.name,120),email=cleanText(data.email,180),phone=cleanText(data.phone,40),product=cleanText(data.product,140),message=cleanText(data.message,1500);
 if(!name||!email||!message||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))return respond({error:'Enter a valid name, email and message'},400);
 if(cleanText(data.website,100))return respond({ok:true},200);
 await env.DB.prepare('INSERT INTO enquiries(id,name,email,phone,product,message) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(),name,email,phone,product,message).run();
 return respond({ok:true},201);
 }catch{return respond({error:'Unable to submit enquiry'},503);}
};
