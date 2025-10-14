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

const registerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'Password deve essere almeno 6 caratteri'),
  confirmPassword: z.string().min(6, 'Conferma password richiesta'),
  firstName: z.string().min(2, 'Nome deve essere almeno 2 caratteri'),
  lastName: z.string().min(2, 'Cognome deve essere almeno 2 caratteri'),
  phone: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  postalCode: z.string().optional(),
  province: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Le password non corrispondono',
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();
  const { register, isRegisterLoading } = useAuthQuery();

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
      province: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await register(registerData);
      toast({
        title: 'Registrazione completata',
        description: 'Benvenuto in BigGimmy! Il tuo account è stato creato con successo.',
      });
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Errore registrazione',
        description: error.message || 'Si è verificato un errore durante la registrazione',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-montserrat">Registrati</CardTitle>
        <CardDescription>
          Crea un nuovo account per iniziare a fare acquisti
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Nome *</Label>
              <Input
                id="firstName"
                placeholder="Mario"
                {...form.register('firstName')}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-600">{form.formState.errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Cognome *</Label>
              <Input
                id="lastName"
                placeholder="Rossi"
                {...form.register('lastName')}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-600">{form.formState.errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
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
            <Label htmlFor="password">Password *</Label>
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Conferma Password *</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                {...form.register('confirmPassword')}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            </div>
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-600">{form.formState.errors.confirmPassword.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Telefono</Label>
            <Input
              id="phone"
              placeholder="+39 123 456 7890"
              {...form.register('phone')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Indirizzo</Label>
            <Input
              id="address"
              placeholder="Via Roma 123"
              {...form.register('address')}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Città</Label>
              <Input
                id="city"
                placeholder="Milano"
                {...form.register('city')}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">CAP</Label>
              <Input
                id="postalCode"
                placeholder="20100"
                {...form.register('postalCode')}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Provincia</Label>
            <Input
              id="province"
              placeholder="MI"
              {...form.register('province')}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFD100] hover:bg-[#E6BC00] text-black"
            disabled={isRegisterLoading}
          >
            {isRegisterLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrazione in corso...
              </>
            ) : (
              'Registrati'
            )}
          </Button>

          {onSwitchToLogin && (
            <div className="text-center text-sm">
              <span className="text-gray-600">Hai già un account? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#FFD100] hover:underline font-medium"
              >
                Accedi
              </button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}