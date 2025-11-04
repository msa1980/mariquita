import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import { AuthStore } from '../types';

export const useAuthStore = create<AuthStore>((set) => ({
  session: null,
  isAdmin: false,
  setSession: (user) => set({ session: user }),
  checkAdmin: async () => {
    // This is a placeholder. In a real app, you'd check a 'roles' table or custom claims.
    const { data: { user } } = await supabase.auth.getUser();
    // For now, let's assume an admin has a specific email for demonstration
    const adminEmails = ['admin@example.com']; 
    const isAdmin = user ? adminEmails.includes(user.email || '') : false;
    set({ isAdmin });
  },
  logout: async () => {
    await supabase.auth.signOut();
    set({ session: null, isAdmin: false });
  },
}));
