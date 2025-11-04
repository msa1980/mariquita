import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import CartDrawer from '../store/CartDrawer';

const Header = () => {
  const { session, isAdmin, logout } = useAuthStore();
  const { getTotalItems, toggleCart } = useCartStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const totalItems = getTotalItems();

  return (
    <>
      <header className="bg-card shadow-sm sticky top-0 z-40">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary dark:text-white">
            DevStore
          </Link>
          <div className="flex items-center space-x-4">
            <button onClick={toggleCart} className="relative text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
              <ShoppingCart />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </span>
              )}
            </button>
            {session ? (
              <div className="flex items-center space-x-4">
                {isAdmin && (
                  <Link to="/admin/dashboard" title="Admin Dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                    <LayoutDashboard />
                  </Link>
                )}
                <Link to="/cliente/dashboard" title="Minha Conta" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                  <User />
                </Link>
                <button onClick={handleLogout} title="Sair" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                  <LogOut />
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-white">
                Entrar
              </Link>
            )}
          </div>
        </nav>
      </header>
      <CartDrawer />
    </>
  );
};

export default Header;
