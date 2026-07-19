import { createContext, useContext, useState, type ReactNode } from 'react'

interface WishlistContextType {
  wishlist: Set<string>
  toggleWishlist: (productId: string) => void
  isFavorited: (productId: string) => boolean
}

const WishlistContext = createContext<WishlistContextType | null>(null)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set())

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
      } else {
        next.add(productId)
      }
      return next
    })
  }

  const isFavorited = (productId: string) => wishlist.has(productId)

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isFavorited }}>
      {children}
    </WishlistContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
