import { useState } from 'react'
import { X } from 'lucide-react'
import { useTasks } from '../store/TaskContext'

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
]

export default function AddTaskModal({ onClose }) {
  const { addTask, projects } = useTasks()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [project, setProject] = useState('')
  const [dueDate, setDueDate] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    addTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      project: project.trim() || null,
      dueDate: dueDate || null,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-md-custom">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />

      <div className="glass-elevated rounded-xl-custom p-lg-custom w-full max-w-lg relative z-10">
        <div className="flex items-center justify-between mb-md-custom">
          <h2 className="text-headline-lg text-on-surface">New Task</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg-custom hover:bg-surface-container-high text-on-surface-variant transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-md-custom">
          <div>
            <label className="block text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="input-field w-full px-md-custom py-3 bg-surface-container-high/50 border border-outline-variant/40 rounded-lg-custom text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add some details..."
              rows={3}
              className="input-field w-full px-md-custom py-3 bg-surface-container-high/50 border border-outline-variant/40 rounded-lg-custom text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-sm-custom">
            <div>
              <label className="block text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="input-field w-full px-md-custom py-3 bg-surface-container-high/50 border border-outline-variant/40 rounded-lg-custom text-body-md text-on-surface focus:outline-none appearance-none cursor-pointer"
              >
                {priorities.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">
                Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="input-field w-full px-md-custom py-3 bg-surface-container-high/50 border border-outline-variant/40 rounded-lg-custom text-body-md text-on-surface focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-label-md text-on-surface-variant mb-xs uppercase tracking-wider">
              Project
            </label>
            <input
              type="text"
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Project name (optional)"
              list="project-list"
              className="input-field w-full px-md-custom py-3 bg-surface-container-high/50 border border-outline-variant/40 rounded-lg-custom text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
            />
            <datalist id="project-list">
              {projects.map((p) => (
                <option key={p} value={p} />
              ))}
            </datalist>
          </div>

          <div className="flex gap-sm-custom pt-sm-custom">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1 py-3 px-md-custom border border-outline-variant/30 rounded-lg-custom text-body-md font-medium text-on-surface-variant hover:bg-surface-container-high"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1 py-3 px-md-custom bg-primary text-primary-on rounded-lg-custom text-body-md font-semibold"
            >
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
