import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Menu, X, MoveUpRight, Asterisk, Plus, Play, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Scene3D from './components/Scene3D.jsx';

gsap.registerPlugin(ScrollTrigger);
const projects = [
  { id:'01', name:'AETHER / PROTOCOL', type:'Digital universe · WebGL', year:'2026', cls:'project--aether', tag:'REAL-TIME WORLD', desc:'A new dimension for a new kind of intelligence.' },
  { id:'02', name:'FORMA / FUTURE MATTER', type:'Interactive product story', year:'2025', cls:'project--forma', tag:'GENERATIVE DESIGN', desc:'Where material, motion and meaning converge.' },
  { id:'03', name:'NOCTURNE / 00:01', type:'Immersive brand experience', year:'2025', cls:'project--nocturne', tag:'DIGITAL CINEMA', desc:'An invitation to step beyond the visible.' },
];
function ProjectVisual({ project }) {
  return <div className={`project-visual ${project.cls}`}>
    {project.id==='01' && <><div className="aether-grid"/><div className="aether-orb"><span/><i/><b/></div><div className="visual-coordinate">48°51'24.0"N<br/>02°21'08.0"E</div></>}
    {project.id==='02' && <><div className="forma-disc forma-disc--one"/><div className="forma-disc forma-disc--two"/><div className="forma-disc forma-disc--three"/><div className="forma-cross"/></>}
    {project.id==='03' && <><div className="nocturne-halo"/><div className="nocturne-object"/><div className="nocturne-scan"/></>}
    <span className="visual-index">N° {project.id}</span><span className="visual-type">{project.tag}</span>
  </div>
}
function App(){
 const [menuOpen,setMenuOpen]=useState(false); const [soundOn,setSoundOn]=useState(false); const [active,setActive]=useState(''); const heroRef=useRef(null);
 useEffect(()=>{
   const ctx=gsap.context(()=>{
     gsap.from('.hero-copy > *',{y:36,opacity:0,duration:1,stagger:.11,ease:'power3.out',delay:.2});
     gsap.from('.hero-meta',{opacity:0,y:12,duration:.8,delay:.8});
     gsap.utils.toArray('[data-reveal]').forEach((el)=>gsap.fromTo(el,{y:48,opacity:0},{y:0,opacity:1,duration:1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
     gsap.utils.toArray('.project-card').forEach((el,i)=>gsap.fromTo(el,{y:42,opacity:0},{y:0,opacity:1,duration:.9,delay:i*.1,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
     gsap.to('.hero-orbit-label',{rotate:360,duration:32,repeat:-1,ease:'none'});
   },heroRef); return ()=>ctx.revert();
 },[]);
 const closeMenu=()=>setMenuOpen(false);
 return <main ref={heroRef}>
   <div className="grain" aria-hidden="true"/><div className="cursor-glow" aria-hidden="true"/>
   <header className="nav shell">
    <a href="#home" className="brand" aria-label="Nexus início"><span className="brand-mark"><i/><i/><i/></span><span>NEXUS<span className="brand-reg">®</span></span></a>
    <nav className={menuOpen?'nav-links nav-links--open':'nav-links'} aria-label="Navegação principal">
      <a href="#work" onClick={closeMenu}>Selected work <span>03</span></a><a href="#approach" onClick={closeMenu}>Approach</a><a href="#studio" onClick={closeMenu}>Studio</a><a href="#contact" onClick={closeMenu} className="nav-contact">Start a project <ArrowUpRight size={14}/></a>
    </nav>
    <button className="menu-toggle" onClick={()=>setMenuOpen(!menuOpen)} aria-label={menuOpen?'Fechar menu':'Abrir menu'}>{menuOpen?<X/>:<Menu/>}</button>
   </header>
   <section className="hero shell" id="home">
    <div className="hero-topline"><span><i className="status-dot"/> INDEPENDENT DIGITAL STUDIO</span><span>AVAILABLE WORLDWIDE <span className="topline-sep">/</span> 2026</span></div>
    <div className="hero-layout">
      <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-line"/> DESIGNING WHAT COMES NEXT</p><h1>Reality is<br/>just the <span className="word-outline">starting</span><br/><span className="last-line">point<span className="accent-dot">.</span></span></h1><p className="hero-description">We build digital experiences at the intersection of <em>imagination, technology</em> and human emotion.</p><div className="hero-actions"><a className="button button--light" href="#work">Explore our universe <ArrowDownRight size={17}/></a><a href="#approach" className="text-link">Discover the studio <ArrowRight size={15}/></a></div></div>
      <div className="hero-art"><div className="art-topline"><span>FIG. 001 — SYNTHETIC MATTER</span><span>INTERACTIVE / REAL-TIME</span></div><Scene3D/><div className="hero-orbit-label"><svg viewBox="0 0 120 120" aria-hidden="true"><defs><path id="circlePath" d="M60,60 m-43,0 a43,43 0 1,1 86,0 a43,43 0 1,1 -86,0"/></defs><text><textPath href="#circlePath">NEXUS DIGITAL REALITIES · NEXUS DIGITAL REALITIES · </textPath></text></svg><span>✳</span></div><div className="art-caption"><span>OBJECT 01</span><span>FORM / ENERGY / MATTER</span></div><div className="art-crosshair art-crosshair--one">+</div><div className="art-crosshair art-crosshair--two">+</div></div>
    </div>
    <div className="hero-meta"><span>SCROLL TO EXPLORE <ArrowDownRight size={13}/></span><span className="meta-center">NOT HERE TO MAKE MORE OF THE SAME.</span><span>01 — 04</span></div>
   </section>
   <section className="manifesto section-pad" id="approach"><div className="shell manifesto-grid"><div className="section-label" data-reveal><span className="label-number">01 /</span><span>THE NEXUS APPROACH</span></div><div className="manifesto-content" data-reveal><p className="manifesto-kicker">WE DON'T DESIGN PAGES.<br/>WE DESIGN <span>FEELINGS.</span></p><h2>Digital should be more than something you <span>look at.</span> It should be somewhere you <span>go.</span></h2><div className="manifesto-bottom"><p>We combine creative direction, immersive technology and purposeful interaction to turn ambitious ideas into experiences people remember.</p><a className="circle-link" href="#studio" aria-label="Conheça nossa abordagem"><ArrowDownRight/></a></div></div></div><div className="manifesto-decoration" aria-hidden="true"><span>N</span><span>↗</span></div></section>
   <section className="work section-pad" id="work"><div className="shell"><div className="section-heading" data-reveal><div><div className="section-label"><span className="label-number">02 /</span><span>SELECTED WORLDS</span></div><h2>Made to be<br/><span>experienced.</span></h2></div><p>A selection of imagined worlds, digital products and interactive stories. Each one built around a singular idea.</p></div><div className="project-list">{projects.map(p=><article className="project-card" key={p.id}><a className="project-link" href="#contact" onMouseEnter={()=>setActive(p.id)} onMouseLeave={()=>setActive('')}><ProjectVisual project={p}/><div className="project-info"><div className="project-title-wrap"><span className="project-number">{p.id} /</span><div><h3>{p.name}</h3><p>{p.type}</p></div></div><div className="project-desc"><span>{p.desc}</span><span className="project-year">{p.year}</span></div><span className={`project-arrow ${active===p.id?'project-arrow--active':''}`}><ArrowUpRight/></span></div></a></article>)}</div><div className="work-footer"><span>THREE WORLDS. INFINITE POSSIBILITIES.</span><a href="#contact" className="text-link">Have a vision? Let’s talk <ArrowRight size={15}/></a></div></div></section>
   <section className="capabilities section-pad" id="studio"><div className="shell capabilities-grid"><div className="cap-intro" data-reveal><div className="section-label"><span className="label-number">03 /</span><span>WHAT WE DO</span></div><h2>We make the<br/><span>unreal, real.</span></h2><p>From the first spark to the final pixel, we connect strategy, design and engineering into one cohesive experience.</p><a className="text-link" href="#contact">Explore our process <ArrowRight size={15}/></a></div><div className="cap-list" data-reveal>{[{n:'01',title:'Creative direction',copy:'Concept, strategy & digital identity'},{n:'02',title:'Immersive experiences',copy:'WebGL, 3D worlds & interactive storytelling'},{n:'03',title:'Digital products',copy:'Interfaces, systems & human-centered UX'},{n:'04',title:'Motion & development',copy:'Creative coding, animation & engineering'}].map(item=><div className="cap-row" key={item.n}><span>{item.n}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><Plus size={17}/></div>)}</div></div></section>
   <section className="statement"><div className="shell statement-inner" data-reveal><Sparkles size={18}/><p>THE FUTURE ISN'T A PLACE WE'RE GOING.<br/><span>IT'S AN EXPERIENCE WE'RE CREATING.</span></p><span className="statement-index">N / 04</span></div></section>
   <footer className="footer section-pad" id="contact"><div className="shell"><div className="footer-top"><div className="section-label"><span className="label-number">04 /</span><span>YOUR MOVE</span></div><p>Have a big idea? <span>Good.</span></p><a className="footer-cta" href="mailto:hello@nexus.studio?subject=Let's%20build%20something%20remarkable">Let's make<br/>it <em>real.</em><span><ArrowUpRight/></span></a></div><div className="footer-bottom"><a href="#home" className="brand"><span className="brand-mark"><i/><i/><i/></span><span>NEXUS<span className="brand-reg">®</span></span></a><span>INDEPENDENT BY DESIGN. LIMITLESS BY NATURE.</span><div className="footer-links"><a href="#work">WORK</a><a href="#studio">STUDIO</a><a href="mailto:hello@nexus.studio">EMAIL <MoveUpRight size={12}/></a></div><span>© NEXUS 2026</span></div></div></footer>
 </main>
}
export default App;
