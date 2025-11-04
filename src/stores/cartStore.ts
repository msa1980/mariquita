import { create } from 'zustand';
import { toast } from 'sonner';
import { CartStore, Product } from '../types';

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,
  addItem: (product: Product) => {
    const { items } = get();
    const itemExists = items.find((item) => item.id === product.id);

    if (itemExists) {
      if (itemExists.quantity < product.stock) {
        set({
          items: items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
        toast.success(`${product.name} adicionado ao carrinho.`);
      } else {
        toast.warning(`Estoque máximo de ${product.name} atingido.`);
      }
    } else {
      if (product.stock > 0) {
        set({ items: [...items, { ...product, quantity: 1 }] });
        toast.success(`${product.name} adicionado ao carrinho.`);
      } else {
        toast.error(`${product.name} está fora de estoque.`);
      }
    }
    set({ isOpen: true });
  },
  removeItem: (productId: string) => {
    toast.info("Item removido do carrinho.");
    set({
      items: get().items.filter((item) => item.id !== productId),
    });
  },
  updateQuantity: (productId: string, quantity: number) => {
    set({
      items: get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      ).filter(item => item.quantity > 0), // Remove if quantity is 0
    });
  },
  clearCart: () => {
    toast.info("Carrinho esvaziado.");
    set({ items: [] });
  },
  toggleCart: () => set({ isOpen: !get().isOpen }),
  getTotalItems: () => get().items.reduce((total, item) => total + item.quantity, 0),
  getTotalPrice: () => get().items.reduce((total, item) => total + item.price * item.quantity, 0),
}));
