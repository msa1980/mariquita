import ProductCard from "@/components/store/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { 
  Tag, 
  Clock, 
  Star, 
  Zap, 
  Gift, 
  Truck,
  ArrowRight,
  Percent,
  ShoppingBag
} from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Promoções em destaque
  const featuredPromotions = [
    {
      id: '1',
      title: 'Black Friday 2024',
      description: 'Até 70% OFF em eletrônicos',
      discount: '70% OFF',
      endDate: '2024-11-30',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=300&fit=crop',
      bgGradient: 'from-red-500 to-pink-600',
      textColor: 'text-white'
    },
    {
      id: '2',
      title: 'Frete Grátis',
      description: 'Em compras acima de R$ 100',
      discount: 'GRÁTIS',
      endDate: '2024-12-31',
      image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=300&h=200&fit=crop',
      bgGradient: 'from-blue-500 to-cyan-600',
      textColor: 'text-white'
    },
    {
      id: '3',
      title: 'Cyber Monday',
      description: 'R$ 50 OFF em compras acima de R$ 300',
      discount: 'R$ 50 OFF',
      endDate: '2024-12-02',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300&h=200&fit=crop',
      bgGradient: 'from-purple-500 to-indigo-600',
      textColor: 'text-white'
    }
  ];

  const handlePromotionClick = (promotionId: string) => {
    toast.success(`Redirecionando para a promoção ${promotionId}!`);
    // Aqui você pode navegar para uma página específica da promoção
    navigate(`/promocao/${promotionId}`);
  };

  const handleNewsletterSignup = () => {
    if (!email) {
      toast.error('Por favor, digite seu email');
      return;
    }
    if (!email.includes('@')) {
      toast.error('Por favor, digite um email válido');
      return;
    }
    toast.success('Email cadastrado com sucesso! Você receberá nossas ofertas.');
    setEmail('');
  };

  const handleViewAllProducts = () => {
    navigate('/produtos');
  };

  const handleViewAllPromotions = () => {
    navigate('/promocoes');
  };

  const quickOffers = [
    { icon: Percent, title: 'Até 50% OFF', subtitle: 'Em produtos selecionados' },
    { icon: Truck, title: 'Frete Grátis', subtitle: 'Compras acima de R$ 100' },
    { icon: Gift, title: 'Primeira Compra', subtitle: '10% de desconto' },
    { icon: Zap, title: 'Entrega Rápida', subtitle: 'Receba em 24h' }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section com Promoção Principal */}
      <section className="relative overflow-hidden rounded-2xl">
        <div className={`bg-gradient-to-r ${featuredPromotions[0].bgGradient} p-8 md:p-12`}>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge className="bg-white/20 text-white border-white/30">
                  <Tag className="w-3 h-3 mr-1" />
                  Oferta Limitada
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold text-white">
                  {featuredPromotions[0].title}
                </h1>
                <p className="text-xl text-white/90">
                  {featuredPromotions[0].description}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                  <div className="text-3xl font-bold text-white">
                    {featuredPromotions[0].discount}
                  </div>
                </div>
                <div className="text-white/80">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="w-4 h-4" />
                    Termina em: {new Date(featuredPromotions[0].endDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-white text-gray-900 hover:bg-gray-100"
                onClick={() => handlePromotionClick(featuredPromotions[0].id)}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Aproveitar Oferta
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
            
            <div className="hidden md:block">
              <img 
                src={featuredPromotions[0].image} 
                alt={featuredPromotions[0].title}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Ofertas Rápidas */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickOffers.map((offer, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                toast.info(`Explorando: ${offer.title}`);
                navigate('/produtos');
              }}
            >
              <CardContent className="p-6 text-center">
                <offer.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
                <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{offer.subtitle}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Promoções Secundárias */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Promoções Especiais</h2>
          <Button variant="outline" onClick={handleViewAllPromotions}>
            Ver Todas
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {featuredPromotions.slice(1).map((promotion) => (
            <Card 
              key={promotion.id} 
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => handlePromotionClick(promotion.id)}
            >
              <div className={`bg-gradient-to-r ${promotion.bgGradient} p-6`}>
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Badge className="bg-white/20 text-white border-white/30">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                    <h3 className="text-xl font-bold text-white">{promotion.title}</h3>
                    <p className="text-white/90">{promotion.description}</p>
                    <div className="flex items-center gap-2 text-sm text-white/80">
                      <Clock className="w-4 h-4" />
                      Até {new Date(promotion.endDate).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
                      <div className="text-lg font-bold text-white">
                        {promotion.discount}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Produtos em Destaque</h2>
          <Button variant="outline" onClick={handleViewAllProducts}>
            Ver Catálogo Completo
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Não Perca Nenhuma Oferta!
          </h2>
          <p className="text-xl text-gray-300">
            Cadastre-se e receba as melhores promoções diretamente no seu email
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Seu melhor email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleNewsletterSignup()}
            />
            <Button 
              size="lg" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleNewsletterSignup}
            >
              <Gift className="w-5 h-5 mr-2" />
              Cadastrar
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;
