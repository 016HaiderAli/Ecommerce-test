import { User, Package, MapPin, CreditCard, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, logout } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center">
            {user ? (
              <span className="text-lg font-bold text-purple-600">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User size={24} className="text-purple-600" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              My Account
            </h1>
            <p className="text-sm text-gray-500">Welcome back, {user?.name ?? 'Guest'}!</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 transition"
        >
          <LogOut size={16} />
          Log Out
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-purple-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Recent Orders
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No orders yet. Start shopping to see your order history here.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin size={18} className="text-purple-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Saved Addresses
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No saved addresses. Add one during checkout for faster ordering.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={18} className="text-purple-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Payment Methods
            </h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Cash on Delivery and Bank Transfer are available. Visit the checkout
            page to complete payment.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User size={18} className="text-purple-600" />
            <h2 className="font-semibold text-gray-900 dark:text-gray-100">
              Profile Details
            </h2>
          </div>
          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <p><span className="text-gray-500">Name:</span> {user?.name ?? 'Guest User'}</p>
            <p><span className="text-gray-500">Email:</span> {user?.email ?? 'guest@shopflow.pk'}</p>
            <p><span className="text-gray-500">Phone:</span> +92 3XX XXXXXXX</p>
          </div>
        </div>
      </div>
    </div>
  )
}
