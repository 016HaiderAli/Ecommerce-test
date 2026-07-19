import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Trash2, Minus, Plus, Ticket } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { Product } from '../data/products'
import { pb } from '../lib/pocketbase'
import PaymentSplitter from './PaymentSplitter'
import ManualPayment from './ManualPayment'

const checkoutSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().min(7, 'Valid phone required'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  notes: z.string().optional(),
})

type CheckoutInput = z.infer<typeof checkoutSchema>

const COD_FEE = 200

interface Props {
  buyNowItem?: { product: Product; variant: string } | null
  onCheckoutDone?: () => void
}

export default function CheckoutForm({ buyNowItem, onCheckoutDone }: Props) {
  const {
    cart,
    subtotal,
    discountAmount,
    total,
    cartCount,
    increment,
    decrement,
    removeItem,
    applyDiscount,
    clearCart,
  } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bank'>('cod')
  const [discountInput, setDiscountInput] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const discountCode = cart.discountCode

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutInput>({
    resolver: zodResolver(checkoutSchema),
  })

  const codTotal = total + COD_FEE
  const bankTotal = total

  const onSubmit = async (data: CheckoutInput) => {
    try {
      const items = buyNowItem
        ? [{ name: buyNowItem.product.name, variant: buyNowItem.variant, qty: 1, price: buyNowItem.product.price }]
        : cart.items.map((i) => ({
            name: i.product.name,
            variant: i.variant,
            qty: i.quantity,
            price: i.product.price,
          }))

      const subtotalAmt = buyNowItem
        ? buyNowItem.product.price
        : subtotal

      const discountAmt = buyNowItem ? 0 : discountAmount
      const finalTotal = buyNowItem
        ? buyNowItem.product.price + (paymentMethod === 'cod' ? COD_FEE : 0)
        : (paymentMethod === 'cod' ? codTotal : bankTotal)

      await pb.collection('orders').create({
        ...data,
        items,
        subtotal: subtotalAmt,
        discount: discountAmt,
        codFee: paymentMethod === 'cod' ? COD_FEE : 0,
        total: finalTotal,
        paymentMethod,
        status: 'pending',
        payment_status: 'unpaid',
      })
      if (!buyNowItem) clearCart()
      reset()
      setOrderPlaced(true)
    } catch (err) {
      console.error(err)
      alert('Failed to place order. Check your PocketBase server.')
    }
  }

  if (orderPlaced) {
    return (
      <div className="text-center py-16 px-4">
        <div className="text-4xl mb-4">&#10003;</div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
          Order Placed!
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          {paymentMethod === 'cod'
            ? `Pay Rs. ${buyNowItem ? (buyNowItem.product.price + (paymentMethod === 'cod' ? COD_FEE : 0)).toLocaleString() : codTotal} on delivery.`
            : 'Transfer the amount to our bank account and upload the receipt below.'}
        </p>
        {paymentMethod === 'bank' && (
          <div className="max-w-md mx-auto">
            <ManualPayment compact />
          </div>
        )}
        <button
          onClick={() => { setOrderPlaced(false); onCheckoutDone?.() }}
          className="mt-6 text-sm text-purple-600 hover:underline"
        >
          Continue shopping
        </button>
      </div>
    )
  }

  const isBuyNow = !!buyNowItem

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {isBuyNow ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Buying: {buyNowItem.product.name}
          </h3>
          <div className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50">
            <img
              src={buyNowItem.product.images.default}
              alt={buyNowItem.product.name}
              className="w-16 h-16 rounded-lg object-cover bg-gray-200"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {buyNowItem.product.name}
              </p>
              <p className="text-xs text-gray-500">
                {buyNowItem.variant} &middot; Rs. {buyNowItem.product.price.toLocaleString()}
              </p>
            </div>
            <span className="text-sm font-bold text-purple-600">
              Rs. {buyNowItem.product.price.toLocaleString()}
            </span>
          </div>
        </div>
      ) : cartCount === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-sm">Your cart is empty</p>
          <p className="text-xs mt-1">Add items from the Products tab</p>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Cart ({cartCount})
          </h3>
          <div className="space-y-3">
            {cart.items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant}`}
                className="flex items-center gap-4 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50"
              >
                <img
                  src={item.product.images.default}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.variant} &middot; Rs. {item.product.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => decrement(item.product.id, item.variant)}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-gray-100">
                    {item.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => increment(item.product.id, item.variant)}
                    className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.product.id, item.variant)}
                  className="p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {(isBuyNow || cartCount > 0) && (
        <>
          {!isBuyNow && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Discount Code
              </h3>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Ticket size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={discountInput}
                    onChange={(e) => setDiscountInput(e.target.value)}
                    placeholder="Enter code (SAVE10, WELCOME20)"
                    className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => { applyDiscount(discountInput); setDiscountInput('') }}
                  className="px-4 py-2 text-sm font-semibold rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition shrink-0"
                >
                  Apply
                </button>
              </div>
              {discountCode && discountAmount > 0 && (
                <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                  Code &quot;{discountCode}&quot; applied — Rs. {discountAmount} off
                </p>
              )}
              {discountCode && discountAmount === 0 && (
                <p className="text-xs text-red-500 mt-2">
                  Invalid code. Try SAVE10 or WELCOME20.
                </p>
              )}
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <PaymentSplitter value={paymentMethod} onChange={setPaymentMethod} />
          </div>

          {paymentMethod === 'bank' && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
              <ManualPayment />
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
              Order Summary
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span>Rs. {(isBuyNow ? buyNowItem.product.price : subtotal).toLocaleString()}</span>
              </div>
              {!isBuyNow && discountAmount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-Rs. {discountAmount.toLocaleString()}</span>
                </div>
              )}
              {paymentMethod === 'cod' && (
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>COD Fee</span>
                  <span>Rs. {COD_FEE}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 dark:text-gray-100 pt-2 border-t border-gray-200 dark:border-gray-700">
                <span>Total</span>
                <span>
                  Rs.{' '}
                  {(isBuyNow
                    ? buyNowItem.product.price + (paymentMethod === 'cod' ? COD_FEE : 0)
                    : paymentMethod === 'cod'
                      ? codTotal
                      : bankTotal
                  ).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-5">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Shipping Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">Full Name</label>
                  <input {...register('fullName')} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  {errors.fullName && <p className="text-xs text-red-500">{errors.fullName.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">Email</label>
                  <input type="email" {...register('email')} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Phone</label>
                <input type="tel" {...register('phone')} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500">Address</label>
                <input {...register('address')} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                {errors.address && <p className="text-xs text-red-500">{errors.address.message}</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">City</label>
                  <input {...register('city')} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                  {errors.city && <p className="text-xs text-red-500">{errors.city.message}</p>}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-gray-500">Notes</label>
                  <input {...register('notes')} className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-400" />
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-xl text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-50 transition"
          >
            {isSubmitting
              ? 'Placing Order...'
              : `Place Order — Rs. ${(isBuyNow
                  ? buyNowItem.product.price + (paymentMethod === 'cod' ? COD_FEE : 0)
                  : paymentMethod === 'cod'
                    ? codTotal
                    : bankTotal
                ).toLocaleString()}`}
          </button>
        </>
      )}
    </form>
  )
}
