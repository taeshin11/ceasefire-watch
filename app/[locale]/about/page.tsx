import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import AdHeader from '@/components/ads/AdHeader'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'About — Ceasefire Watch',
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <Link href={`/${locale}`} className="text-xl font-bold text-emerald-800 flex items-center gap-2">
            <span>🕊️</span> Ceasefire Watch
          </Link>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-3xl mx-auto px-4 py-8 prose prose-gray">
        <h1>About Ceasefire Watch</h1>
        <p>Ceasefire Watch tracks peace negotiations, ceasefire agreements, and diplomatic processes in active conflicts worldwide. We monitor the phase progress, key mediators, and latest developments.</p>
        <h2>Phase System</h2>
        <p>Negotiations are tracked across 5 phases from initial talks to implementation. Phase progress reflects the current stage of formal negotiations.</p>
        <h2>Status Definitions</h2>
        <ul>
          <li><strong>Active</strong>: Talks are currently ongoing with scheduled meetings</li>
          <li><strong>Stalled</strong>: Process is paused but not formally abandoned</li>
          <li><strong>Collapsed</strong>: Framework has broken down, no active process</li>
          <li><strong>Agreed</strong>: Agreement reached, implementation underway</li>
        </ul>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-end">
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
