import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowDown, AlertCircle, MessageSquare, Link2, BarChart3, Zap, CheckCircle2 } from 'lucide-react';
import './App.css';
import symbol from './assets/symbol.png';
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
    desc: '"GitHub PR 머지되면 팀 슬랙에 알려줘" — 이 한 줄이 전부입니다. AI가 의도를 파악해 즉시 구성합니다.',
  },
  {
    icon: Link2,
    title: '쓰던 서비스 그대로 연결',
    desc: 'Slack, Notion, Gmail, GitHub 등 이미 쓰고 있는 서비스를 OAuth 한 번으로 바로 연결합니다.',
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
    desc: '개발자가 아니어도 됩니다. Notion 쓰듯이 하고 싶은 자동화를 설명하면 AI가 나머지를 처리합니다.',
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
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-light-blue/80 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 lg:px-8">
        <a href="/" className="inline-flex items-center gap-2.5">
          <img src={symbol} alt="" className="h-8 w-8" />
          <span className="font-logo text-2xl text-deep-blue">IEUM</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#features" className="text-sm font-medium text-neutral-600 transition-colors hover:text-main-blue">기능</a>
        </nav>
        <a
          href="#cta"
          className="ml-auto inline-flex h-10 items-center gap-1.5 rounded-2xl bg-main-blue px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-deep-blue"
        >
          얼리액세스 신청
          <ArrowRight size={16} />
        </a>
      </div>
    </header>
  );
}

/* ─── Hero ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-light-blue/60 via-white to-white py-16 lg:py-24">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-main-blue/10 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-light-blue/40 blur-3xl" />

      <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-8 lg:px-8">
        <div className="flex flex-col gap-6">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-light-blue bg-white/80 px-3 py-1 text-xs font-semibold text-deep-blue">
            <Zap size={14} className="text-main-blue" />
            AI 워크플로우 자동화 플랫폼
          </span>

          <h1 className="m-0 font-pretendard text-4xl font-bold leading-tight text-deep-blue sm:text-5xl lg:text-[3.25rem]">
            말로 설명하면<br />
            AI가 워크플로우를<br />
            <span className="text-main-blue">만들어드립니다</span>
          </h1>

          <p className="m-0 max-w-lg text-base text-neutral-600">
            복잡한 도구 없이. <strong>"슬랙 메시지 오면 Notion에 정리해줘"</strong> 한 문장으로 자동화가 완성됩니다.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#cta"
              className="inline-flex h-12 items-center gap-2 rounded-2xl bg-main-blue px-6 text-sm font-semibold text-white shadow-md transition-colors hover:bg-deep-blue"
            >
              얼리액세스 신청하기
              <ArrowRight size={18} />
            </a>
            <a
              href="#features"
              className="inline-flex h-12 items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-6 text-sm font-semibold text-neutral-700 transition-colors hover:border-main-blue hover:text-main-blue"
            >
              기능 살펴보기
            </a>
          </div>

          <ul className="m-0 flex flex-wrap gap-4 list-none p-0 text-xs font-medium text-neutral-500">
            {['코드 없이', '자연어로', '즉시 연동'].map((item) => (
              <li key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-main-blue" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 목업 UI */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="overflow-hidden rounded-2xl border border-light-blue bg-white shadow-[0_24px_48px_-12px_rgba(41,83,124,0.18)]">
            <div className="flex items-center gap-2 border-b border-neutral-100 bg-light-blue/50 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              <span className="ml-2 text-xs font-medium text-neutral-400">IEUM — AI 워크플로우</span>
            </div>
            <div className="space-y-4 bg-gradient-to-br from-light-blue/30 to-white p-6">
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <p className="m-0 text-xs text-neutral-400">워크플로우 설명</p>
                <p className="m-0 mt-1 text-sm text-neutral-800">"슬랙에서 DM 오면 팀 채널에 요약해서 올려줘"</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'Slack', sub: '트리거' },
                  { label: 'AI 요약', sub: 'GPT-4o' },
                  { label: 'Slack', sub: '액션' },
                ].map((node, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-dashed border-main-blue/40 bg-white/80 px-2 py-3 text-center"
                  >
                    <p className="m-0 text-xs font-semibold text-deep-blue">{node.label}</p>
                    <p className="m-0 text-xs text-neutral-400">{node.sub}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
                <CheckCircle2 size={14} className="shrink-0 text-green-600" />
                <p className="m-0 text-xs text-green-700">워크플로우가 생성되었습니다. 지금 바로 실행할 수 있어요.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Flow node box ──────────────────────────────────────── */
function FlowNodeBox({ step, label, sublabel, icon: Icon, headerBg = '#29537c' }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-2.5 px-4 py-3" style={{ background: headerBg }}>
        {Icon && (
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/20">
            <Icon size={16} className="text-white" />
          </span>
        )}
        <span className="text-sm font-bold text-white">{step}</span>
      </div>
      <div className="px-4 py-4">
        <p className="m-0 text-sm font-semibold leading-snug text-deep-blue">{label}</p>
        {sublabel && <p className="m-0 mt-1.5 text-xs text-neutral-500">{sublabel}</p>}
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

  useEffect(() => {
    function measure() {
      const section = sectionRef.current;
      if (!section || !ref1.current || !ref2.current || !ref3.current) return;
      if (!row1Ref.current || !row2Ref.current || !row3Ref.current) return;
      const sR = section.getBoundingClientRect();
      const nR = [ref1, ref2, ref3].map(r => r.current.getBoundingClientRect());
      const rR = [row1Ref, row2Ref, row3Ref].map(r => r.current.getBoundingClientRect());
      // 수평 꺾임을 row 사이 빈 갭의 중간점으로 라우팅 (콘텐츠 박스를 통과하지 않음)
      setLines([
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
      ]);
    }
    measure();
    const t = setTimeout(measure, 120);
    window.addEventListener('resize', measure);
    return () => { clearTimeout(t); window.removeEventListener('resize', measure); };
  }, []);

  const morningSteps = [
    { time: '09:00', text: '슬랙 메시지 확인하고 중요 내용 메모장에 복사' },
    { time: '09:10', text: 'Notion 열어서 팀 페이지에 내용 직접 붙여넣기' },
    { time: '09:18', text: '팀 채널에 요약 메시지 따로 작성해서 전송' },
    { time: '09:25', text: 'GitHub에 관련 이슈 직접 생성' },
  ];

  return (
    <section ref={sectionRef} id="features" className="relative border-t border-neutral-100 bg-white py-20">

      {/* SVG overlay — DOM 위치를 측정해 노드끼리 직접 연결 */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full overflow-visible lg:block" aria-hidden="true">
        <defs>
          <marker id="arr-flow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
            <polygon points="0 0, 8 3, 0 6" fill="#007ba7" />
          </marker>
        </defs>
        {lines.map(({ x1, y1, gapY, x2, y2 }, i) => (
          <path
            key={i}
            d={`M ${x1} ${y1} L ${x1} ${gapY} L ${x2} ${gapY} L ${x2} ${y2}`}
            fill="none"
            stroke="#007ba7"
            strokeWidth="2"
            strokeDasharray="8 5"
            markerEnd="url(#arr-flow)"
          />
        ))}
      </svg>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">

        {/* ── Step 1: Pain Point (노드 왼쪽) ── */}
        <div ref={row1Ref} className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div ref={ref1} className="shrink-0 lg:w-60">
            <FlowNodeBox
              step="Pain Point"
              label="매일 아침 반복되는 업무, 지겹지 않으신가요?"
              sublabel="자동화하려 해도 도구가 너무 복잡합니다."
              icon={AlertCircle}
              headerBg="#4f5d75"
            />
          </div>
          <FadeIn className="flex-1">
            <div className="space-y-3">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-400">지금은</p>
                <div className="space-y-2.5">
                  {morningSteps.map(({ time, text }) => (
                    <div key={time} className="flex items-start gap-3">
                      <span className="shrink-0 rounded-md bg-white px-2 py-0.5 text-xs font-semibold tabular-nums text-neutral-500 shadow-sm ring-1 ring-neutral-200">{time}</span>
                      <p className="m-0 text-sm text-neutral-600">{text}</p>
                    </div>
                  ))}
                  <div className="mt-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2">
                    <p className="m-0 text-xs font-semibold text-red-500">매일 약 30분 소요 · 실수 가능 · 빠뜨리는 경우 있음</p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-main-blue/20 bg-light-blue/30 p-5">
                <p className="m-0 mb-3 text-xs font-semibold uppercase tracking-wider text-main-blue">IEUM을 쓰면</p>
                <div className="mb-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
                  <p className="m-0 text-xs text-neutral-400">워크플로우 설명</p>
                  <p className="m-0 mt-1 text-sm text-neutral-800">"슬랙 DM 오면 Notion에 정리하고 팀 채널에 요약 올려줘"</p>
                </div>
                <div className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2.5">
                  <CheckCircle2 size={14} className="shrink-0 text-green-600" />
                  <p className="m-0 text-xs font-semibold text-green-700">자동 실행 중 · 매일 0분 소요</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* 모바일 연결선 1 */}
        <div className="flex justify-center py-1 lg:hidden">
          <div className="h-10 border-l-2 border-dashed border-main-blue" />
        </div>
        {/* 데스크탑 gap 공간 (SVG gapY 측정용) */}
        <div className="hidden h-16 lg:block" />

        {/* ── Step 2: How (노드 오른쪽) ── */}
        <div ref={row2Ref} className="flex flex-col gap-6 lg:flex-row-reverse lg:items-start lg:gap-10">
          <div ref={ref2} className="shrink-0 lg:w-60">
            <FlowNodeBox
              step="How"
              label="한 문장이면 충분합니다"
              sublabel="AI가 의도를 파악해 워크플로우를 즉시 구성합니다."
              icon={MessageSquare}
              headerBg="#007ba7"
            />
          </div>
          <FadeIn className="flex-1">
            <div className="space-y-3">
              {FEATURES.map(({ icon: Icon, title, desc }, i) => (
                <div key={title} className="flex items-start gap-4 rounded-2xl border border-neutral-200 bg-white p-5">
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="select-none text-xl font-bold text-neutral-200 tabular-nums">0{i + 1}</span>
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-light-blue text-main-blue">
                      <Icon size={20} />
                    </span>
                  </div>
                  <div>
                    <h3 className="m-0 text-sm font-semibold text-neutral-900">{title}</h3>
                    <p className="m-0 mt-1 text-sm text-neutral-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* 모바일 연결선 2 */}
        <div className="flex justify-center py-1 lg:hidden">
          <div className="h-10 border-l-2 border-dashed border-main-blue" />
        </div>
        {/* 데스크탑 gap 공간 (SVG gapY 측정용) */}
        <div className="hidden h-16 lg:block" />

        {/* ── Step 3: Why (노드 왼쪽) ── */}
        <div ref={row3Ref} className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
          <div ref={ref3} className="shrink-0 lg:w-60">
            <FlowNodeBox
              step="Why IEUM"
              label="기존 자동화 툴과 무엇이 다른가요?"
              sublabel="배울 것도, 설치할 것도 없습니다."
              icon={CheckCircle2}
              headerBg="#29537c"
            />
          </div>
          <FadeIn className="flex-1">
            <div className="space-y-3">
              {WHY_ITEMS.map(({ title, desc }) => (
                <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-5">
                  <h3 className="m-0 text-sm font-semibold text-neutral-900">{title}</h3>
                  <p className="m-0 mt-1 text-sm text-neutral-500">{desc}</p>
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
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-light-blue/60 to-light-blue/20 py-10 text-center">
          <h3 className="m-0 text-lg font-semibold text-deep-blue">자주 쓰는 도구와 바로 연결</h3>
          <p className="m-0 mt-1 text-sm text-main-blue">더 많은 연동이 계속 추가됩니다.</p>
          <div className="relative mt-6 overflow-hidden">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-light-blue/60 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-light-blue/20 to-transparent" />
            <div className="marquee-track">
              {[...INTEGRATIONS, ...INTEGRATIONS].map(({ name, icon }, i) => (
                <div key={i} className="mx-2 flex shrink-0 items-center gap-2.5 rounded-xl border border-main-blue/15 bg-white/70 px-4 py-2.5">
                  <img src={icon} alt="" className="h-7 w-7 object-contain" />
                  <span className="text-sm font-semibold text-deep-blue">{name}</span>
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
    <section id="cta" className="py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-main-blue to-deep-blue px-8 py-12 text-center text-white shadow-lg sm:px-12">

          {step === 'done' ? (
            <div>
              <h2 className="m-0 text-2xl font-bold">감사합니다!</h2>
              <p className="m-0 mt-2 text-sm text-light-blue">남겨주신 의견을 소중히 반영해 더 좋은 서비스로 찾아뵙겠습니다.</p>
            </div>
          ) : step === 'survey' ? (
            <div>
              <p className="m-0 text-xs font-semibold uppercase tracking-widest text-light-blue/60">얼리액세스 신청</p>
              <h2 className="m-0 mt-3 text-2xl font-bold">짧은 설문으로 신청을 완료해주세요</h2>
              <p className="m-0 mt-2 text-sm text-light-blue">약 30초면 충분해요. 답변은 더 나은 서비스를 만드는 데 직접 활용됩니다.</p>
              <form onSubmit={handleSurvey} className="mx-auto mt-8 max-w-md text-left space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-light-blue">직업 / 직군</label>
                  <select
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="" className="text-neutral-900">선택해주세요</option>
                    {JOB_OPTIONS.map((o) => (
                      <option key={o} value={o} className="text-neutral-900">{o}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-xs font-medium text-light-blue">주로 쓰는 서비스 (복수 선택)</label>
                  <div className="flex flex-wrap gap-2">
                    {INTEGRATIONS.map(({ name, icon }) => {
                      const checked = services.includes(name);
                      return (
                        <label
                          key={name}
                          className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors ${
                            checked
                              ? 'border-white/60 bg-white/25'
                              : 'border-white/15 bg-white/5 hover:bg-white/10'
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
                          <span className="text-xs font-medium text-white">{name}</span>
                        </label>
                      );
                    })}
                    {/* 기타 */}
                    {(() => {
                      const checked = services.includes('기타');
                      return (
                        <label
                          className={`flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 transition-colors ${
                            checked
                              ? 'border-white/60 bg-white/25'
                              : 'border-white/15 bg-white/5 hover:bg-white/10'
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
                          <span className="text-xs font-medium text-white">기타</span>
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
                  <label className="mb-1.5 block text-xs font-medium text-light-blue">연령대</label>
                  <div className="flex flex-wrap gap-2">
                    {AGE_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setAge(opt)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                          age === opt
                            ? 'border-white bg-white text-deep-blue'
                            : 'border-white/20 text-white/80 hover:border-white/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-light-blue">해결하고 싶은 문제 (선택)</label>
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
                  className="h-11 w-full cursor-pointer rounded-2xl bg-white text-sm font-semibold text-deep-blue transition-colors hover:bg-light-blue"
                >
                  신청 완료하기
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="m-0 text-xl font-bold sm:text-2xl lg:text-3xl">지금 신청하고 가장 먼저 경험하세요</h2>
              <p className="m-0 mx-auto mt-3 max-w-lg text-xs text-light-blue sm:text-sm">
                얼리액세스 신청자에게 출시 소식을 가장 먼저 전달드립니다.
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <div className="flex w-full flex-col gap-1 sm:w-80">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(''); }}
                    placeholder="이메일 주소를 입력하세요"
                    className={`h-12 w-full rounded-2xl border bg-white/10 px-4 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 ${emailError ? 'border-red-400' : 'border-white/30'}`}
                  />
                  {emailError && (
                    <p className="m-0 px-1 text-xs text-red-300">{emailError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={step === 'loading'}
                  className="h-12 w-full cursor-pointer rounded-2xl bg-white px-8 text-sm font-semibold text-deep-blue transition-colors hover:bg-light-blue disabled:opacity-70 sm:w-auto"
                >
                  {step === 'loading' ? '신청 중...' : '신청하기'}
                </button>
              </form>
              <p className="m-0 mt-4 text-xs text-light-blue/70">스팸 없이, 출시 소식만 전달드립니다.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-5 sm:flex-row lg:px-8">
        <div className="flex items-center gap-2">
          <img src={symbol} alt="" className="h-6 w-6" />
          <span className="font-logo text-lg text-deep-blue">IEUM</span>
          <span className="text-xs text-neutral-400">beta · v0.1.0</span>
        </div>
        <p className="m-0 text-xs text-neutral-400">© 2025 IEUM. All rights reserved.</p>
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
