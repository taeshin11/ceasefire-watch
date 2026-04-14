export default function PhaseProgressBar({ phase, phaseMax, label }: { phase: number; phaseMax: number; label: string }) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-xs text-slate-500 mb-1.5">
        <span className="font-medium">{label}</span>
        <span className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">Phase {phase}/{phaseMax}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full transition-all duration-1000"
          style={{ width: `${Math.round((phase / phaseMax) * 100)}%` }}
        />
      </div>
    </div>
  )
}
