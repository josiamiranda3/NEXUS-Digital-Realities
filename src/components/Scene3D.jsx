import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';

export default function Scene3D({ compact = false }) {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090b, 0.055);
    const camera = new THREE.PerspectiveCamera(36, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0, compact ? 8.5 : 8.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0x9ab7ce, 1.5));
    const key = new THREE.PointLight(0x79e7ff, 70, 20); key.position.set(3, 2, 4); scene.add(key);
    const rim = new THREE.PointLight(0xb49aff, 90, 18); rim.position.set(-4, -1, -2); scene.add(rim);
    const warm = new THREE.PointLight(0xffb67b, 22, 14); warm.position.set(0, -3, 3); scene.add(warm);

    const core = new THREE.Group(); scene.add(core);
    const shellGeo = new THREE.IcosahedronGeometry(1.48, 5);
    const shellMat = new THREE.MeshPhysicalMaterial({ color: 0x8ca6bb, metalness: 0.92, roughness: 0.19, transmission: 0.16, thickness: 1.2, clearcoat: 1, clearcoatRoughness: 0.08, iridescence: 0.85, iridescenceIOR: 1.45 });
    const shell = new THREE.Mesh(shellGeo, shellMat); core.add(shell);
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(0.84, 4), new THREE.MeshPhysicalMaterial({ color: 0x161f2d, metalness: 0.75, roughness: 0.12, emissive: 0x15283b, emissiveIntensity: 0.6, clearcoat: 1 }));
    core.add(inner);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0xa4eaff, metalness: 0.92, roughness: 0.18, emissive: 0x17485b, emissiveIntensity: 0.65 });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.03, 0.018, 12, 220), ringMat); ring1.rotation.set(1.0, 0.2, -0.38); core.add(ring1);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.28, 0.008, 8, 220), new THREE.MeshStandardMaterial({ color: 0xc4b4ff, metalness: 0.8, roughness: 0.25, emissive: 0x403077, emissiveIntensity: 0.55 })); ring2.rotation.set(0.3, 1.0, 0.6); core.add(ring2);
    const orbit = new THREE.Group(); core.add(orbit);
    for (let i=0;i<9;i++) {
      const a = (i/9)*Math.PI*2;
      const bead = new THREE.Mesh(new THREE.SphereGeometry(i%3===0?0.045:0.022, 16, 16), new THREE.MeshBasicMaterial({ color: i%2 ? 0x9b8cff : 0x8deaff }));
      bead.position.set(Math.cos(a)*2.02, Math.sin(a)*0.7, Math.sin(a)*1.25); orbit.add(bead);
    }
    const count = compact ? 500 : 1000;
    const positions = new Float32Array(count*3);
    for(let i=0;i<count;i++){ positions[i*3]=(Math.random()-.5)*15; positions[i*3+1]=(Math.random()-.5)*10; positions[i*3+2]=(Math.random()-.5)*10-2; }
    const starGeo = new THREE.BufferGeometry(); starGeo.setAttribute('position',new THREE.BufferAttribute(positions,3));
    const stars = new THREE.Points(starGeo,new THREE.PointsMaterial({ color:0x9fb9d4, size:0.012, transparent:true, opacity:0.75, sizeAttenuation:true })); scene.add(stars);
    const mouse = { x:0, y:0, tx:0, ty:0 };
    const onMove = (e) => { const r=mount.getBoundingClientRect(); mouse.tx=((e.clientX-r.left)/r.width-.5)*2; mouse.ty=((e.clientY-r.top)/r.height-.5)*2; };
    mount.addEventListener('pointermove',onMove);
    let frame; const clock = new THREE.Clock();
    const animate = () => {
      const t=clock.getElapsedTime(); mouse.x += (mouse.tx-mouse.x)*0.035; mouse.y += (mouse.ty-mouse.y)*0.035;
      core.rotation.y = t*0.11 + mouse.x*0.18; core.rotation.x = Math.sin(t*0.19)*0.12 + mouse.y*0.12;
      shell.rotation.y = -t*0.07; shell.rotation.z = Math.sin(t*.2)*.12;
      ring1.rotation.z = -0.38 + t*0.035; ring2.rotation.x = .3 + Math.sin(t*.15)*.13; orbit.rotation.y=t*.18;
      stars.rotation.y = t*.006 + mouse.x*.012; stars.rotation.x=mouse.y*.01;
      camera.position.x += (mouse.x*.16-camera.position.x)*.018; camera.position.y += (-mouse.y*.12-camera.position.y)*.018;
      camera.lookAt(0,0,0); renderer.render(scene,camera); frame=requestAnimationFrame(animate);
    }; animate();
    const resize = () => { if(!mount.clientWidth||!mount.clientHeight)return; camera.aspect=mount.clientWidth/mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth,mount.clientHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.8)); };
    const observer = new ResizeObserver(resize); observer.observe(mount);
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduced) gsap.fromTo(core.scale,{x:.78,y:.78,z:.78},{x:1,y:1,z:1,duration:1.8,ease:'power3.out'});
    return () => { cancelAnimationFrame(frame); observer.disconnect(); mount.removeEventListener('pointermove',onMove); renderer.dispose(); shellGeo.dispose(); shellMat.dispose(); ringMat.dispose(); mount.removeChild(renderer.domElement); };
  }, [compact]);
  return <div className={`scene3d ${compact?'scene3d--compact':''}`} ref={mountRef} aria-label="Objeto tridimensional abstrato interativo" role="img" />;
}
