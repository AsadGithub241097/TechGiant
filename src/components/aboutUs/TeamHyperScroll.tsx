import React, { useEffect, useRef, useState } from 'react';
import './teamHyperScroll.css';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  accent: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  { id: '01', name: 'Ibrahim', role: 'Co-Founder / CEO', accent: '#AA60C8' },
  { id: '02', name: 'Sameer', role: 'Co-Founder / CMO', accent: '#D69ADE' },
  { id: '03', name: 'Asad', role: 'CTO', accent: '#500073' },
  { id: '04', name: 'Md. Shahraz Sarfaraz', role: 'CIO', accent: '#EABDE6' },
];

const TITLE_TEXT = { line1: 'TECH GIANT', line2: 'LEADERS' };

const CARD_COUNT = TEAM_MEMBERS.length;
const STAR_COUNT = 120;
const Z_GAP = 1000;
const CAM_SPEED = 2.2;
/** Title at z=0, then 4 cards — no loop */
const LAST_SCENE_INDEX = CARD_COUNT;
const MAX_SCROLL = (LAST_SCENE_INDEX * Z_GAP) / CAM_SPEED;
const getPinScrollDistance = () => Math.round(window.innerHeight * 3.2);

interface SceneItem {
  el: HTMLDivElement;
  type: 'text' | 'card' | 'star';
  x: number;
  y: number;
  rot: number;
  baseZ: number;
  cardEl?: HTMLDivElement;
  isFocused?: boolean;
}

const TeamHyperScroll: React.FC = () => {
  const hostRef = useRef<HTMLElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const worldRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const memberRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const velocityDisplayRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<SceneItem[]>([]);
  const rafRef = useRef<number>(0);

  const [hostHeight, setHostHeight] = useState('100vh');

  useEffect(() => {
    const setHeight = () => {
      setHostHeight(`${window.innerHeight + getPinScrollDistance()}px`);
    };
    setHeight();
    window.addEventListener('resize', setHeight);
    return () => window.removeEventListener('resize', setHeight);
  }, []);

  useEffect(() => {
    const host = hostRef.current;
    const world = worldRef.current;
    const viewport = viewportRef.current;
    if (!host || !world || !viewport) return;

    const depthRange = LAST_SCENE_INDEX * Z_GAP;
    const items: SceneItem[] = [];
    world.innerHTML = '';

    // Title — first item in scroll (no loop)
    {
      const el = document.createElement('div');
      el.className = 'item item--text';
      const txt = document.createElement('div');
      txt.className = 'big-text';
      txt.innerHTML = `<span>${TITLE_TEXT.line1}</span><span>${TITLE_TEXT.line2}</span>`;
      el.appendChild(txt);
      items.push({
        el,
        type: 'text',
        x: 0,
        y: 0,
        rot: 0,
        baseZ: 0,
      });
      world.appendChild(el);
    }

    TEAM_MEMBERS.forEach((member, index) => {
      const el = document.createElement('div');
      el.className = 'item';

      const card = document.createElement('div');
      card.className = 'card';
      card.style.setProperty('--member-accent', member.accent);

      card.innerHTML = `
        <div class="card-header">
          <span class="card-id">TG-${member.id}</span>
          <div class="card-accent-dot" style="background:${member.accent};box-shadow:0 0 8px ${member.accent}"></div>
        </div>
        <div class="card-avatar" data-avatar="true"></div>
        <div>
          <h2>${member.name}</h2>
          <p class="card-role">${member.role}</p>
        </div>
        <div class="card-footer">
          <span>TECH GIANT</span>
          <span>UNIT // ${member.id}</span>
        </div>
        <div class="card-index">${member.id}</div>
      `;

      const avatarSlot = card.querySelector('[data-avatar="true"]');
      if (avatarSlot) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 120 120');
        svg.innerHTML = `
          <circle cx="60" cy="60" r="56" fill="none" stroke="${member.accent}" stroke-width="2" opacity="0.55"/>
          <circle cx="60" cy="44" r="18" fill="${member.accent}" opacity="0.85"/>
          <path d="M24 98c6-22 24-34 36-34s30 12 36 34" fill="${member.accent}" opacity="0.85"/>
        `;
        avatarSlot.appendChild(svg);
      }

      el.appendChild(card);

      items.push({
        el,
        type: 'card',
        x: 0,
        y: 0,
        rot: (index - 1.5) * 4,
        baseZ: -(index + 1) * Z_GAP,
        cardEl: card,
        isFocused: false,
      });

      world.appendChild(el);
    });

    for (let i = 0; i < STAR_COUNT; i++) {
      const el = document.createElement('div');
      el.className = 'star';
      world.appendChild(el);
      items.push({
        el,
        type: 'star',
        x: (Math.random() - 0.5) * 2600,
        y: (Math.random() - 0.5) * 2600,
        rot: 0,
        baseZ: -Math.random() * depthRange,
      });
    }

    itemsRef.current = items;

    const state = {
      scroll: 0,
      velocity: 0,
      prevScroll: 0,
      mouseX: 0,
      mouseY: 0,
    };

    const syncProgressUI = (scroll: number) => {
      const pct = Math.min(100, Math.round((scroll / MAX_SCROLL) * 100));
      const complete = scroll >= MAX_SCROLL - 2;
      const titlePhaseEnd = MAX_SCROLL * 0.12;

      let displayName: string;
      if (scroll < titlePhaseEnd) {
        displayName = `${TITLE_TEXT.line1} ${TITLE_TEXT.line2}`;
      } else {
        const cardProgress = (scroll - titlePhaseEnd) / (MAX_SCROLL - titlePhaseEnd);
        const memberIdx = Math.min(
          TEAM_MEMBERS.length - 1,
          Math.floor(cardProgress * TEAM_MEMBERS.length)
        );
        displayName = TEAM_MEMBERS[memberIdx].name;
      }

      if (progressFillRef.current) {
        progressFillRef.current.style.width = `${pct}%`;
      }
      if (statusRef.current) {
        statusRef.current.textContent = complete ? 'COMPLETE' : 'IN PROGRESS';
      }
      if (memberRef.current) {
        memberRef.current.textContent = displayName;
      }
      if (pctRef.current) {
        pctRef.current.textContent = `${pct}%`;
      }
      if (hintRef.current) {
        hintRef.current.textContent = complete
          ? 'Team complete — keep scrolling to continue'
          : `Scroll to meet all ${TEAM_MEMBERS.length} leaders · ends at ${TEAM_MEMBERS[TEAM_MEMBERS.length - 1].name}`;
      }
    };

    const readScroll = () => {
      const scrollableDistance = host.offsetHeight - window.innerHeight;
      if (scrollableDistance <= 0) return 0;

      const rect = host.getBoundingClientRect();
      const scrolled = Math.min(scrollableDistance, Math.max(0, -rect.top));
      const linear = scrolled / scrollableDistance;
      const progress = linear < 0.5
        ? 2 * linear * linear
        : 1 - Math.pow(-2 * linear + 2, 2) / 2;
      return progress * MAX_SCROLL;
    };

    const onMouseMove = (e: MouseEvent) => {
      state.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      state.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    let lastHudUpdate = 0;
    let lastProgressPct = -1;

    syncProgressUI(readScroll());

    const getItemAlpha = (vizZ: number, type: 'text' | 'card' | 'star') => {
      if (vizZ < -2800) return 0;
      if (vizZ < -1800) return (vizZ + 2800) / 1000;
      if ((type === 'card' || type === 'text') && vizZ > 250) {
        return Math.max(0, 1 - (vizZ - 250) / 500);
      }
      if (type === 'star' && vizZ > 400) return 0;
      return 1;
    };

    const raf = (time: number) => {
      const scroll = readScroll();
      state.velocity = scroll - state.prevScroll;
      state.prevScroll = scroll;
      state.scroll = scroll;

      if (time - lastHudUpdate > 120) {
        lastHudUpdate = time;
        syncProgressUI(scroll);
        if (velocityDisplayRef.current) {
          velocityDisplayRef.current.textContent = Math.abs(state.velocity).toFixed(2);
        }
      } else {
        const pct = Math.min(100, Math.round((scroll / MAX_SCROLL) * 100));
        if (pct !== lastProgressPct && progressFillRef.current) {
          lastProgressPct = pct;
          progressFillRef.current.style.width = `${pct}%`;
        }
      }

      state.velocity *= 0.88;

      const tiltX = state.mouseY * 4 - state.velocity * 0.4;
      const tiltY = state.mouseX * 4;
      world.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;

      const cameraZ = scroll * CAM_SPEED;

      let focusedCardEl: HTMLDivElement | null = null;
      let closestCardZ = Infinity;

      items.forEach((item) => {
        if (item.type !== 'card') return;
        const vizZ = item.baseZ + cameraZ;
        const alpha = getItemAlpha(vizZ, item.type);
        const absZ = Math.abs(vizZ);
        if (alpha > 0.35 && absZ < closestCardZ) {
          closestCardZ = absZ;
          focusedCardEl = item.el;
        }
      });

      items.forEach((item) => {
        const vizZ = Math.round(item.baseZ + cameraZ);
        const alpha = getItemAlpha(vizZ, item.type);
        const isVisible = alpha > 0.01;

        item.el.style.opacity = isVisible ? String(alpha) : '0';
        item.el.style.visibility = isVisible ? 'visible' : 'hidden';

        if (item.type === 'text' || item.type === 'star') {
          item.el.style.pointerEvents = 'none';
        } else if (item.type === 'card' && item.cardEl) {
          const isFocused = item.el === focusedCardEl && closestCardZ < 350 && alpha > 0.35;
          item.el.style.pointerEvents = isFocused ? 'auto' : 'none';
          if (isFocused !== item.isFocused) {
            item.isFocused = isFocused;
            item.cardEl.classList.toggle('is-focused', isFocused);
          }
        }

        let trans = `translate3d(${item.x}px, ${item.y}px, ${vizZ}px)`;

        if (item.type === 'star') {
          const stretch = Math.max(1, Math.min(1 + Math.abs(state.velocity) * 0.08, 6));
          trans += ` scale3d(1, 1, ${stretch.toFixed(2)})`;
        } else if (item.type === 'text') {
          trans += ` rotateZ(${item.rot}deg)`;
          const bigText = item.el.firstElementChild as HTMLElement | null;
          if (bigText) {
            if (Math.abs(state.velocity) > 1) {
              const offset = Math.round(state.velocity * 2);
              bigText.style.textShadow = `${offset}px 0 #aa60c8, ${-offset}px 0 #d69ade`;
            } else {
              bigText.style.textShadow = 'none';
            }
          }
        } else {
          trans += ` rotateZ(${item.rot}deg)`;
        }

        item.el.style.transform = trans;
      });

      rafRef.current = requestAnimationFrame(raf);
    };

    rafRef.current = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      world.innerHTML = '';
      itemsRef.current = [];
    };
  }, [hostHeight]);

  return (
    <section
      ref={hostRef}
      className="team-hyper-host"
      style={{ height: hostHeight }}
      aria-label="Team hyper scroll experience"
    >
      <div ref={rootRef} className="team-hyper-root">
        <div className="tg-graph-paper tg-graph-paper--overlay" aria-hidden />
        <div className="scanlines" />
        <div className="vignette" />
        <div className="noise" />

        <div className="hud">
          <div className="hud-top">
            <span>TECH GIANT // LEADERS</span>
            <div className="hud-line" />
            <span ref={statusRef}>IN PROGRESS</span>
          </div>
          <div className="hud-side">
            SCROLL VELOCITY // <strong ref={velocityDisplayRef}>0.00</strong>
          </div>
          <div className="hud-bottom">
            <span>NOW VIEWING: <strong ref={memberRef}>TECH GIANT LEADERS</strong></span>
            <div className="hud-line" />
            <span ref={pctRef}>0%</span>
          </div>
        </div>

        <div className="team-hyper-progress" aria-hidden="true">
          <div ref={progressFillRef} className="team-hyper-progress-fill" style={{ width: '0%' }} />
        </div>

        <div ref={viewportRef} className="viewport">
          <div ref={worldRef} className="world" />
        </div>

        <div ref={hintRef} className="scroll-hint">
          {`Scroll to meet all ${TEAM_MEMBERS.length} leaders · ends at ${TEAM_MEMBERS[TEAM_MEMBERS.length - 1].name}`}
        </div>
      </div>
    </section>
  );
};

export default TeamHyperScroll;
