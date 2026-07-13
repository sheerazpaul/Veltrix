import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiTruck, FiShield, FiHeadphones, FiCreditCard, FiStar, FiArrowUpRight } from 'react-icons/fi'
import { useFetch } from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getUniqueCategories } from '../utils/helpers'

const container = {
  animate: { transition: { staggerChildren: 0.1 } }
}

export default function Home() {
  const { data, loading } = useFetch('https://dummyjson.com/products?limit=8&skip=0')
  const { data: allProducts } = useFetch('https://dummyjson.com/products?limit=100&select=category')

  const categories = useMemo(() => {
    if (allProducts?.products) return getUniqueCategories(allProducts.products).slice(0, 8)
    return []
  }, [allProducts])

  const features = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      desc: 'On orders over $50',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      desc: '100% secure checkout',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiHeadphones,
      title: '24/7 Support',
      desc: 'Dedicated support team',
      color: 'from-gray-500 to-gray-400',
    },
    {
      icon: FiCreditCard,
      title: 'Easy Returns',
      desc: '30-day return policy',
      color: 'from-orange-500 to-red-500',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50/30 dark:from-gray-950 dark:via-gray-900/50 dark:to-gray-950">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden md:pt-32 md:pb-24">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-400/10 to-gray-300/10 dark:from-gray-600/10 dark:to-gray-400/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 dark:from-blue-600/10 dark:to-cyan-600/10 blur-3xl"
          />
        </div>

        <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-8 badge-primary"
            >
              <FiStar size={16} />
              <span>Discover Amazing Products</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 text-5xl font-bold leading-tight text-gray-900 md:text-6xl lg:text-7xl dark:text-white"
            >
              Shop the{' '}
              <span className="text-gradient">Future</span>
              <br />
              of E-Commerce
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto mb-10 text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300"
            >
              Explore our curated collection of premium products with unbeatable prices, exceptional quality, and amazing customer experience.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col justify-center gap-4 sm:flex-row"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold shadow-lg btn-primary hover:shadow-glow"
                >
                  Shop Now
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <FiArrowRight size={20} />
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href="#featured"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold btn-secondary"
                >
                  View Collection
                  <FiArrowUpRight size={20} />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 border-gray-200 border-y dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-6 card-soft group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center flex-shrink-0 mb-4 shadow-lg group-hover:shadow-glow transition-all`}>
                  <feat.icon className="text-white" size={24} />
                </div>
                <h3 className="mb-2 text-base font-bold text-gray-900 dark:text-white">
                  {feat.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feat.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                Browse Categories
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Find exactly what you're looking for
              </p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.08, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={`/products?category=${encodeURIComponent(cat)}`}
                    className="px-6 py-3 text-base font-semibold text-gray-700 capitalize transition-all bg-white border-2 border-gray-200 rounded-full dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-gray-600 dark:hover:text-white hover:shadow-lg"
                  >
                    {cat}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section id="featured" className="py-20 bg-gradient-to-b from-transparent via-gray-50/20 to-transparent dark:via-gray-900/5">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Hand-picked just for you
              </p>
            </div>
            <Link
              to="/products"
              className="items-center hidden gap-2 text-base font-bold transition-colors sm:inline-flex text-black dark:text-white hover:text-gray-700 dark:text-gray-300 group"
            >
              View All
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <FiArrowRight size={18} />
              </motion.div>
            </Link>
          </motion.div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <motion.div
              variants={container}
              initial="initial"
              animate="animate"
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {data?.products?.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>
          )}

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 font-bold btn-secondary"
            >
              View All Products
              <FiArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 overflow-hidden text-center card-premium md:p-16"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute w-64 h-64 rounded-full -top-20 -right-20 bg-black/5 dark:bg-white/5 blur-3xl"
              />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute w-64 h-64 rounded-full -bottom-20 -left-20 bg-gray-400/5 blur-3xl"
              />
            </div>

            <div className="relative">
              <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
                Stay Updated with Amazing Deals
              </h2>
              <p className="max-w-md mx-auto mb-8 text-lg text-gray-600 dark:text-gray-300">
                Subscribe to get exclusive offers, free giveaways, and insider news.
              </p>

              <div className="flex flex-col max-w-md gap-3 mx-auto sm:flex-row">
                <motion.input
                  whileFocus={{ scale: 1.02 }}
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 font-medium text-gray-900 placeholder-gray-400 bg-white border-2 border-gray-200 rounded-xl dark:bg-gray-900 dark:border-gray-800 dark:text-white dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 font-bold shadow-lg btn-primary whitespace-nowrap hover:shadow-glow"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}