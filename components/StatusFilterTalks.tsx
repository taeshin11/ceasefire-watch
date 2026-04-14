'use client'
import { useState } from 'react'
import TalkCard from './TalkCard'

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

const STATUSES = ['all', 'active', 'stalled', 'collapsed', 'agreed']

export default function StatusFilterTalks({ talks, locale }: { talks: Talk[]; locale: string }) {
  const [filter, setFilter] = useState('all')

  const filtered = filter === 'all' ? talks : talks.filter(t => t.status === filter)

  const counts = {
    all: talks.length,
    active: talks.filter(t => t.status === 'active').length,
    stalled: talks.filter(t => t.status === 'stalled').length,
    collapsed: talks.filter(t => t.status === 'collapsed').length,
    agreed: talks.filter(t => t.status === 'agreed').length,
  }

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUSES.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === s
                ? 'bg-emerald-600 text-white'
                : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)} ({counts[s as keyof typeof counts]})
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(talk => (
          <TalkCard key={talk.id} talk={talk} locale={locale} />
        ))}
      </div>
    </>
  )
}
