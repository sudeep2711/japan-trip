import { NavLink } from 'react-router-dom'
import { LayoutDashboard, CalendarDays, Map, BookOpen, Wallet, Swords, Link, PackageCheck } from 'lucide-react'

const nav = [
  { to: '/',          icon: LayoutDashboard, label: 'Overview'  },
  { to: '/itinerary', icon: CalendarDays,    label: 'Itinerary' },
  { to: '/map',       icon: Map,             label: 'Map'       },
  { to: '/anime',     icon: Swords,          label: 'Anime'     },
  { to: '/bookings',  icon: BookOpen,        label: 'Bookings'  },
  { to: '/budget',    icon: Wallet,          label: 'Budget'    },
  { to: '/links',     icon: Link,            label: 'Resources' },
  { to: '/packing',   icon: PackageCheck,    label: 'Packing'   },
]

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-stone-900 border-t border-stone-800 flex md:hidden overflow-x-auto">
      {nav.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center justify-center gap-0.5 px-3 py-2 flex-shrink-0 min-w-[60px] text-xs font-medium transition-colors ${
              isActive ? 'text-rose-400' : 'text-stone-500'
            }`
          }
        >
          <Icon size={18} />
          <span className="text-[10px]">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
