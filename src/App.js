import { useState } from 'react';
import { ArrowRight, MessageSquare, Link2, BarChart3, Zap, CheckCircle2 } from 'lucide-react';
import './App.css';
import symbol from './assets/symbol.png';
import slack from './assets/serviceIcon/slack.png';
import github from './assets/serviceIcon/github.png';
import notion from './assets/serviceIcon/notion.png';
import openai from './assets/serviceIcon/openai.png';
import gmail from './assets/serviceIcon/gmail.png';
import discord from './assets/serviceIcon/discord.png';
import googleDrive from './assets/serviceIcon/googledrive.png';
import googleSheets from './assets/serviceIcon/googlesheets.png';
import airtable from './assets/serviceIcon/airtable.png';
import jira from './assets/serviceIcon/jira.png';
import linear from './assets/serviceIcon/linear.png';
import webhook from './assets/serviceIcon/webhook.png';

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
  { name: 'OpenAI', icon: openai },
  { name: 'Gmail', icon: gmail },
  { name: 'Discord', icon: discord },
  { name: 'Google Drive', icon: googleDrive },
  { name: 'Google Sheets', icon: googleSheets },
  { name: 'Airtable', icon: airtable },
  { name: 'Jira', icon: jira },
  { name: 'Linear', icon: linear },
  { name: 'Webhook', icon: webhook },
];

const PAIN_POINTS = [
  {
    emoji: '⚙️',
    title: '자동화 도구가 너무 복잡해요',
    desc: 'Zapier, n8n, Make... 설정 UI를 익히는 데만 몇 시간이 걸립니다.',
  },
  {
    emoji: '👨‍💻',
    title: '결국 개발자에게 맡겨야 해요',
    desc: '조금만 복잡해지면 코딩 없이는 불가능합니다.',
  },
  {
    emoji: '🔄',
    title: '서비스마다 따로 설정해야 해요',
    desc: 'Slack은 여기서, Notion은 저기서. 연동할 때마다 새로 배워야 합니다.',
  },
];

const FEATURES = [
  {
    icon: MessageSquare,
    title: '자연어로 워크플로우 생성',
    desc: '"슬랙 DM 오면 팀 채널에 요약 올려줘"라고 입력하면 AI가 즉시 워크플로우를 구성합니다.',
  },
  {
    icon: Link2,
    title: '주요 서비스 원클릭 연동',
    desc: 'Slack, GitHub, Notion, Gmail, Discord를 OAuth 한 번으로 바로 연결합니다.',
  },
  {
    icon: BarChart3,
    title: '실행 현황 실시간 모니터링',
    desc: '성공률, 실행 횟수, 오류 내역을 한 화면에서 파악합니다.',
  },
];

const COMPARISONS = [
  { vs: '타 글로벌 자동화 툴', them: '복잡한 UI에서 트리거·액션을 직접 설정', us: '말로 설명하면 AI가 구성' },
  { vs: '타 오픈소스 솔루션', them: '직접 서버를 설치하고 유지보수', us: '설치 없이 즉시 사용' },
  { vs: '직접 개발', them: '수십 줄 코드 + 지속적인 유지보수', us: '한 문장으로 완성, 수정도 말로' },
];

const PLANS = [
  {
    name: 'Free',
    price: '무료',
    period: '',
    features: ['워크플로우 3개', '월 500회 실행', '기본 연동 5개'],
    cta: '무료로 시작',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '₩9,900',
    period: '/ 월',
    badge: '인기',
    features: ['워크플로우 무제한', '월 10,000회 실행', '연동 무제한', '실행 모니터링'],
    cta: 'Pro 플랜 신청',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: '별도 문의',
    period: '',
    features: ['모든 기능 포함', '전용 고객 지원', 'SLA 보장', '맞춤 연동 개발'],
    cta: '문의하기',
    highlight: false,
  },
];

const JOB_OPTIONS = ['개발자', '기획자 / PM', '마케터', '디자이너', '대표 / 창업자', '학생', '기타'];
const AGE_OPTIONS = ['10대', '20대', '30대', '40대', '50대 이상'];

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
          <a href="#pricing" className="text-sm font-medium text-neutral-600 transition-colors hover:text-main-blue">가격</a>
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

/* ─── Pain Points ───────────────────────────────────────── */
function PainPoints() {
  return (
    <section className="border-t border-neutral-100 bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-12 text-center">
          <p className="m-0 text-xs font-semibold uppercase tracking-wider text-main-blue">Pain Points</p>
          <h2 className="m-0 mt-2 text-2xl font-bold text-deep-blue sm:text-3xl">매번 같은 문제를 겪고 계신가요?</h2>
          <p className="m-0 mt-3 text-sm text-neutral-600">반복 업무 자동화, 생각보다 훨씬 어렵습니다.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {PAIN_POINTS.map(({ emoji, title, desc }) => (
            <div key={title} className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm">
              <span className="text-3xl">{emoji}</span>
              <h3 className="m-0 mt-4 text-base font-semibold text-neutral-900">{title}</h3>
              <p className="m-0 mt-2 text-sm text-neutral-500">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Features ──────────────────────────────────────────── */
function Features() {
  return (
    <section id="features" className="border-t border-neutral-100 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="m-0 text-xs font-semibold uppercase tracking-wider text-main-blue">Features</p>
          <h2 className="m-0 mt-2 text-2xl font-bold text-deep-blue sm:text-3xl">자연어 하나로 모든 게 연결됩니다</h2>
          <p className="m-0 mt-3 text-sm text-neutral-600">AI가 의도를 파악하고 워크플로우를 자동으로 구성합니다.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <article key={title} className="flex flex-col gap-4 rounded-2xl border border-neutral-200 bg-white p-6 transition-shadow hover:shadow-md">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-light-blue text-main-blue">
                <Icon size={22} />
              </span>
              <div>
                <h3 className="m-0 text-base font-semibold text-neutral-900">{title}</h3>
                <p className="m-0 mt-1.5 text-sm text-neutral-500">{desc}</p>
              </div>
            </article>
          ))}
        </div>

        {/* 연동 서비스 마퀴 */}
        <div className="mt-16 overflow-hidden rounded-2xl bg-deep-blue py-10 text-center">
          <h3 className="m-0 text-lg font-semibold text-white">자주 쓰는 도구와 바로 연결</h3>
          <p className="m-0 mt-1 text-sm text-light-blue">더 많은 연동이 계속 추가됩니다.</p>
          <div className="relative mt-6 overflow-hidden">
            {/* 좌우 페이드 마스크 */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-deep-blue to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-deep-blue to-transparent" />
            <div className="marquee-track">
              {[...INTEGRATIONS, ...INTEGRATIONS].map(({ name, icon }, i) => (
                <div
                  key={i}
                  className="mx-2 flex shrink-0 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5"
                >
                  <img src={icon} alt="" className="h-7 w-7 object-contain" />
                  <span className="text-sm font-semibold text-white">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Differentiators ───────────────────────────────────── */
function Differentiators() {
  return (
    <section className="border-t border-neutral-100 bg-neutral-50 py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-12 text-center">
          <p className="m-0 text-xs font-semibold uppercase tracking-wider text-main-blue">Why IEUM</p>
          <h2 className="m-0 mt-2 text-2xl font-bold text-deep-blue sm:text-3xl">기존 도구와 무엇이 다른가요?</h2>
        </div>
        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500">비교 대상</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-neutral-500">기존 방식</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-main-blue">IEUM</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map(({ vs, them, us }, i) => (
                <tr key={vs} className={i < COMPARISONS.length - 1 ? 'border-b border-neutral-100' : ''}>
                  <td className="px-6 py-4 font-semibold text-neutral-700">{vs}</td>
                  <td className="px-6 py-4 text-neutral-500">{them}</td>
                  <td className="px-6 py-4 font-semibold text-main-blue">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ─── Pricing ───────────────────────────────────────────── */
function Pricing({ onSelectPlan }) {
  return (
    <section id="pricing" className="border-t border-neutral-100 bg-white py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-12 text-center">
          <p className="m-0 text-xs font-semibold uppercase tracking-wider text-main-blue">Pricing</p>
          <h2 className="m-0 mt-2 text-2xl font-bold text-deep-blue sm:text-3xl">출시 가격 미리 보기</h2>
          <p className="m-0 mt-3 text-sm text-neutral-600">얼리액세스 신청자는 6개월간 50% 할인 혜택을 드립니다.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-3">
          {PLANS.map(({ name, price, period, badge, features, cta, highlight }) => (
            <div
              key={name}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                highlight
                  ? 'border-main-blue bg-gradient-to-b from-light-blue/50 to-white shadow-lg'
                  : 'border-neutral-200 bg-white'
              }`}
            >
              {badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-main-blue px-3 py-0.5 text-xs font-semibold text-white">
                  {badge}
                </span>
              )}
              <p className="m-0 text-sm font-semibold text-neutral-500">{name}</p>
              <div className="mt-2 flex items-end gap-1">
                <span className="text-3xl font-bold text-neutral-900">{price}</span>
                {period && <span className="mb-1 text-sm text-neutral-400">{period}</span>}
              </div>
              <ul className="m-0 mt-5 flex-1 list-none space-y-2 p-0">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-neutral-600">
                    <CheckCircle2 size={14} className="shrink-0 text-main-blue" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onSelectPlan(name)}
                className={`mt-6 h-11 w-full cursor-pointer rounded-2xl text-sm font-semibold transition-colors ${
                  highlight
                    ? 'bg-main-blue text-white hover:bg-deep-blue'
                    : 'border border-neutral-200 bg-white text-neutral-700 hover:border-main-blue hover:text-main-blue'
                }`}
              >
                {cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Email CTA ─────────────────────────────────────────── */
function EmailCta({ selectedPlan }) {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('idle'); // idle | loading | survey | done
  const [job, setJob] = useState('');
  const [services, setServices] = useState([]);
  const [serviceEtc, setServiceEtc] = useState('');
  const [age, setAge] = useState('');
  const [reason, setReason] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
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
              <h2 className="m-0 text-2xl font-bold sm:text-3xl">지금 신청하고 가장 먼저 경험하세요</h2>
              <p className="m-0 mx-auto mt-3 max-w-lg text-sm text-light-blue">
                얼리액세스 신청자에게 출시 전 무료 플랜 3개월을 드립니다.
                {selectedPlan && (
                  <span className="ml-2 rounded-full bg-white/20 px-2 py-0.5 text-xs font-semibold">
                    {selectedPlan} 플랜 선택됨
                  </span>
                )}
              </p>
              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="이메일 주소를 입력하세요"
                  className="h-12 w-full max-w-sm rounded-2xl border border-white/30 bg-white/10 px-4 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 sm:w-80"
                />
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
  const [selectedPlan, setSelectedPlan] = useState('');

  function handleSelectPlan(plan) {
    setSelectedPlan(plan);
    document.getElementById('cta').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <Nav />
      <main>
        <Hero />
        <PainPoints />
        <Features />
        <Differentiators />
        <Pricing onSelectPlan={handleSelectPlan} />
        <EmailCta selectedPlan={selectedPlan} />
      </main>
      <Footer />
    </div>
  );
}
