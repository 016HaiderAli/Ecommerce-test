import { Shield, Truck, RotateCcw, Mail } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Store Policies
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        How we operate and what you can expect
      </p>

      <div className="space-y-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Truck size={22} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Shipping & Delivery
            </h2>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-1">
            <li>Free shipping on orders above Rs. 3,000 within Pakistan.</li>
            <li>Standard delivery: 3–5 business days (major cities).</li>
            <li>Remote areas may take 5–7 business days.</li>
            <li>International shipping available on select items (7–14 days).</li>
            <li>Tracking link sent via SMS/email once dispatched.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <RotateCcw size={22} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Returns & Exchanges
            </h2>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-1">
            <li>14-day return window from delivery date.</li>
            <li>Items must be unworn, unwashed, with original tags.</li>
            <li>Health Care products (oils, soaps) are non-returnable.</li>
            <li>Exchange processed within 3 business days of receiving return.</li>
            <li>Refunds credited back within 5–7 business days.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Shield size={22} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Payment & Security
            </h2>
          </div>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-1">
            <li>Cash on Delivery (COD) available nationwide — Rs. 200 flat fee.</li>
            <li>Bank transfer to our official account (details shown at checkout).</li>
            <li>Your payment screenshots are encrypted and stored securely.</li>
            <li>We never store your full bank or card details.</li>
            <li>All transactions processed through secure channels.</li>
          </ul>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-3">
            <Mail size={22} className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Contact Us
            </h2>
          </div>
          <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400 ml-1">
            <p>Email: support@shopflow.pk</p>
            <p>Phone: +92 300 1234567</p>
            <p>Hours: Mon–Sat, 10:00 AM – 7:00 PM (PKT)</p>
            <p>Address: 42 Liberty Plaza, Gulberg, Lahore, Pakistan</p>
          </div>
        </div>
      </div>
    </div>
  )
}
