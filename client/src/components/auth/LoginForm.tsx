import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuthQuery } from '@/hooks/useAuth';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'Password deve essere almeno 6 caratteri'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister, onForgotPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login, isLoginLoading } = useAuthQuery();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast({
        title: 'Login effettuato',
        description: 'Benvenuto in BigGimmy!',
      });
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = error.message?.includes('Email o password') 
        ? 'Email o password non corretti' 
        : 'Errore di connessione. Riprova.';
      
      toast({
        title: 'Errore login',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-montserrat">Accedi</CardTitle>
        <CardDescription>
          Inserisci le tue credenziali per accedere al tuo account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mario@example.com"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...form.register('password')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-sm text-red-600">{form.formState.errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFD100] hover:bg-[#E6BC00] text-black"
            disabled={isLoginLoading}
          >
            {isLoginLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Accesso in corso...
              </>
            ) : (
              'Accedi'
            )}
          </Button>

          {/* Reset Password Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={onForgotPassword}
              className="text-sm text-[#FFD100] hover:text-[#FFD100]/80 font-medium underline"
            >
              Hai dimenticato la password?
            </button>
          </div>
{/*
          {onSwitchToRegister && (
            <div className="text-center text-sm">
              <span className="text-gray-600">Non hai un account? </span>
              <button
                type="button"
                onClick={onSwitchToRegister}
                className="text-[#FFD100] hover:underline font-medium"
              >
                Registrati
              </button>
            </div>
          )}
          */}
        </form>
      </CardContent>
    </Card>
  );
}