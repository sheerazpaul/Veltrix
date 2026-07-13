import { NavLink, useLocation } from 'react-router-dom'
import { Inbox, Calendar, FolderKanban, Plus, CheckCircle2, ListTodo, BarChart3 } from 'lucide-react'
import { useTasks } from '../store/TaskContext'

const navItems = [
  { to: '/', icon: Inbox, label: 'Inbox' },
  { to: '/today', icon: Calendar, label: 'Today' },
  { to: '/projects', icon: FolderKanban, label: 'Projects' },
]

export default function Sidebar({ onAddTask }) {
  const { tasks } = useTasks()
  const location = useLocation()

  const completedCount = tasks.filter((t) => t.status === 'done').length
  const totalCount = tasks.length
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[280px] glass-sidebar flex flex-col z-30">
      <div className="p-md-custom">
        <div className="flex items-center gap-sm-custom mb-lg-custom">
          <div className="w-10 h-10 rounded-lg-custom bg-primary flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-primary-on" />
          </div>
          <div>
            <h1 className="text-headline-md text-on-surface font-semibold">Workflow</h1>
            <p className="text-label-sm text-on-surface-variant">Precision Tasks</p>
          </div>
        </div>

        <button
          onClick={onAddTask}
          className="btn-primary w-full flex items-center justify-center gap-sm-custom py-3 px-md-custom bg-primary text-primary-on rounded-lg-custom font-semibold text-body-md"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <nav className="flex-1 px-sm-custom">
        <ul className="space-y-xs">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.to
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={`nav-pill flex items-center gap-sm-custom px-md-custom py-3 rounded-lg-custom text-body-md font-medium relative ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                  }`}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-r-full" />
                  )}
                  <Icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="p-md-custom border-t border-outline-variant/30">
        <div className="flex items-center justify-between mb-xs">
          <span className="text-label-sm text-on-surface-variant uppercase tracking-wider">Progress</span>
          <span className="text-label-md text-primary">{completionPercentage}%</span>
        </div>
        <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-xs">
          <div className="flex items-center gap-xs">
            <ListTodo className="w-3.5 h-3.5 text-on-surface-variant" />
            <span className="text-label-sm text-on-surface-variant">
              {completedCount}/{totalCount} tasks
            </span>
          </div>
          <div className="flex items-center gap-xs">
            <BarChart3 className="w-3.5 h-3.5 text-on-surface-variant" />
            <span className="text-label-sm text-on-surface-variant">
              {totalCount - completedCount} remaining
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}
