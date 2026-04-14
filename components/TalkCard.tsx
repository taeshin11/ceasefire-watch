import Link from 'next/link'
import PhaseProgressBar from './PhaseProgressBar'

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

const statusStyles: Record<string, string> = {
  active: 'bg-emerald-100 text-emerald-800',
  stalled: 'bg-amber-100 text-amber-800',
  collapsed: 'bg-red-100 text-red-800',
  agreed: 'bg-blue-100 text-blue-800',
}

export default function TalkCard({ talk, locale }: { talk: Talk; locale: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <h3 className="font-bold text-gray-900">{talk.conflict}</h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {talk.parties.join(' — ')}
          </p>
        </div>
        <span className={`text-xs px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${statusStyles[talk.status] ?? 'bg-gray-100 text-gray-700'}`}>
          {talk.status.charAt(0).toUpperCase() + talk.status.slice(1)}
        </span>
      </div>

      <div className="flex items-center gap-2 mb-3 text-sm text-gray-600">
        <span>{talk.mediator_flag}</span>
        <span>Mediator: <strong>{talk.mediator}</strong></span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
        <div>
          <span className="font-medium">Last Meeting</span>
          <p className="text-gray-700">{talk.last_meeting}</p>
        </div>
        <div>
          <span className="font-medium">Next Meeting</span>
          <p className="text-gray-700">{talk.next_meeting ?? 'Not scheduled'}</p>
        </div>
      </div>

      <PhaseProgressBar phase={talk.phase} phaseMax={talk.phase_max} label={talk.phase_label} />

      <p className="text-sm text-gray-600 mt-3 mb-3 line-clamp-2">{talk.notes}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {talk.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">{tag}</span>
          ))}
        </div>
        <Link href={`/${locale}/talks/${talk.id}`} className="text-xs font-medium text-blue-600 hover:underline whitespace-nowrap">
          Details →
        </Link>
      </div>
    </div>
  )
}
