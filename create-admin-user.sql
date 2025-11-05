-- =============================================
-- SCRIPT PARA CRIAR USUÁRIO ADMIN
-- Execute este script no SQL Editor do Supabase
-- =============================================

-- Primeiro, vamos inserir o usuário na tabela auth.users
-- IMPORTANTE: Este script deve ser executado APÓS o usuário se registrar normalmente
-- no app, pois o Supabase gerencia a autenticação automaticamente.

-- Para criar um admin, siga estes passos:
-- 1. Registre-se no app com email: thelo1980@gmail.com e senha: 080555
-- 2. Depois execute este script para tornar o usuário admin:

UPDATE public.profiles 
SET role = 'admin', status = 'active'
WHERE email = 'thelo1980@gmail.com';

-- Verificar se o usuário foi atualizado corretamente
SELECT id, full_name, email, role, status, created_at 
FROM public.profiles 
WHERE email = 'thelo1980@gmail.com';

-- =============================================
-- ALTERNATIVA: Se o usuário ainda não existe
-- =============================================

-- Se por algum motivo o perfil não foi criado automaticamente,
-- você pode criar manualmente (mas isso é raro):

-- INSERT INTO public.profiles (id, full_name, email, role, status)
-- SELECT id, 'Admin User', 'thelo1980@gmail.com', 'admin', 'active'
-- FROM auth.users 
-- WHERE email = 'thelo1980@gmail.com'
-- ON CONFLICT (email) DO UPDATE SET role = 'admin', status = 'active';

-- =============================================
-- VERIFICAÇÃO FINAL
-- =============================================

-- Para confirmar que tudo está correto:
SELECT 
    au.email as "Email do Auth",
    au.created_at as "Criado em",
    p.full_name as "Nome Completo",
    p.role as "Função",
    p.status as "Status"
FROM auth.users au
LEFT JOIN public.profiles p ON au.id = p.id
WHERE au.email = 'thelo1980@gmail.com';