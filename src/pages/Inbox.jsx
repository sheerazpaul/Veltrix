import { useState } from 'react'
import { Plus, Search, Filter } from 'lucide-react'
import { useTasks } from '../store/TaskContext'
import KanbanBoard from '../components/KanbanBoard'
import AddTaskModal from '../components/AddTaskModal'

export default function Inbox() {
  const { tasks } = useTasks()
  const [showModal, setShowModal] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')

  const activeCount = tasks.filter((t) => t.status !== 'done').length

  return (
    <div>
      <div className="flex items-center justify-between mb-lg-custom">
        <div>
          <h1 className="text-display-lg text-on-surface">Inbox</h1>
          <p className="text-body-lg text-on-surface-variant mt-xs">
            {activeCount} active tasks
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-sm-custom py-3 px-md-custom bg-primary text-primary-on rounded-lg-custom font-semibold text-body-md"
        >
          <Plus className="w-5 h-5" />
          Add Task
        </button>
      </div>

      <div className="flex items-center gap-sm-custom mb-md-custom flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-md-custom top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="input-field w-full pl-10 pr-md-custom py-3 bg-surface-container-high/50 border border-outline-variant/40 rounded-lg-custom text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-xs">
          <Filter className="w-4 h-4 text-on-surface-variant" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="input-field px-sm-custom py-3 bg-surface-container-high/50 border border-outline-variant/40 rounded-lg-custom text-label-md text-on-surface focus:outline-none appearance-none cursor-pointer"
          >
            <option value="all">All Priority</option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <KanbanBoard
        tasks={tasks}
        searchQuery={searchQuery}
        filterPriority={filterPriority}
      />

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
