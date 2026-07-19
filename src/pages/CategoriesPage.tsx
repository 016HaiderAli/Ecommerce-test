import { CATEGORIES, PRODUCTS } from '../data/products'
import type { Product } from '../data/products'

const CATEGORY_ICONS: Record<string, string> = {
  Clothing: '👕',
  Accessories: '💍',
  Electronics: '📱',
  Footwear: '👟',
  Caps: '🧢',
  Purses: '👜',
  'Health Care': '💊',
}

export default function CategoriesPage() {
  const categoryCount = (cat: string) =>
    PRODUCTS.filter((p) => p.category === cat).length

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Categories
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Shop by department
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {CATEGORIES.map((cat) => {
          const items = PRODUCTS.filter((p) => p.category === cat)
          return (
            <div
              key={cat}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition"
            >
              <div className="text-3xl mb-3">{CATEGORY_ICONS[cat]}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {cat}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {categoryCount(cat)} items
              </p>

              {cat === 'Health Care' && (
                <div className="mt-3 space-y-1">
                  {['Oils', 'Soaps'].map((sub) => (
                    <div key={sub} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">{sub}</span>
                      <span className="text-gray-400 text-xs">
                        {items.filter((p) => p.subcategory === sub).length} items
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-1.5">
                {items.slice(0, 3).map((p: Product) => (
                  <span key={p.id} className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-md">
                    {p.name}
                  </span>
                ))}
                {items.length > 3 && (
                  <span className="text-xs text-purple-600 dark:text-purple-400 font-medium px-2 py-1">
                    +{items.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
