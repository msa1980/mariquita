import { useParams } from 'react-router-dom';
const ProductDetailsPage = () => {
  const { id } = useParams();
  return (
    <div>
      <h1 className="text-3xl font-bold">Detalhes do Produto {id}</h1>
      <p className="mt-4">Aqui você verá todas as informações sobre o produto selecionado.</p>
    </div>
  );
};
export default ProductDetailsPage;
