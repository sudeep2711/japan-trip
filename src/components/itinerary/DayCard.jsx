import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import ActivityItem from './ActivityItem'
import { formatDate } from '../../utils/formatters'
import useTripStore from '../../store/useTripStore'

export default function DayCard({ day }) {
  const [open, setOpen] = useState(false)
  const { formatAmount } = useTripStore()
  const totalCost = day.activities.reduce((s, a) => s + (a.costJPY || 0), 0)
  const animeCount = day.activities.filter(a => a.animeTag).length

  return (
    <div className="bg-stone-900 rounded-xl overflow-hidden border border-stone-800 hover:border-stone-700 transition-colors">
      {/* Day Header with image */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full text-left"
      >
        <div className="relative h-28 overflow-hidden">
          <img src={day.image} alt={day.city} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/95 via-stone-950/60 to-transparent" />
          <div className="absolute inset-0 flex items-center px-5 justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded">
                  Day {day.dayNumber}
                </span>
                <span className="text-xs text-stone-400">{formatDate(day.date, 'EEE, MMM d')}</span>
                {animeCount > 0 && (
                  <span className="text-xs bg-violet-500/20 border border-violet-500/30 text-violet-300 px-2 py-0.5 rounded">
                    ⚔️ {animeCount} anime spot{animeCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
              <div className="text-lg font-bold text-white">{day.city}</div>
              <div className="text-sm text-stone-300">{day.theme}</div>
            </div>
            <div className="flex items-center gap-4 text-right">
              <div>
                <div className="text-xs text-stone-500">Est. cost</div>
                <div className="text-sm font-semibold text-white">{formatAmount(totalCost)}</div>
              </div>
              <div className="text-stone-400">
                {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>
          </div>
        </div>
      </button>

      {/* Activities */}
      {open && (
        <div className="px-5 pt-4 pb-2">
          {day.activities.map((activity, i) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isLast={i === day.activities.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
