import { Star, Minus, Plus } from 'lucide-react'
import type { Product } from '../data/products'
import { useCart } from '../context/CartContext'

interface Props {
  product: Product
  onBuyNow: (product: Product, variant: string) => void
  onClick: () => void
}

export default function ProductCard({ product, onBuyNow, onClick }: Props) {
  const { addItem, getItemQty, increment, decrement } = useCart()

  const firstVariant = product.variants[0]?.options[0] ?? ''
  const qty = getItemQty(product.id, firstVariant)
  const inCart = qty > 0

  const avgRating =
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product, firstVariant)
  }

  const handleInc = (e: React.MouseEvent) => {
    e.stopPropagation()
    increment(product.id, firstVariant)
  }

  const handleDec = (e: React.MouseEvent) => {
    e.stopPropagation()
    decrement(product.id, firstVariant)
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!inCart) addItem(product, firstVariant)
    onBuyNow(product, firstVariant)
  }

  return (
    <div
      onClick={onClick}
      className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden cursor-pointer hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col"
    >
      <div className="aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={product.images.default}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-2">
        <div className="flex items-center gap-1 text-sm">
          <Star size={14} className="fill-amber-400 text-amber-400" />
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {avgRating.toFixed(1)}
          </span>
          <span className="text-gray-400 text-xs">/5</span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug line-clamp-2">
          {product.name}
        </h3>

        <div className="text-base font-bold text-purple-600 dark:text-purple-400 mt-auto">
          Rs. {product.price.toLocaleString()}
        </div>

        <div className="flex items-center gap-2 mt-1">
          <button
            onClick={handleBuyNow}
            className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition"
          >
            Buy Now
          </button>

          {inCart ? (
            <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden">
              <button
                onClick={handleDec}
                className="px-2.5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition"
              >
                <Minus size={14} />
              </button>
              <span className="px-3 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 min-w-[28px] text-center border-x border-gray-200 dark:border-gray-600">
                {qty}
              </span>
              <button
                onClick={handleInc}
                className="px-2.5 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400 transition"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button
              onClick={handleAdd}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-900/50 border border-purple-200 dark:border-purple-800 transition whitespace-nowrap"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
