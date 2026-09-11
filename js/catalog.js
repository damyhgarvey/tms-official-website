const root=document.querySelector('#catalog');
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const money=v=>new Intl.NumberFormat('fr-FR').format(Number(v||0))+' Ar';
async function loadCatalog(){
 try{
  const r=await fetch('catalog/catalog.json',{cache:'no-store'});if(!r.ok)throw new Error('Catalogue indisponible');const data=await r.json();
  root.innerHTML=data.offers.map(o=>`<article class="card offer-card"><span class="num">${esc(o.offer_id)}</span><div class="icon">✦</div><span class="offer-badge">DISPONIBLE</span><h3>${esc(o.name)}</h3><p>${esc(o.description||o.category||'Offre TMS')}</p><div class="offer-price"><strong>${money(o.price_mga)}</strong><span>prix indicatif</span></div><div class="offer-metrics"><span>Marge ${money(o.margin_mga)}</span><span>ROI ${esc(o.roi_pct)}%</span></div><a class="btn primary" href="request.html?offer=${encodeURIComponent(o.offer_id)}">Commander / demander →</a></article>`).join('');
 }catch(e){root.innerHTML=`<div class="card"><h3>Catalogue temporairement indisponible</h3><p>${esc(e.message)}</p></div>`;}
}
loadCatalog();