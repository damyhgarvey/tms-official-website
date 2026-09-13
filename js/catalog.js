const root=document.querySelector('#catalog');
const esc=v=>String(v??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const money=v=>new Intl.NumberFormat('fr-FR').format(Number(v||0))+' Ar';
const statusLabel=o=>o.status==='AVAILABLE'?'DISPONIBLE':o.status==='SUR_DEVIS'?'SUR DEVIS':'INDISPONIBLE';
const statusClass=o=>o.status==='AVAILABLE'?'available':o.status==='SUR_DEVIS'?'quote':'unavailable';
const priceLabel=o=>o.price_mga!=null?money(o.price_mga):(o.price_min_mga!=null&&o.price_max_mga!=null?money(o.price_min_mga)+' – '+money(o.price_max_mga):'Sur devis');
const priceNote=o=>o.pricing_type==='MONTHLY_RANGE'?'par mois':o.pricing_unit?('par '+o.pricing_unit):o.price_unit?('par '+o.price_unit):o.pricing_type==='STARTING_FROM'?'à partir de':'prix';
async function loadCatalog(){
 try{
  const r=await fetch('catalog/catalog.json',{cache:'no-store'});if(!r.ok)throw new Error('Catalogue indisponible');const data=await r.json();
  root.innerHTML=data.offers.map(o=>`<article class="card offer-card"><span class="num">${esc(o.offer_id)}</span><div class="icon">✦</div><span class="offer-badge ${statusClass(o)}">${statusLabel(o)}</span><h3>${esc(o.name)}</h3><p>${esc(o.description||o.category||'Offre TMS')}</p><div class="offer-price"><strong>${priceLabel(o)}</strong><span>${priceNote(o)}</span></div><div class="offer-metrics"><span>${esc(o.delivery_target||'Sur qualification')}</span></div>${o.status==='AVAILABLE'?`<a class="btn primary" href="request.html?offer=${encodeURIComponent(o.offer_id)}">Commander / demander →</a>`:o.status==='SUR_DEVIS'?`<a class="btn primary" href="request.html?offer=${encodeURIComponent(o.offer_id)}">Demander un devis →</a>`:'<span class="btn disabled">Actuellement indisponible</span>'}</article>`).join('');
 }catch(e){root.innerHTML=`<div class="card"><h3>Catalogue temporairement indisponible</h3><p>${esc(e.message)}</p></div>`;}
}
loadCatalog();
