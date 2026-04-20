import useTripStore from '../../store/useTripStore'
import { daysUntil } from '../../utils/formatters'

export default function Header({ title }) {
  const { trip, displayCurrency, toggleCurrency } = useTripStore()
  const days = daysUntil(trip.startDate)

  return (
    <header className="sticky top-0 z-30 bg-stone-950/90 backdrop-blur border-b border-stone-800 px-4 md:px-6 py-3 flex items-center justify-between">
      <h1 className="text-base font-semibold text-white">{title}</h1>
      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden sm:block text-sm text-stone-400">
          {days > 0
            ? <span><span className="text-white font-bold">{days}</span> days to Tokyo ✈️</span>
            : <span className="text-rose-400 font-semibold">Trip time! 🎉</span>
          }
        </div>
        <button
          onClick={toggleCurrency}
          className="text-xs px-3 py-1.5 rounded-full border border-stone-700 text-stone-300 hover:border-rose-500 hover:text-rose-400 transition-colors"
        >
          {displayCurrency === 'USD' ? '¥ JPY' : '$ USD'}
        </button>
      </div>
    </header>
  )
}
