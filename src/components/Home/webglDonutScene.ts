import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TEXTURE_BASE =
  'https://raw.githubusercontent.com/danielyl123/person/refs/heads/main';

const FRAG_SCALE = 50;
const TORUS_R = 2;
const TORUS_r = 0.4;

function hash2(px: number, py: number): [number, number] {
  const a = Math.sin(px * 127.1 + py * 311.7) * 43758.5453;
  const b = Math.sin(px * 269.5 + py * 183.3) * 43758.5453;
  return [a - Math.floor(a), b - Math.floor(b)];
}

function cellSeed(u: number, v: number): [number, number] {
  const n: [number, number] = [Math.floor(u * FRAG_SCALE), Math.floor(v * FRAG_SCALE)];
  const f: [number, number] = [u * FRAG_SCALE - n[0], v * FRAG_SCALE - n[1]];
  let md = Infinity;
  let best: [number, number] = [...n];

  for (let j = -2; j <= 2; j++) {
    for (let i = -2; i <= 2; i++) {
      const o = hash2(n[0] + i, n[1] + j);
      const r0 = i + o[0] - f[0];
      const r1 = j + o[1] - f[1];
      const d = r0 * r0 + r1 * r1;
      if (d < md) {
        md = d;
        best = [n[0] + i + o[0], n[1] + j + o[1]];
      }
    }
  }

  return [best[0] / FRAG_SCALE, best[1] / FRAG_SCALE];
}

function addBarycentricCoords(geo: THREE.BufferGeometry) {
  const g = geo.toNonIndexed();
  const count = g.attributes.position.count;
  const bary = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 3) {
    bary[i * 3] = 1;
    bary[i * 3 + 1] = 0;
    bary[i * 3 + 2] = 0;
    bary[(i + 1) * 3] = 0;
    bary[(i + 1) * 3 + 1] = 1;
    bary[(i + 1) * 3 + 2] = 0;
    bary[(i + 2) * 3] = 0;
    bary[(i + 2) * 3 + 1] = 0;
    bary[(i + 2) * 3 + 2] = 1;
  }

  g.setAttribute('barycentric', new THREE.BufferAttribute(bary, 3));
  return g;
}

function smoothstep(min: number, max: number, v: number) {
  const t = Math.max(0, Math.min(1, (v - min) / (max - min)));
  return t * t * (3 - 2 * t);
}

export interface DonutSceneHandle {
  dispose: () => void;
  setPaused: (paused: boolean) => void;
  onMouseMove: (clientX: number, clientY: number, width: number, height: number) => void;
}

export interface DonutSceneOptions {
  scrollHost?: HTMLElement;
}

export function initWebGLDonutScene(
  canvas: HTMLCanvasElement,
  options: DonutSceneOptions = {}
): DonutSceneHandle {
  const scene = new THREE.Scene();

  const scrollGroup = new THREE.Group();
  scene.add(scrollGroup);

  const torusGroup = new THREE.Group();
  scrollGroup.add(torusGroup);

  const getSize = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  let { width, height } = getSize();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(width, height),
    0.7,
    0.4,
    0.65
  );
  composer.addPass(bloomPass);

  const fxaaPass = new ShaderPass(FXAAShader);
  fxaaPass.uniforms.resolution.value.set(1 / width, 1 / height);
  composer.addPass(fxaaPass);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.enabled = false;

  scene.add(new THREE.AmbientLight(0xffffff, 0.35));
  const dirLight = new THREE.DirectionalLight(0xfff4e0, 2.8);
  dirLight.position.set(3, 4, 5);
  scene.add(dirLight);
  const fillLight = new THREE.DirectionalLight(0xaabbff, 0.5);
  fillLight.position.set(-4, -2, -3);
  scene.add(fillLight);

  const textureLoader = new THREE.TextureLoader();
  const diffuse = textureLoader.load(`${TEXTURE_BASE}/diffuse.jpg`);
  const normalTex = textureLoader.load(`${TEXTURE_BASE}/normal.jpg`);
  const arm = textureLoader.load(`${TEXTURE_BASE}/arm.jpg`);

  [diffuse, normalTex, arm].forEach((tex) => {
    tex.repeat.set(2, 2);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  });
  diffuse.colorSpace = THREE.SRGBColorSpace;

  const wireMaterial = new THREE.ShaderMaterial({
    vertexShader: `
      attribute vec3 barycentric;
      varying vec3 vBary;
      void main() {
        vBary = barycentric;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vBary;
      float wireMask(vec3 b, float t) {
        vec3 d = fwidth(b);
        vec3 a = smoothstep(vec3(0.0), d * t, b);
        return 1.0 - min(a.x, min(a.y, a.z));
      }
      void main() {
        float wf = wireMask(vBary, 1.6);
        vec3 col = mix(vec3(0.04, 0.01, 0.07), vec3(0.66, 0.38, 0.78), wf);
        col = mix(col, vec3(0.85, 0.55, 1.0) * 2.0, wf * 0.55);
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.DoubleSide,
    extensions: { derivatives: true },
  });

  const wireMesh = new THREE.Mesh(
    addBarycentricCoords(new THREE.TorusGeometry(2, 0.4, 80, 80)),
    wireMaterial
  );
  torusGroup.add(wireMesh);

  const fragments: THREE.Mesh[] = [];
  const disposableGeometries: THREE.BufferGeometry[] = [wireMesh.geometry];

  const baseGeo = new THREE.TorusGeometry(TORUS_R, TORUS_r, 100, 100);
  const nonIndexed = baseGeo.toNonIndexed();
  baseGeo.dispose();

  const pos = nonIndexed.attributes.position.array as Float32Array;
  const nrm = nonIndexed.attributes.normal.array as Float32Array;
  const uvData = nonIndexed.attributes.uv.array as Float32Array;
  const tris = pos.length / 9;

  const cellMap = new Map<string, { s: [number, number]; t: number[] }>();
  for (let t = 0; t < tris; t++) {
    const uc = (uvData[t * 6] + uvData[t * 6 + 2] + uvData[t * 6 + 4]) / 3;
    const vc = (uvData[t * 6 + 1] + uvData[t * 6 + 3] + uvData[t * 6 + 5]) / 3;
    const s = cellSeed(uc, vc);
    const k = `${s[0].toFixed(9)}_${s[1].toFixed(9)}`;
    if (!cellMap.has(k)) cellMap.set(k, { s, t: [] });
    cellMap.get(k)!.t.push(t);
  }

  const mat = new THREE.MeshStandardMaterial({
    map: diffuse,
    normalMap: normalTex,
    roughnessMap: arm,
    roughness: 1.0,
    metalness: 0.0,
    side: THREE.DoubleSide,
  });

  const TWO_PI = Math.PI * 2;

  for (const { s: seed, t: triList } of cellMap.values()) {
    if (!triList.length) continue;

    const vc = triList.length * 3;
    const pArr = new Float32Array(vc * 3);
    const nArr = new Float32Array(vc * 3);
    const uvArr = new Float32Array(vc * 2);
    let vi = 0;

    for (const tri of triList) {
      for (let v = 0; v < 3; v++) {
        const sv = tri * 3 + v;
        pArr[vi * 3] = pos[sv * 3];
        pArr[vi * 3 + 1] = pos[sv * 3 + 1];
        pArr[vi * 3 + 2] = pos[sv * 3 + 2];
        nArr[vi * 3] = nrm[sv * 3];
        nArr[vi * 3 + 1] = nrm[sv * 3 + 1];
        nArr[vi * 3 + 2] = nrm[sv * 3 + 2];
        uvArr[vi * 2] = uvData[sv * 2];
        uvArr[vi * 2 + 1] = uvData[sv * 2 + 1];
        vi++;
      }
    }

    const phi = seed[0] * TWO_PI;
    const theta = seed[1] * TWO_PI;
    const cx = (TORUS_R + TORUS_r * Math.cos(theta)) * Math.cos(phi);
    const cy = (TORUS_R + TORUS_r * Math.cos(theta)) * Math.sin(phi);
    const cz = TORUS_r * Math.sin(theta);
    const cellCenter = new THREE.Vector3(cx, cy, cz);
    const majorPt = new THREE.Vector3(TORUS_R * Math.cos(phi), TORUS_R * Math.sin(phi), 0);
    const cellNormal = cellCenter.clone().sub(majorPt).normalize();

    const SHRINK = 0.96;
    for (let i = 0; i < pArr.length; i += 3) {
      pArr[i] = (pArr[i] - cx) * SHRINK;
      pArr[i + 1] = (pArr[i + 1] - cy) * SHRINK;
      pArr[i + 2] = (pArr[i + 2] - cz) * SHRINK;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pArr, 3));
    geo.setAttribute('normal', new THREE.BufferAttribute(nArr, 3));
    geo.setAttribute('uv', new THREE.BufferAttribute(uvArr, 2));
    disposableGeometries.push(geo);

    const rnd = hash2(seed[0] * 137.53, seed[1] * 137.53);
    const up =
      Math.abs(cellNormal.z) < 0.9
        ? new THREE.Vector3(0, 0, 1)
        : new THREE.Vector3(0, 1, 0);
    const tang = new THREE.Vector3().crossVectors(cellNormal, up).normalize();
    const bitang = new THREE.Vector3().crossVectors(cellNormal, tang);
    const aa = rnd[0] * TWO_PI;
    const rotAxis = tang
      .clone()
      .multiplyScalar(Math.cos(aa))
      .addScaledVector(bitang, Math.sin(aa))
      .normalize();

    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(cellCenter).addScaledVector(cellNormal, 0.015);
    mesh.userData = {
      cellCenter,
      cellNormal,
      rotAxis,
      maxAngle: 0.7 + rnd[1] * 0.9,
      lift: 0,
    };
    torusGroup.add(mesh);
    fragments.push(mesh);
  }

  nonIndexed.dispose();

  const rcMesh = new THREE.Mesh(
    new THREE.TorusGeometry(TORUS_R, TORUS_r, 80, 80),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  torusGroup.add(rcMesh);
  disposableGeometries.push(rcMesh.geometry);

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2(-999, -999);

  const fragParams = {
    hoverRadius: 0.75,
    liftDist: 0.28,
    liftSpeedUp: 0.15,
    liftSpeedDown: 0.06,
  };

  const hover = { point: new THREE.Vector3(), active: 0 };
  const localHover = new THREE.Vector3();

  gsap.set(scrollGroup.position, { x: 0, y: 0, z: 0 });
  gsap.set(scrollGroup.rotation, { x: 0.32, y: 0, z: 0 });
  torusGroup.scale.setScalar(1.28);
  camera.position.z = 6.1;
  gsap.from(scrollGroup.rotation, { y: Math.PI, duration: 2.4, ease: 'power3.out' });
  gsap.from(scrollGroup.position, { y: -2, duration: 2.4, ease: 'power3.out' });

  const idleTween = gsap.to(torusGroup.rotation, {
    y: Math.PI * 2,
    duration: 22,
    ease: 'none',
    repeat: -1,
  });

  let heroScrollTrigger: ScrollTrigger | null = null;

  if (options.scrollHost) {
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: options.scrollHost,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 2.5,
        onUpdate: (self) => {
          if (self.progress > 0.02) idleTween.pause();
          else idleTween.resume();
        },
      },
    });

    scrollTl
      .to(
        scrollGroup.rotation,
        { x: 0.35, y: Math.PI * 0.4, z: 0.12, ease: 'none' },
        0
      )
      .to(scrollGroup.position, { x: -1.2, y: 0.35, z: 0, ease: 'none' }, 0)
      .to(
        scrollGroup.rotation,
        { x: -0.15, y: -Math.PI * 0.35, z: -0.1, ease: 'none' },
        0.5
      )
      .to(scrollGroup.position, { x: 1.2, y: -0.25, z: 0, ease: 'none' }, 0.5);

    heroScrollTrigger = scrollTl.scrollTrigger ?? null;
  }

  const clock = new THREE.Clock();
  let lastTime = 0;
  let rafId = 0;
  let disposed = false;
  let paused = false;

  const tick = () => {
    if (disposed) return;
    rafId = requestAnimationFrame(tick);
    if (paused) return;

    const elapsed = clock.getElapsedTime();
    const delta = elapsed - lastTime;
    lastTime = elapsed;

    controls.update();

    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObject(rcMesh);
    if (hits.length > 0) {
      torusGroup.worldToLocal(localHover.copy(hits[0].point));
      hover.point.copy(localHover);
      hover.active = Math.min(hover.active + delta * 5, 1);
    } else {
      hover.active = Math.max(hover.active - delta * 2.5, 0);
    }

    for (const frag of fragments) {
      const { cellCenter, cellNormal, rotAxis, maxAngle } = frag.userData as {
        cellCenter: THREE.Vector3;
        cellNormal: THREE.Vector3;
        rotAxis: THREE.Vector3;
        maxAngle: number;
        lift: number;
      };

      let target = 0;
      if (hover.active > 0.01) {
        const dist = cellCenter.distanceTo(hover.point);
        target =
          (1 - smoothstep(0.4, fragParams.hoverRadius, dist)) * hover.active;
      }

      const speed =
        target > frag.userData.lift ? fragParams.liftSpeedUp : fragParams.liftSpeedDown;
      frag.userData.lift = THREE.MathUtils.lerp(frag.userData.lift, target, speed);
      const lift = frag.userData.lift as number;
      frag.position.copy(cellCenter).addScaledVector(cellNormal, 0.015 + lift * fragParams.liftDist);
      frag.quaternion.setFromAxisAngle(rotAxis, lift * maxAngle);
    }

    composer.render();
  };

  rafId = requestAnimationFrame(tick);

  const onResize = () => {
    const size = getSize();
    width = size.width;
    height = size.height;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    composer.setSize(width, height);
    fxaaPass.uniforms.resolution.value.set(1 / width, 1 / height);
  };

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(document.documentElement);
  window.addEventListener('resize', onResize);

  return {
    onMouseMove(clientX, clientY, w, h) {
      mouse.x = (clientX / w) * 2 - 1;
      mouse.y = -(clientY / h) * 2 + 1;
    },
    setPaused(value: boolean) {
      paused = value;
      if (value) {
        idleTween.pause();
      } else {
        idleTween.play();
        lastTime = clock.getElapsedTime();
      }
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(rafId);
      idleTween.kill();
      heroScrollTrigger?.kill();
      gsap.killTweensOf(scrollGroup.position);
      gsap.killTweensOf(scrollGroup.rotation);
      gsap.killTweensOf(torusGroup.rotation);
      window.removeEventListener('resize', onResize);
      resizeObserver.disconnect();
      controls.dispose();
      composer.dispose();
      renderer.dispose();
      mat.dispose();
      wireMaterial.dispose();
      diffuse.dispose();
      normalTex.dispose();
      arm.dispose();
      disposableGeometries.forEach((g) => g.dispose());
    },
  };
}
