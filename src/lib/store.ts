import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'soup' | 'dessert' | 'pasta' | 'hot' | 'signature' | 'panini' | 'iced' | 'cold' | 'not-cocktails' | 'soft-beverages' | 'appetizers' | 'pizza';
  image: string;
  description: string;
  isAvailable: boolean;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) =>
    set((state) => {
      const existing = state.items.find((i) => i.item.id === item.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { item, quantity: 1 }] };
    }),
  removeItem: (itemId) =>
    set((state) => ({
      items: state.items.filter((i) => i.item.id !== itemId),
    })),
  updateQuantity: (itemId, quantity) =>
    set((state) => ({
      items:
        quantity <= 0
          ? state.items.filter((i) => i.item.id !== itemId)
          : state.items.map((i) =>
              i.item.id === itemId ? { ...i, quantity } : i
            ),
    })),
  clearCart: () => set({ items: [] }),
  total: () => get().items.reduce((sum, i) => sum + i.item.price * i.quantity, 0),
}));
