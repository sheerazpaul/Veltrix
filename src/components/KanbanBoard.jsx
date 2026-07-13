import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'
import { useTasks } from '../store/TaskContext'
import TaskCard from './TaskCard'
import { CircleDot, Clock, CheckCircle2 } from 'lucide-react'

const columns = [
  { id: 'todo', label: 'To Do', icon: CircleDot, color: 'primary', emptyText: 'No tasks to do' },
  { id: 'in-progress', label: 'In Progress', icon: Clock, color: 'secondary', emptyText: 'No tasks in progress' },
  { id: 'done', label: 'Done', icon: CheckCircle2, color: 'tertiary', emptyText: 'No completed tasks' },
]

const columnStyles = {
  primary: {
    headerBg: 'bg-primary/10',
    headerText: 'text-primary',
    countBg: 'bg-primary/10',
    countText: 'text-primary',
    dropHighlight: 'bg-primary/5',
    border: 'border-primary/20',
  },
  secondary: {
    headerBg: 'bg-secondary/10',
    headerText: 'text-secondary',
    countBg: 'bg-secondary/10',
    countText: 'text-secondary',
    dropHighlight: 'bg-secondary/5',
    border: 'border-secondary/20',
  },
  tertiary: {
    headerBg: 'bg-tertiary/10',
    headerText: 'text-tertiary',
    countBg: 'bg-tertiary/10',
    countText: 'text-tertiary',
    dropHighlight: 'bg-tertiary/5',
    border: 'border-tertiary/20',
  },
}

export default function KanbanBoard({ tasks, searchQuery = '', filterPriority = 'all' }) {
  const { moveTask } = useTasks()

  const filteredTasks = tasks.filter((task) => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      if (
        !task.title.toLowerCase().includes(query) &&
        !task.description?.toLowerCase().includes(query)
      ) {
        return false
      }
    }
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false
    return true
  })

  const tasksByStatus = {
    'todo': filteredTasks.filter((t) => t.status === 'todo'),
    'in-progress': filteredTasks.filter((t) => t.status === 'in-progress'),
    'done': filteredTasks.filter((t) => t.status === 'done'),
  }

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    moveTask(draggableId, destination.droppableId)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-md-custom">
        {columns.map((column) => {
          const Icon = column.icon
          const style = columnStyles[column.color]
          const columnTasks = tasksByStatus[column.id]

          return (
            <div key={column.id} className="flex flex-col">
              <div className={`rounded-t-lg-custom px-md-custom py-sm-custom ${style.headerBg} border border-b-0 ${style.border}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-sm-custom">
                    <Icon className={`w-4 h-4 ${style.headerText}`} />
                    <h3 className={`text-label-md ${style.headerText} uppercase tracking-wider`}>
                      {column.label}
                    </h3>
                  </div>
                  <span className={`text-label-sm ${style.countBg} ${style.countText} px-sm-custom py-0.5 rounded-full font-semibold`}>
                    {columnTasks.length}
                  </span>
                </div>
              </div>

              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 min-h-[200px] rounded-b-lg-custom border transition-colors duration-200 ${
                      snapshot.isDraggingOver
                        ? `${style.dropHighlight} ${style.border}`
                        : 'border-outline-variant/20 bg-surface-container-low/30'
                    }`}
                  >
                    <div className="p-sm-custom space-y-sm-custom">
                      {columnTasks.map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                            >
                              <TaskCard
                                task={task}
                                isDragging={snapshot.isDragging}
                                dragHandleProps={provided.dragHandleProps}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>

                    {columnTasks.length === 0 && !snapshot.isDraggingOver && (
                      <div className="flex flex-col items-center justify-center py-xl-custom text-center">
                        <Icon className={`w-8 h-8 ${style.headerText} opacity-30 mb-sm-custom`} />
                        <p className="text-label-md text-on-surface-variant/50">
                          {column.emptyText}
                        </p>
                        <p className="text-label-sm text-on-surface-variant/30 mt-xs">
                          Drag tasks here
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </Droppable>
            </div>
          )
        })}
      </div>
    </DragDropContext>
  )
}
