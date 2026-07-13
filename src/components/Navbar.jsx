import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiShoppingCart, FiMenu, FiX, FiSun, FiMoon, FiSearch } from 'react-icons/fi'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { cartCount } = useCart()
  const { dark, toggleTheme } = useTheme()
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/products', label: 'Products' },
  ]

  const isActive = (path) => location.pathname === path

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} className="flex-shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="w-9 h-9">
                <path d="M3 3 L18 33 L33 3 L25.5 3 L18 21 L10.5 3 Z" fill="black" className="dark:fill-white" />
              </svg>
            </motion.div>
            <span className="text-xl font-black tracking-widest text-black dark:text-white">VELTRIX</span>
          </Link>

          <div className="items-center hidden gap-1 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-soft text-sm font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? 'text-black dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-gray-100 dark:bg-gray-800 rounded-soft -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <AnimatePresence>
              {searchOpen && (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSearch}
                  className="overflow-hidden"
                >
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    autoFocus
                    className="py-2 text-sm input-soft"
                  />
                </motion.form>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-600 transition-colors rounded-soft dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {searchOpen ? <FiX size={20} /> : <FiSearch size={20} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="p-2 text-gray-600 transition-colors rounded-soft dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <AnimatePresence mode="wait">
                {dark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiSun size={20} />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <FiMoon size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-600 transition-colors rounded-soft dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <FiShoppingCart size={20} />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-black rounded-full -top-1 -right-1 dark:bg-white dark:text-black"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 text-gray-600 transition-colors md:hidden rounded-soft dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-gray-200 md:hidden dark:border-gray-800"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-4 py-2 rounded-soft text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
