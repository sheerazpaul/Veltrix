import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import AddTaskModal from './AddTaskModal'
import { Menu } from 'lucide-react'

export default function Layout() {
  const [showModal, setShowModal] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-md-custom left-md-custom z-40 p-2 glass rounded-lg-custom"
      >
        <Menu className="w-5 h-5 text-on-surface" />
      </button>

      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className={`fixed lg:translate-x-0 transition-transform duration-300 z-30 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onAddTask={() => { setShowModal(true); setSidebarOpen(false) }} />
      </div>

      <main className="lg:ml-[280px] min-h-screen">
        <div className="max-w-[1440px] mx-auto p-md-custom lg:p-lg-custom pt-[72px] lg:pt-lg-custom">
          <Outlet />
        </div>
      </main>

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
