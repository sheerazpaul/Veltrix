import { useState } from 'react'
import { Calendar, Plus } from 'lucide-react'
import { useTasks } from '../store/TaskContext'
import TaskCard from '../components/TaskCard'
import AddTaskModal from '../components/AddTaskModal'

export default function Today() {
  const { getTodayTasks, tasks } = useTasks()
  const [showModal, setShowModal] = useState(false)

  const todayTasks = getTodayTasks()
  const overdueTasks = tasks.filter(
    (t) =>
      t.status !== 'done' &&
      t.dueDate &&
      new Date(t.dueDate) < new Date(new Date().toDateString())
  )

  const today = new Date()
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div>
      <div className="flex items-center justify-between mb-lg-custom">
        <div>
          <h1 className="text-display-lg text-on-surface">Today</h1>
          <p className="text-body-lg text-on-surface-variant mt-xs flex items-center gap-sm-custom">
            <Calendar className="w-5 h-5" />
            {formattedDate}
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

      {overdueTasks.length > 0 && (
        <div className="mb-lg-custom">
          <h2 className="text-headline-md text-error mb-sm-custom flex items-center gap-sm-custom">
            <span className="w-2 h-2 rounded-full bg-error" />
            Overdue ({overdueTasks.length})
          </h2>
          <div className="space-y-sm-custom">
            {overdueTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      )}

      <div>
        <h2 className="text-headline-md text-on-surface mb-sm-custom flex items-center gap-sm-custom">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Due Today ({todayTasks.length})
        </h2>
        {todayTasks.length > 0 ? (
          <div className="space-y-sm-custom">
            {todayTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        ) : (
          <div className="glass rounded-lg-custom p-xl-custom text-center">
            <p className="text-headline-md text-on-surface-variant">No tasks due today</p>
            <p className="text-body-md text-on-surface-variant/60 mt-xs">
              Enjoy your free time or add a new task
            </p>
          </div>
        )}
      </div>

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
