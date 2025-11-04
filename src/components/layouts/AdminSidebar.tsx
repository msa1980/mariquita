import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, BarChart2, LogOut } from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { cn } from '../../lib/utils';

const AdminSidebar = () => {
    const location = useLocation();
    const { logout } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const navLinks = [
        { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { href: '/admin/produtos', icon: Package, label: 'Produtos' },
        { href: '/admin/pedidos', icon: ShoppingCart, label: 'Pedidos' },
        { href: '/admin/vendas', icon: BarChart2, label: 'Vendas' },
    ];

    return (
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 flex flex-col">
            <div className="p-4 border-b dark:border-gray-700">
                <Link to="/admin/dashboard" className="text-2xl font-bold text-primary dark:text-white">
                    Admin
                </Link>
            </div>
            <nav className="flex-grow p-4">
                <ul>
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <Link
                                to={link.href}
                                className={cn(
                                    "flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700",
                                    location.pathname === link.href && "bg-gray-200 dark:bg-gray-700 font-semibold"
                                )}
                            >
                                <link.icon className="w-5 h-5 mr-3" />
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 border-t dark:border-gray-700">
                 <button onClick={handleLogout} className="flex items-center w-full px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                    <LogOut className="w-5 h-5 mr-3" />
                    Sair
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
