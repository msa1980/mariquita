# 🔧 Como Corrigir o Erro "Invalid API Key" do Supabase

## 🚨 Problema Identificado
O erro `401 Unauthorized` indica que as credenciais do Supabase não são válidas. Isso pode acontecer por:

1. **Projeto pausado/desabilitado** no Supabase
2. **Credenciais expiradas** ou incorretas
3. **Projeto deletado** acidentalmente

## 🔍 Como Verificar e Corrigir

### Passo 1: Verificar o Projeto no Supabase
1. Acesse [supabase.com](https://supabase.com)
2. Faça login na sua conta
3. Verifique se o projeto `adjklhgznmpmakclwbak` ainda existe
4. Se o projeto estiver **pausado**, clique em **"Resume"**

### Passo 2: Obter Novas Credenciais
1. No painel do Supabase, vá em **"Settings"** > **"API"**
2. Copie as novas credenciais:
   - **Project URL**
   - **Anon/Public Key**

### Passo 3: Atualizar o Arquivo .env
Substitua as credenciais no arquivo `.env`:

```env
VITE_SUPABASE_URL="SUA_NOVA_URL_AQUI"
VITE_SUPABASE_ANON_KEY="SUA_NOVA_CHAVE_AQUI"
```

### Passo 4: Fazer Deploy das Alterações
```bash
git add .env
git commit -m "Update Supabase credentials"
git push origin main
vercel --prod
```

## 🆕 Se o Projeto Foi Deletado

Se o projeto não existe mais, você precisa:

1. **Criar um novo projeto** no Supabase
2. **Executar o script** `supabase-clean-start.sql` no novo projeto
3. **Atualizar as credenciais** no `.env`
4. **Fazer deploy** das alterações

## 🔐 Credenciais Atuais (Podem Estar Inválidas)
```
URL: https://adjklhgznmpmakclwbak.supabase.co
Key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## ⚡ Solução Rápida
1. Verifique se o projeto Supabase está ativo
2. Se estiver pausado, reative-o
3. Se não existir, crie um novo projeto
4. Atualize as credenciais no `.env`
5. Faça deploy novamente

## 📞 Próximos Passos
Após corrigir as credenciais:
1. Teste o registro de usuário novamente
2. Execute o script para criar o admin
3. Verifique se todas as funcionalidades estão funcionando