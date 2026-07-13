import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiCheck, FiArrowLeft, FiCreditCard, FiLock, FiPackage } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { formatPrice, getDiscountedPrice } from '../utils/helpers'

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [orderComplete, setOrderComplete] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '', country: '',
    cardNumber: '', cardExpiry: '', cardCvc: '', cardName: '',
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (step === 1) {
      setStep(2)
    } else {
      setOrderComplete(true)
      clearCart()
    }
  }

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Your cart is empty</h2>
          <Link to="/products" className="btn-primary inline-block mt-4">Start Shopping</Link>
        </motion.div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="text-center px-4 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
            className="w-24 h-24 mx-auto mb-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"
          >
            <motion.div
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <FiCheck size={48} className="text-green-500" />
            </motion.div>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2"
          >
            Order Confirmed!
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-gray-500 dark:text-gray-400 mb-8"
          >
            Thank you for your purchase. Your order has been placed successfully and will be shipped soon.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex gap-4 justify-center"
          >
            <Link to="/" className="btn-secondary">Back to Home</Link>
            <Link to="/products" className="btn-primary">Continue Shopping</Link>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  const shipping = cartTotal > 50 ? 0 : 9.99
  const tax = cartTotal * 0.08
  const total = cartTotal + shipping + tax

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-6 text-sm"
          >
            <FiArrowLeft size={16} /> Back to Cart
          </Link>

          <div className="flex items-center gap-3 mb-8">
            {[
              { num: 1, label: 'Shipping', icon: FiPackage },
              { num: 2, label: 'Payment', icon: FiCreditCard },
            ].map(({ num, label }) => (
              <div key={num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                  step >= num
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400'
                }`}>
                  {step > num ? <FiCheck size={14} /> : num}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${
                  step >= num ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400'
                }`}>{label}</span>
                {num < 2 && <div className={`w-12 h-0.5 ${step > num ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-gray-700'}`} />}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <form onSubmit={handleSubmit} className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="card-soft p-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                    <FiPackage className="text-black dark:text-white" />
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">First Name</label>
                      <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Last Name</label>
                      <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
                      <input type="email" name="email" value={form.email} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Phone</label>
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Address</label>
                      <input type="text" name="address" value={form.address} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">City</label>
                      <input type="text" name="city" value={form.city} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">State</label>
                      <input type="text" name="state" value={form.state} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">ZIP Code</label>
                      <input type="text" name="zip" value={form.zip} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Country</label>
                      <input type="text" name="country" value={form.country} onChange={handleChange} required className="input-soft" />
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary w-full mt-6"
                  >
                    Continue to Payment
                  </motion.button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  className="card-soft p-6"
                >
                  <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-2">
                    <FiCreditCard className="text-black dark:text-white" />
                    Payment Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Name on Card</label>
                      <input type="text" name="cardName" value={form.cardName} onChange={handleChange} required className="input-soft" />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Card Number</label>
                      <input type="text" name="cardNumber" value={form.cardNumber} onChange={handleChange} required placeholder="1234 5678 9012 3456" maxLength="19" className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Expiry Date</label>
                      <input type="text" name="cardExpiry" value={form.cardExpiry} onChange={handleChange} required placeholder="MM/YY" maxLength="5" className="input-soft" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">CVC</label>
                      <input type="text" name="cardCvc" value={form.cardCvc} onChange={handleChange} required placeholder="123" maxLength="4" className="input-soft" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-4">
                    <FiLock size={14} />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => setStep(1)}
                      className="btn-secondary flex-1"
                    >
                      Back
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      Place Order — {formatPrice(total)}
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="card-soft p-6">
              <h2 className="font-bold text-gray-800 dark:text-gray-200 mb-4">Order Summary</h2>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden flex-shrink-0 p-1">
                      <img src={item.thumbnail} alt="" className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{item.title}</p>
                      <p className="text-xs text-gray-400">x{item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      {formatPrice(getDiscountedPrice(item.price, item.discountPercentage) * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-800 dark:text-gray-200">{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-800 dark:text-gray-200">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Tax</span>
                  <span className="text-gray-800 dark:text-gray-200">{formatPrice(tax)}</span>
                </div>
                <div className="flex justify-between font-bold pt-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="text-gray-800 dark:text-gray-200">Total</span>
                  <span className="text-black dark:text-white">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
