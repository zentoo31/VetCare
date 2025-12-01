import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  total: () => number;
};

export const useCart = create<CartState>()(
  persist((set, get) => ({
    items: [],
    addItem: (item) => {
      const { items } = get();
      const qty = item.quantity ?? 1;
      const existing = items.find((i) => i.id === item.id);
      if (existing) {
        set({
          items: items.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + qty } : i)),
        });
      } else {
        set({ items: [...items, { ...item, quantity: qty }] });
      }
    },
    removeItem: (id) => set({ items: get().items.filter((i) => i.id !== id) }),
    updateQuantity: (id, quantity) => {
      if (quantity <= 0) {
        set({ items: get().items.filter((i) => i.id !== id) });
      } else {
        set({ items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)) });
      }
    },
    clear: () => set({ items: [] }),
    total: () => get().items.reduce((s, it) => s + it.price * it.quantity, 0),
  }), { name: 'vetcare-cart' })
);

export default useCart;
