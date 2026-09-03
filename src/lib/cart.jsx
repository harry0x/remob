import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { PRODUCTS } from '../data/products'

/**
 * Cart state for the whole app, persisted to localStorage so a reload (or a
 * hop between hash routes) keeps the basket. Lines are stored as a plain
 * { [productId]: quantity } map and joined against PRODUCTS on read, so the
 * stored payload never goes stale when catalogue copy or pricing changes.
 */
const CartContext = createContext(null)
const STORAGE_KEY = 'remob.cart.v1'

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    // Private mode, blocked storage, corrupt JSON — start empty.
    return {}
  }
}

export function CartProvider({ children }) {
  const [lines, setLines] = useState(readStored)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
    } catch {
      // Persistence is a convenience; never break the page over it.
    }
  }, [lines])

  const value = useMemo(() => {
    const items = Object.entries(lines)
      .map(([id, qty]) => ({ product: PRODUCTS.find((p) => p.id === id), qty }))
      .filter((line) => line.product && line.qty > 0)

    return {
      items,
      count: items.reduce((total, line) => total + line.qty, 0),
      subtotal: items.reduce((total, line) => total + line.product.priceValue * line.qty, 0),
      savings: items.reduce(
        (total, line) => total + (line.product.mrpValue - line.product.priceValue) * line.qty,
        0
      ),
      add: (id, qty = 1) => setLines((current) => ({ ...current, [id]: (current[id] ?? 0) + qty })),
      setQty: (id, qty) =>
        setLines((current) => {
          const next = { ...current }
          if (qty <= 0) delete next[id]
          else next[id] = Math.min(qty, 9)
          return next
        }),
      remove: (id) =>
        setLines((current) => {
          const next = { ...current }
          delete next[id]
          return next
        }),
      clear: () => setLines({}),
    }
  }, [lines])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside <CartProvider>')
  return context
}
