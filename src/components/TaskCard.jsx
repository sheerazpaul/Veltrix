import { Trash2, GripVertical } from 'lucide-react'
import { useTasks } from '../store/TaskContext'
import Chip from './Chip'

const priorityConfig = {
  urgent: { label: 'Urgent', color: 'error' },
  high: { label: 'High', color: 'primary' },
  medium: { label: 'Medium', color: 'secondary' },
  low: { label: 'Low', color: 'tertiary' },
}

export default function TaskCard({ task, isDragging = false, dragHandleProps = {} }) {
  const { toggleTask, deleteTask } = useTasks()
  const priority = priorityConfig[task.priority] || priorityConfig.medium
  const isDone = task.status === 'done'

  return (
    <div
      className={`task-card glass rounded-lg-custom p-md-custom group ${
        isDragging ? 'shadow-glass-elevated ring-2 ring-primary/30 rotate-2' : ''
      }`}
    >
      <div className="flex items-start gap-sm-custom">
        <div
          {...dragHandleProps}
          className="mt-1 cursor-grab active:cursor-grabbing text-outline-variant/50 hover:text-on-surface-variant transition-colors opacity-0 group-hover:opacity-100"
        >
          <GripVertical className="w-4 h-4" />
        </div>

        <button
          onClick={() => toggleTask(task.id)}
          className={`mt-0.5 w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-all duration-200 ${
            isDone
              ? 'bg-gradient-to-br from-primary to-secondary border-transparent'
              : 'border-outline-variant hover:border-primary'
          }`}
        >
          {isDone && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-sm-custom mb-xs">
            <h3 className={`text-headline-md font-semibold truncate ${
              isDone ? 'text-on-surface-variant line-through' : 'text-on-surface'
            }`}>
              {task.title}
            </h3>
          </div>

          {task.description && (
            <p className={`text-body-md mb-sm-custom line-clamp-2 ${
              isDone ? 'text-on-surface-variant/60' : 'text-on-surface-variant'
            }`}>
              {task.description}
            </p>
          )}

          <div className="flex items-center gap-sm-custom flex-wrap">
            <Chip label={priority.label} color={priority.color} />
            {task.project && (
              <Chip label={task.project} color="surface-tint" />
            )}
            {task.dueDate && (
              <span className="text-label-sm text-on-surface-variant">
                {new Date(task.dueDate).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })}
              </span>
            )}
          </div>
        </div>

        <button
          onClick={() => deleteTask(task.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md-custom hover:bg-error/10 text-on-surface-variant hover:text-error"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
