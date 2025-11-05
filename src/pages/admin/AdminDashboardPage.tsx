import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_SALES_DATA } from '@/lib/mockData';
import { 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Star,
  Calendar,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboardPage = () => {
  // Dados mockados mais realistas
  const revenueData = [
    { month: 'Jan', revenue: 45000, orders: 120, customers: 89 },
    { month: 'Fev', revenue: 52000, orders: 145, customers: 102 },
    { month: 'Mar', revenue: 48000, orders: 132, customers: 95 },
    { month: 'Abr', revenue: 61000, orders: 168, customers: 118 },
    { month: 'Mai', revenue: 55000, orders: 155, customers: 108 },
    { month: 'Jun', revenue: 67000, orders: 189, customers: 134 },
  ];

  const categoryData = [
    { name: 'Eletrônicos', value: 35, color: '#8884d8' },
    { name: 'Roupas', value: 28, color: '#82ca9d' },
    { name: 'Casa', value: 20, color: '#ffc658' },
    { name: 'Esportes', value: 17, color: '#ff7c7c' },
  ];

  const topProducts = [
    { name: 'iPhone 15 Pro', sales: 234, revenue: 'R$ 234.000' },
    { name: 'MacBook Air M2', sales: 156, revenue: 'R$ 187.200' },
    { name: 'AirPods Pro', sales: 189, revenue: 'R$ 94.500' },
    { name: 'iPad Air', sales: 145, revenue: 'R$ 87.000' },
  ];

  const recentOrders = [
    { id: '#12345', customer: 'João Silva', amount: 'R$ 1.299,00', status: 'Entregue', time: '2 min atrás' },
    { id: '#12346', customer: 'Maria Santos', amount: 'R$ 899,00', status: 'Processando', time: '5 min atrás' },
    { id: '#12347', customer: 'Pedro Costa', amount: 'R$ 2.199,00', status: 'Pendente', time: '8 min atrás' },
    { id: '#12348', customer: 'Ana Oliveira', amount: 'R$ 599,00', status: 'Enviado', time: '12 min atrás' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue': return 'text-green-600 bg-green-100';
      case 'Processando': return 'text-blue-600 bg-blue-100';
      case 'Enviado': return 'text-purple-600 bg-purple-100';
      case 'Pendente': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Visão geral do seu negócio</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Últimos 30 dias
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Receita Total</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">R$ 328.000</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">+12.5% vs mês anterior</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pedidos</CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">1.309</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">+8.2% vs mês anterior</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Clientes</CardTitle>
            <Users className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">646</div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
              <p className="text-sm text-green-600 font-medium">+15.3% vs mês anterior</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">3.24%</div>
            <div className="flex items-center mt-2">
              <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
              <p className="text-sm text-red-600 font-medium">-2.1% vs mês anterior</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Receita Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`R$ ${value.toLocaleString()}`, 'Receita']} />
                <Area type="monotone" dataKey="revenue" stroke="#8884d8" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Vendas por Categoria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tables Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              Produtos Mais Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{product.sales} vendas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">{product.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pedidos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                      <Package className="w-4 h-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{order.id}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{order.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-white">{order.amount}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className="text-xs text-gray-500">{order.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Package className="w-6 h-6" />
              Adicionar Produto
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <Users className="w-6 h-6" />
              Gerenciar Clientes
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <ShoppingCart className="w-6 h-6" />
              Ver Pedidos
            </Button>
            <Button className="h-20 flex-col gap-2" variant="outline">
              <BarChart className="w-6 h-6" />
              Relatórios
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminDashboardPage;
