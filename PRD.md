# Ceasefire Watch — PRD
**Subtitle:** Negotiations, Talks, and Truce Signals
**Version:** 1.0 | **Date:** 2026-04-14 | **Status:** Ready for Development

---

## Overview

Ceasefire Watch is a public dashboard tracking active and recent ceasefire negotiations, peace talks, and truce agreements across ongoing global conflicts. The site surfaces negotiation schedules, mediating countries, agreement phase progress bars, and recent statement summaries. It is designed to capture large traffic spikes during major news events (ceasefires announced, talks collapse, deals signed).

### Target Users
- News readers wanting context behind headlines ("Is there a ceasefire deal yet?")
- Journalists needing a quick reference for negotiation timelines
- Students and researchers studying conflict resolution
- Policy-aware citizens following specific conflicts (Ukraine, Gaza, Sudan, etc.)
- Social media sharers amplifying conflict coverage

### Core Value Proposition
One page answers: "Where are talks right now?" with phase progress, key parties, mediator identity, and the last statement — all cited and dated.

---

## Tech Stack

| Layer | Tool | Cost |
|---|---|---|
| Framework | Next.js 14 (App Router) | Free |
| Styling | Tailwind CSS | Free |
| i18n | next-intl | Free |
| Data | JSON files + Google Sheets | Free |
| Hosting | Vercel (Hobby) | Free |
| Analytics / Visitor Counter | Google Sheets webhook | Free |
| Ads | Adsterra | Revenue |
| Repo | GitHub + gh CLI | Free |

---

## Pages & Routes

```
/                          → Home: hero + active negotiations grid
/talks/[id]                → Detail page per negotiation (SSG)
/conflict/[slug]           → All talks for one conflict
/statements                → Recent statements feed
/about                     → Methodology & source policy
/sitemap.xml               → Auto-generated
/robots.txt                → Static
/api/visit                 → POST visitor data to Google Sheets
```

---

## Data Model

### `public/data/talks.json`
```json
[
  {
    "id": "ukraine-russia-2025-istanbul",
    "conflict": "Ukraine-Russia War",
    "conflict_slug": "ukraine-russia",
    "status": "active",
    "parties": ["Ukraine", "Russia"],
    "mediator": "Turkey",
    "mediator_flag": "🇹🇷",
    "last_meeting": "2025-03-18",
    "next_meeting": "2025-04-02",
    "phase": 2,
    "phase_max": 5,
    "phase_label": "Technical Subcommittees",
    "notes": "Prisoner exchange framework agreed; territorial questions deferred",
    "source": "Reuters",
    "source_url": "https://reuters.com/...",
    "tags": ["territorial", "prisoner-exchange", "istanbul-process"]
  }
]
```

### `public/data/statements.json`
```json
[
  {
    "id": "stmt-001",
    "talk_id": "ukraine-russia-2025-istanbul",
    "date": "2025-03-20",
    "speaker": "Turkish Foreign Ministry",
    "quote": "Both parties remain committed to the technical framework.",
    "source": "Anadolu Agency",
    "source_url": "https://...",
    "sentiment": "positive"
  }
]
```

### Google Sheets: `CeasefireWatch_Visits`
| Column | Description |
|---|---|
| timestamp | ISO datetime |
| page | URL path |
| country | Geo from Vercel header |
| referrer | document.referrer |
| ua_short | Browser family |

---

## Key Components

### PhaseProgressBar
```tsx
// components/PhaseProgressBar.tsx
interface Props {
  phase: number;
  phaseMax: number;
  phaseLabel: string;
}

export function PhaseProgressBar({ phase, phaseMax, phaseLabel }: Props) {
  const pct = Math.round((phase / phaseMax) * 100);
  return (
    <div className="mt-3">
      <div className="flex justify-between text-xs text-slate-500 mb-1">
        <span>{phaseLabel}</span>
        <span>Phase {phase}/{phaseMax}</span>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
```

### TalkCard
```tsx
// components/TalkCard.tsx
import { PhaseProgressBar } from './PhaseProgressBar';

export function TalkCard({ talk }: { talk: Talk }) {
  const statusColor = {
    active: 'bg-emerald-100 text-emerald-800',
    stalled: 'bg-amber-100 text-amber-800',
    collapsed: 'bg-red-100 text-red-800',
    agreed: 'bg-blue-100 text-blue-800',
  }[talk.status];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-slate-800 text-sm leading-tight">
          {talk.conflict}
        </h3>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor}`}>
          {talk.status}
        </span>
      </div>
      <p className="text-xs text-slate-500 mb-1">
        Mediator: <span className="font-medium text-slate-700">{talk.mediator_flag} {talk.mediator}</span>
      </p>
      <p className="text-xs text-slate-500 mb-3">
        Last meeting: <span className="font-medium">{talk.last_meeting}</span>
      </p>
      <PhaseProgressBar phase={talk.phase} phaseMax={talk.phase_max} phaseLabel={talk.phase_label} />
      <p className="mt-3 text-xs text-slate-600 line-clamp-2">{talk.notes}</p>
      <a
        href={`/talks/${talk.id}`}
        className="mt-3 inline-block text-xs text-emerald-700 font-medium hover:underline"
      >
        Full detail →
      </a>
    </div>
  );
}
```

---

## Milestones & Git Push Points

### Milestone 0 — Repo & Scaffold
```bash
gh repo create ceasefire-watch --public --clone
cd ceasefire-watch
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
npm install next-intl
mkdir -p public/data research_history
touch feature_list.json claude-progress.txt
git add -A && git commit -m "M0: scaffold + deps" && git push
```
**research_history/M0.md:** Project setup decisions, stack rationale.

### Milestone 1 — Data Layer & Types
```bash
# Create public/data/talks.json (5 real entries)
# Create public/data/statements.json
# Create types/index.ts
git add -A && git commit -m "M1: data files + TypeScript types" && git push
```
**research_history/M1.md:** Data sources referenced, schema decisions.

### Milestone 2 — Home Page Grid
```bash
# Build app/page.tsx, TalkCard, PhaseProgressBar
# Implement status badge colors
# Mobile-first grid: 1col -> 2col -> 3col
git add -A && git commit -m "M2: home page talks grid" && git push
```
**research_history/M2.md:** Layout decisions, color system.

### Milestone 3 — Detail Pages & Statement Feed
```bash
# app/talks/[id]/page.tsx — SSG with generateStaticParams
# app/statements/page.tsx — chronological feed
# Sentiment badge (positive/neutral/negative)
git add -A && git commit -m "M3: detail pages + statements feed" && git push
```
**research_history/M3.md:** SSG strategy, revalidation timing.

### Milestone 4 — i18n (next-intl)
```bash
npm install next-intl
# messages/en.json, ko.json, ja.json, zh.json, es.json, fr.json, de.json, pt.json
# middleware.ts — locale detection
# next.config.js — withNextIntl
git add -A && git commit -m "M4: i18n 8 languages" && git push
```
**research_history/M4.md:** Translation keys, locale routing decisions.

### Milestone 5 — Visitor Counter + Google Sheets Webhook
```bash
# app/api/visit/route.ts
# middleware.ts — auto-POST on every page load
# Footer visitor counter component
git add -A && git commit -m "M5: visitor counter + sheets webhook" && git push
```
**research_history/M5.md:** Sheets API setup, CORS handling.

### Milestone 6 — SEO & Sitemap
```bash
# app/sitemap.ts
# app/robots.ts
# Metadata per page (generateMetadata)
# JSON-LD structured data
git add -A && git commit -m "M6: SEO sitemap metadata structured data" && git push
```
**research_history/M6.md:** Keyword targeting, meta description templates.

### Milestone 7 — Ads Integration
```bash
# components/AdBanner.tsx (header 728x90)
# components/AdSidebar.tsx (300x250)
# components/AdInContent.tsx (336x280)
# components/AdMobileSticky.tsx (320x50 fixed bottom)
git add -A && git commit -m "M7: Adsterra ad placeholders" && git push
```
**research_history/M7.md:** Ad placement rationale, CLS mitigation.

### Milestone 8 — QA & Launch
```bash
vercel --prod
git add -A && git commit -m "M8: production launch" && git push
```
**research_history/M8.md:** QA checklist results, Lighthouse scores.

---

## Agent Team

### Frontend Agent
- Builds all React components and pages
- Implements Tailwind responsive layouts (mobile-first)
- Handles PhaseProgressBar, TalkCard, StatementCard
- Owns: `app/`, `components/`

### Backend/Data Agent
- Maintains `public/data/talks.json` and `statements.json`
- Implements `app/api/visit/route.ts`
- Manages Google Sheets webhook integration
- Owns: `public/data/`, `app/api/`, `lib/sheets.ts`

### SEO/Content Agent
- Writes `generateMetadata` for each page
- Creates `messages/*.json` translation files
- Builds `sitemap.ts`, `robots.ts`
- Writes JSON-LD structured data blocks
- Owns: `messages/`, `app/sitemap.ts`, `app/robots.ts`

### QA Agent
- Runs Lighthouse on each milestone
- Tests all 8 locales for broken strings
- Validates mobile layout at 375px, 768px, 1280px
- Checks all ad placeholders have correct dimensions
- Owns: `research_history/` QA notes

---

## Harness Files

### `feature_list.json`
```json
{
  "project": "ceasefire-watch",
  "features": [
    { "id": "home-grid", "status": "pending", "agent": "frontend" },
    { "id": "talk-detail", "status": "pending", "agent": "frontend" },
    { "id": "statements-feed", "status": "pending", "agent": "frontend" },
    { "id": "phase-progress", "status": "pending", "agent": "frontend" },
    { "id": "data-talks", "status": "pending", "agent": "data" },
    { "id": "data-statements", "status": "pending", "agent": "data" },
    { "id": "visitor-api", "status": "pending", "agent": "data" },
    { "id": "sheets-webhook", "status": "pending", "agent": "data" },
    { "id": "i18n-8langs", "status": "pending", "agent": "seo" },
    { "id": "sitemap", "status": "pending", "agent": "seo" },
    { "id": "metadata", "status": "pending", "agent": "seo" },
    { "id": "ads-adsterra", "status": "pending", "agent": "frontend" },
    { "id": "qa-lighthouse", "status": "pending", "agent": "qa" }
  ]
}
```

### `claude-progress.txt`
```
SESSION START: [date]
CURRENT_MILESTONE: 0
LAST_COMMIT: initial scaffold
NEXT_ACTION: create data files
BLOCKERS: none
```

### Session Startup Prompt (paste at each new session)
```
Read claude-progress.txt and feature_list.json.
Resume from CURRENT_MILESTONE.
Project: Ceasefire Watch (ceasefire-watch).
Stack: Next.js 14, Tailwind, next-intl, Vercel.
After each milestone: git add -A && git commit -m "..." && git push
Update claude-progress.txt after every commit.
```

---

## Ads Integration (Adsterra)

### Header Banner — 728x90 (desktop) / 320x50 (mobile)
```tsx
// components/AdBanner.tsx
export function AdBanner() {
  return (
    <div className="flex justify-center py-2 bg-slate-50 border-b border-slate-100">
      <div className="w-[728px] h-[90px] bg-slate-200 flex items-center justify-center text-slate-400 text-xs rounded hidden md:flex">
        {/* Adsterra 728x90 script here */}
        AD BANNER 728×90
      </div>
      <div className="w-[320px] h-[50px] bg-slate-200 flex items-center justify-center text-slate-400 text-xs rounded md:hidden">
        {/* Adsterra 320x50 script here */}
        AD BANNER 320×50
      </div>
    </div>
  );
}
```

### Sidebar — 300x250
```tsx
// components/AdSidebar.tsx
export function AdSidebar() {
  return (
    <div className="w-[300px] h-[250px] bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs">
      {/* Adsterra 300x250 script here */}
      AD 300×250
    </div>
  );
}
```

### In-Content — 336x280 (between talk cards)
```tsx
// components/AdInContent.tsx
export function AdInContent() {
  return (
    <div className="mx-auto w-[336px] h-[280px] bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-xs my-6">
      {/* Adsterra 336x280 script here */}
      AD IN-CONTENT 336×280
    </div>
  );
}
```

### Mobile Sticky — 320x50 fixed bottom
```tsx
// components/AdMobileSticky.tsx
export function AdMobileSticky() {
  return (
    <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50 md:hidden pb-safe">
      <div className="w-[320px] h-[50px] bg-white shadow-lg border-t border-slate-200 flex items-center justify-center text-slate-400 text-xs">
        {/* Adsterra 320x50 sticky script here */}
        AD STICKY 320×50
      </div>
    </div>
  );
}
```

---

## Google Sheets Webhook

### `lib/sheets.ts`
```ts
const SHEET_WEBHOOK_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL!;

export async function logVisit(data: {
  page: string;
  country: string;
  referrer: string;
}) {
  try {
    await fetch(SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...data,
      }),
    });
  } catch {
    // Silent fail — never block page render
  }
}
```

### `app/api/visit/route.ts`
```ts
import { NextRequest, NextResponse } from 'next/server';
import { logVisit } from '@/lib/sheets';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const country = req.headers.get('x-vercel-ip-country') ?? 'unknown';
  await logVisit({ page: body.page, country, referrer: body.referrer ?? '' });
  return NextResponse.json({ ok: true });
}
```

### `middleware.ts` — auto-fire on every request
```ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  // Fire-and-forget visit log
  if (!req.nextUrl.pathname.startsWith('/api')) {
    fetch(`${req.nextUrl.origin}/api/visit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        page: req.nextUrl.pathname,
        referrer: req.headers.get('referer') ?? '',
      }),
    }).catch(() => {});
  }
  return res;
}

export const config = {
  matcher: ['/((?!_next|favicon).*)'],
};
```

---

## Visitor Counter

### `components/VisitorCounter.tsx`
```tsx
'use client';
import { useEffect, useState } from 'react';

export function VisitorCounter() {
  const [counts, setCounts] = useState({ today: 0, total: 0 });

  useEffect(() => {
    fetch('/api/visit-count')
      .then(r => r.json())
      .then(setCounts)
      .catch(() => {});
  }, []);

  return (
    <div className="flex gap-4 text-xs text-slate-400">
      <span>Today: <strong className="text-slate-600">{counts.today.toLocaleString()}</strong></span>
      <span>Total: <strong className="text-slate-600">{counts.total.toLocaleString()}</strong></span>
    </div>
  );
}
```

Place in `app/layout.tsx` footer:
```tsx
<footer className="bg-slate-50 border-t border-slate-100 py-6 mt-12">
  <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
    <p className="text-xs text-slate-400">© 2026 Ceasefire Watch. Data is for informational purposes only.</p>
    <VisitorCounter />
  </div>
</footer>
```

---

## SEO Strategy

### Target Keywords
| Keyword | Intent | Page |
|---|---|---|
| ceasefire negotiations tracker | Informational | Home |
| ukraine peace talks 2025 | Informational | /conflict/ukraine-russia |
| gaza ceasefire deal | Breaking news | /conflict/israel-hamas |
| peace talks mediator | Informational | /talks/[id] |
| ceasefire agreement phases | Informational | /talks/[id] |

### `app/sitemap.ts`
```ts
import { MetadataRoute } from 'next';
import talks from '@/public/data/talks.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const talkRoutes = talks.map(t => ({
    url: `https://ceasefire.watch/talks/${t.id}`,
    lastModified: t.last_meeting,
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));
  return [
    { url: 'https://ceasefire.watch', lastModified: new Date(), priority: 1.0 },
    { url: 'https://ceasefire.watch/statements', lastModified: new Date(), priority: 0.7 },
    ...talkRoutes,
  ];
}
```

### JSON-LD per Talk Detail Page
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: `${talk.conflict} — Ceasefire Negotiations Status`,
      dateModified: talk.last_meeting,
      publisher: { '@type': 'Organization', name: 'Ceasefire Watch' },
      description: talk.notes,
    }),
  }}
/>
```

### `app/robots.ts`
```ts
export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/api/' },
    sitemap: 'https://ceasefire.watch/sitemap.xml',
  };
}
```

---

## i18n Setup (next-intl)

### Locale Configuration
```ts
// i18n.ts
export const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'] as const;
export const defaultLocale = 'en';
```

### `messages/en.json` (sample keys)
```json
{
  "nav": {
    "home": "Home",
    "statements": "Statements",
    "about": "About"
  },
  "status": {
    "active": "Active",
    "stalled": "Stalled",
    "collapsed": "Collapsed",
    "agreed": "Agreed"
  },
  "card": {
    "mediator": "Mediator",
    "lastMeeting": "Last meeting",
    "nextMeeting": "Next meeting",
    "phase": "Phase",
    "fullDetail": "Full detail"
  },
  "footer": {
    "today": "Today",
    "total": "Total visitors",
    "disclaimer": "Data is for informational purposes only."
  },
  "home": {
    "title": "Ceasefire Watch",
    "subtitle": "Tracking negotiations, talks, and truce signals worldwide",
    "activeNegotiations": "Active Negotiations",
    "allTalks": "All Talks"
  }
}
```

### Middleware locale detection
```ts
// middleware.ts (combined with visit logger)
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed',
});
```

---

## Cost Analysis

| Item | Monthly Cost |
|---|---|
| Vercel Hobby | $0 |
| GitHub | $0 |
| Google Sheets (via Apps Script) | $0 |
| Domain (optional) | ~$12/yr |
| Adsterra revenue | +$5–$50/mo depending on traffic |
| **Total** | **$0 (+ optional domain)** |

---

## Environment Variables (`.env.local`)
```
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_SITE_URL=https://ceasefire.watch
```

---

## Launch Checklist

- [ ] `gh repo create ceasefire-watch --public`
- [ ] All 5 real talk entries in `talks.json`
- [ ] All 8 `messages/*.json` files complete
- [ ] `GOOGLE_SHEETS_WEBHOOK_URL` set in Vercel env
- [ ] `vercel --prod` runs without error
- [ ] Lighthouse Performance > 85
- [ ] Lighthouse SEO = 100
- [ ] All ad placeholders visible in dev
- [ ] Visitor counter increments on page load
- [ ] Sitemap accessible at `/sitemap.xml`
- [ ] `robots.txt` accessible
- [ ] Mobile layout tested at 375px
- [ ] All locale routes return 200
- [ ] `research_history/` folder has notes for each milestone
- [ ] `claude-progress.txt` updated to M8
