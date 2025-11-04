import { User as SupabaseUser } from "@supabase/supabase-js";

export interface AuthStore {
  session: SupabaseUser | null;
  isAdmin: boolean;
  setSession: (user: SupabaseUser | null) => void;
  checkAdmin: () => Promise<void>;
  logout: () => Promise<void>;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  fullName: string;
  email: string;
  role: 'admin' | 'customer';
  status: 'active' | 'inactive';
  createdAt: string;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  status: 'Pendente' | 'Processando' | 'Enviado' | 'Entregue' | 'Cancelado';
  total: number;
  items: {
    productId: string;
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export interface Payment {
  id: string;
  orderId: string;
  customerName: string;
  date: string;
  method: 'Cartão de Crédito' | 'PIX';
  status: 'Aprovado' | 'Pendente' | 'Rejeitado';
  amount: number;
}


export interface CartItem extends Product {
  quantity: number;
}

export interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export interface ChatbotStore {
    isOpen: boolean;
    messages: ChatMessage[];
    toggleChat: () => void;
    addMessage: (message: ChatMessage) => void;
}

export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    options?: string[];
}

// Zustand Store Interfaces
export interface ProductStore {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
}

export interface UserStore {
  users: AdminUser[];
  addUser: (user: Omit<AdminUser, 'id' | 'createdAt'>) => void;
  updateUser: (user: AdminUser) => void;
  deleteUser: (userId: string) => void;
}

export interface OrderStore {
  orders: Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export interface PaymentStore {
  payments: Payment[];
}
