import { activityTypeColor, activityTypeIcon, animeTagBadge } from '../../utils/formatters'
import useTripStore from '../../store/useTripStore'
import { MapPin, ExternalLink } from 'lucide-react'

export default function ActivityItem({ activity, isLast }) {
  const { formatAmount } = useTripStore()
  const badge = animeTagBadge(activity.animeTag)

  return (
    <div className="flex gap-4">
      {/* Timeline */}
      <div className="flex flex-col items-center">
        <div className="w-2 h-2 rounded-full bg-rose-500 mt-1.5 shrink-0" />
        {!isLast && <div className="w-px flex-1 bg-stone-800 mt-1" />}
      </div>

      {/* Content */}
      <div className={`pb-4 flex-1 ${isLast ? '' : ''}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-stone-500 font-mono">{activity.time}</span>
              <span className={`text-xs px-2 py-0.5 rounded border ${activityTypeColor(activity.type)}`}>
                {activityTypeIcon(activity.type)} {activity.type}
              </span>
              {badge && (
                <span className={`text-xs px-2 py-0.5 rounded font-semibold ${badge.color}`}>
                  {badge.label}
                </span>
              )}
            </div>
            <div className="font-medium text-white mt-1">{activity.title}</div>
            {activity.notes && (
              <div className="text-xs text-stone-400 mt-1 leading-relaxed">{activity.notes}</div>
            )}
            {activity.location?.name && (
              <a
                href={activity.location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 mt-1 transition-colors"
              >
                <MapPin size={10} />
                {activity.location.name}
                <ExternalLink size={10} />
              </a>
            )}
          </div>
          {activity.costJPY > 0 && (
            <div className="text-right shrink-0">
              <div className="text-sm font-semibold text-white">{formatAmount(activity.costJPY)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
