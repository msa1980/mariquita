import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema, RegisterFormData } from '@/schemas/authSchema';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { useCep } from '@/hooks/useCep';
import { useIMask } from 'react-imask';

const CustomerRegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, trigger } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  
  const { ref: cepRef, value: cepValue } = useIMask({ mask: '00000-000' }, {
    onAccept: (value) => setValue('cep', value as string, { shouldValidate: true })
  });

  const { isCepLoading, handleCepBlur } = useCep(setValue);

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    toast.loading("Criando sua conta...");

    const { data: { user }, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
          // In a real app, you'd save address to a separate 'profiles' table after email confirmation
        },
        emailRedirectTo: `${window.location.origin}/`
      }
    });

    setLoading(false);
    toast.dismiss();

    if (error) {
      toast.error(error.message || 'Falha ao criar conta.');
    } else if (user) {
      toast.success('Conta criada! Verifique seu email para confirmar.');
      navigate('/login');
    }
  };

  return (
    <div className="flex justify-center items-center py-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl">Crie sua Conta</CardTitle>
          <CardDescription>Preencha os campos abaixo para se cadastrar.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nome Completo</Label>
                <Input id="fullName" {...register('fullName')} />
                {errors.fullName && <p className="text-sm text-destructive">{errors.fullName.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input id="confirmPassword" type="password" {...register('confirmPassword')} />
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <h3 className="text-lg font-semibold pt-4 border-t mt-4">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2 md:col-span-1">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" {...register('cep')} onBlur={handleCepBlur} ref={cepRef} />
                {errors.cep && <p className="text-sm text-destructive">{errors.cep.message}</p>}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="street">Rua</Label>
                <Input id="street" {...register('street')} disabled={isCepLoading} />
                {errors.street && <p className="text-sm text-destructive">{errors.street.message}</p>}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="number">Número</Label>
                <Input id="number" {...register('number')} />
                {errors.number && <p className="text-sm text-destructive">{errors.number.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="complement">Complemento</Label>
                <Input id="complement" {...register('complement')} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="neighborhood">Bairro</Label>
                <Input id="neighborhood" {...register('neighborhood')} disabled={isCepLoading} />
                {errors.neighborhood && <p className="text-sm text-destructive">{errors.neighborhood.message}</p>}
              </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input id="city" {...register('city')} disabled={isCepLoading} />
                {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Input id="state" {...register('state')} disabled={isCepLoading} />
                {errors.state && <p className="text-sm text-destructive">{errors.state.message}</p>}
              </div>
            </div>
            
            <Button type="submit" className="w-full mt-4" disabled={loading || isCepLoading}>
              {loading ? 'Cadastrando...' : 'Criar Conta'}
            </Button>
            <p className="text-sm text-center text-muted-foreground mt-2">
              Já tem uma conta? <Link to="/login" className="text-primary hover:underline">Faça login</Link>
            </p>
          </CardContent>
        </form>
      </Card>
    </div>
  );
};
export default CustomerRegisterPage;
