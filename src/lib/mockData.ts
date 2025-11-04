import { Faker, pt_BR } from '@faker-js/faker';
import { Product } from '../types';

const faker = new Faker({
  locale: [pt_BR],
});

export const createMockProduct = (): Product => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  price: parseFloat(faker.commerce.price({ min: 100, max: 10000, dec: 2 })),
  imageUrl: `${faker.image.urlLoremFlickr({ category: 'technics', width: 640, height: 480 })}?random=${faker.string.uuid()}`,
  stock: faker.number.int({ min: 0, max: 100 }),
  category: faker.commerce.department(),
});

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 20 }, createMockProduct);

export const MOCK_ORDERS = Array.from({ length: 5 }, () => ({
    id: faker.string.uuid(),
    date: faker.date.past().toLocaleDateString('pt-BR'),
    status: faker.helpers.arrayElement(['Pendente', 'Processando', 'Enviado', 'Entregue']),
    total: parseFloat(faker.commerce.price({ min: 200, max: 5000, dec: 2 })),
    items: Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () => ({
        name: faker.commerce.productName(),
        quantity: faker.number.int({ min: 1, max: 2 }),
    })),
}));

export const MOCK_SALES_DATA = [
    { name: 'Jan', vendas: faker.number.int({ min: 1000, max: 5000 }) },
    { name: 'Fev', vendas: faker.number.int({ min: 1000, max: 5000 }) },
    { name: 'Mar', vendas: faker.number.int({ min: 1000, max: 5000 }) },
    { name: 'Abr', vendas: faker.number.int({ min: 1000, max: 5000 }) },
    { name: 'Mai', vendas: faker.number.int({ min: 1000, max: 5000 }) },
    { name: 'Jun', vendas: faker.number.int({ min: 1000, max: 5000 }) },
];
