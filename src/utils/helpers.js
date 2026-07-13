export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function getDiscountedPrice(price, discountPercentage) {
  return price * (1 - discountPercentage / 100)
}

export function getStockStatus(stock) {
  if (stock === 0) return { label: 'Out of Stock', class: 'badge-danger' }
  if (stock <= 10) return { label: 'Low Stock', class: 'badge-warning' }
  return { label: 'In Stock', class: 'badge-success' }
}

export function getRatingColor(rating) {
  if (rating >= 4.5) return 'text-green-500'
  if (rating >= 3.5) return 'text-yellow-500'
  if (rating >= 2.5) return 'text-orange-500'
  return 'text-red-500'
}

export function truncate(str, length = 80) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

export function getUniqueCategories(products) {
  const categories = [...new Set(products.map(p => p.category))]
  return categories.sort()
}
