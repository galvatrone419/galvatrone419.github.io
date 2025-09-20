
/* Init lucide icons */
if (window.lucide) { window.lucide.createIcons(); }

/* Intersection Observer for reveal animations */
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); }
  });
},{rootMargin: '0px 0px -10% 0px', threshold:.1});

document.querySelectorAll('.reveal-up, .reveal-pop').forEach(el=>io.observe(el));

/* New marquee builder: prevents horizontal overslide */
function buildMarquee(el){
  const items = (el.getAttribute('data-items')||'').split(',').map(s=>s.trim()).filter(Boolean);
  const track = document.createElement('div');
  track.className = 'marquee-track';
  const makeChip = t => { const s=document.createElement('span'); s.className='chip'; s.textContent=t; return s; };
  // duplicate sequence twice for seamless loop
  for(let r=0;r<2;r++){ items.forEach(t=>track.appendChild(makeChip(t))) }
  el.appendChild(track);
  // dynamic duration based on width (px / speed)
  const speedPxPerSec = 80; // slower = smaller
  requestAnimationFrame(()=>{
    const w = track.scrollWidth;
    const dur = (w/2) / speedPxPerSec; // only half width travels
    track.style.animationDuration = `${Math.max(14, Math.min(40, dur))}s`;
  });
}
document.querySelectorAll('.marquee').forEach(buildMarquee);

/* Year in footer */
document.getElementById('year').textContent = new Date().getFullYear();

/* Scroll progress bar & navbar shadow */
const progress = document.getElementById('progress');
const navbar = document.getElementById('navbar');
function onScroll(){
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
  progress.style.transform = `scaleX(${scrolled})`;
  navbar.classList.toggle('scrolled', h.scrollTop > 10);
  document.getElementById('toTop').classList.toggle('show', h.scrollTop > 400);
}
document.addEventListener('scroll', onScroll, {passive:true});
onScroll();

/* Back to top */
document.getElementById('toTop').addEventListener('click', ()=>window.scrollTo({top:0, behavior:'smooth'}));

/* Tilt-on-hover effect for .tilt elements */
document.querySelectorAll('.tilt').forEach(card=>{
  const strength = 8;
  card.addEventListener('mousemove', (e)=>{
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * strength;
    const ry = (px - 0.5) * strength;
    card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
  });
  card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
});

/* Parallax blobs */
const blobs = document.querySelectorAll('.bg-blob');
window.addEventListener('mousemove', (e)=>{
  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;
  blobs.forEach((b,i)=>{
    const child = b.firstElementChild || b;
    child.style.transform = `translate(${x*(i?1:-1)}px, ${y*(i?1:-1)}px)`;
  });
});
