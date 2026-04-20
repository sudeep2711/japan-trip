import useTripStore from '../../store/useTripStore'
import { MapPin, ExternalLink, Star, Calendar } from 'lucide-react'

export default function AnimeView() {
  const { animeShows, days } = useTripStore()

  const getDayLabel = (dayId) => {
    if (!dayId) return null
    const day = days.find(d => d.id === dayId)
    return day ? `Day ${day.dayNumber} — ${day.city}` : null
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <p className="text-stone-400 text-sm">Your personal anime pilgrimage guide — real locations that inspired Demon Slayer, Naruto, and Bleach.</p>

      {animeShows.map(show => (
        <div key={show.id}>
          {/* Show header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-1 w-6 rounded-full" style={{ background: show.color }} />
            <h2 className="text-xl font-bold text-white">{show.name}</h2>
            <span className="text-xs px-2 py-1 rounded-full text-stone-400 bg-stone-800 border border-stone-700">
              For {show.forWho}
            </span>
          </div>
          <p className="text-sm text-stone-400 mb-4">{show.description}</p>

          {/* Spots grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {show.spots.map(spot => (
              <div
                key={spot.id}
                className="bg-stone-900 rounded-xl overflow-hidden border border-stone-800 hover:border-stone-600 transition-colors group"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
                  <div className="absolute top-2 left-2 flex gap-1">
                    <span className="text-xs px-2 py-0.5 rounded-full font-bold text-white" style={{ background: show.color }}>
                      {show.name}
                    </span>
                    {spot.mustVisit && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-amber-500 text-white flex items-center gap-0.5">
                        <Star size={9} fill="white" /> Must visit
                      </span>
                    )}
                  </div>
                  {spot.dayId && (
                    <div className="absolute bottom-2 right-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-stone-900/80 text-stone-300 flex items-center gap-1">
                        <Calendar size={9} />
                        {getDayLabel(spot.dayId)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-white text-sm mb-0.5">{spot.name}</h3>
                  <p className="text-xs text-stone-400 font-medium mb-2" style={{ color: show.color }}>{spot.subtitle}</p>
                  <p className="text-xs text-stone-400 leading-relaxed mb-3">{spot.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {spot.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded bg-stone-800 text-stone-500">{tag}</span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3">
                    <a
                      href={spot.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <MapPin size={11} />
                      View on map
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
