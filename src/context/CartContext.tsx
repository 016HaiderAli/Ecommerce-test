import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Product } from '../data/products'

export interface CartItem {
  product: Product
  variant: string
  quantity: number
}

interface CartState {
  items: CartItem[]
  discountCode: string
  appliedDiscount: number
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; variant: string }
  | { type: 'REMOVE_ITEM'; productId: string; variant: string }
  | { type: 'INCREMENT'; productId: string; variant: string }
  | { type: 'DECREMENT'; productId: string; variant: string }
  | { type: 'APPLY_DISCOUNT'; code: string }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const key = `${action.product.id}-${action.variant}`
      const exists = state.items.find(
        (i) => `${i.product.id}-${i.variant}` === key,
      )
      if (exists) {
        return {
          ...state,
          items: state.items.map((i) =>
            `${i.product.id}-${i.variant}` === key
              ? { ...i, quantity: i.quantity + 1 }
              : i,
          ),
        }
      }
      return {
        ...state,
        items: [
          ...state.items,
          { product: action.product, variant: action.variant, quantity: 1 },
        ],
      }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => `${i.product.id}-${i.variant}` !== `${action.productId}-${action.variant}`,
        ),
      }
    case 'INCREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          `${i.product.id}-${i.variant}` === `${action.productId}-${action.variant}`
            ? { ...i, quantity: i.quantity + 1 }
            : i,
        ),
      }
    case 'DECREMENT':
      return {
        ...state,
        items: state.items.map((i) =>
          `${i.product.id}-${i.variant}` === `${action.productId}-${action.variant}`
            ? { ...i, quantity: Math.max(0, i.quantity - 1) }
            : i,
        ).filter((i) => i.quantity > 0),
      }
    case 'APPLY_DISCOUNT': {
      const valid = action.code.toUpperCase() === 'SAVE10' ? 10
        : action.code.toUpperCase() === 'WELCOME20' ? 20
        : 0
      return { ...state, discountCode: action.code, appliedDiscount: valid }
    }
    case 'CLEAR':
      return { items: [], discountCode: '', appliedDiscount: 0 }
  }
}

interface CartContextType {
  cart: CartState
  addItem: (product: Product, variant: string) => void
  removeItem: (productId: string, variant: string) => void
  increment: (productId: string, variant: string) => void
  decrement: (productId: string, variant: string) => void
  applyDiscount: (code: string) => void
  clearCart: () => void
  cartCount: number
  subtotal: number
  discountAmount: number
  total: number
  getItemQty: (productId: string, variant: string) => number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, {
    items: [],
    discountCode: '',
    appliedDiscount: 0,
  })

  const addItem = (product: Product, variant: string) =>
    dispatch({ type: 'ADD_ITEM', product, variant })
  const removeItem = (productId: string, variant: string) =>
    dispatch({ type: 'REMOVE_ITEM', productId, variant })
  const increment = (productId: string, variant: string) =>
    dispatch({ type: 'INCREMENT', productId, variant })
  const decrement = (productId: string, variant: string) =>
    dispatch({ type: 'DECREMENT', productId, variant })
  const applyDiscount = (code: string) =>
    dispatch({ type: 'APPLY_DISCOUNT', code })
  const clearCart = () => dispatch({ type: 'CLEAR' })

  const cartCount = cart.items.reduce((s, i) => s + i.quantity, 0)
  const subtotal = cart.items.reduce(
    (s, i) => s + i.product.price * i.quantity,
    0,
  )
  const discountAmount = Math.round(subtotal * (cart.appliedDiscount / 100))
  const total = subtotal - discountAmount

  const getItemQty = (productId: string, variant: string) =>
    cart.items.find(
      (i) => i.product.id === productId && i.variant === variant,
    )?.quantity ?? 0

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        increment,
        decrement,
        applyDiscount,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        total,
        getItemQty,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
