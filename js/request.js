const API_BASE='https://mph-recordings-concord-restaurant.trycloudflare.com';
const form=document.querySelector('#requestForm');
const status=document.querySelector('#formStatus');
const offerInput=document.querySelector('#offerId');
const params=new URLSearchParams(location.search);
if(params.get('offer')&&offerInput) offerInput.value=params.get('offer').slice(0,80);
function saveOffline(data){
  const stored=JSON.parse(localStorage.getItem('tms_requests')||'[]');
  stored.push(data); localStorage.setItem('tms_requests',JSON.stringify(stored));
}
form?.addEventListener('submit',async event=>{
  event.preventDefault();
  const data=Object.fromEntries(new FormData(form));
  const offer=String(data.offer_id||'').trim();
  const baseMessage=String(data.message||'').trim();
  data.message=offer?`OFFRE=${offer}\n${baseMessage}`:baseMessage;
  delete data.offer_id;
  status.textContent='Enregistrement de la demande…'; status.classList.remove('success');
  try{
    const response=await fetch(`${API_BASE}/api/requests`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    const result=await response.json(); if(!response.ok) throw new Error(result.error||'Erreur serveur');
    const id=result.request.id;
    status.innerHTML=`Demande <strong>${id}</strong> enregistrée. <a href="status.html?id=${encodeURIComponent(id)}">Suivre la demande →</a>`;
    status.classList.add('success'); form.reset();
  }catch(error){
    data.id=`TMS-OFFLINE-${Date.now()}`; data.createdAt=new Date().toISOString(); data.status='NEW';
    saveOffline(data);
    status.textContent=`Backend central indisponible. Référence locale : ${data.id}. Aucun paiement ni livraison n'a été exécuté.`;
    status.classList.add('success');
  }
});
