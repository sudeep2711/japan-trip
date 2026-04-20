import { differenceInDays, parseISO, format } from 'date-fns'

export function daysUntil(dateStr) {
  return differenceInDays(parseISO(dateStr), new Date())
}

export function formatDate(dateStr, fmt = 'MMM d, yyyy') {
  return format(parseISO(dateStr), fmt)
}

export function formatShortDate(dateStr) {
  return format(parseISO(dateStr), 'MMM d')
}

export function formatYen(amount) {
  return `¥${Number(amount).toLocaleString()}`
}

export function formatUSD(amountJPY, rate = 149.45) {
  return `$${(amountJPY / rate).toFixed(0)}`
}

export function activityTypeColor(type) {
  const map = {
    sightseeing:   'bg-blue-500/20 text-blue-300 border-blue-500/30',
    food:          'bg-amber-500/20 text-amber-300 border-amber-500/30',
    transport:     'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    accommodation: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    anime:         'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }
  return map[type] || 'bg-stone-500/20 text-stone-300 border-stone-500/30'
}

export function activityTypeIcon(type) {
  const map = {
    sightseeing:   '🗺️',
    food:          '🍜',
    transport:     '🚄',
    accommodation: '🏨',
    anime:         '⚔️',
  }
  return map[type] || '📍'
}

export function animeTagBadge(tag) {
  const map = {
    'demon-slayer': { label: 'Demon Slayer', color: 'bg-rose-600 text-white' },
    'naruto':       { label: 'Naruto', color: 'bg-orange-500 text-white' },
    'bleach':       { label: 'Bleach', color: 'bg-violet-600 text-white' },
    'all':          { label: 'Anime', color: 'bg-indigo-600 text-white' },
  }
  return map[tag] || null
}
