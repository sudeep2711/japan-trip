import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import OverviewDashboard from './components/overview/OverviewDashboard'
import ItineraryView from './components/itinerary/ItineraryView'
import MapView from './components/map/MapView'
import BookingsView from './components/bookings/BookingsView'
import BudgetView from './components/budget/BudgetView'
import AnimeView from './components/anime/AnimeView'
import LinksView from './components/links/LinksView'
import PackingView from './components/packing/PackingView'

const PAGES = [
  { path: '/',          title: 'Overview',          Component: OverviewDashboard },
  { path: '/itinerary', title: 'Itinerary',         Component: ItineraryView     },
  { path: '/map',       title: 'Trip Map',          Component: MapView           },
  { path: '/bookings',  title: 'Bookings',          Component: BookingsView      },
  { path: '/budget',    title: 'Budget',            Component: BudgetView        },
  { path: '/anime',     title: 'Anime Pilgrimage',  Component: AnimeView         },
  { path: '/links',     title: 'Resources & Links', Component: LinksView         },
  { path: '/packing',   title: 'Packing List',      Component: PackingView       },
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {PAGES.map(({ path, title, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <AppShell title={title}>
                <Component />
              </AppShell>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  )
}
