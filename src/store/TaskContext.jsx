import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const TaskContext = createContext(null)

const SAMPLE_TASKS = [
  {
    id: '1',
    title: 'Design system documentation',
    description: 'Create comprehensive documentation for the design system tokens and components.',
    priority: 'high',
    project: 'Workflow',
    status: 'todo',
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Review pull requests',
    description: 'Review and approve pending pull requests from the team.',
    priority: 'medium',
    project: 'Engineering',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Update project roadmap',
    description: 'Refine Q3 roadmap with latest stakeholder feedback.',
    priority: 'urgent',
    project: 'Planning',
    status: 'todo',
    createdAt: new Date().toISOString(),
    dueDate: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Fix authentication bug',
    description: 'Investigate and fix the SSO login timeout issue reported by users.',
    priority: 'high',
    project: 'Engineering',
    status: 'done',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    dueDate: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Prepare sprint retrospective',
    description: 'Gather metrics and prepare slides for the sprint retro meeting.',
    priority: 'low',
    project: 'Planning',
    status: 'todo',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 3).toISOString(),
  },
  {
    id: '6',
    title: 'Onboard new team member',
    description: 'Set up development environment and run through codebase walkthrough.',
    priority: 'medium',
    project: 'Workflow',
    status: 'in-progress',
    createdAt: new Date().toISOString(),
    dueDate: new Date(Date.now() + 86400000 * 2).toISOString(),
  },
]

function migrateTask(task) {
  if (task.status) return task
  return {
    ...task,
    status: task.completed ? 'done' : 'todo',
  }
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useLocalStorage('workflow-tasks', SAMPLE_TASKS)

  const migratedTasks = tasks.map(migrateTask)

  const addTask = useCallback((task) => {
    const newTask = {
      ...task,
      id: Date.now().toString(),
      status: 'todo',
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev.map(migrateTask)])
  }, [setTasks])

  const updateTask = useCallback((id, updates) => {
    setTasks((prev) =>
      prev.map(migrateTask).map((task) =>
        task.id === id ? { ...task, ...updates } : task
      )
    )
  }, [setTasks])

  const deleteTask = useCallback((id) => {
    setTasks((prev) => prev.map(migrateTask).filter((task) => task.id !== id))
  }, [setTasks])

  const moveTask = useCallback((id, newStatus) => {
    setTasks((prev) =>
      prev.map(migrateTask).map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    )
  }, [setTasks])

  const toggleTask = useCallback((id) => {
    setTasks((prev) =>
      prev.map(migrateTask).map((task) =>
        task.id === id
          ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
          : task
      )
    )
  }, [setTasks])

  const getTasksByStatus = useCallback(
    (status) => migratedTasks.filter((t) => t.status === status),
    [migratedTasks]
  )

  const getTasksByProject = useCallback(
    (project) => migratedTasks.filter((t) => t.project === project),
    [migratedTasks]
  )

  const getTodayTasks = useCallback(() => {
    const today = new Date().toDateString()
    return migratedTasks.filter(
      (t) => t.dueDate && new Date(t.dueDate).toDateString() === today
    )
  }, [migratedTasks])

  const projects = [...new Set(migratedTasks.map((t) => t.project).filter(Boolean))]

  return (
    <TaskContext.Provider
      value={{
        tasks: migratedTasks,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        toggleTask,
        getTasksByStatus,
        getTasksByProject,
        getTodayTasks,
        projects,
      }}
    >
      {children}
    </TaskContext.Provider>
  )
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider')
  }
  return context
}
