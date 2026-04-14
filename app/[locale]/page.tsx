import { setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import AdHeader from '@/components/ads/AdHeader'
import AdInContent from '@/components/ads/AdInContent'
import AdSidebar from '@/components/ads/AdSidebar'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import talks from '@/public/data/talks.json'
import type { Metadata } from 'next'
import StatusFilterTalks from '@/components/StatusFilterTalks'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata: Metadata = {
  title: 'Ceasefire Watch — Peace Negotiations Tracker',
  description: 'Track ongoing and stalled peace negotiations worldwide.',
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-emerald-800 flex items-center gap-2">
            <span>🕊️</span> Ceasefire Watch
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
            <Link href={`/${locale}`} className="hover:text-gray-900">Home</Link>
            <Link href={`/${locale}/about`} className="hover:text-gray-900">About</Link>
          </nav>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Ceasefire Watch</h1>
          <p className="text-gray-500 mt-1">Peace Negotiations Tracker</p>
        </div>
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            <AdInContent />
            <StatusFilterTalks talks={talks as any} locale={locale} />
          </div>
          <aside className="hidden xl:block w-[300px] flex-shrink-0">
            <AdSidebar />
          </aside>
        </div>
      </main>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 flex items-center justify-between">
          <p className="text-xs text-gray-400">Monitoring global peace negotiations</p>
          <VisitorCounter />
        </div>
      </footer>
      <AdMobileSticky />
    </>
  )
}
