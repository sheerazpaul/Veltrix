import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiShoppingBag } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import { formatPrice, getDiscountedPrice, getStockStatus } from '../utils/helpers'

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
  const stockStatus = getStockStatus(product.stock)

  const handleAddToCart = (e) => {
    e.preventDefault()
    addToCart(product)
    addToast(`${product.title} added to cart!`, {
      type: 'success',
      duration: 3000,
      position: 'bottom-right',
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <div className="flex flex-col h-full overflow-hidden transition-all duration-300 card-soft hover:shadow-elevated">
        <Link to={`/product/${product.id}`} className="relative flex-shrink-0 overflow-hidden">
          <div className="relative flex items-center justify-center p-6 aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
            <motion.img
              src={product.thumbnail}
              alt={product.title}
              className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal"
              whileHover={{ scale: 1.12 }}
              transition={{ duration: 0.4 }}
            />

            {/* Decorative background circles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute transition-opacity duration-500 rounded-full opacity-0 -top-1/2 -right-1/2 w-96 h-96 bg-primary-500/5 dark:bg-primary-500/10 blur-3xl group-hover:opacity-100" />
            </div>
          </div>

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 left-4 badge-primary text-xs px-3 py-1.5 shadow-lg"
            >
              <span className="font-bold">-{Math.round(product.discountPercentage)}%</span>
            </motion.div>
          )}

          {/* Stock Status Badge */}
          <div className={`absolute top-4 right-4 badge ${stockStatus.class} text-xs px-3 py-1.5 shadow-lg`}>
            {stockStatus.label}
          </div>

          {/* Overlay gradient */}
          <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:opacity-100" />
        </Link>

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5">
          <p className="mb-2 text-xs font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
            {product.brand || product.category}
          </p>

          <Link to={`/product/${product.id}`}>
            <h3 className="mb-3 text-sm font-semibold leading-tight text-gray-900 transition-colors dark:text-gray-100 line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400">
              {product.title}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <FiStar
                  key={i}
                  size={13}
                  className={i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
              {product.rating.toFixed(1)}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              ({product.reviews?.length || 0})
            </span>
          </div>

          {/* Price Section */}
          <div className="mt-auto">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                {formatPrice(discountedPrice)}
              </span>
              {product.discountPercentage > 0 && (
                <span className="text-xs text-gray-400 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 ${
                product.stock === 0
                  ? 'bg-gray-300 dark:bg-gray-700 cursor-not-allowed opacity-60'
                  : 'btn-primary hover:shadow-glow'
              }`}
            >
              <FiShoppingBag size={16} />
              <span className="text-sm font-semibold">Add to Cart</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}