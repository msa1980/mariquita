import { useAuthStore } from "@/stores/authStore";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_ORDERS } from "@/lib/mockData";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";

const CustomerDashboardPage = () => {
  const { session } = useAuthStore();
  const recentOrder = MOCK_ORDERS[0];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Olá, {session?.user_metadata.full_name || 'Cliente'}!</h1>
      <p className="text-muted-foreground">Bem-vindo ao seu painel. Aqui está um resumo da sua atividade recente.</p>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Último Pedido</CardTitle>
            <CardDescription>Status do seu pedido mais recente.</CardDescription>
          </CardHeader>
          <CardContent>
            {recentOrder ? (
              <div className="space-y-2">
                <p><strong>ID do Pedido:</strong> #{recentOrder.id.substring(0, 8)}</p>
                <p><strong>Data:</strong> {recentOrder.date}</p>
                <p><strong>Total:</strong> {recentOrder.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p><strong>Status:</strong> <span className="font-semibold">{recentOrder.status}</span></p>
              </div>
            ) : (
              <p>Você ainda não fez nenhum pedido.</p>
            )}
          </CardContent>
        </Card>
        
        <Card className="flex flex-col justify-center items-center text-center">
          <CardHeader>
            <CardTitle>Histórico de Pedidos</CardTitle>
            <CardDescription>Veja todos os seus pedidos anteriores.</CardDescription>
          </CardHeader>
          <CardContent>
            <Package className="h-12 w-12 text-primary mx-auto mb-4" />
            <Link to="/cliente/historico">
              <Button>Ver Histórico</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default CustomerDashboardPage;
