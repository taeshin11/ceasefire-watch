import Link from 'next/link'

interface Talk {
  id: string
  conflict: string
  conflict_slug: string
  status: string
  parties: string[]
  mediator: string
  mediator_flag: string
  last_meeting: string
  next_meeting: string | null
  phase: number
  phase_max: number
  phase_label: string
  notes: string
  source: string
  source_url: string
  tags: string[]
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: 'bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20',
    stalled: 'bg-amber-500/10 text-amber-600 ring-1 ring-amber-500/20',
    collapsed: 'bg-red-500/10 text-red-600 ring-1 ring-red-500/20',
    agreed: 'bg-blue-500/10 text-blue-600 ring-1 ring-blue-500/20',
  }
  const labels: Record<string, string> = {
    active: 'Active',
    stalled: 'Stalled',
    collapsed: 'Collapsed',
    agreed: 'Agreed',
  }
  const style = styles[status] ?? 'bg-slate-100 text-slate-600'
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${style}`}>
      {status === 'active' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
      {status === 'agreed' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
      {labels[status] ?? status}
    </span>
  )
}

export default function TalkCard({ talk, locale }: { talk: Talk; locale: string }) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 p-5 group">
      {/* Top: status badge + conflict name */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-slate-900 text-base leading-tight flex-1 mr-3">{talk.conflict}</h3>
        <StatusBadge status={talk.status} />
      </div>

      {/* Mediator row */}
      <div className="flex items-center gap-2 mb-3 text-sm">
        <span className="text-slate-500">Mediator:</span>
        <span className="font-semibold text-slate-800">{talk.mediator_flag} {talk.mediator}</span>
      </div>

      {/* Phase progress bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
          <span className="font-medium">{talk.phase_label}</span>
          <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Phase {talk.phase}/{talk.phase_max}</span>
        </div>
        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
            style={{ width: `${(talk.phase / talk.phase_max) * 100}%` }}
          ></div>
        </div>
      </div>

      <p className="text-sm text-slate-600 line-clamp-2 mb-3">{talk.notes}</p>

      <div className="flex items-center justify-between text-xs text-slate-400 border-t border-slate-50 pt-3">
        <span>Last: {talk.last_meeting}</span>
        <Link
          href={`/${locale}/talks/${talk.id}`}
          className="text-emerald-600 font-semibold hover:text-emerald-700 group-hover:underline transition-colors"
        >
          Details →
        </Link>
      </div>
    </div>
  )
}
