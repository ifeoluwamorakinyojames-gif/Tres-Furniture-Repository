import { useEffect, useState } from 'react';
type ImageSlot={slot:string;image_key:string;alt:string};
let cache:ImageSlot[]|null=null;
export function useSiteImages(){
 const [images,setImages]=useState<ImageSlot[]>(cache||[]);
 useEffect(()=>{let active=true;fetch('/api/site-images').then(r=>r.ok?r.json():null).then(data=>{if(active&&Array.isArray(data?.images)){cache=data.images;setImages(data.images);}}).catch(()=>{});return()=>{active=false;};},[]);
 return (slot:string,fallback:string)=>{const item=images.find(i=>i.slot===slot);return {src:item?'/api/media/'+item.image_key:fallback,alt:item?.alt||''};};
}
