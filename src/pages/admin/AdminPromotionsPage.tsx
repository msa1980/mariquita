import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Tag,
  Calendar,
  Percent,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Gift
} from 'lucide-react';

const AdminPromotionsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Funções para os botões
  const handleCreatePromotion = () => {
    toast.success('Abrindo formulário para nova promoção...');
  };

  const handleViewPromotion = (promotionId: string) => {
    toast.info(`Visualizando promoção ${promotionId}`);
  };

  const handleEditPromotion = (promotionId: string) => {
    toast.info(`Editando promoção ${promotionId}`);
  };

  const handleDeletePromotion = (promotionId: string) => {
    toast.error(`Promoção ${promotionId} removida`);
  };

  const handleQuickAction = (type: string) => {
    toast.success(`Criando promoção do tipo: ${type}`);
  };

  // Mock data para promoções
  const promotions = [
    {
      id: '1',
      name: 'Black Friday 2024',
      description: 'Descontos de até 70% em eletrônicos',
      discount: 70,
      type: 'percentage',
      startDate: '2024-11-25',
      endDate: '2024-11-30',
      status: 'active',
      usageCount: 1250,
      maxUsage: 5000,
      categories: ['Eletrônicos', 'Casa'],
      revenue: 125000,
      image: 'https://via.placeholder.com/300x150'
    },
    {
      id: '2',
      name: 'Frete Grátis',
      description: 'Frete grátis para compras acima de R$ 100',
      discount: 0,
      type: 'free_shipping',
      startDate: '2024-11-01',
      endDate: '2024-12-31',
      status: 'active',
      usageCount: 890,
      maxUsage: null,
      categories: ['Todos'],
      revenue: 45000,
      image: 'https://via.placeholder.com/300x150'
    },
    {
      id: '3',
      name: 'Cyber Monday',
      description: 'R$ 50 de desconto em compras acima de R$ 300',
      discount: 50,
      type: 'fixed',
      startDate: '2024-12-02',
      endDate: '2024-12-02',
      status: 'scheduled',
      usageCount: 0,
      maxUsage: 1000,
      categories: ['Eletrônicos'],
      revenue: 0,
      image: 'https://via.placeholder.com/300x150'
    },
    {
      id: '4',
      name: 'Liquidação de Verão',
      description: '30% de desconto em roupas',
      discount: 30,
      type: 'percentage',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      status: 'expired',
      usageCount: 567,
      maxUsage: 2000,
      categories: ['Roupas'],
      revenue: 78000,
      image: 'https://via.placeholder.com/300x150'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativa</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Agendada</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expirada</Badge>;
      case 'paused':
        return <Badge variant="outline">Pausada</Badge>;
      default:
        return <Badge variant="outline">Desconhecida</Badge>;
    }
  };

  const getDiscountDisplay = (promotion: any) => {
    switch (promotion.type) {
      case 'percentage':
        return `${promotion.discount}% OFF`;
      case 'fixed':
        return `R$ ${promotion.discount} OFF`;
      case 'free_shipping':
        return 'Frete Grátis';
      default:
        return 'Desconto';
    }
  };

  const filteredPromotions = promotions.filter(promotion => {
    const matchesSearch = promotion.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || promotion.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const activePromotions = promotions.filter(p => p.status === 'active').length;
  const totalRevenue = promotions.reduce((sum, p) => sum + p.revenue, 0);
  const totalUsage = promotions.reduce((sum, p) => sum + p.usageCount, 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Promoções</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Gerencie campanhas promocionais</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm" onClick={() => toast.info('Visualizando todas as promoções')}>
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
          <Button size="sm" onClick={handleCreatePromotion}>
            <Plus className="w-4 h-4 mr-2" />
            Nova Promoção
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Promoções Ativas</p>
                <p className="text-2xl font-bold text-green-600">{activePromotions}</p>
              </div>
              <Tag className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Receita Gerada</p>
                <p className="text-2xl font-bold text-blue-600">R$ {totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total de Usos</p>
                <p className="text-2xl font-bold text-purple-600">{totalUsage.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taxa de Conversão</p>
                <p className="text-2xl font-bold text-orange-600">8.5%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
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
                  placeholder="Buscar promoções..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Todos os Status</option>
                <option value="active">Ativas</option>
                <option value="scheduled">Agendadas</option>
                <option value="expired">Expiradas</option>
                <option value="paused">Pausadas</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Promotions Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPromotions.map((promotion) => (
          <Card key={promotion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={`https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=300&h=150&fit=crop&q=80`}
                alt={promotion.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(promotion.status)}
              </div>
              <div className="absolute top-2 left-2">
                <Badge className="bg-red-500 text-white">
                  {getDiscountDisplay(promotion)}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">{promotion.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{promotion.description}</p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(promotion.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{promotion.usageCount} usos</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1">
                  {promotion.categories.map((category, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm">
                    <span className="font-medium text-green-600">
                      R$ {promotion.revenue.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-1">receita</span>
                  </div>
                  
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => handleViewPromotion(promotion.id)}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditPromotion(promotion.id)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600" onClick={() => handleDeletePromotion(promotion.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5" />
            Ações Rápidas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button className="h-16 flex-col gap-2" variant="outline" onClick={() => handleQuickAction('Desconto Percentual')}>
              <Percent className="w-6 h-6" />
              Desconto Percentual
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline" onClick={() => handleQuickAction('Desconto Fixo')}>
              <DollarSign className="w-6 h-6" />
              Desconto Fixo
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline" onClick={() => handleQuickAction('Frete Grátis')}>
              <Tag className="w-6 h-6" />
              Frete Grátis
            </Button>
            <Button className="h-16 flex-col gap-2" variant="outline" onClick={() => handleQuickAction('Combo Especial')}>
              <Star className="w-6 h-6" />
              Combo Especial
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPromotionsPage;