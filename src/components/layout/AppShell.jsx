import Sidebar from './Sidebar'
import Header from './Header'
import BottomNav from './BottomNav'

export default function AppShell({ title, children }) {
  return (
    <div className="flex w-full min-h-screen bg-stone-950">
      <Sidebar />
      <div className="flex-1 flex flex-col md:ml-52 min-h-screen">
        <Header title={title} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </div>
      <BottomNav />
    </div>
  )
}
