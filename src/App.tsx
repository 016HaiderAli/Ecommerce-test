import { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { CartProvider, useCart } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import AuthModal from './components/AuthModal'
import ProductsPage from './pages/ProductsPage'
import CategoriesPage from './pages/CategoriesPage'
import AboutPage from './pages/AboutPage'
import WishlistPage from './pages/WishlistPage'
import ProfilePage from './pages/ProfilePage'
import CheckoutForm from './components/CheckoutForm'
import ProductDetailPanel from './components/ProductDetailPanel'
import type { Product } from './data/products'
import type { Tab } from './components/Navbar'

function AppInner() {
  const [activeTab, setActiveTab] = useState<Tab>('products')
  const [showCheckout, setShowCheckout] = useState(false)
  const [detailProduct, setDetailProduct] = useState<Product | null>(null)
  const [buyNowItem, setBuyNowItem] = useState<{ product: Product; variant: string } | null>(null)
  const [showAuth, setShowAuth] = useState(false)
  const { cartCount } = useCart()

  const handleBuyNow = (product: Product, variant: string) => {
    setBuyNowItem({ product, variant })
    setDetailProduct(null)
    setShowCheckout(true)
  }

  const handleCheckoutDone = () => {
    setShowCheckout(false)
    setBuyNowItem(null)
  }

  const handleTabChange = (t: Tab) => {
    setActiveTab(t)
    setShowCheckout(false)
    setBuyNowItem(null)
  }

  return (
    <div className="min-h-svh bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200 flex flex-col">
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onOpenAuth={() => setShowAuth(true)}
      />

      <main className="flex-1">
        {showCheckout ? (
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {buyNowItem ? 'Buy Now' : 'Checkout'}
              </h1>
              <button
                onClick={() => { setShowCheckout(false); setBuyNowItem(null) }}
                className="text-sm text-purple-600 hover:underline"
              >
                Back to shopping
              </button>
            </div>
            <CheckoutForm buyNowItem={buyNowItem} onCheckoutDone={handleCheckoutDone} />
          </div>
        ) : (
          <>
            {activeTab === 'products' && (
              <ProductsPage
                onBuyNow={handleBuyNow}
                onProductClick={(p) => setDetailProduct(p)}
              />
            )}
            {activeTab === 'categories' && <CategoriesPage />}
            {activeTab === 'about' && <AboutPage />}
            {activeTab === 'wishlist' && (
              <WishlistPage onBuyNow={handleBuyNow} onProductClick={(p) => setDetailProduct(p)} />
            )}
            {activeTab === 'profile' && <ProfilePage />}
          </>
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} ShopFlow. All rights reserved.
      </footer>

      <button
        onClick={() => { setShowCheckout(true); setActiveTab('products'); setBuyNowItem(null) }}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 rounded-full bg-purple-600 text-white text-sm font-bold shadow-lg hover:bg-purple-700 transition"
      >
        <ShoppingCart size={18} />
        {cartCount > 0 && (
          <span className="bg-white text-purple-700 text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
            {cartCount}
          </span>
        )}
        Checkout
      </button>

      {detailProduct && (
        <ProductDetailPanel
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onBuyNow={handleBuyNow}
        />
      )}

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <AppInner />
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  )
}
