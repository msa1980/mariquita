-- =============================================
-- PASSO 1: CRIAÇÃO DAS TABELAS APENAS
-- Execute este script PRIMEIRO no SQL Editor do Supabase
-- =============================================

-- 1. TABELA DE PERFIS DE USUÁRIO (estende auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT UNIQUE,
    role TEXT CHECK (role IN ('admin', 'customer')) DEFAULT 'customer',
    status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. TABELA DE PRODUTOS
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    image_url TEXT,
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    category TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. TABELA DE PEDIDOS
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    status TEXT CHECK (status IN ('Pendente', 'Processando', 'Enviado', 'Entregue', 'Cancelado')) DEFAULT 'Pendente',
    total DECIMAL(10,2) NOT NULL CHECK (total >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. TABELA DE ITENS DO PEDIDO
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
    product_name TEXT NOT NULL,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. TABELA DE PAGAMENTOS
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
    customer_name TEXT NOT NULL,
    method TEXT CHECK (method IN ('Cartão de Crédito', 'PIX', 'Boleto')) NOT NULL,
    status TEXT CHECK (status IN ('Aprovado', 'Pendente', 'Rejeitado')) DEFAULT 'Pendente',
    amount DECIMAL(10,2) NOT NULL CHECK (amount >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir alguns produtos de exemplo
INSERT INTO public.products (name, description, price, image_url, stock, category) VALUES
('Produto Exemplo 1', 'Descrição do produto exemplo', 99.90, 'https://via.placeholder.com/300', 10, 'Eletrônicos'),
('Produto Exemplo 2', 'Outro produto de exemplo', 149.90, 'https://via.placeholder.com/300', 5, 'Roupas'),
('Produto Exemplo 3', 'Mais um produto', 79.90, 'https://via.placeholder.com/300', 15, 'Casa')
ON CONFLICT DO NOTHING;