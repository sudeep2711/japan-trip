import { useState } from 'react'
import useTripStore from '../../store/useTripStore'
import TripMap from './TripMap'

export default function MapView() {
  const { days, setSelectedDay } = useTripStore()
  const [filteredDayIds, setFilteredDayIds] = useState(null)

  const handleDayClick = (dayId) => {
    if (filteredDayIds?.length === 1 && filteredDayIds[0] === dayId) {
      setFilteredDayIds(null)
      setSelectedDay(null)
    } else {
      setFilteredDayIds([dayId])
      setSelectedDay(dayId)
    }
  }

  return (
    <div className="flex flex-col gap-3" style={{ height: 'calc(100vh - 160px)' }}>
      {/* Day filter pills */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => { setFilteredDayIds(null); setSelectedDay(null) }}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            !filteredDayIds ? 'bg-rose-600 border-rose-600 text-white' : 'border-stone-700 text-stone-400 hover:border-stone-500'
          }`}
        >
          All days
        </button>
        {days.map(day => (
          <button
            key={day.id}
            onClick={() => handleDayClick(day.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
              filteredDayIds?.includes(day.id)
                ? 'bg-rose-600 border-rose-600 text-white'
                : 'border-stone-700 text-stone-400 hover:border-stone-500'
            }`}
          >
            D{day.dayNumber} {day.city}
          </button>
        ))}
      </div>

      {/* Map */}
      <div className="flex-1 rounded-xl overflow-hidden border border-stone-800">
        <TripMap filteredDayIds={filteredDayIds} />
      </div>
    </div>
  )
}
