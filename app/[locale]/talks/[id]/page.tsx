import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import PhaseProgressBar from '@/components/PhaseProgressBar'
import AdHeader from '@/components/ads/AdHeader'
import AdInContent from '@/components/ads/AdInContent'
import AdMobileSticky from '@/components/ads/AdMobileSticky'
import VisitorCounter from '@/components/VisitorCounter'
import Link from 'next/link'
import talks from '@/public/data/talks.json'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    talks.map((t) => ({ locale, id: t.id }))
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const talk = talks.find(t => t.id === id)
  if (!talk) return {}
  return {
    title: `${talk.conflict} Peace Talks — Ceasefire Watch`,
    description: talk.notes,
  }
}

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  stalled: 'bg-amber-100 text-amber-800',
  collapsed: 'bg-red-100 text-red-800',
  agreed: 'bg-blue-100 text-blue-800',
}

export default async function TalkDetailPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { locale, id } = await params
  setRequestLocale(locale)
  const talk = talks.find(t => t.id === id)
  if (!talk) notFound()

  return (
    <>
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold text-emerald-800 flex items-center gap-2">
            <span>🕊️</span> Ceasefire Watch
          </Link>
        </div>
      </header>
      <AdHeader />
      <main className="max-w-3xl mx-auto px-4 py-8">
        <Link href={`/${locale}`} className="text-sm text-blue-600 hover:underline mb-4 inline-block">← Back to all talks</Link>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{talk.conflict}</h1>
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${statusStyles[talk.status]}`}>
              {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <span className="text-gray-500">Parties</span>
              <p className="font-medium">{talk.parties.join(' — ')}</p>
            </div>
            <div>
              <span className="text-gray-500">Mediator</span>
              <p className="font-medium">{talk.mediator_flag} {talk.mediator}</p>
            </div>
            <div>
              <span className="text-gray-500">Last Meeting</span>
              <p className="font-medium">{talk.last_meeting}</p>
            </div>
            <div>
              <span className="text-gray-500">Next Meeting</span>
              <p className="font-medium">{talk.next_meeting ?? 'Not scheduled'}</p>
            </div>
          </div>

          <PhaseProgressBar phase={talk.phase} phaseMax={talk.phase_max} label={talk.phase_label} />
        </div>

        <AdInContent />

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-semibold mb-3">Notes</h2>
          <p className="text-gray-700">{talk.notes}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold mb-3">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {talk.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">{tag}</span>
            ))}
          </div>
          <div className="mt-4 text-sm">
            <a href={talk.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              Source: {talk.source}
            </a>
          </div>
        </div>
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
