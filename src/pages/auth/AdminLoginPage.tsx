import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginFormData } from '@/schemas/authSchema';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useAuthStore } from '@/stores/authStore';

const AdminLoginPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { checkAdmin } = useAuthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    toast.loading("Entrando...");
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    
    if (error) {
      setLoading(false);
      toast.dismiss();
      toast.error(error.message || 'Falha no login.');
      return;
    }

    // Check if the user is an admin
    await checkAdmin();
    const isAdmin = useAuthStore.getState().isAdmin;

    setLoading(false);
    toast.dismiss();

    if (isAdmin) {
      toast.success('Login de administrador realizado com sucesso!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Acesso negado. Esta conta não é de administrador.');
      await supabase.auth.signOut();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login Administrativo</CardTitle>
          <CardDescription>Acesse o painel de controle.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@example.com" {...register('email')} />
              {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};
export default AdminLoginPage;
