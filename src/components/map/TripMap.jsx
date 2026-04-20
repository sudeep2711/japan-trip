import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import useTripStore from '../../store/useTripStore'
import { activityTypeIcon } from '../../utils/formatters'

// Fix Leaflet default marker icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

const DAY_COLORS = [
  '#f43f5e','#f97316','#eab308','#22c55e','#06b6d4',
  '#3b82f6','#8b5cf6','#ec4899','#14b8a6','#84cc16',
  '#f59e0b','#ef4444',
]

function createIcon(color, emoji) {
  return L.divIcon({
    html: `<div style="background:${color};border:2px solid white;border-radius:50%;width:28px;height:28px;display:flex;align-items:center;justify-content:center;font-size:13px;box-shadow:0 2px 6px rgba(0,0,0,0.4)">${emoji}</div>`,
    className: '',
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  })
}

function FlyToDay({ days, selectedDayId }) {
  const map = useMap()
  useEffect(() => {
    if (!selectedDayId) return
    const day = days.find(d => d.id === selectedDayId)
    if (!day) return
    const coords = day.activities
      .filter(a => a.location?.coordinates)
      .map(a => a.location.coordinates)
    if (coords.length > 0) {
      map.flyToBounds(coords, { padding: [60, 60], maxZoom: 13, duration: 1 })
    }
  }, [selectedDayId, days, map])
  return null
}

export default function TripMap({ filteredDayIds }) {
  const { days, selectedDayId } = useTripStore()

  const visibleDays = filteredDayIds
    ? days.filter(d => filteredDayIds.includes(d.id))
    : days

  return (
    <MapContainer
      center={[36.5, 137.5]}
      zoom={6}
      className="w-full h-full rounded-xl"
      style={{ background: '#1c1917' }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
      />
      <FlyToDay days={days} selectedDayId={selectedDayId} />

      {visibleDays.map((day, dayIdx) => {
        const color = DAY_COLORS[day.dayNumber - 1] || '#f43f5e'
        const coords = day.activities
          .filter(a => a.location?.coordinates)
          .map(a => a.location.coordinates)

        return (
          <div key={day.id}>
            {/* Route line */}
            {coords.length > 1 && (
              <Polyline
                positions={coords}
                color={color}
                weight={2}
                opacity={0.5}
                dashArray="6 4"
              />
            )}
            {/* Markers */}
            {day.activities
              .filter(a => a.location?.coordinates)
              .map(activity => (
                <Marker
                  key={activity.id}
                  position={activity.location.coordinates}
                  icon={createIcon(color, activityTypeIcon(activity.type))}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-semibold text-white mb-1">{activity.title}</div>
                      <div className="text-stone-400 text-xs mb-1">Day {day.dayNumber} • {activity.time} • {day.city}</div>
                      <div className="text-stone-300 text-xs">{activity.notes}</div>
                      {activity.location.googleMapsUrl && (
                        <a href={activity.location.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                          className="text-rose-400 text-xs mt-1 block hover:underline">
                          Open in Google Maps →
                        </a>
                      )}
                    </div>
                  </Popup>
                </Marker>
              ))}
          </div>
        )
      })}
    </MapContainer>
  )
}
