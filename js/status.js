const API_BASE='https://harbor-plugins-sheer-receiving.trycloudflare.com';
const input=document.querySelector('#requestId');
const button=document.querySelector('#check');
const message=document.querySelector('#statusMessage');
const result=document.querySelector('#result');
const labels={NEW:'NOUVELLE',IN_PROGRESS:'EN COURS',WAITING:'EN ATTENTE',COMPLETED:'TERMINÉE'};
const esc=value=>String(value??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
async function checkStatus(){
  const id=input.value.trim(); if(!id){message.textContent='Saisissez un identifiant TMS.';return;}
  message.textContent='Recherche…'; result.innerHTML=''; button.disabled=true;
  try{
    const r=await fetch(`${API_BASE}/api/requests/${encodeURIComponent(id)}`,{headers:{'Accept':'application/json'}}); const data=await r.json(); if(!r.ok) throw new Error(data.error||'Demande introuvable.');
    const item=data.request; const history=(item.history||[]).slice().reverse().map(h=>`<div><strong>${labels[h.status]||esc(h.status)}</strong> • ${new Date(h.at).toLocaleString('fr-FR')}</div>`).join('');
    message.textContent='Demande trouvée.';
    result.innerHTML=`<div class="portal-card"><b>${esc(item.id)}</b><strong>Statut : ${labels[item.status]||esc(item.status)}</strong><span>Créée le ${new Date(item.createdAt).toLocaleString('fr-FR')}</span><span>Mise à jour : ${new Date(item.updatedAt).toLocaleString('fr-FR')}</span><p><strong>Historique</strong><br>${history||'Aucun historique'}</p></div>`;
  }catch(error){message.textContent=error.message;}
  finally{button.disabled=false;}
}
function loadFromUrl(){const id=new URLSearchParams(location.search).get('id');if(id){input.value=id;checkStatus();}}
button.addEventListener('click',checkStatus); input.addEventListener('keydown',e=>{if(e.key==='Enter')checkStatus();}); loadFromUrl();
