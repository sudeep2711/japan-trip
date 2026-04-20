import useTripStore from '../../store/useTripStore'
import { ExternalLink } from 'lucide-react'

const CATEGORY_LABELS = {
  flights:       { label: 'Flights',      emoji: '✈️' },
  transport:     { label: 'Transport',    emoji: '🚄' },
  accommodation: { label: 'Stay',         emoji: '🏨' },
  anime:         { label: 'Anime',        emoji: '⚔️' },
  activities:    { label: 'Activities',   emoji: '🎟️' },
  food:          { label: 'Food',         emoji: '🍜' },
  misc:          { label: 'Essentials',   emoji: '🗾' },
}

export default function LinksView() {
  const { links } = useTripStore()

  const byCategory = links.reduce((acc, link) => {
    if (!acc[link.category]) acc[link.category] = []
    acc[link.category].push(link)
    return acc
  }, {})

  return (
    <div className="max-w-4xl space-y-6">
      <p className="text-stone-400 text-sm">Curated resources for planning your Japan trip — flights, hotels, anime spots, transport, and more.</p>

      {Object.entries(CATEGORY_LABELS).map(([catId, { label, emoji }]) => {
        const catLinks = byCategory[catId]
        if (!catLinks?.length) return null
        return (
          <div key={catId}>
            <h3 className="text-sm font-semibold text-stone-300 mb-3">{emoji} {label}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {catLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-stone-700 rounded-lg p-3 group transition-all"
                >
                  <ExternalLink size={14} className="text-rose-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white group-hover:text-rose-300 transition-colors truncate">{link.title}</div>
                    {link.notes && <div className="text-xs text-stone-500 mt-0.5 leading-relaxed">{link.notes}</div>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
