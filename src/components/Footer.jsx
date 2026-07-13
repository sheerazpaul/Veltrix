import { motion } from 'framer-motion'
import { FiGithub, FiTwitter, FiInstagram, FiMail } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: FiGithub, href: '#', label: 'GitHub' },
    { icon: FiTwitter, href: '#', label: 'Twitter' },
    { icon: FiInstagram, href: '#', label: 'Instagram' },
    { icon: FiMail, href: '#', label: 'Email' },
  ]

  return (
    <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="w-8 h-8">
                <path d="M3 3 L18 33 L33 3 L25.5 3 L18 21 L10.5 3 Z" fill="black" className="dark:fill-white" />
              </svg>
              <span className="text-xl font-black tracking-widest text-black dark:text-white">VILETRIX</span>
            </Link>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-md">
              Discover amazing products at unbeatable prices. Your one-stop shop for everything you need.
            </p>
            <div className="flex gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-soft bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { to: '/', label: 'Home' },
                { to: '/products', label: 'All Products' },
                { to: '/cart', label: 'Cart' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Support</h3>
            <ul className="space-y-2">
              {['Help Center', 'Shipping Info', 'Returns', 'Contact Us'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-500 dark:text-gray-400 text-sm hover:text-black dark:hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500 text-sm">
            &copy; {currentYear} VILETRIX. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
