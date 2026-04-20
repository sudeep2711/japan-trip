import useTripStore from '../../store/useTripStore'
import { daysUntil, formatShortDate } from '../../utils/formatters'

export default function OverviewDashboard() {
  const { trip, nextActions, toggleNextAction, getTotalSpentJPY, budget, displayCurrency } = useTripStore()
  const days = daysUntil(trip.startDate)
  const totalSpentJPY = getTotalSpentJPY()
  const totalBudgetJPY = budget.totalBudgetJPY
  const spentPct = Math.min(100, Math.round((totalSpentJPY / totalBudgetJPY) * 100))
  const totalBudgetDisplay = displayCurrency === 'USD' ? `$${budget.totalBudgetUSD.toLocaleString()}` : `¥${budget.totalBudgetJPY.toLocaleString()}`
  const spentDisplay = displayCurrency === 'USD' ? `$${Math.round(totalSpentJPY / trip.exchangeRate)}` : `¥${totalSpentJPY.toLocaleString()}`
  const pendingActions = nextActions.filter(a => !a.done)
  const highPriority = pendingActions.filter(a => a.priority === 'high')

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="relative rounded-2xl overflow-hidden h-56">
        <img
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80"
          alt="Japan"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-950/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <div className="text-xs font-semibold text-rose-400 uppercase tracking-widest mb-2">Your Next Adventure</div>
          <h2 className="text-4xl font-bold text-white mb-2">{trip.title}</h2>
          <div className="text-stone-300 text-sm">Oct 5 – 16, 2026 • {trip.durationDays} days • {trip.origin} → Tokyo</div>
          {days > 0 && (
            <div className="mt-4">
              <span className="bg-rose-600 text-white text-sm font-bold px-4 py-2 rounded-full">
                {days} days to go ✈️
              </span>
            </div>
          )}
        </div>
      </div>

      {/* City Route */}
      <div>
        <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-3">Your Route</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {trip.cities.map((city, i) => (
            <div key={city.id} className="relative rounded-xl overflow-hidden aspect-[4/3] group cursor-pointer">
              <img src={city.image} alt={city.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <div className="text-white font-semibold text-sm">{city.name}</div>
                <div className="text-stone-400 text-xs">{city.dates} • {city.nights}n</div>
              </div>
              {i < trip.cities.length - 1 && (
                <div className="absolute top-1/2 -right-2 z-10 text-stone-500 text-xs">→</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Budget Snapshot */}
        <div className="bg-stone-900 rounded-xl p-5 border border-stone-800 md:col-span-1">
          <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Budget</h3>
          <div className="flex items-end justify-between mb-2">
            <div>
              <div className="text-2xl font-bold text-white">{spentDisplay}</div>
              <div className="text-xs text-stone-500">spent of {totalBudgetDisplay}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-emerald-400">{100 - spentPct}%</div>
              <div className="text-xs text-stone-500">remaining</div>
            </div>
          </div>
          <div className="w-full bg-stone-800 rounded-full h-2">
            <div
              className="bg-rose-500 h-2 rounded-full transition-all"
              style={{ width: `${spentPct}%` }}
            />
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-stone-400">
            <div>✈️ Flights: not booked</div>
            <div>🏨 Hotels: not booked</div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-stone-900 rounded-xl p-5 border border-stone-800 md:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest">Action Items</h3>
            <span className="text-xs text-rose-400 font-semibold">{pendingActions.length} remaining</span>
          </div>
          <div className="space-y-2">
            {nextActions.slice(0, 6).map(action => (
              <label key={action.id} className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={action.done}
                  onChange={() => toggleNextAction(action.id)}
                  className="mt-0.5 accent-rose-500"
                />
                <span className={`text-sm flex-1 ${action.done ? 'line-through text-stone-600' : 'text-stone-300'}`}>
                  {action.priority === 'high' && !action.done && (
                    <span className="text-rose-500 mr-1">!</span>
                  )}
                  {action.text}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Anime highlights */}
      <div className="bg-stone-900 rounded-xl p-5 border border-stone-800">
        <h3 className="text-xs font-semibold text-stone-500 uppercase tracking-widest mb-4">Anime Pilgrimage Highlights</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { show: 'Demon Slayer', emoji: '⚔️', color: 'rose', spots: 'Asakusa, Gion, Fushimi Inari', for: 'For your wife' },
            { show: 'Naruto', emoji: '🍥', color: 'orange', spots: 'Fuji-Q Hidden Leaf Village, Naruto Museum', for: 'For you' },
            { show: 'Bleach', emoji: '🌙', color: 'violet', spots: 'Chofu (Karakura Town), Kyoto Soul Society', for: 'For you' },
          ].map(a => (
            <div key={a.show} className={`bg-stone-800 rounded-lg p-4 border border-stone-700`}>
              <div className="text-2xl mb-2">{a.emoji}</div>
              <div className="font-semibold text-white text-sm mb-1">{a.show}</div>
              <div className="text-xs text-stone-400 mb-2">{a.spots}</div>
              <div className="text-xs text-stone-500 italic">{a.for}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
