import { Env, respond } from './_shared';
export const onRequestGet: PagesFunction<Env> = async ({env}) => {
  try {
    const [products,banners] = await Promise.all([
      env.DB.prepare('SELECT id,slug,name,category,description,image_key,image_alt FROM products WHERE published=1 ORDER BY sort_order,updated_at DESC LIMIT 100').all(),
      env.DB.prepare('SELECT id,title,accent,label,description,image_key,image_alt,href,action_label FROM banners WHERE published=1 ORDER BY sort_order,updated_at DESC LIMIT 12').all()
    ]);
    return new Response(JSON.stringify({products:products.results,banners:banners.results}),{headers:{'Content-Type':'application/json','Cache-Control':'public, max-age=30','X-Content-Type-Options':'nosniff'}});
  } catch { return respond({error:'Content unavailable'},503); }
};
