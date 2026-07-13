import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiStar, FiShoppingBag, FiHeart, FiTruck, FiShield, FiRotateCcw, FiPlus, FiMinus } from 'react-icons/fi'
import { useFetch } from '../hooks/useFetch'
import { useCart } from '../context/CartContext'
import { useToast } from '../context/ToastContext'
import LoadingSpinner from '../components/LoadingSpinner'
import { formatPrice, getDiscountedPrice, getStockStatus } from '../utils/helpers'

export default function ProductDetail() {
  const { id } = useParams()
  const { data: product, loading } = useFetch(`https://dummyjson.com/products/${id}`)
  const { addToCart } = useCart()
  const { addToast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [isWishlisted, setIsWishlisted] = useState(false)

  if (loading) return <LoadingSpinner />
  if (!product)
    return (
      <div className="flex items-center justify-center min-h-screen pt-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="mb-4 text-8xl">😔</div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">Product not found</h2>
          <Link to="/products" className="inline-block mt-6 btn-primary">
            Browse Products
          </Link>
        </motion.div>
      </div>
    )

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercentage)
  const stockStatus = getStockStatus(product.stock)
  const images = product.images || [product.thumbnail]

  const handleAddToCart = () => {
    addToCart(product, quantity)
    addToast(`Added ${quantity} ${quantity === 1 ? 'item' : 'items'} to cart`, {
      type: 'success',
      duration: 3000,
      position: 'bottom-right',
    })
  }

  const handleAddToWishlist = () => {
    setIsWishlisted(!isWishlisted)
    addToast(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist', {
      type: 'info',
      duration: 2000,
      position: 'top-center',
    })
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/" className="font-medium transition-colors hover:text-black dark:hover:text-white">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <Link to="/products" className="font-medium transition-colors hover:text-black dark:hover:text-white">
              Products
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-medium text-gray-700 truncate dark:text-gray-300">
              {product.title}
            </span>
          </nav>
        </motion.div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 overflow-hidden card-premium">
              <div className="relative flex items-center justify-center p-8 aspect-square bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={images[activeImage]}
                    alt={product.title}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-normal"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.4 }}
                  />
                </AnimatePresence>

                {product.discountPercentage > 0 && (
                  <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="absolute px-6 py-3 text-base shadow-lg top-6 left-6 badge-primary"
                  >
                    <span className="font-bold">-{Math.round(product.discountPercentage)}% OFF</span>
                  </motion.div>
                )}

                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute rounded-full -top-1/2 -right-1/2 w-96 h-96 bg-black/5 dark:bg-white/5 blur-3xl" />
                </div>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="flex gap-3 pb-2 overflow-x-auto">
                {images.map((img, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(i)}
                    className={`w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-3 transition-all ${
                      activeImage === i
                        ? 'border-black dark:border-white shadow-glow'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="object-contain w-full h-full bg-gray-50 dark:bg-gray-800" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Category & Title */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold capitalize badge-primary">
                  {product.category}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xs badge-success">
                    Special Offer
                  </span>
                )}
              </div>

              <h1 className="mb-2 text-3xl font-bold leading-tight text-gray-900 md:text-4xl dark:text-white">
                {product.title}
              </h1>

              <p className="mb-4 text-base text-gray-500 dark:text-gray-400">
                by <span className="font-semibold text-gray-700 dark:text-gray-300">{product.brand}</span>
              </p>
            </motion.div>

            {/* Rating */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4 pb-6 mb-6 border-b border-gray-200 dark:border-gray-800"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FiStar
                      key={i}
                      size={18}
                      className={i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                    />
                  ))}
                </div>
                <span className="ml-2 text-lg font-bold text-gray-800 dark:text-gray-200">
                  {product.rating.toFixed(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {product.reviews?.length || 0} customer reviews
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mb-8 text-base leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {product.description}
            </motion.p>

            {/* Price Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span className="text-5xl font-bold text-black dark:text-white">
                  {formatPrice(discountedPrice)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-2xl text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                  Save {formatPrice(product.price - discountedPrice)}
                </p>
              )}
            </motion.div>

            {/* Stock Status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="mb-8"
            >
              <span className={`badge ${stockStatus.class} text-base px-4 py-2 font-bold`}>
                {stockStatus.label} — {product.stock} available
              </span>
            </motion.div>

            {/* Quantity & Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-4 mb-8"
            >
              {/* Quantity Selector */}
              <div className="flex items-center p-2 bg-gray-100 dark:bg-gray-800 rounded-xl">
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex items-center justify-center w-12 h-12 text-gray-600 transition-colors rounded-lg hover:bg-white dark:hover:bg-gray-700 dark:text-gray-400"
                >
                  <FiMinus size={18} />
                </motion.button>
                <span className="w-16 text-lg font-bold text-center text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.85 }}
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="flex items-center justify-center w-12 h-12 text-gray-600 transition-colors rounded-lg hover:bg-white dark:hover:bg-gray-700 dark:text-gray-400"
                >
                  <FiPlus size={18} />
                </motion.button>
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`flex-1 py-4 rounded-xl font-bold text-lg text-white flex items-center justify-center gap-3 transition-all ${
                  product.stock === 0
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed opacity-50'
                    : 'btn-primary hover:shadow-glow'
                }`}
              >
                <FiShoppingBag size={24} />
                Add to Cart
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={handleAddToWishlist}
                className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center transition-all ${
                  isWishlisted
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-300 dark:border-red-700 text-red-500'
                    : 'border-gray-300 dark:border-gray-700 text-gray-400 hover:border-red-300 hover:text-red-500'
                }`}
              >
                <FiHeart size={24} className={isWishlisted ? 'fill-current' : ''} />
              </motion.button>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="grid grid-cols-3 gap-4 mb-8"
            >
              {[
                { icon: FiTruck, label: 'Free Shipping', desc: 'On orders over $50' },
                { icon: FiShield, label: 'Secure Payment', desc: '100% Protected' },
                { icon: FiRotateCcw, label: product.returnPolicy || '30-day Returns', desc: 'No questions asked' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="p-4 text-center card-soft">
                  <Icon size={24} className="mx-auto mb-2 text-black dark:text-white" />
                  <p className="text-xs font-bold text-gray-900 dark:text-white">{label}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Product Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="pt-6 space-y-4 border-t border-gray-200 dark:border-gray-800"
            >
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500 dark:text-gray-400">SKU</span>
                <span className="font-mono font-semibold text-gray-800 dark:text-gray-200">{product.sku}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500 dark:text-gray-400">Warranty</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{product.warrantyInformation}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium text-gray-500 dark:text-gray-400">Shipping</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">{product.shippingInformation}</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        {product.reviews?.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20"
          >
            <h2 className="mb-10 text-3xl font-bold text-gray-900 dark:text-white">
              Customer Reviews
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {product.reviews.map((review, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 card-soft"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white rounded-full bg-gradient-to-br from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400">
                      {review.reviewerName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {review.reviewerName}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }, (_, j) => (
                          <FiStar
                            key={j}
                            size={12}
                            className={j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mb-3 text-sm text-gray-600 dark:text-gray-300">{review.comment}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  )
}