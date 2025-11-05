# 🗄️ Configuração do Banco de Dados Supabase

## Como executar o script SQL

### 1. Acesse seu painel do Supabase
- Vá para [supabase.com](https://supabase.com)
- Faça login na sua conta
- Selecione seu projeto (adjklhgznmpmakclwbak)

### 2. Abra o SQL Editor
- No menu lateral, clique em **"SQL Editor"**
- Clique em **"New query"**

### 3. Execute o script
- Copie todo o conteúdo do arquivo `supabase-setup.sql`
- Cole no editor SQL
- Clique em **"Run"** para executar

## 📋 O que o script cria:

### Tabelas:
- **`profiles`** - Perfis de usuários (estende auth.users)
- **`products`** - Catálogo de produtos
- **`orders`** - Pedidos dos clientes
- **`order_items`** - Itens de cada pedido
- **`payments`** - Pagamentos dos pedidos

### Recursos de Segurança:
- **RLS (Row Level Security)** habilitado em todas as tabelas
- **Políticas de segurança** para controlar acesso aos dados
- **Triggers** para atualizar timestamps automaticamente
- **Função automática** para criar perfil quando usuário se registra

### Dados Iniciais:
- 3 produtos de exemplo para testar o sistema

## 🔐 Configuração de Administrador

Para tornar um usuário administrador:

1. Registre-se normalmente no seu app
2. No Supabase, vá em **"Table Editor"** > **"profiles"**
3. Encontre seu usuário e altere o campo `role` de `customer` para `admin`

## ✅ Verificação

Após executar o script, você deve ver as seguintes tabelas no **Table Editor**:
- profiles
- products  
- orders
- order_items
- payments

## 🚀 Próximos Passos

1. Execute o script SQL no Supabase
2. Registre-se no seu app para criar o primeiro usuário
3. Altere o role do usuário para 'admin' no painel do Supabase
4. Teste as funcionalidades de admin no seu app

## 🔧 Personalização

Você pode modificar:
- Categorias de produtos na tabela `products`
- Status de pedidos na tabela `orders`
- Métodos de pagamento na tabela `payments`
- Adicionar novos campos conforme necessário

## 📞 Suporte

Se encontrar algum erro durante a execução:
1. Verifique se todas as extensões necessárias estão habilitadas
2. Confirme se o RLS está configurado corretamente
3. Teste as políticas de segurança com diferentes usuários