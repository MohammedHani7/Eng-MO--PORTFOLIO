(()=>{
const D=window.SITE,$=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const root=document.documentElement,rm=matchMedia('(prefers-reduced-motion:reduce)').matches,fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const pg=document.body.dataset.page,pad=n=>String(n).padStart(2,'0'),L=D.projects.length;
const btn=(h,t,c='',x='')=>`<a class="btn mag ${c}" href="${h}" ${x}><span>${t}</span><span aria-hidden="true">→</span></a>`;
const row=o=>`<a class="row ${o.k||''}" data-r data-c="${o.c}" href="${o.h}" ${o.x||''}><h3>${o.t}</h3><span class="m">${o.m}</span>${o.d?`<p>${o.d}</p>`:''}<span class="ar" aria-hidden="true">↗</span></a>`;
const ext='target="_blank" rel="noopener"';

/* shell: header + footer */
document.body.insertAdjacentHTML('afterbegin',`<a class="skip" href="#main">Skip to content</a><div class="bg" aria-hidden="true"></div><header class="hd" id="hd"><a class="logo" href="index.html" aria-label="Mohammed Hany, home">MH<span>Mohammed Hany</span></a><nav id="nav" aria-label="Primary">${D.nav.map(n=>`<a href="${n.h}"${n.k===pg?' aria-current="page"':''}>${n.t}</a>`).join('')}</nav><button class="tg mag" id="theme" type="button" aria-label="Switch between light and dark theme"><i></i></button><button class="mb" id="menu" type="button" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><b></b><b></b></button></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer class="ft"><div class="ft-w" aria-hidden="true">Mohammed Hany</div><div class="ft-g"><div><p class="lbl">Mohammed Hany</p><p>Computer Science student<br>Artificial Intelligence specialization<br>King Salman International University</p><p class="st"><i></i>Seeking opportunities in AI and software engineering</p></div><nav aria-label="Footer"><p class="lbl">Pages</p>${D.nav.map(n=>`<a href="${n.h}">${n.t}</a>`).join('')}</nav><nav aria-label="Social"><p class="lbl">Elsewhere</p><a href="${D.gh}" ${ext}>GitHub ↗</a><a href="${D.li}" ${ext}>LinkedIn ↗</a><a href="${D.wa}" ${ext}>WhatsApp ↗</a></nav><div><p class="lbl">Contact</p><a href="mailto:${D.email}">${D.email}</a><a href="${D.tel}">${D.phone}</a></div></div><div class="ft-b"><span>© ${new Date().getFullYear()} Mohammed Hany</span><button class="mag" id="top" type="button">Back to top ↑</button></div></footer>`);

/* theme */
$('#theme').onclick=()=>{const t=root.dataset.theme==='dark'?'light':'dark';root.classList.add('tt');root.dataset.theme=t;try{localStorage.setItem('theme',t)}catch(e){}setTimeout(()=>root.classList.remove('tt'),650)};
/* mobile menu */
const hd=$('#hd'),mb=$('#menu'),setMenu=o=>{hd.classList.toggle('open',o);mb.setAttribute('aria-expanded',o);mb.setAttribute('aria-label',o?'Close menu':'Open menu');document.body.style.overflow=o?'hidden':''};
mb.onclick=()=>setMenu(!hd.classList.contains('open'));addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
$('#top').onclick=()=>scrollTo({top:0,behavior:rm?'auto':'smooth'});

/* content renderers */
const skHTML=()=>D.skills.map((g,i)=>`<div class="sk" data-r style="--d:${i}"><p class="lbl">${g.g}</p><ul>${g.i.map(x=>`<li>${x}</li>`).join('')}</ul></div>`).join('');
const projRow=(p,i)=>row({t:p.title,m:p.cat,d:p.sum,h:`project-${p.id}.html`,c:'Open'});
let io;const reveal=(s=document)=>{if(io)$$('[data-r]:not(.in),.sp:not(.in)',s).forEach(n=>io.observe(n))};
let el;
if(el=$('#featured'))el.innerHTML=D.projects.filter(p=>p.featured).map(projRow).join('');
if(el=$('#skprev'))el.innerHTML=skHTML();
if(el=$('#skills'))el.innerHTML=skHTML();
if(el=$('#training'))el.innerHTML=D.training.map((t,i)=>`<div class="tr glass" data-r style="--d:${i}"><p class="lbl">${t.s}</p><h3>${t.t}</h3><p>${t.d}</p></div>`).join('');
if(el=$('#certs'))el.innerHTML=D.certs.map(c=>row({k:'s',t:c.t,m:c.i,d:'Opens the verification page on Coursera.',h:c.u,c:'Verify',x:ext})).join('');
if(el=$('#cl'))el.innerHTML=[['Email',D.email,'mailto:'+D.email],['WhatsApp','Chat on WhatsApp',D.wa],['LinkedIn','Mohammed Hany',D.li],['GitHub','MohammedHani7',D.gh],['Phone',D.phone,D.tel]].map(([m,t,h])=>row({k:'s',t,m,h,c:m==='Email'||m==='Phone'?'Open':'Visit',x:/^https/.test(h)?ext:''})).join('');
if(el=$('#mq')){const l=D.skills.flatMap(g=>g.i);el.innerHTML='<div>'+[...l,...l,...l,...l].map(x=>`<span>${x}</span>`).join('')+'</div>'}
/* projects: filtering */
const pl=$('#plist');
if(pl){const cats=['All',...new Set(D.projects.map(p=>p.cat))],f=$('#flt');let cur='All';
 const draw=()=>{pl.innerHTML=D.projects.map((p,i)=>[p,i]).filter(([p])=>cur==='All'||p.cat===cur).map(([p,i])=>projRow(p,i)).join('');reveal(pl)};
 f.innerHTML=cats.map(c=>`<button type="button" aria-pressed="${c===cur}">${c}</button>`).join('');
 f.onclick=e=>{const b=e.target.closest('button');if(!b)return;cur=b.textContent;$$('button',f).forEach(x=>x.setAttribute('aria-pressed',x===b));draw()};draw()}
/* project details */
const pj=$('#project');
if(pj){const id=document.body.dataset.project,i=D.projects.findIndex(p=>p.id===id);
 if(i<0){document.title='Project not found | Mohammed Hany';pj.innerHTML=`<div class="pd-h"><h1 class="big sm"><span data-split>Project not found</span></h1><p class="lead" style="margin:1.5rem 0">That project doesn’t exist. Browse the full list instead.</p>${btn('projects.html','All projects','p')}</div>`}
 else{const p=D.projects[i],pr=D.projects[(i+L-1)%L],nx=D.projects[(i+1)%L],ul=a=>a&&a.length?`<ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul>`:'',
  S=(t,h)=>h?`<section class="ed" data-r><p class="lbl">${t}</p><div>${h}</div></section>`:'',ini=p.title.split(/\s+/).filter(w=>/^[A-Za-z]/.test(w)).slice(0,3).map(w=>w[0]).join('').toUpperCase();
  document.title=`${p.title} | Mohammed Hany`;$('meta[name=description]').content=p.sum;$('meta[property="og:title"]').content=document.title;$('meta[property="og:description"]').content=p.sum;
  pj.innerHTML=`<div class="pd-h"><a class="ul" href="projects.html">← All projects</a><p class="lbl">${p.cat}</p><h1 class="big xs"><span data-split>${p.title}</span></h1></div>
<div class="plate glass" data-r>${p.images&&p.images.length?`<img src="${p.images[0].src}" alt="${p.images[0].alt}" loading="lazy">`:`<span class="ph-num" aria-hidden="true">${ini}</span>`}</div>
${S('Overview',`<p>${p.sum}</p>`)}${S('Problem',p.problem&&`<p>${p.problem}</p>`)}${S('Solution',p.solution&&`<p>${p.solution}</p>`)}${S('Objectives',ul(p.objectives))}${S('Main features',ul(p.features))}${S('Technologies',ul(p.tech))}${S('Gallery',p.images&&p.images.length>1?`<div class="gal">${p.images.slice(1).map(m=>`<img src="${m.src}" alt="${m.alt}" loading="lazy">`).join('')}</div>`:'')}
<section class="ed" data-r><p class="lbl">Links</p><div><div class="cta" style="margin-top:0">${p.github?btn(p.github,'Repository','p',ext):''}${p.live?btn(p.live,'Live demo','p',ext):''}${btn(D.gh,'GitHub profile','',ext)}</div></div></section>
<nav class="pn" aria-label="Other projects">${row({k:'s',t:pr.title,m:'Previous project',h:'project-'+pr.id+'.html',c:'Open'})}${row({k:'s',t:nx.title,m:'Next project',h:'project-'+nx.id+'.html',c:'Open'})}</nav>`}}
/* contact form: real mailto, no fake success */
const fm=$('#fm');if(fm)fm.onsubmit=e=>{e.preventDefault();const v=n=>fm.elements[n].value.trim();location.href=`mailto:${D.email}?subject=${encodeURIComponent(v('s'))}&body=${encodeURIComponent(v('m')+'\n\n'+v('n'))}`};

/* split headings into words */
$$('[data-split]').forEach(h=>{let i=0;h.innerHTML=h.textContent.trim().match(/[^\s-]+-?/g).map(w=>`<span class="w"><span style="--i:${i++}">${w}</span></span>${w.endsWith('-')?'':' '}`).join('');h.classList.add('sp')});
/* scroll reveal */

/* parallax var (rAF-throttled) */
const bg=$('.bg');let tk=0;if(!rm)addEventListener('scroll',()=>{if(!tk){tk=1;requestAnimationFrame(()=>{bg.style.setProperty('--sy',scrollY);tk=0})}},{passive:true});

/* custom cursor (fine pointers only) */
if(fine&&!rm){root.classList.add('cur');document.body.insertAdjacentHTML('beforeend','<div class="c-d"></div><div class="c-r"><span></span></div>');
 const d=$('.c-d'),r=$('.c-r'),lb=$('span',r);let x=-99,y=-99,rx=-99,ry=-99,on=0;
 const tick=()=>{rx+=(x-rx)*.17;ry+=(y-ry)*.17;r.style.transform=`translate3d(${rx}px,${ry}px,0)`;Math.abs(x-rx)+Math.abs(y-ry)>.3?requestAnimationFrame(tick):on=0};
 addEventListener('pointermove',e=>{x=e.clientX;y=e.clientY;d.style.transform=`translate3d(${x}px,${y}px,0)`;if(!on){on=1;requestAnimationFrame(tick)}bg.style.setProperty('--mx',(x/innerWidth-.5).toFixed(3));root.classList.add('cv')},{passive:true});
 document.addEventListener('pointerover',e=>{const t=e.target.closest('a,button,input,textarea,[data-c]'),c=t&&t.dataset.c||'';lb.textContent=c;r.className='c-r'+(t?(t.matches('input,textarea')?' tx':c?' l':' h'):'')});
 root.addEventListener('mouseleave',()=>root.classList.remove('cv'));
 addEventListener('pointerdown',()=>r.classList.add('dn'));addEventListener('pointerup',()=>r.classList.remove('dn'));
 /* magnetic elements */
 $$('.mag').forEach(m=>{m.addEventListener('pointermove',e=>{const b=m.getBoundingClientRect();m.style.transform=`translate(${(e.clientX-b.left-b.width/2)*.22}px,${(e.clientY-b.top-b.height/2)*.22}px)`});m.addEventListener('pointerleave',()=>m.style.transform='')})}

/* cinematic page transition: layered curtain, normal navigation/history preserved */
addEventListener('click',e=>{const a=e.target.closest('a');if(!a||e.defaultPrevented||e.button||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.target||a.hasAttribute('download'))return;
 const u=new URL(a.href,location);if(!['http:','https:','file:'].includes(u.protocol)||u.origin!==location.origin||(u.pathname===location.pathname&&u.search===location.search))return;
 e.preventDefault();setMenu(false);root.classList.add('leave');setTimeout(()=>location.href=a.href,rm?0:760)});
addEventListener('pageshow',e=>{if(e.persisted)root.classList.remove('leave')});

/* preloader: leaves as soon as the page has really loaded (short minimum so the name animation can play) */
const pre=$('#pre'),go=()=>{const start=()=>{io=new IntersectionObserver(es=>es.forEach(n=>{if(n.isIntersecting){n.target.classList.add('in');io.unobserve(n.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});reveal()};
 if(root.classList.contains('pre-on')){setTimeout(()=>{pre.classList.add('done');start();setTimeout(()=>{root.classList.remove('pre-on');try{sessionStorage.setItem('seen','1')}catch(e){}},900)},rm?0:Math.max(0,750-performance.now()))}else start()};
document.readyState==='complete'?go():addEventListener('load',go);
})();
