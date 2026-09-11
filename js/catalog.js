const root=document.querySelector('#catalog');
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const money=v=>new Intl.NumberFormat('fr-FR').format(Number(v||0))+' Ar';
async function loadCatalog(){
  try{
    const r=await fetch('catalog/catalog.json',{cache:'no-store'});
    if(!r.ok) throw new Error('Catalogue indisponible');
    const data=await r.json();
    root.innerHTML=data.offers.map(o=>`<article class="card"><span class="num">${esc(o.offer_id)}</span><div class="icon">✦</div><h3>${esc(o.name)}</h3><p>${esc(o.category)} • ${money(o.price_mga)}</p><p>Marge indicative : ${money(o.margin_mga)} • ROI : ${esc(o.roi_pct)}%</p><span class="status"><span></span>DISPONIBLE</span><a href="request.html?offer=${encodeURIComponent(o.offer_id)}">Commander / demander →</a></article>`).join('');
  }catch(e){root.innerHTML=`<div class="card"><h3>Catalogue temporairement indisponible</h3><p>${esc(e.message)}</p></div>`;}
}
loadCatalog();
