import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  BarChart2, 
  LogOut, 
  Users, 
  Settings, 
  CreditCard,
  Bell,
  HelpCircle,
  Store,
  Tag,
  FileText,
  TrendingUp,
  Shield
} from 'lucide-react';
import { useAuthStore } from '../../stores/authStore';
import { cn } from '../../lib/utils';
import { Badge } from '@/components/ui/badge';

const AdminSidebar = () => {
    const location = useLocation();
    const { logout, session } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/admin/login');
    };

    const navSections = [
        {
            title: 'Principal',
            links: [
                { href: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard', badge: null },
                { href: '/admin/pedidos', icon: ShoppingCart, label: 'Pedidos', badge: '12' },
                { href: '/admin/produtos', icon: Package, label: 'Produtos', badge: null },
                { href: '/admin/clientes', icon: Users, label: 'Clientes', badge: null },
            ]
        },
        {
            title: 'Vendas & Marketing',
            links: [
                { href: '/admin/vendas', icon: BarChart2, label: 'Relatórios', badge: null },
                { href: '/admin/promocoes', icon: Tag, label: 'Promoções', badge: 'Novo' },
                { href: '/admin/analytics', icon: TrendingUp, label: 'Analytics', badge: null },
            ]
        },
        {
            title: 'Financeiro',
            links: [
                { href: '/admin/pagamentos', icon: CreditCard, label: 'Pagamentos', badge: '3' },
                { href: '/admin/faturas', icon: FileText, label: 'Faturas', badge: null },
            ]
        },
        {
            title: 'Sistema',
            links: [
                { href: '/admin/configuracoes', icon: Settings, label: 'Configurações', badge: null },
                { href: '/admin/usuarios', icon: Shield, label: 'Usuários', badge: null },
                { href: '/admin/notificacoes', icon: Bell, label: 'Notificações', badge: '5' },
            ]
        }
    ];

    return (
        <aside className="w-72 bg-gradient-to-b from-slate-900 to-slate-800 shadow-2xl flex-shrink-0 flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-slate-700">
                <Link to="/admin/dashboard" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Store className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">DevStore</h1>
                        <p className="text-xs text-slate-400">Painel Admin</p>
                    </div>
                </Link>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                            {session?.email?.charAt(0).toUpperCase() || 'A'}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {session?.email?.split('@')[0] || 'Admin'}
                        </p>
                        <p className="text-xs text-slate-400">Administrador</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                        Online
                    </Badge>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-grow p-4 overflow-y-auto">
                <div className="space-y-6">
                    {navSections.map((section, sectionIndex) => (
                        <div key={sectionIndex}>
                            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                                {section.title}
                            </h3>
                            <ul className="space-y-1">
                                {section.links.map((link) => {
                                    const isActive = location.pathname === link.href;
                                    return (
                                        <li key={link.href}>
                                            <Link
                                                to={link.href}
                                                className={cn(
                                                    "flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                                    isActive 
                                                        ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg" 
                                                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
                                                )}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <link.icon className="w-5 h-5" />
                                                    {link.label}
                                                </div>
                                                {link.badge && (
                                                    <Badge 
                                                        variant={link.badge === 'Novo' ? 'default' : 'secondary'}
                                                        className={cn(
                                                            "text-xs",
                                                            link.badge === 'Novo' 
                                                                ? "bg-orange-500 text-white" 
                                                                : "bg-slate-600 text-slate-200"
                                                        )}
                                                    >
                                                        {link.badge}
                                                    </Badge>
                                                )}
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700 space-y-2">
                <Link 
                    to="/admin/ajuda" 
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-slate-700/50 hover:text-white transition-colors"
                >
                    <HelpCircle className="w-5 h-5" />
                    Ajuda & Suporte
                </Link>
                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm text-slate-300 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    Sair
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
