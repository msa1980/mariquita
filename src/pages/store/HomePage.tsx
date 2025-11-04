import ProductCard from "@/components/store/ProductCard";
import { MOCK_PRODUCTS } from "@/lib/mockData";

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Catálogo de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {MOCK_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default HomePage;
