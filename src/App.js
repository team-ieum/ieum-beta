import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, AlertCircle, MessageSquare, Link2, BarChart3, Zap, CheckCircle2 } from 'lucide-react';
import './App.css';
import symbol from './assets/symbol.png';
import demoVideo from './assets/demo-intro.mov';
import slack from './assets/serviceIcon/slack.png';
import github from './assets/serviceIcon/github.png';
import notion from './assets/serviceIcon/notion.png';
import gmail from './assets/serviceIcon/gmail.png';
import discord from './assets/serviceIcon/discord.png';
import googleDrive from './assets/serviceIcon/googledrive.png';
import googleSheets from './assets/serviceIcon/googlesheets.png';
import airtable from './assets/serviceIcon/airtable.png';
import jira from './assets/serviceIcon/jira.png';
import linear from './assets/serviceIcon/linear.png';

// TODO: Apps Script 웹 앱을 배포한 뒤 URL을 여기에 입력하세요
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyO95AQgTUmWmtRUHVHsvos0BVCBOzDnq056z4h1MghQcApOvfljgjFyNgJ6FKmfku-yA/exec';

async function postToSheet(data) {
  if (!APPS_SCRIPT_URL) return;
  await fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data),
  }).catch(() => {});
}

const INTEGRATIONS = [
  { name: 'Slack', icon: slack },
  { name: 'GitHub', icon: github },
  { name: 'Notion', icon: notion },
  { name: 'Gmail', icon: gmail },
  { name: 'Discord', icon: discord },
  { name: 'Google Drive', icon: googleDrive },
  { name: 'Google Sheets', icon: googleSheets },
  { name: 'Airtable', icon: airtable },
  { name: 'Jira', icon: jira },
  { name: 'Linear', icon: linear },
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: '한 문장으로 워크플로우 완성',
    desc: '"이메일 문의 오면 구글 시트에 정리하고 디스코드로 알려줘" — 이 한 줄이 전부입니다. AI가 의도를 파악해 즉시 구성합니다.',
  },
  {
    icon: Link2,
    title: '쓰던 서비스 그대로 연결',
    desc: 'Gmail, Discord, 구글 시트 등 이미 쓰고 있는 서비스를 OAuth 한 번으로 바로 연결합니다.',
  },
  {
    icon: BarChart3,
    title: '실행 현황을 한눈에',
    desc: '성공·실패·실행 횟수를 실시간으로 확인합니다. 문제가 생기면 즉시 알림을 드립니다.',
  },
];

const WHY_ITEMS = [
  {
    title: '코드 없이 누구나',
    desc: '개발자가 아니어도 됩니다. 카톡 보내듯이 하고 싶은 자동화를 설명하면 AI가 나머지를 처리합니다.',
  },
  {
    title: '배울 게 없어요',
    desc: '복잡한 설정 UI가 없습니다. 익숙한 말로 설명하는 것만으로 충분합니다.',
  },
  {
    title: '오늘 바로 시작',
    desc: '설치 없이 브라우저에서 즉시 사용합니다. OAuth 연동 한 번으로 모든 서비스가 연결됩니다.',
  },
];


const JOB_OPTIONS = ['개발자', '기획자 / PM', '마케터', '디자이너', '대표 / 창업자', '학생', '기타'];
const AGE_OPTIONS = ['10대', '20대', '30대', '40대', '50대 이상'];

/* ─── Scroll animation ──────────────────────────────────── */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = '' }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-100 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-5 lg:px-8">
        <a href="/" className="inline-flex items-center gap-2.5">
          <img src={symbol} alt="" className="h-7 w-7" />
          <span className="font-logo text-xl text-deep-blue">IEUM</span>
        </a>
        <a
          href="#cta"
          className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-lg bg-main-blue px-4 text-xs font-semibold text-white transition-colors hover:bg-deep-blue"
        >
          얼리액세스 신청
          <ArrowRight size={13} />
        </a>
      </div>
    </header>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  const contentRef = useRef(null);
  useEffect(() => {
    const onScroll = () => {
      if (!contentRef.current) return;
      const y = window.scrollY;
      contentRef.current.style.transform = `translateY(${-y * 0.18}px)`;
      contentRef.current.style.opacity = Math.max(0, 1 - y / 500);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f5fbff] via-white to-white py-20 lg:py-28">
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-main-blue/8 blur-[80px]" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-light-blue/30 blur-[60px]" />

      <div ref={contentRef} style={{ willChange: 'transform, opacity' }} className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-main-blue/20 bg-light-blue/50 px-3.5 py-1.5 text-xs font-semibold text-main-blue">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-main-blue opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-main-blue" />
            </span>
            AI 워크플로우 자동화 플랫폼
          </span>

          <h1 className="m-0 font-pretendard text-4xl font-extrabold leading-[1.15] tracking-tight text-deep-blue sm:text-5xl lg:text-[3.5rem]">
            말로 설명하면<br />
            AI가 워크플로우를<br />
            <span className="bg-gradient-to-r from-main-blue to-deep-blue bg-clip-text text-transparent">만들어드립니다</span>
          </h1>

          <p className="m-0 max-w-md text-base leading-relaxed text-neutral-500">
            "이메일 문의 오면 구글 시트에 정리하고 디스코드로 알려줘" — 한 문장이면 자동화 완성.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-main-blue px-7 text-sm font-bold text-white shadow-[0_4px_20px_rgba(0,123,167,0.3)] transition-all hover:bg-deep-blue active:scale-[0.98]"
            >
              무료로 신청하기
              <ArrowRight size={16} />
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-600 transition-colors hover:border-main-blue/30 hover:text-main-blue"
            >
              어떻게 작동하나요
            </a>
          </div>

          <ul className="m-0 flex flex-wrap gap-x-5 gap-y-1.5 list-none p-0 text-xs text-neutral-400">
            {['코드 불필요', '자연어 한 문장', '즉시 연동'].map((item, i) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                {i > 0 && <span className="mr-3 h-3 w-px bg-neutral-200" />}
                <CheckCircle2 size={12} className="text-main-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 데모 영상 */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <video
            src={demoVideo}
            autoPlay
            loop
            muted
            playsInline
            onPlay={(e) => {
              e.target.style.opacity = '1';
              e.target.playbackRate = 1.3;
            }}
            className="w-full rounded-2xl border border-neutral-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] opacity-0 transition-opacity duration-1000"
          />
        </div>

        {/* 목업 UI (보존) */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none hidden">
          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
            {/* 타이틀바 */}
            <div className="flex items-center gap-1.5 border-b border-neutral-100 bg-neutral-50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="ml-2 text-xs font-medium text-neutral-400">IEUM — 새 워크플로우</span>
            </div>
            <div className="space-y-4 p-5">
              {/* 입력창 */}
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="m-0 text-[11px] font-medium text-neutral-400 mb-1">워크플로우 설명</p>
                <p className="m-0 text-sm text-neutral-800">"이메일 문의 오면 구글 시트에 정리하고 디스코드로 알려줘"</p>
              </div>
              {/* 워크플로우 노드 */}
              <div className="space-y-1.5">
                <p className="m-0 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">생성된 워크플로우</p>
                {[
                  { label: 'Gmail', sub: '새 이메일 수신 시', color: '#EA4335', icon: gmail },
                  { label: 'Google Sheets', sub: '문의 내용 행 추가', color: '#1A73E8', icon: googleSheets },
                  { label: 'Discord', sub: '#문의-알림 채널에 전송', color: '#5865F2', icon: discord },
                ].map((node, i) => (
                  <div key={i}>
                    <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white p-3">
                      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg" style={{ background: node.color }}>
                        <img src={node.icon} alt="" className="h-4 w-4 object-contain brightness-0 invert" />
                      </div>
                      <div>
                        <p className="m-0 text-xs font-semibold text-neutral-800">{node.label}</p>
                        <p className="m-0 text-[11px] text-neutral-400">{node.sub}</p>
                      </div>
                      <CheckCircle2 size={14} className="ml-auto shrink-0 text-green-500" />
                    </div>
                    {i < 2 && <div className="ml-7 h-3 w-px bg-neutral-200" />}
                  </div>
                ))}
              </div>
              {/* 완료 상태 */}
              <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-3.5 py-2.5">
                <div className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </div>
                <p className="m-0 text-xs font-semibold text-green-700">실행 중 · 오늘 3건 처리됨</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Flow node box ──────────────────────────────────────── */
function FlowNodeBox({ step, label, sublabel, icon: Icon, headerBg = '#29537c', stepNum = '' }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_32px_-8px_rgba(41,83,124,0.22)]">
      {/* 컬러 헤더 — 아이콘 + 스텝명 */}
      <div className="relative overflow-hidden px-5 py-4" style={{ background: headerBg }}>
        <div className="pointer-events-none absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10" />
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white/20">
              {Icon && <Icon size={18} className="text-white" />}
            </span>
            <span className="text-base font-bold text-white">{step}</span>
          </div>
          {stepNum && <span className="select-none text-2xl font-black text-white/20">{stepNum}</span>}
        </div>
      </div>
      {/* 바디 — 레이블 + 서브레이블 */}
      <div className="px-6 py-6">
        <p className="m-0 text-lg font-bold leading-snug text-deep-blue">{label}</p>
        {sublabel && <p className="m-0 mt-2 text-base leading-relaxed text-neutral-500">{sublabel}</p>}
      </div>
    </div>
  );
}

/* ─── Flow section ───────────────────────────────────────── */
function FlowSection() {
  const sectionRef = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);
  const [lines, setLines] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const animatedRef = useRef(false);

  useEffect(() => {
    function measure() {
      const section = sectionRef.current;
      if (!section || !ref1.current || !ref2.current || !ref3.current) return;
      if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;
      const sR = section.getBoundingClientRect();
      const nR = [ref1, ref2, ref3].map(r => r.current.getBoundingClientRect());
      const rR = [row1Ref, row2Ref, row3Ref].map(r => r.current.getBoundingClientRect());
      const newLines = [
        {
          x1: nR[0].left + nR[0].width / 2 - sR.left,
          y1: nR[0].bottom - sR.top,
          gapY: (rR[0].bottom + rR[1].top) / 2 - sR.top,
          x2: nR[1].left + nR[1].width / 2 - sR.left,
          y2: nR[1].top - sR.top,
        },
        {
          x1: nR[1].left + nR[1].width / 2 - sR.left,
          y1: nR[1].bottom - sR.top,
          gapY: (rR[1].bottom + rR[2].top) / 2 - sR.top,
          x2: nR[2].left + nR[2].width / 2 - sR.left,
          y2: nR[2].top - sR.top,
        },
      ].map(l => ({
        ...l,
        totalLength: (l.gapY - l.y1) + Math.abs(l.x2 - l.x1) + (l.y2 - l.gapY) + 20,
      }));
      setLines(newLines);
    }

    measure();
    const t = setTimeout(measure, 120);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);

  useEffect(() => {
    if (!sectionRef.current || lines.length === 0) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animatedRef.current) {
          animatedRef.current = true;
          setRevealed(lines.map(() => false));
          lines.forEach((_, i) => {
            setTimeout(() => {
              setRevealed(prev => prev.map((v, idx) => idx === i ? true : v));
            }, 300 + i * 800);
          });
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [lines]);

  const morningSteps = [
    { time: '09:00', text: '이메일 열어서 고객 문의 내용 하나씩 확인' },
    { time: '09:10', text: '구글 시트 열어서 문의 내용 수동으로 입력' },
    { time: '09:18', text: '디스코드 채널에 따로 정리해서 팀에게 공유' },
    { time: '09:25', text: '고객에게 답장 이메일 하나씩 직접 작성' },
  ];

  return (
    <section ref={sectionRef} id="features" className="relative border-t border-neutral-100 bg-white py-32">

      {/* SVG overlay — DOM 위치를 측정해 노드끼리 직접 연결 */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" aria-hidden="true">
        {lines.map(({ x1, y1, gapY, x2, y2, totalLength }, i) => {
          const d = `M ${x1} ${y1} L ${x1} ${gapY} L ${x2} ${gapY} L ${x2} ${y2}`;
          return (
            <g key={i}>
              {/* 파란 점선 (markerEnd 없음 — 화살표는 아래에서 별도 처리) */}
              <path d={d} fill="none" stroke="#007ba7" strokeWidth="1.5" strokeOpacity="0.25" />
              {/* 흰 오버레이 */}
              <path
                d={d}
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="butt"
                strokeDasharray={`${totalLength} ${totalLength}`}
                strokeDashoffset={revealed[i] ? -totalLength : 0}
                style={{ transition: revealed[i] ? `stroke-dashoffset ${2 + i}s ease-in-out` : 'none' }}
              />
              {/* 화살표 — 선 그리기가 거의 끝날 때 페이드인 */}
              <polygon
                points={`${x2 - 5},${y2 - 8} ${x2 + 5},${y2 - 8} ${x2},${y2}`}
                fill="#007ba7"
                fillOpacity="0.35"
                style={{
                  opacity: revealed[i] ? 1 : 0,
                  transition: revealed[i] ? `opacity 0.3s ease-out ${1.8 + i * 0.9}s` : 'none',
                }}
              />
            </g>
          );
        })}
      </svg>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">

        {/* 섹션 타이틀 */}
        <FadeIn className="mb-20 text-center">
          <span className="inline-block rounded-full border border-main-blue/20 bg-light-blue/50 px-3.5 py-1.5 text-xs font-semibold text-main-blue">어떻게 작동하나요?</span>
          <h2 className="m-0 mt-4 text-3xl font-extrabold tracking-tight text-deep-blue sm:text-4xl">업무 흐름, 이렇게 달라집니다</h2>
          <p className="m-0 mt-3 text-base text-neutral-500">반복을 자동화하면 중요한 일에 더 집중할 수 있습니다.</p>
        </FadeIn>

        {/* ── Step 1: Pain Point (노드 왼쪽) ── */}
        <div ref={row1Ref} className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
          <div ref={ref1} className="shrink-0 lg:w-80">
            <FlowNodeBox
              step="Pain Point"
              label={<>매일 아침 반복되는 업무,<br />지겹지 않으신가요?</>}
              sublabel="자동화하려 해도 도구가 너무 복잡합니다."
              icon={AlertCircle}
              headerBg="#4f5d75"
              stepNum="01"
            />
          </div>
          <FadeIn className="flex-1">
            <div className="space-y-4">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)]">
                <p className="m-0 mb-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400">지금은</p>
                <div className="space-y-2">
                  {morningSteps.map(({ time, text }) => (
                    <div key={time} className="flex items-start gap-3">
                      <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-[11px] font-bold tabular-nums text-neutral-400 ring-1 ring-neutral-200">{time}</span>
                      <p className="m-0 text-sm text-neutral-600">{text}</p>
                    </div>
                  ))}
                  <div className="mt-2 rounded-lg border border-red-100 bg-red-50/80 px-3 py-2">
                    <p className="m-0 text-xs font-semibold text-red-500">매일 약 30분 소요 · 실수 가능</p>
                  </div>
                </div>
              </div>
              <div className="rounded-xl border border-main-blue/15 bg-white p-6 shadow-[0_2px_12px_-4px_rgba(0,123,167,0.1)]">
                <p className="m-0 mb-4 text-[10px] font-bold uppercase tracking-widest text-main-blue">IEUM을 쓰면</p>
                <div className="mb-3 rounded-lg border border-neutral-100 bg-neutral-50 px-4 py-3">
                  <p className="m-0 text-xs text-neutral-400">워크플로우 설명</p>
                  <p className="m-0 mt-1 text-sm text-neutral-800">"이메일 문의 오면 구글 시트에 정리하고 디스코드로 알려줘"</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2.5">
                  <CheckCircle2 size={13} className="shrink-0 text-green-600" />
                  <p className="m-0 text-xs font-semibold text-green-700">자동 실행 중 · 매일 0분 소요</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 모바일 연결선 1 */}
        <div className="flex justify-center py-2 lg:hidden">
          <div className="h-12 border-l-2 border-main-blue/25" />
        </div>
        {/* 데스크탑 gap 공간 (SVG gapY 측정용) */}
        <div className="hidden h-24 lg:block" />

        {/* ── Step 2: How (노드 오른쪽) ── */}
        <div ref={row2Ref} className="flex flex-col gap-8 lg:flex-row-reverse lg:items-start lg:gap-14">
          <div ref={ref2} className="shrink-0 lg:w-80">
            <FlowNodeBox
              step="How"
              label="한 문장이면 충분합니다"
              sublabel="AI가 의도를 파악해 워크플로우를 즉시 구성합니다."
              icon={MessageSquare}
              headerBg="#007ba7"
              stepNum="02"
            />
          </div>
          <FadeIn className="flex-1">
            <div className="space-y-4">
              {/* 입력 → 결과 예시 */}
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)]">
                <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">이렇게 말하면</p>
                <div className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-800 italic">
                  "이메일 문의 오면 구글 시트에 정리하고 디스코드로 알려줘"
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <ArrowDown size={14} className="shrink-0 text-main-blue" />
                  <span className="text-xs font-semibold text-main-blue">AI가 즉시 워크플로우를 구성합니다</span>
                </div>
              </div>
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)] hover:border-main-blue/20 transition-colors">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-light-blue text-main-blue">
                    <Icon size={17} />
                  </span>
                  <div>
                    <h3 className="m-0 text-sm font-semibold text-neutral-900">{title}</h3>
                    <p className="m-0 mt-1 text-sm leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* 모바일 연결선 2 */}
        <div className="flex justify-center py-2 lg:hidden">
          <div className="h-12 border-l-2 border-main-blue/25" />
        </div>
        {/* 데스크탑 gap 공간 (SVG gapY 측정용) */}
        <div className="hidden h-24 lg:block" />

        {/* ── Step 3: Why (노드 왼쪽) ── */}
        <div ref={row3Ref} className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14">
          <div ref={ref3} className="shrink-0 lg:w-80">
            <FlowNodeBox
              step="Why IEUM"
              label="기존 자동화 툴과 무엇이 다른가요?"
              sublabel="배울 것도, 설치할 것도 없습니다."
              icon={CheckCircle2}
              headerBg="#29537c"
              stepNum="03"
            />
          </div>
          <FadeIn className="flex-1">
            <div className="space-y-4">
              {WHY_ITEMS.map(({ title, desc }, i) => (
                <div key={title} className="flex items-start gap-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.07)] hover:border-main-blue/20 transition-colors">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-light-blue text-sm font-bold text-main-blue tabular-nums">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="m-0 text-sm font-semibold text-neutral-900">{title}</h3>
                    <p className="m-0 mt-1 text-sm leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>


      </div>
    </section>
  );
}

/* ─── Integrations ───────────────────────────────────────── */
function Integrations() {
  return (
    <section className="border-t border-neutral-100 bg-white py-16">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="rounded-3xl bg-[#f5fbff] px-8 py-10">
          <div className="text-center mb-8">
            <p className="m-0 text-xs font-semibold uppercase tracking-widest text-main-blue/60">Integrations</p>
            <h3 className="m-0 mt-2 text-xl font-bold text-deep-blue">자주 쓰는 도구와 바로 연결</h3>
            <p className="m-0 mt-1.5 text-sm text-main-blue">더 많은 연동이 계속 추가됩니다.</p>
          </div>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#f5fbff] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#f5fbff] to-transparent" />
            <div className="marquee-track">
              {[...INTEGRATIONS, ...INTEGRATIONS].map(({ name, icon }, i) => (
                <div key={i} className="mx-2 flex shrink-0 items-center gap-2.5 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 hover:border-main-blue/20 transition-colors">
                  <img src={icon} alt="" className="h-6 w-6 object-contain" />
                  <span className="text-sm font-medium text-neutral-700">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Email CTA ─────────────────────────────────────────── */
function EmailCta() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [step, setStep] = useState('idle'); // idle | loading | survey | done
  const [job, setJob] = useState('');
  const [services, setServices] = useState([]);
  const [serviceEtc, setServiceEtc] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('올바른 이메일 형식을 입력해주세요.');
      return;
    }
    setEmailError('');
    setStep('loading');
    setStep('survey');
  }

  async function handleSurvey(e) {
    e.preventDefault();
    const allServices = serviceEtc ? [...services, `기타: ${serviceEtc}`] : services;
    await postToSheet({ email, job, age, services: allServices.join(', '), reason });
    setStep('done');
  }

  return (
    <section id="cta" className="relative overflow-hidden bg-gradient-to-br from-[#1a3a5c] via-deep-blue to-[#1e4570] py-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-white/5 blur-[80px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/5 blur-[60px]" />
      <div className="relative mx-auto max-w-xl px-5 text-center lg:px-8">

        {step === 'done' ? (
          <div>
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-white/15">
              <CheckCircle2 size={28} className="text-white" />
            </div>
            <h2 className="m-0 text-2xl font-extrabold text-white">신청이 완료됐습니다!</h2>
            <p className="m-0 mt-2 text-sm text-white/60">남겨주신 의견을 소중히 반영해 더 좋은 서비스로 찾아뵙겠습니다.</p>
          </div>
        ) : step === 'survey' ? (
          <div>
            <p className="m-0 text-xs font-semibold uppercase tracking-widest text-white/50">얼리액세스 신청</p>
            <h2 className="m-0 mt-3 text-2xl font-bold text-white">짧은 설문으로 신청을 완료해주세요</h2>
            <p className="m-0 mt-2 text-sm text-white/60">약 30초면 충분해요. 답변은 더 나은 서비스를 만드는 데 직접 활용됩니다.</p>
            <form onSubmit={handleSurvey} className="mt-8 text-left space-y-5">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/70">직업 / 직군</label>
                <select
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="" className="text-neutral-800">선택해주세요</option>
                  {JOB_OPTIONS.map((o) => (
                    <option key={o} value={o} className="text-neutral-800">{o}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-medium text-white/70">주로 쓰는 서비스 (복수 선택)</label>
                <div className="flex flex-wrap gap-2">
                  {INTEGRATIONS.map(({ name, icon }) => {
                    const checked = services.includes(name);
                    return (
                      <label
                        key={name}
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors ${
                          checked
                            ? 'border-white bg-white/25 text-white'
                            : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() =>
                            setServices((prev) =>
                              checked ? prev.filter((s) => s !== name) : [...prev, name]
                            )
                          }
                        />
                        <img src={icon} alt="" className="h-4 w-4 object-contain" />
                        <span className="text-xs font-medium">{name}</span>
                      </label>
                    );
                  })}
                  {(() => {
                    const checked = services.includes('기타');
                    return (
                      <label
                        className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors ${
                          checked
                            ? 'border-white bg-white/25 text-white'
                            : 'border-white/20 bg-white/5 text-white/70 hover:bg-white/10'
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => {
                            setServices((prev) =>
                              checked ? prev.filter((s) => s !== '기타') : [...prev, '기타']
                            );
                            if (checked) setServiceEtc('');
                          }}
                        />
                        <span className="text-xs font-medium">기타</span>
                      </label>
                    );
                  })()}
                </div>
                {services.includes('기타') && (
                  <input
                    type="text"
                    value={serviceEtc}
                    onChange={(e) => setServiceEtc(e.target.value)}
                    placeholder="사용 중인 서비스를 입력해주세요"
                    className="mt-2 w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                )}
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/70">연령대</label>
                <div className="flex flex-wrap gap-2">
                  {AGE_OPTIONS.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setAge(opt)}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                        age === opt
                          ? 'border-white bg-white text-deep-blue'
                          : 'border-white/20 text-white/70 hover:border-white/40'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-white/70">해결하고 싶은 문제 (선택)</label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="자동화하고 싶은 업무가 있다면 알려주세요."
                  rows={3}
                  className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </div>
              <button
                type="submit"
                className="h-12 w-full cursor-pointer rounded-xl bg-white text-sm font-bold text-deep-blue transition-colors hover:bg-light-blue"
              >
                신청 완료하기
              </button>
            </form>
          </div>
        ) : (
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-400" />
              </span>
              얼리액세스 신청 중
            </span>
            <h2 className="m-0 mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">지금 신청하고<br />가장 먼저 경험하세요</h2>
            <p className="m-0 mt-3 text-base text-white/60">
              얼리액세스 신청자에게 출시 소식을 가장 먼저 전달드립니다.
            </p>
            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center"
            >
              <div className="flex w-full flex-col gap-1 sm:w-72">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                  placeholder="이메일 주소를 입력하세요"
                  className={`h-12 w-full rounded-xl border bg-white/10 px-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 ${emailError ? 'border-red-400' : 'border-white/20'}`}
                />
                {emailError && (
                  <p className="m-0 px-1 text-xs text-red-300">{emailError}</p>
                )}
              </div>
              <button
                type="submit"
                disabled={step === 'loading'}
                className="h-12 w-full cursor-pointer rounded-xl bg-white px-8 text-sm font-bold text-deep-blue transition-colors hover:bg-light-blue disabled:opacity-70 sm:w-auto"
              >
                {step === 'loading' ? '신청 중...' : '신청하기'}
              </button>
            </form>
            <p className="m-0 mt-4 text-xs text-white/40">스팸 없이, 출시 소식만 전달드립니다.</p>
          </div>
        )}

      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-neutral-100 bg-white py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <img src={symbol} alt="" className="h-5 w-5 opacity-70" />
          <span className="font-logo text-base text-deep-blue">IEUM</span>
        </div>
        <p className="m-0 text-xs text-neutral-400">© 2026 IEUM. All rights reserved.</p>
      </div>
    </footer>
  );
}

/* ─── App ───────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Nav />
      <main>
        <Hero />
        <FlowSection />
        <Integrations />
        <EmailCta />
      </main>
      <Footer />
    </div>
  );
}
