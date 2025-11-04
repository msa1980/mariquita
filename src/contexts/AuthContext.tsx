import { createContext, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../stores/authStore';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { setSession, checkAdmin } = useAuthStore();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session?.user ?? null);
      if (session) {
        await checkAdmin();
      }
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session?.user ?? null);
      if (session) {
        checkAdmin();
      }
    });

    return () => subscription.unsubscribe();
  }, [setSession, checkAdmin]);

  return <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
