import Head from 'next/head';
import Link from 'next/link';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

type Item = Record<string, unknown> & { id: string; image_key?: string; name?: string; title?: string; published?: number; slug?: string; category?: string; description?: string; image_alt?: string };
type Resource = 'products' | 'banners' | 'media' | 'site-images' | 'enquiries';
const tabs: {key:Resource;label:string}[] = [{key:'products',label:'Products'},{key:'banners',label:'Homepage slides'},{key:'media',label:'Images'},{key:'site-images',label:'Website images'},{key:'enquiries',label:'Quotations'}];
const imageUrl = (key:unknown) => typeof key==='string' && key ? '/api/media/'+key : '';
const initial = {name:'',slug:'',category:'',description:'',image_key:'',image_alt:'',title:'',accent:'',label:'',href:'/collections',action_label:'Explore collection',sort_order:0,published:false,seo_title:'',meta_description:'',primary_keyword:'',specifications:'',brand:'',image_caption:'',indexable:true};

export default function Admin() {
  const [tab,setTab]=useState<Resource>('products');
  const [items,setItems]=useState<Item[]>([]);
  const [media,setMedia]=useState<Item[]>([]);
  const [form,setForm]=useState({...initial});
  const [editing,setEditing]=useState<string|null>(null);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState('');
  const [connected,setConnected]=useState(false);
  const [uploadAlt,setUploadAlt]=useState('');
  const [imageSlot,setImageSlot]=useState('category:furniture');
  const [imageKey,setImageKey]=useState('');
  const [imageAlt,setImageAlt]=useState('');
  const [file,setFile]=useState<File|null>(null);

  const load=useCallback(async (resource:Resource) => {
    const response=await fetch('/api/admin/'+resource,{credentials:'same-origin',cache:'no-store'});
    if(!response.ok) throw new Error(response.status===401||response.status===403?'Administrator authentication required. Configure Cloudflare Access.':'Backend not available ('+response.status+'). Check Cloudflare D1, R2 and Pages Functions.');
    const result=await response.json() as {items:Item[]};
    if(resource==='media')setMedia(result.items);else setItems(result.items);
    setConnected(true);
  },[]);
  useEffect(()=>{setMessage('');Promise.all([load(tab),load('media')]).catch(error=>{setConnected(false);setMessage(String(error.message));});},[tab,load]);
  const reset=()=>{setForm({...initial});setEditing(null);};
  const edit=(item:Item)=>{
    setEditing(item.id);
    setForm({...initial,...item,published:item.published===1||item.published===true,sort_order:Number(item.sort_order)||0} as typeof initial);
    window.scrollTo({top:0,behavior:'smooth'});
  };
  const save=async(event:FormEvent)=>{
    event.preventDefault();setBusy(true);setMessage('');
    try{
      const url='/api/admin/'+tab+(editing?'/'+editing:'');
      const response=await fetch(url,{method:editing?'PUT':'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form),credentials:'same-origin'});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Unable to save');
      reset();await load(tab);setMessage('Saved successfully. Published changes should appear on the homepage shortly.');
    }catch(error){setMessage(String(error));}finally{setBusy(false);}
  };
  const remove=async(id:string)=>{
    if(!window.confirm('Delete this item permanently?'))return;
    setBusy(true);
    try{const response=await fetch('/api/admin/'+tab+'/'+id,{method:'DELETE'});if(!response.ok)throw new Error('Unable to delete');await load(tab);reset();setMessage('Item deleted.');}catch(error){setMessage(String(error));}finally{setBusy(false);}
  };
  const upload=async(event:FormEvent)=>{
    event.preventDefault();if(!file)return;setBusy(true);setMessage('');
    try{
      const response=await fetch('/api/admin/media?alt='+encodeURIComponent(uploadAlt),{method:'POST',headers:{'Content-Type':file.type},body:file});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Upload failed');
      await load('media');setFile(null);setUploadAlt('');setMessage('Image uploaded. You can select it when editing a product or homepage slide.');
    }catch(error){setMessage(String(error));}finally{setBusy(false);}
  };
  const saveSiteImage=async(event:FormEvent)=>{
    event.preventDefault();setBusy(true);setMessage('');
    try{
      const response=await fetch('/api/admin/site-images',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({slot:imageSlot,image_key:imageKey,alt:imageAlt})});
      const result=await response.json();
      if(!response.ok)throw new Error(result.error||'Unable to save');
      await load('site-images');setMessage('Website image updated.');
    }catch(error){setMessage(String(error));}finally{setBusy(false);}
  };
  const setEnquiryStatus=async(id:string,status:string)=>{
    setBusy(true);
    try{const response=await fetch('/api/admin/enquiries',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({id,status})});if(!response.ok)throw new Error('Unable to update enquiry');await load('enquiries');}catch(error){setMessage(String(error));}finally{setBusy(false);}
  };
  const field=(key:keyof typeof initial,label:string,required=false)=> <label className="adminField" key={key}><span>{label}</span><input required={required} value={String(form[key])} onChange={event=>setForm(old=>({...old,[key]:event.target.value}))}/></label>;
  return <>
    <Head><title>RUFES Admin | Catalogue & Images</title><meta name="robots" content="noindex,nofollow,noarchive"/></Head>
    <div className="adminShell">
      <aside className="adminSidebar"><div className="adminIdentity"><span className="adminMark">R</span><div><strong>RUFES</strong><small>Content management</small></div></div><div className="adminSidebarCaption">MANAGE WEBSITE</div><nav aria-label="Admin sections">{tabs.map(t=><button key={t.key} type="button" className={'adminNavItem'+(tab===t.key?' selected':'')} onClick={()=>{setTab(t.key);reset();}}>{t.label}</button>)}</nav><div className="adminSidebarBottom"><Link href="/">← View website</Link><small>Protected API requires Cloudflare Access</small></div></aside>
      <div className="adminWorkspace"><header className="adminTopbar"><strong>RUFES Content Studio</strong><Link href="/">View storefront ↗</Link></header><main className="adminContent">
        <div className="adminHeading"><div><span className="adminEyebrow">SHOWROOM CONTENT MANAGEMENT</span><h1>{tabs.find(t=>t.key===tab)?.label}</h1><p>Manage the live catalogue and imagery from one workspace.</p></div><span className="adminSetupTag">{connected?'Backend connected':'Connection required'}</span></div>
        {message&&<div className="adminNotice" role="status">{message}</div>}
        {!connected&&<div className="adminNotice">The admin interface is not active until Cloudflare Access, D1, R2 and Pages Functions are configured. Do not upload private images or customer information before setup is verified.</div>}
        {tab==='enquiries'?<div className="adminPanel"><h2>Customer quotation requests</h2><div className="adminItemList">{items.map(item=><div className="adminItemRow" key={item.id}><div><strong>{String(item.name||'Customer')} — {String(item.product||'General enquiry')}</strong><small>{String(item.email||'')} · {String(item.phone||'')} · {String(item.created_at||'')}</small><p>{String(item.message||'')}</p></div><select value={String(item.status||'new')} disabled={!connected||busy} onChange={e=>setEnquiryStatus(item.id,e.target.value)}><option value="new">New</option><option value="in_progress">In progress</option><option value="completed">Completed</option></select></div>)}{items.length===0&&<p>No enquiries yet.</p>}</div></div>:
        tab==='site-images'?<div className="adminPanel"><h2>Assign images across the website</h2><p>Upload your image in the Images tab, then assign it to a section here.</p><form className="adminForm" onSubmit={saveSiteImage}><label className="adminField"><span>Image location</span><select value={imageSlot} onChange={e=>setImageSlot(e.target.value)}>{['furniture','lighting','decor','flowers','gym','playground','sports','christmas','textiles','toys'].map(key=><option key={key} value={'category:'+key}>Collection: {key}</option>)}{['furniture','lighting','gym'].map(key=><option key={key} value={'editorial:'+key}>Editorial: {key}</option>)}<option value="promo:lighting">Lighting promotion</option></select></label><label className="adminField"><span>Uploaded image</span><select value={imageKey} onChange={e=>setImageKey(e.target.value)} required><option value="">Choose image</option>{media.map(m=><option key={m.id} value={String(m.object_key)}>{String(m.alt||m.object_key)}</option>)}</select></label><label className="adminField"><span>Alt text</span><input value={imageAlt} onChange={e=>setImageAlt(e.target.value)} required maxLength={200}/></label><button className="btn" disabled={!connected||busy}>Save website image</button></form><div className="adminItemList">{items.map(item=><div className="adminItemRow" key={String(item.slot)}><img src={imageUrl(item.image_key)} alt={String(item.alt||'')}/><div><strong>{String(item.slot)}</strong><small>{String(item.alt||'')}</small></div><button type="button" onClick={()=>{setImageSlot(String(item.slot));setImageKey(String(item.image_key));setImageAlt(String(item.alt||''));}}>Edit</button></div>)}</div></div>:
        tab==='media'?<div className="adminPanel"><h2>Upload a product or banner image</h2><form onSubmit={upload} className="adminForm"><label className="adminField"><span>Image (JPG, PNG or WebP, maximum 5 MB)</span><input type="file" accept="image/jpeg,image/png,image/webp" required onChange={(e:ChangeEvent<HTMLInputElement>)=>setFile(e.target.files?.[0]||null)}/></label><label className="adminField"><span>Descriptive image alt text</span><input value={uploadAlt} onChange={e=>setUploadAlt(e.target.value)} maxLength={200} required/></label><button className="btn" disabled={!connected||busy||!file}>Upload image</button></form><div className="adminMediaGrid">{media.map(m=><div className="adminMediaItem" key={m.id}><img src={imageUrl(m.object_key)} alt={String(m.alt||'Uploaded image')}/><small>{String(m.alt||m.object_key)}</small></div>)}</div></div>:
        <><div className="adminPanel"><h2>{editing?'Edit '+(tab==='products'?'product':'slide'):'Add '+(tab==='products'?'product':'homepage slide')}</h2><form onSubmit={save} className="adminForm">
          {tab==='products'?<>{field('name','Product name',true)}{field('slug','SEO slug (e.g. modern-sofa)',true)}{field('category','Collection/category',true)}</>:<>{field('title','Slide heading',true)}{field('accent','Highlighted heading')}{field('label','Small label')}{field('href','Button link (internal path)',true)}{field('action_label','Button label')}</>}
          <label className="adminField"><span>Description</span><textarea value={form.description} rows={4} onChange={e=>setForm(old=>({...old,description:e.target.value}))}/></label>
          <label className="adminField"><span>Choose uploaded image</span><select value={form.image_key} onChange={e=>{const selected=media.find(m=>m.object_key===e.target.value);setForm(old=>({...old,image_key:e.target.value,image_alt:String(selected?.alt||old.image_alt)}));}}><option value="">No image selected</option>{media.map(m=><option key={m.id} value={String(m.object_key)}>{String(m.alt||m.object_key)}</option>)}</select></label>
          {form.image_key&&<img className="adminSelectedImage" src={imageUrl(form.image_key)} alt={form.image_alt||'Selected image'}/>}
          {field('image_alt','Image alt text')}
          {tab==='products'&&<>{field('seo_title','SEO page title (recommended 50–65 characters)',true)}{field('meta_description','Meta description (recommended 140–160 characters)',true)}{field('primary_keyword','Primary search phrase')}{field('brand','Verified product brand')}{field('image_caption','Image caption')}<label className="adminField"><span>Verified product specifications (one per line)</span><textarea value={form.specifications} rows={5} onChange={e=>setForm(old=>({...old,specifications:e.target.value}))}/></label><label className="adminCheck"><input type="checkbox" checked={form.indexable} onChange={e=>setForm(old=>({...old,indexable:e.target.checked}))}/> Allow search engine indexing</label></>}
          <label className="adminField"><span>Display order</span><input type="number" min="0" max="100000" value={form.sort_order} onChange={e=>setForm(old=>({...old,sort_order:Number(e.target.value)}))}/></label>
          <label className="adminCheck"><input type="checkbox" checked={form.published} onChange={e=>setForm(old=>({...old,published:e.target.checked}))}/> Publish on website</label>
          <div className="adminQuickActions"><button className="btn" disabled={!connected||busy}>{editing?'Save changes':'Create item'}</button>{editing&&<button type="button" onClick={reset}>Cancel edit</button>}</div>
        </form></div>
        <div className="adminPanel"><h2>Existing {tab==='products'?'products':'slides'}</h2><div className="adminItemList">{items.map(item=><div className="adminItemRow" key={item.id}>{item.image_key?<img src={imageUrl(item.image_key)} alt={String(item.image_alt||'')}/>:<span className="adminNoImage">No image</span>}<div><strong>{String(item.name||item.title)}</strong><small>{item.published?'Published':'Draft'} · {String(item.category||item.slug||'Homepage slide')}</small></div><button type="button" disabled={!connected||busy} onClick={()=>edit(item)}>Edit</button><button type="button" disabled={!connected||busy} onClick={()=>remove(item.id)}>Delete</button></div>)}{items.length===0&&<p className="muted">No database items yet. Existing static catalogue items remain visible until migrated.</p>}</div></div></>}
      </main></div>
    </div>
  </>;
}
