import { ShoppingBag, Heart, User, Grid3X3, Info, Package, LogOut } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export type Tab = 'products' | 'categories' | 'about' | 'wishlist' | 'profile'

interface Props {
  activeTab: Tab
  onTabChange: (t: Tab) => void
  onOpenAuth: () => void
}

const BASE_TABS: { key: Tab; label: string; icon: typeof ShoppingBag }[] = [
  { key: 'products', label: 'Products', icon: Package },
  { key: 'categories', label: 'Categories', icon: Grid3X3 },
  { key: 'about', label: 'About', icon: Info },
  { key: 'wishlist', label: 'Wishlist', icon: Heart },
]

const PROFILE_TAB: { key: Tab; label: string; icon: typeof ShoppingBag } = {
  key: 'profile', label: 'Profile', icon: User,
}

export default function Navbar({ activeTab, onTabChange, onOpenAuth }: Props) {
  const { cartCount } = useCart()
  const { user, isAuthenticated, logout } = useAuth()

  const tabs = isAuthenticated ? [...BASE_TABS, PROFILE_TAB] : BASE_TABS

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
            <ShoppingBag size={22} className="text-purple-600" />
            <span>ShopFlow</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onTabChange(key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition ${
                  activeTab === key
                    ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
                  <div className="w-6 h-6 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {user!.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-medium text-purple-700 dark:text-purple-300 max-w-[80px] truncate">
                    {user!.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Log Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 transition"
              >
                Sign In / Join
              </button>
            )}
          </div>
        </div>

        <nav className="md:hidden flex items-center gap-1 pb-3 overflow-x-auto scrollbar-none">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => onTabChange(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition shrink-0 ${
                activeTab === key
                  ? 'bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  )
}
