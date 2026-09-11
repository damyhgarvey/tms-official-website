const form=document.querySelector('#requestForm');
const status=document.querySelector('#formStatus');
function saveOffline(data){
  const stored=JSON.parse(localStorage.getItem('tms_requests')||'[]'); stored.push(data); localStorage.setItem('tms_requests',JSON.stringify(stored));
}
form?.addEventListener('submit',async event=>{
  event.preventDefault(); const data=Object.fromEntries(new FormData(form)); status.textContent='Envoi de la demande…'; status.classList.remove('success');
  try{
    const response=await fetch('/api/requests',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}); const result=await response.json();
    if(!response.ok) throw new Error(result.error||'Erreur serveur');
    const id=result.request.id; status.innerHTML=`Demande <strong>${id}</strong> enregistrée. <a href="status.html?id=${encodeURIComponent(id)}">Suivre la demande →</a>`; status.classList.add('success'); form.reset();
  }catch(error){
    data.id=`TMS-OFFLINE-${Date.now()}`; data.createdAt=new Date().toISOString(); data.status='NEW'; saveOffline(data);
    status.textContent=`Connexion backend indisponible. Demande ${data.id} conservée localement.`; status.classList.add('success');
  }
});
