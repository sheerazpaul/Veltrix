import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSearch, FiFilter, FiX } from 'react-icons/fi'
import { useFetch } from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'
import LoadingSpinner from '../components/LoadingSpinner'
import { getUniqueCategories } from '../utils/helpers'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [sortBy, setSortBy] = useState('title')
  const [showFilters, setShowFilters] = useState(false)

  const pageLimit = 30
  const [page, setPage] = useState(0)

  const searchQuery = searchParams.get('search') || ''
  const categoryParam = searchParams.get('category') || ''

  const apiUrl = useMemo(() => {
    const base = 'https://dummyjson.com/products'
    if (searchQuery) return `${base}/search?q=${encodeURIComponent(searchQuery)}&limit=${pageLimit}&skip=${page * pageLimit}`
    if (categoryParam) return `${base}/category/${encodeURIComponent(categoryParam)}?limit=${pageLimit}&skip=${page * pageLimit}`
    return `${base}?limit=${pageLimit}&skip=${page * pageLimit}`
  }, [searchQuery, categoryParam, page])

  const { data, loading } = useFetch(apiUrl)
  const { data: allData } = useFetch('https://dummyjson.com/products?limit=200&select=category')

  const categories = useMemo(() => {
    if (allData?.products) return getUniqueCategories(allData.products)
    return []
  }, [allData])

  const filteredProducts = useMemo(() => {
    if (!data?.products) return []
    let products = [...data.products]

    if (sortBy === 'price-asc') products.sort((a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') products.sort((a, b) => b.price - a.price)
    else if (sortBy === 'rating') products.sort((a, b) => b.rating - a.rating)
    else if (sortBy === 'title') products.sort((a, b) => a.title.localeCompare(b.title))

    return products
  }, [data, sortBy])

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(0)
    const params = new URLSearchParams()
    if (search.trim()) params.set('search', search.trim())
    if (selectedCategory) params.set('category', selectedCategory)
    setSearchParams(params)
  }

  const handleCategoryClick = (cat) => {
    setPage(0)
    setSelectedCategory(cat === selectedCategory ? '' : cat)
    const params = new URLSearchParams()
    if (search.trim()) params.set('search', search.trim())
    if (cat !== selectedCategory) params.set('category', cat)
    setSearchParams(params)
  }

  const clearFilters = () => {
    setSearch('')
    setSelectedCategory('')
    setSortBy('title')
    setPage(0)
    setSearchParams({})
  }

  const totalPages = data ? Math.ceil(data.total / pageLimit) : 1

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-2">
            {categoryParam ? categoryParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : searchQuery ? `Results for "${searchQuery}"` : 'All Products'}
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {data?.total || 0} products found
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <form onSubmit={handleSearch} className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="input-soft pl-12"
            />
          </form>

          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="input-soft w-auto cursor-pointer"
            >
              <option value="title">Sort by Name</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-soft border-2 transition-all flex items-center gap-2 ${
                showFilters
                  ? 'border-black dark:border-white text-black dark:text-white bg-gray-50 dark:bg-gray-900'
                  : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300'
              }`}
            >
              <FiFilter size={18} />
              <span className="hidden sm:inline">Filters</span>
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-8"
            >
              <div className="p-6 card-soft">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-800 dark:text-gray-200">Categories</h3>
                  {(selectedCategory || searchQuery) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-300 flex items-center gap-1"
                    >
                      <FiX size={14} /> Clear all
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <motion.button
                      key={cat}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleCategoryClick(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === cat
                          ? 'bg-black text-white dark:bg-white dark:text-black shadow-glow'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {cat.replace(/-/g, ' ')}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <LoadingSpinner />
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No products found</h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
            <button onClick={clearFilters} className="btn-primary">
              Clear Filters
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                  className="px-4 py-2 rounded-soft border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-400 transition-colors"
                >
                  Previous
                </motion.button>
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum = i
                    if (totalPages > 5) {
                      if (page < 3) pageNum = i
                      else if (page > totalPages - 4) pageNum = totalPages - 5 + i
                      else pageNum = page - 2 + i
                    }
                    return (
                      <motion.button
                        key={pageNum}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-soft text-sm font-medium transition-all ${
                          page === pageNum
                            ? 'bg-black text-white dark:bg-white dark:text-black shadow-glow'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                      >
                        {pageNum + 1}
                      </motion.button>
                    )
                  })}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-4 py-2 rounded-soft border border-gray-200 dark:border-gray-700 text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-400 transition-colors"
                >
                  Next
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
