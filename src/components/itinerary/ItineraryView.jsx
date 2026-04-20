import useTripStore from '../../store/useTripStore'
import DayCard from './DayCard'

export default function ItineraryView() {
  const { days } = useTripStore()

  return (
    <div className="space-y-3 max-w-3xl">
      <div className="flex items-center justify-between mb-2">
        <p className="text-stone-400 text-sm">Click any day to expand the full schedule. Anime spots are highlighted.</p>
      </div>
      {days.map(day => (
        <DayCard key={day.id} day={day} />
      ))}
    </div>
  )
}
