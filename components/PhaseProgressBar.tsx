export default function PhaseProgressBar({ phase, phaseMax, label }: { phase: number; phaseMax: number; label: string }) {
  const pct = Math.round((phase / phaseMax) * 100)
  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-500">Phase {phase}/{phaseMax}</span>
        <span className="text-xs text-gray-600 font-medium">{label}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-emerald-500 h-2 rounded-full transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
