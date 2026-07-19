import { useState } from 'react'
import { PRODUCTS, CATEGORIES, HEALTH_SUBCATEGORIES } from '../data/products'
import type { Product } from '../data/products'
import ProductCard from '../components/ProductCard'

interface Props {
  onBuyNow: (product: Product, variant: string) => void
  onProductClick: (product: Product) => void
}

export default function ProductsPage({ onBuyNow, onProductClick }: Props) {
  const [category, setCategory] = useState('All')
  const [healthSub, setHealthSub] = useState<string | null>(null)

  const filtered = PRODUCTS.filter((p) => {
    if (category === 'All') return true
    if (p.category === 'Health Care' && healthSub) {
      return p.category === category && p.subcategory === healthSub
    }
    return p.category === category
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Products
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Browse our curated collection
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {['All', ...CATEGORIES].map((c) => (
          <button
            key={c}
            onClick={() => { setCategory(c); setHealthSub(null) }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition ${
              category === c
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {category === 'Health Care' && (
        <div className="flex gap-2 mb-6 ml-1">
          {HEALTH_SUBCATEGORIES.map((sub) => (
            <button
              key={sub}
              onClick={() => setHealthSub(sub)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                healthSub === sub
                  ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-gray-400 text-sm py-12 text-center">
          No products in this category.
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onBuyNow={onBuyNow}
            onClick={() => onProductClick(p)}
          />
        ))}
      </div>
    </div>
  )
}
