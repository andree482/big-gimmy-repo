import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Loader2, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const forgotPasswordSchema = z.object({
  email: z.string().email('Email non valida'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

interface ForgotPasswordFormProps {
  onBackToLogin?: () => void;
}

export function ForgotPasswordForm({ onBackToLogin }: ForgotPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    
    try {
      const redirectTo = `${window.location.origin}/reset-password`;
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, { redirectTo });

      if (error) {
        toast({
          title: 'Errore',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      setIsSuccess(true);
      toast({
        title: 'Email inviata',
        description: 'Se l\'email è registrata, riceverai le istruzioni per il reset.',
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Errore durante l\'invio dell\'email. Riprova.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-[#FFD100] rounded-full flex items-center justify-center mb-4">
            <Mail className="w-8 h-8 text-black" />
          </div>
          <CardTitle className="text-2xl font-montserrat">Email inviata</CardTitle>
          <CardDescription>
            Abbiamo inviato le istruzioni per il reset della password all'email inserita
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              Controlla la tua casella di posta elettronica e segui le istruzioni.
            </p>
            <p className="text-sm text-gray-600">
              Se non ricevi l'email entro 5 minuti, controlla anche la cartella spam.
            </p>
          </div>
          
          <Button
            type="button"
            variant="outline"
            className="w-full border-[#FFD100] text-[#FFD100] hover:bg-[#FFD100] hover:text-black"
            onClick={onBackToLogin}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna al login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-montserrat">Password dimenticata</CardTitle>
        <CardDescription>
          Inserisci la tua email e ti invieremo le istruzioni per creare una nuova password
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
              disabled={isLoading}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">{form.formState.errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-[#FFD100] hover:bg-[#E6BC00] text-black"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Invio in corso...
              </>
            ) : (
              'Invia email di reset'
            )}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="w-full border-gray-300 text-gray-600 hover:bg-gray-50"
            onClick={onBackToLogin}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Torna al login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}