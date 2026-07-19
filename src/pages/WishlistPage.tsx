import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { PRODUCTS } from '../data/products'
import type { Product } from '../data/products'
import ProductCard from '../components/ProductCard'

interface Props {
  onBuyNow: (product: Product, variant: string) => void
  onProductClick: (product: Product) => void
}

export default function WishlistPage({ onBuyNow, onProductClick }: Props) {
  const { wishlist } = useWishlist()
  const items = PRODUCTS.filter((p) => wishlist.has(p.id))

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-2">
        <Heart size={22} className="text-red-500" />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Wishlist
        </h1>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {items.length === 0
          ? 'Your wishlist is empty. Browse products and tap the heart icon to save items.'
          : `${items.length} item${items.length > 1 ? 's' : ''} saved`}
      </p>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Heart size={48} className="mb-4 opacity-30" />
          <p className="text-sm">Nothing here yet</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((p) => (
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
