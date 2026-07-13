import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiTrash2, FiArrowLeft, FiShoppingBag, FiArrowRight } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import CartItem from '../components/CartItem'
import { formatPrice } from '../utils/helpers'

export default function Cart() {
  const { cart, clearCart, cartTotal, cartCount } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start shopping to add items to your cart
          </p>
          <Link to="/products" className="btn-primary inline-flex items-center gap-2">
            <FiShoppingBag size={18} />
            Browse Products
          </Link>
        </motion.div>
      </div>
    )
  }

  const discount = cartTotal * 0.1
  const shipping = cartTotal > 50 ? 0 : 9.99
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Shopping Cart</h1>
            <p className="text-gray-500 dark:text-gray-400">{cartCount} items</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="flex items-center gap-2 px-4 py-2 rounded-soft text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium"
          >
            <FiTrash2 size={16} />
            Clear Cart
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="card-soft p-6">
              <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Discount (10%)</span>
                  <span className="font-medium text-green-500">-{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Shipping</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {shipping === 0 ? (
                      <span className="text-green-500">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Tax (8%)</span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between">
                  <span className="font-bold text-gray-800 dark:text-gray-200">Total</span>
                  <span className="font-bold text-lg text-black dark:text-white">{formatPrice(total)}</span>
                </div>
              </div>

              {cartTotal < 50 && (
                <div className="p-3 rounded-soft bg-gray-100 dark:bg-gray-900 text-sm text-black dark:text-white mb-4 text-center">
                  Add {formatPrice(50 - cartTotal)} more for free shipping!
                </div>
              )}

              <Link
                to="/checkout"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <FiArrowRight size={18} />
              </Link>

              <Link
                to="/products"
                className="w-full flex items-center justify-center gap-2 mt-3 text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <FiArrowLeft size={16} />
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
