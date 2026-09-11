(()=>{
  const key='tms-theme';
  const modes=['system','dark','light'];
  const saved=localStorage.getItem(key);
  const mode=modes.includes(saved)?saved:'system';
  document.documentElement.dataset.theme=mode;
  const b=document.createElement('button');
  b.type='button'; b.className='tms-theme-toggle'; b.setAttribute('aria-label','Changer le thème');
  const labels={system:'SYSTEM',dark:'DARK',light:'LIGHT'};
  const render=()=>{b.textContent=`THEME · ${labels[document.documentElement.dataset.theme]||'SYSTEM'}`};
  b.addEventListener('click',()=>{const i=modes.indexOf(document.documentElement.dataset.theme);const next=modes[(i+1)%modes.length];document.documentElement.dataset.theme=next;localStorage.setItem(key,next);render();});
  document.addEventListener('DOMContentLoaded',()=>{document.body.appendChild(b);render()});
})();
