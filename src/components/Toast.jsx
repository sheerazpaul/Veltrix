import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiX, FiAlertCircle, FiInfo } from 'react-icons/fi'
import { useToast } from '../context/ToastContext'

export default function Toast() {
  const { toasts, removeToast } = useToast()

  const getGroupedToasts = () => {
    const grouped = {}
    toasts.forEach(toast => {
      if (!grouped[toast.position]) grouped[toast.position] = []
      grouped[toast.position].push(toast)
    })
    return grouped
  }

  const getIcon = (type, customIcon) => {
    if (customIcon) return customIcon
    switch (type) {
      case 'success':
        return <FiCheck size={20} />
      case 'error':
        return <FiAlertCircle size={20} />
      case 'info':
        return <FiInfo size={20} />
      default:
        return <FiCheck size={20} />
    }
  }

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
          border: 'border-green-200 dark:border-green-800',
          icon: 'text-green-500',
          text: 'text-green-900 dark:text-green-100',
        }
      case 'error':
        return {
          bg: 'bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20',
          border: 'border-red-200 dark:border-red-800',
          icon: 'text-red-500',
          text: 'text-red-900 dark:text-red-100',
        }
      case 'info':
        return {
          bg: 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
          border: 'border-blue-200 dark:border-blue-800',
          icon: 'text-blue-500',
          text: 'text-blue-900 dark:text-blue-100',
        }
      default:
        return {
          bg: 'bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-slate-800',
          border: 'border-gray-200 dark:border-gray-700',
          icon: 'text-gray-500',
          text: 'text-gray-900 dark:text-gray-100',
        }
    }
  }

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-center':
        return 'top-6 left-1/2 -translate-x-1/2'
      case 'bottom-center':
        return 'bottom-6 left-1/2 -translate-x-1/2'
      case 'bottom-right':
      default:
        return 'bottom-6 right-6'
    }
  }

  const groupedToasts = getGroupedToasts()

  return (
    <>
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`fixed ${getPositionClasses(position)} z-50 pointer-events-none`}
        >
          <AnimatePresence mode="popLayout">
            {positionToasts.map((toast, index) => {
              const colors = getColors(toast.type)

              return (
                <motion.div
                  key={toast.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30,
                  }}
                  className="mb-3 pointer-events-auto"
                  style={{
                    marginBottom: index > 0 ? '12px' : '0',
                  }}
                >
                  <motion.div
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(59, 130, 246, 0.1)',
                        '0 0 0 8px rgba(59, 130, 246, 0)',
                      ],
                    }}
                    transition={{
                      duration: 0.6,
                      times: [0, 1],
                    }}
                    className={`${colors.bg} ${colors.border} border-l-4 backdrop-blur-xl rounded-lg p-4 flex items-start gap-3 shadow-lg hover:shadow-xl transition-all max-w-sm cursor-auto group`}
                  >
                    <div className={`flex-shrink-0 mt-0.5 ${colors.icon}`}>
                      {getIcon(toast.type, toast.icon)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className={`${colors.text} text-sm font-medium`}>
                        {toast.message}
                      </p>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => removeToast(toast.id)}
                      className={`flex-shrink-0 ml-2 ${colors.icon} opacity-60 hover:opacity-100 transition-opacity`}
                    >
                      <FiX size={16} />
                    </motion.button>

                    <motion.div
                      initial={{ scaleX: 1 }}
                      animate={{ scaleX: 0 }}
                      transition={{
                        duration: 3,
                        ease: 'linear',
                      }}
                      onAnimationComplete={() => removeToast(toast.id)}
                      className={`absolute bottom-0 left-0 h-1 origin-left ${
                        toast.type === 'success'
                          ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                          : toast.type === 'error'
                          ? 'bg-gradient-to-r from-red-400 to-rose-500'
                          : toast.type === 'info'
                          ? 'bg-gradient-to-r from-blue-400 to-cyan-500'
                          : 'bg-gradient-to-r from-gray-400 to-slate-500'
                      }`}
                      style={{ borderRadius: '0 0 0.5rem 0' }}
                    />
                  </motion.div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      ))}
    </>
  )
}