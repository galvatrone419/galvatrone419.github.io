
/* Init lucide icons */
if (window.lucide) { window.lucide.createIcons(); }

/* Intersection Observer for reveal animations */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
},{rootMargin: '0px 0px -10% 0px', threshold:.1});

document.querySelectorAll('.reveal-up, .reveal-pop').forEach(el=>io.observe(el));

/* Dynamic Marquee: duplicate content to loop smoothly */
document.querySelectorAll('.marquee').forEach(mq=>{
  const text = mq.getAttribute('data-dup') || '';
  const items = text.split('•').map(s=>s.trim()).filter(Boolean);
  const make = (t)=>{ const span = document.createElement('span'); span.textContent = t; return span; };
  for(let k=0;k<2;k++){ items.forEach(t=>mq.appendChild(make(t))); }
  let offset = 0;
  function tick(){
    offset -= 0.5; // speed
    mq.scrollLeft = -offset;
    if (-offset > mq.scrollWidth/2) { offset = 0; }
    requestAnimationFrame(tick);
  }
  tick();
});

/* Year in footer */
document.getElementById('year').textContent = new Date().getFullYear();
