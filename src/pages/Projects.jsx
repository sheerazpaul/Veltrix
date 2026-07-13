import { useState } from 'react'
import { FolderKanban, Plus, ChevronDown, ChevronRight } from 'lucide-react'
import { useTasks } from '../store/TaskContext'
import TaskCard from '../components/TaskCard'
import AddTaskModal from '../components/AddTaskModal'

const projectStyles = {
  Workflow: {
    bg: 'bg-primary/10',
    text: 'text-primary',
    bar: 'bg-primary',
  },
  Engineering: {
    bg: 'bg-secondary/10',
    text: 'text-secondary',
    bar: 'bg-secondary',
  },
  Planning: {
    bg: 'bg-tertiary/10',
    text: 'text-tertiary',
    bar: 'bg-tertiary',
  },
}

const defaultStyle = {
  bg: 'bg-surface-tint/10',
  text: 'text-surface-tint',
  bar: 'bg-surface-tint',
}

export default function Projects() {
  const { tasks, projects } = useTasks()
  const [showModal, setShowModal] = useState(false)
  const [expandedProjects, setExpandedProjects] = useState(
    projects.reduce((acc, p) => ({ ...acc, [p]: true }), {})
  )

  const toggleProject = (project) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [project]: !prev[project],
    }))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-lg-custom">
        <div>
          <h1 className="text-display-lg text-on-surface">Projects</h1>
          <p className="text-body-lg text-on-surface-variant mt-xs">
            {projects.length} projects
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

      <div className="space-y-md-custom">
        {projects.map((project) => {
          const projectTasks = tasks.filter((t) => t.project === project)
          const activeTasks = projectTasks.filter((t) => t.status !== 'done')
          const completedTasks = projectTasks.filter((t) => t.status === 'done')
          const isExpanded = expandedProjects[project]
          const style = projectStyles[project] || defaultStyle

          return (
            <div key={project} className="glass rounded-lg-custom overflow-hidden">
              <button
                onClick={() => toggleProject(project)}
                className="w-full flex items-center justify-between p-md-custom hover:bg-surface-container-high/50 transition-colors"
              >
                <div className="flex items-center gap-sm-custom">
                  <div className={`w-8 h-8 rounded-md-custom ${style.bg} flex items-center justify-center`}>
                    <FolderKanban className={`w-4 h-4 ${style.text}`} />
                  </div>
                  <div className="text-left">
                    <h2 className="text-headline-md text-on-surface">{project}</h2>
                    <p className="text-label-sm text-on-surface-variant">
                      {activeTasks.length} active · {completedTasks.length} completed
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-sm-custom">
                  <div className="w-20 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div
                      className={`h-full ${style.bar} rounded-full transition-all duration-300`}
                      style={{
                        width: projectTasks.length > 0
                          ? `${Math.round((completedTasks.length / projectTasks.length) * 100)}%`
                          : '0%',
                      }}
                    />
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-5 h-5 text-on-surface-variant" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-on-surface-variant" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="px-md-custom pb-md-custom space-y-sm-custom">
                  {activeTasks.length > 0 && activeTasks.map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                  {completedTasks.length > 0 && (
                    <div className="mt-sm-custom">
                      <p className="text-label-sm text-on-surface-variant uppercase tracking-wider mb-xs">
                        Completed
                      </p>
                      {completedTasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}

        {projects.length === 0 && (
          <div className="glass rounded-lg-custom p-xl-custom text-center">
            <p className="text-headline-md text-on-surface-variant">No projects yet</p>
            <p className="text-body-md text-on-surface-variant/60 mt-xs">
              Create a task with a project name to get started
            </p>
          </div>
        )}
      </div>

      {showModal && <AddTaskModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
