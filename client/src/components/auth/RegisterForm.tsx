import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PhoneInput } from '@/components/ui/phone-input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Eye, EyeOff, Loader2, Mail, CheckCircle } from 'lucide-react';

const registerSchema = z.object({
  email: z.string().email('Email non valida'),
  password: z.string().min(6, 'Password deve essere almeno 6 caratteri'),
  confirmPassword: z.string().min(6, 'Conferma password richiesta'),
  firstName: z.string().min(2, 'Nome deve essere almeno 2 caratteri'),
  lastName: z.string().min(2, 'Cognome deve essere almeno 2 caratteri'),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || val.length === 0 || /^(\+?\d{1,4})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/.test(val.replace(/\s/g, '')),
      'Numero di telefono non valido (es: +39 333 1234567 o 333-1234567)'
    ),
  address: z
    .string()
    .min(2, 'Indirizzo deve essere almeno 2 caratteri')
    .optional(),
  city: z
    .string()
    .min(2, 'Città deve essere almeno 2 caratteri')
    .optional(),
  postalCode: z
    .string()
    .regex(/^\d{5}$/, 'CAP deve contenere 5 cifre')
    .optional(),
  province: z
    .string()
    .regex(/^[A-Z]{2}$/, 'Provincia deve essere composta da 2 lettere maiuscole')
    .optional(),
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
  const [registered, setRegistered] = useState(false);
  const [emailConfirmationRequired, setEmailConfirmationRequired] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();
  const { register } = useAuth();

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
    setSubmitting(true);
    const safety = setTimeout(() => setSubmitting(false), 3000);
    try {
      const { confirmPassword, ...registerData } = data;
      console.log('[REGISTER FORM] Dati da inviare:', registerData);
      const result = await register(registerData);
      setRegistered(true);
      setRegisteredEmail(data.email);

      // Se l'utente è stato auto-loggato, ricarica la pagina
      if (result?.autoLoggedIn) {
        toast({
          title: 'Registrazione completata',
          description: 'Benvenuto in BigGimmy! Il tuo account è stato creato con successo.',
        });
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        // Richiede conferma email - mostra messaggio speciale
        setEmailConfirmationRequired(true);
        toast({
          title: 'Registrazione completata',
          description: 'Controlla la tua email per confermare l\'account.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Errore registrazione',
        description: error?.message || 'Si è verificato un errore durante la registrazione',
        variant: 'destructive',
      });
    } finally {
      clearTimeout(safety);
      setSubmitting(false);
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
            <Controller
              name="phone"
              control={form.control}
              render={({ field }) => (
                <PhoneInput
                  id="phone"
                  label="Numero di Telefono"
                  value={field.value || ''}
                  onChange={field.onChange}
                />
              )}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Via/Piazzale</Label>
            <Input
              id="address"
              placeholder="Via Roma 123"
              {...form.register('address')}
            />
            {form.formState.errors.address && (
              <p className="text-sm text-red-600">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">Città</Label>
              <Input
                id="city"
                placeholder="Milano"
                {...form.register('city')}
              />
              {form.formState.errors.city && (
                <p className="text-sm text-red-600">{form.formState.errors.city.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="postalCode">CAP</Label>
              <Input
                id="postalCode"
                placeholder="20100"
                {...form.register('postalCode')}
              />
              {form.formState.errors.postalCode && (
                <p className="text-sm text-red-600">{form.formState.errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="province">Provincia</Label>
            <Input
              id="province"
              placeholder="MI"
              {...form.register('province')}
            />
            {form.formState.errors.province && (
              <p className="text-sm text-red-600">{form.formState.errors.province.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFD100] hover:bg-[#E6BC00] text-black"
            disabled={submitting}
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Registrazione in corso...
              </>
            ) : (
              'Registrati'
            )}
          </Button>

          {emailConfirmationRequired && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
              <Mail className="h-10 w-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800 mb-2">Conferma la tua email</h3>
              <p className="text-blue-700 text-sm mb-2">
                Abbiamo inviato un'email di conferma a:
              </p>
              <p className="font-medium text-blue-900 mb-3">{registeredEmail}</p>
              <p className="text-blue-600 text-xs">
                Clicca sul link nell'email per attivare il tuo account.
                Controlla anche la cartella spam.
              </p>
            </div>
          )}

          {registered && !emailConfirmationRequired && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <CheckCircle className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800 mb-2">Registrazione completata!</h3>
              <p className="text-green-700 text-sm">
                Benvenuto in BigGimmy! Stai per essere reindirizzato...
              </p>
            </div>
          )}

          {onSwitchToLogin && !emailConfirmationRequired && (
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

          {emailConfirmationRequired && onSwitchToLogin && (
            <div className="text-center text-sm mt-4">
              <span className="text-gray-600">Email confermata? </span>
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="text-[#FFD100] hover:underline font-medium"
              >
                Accedi ora
              </button>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
