import { motion } from 'framer-motion'
import { FiX, FiPlus, FiMinus } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatPrice, getDiscountedPrice } from '../utils/helpers'

export default function CartItem({ item }) {
  const { removeFromCart, updateQuantity } = useCart()
  const { addToast } = useToast()
  const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage)

  const handleRemove = () => {
    removeFromCart(item.id)
    addToast(`${item.title} removed from cart`, {
      type: 'info',
      duration: 2000,
      position: 'bottom-right',
    })
  }

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      handleRemove()
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 30, height: 0 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="p-5 transition-all duration-300 card-soft hover:shadow-elevated">
        <div className="flex gap-5">
          {/* Product Image */}
          <div className="flex-shrink-0 w-24 h-24 p-3 overflow-hidden shadow-sm bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl">
            <img
              src={item.thumbnail}
              alt={item.title}
              className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-gray-900 truncate dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs tracking-wide text-gray-500 uppercase dark:text-gray-400">
                  {item.brand || item.category}
                </p>
              </div>

              {/* Delete Button */}
              <motion.button
                whileHover={{ scale: 1.15, rotate: 10 }}
                whileTap={{ scale: 0.85 }}
                onClick={handleRemove}
                className="flex-shrink-0 p-2 text-gray-400 transition-all rounded-lg hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                title="Remove from cart"
              >
                <FiX size={18} />
              </motion.button>
            </div>

            {/* Quantity & Price Row */}
            <div className="flex items-center justify-between gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center p-1 bg-gray-100 rounded-lg shadow-sm dark:bg-gray-800">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-600 transition-colors rounded-md dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700"
                >
                  <FiMinus size={14} />
                </motion.button>

                <span className="w-8 text-sm font-bold text-center text-gray-900 dark:text-white">
                  {item.quantity}
                </span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="flex items-center justify-center w-8 h-8 text-sm font-semibold text-gray-600 transition-colors rounded-md dark:text-gray-400 hover:bg-white dark:hover:bg-gray-700"
                >
                  <FiPlus size={14} />
                </motion.button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-base font-bold text-black dark:text-white">
                  {formatPrice(discountedPrice * item.quantity)}
                </p>
                {item.quantity > 1 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {formatPrice(discountedPrice)} each
                  </p>
                )}
              </div>
            </div>

            {/* Discount Badge */}
            {item.discountPercentage > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="inline-flex mt-3"
              >
                <span className="text-xs badge-success">
                  Save {formatPrice((item.price - discountedPrice) * item.quantity)}
                </span>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}