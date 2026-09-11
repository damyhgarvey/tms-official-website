const menu=document.querySelector('.menu');
const nav=document.querySelector('nav');
const progress=document.createElement('div');progress.className='scroll-progress';document.body.prepend(progress);
menu?.addEventListener('click',()=>{const open=nav.classList.toggle('open');nav.style.display=open?'flex':'none';nav.style.position='absolute';nav.style.top='78px';nav.style.left='0';nav.style.right='0';nav.style.padding='22px 7vw';nav.style.background='#080b10';nav.style.flexDirection='column';});
document.querySelectorAll('a[href^="#"]').forEach(link=>link.addEventListener('click',()=>{if(window.innerWidth<=850){nav.style.display='none';nav.classList.remove('open');}}));
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');}),{threshold:.12});
document.querySelectorAll('.card,.eco-item,.eco-main,.portal-card,.steps div,.contact-box').forEach(el=>reveal.observe(el));
window.addEventListener('scroll',()=>{const h=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${h>0?(scrollY/h)*100:0}%`;},{passive:true});
