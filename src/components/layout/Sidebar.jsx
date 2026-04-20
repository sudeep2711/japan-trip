import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, Map, BookOpen, Wallet, Swords, Link, PackageCheck } from 'lucide-react'

const nav = [
  { to: '/',          icon: LayoutDashboard, label: 'Overview'   },
  { to: '/itinerary', icon: CalendarDays,    label: 'Itinerary'  },
  { to: '/map',       icon: Map,             label: 'Map'        },
  { to: '/bookings',  icon: BookOpen,        label: 'Bookings'   },
  { to: '/budget',    icon: Wallet,          label: 'Budget'     },
  { to: '/anime',     icon: Swords,          label: 'Anime'      },
  { to: '/links',     icon: Link,            label: 'Resources'  },
  { to: '/packing',   icon: PackageCheck,    label: 'Packing'    },
]

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-screen w-52 bg-stone-900 border-r border-stone-800 hidden md:flex flex-col z-40">
      <div className="px-4 py-5 border-b border-stone-800">
        <div className="text-xs font-semibold text-rose-400 uppercase tracking-widest mb-1">Trip Planner</div>
        <div className="text-lg font-bold text-white leading-tight">🇯🇵 Japan 2026</div>
        <div className="text-xs text-stone-400 mt-1">Oct 5 – 16 • 12 days</div>
      </div>
      <nav className="flex-1 py-3 overflow-y-auto">
        {nav.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? 'bg-rose-600/20 text-rose-400 border border-rose-600/30'
                  : 'text-stone-400 hover:text-white hover:bg-stone-800'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-3 border-t border-stone-800 text-xs text-stone-600">
        San Francisco → Tokyo<br />Budget: $6,000 for 2
      </div>
    </aside>
  )
}
