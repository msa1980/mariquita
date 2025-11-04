import { Plus } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/stores/cartStore';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="p-0">
        <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="text-lg font-bold truncate">{product.name}</CardTitle>
        <CardDescription className="text-sm text-gray-500 mt-1">{product.category}</CardDescription>
        <p className="text-xl font-semibold mt-2">
          {product.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => addItem(product)} className="w-full" disabled={product.stock === 0}>
          <Plus className="mr-2 h-4 w-4" /> {product.stock > 0 ? 'Adicionar' : 'Esgotado'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
