import { useState, useMemo } from 'react'
import { X, Heart, Star, Minus, Plus, ChevronDown } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import ReviewSection from './ReviewSection'

function formatDisplayDate(dateStr: string): string {
  if (/^\d{1,2}-[A-Za-z]{3}-\d{4}$/.test(dateStr)) {
    return dateStr
  }
  try {
    const d = new Date(dateStr)
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0')
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      const month = months[d.getMonth()]
      const year = d.getFullYear()
      return `${day}-${month}-${year}`
    }
  } catch {
    // fallback
  }
  return dateStr
}

interface Props {
  product: Product
  onClose: () => void
  onBuyNow: (product: Product, variant: string) => void
}

function buildVariantKey(
  product: Product,
  selections: Record<string, string>,
): string {
  return product.variants
    .map((v) => selections[v.name] ?? v.options[0])
    .join(', ')
}

export default function ProductDetailPanel({ product, onClose, onBuyNow }: Props) {
  const { addItem, getItemQty, increment, decrement } = useCart()
  const { isFavorited, toggleWishlist } = useWishlist()

  const initialSelections: Record<string, string> = {}
  for (const v of product.variants) {
    initialSelections[v.name] = v.options[0]
  }

  const [selections, setSelections] = useState(initialSelections)
  const [localReviews, setLocalReviews] = useState(product.reviews)

  const variantKey = buildVariantKey(product, selections)

  const activeImage = useMemo(() => {
    const selectedColor = product.variants.find((v) => v.name === 'Color')
      ? selections['Color']
      : null
    if (selectedColor && product.images[selectedColor]) {
      return product.images[selectedColor]
    }
    return product.images.default
  }, [selections, product.variants, product.images])

  const qty = getItemQty(product.id, variantKey)
  const inCart = qty > 0

  const avgRating =
    localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: localReviews.filter((r) => r.rating === star).length,
  }))

  const handleAddReview = (r: { rating: number; text: string; image: File | null }) => {
    setLocalReviews((prev) => [
      {
        id: `local-${Date.now()}`,
        reviewerName: 'You',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
        rating: r.rating,
        comment: r.text,
        date: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
  }

  const colorMap: Record<string, string> = {
    White: '#f5f5f5', Blue: '#3b82f6', Black: '#1f2937',
    Teal: '#14b8a6', Mint: '#a7f3d0', 'Dusty Rose': '#d9467a',
    'Pastel Pink': '#f9a8d4', 'Sky Blue': '#7dd3fc', Lavender: '#c4b5fd',
    Brown: '#92400e', Tan: '#d4a373',
    Silver: '#d1d5db', Gold: '#f59e0b', 'Rose Gold': '#e77874',
    Charcoal: '#374151', Cream: '#fef3c7',
    Beige: '#f5e6d3', Striped: '#9ca3af',
    Blush: '#fbcfe8',
    Burgundy: '#7f1d1d', Emerald: '#047857', 'Royal Blue': '#1e3a8a',
    Khaki: '#c9b99a', Navy: '#1e3a5f',
    Red: '#ef4444', 'White/Black': '#e5e7eb', 'Navy/White': '#1e3a5f', 'All Black': '#1f2937',
    'Metal': '#9ca3af', Leather: '#92400e',
  }

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed top-0 right-0 z-50 h-full w-full max-w-2xl bg-white dark:bg-gray-900 shadow-2xl overflow-y-auto translate-x-0 transition-transform duration-300">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate pr-4">
            {product.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition shrink-0"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-sm mb-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {avgRating.toFixed(1)}
                </span>
                <span className="text-gray-400">/5</span>
                <span className="text-gray-400 ml-1">
                  ({localReviews.length} review{localReviews.length !== 1 ? 's' : ''})
                </span>
              </div>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => toggleWishlist(product.id)}
              className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              <Heart
                size={20}
                className={
                  isFavorited(product.id)
                    ? 'fill-red-500 text-red-500'
                    : 'text-gray-400'
                }
              />
            </button>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4">
            {product.variants.map((v) => (
              <div key={v.name}>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 block">
                  {v.name}
                </label>
                {v.name === 'Color' || v.name === 'Band' ? (
                  <div className="flex flex-wrap gap-2">
                    {v.options.map((o) => {
                      const bg = colorMap[o] ?? '#e5e7eb'
                      return (
                        <button
                          key={o}
                          onClick={() =>
                            setSelections((prev) => ({ ...prev, [v.name]: o }))
                          }
                          className={`w-9 h-9 rounded-full border-2 transition flex items-center justify-center ${
                            selections[v.name] === o
                              ? 'border-purple-500 scale-110'
                              : 'border-transparent hover:scale-105'
                          }`}
                          title={o}
                        >
                          <span
                            className="w-7 h-7 rounded-full block"
                            style={{ background: bg }}
                          />
                        </button>
                      )
                    })}
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <select
                      value={selections[v.name]}
                      onChange={(e) =>
                        setSelections((prev) => ({ ...prev, [v.name]: e.target.value }))
                      }
                      className="appearance-none bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer"
                    >
                      {v.options.map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {inCart ? (
              <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
                <button
                  onClick={() => decrement(product.id, variantKey)}
                  className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition"
                >
                  <Minus size={16} />
                </button>
                <span className="px-5 py-2.5 text-sm font-bold text-gray-900 dark:text-gray-100 border-x border-gray-200 dark:border-gray-600">
                  {qty}
                </span>
                <button
                  onClick={() => increment(product.id, variantKey)}
                  className="px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition"
                >
                  <Plus size={16} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addItem(product, variantKey)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 transition"
              >
                Add to Cart
              </button>
            )}

            <button
              onClick={() => {
                if (!inCart) addItem(product, variantKey)
                onBuyNow(product, variantKey)
              }}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 transition"
            >
              Buy Now
            </button>
          </div>

          {/* Reviews */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 mb-4">
              Customer Reviews ({localReviews.length})
            </h3>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {avgRating.toFixed(1)}
                </div>
                <div className="flex items-center gap-0.5 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.round(avgRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-300 dark:text-gray-600'
                      }
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">
                  {localReviews.length} review{localReviews.length !== 1 ? 's' : ''}
                </div>
              </div>

              <div className="flex-1 space-y-1">
                {ratingCounts.map(({ star, count }) => (
                  <div key={star} className="flex items-center gap-2 text-xs">
                    <span className="text-gray-500 w-3 text-right">{star}</span>
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{
                          width: `${localReviews.length > 0 ? (count / localReviews.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-gray-400 w-6 text-right">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {localReviews.map((r) => (
                <div
                  key={r.id}
                  className="flex gap-3 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50"
                >
                  <img
                    src={r.avatar}
                    alt={r.reviewerName}
                    className="w-9 h-9 rounded-full bg-gray-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                        {r.reviewerName}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {formatDisplayDate(r.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 mt-0.5 mb-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className={
                            i < r.rating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <ReviewSection
                onAddReview={handleAddReview}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
