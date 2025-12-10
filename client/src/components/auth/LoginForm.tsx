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

const loginSchemaCredentials = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'Password deve essere almeno 6 caratteri'),
});
 

type CredentialsData = z.infer<typeof loginSchemaCredentials>;

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
  onForgotPassword?: () => void;
}

export function LoginForm({ onSuccess, onSwitchToRegister, onForgotPassword }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { login, isLoginLoading } = useAuthQuery();

  const formCred = useForm<CredentialsData>({
    resolver: zodResolver(loginSchemaCredentials),
    defaultValues: { email: '', password: '' },
  });

  const onSubmitCred = async (data: CredentialsData) => {
    try {
      await login(data);
      toast({
        title: 'Login effettuato',
        description: 'Benvenuto in BigGimmy!',
      });
      onSuccess?.();
    } catch (error: any) {
      const errorMessage = error.message?.includes('Credenziali') ? 'Email o password non corretti' : 'Errore di connessione. Riprova.';
      
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
        <CardDescription>Inserisci le tue credenziali</CardDescription>
      </CardHeader>
      <CardContent>
        {
          <form onSubmit={formCred.handleSubmit(onSubmitCred)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="mario@example.com" {...formCred.register('email')} />
              {formCred.formState.errors.email && (
                <p className="text-sm text-red-600">{formCred.formState.errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" {...formCred.register('password')} />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (<EyeOff className="h-4 w-4 text-gray-500" />) : (<Eye className="h-4 w-4 text-gray-500" />)}
                </button>
              </div>
              {formCred.formState.errors.password && (
                <p className="text-sm text-red-600">{formCred.formState.errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-[#FFD100] hover:bg-[#E6BC00] text-black" disabled={isLoginLoading}>
              {isLoginLoading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Accesso in corso...</>) : ('Accedi')}
            </Button>

            <div className="text-center">
              <button type="button" onClick={onForgotPassword} className="text-sm text-[#FFD100] hover:text-[#FFD100]/80 font-medium underline">Hai dimenticato la password?</button>
            </div>
          </form>
        }
      </CardContent>
      </Card>
  );
}
