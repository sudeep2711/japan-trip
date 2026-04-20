import { useState } from 'react'
import useTripStore from '../../store/useTripStore'
import { ExternalLink, Plane, Bed, Ticket, CreditCard, AlertTriangle } from 'lucide-react'
import { formatDate } from '../../utils/formatters'

const TYPE_CONFIG = {
  flight:       { icon: Plane,       label: 'Flight',         color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/30' },
  hotel:        { icon: Bed,         label: 'Hotel',          color: 'text-purple-400', bg: 'bg-purple-500/10 border-purple-500/30' },
  ryokan:       { icon: Bed,         label: 'Ryokan',         color: 'text-rose-400',   bg: 'bg-rose-500/10 border-rose-500/30' },
  activity:     { icon: Ticket,      label: 'Activity',       color: 'text-amber-400',  bg: 'bg-amber-500/10 border-amber-500/30' },
  pass:         { icon: CreditCard,  label: 'Pass',           color: 'text-emerald-400',bg: 'bg-emerald-500/10 border-emerald-500/30' },
}

const TABS = ['all', 'flight', 'hotel', 'ryokan', 'activity', 'pass']

export default function BookingsView() {
  const { bookings, displayCurrency, trip } = useTripStore()
  const [tab, setTab] = useState('all')

  const filtered = tab === 'all' ? bookings : bookings.filter(b => b.type === tab)
  const unbooked = bookings.filter(b => b.status === 'candidate' && !b.confirmationNumber)

  return (
    <div className="max-w-4xl space-y-5">
      {/* Warning banner */}
      {unbooked.length > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle size={18} className="text-amber-400 shrink-0" />
          <div className="text-sm text-amber-300">
            <span className="font-semibold">{unbooked.length} items still need to be booked.</span>{' '}
            Critical: flights, Hakone ryokan, Rurikō-in Temple, teamLab Planets.
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs px-3 py-1.5 rounded-full border capitalize transition-colors ${
              tab === t ? 'bg-rose-600 border-rose-600 text-white' : 'border-stone-700 text-stone-400 hover:border-stone-500'
            }`}
          >
            {t === 'all' ? 'All' : TYPE_CONFIG[t]?.label || t}
          </button>
        ))}
      </div>

      {/* Booking cards */}
      <div className="space-y-3">
        {filtered.map(booking => {
          const cfg = TYPE_CONFIG[booking.type] || TYPE_CONFIG.activity
          const Icon = cfg.icon
          const costDisplay = displayCurrency === 'USD'
            ? `$${Math.round((booking.costJPY || 0) / trip.exchangeRate)}`
            : `¥${(booking.costJPY || 0).toLocaleString()}`
          const isBooked = !!booking.confirmationNumber

          return (
            <div key={booking.id} className="bg-stone-900 border border-stone-800 rounded-xl p-5 hover:border-stone-700 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`p-2 rounded-lg border ${cfg.bg} shrink-0`}>
                    <Icon size={16} className={cfg.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-semibold text-white text-sm">{booking.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${isBooked ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-stone-700 text-stone-400 border border-stone-600'}`}>
                        {isBooked ? '✓ Booked' : 'Not booked'}
                      </span>
                    </div>

                    <div className="text-xs text-stone-400 space-y-1">
                      {booking.provider && <div>Provider: <span className="text-stone-300">{booking.provider}</span></div>}
                      {booking.checkInDate && <div>Check-in: <span className="text-stone-300">{formatDate(booking.checkInDate, 'MMM d, yyyy')}</span>{booking.checkOutDate && ` → ${formatDate(booking.checkOutDate, 'MMM d')}`}</div>}
                      {booking.departureDate && !booking.checkInDate && <div>Date: <span className="text-stone-300">{formatDate(booking.departureDate, 'MMM d, yyyy')}</span></div>}
                      {booking.confirmationNumber && <div>Confirmation: <span className="text-emerald-400 font-mono">{booking.confirmationNumber}</span></div>}
                      {booking.notes && <div className="text-stone-500 mt-1">{booking.notes}</div>}
                    </div>

                    {/* Links */}
                    {booking.links?.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {booking.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                          >
                            <ExternalLink size={10} />
                            {link.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-base font-bold text-white">{costDisplay}</div>
                  <div className="text-xs text-stone-500">{booking.paid ? 'paid' : 'unpaid'}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
