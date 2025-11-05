import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Package, 
  DollarSign,
  TrendingUp,
  AlertTriangle,
  MoreHorizontal,
  Download,
  Upload
} from 'lucide-react';

const AdminProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - em produção viria do Supabase
  const products = [
    {
      id: '1',
      name: 'iPhone 15 Pro Max',
      category: 'Eletrônicos',
      price: 8999.00,
      stock: 25,
      status: 'active',
      sales: 156,
      image: 'https://via.placeholder.com/80',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      name: 'MacBook Air M2',
      category: 'Eletrônicos',
      price: 12999.00,
      stock: 8,
      status: 'active',
      sales: 89,
      image: 'https://via.placeholder.com/80',
      createdAt: '2024-01-10'
    },
    {
      id: '3',
      name: 'Camiseta Premium',
      category: 'Roupas',
      price: 89.90,
      stock: 0,
      status: 'out_of_stock',
      sales: 234,
      image: 'https://via.placeholder.com/80',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      name: 'Tênis Esportivo',
      category: 'Esportes',
      price: 299.90,
      stock: 45,
      status: 'active',
      sales: 67,
      image: 'https://via.placeholder.com/80',
      createdAt: '2024-01-05'
    },
    {
      id: '5',
      name: 'Mesa de Escritório',
      category: 'Casa',
      price: 599.90,
      stock: 12,
      status: 'draft',
      sales: 23,
      image: 'https://via.placeholder.com/80',
      createdAt: '2024-01-03'
    }
  ];

  const categories = ['all', 'Eletrônicos', 'Roupas', 'Casa', 'Esportes'];

  const getStatusBadge = (status: string, stock: number) => {
    if (stock === 0) {
      return <Badge variant="destructive">Sem Estoque</Badge>;
    }
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'draft':
        return <Badge variant="secondary">Rascunho</Badge>;
      case 'out_of_stock':
        return <Badge variant="destructive">Sem Estoque</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return 'text-red-600';
    if (stock < 10) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === 'active').length;
  const outOfStock = products.filter(p => p.stock === 0).length;
  const totalValue = products.reduce((sum, p) => sum + (p.price * p.stock), 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Produtos</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie seu catálogo de produtos</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Button>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Produtos</p>
                <p className="text-2xl font-bold text-gray-900">{totalProducts}</p>
              </div>
              <Package className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Produtos Ativos</p>
                <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sem Estoque</p>
                <p className="text-2xl font-bold text-red-600">{outOfStock}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Valor Total</p>
                <p className="text-2xl font-bold text-gray-900">R$ {totalValue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas as Categorias' : category}
                  </option>
                ))}
              </select>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Produtos ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Produto</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Categoria</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Preço</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Estoque</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Vendas</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{product.name}</p>
                          <p className="text-sm text-gray-500">ID: {product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium">R$ {product.price.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${getStockStatus(product.stock)}`}>
                        {product.stock} unidades
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-600">{product.sales} vendas</span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(product.status, product.stock)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => alert(`Visualizando produto ${product.name}`)}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => alert(`Editando produto ${product.name}`)}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(`Tem certeza que deseja remover ${product.name}?`)) {
                              alert(`Produto ${product.name} removido`);
                            }
                          }}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => alert('Menu de opções')}
                          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AdminProductsPage;
