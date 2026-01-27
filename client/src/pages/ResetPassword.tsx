import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2, Eye, EyeOff, KeyRound } from 'lucide-react';

type PageStatus = 'loading' | 'form' | 'success' | 'error';

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [status, setStatus] = useState<PageStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  // Form state
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const checkRecoveryToken = async () => {
      try {
        // Supabase gestisce automaticamente il token dall'URL hash
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error('Errore recupero sessione:', error);
          setStatus('error');
          setErrorMessage('Link non valido o scaduto. Richiedi un nuovo link di reset.');
          return;
        }

        // Controlla se c'è un evento di recovery nell'URL
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get('type');

        if (type === 'recovery' || data?.session) {
          setStatus('form');
        } else {
          setStatus('error');
          setErrorMessage('Link non valido. Richiedi un nuovo link di reset password.');
        }
      } catch (err) {
        console.error('Errore:', err);
        setStatus('error');
        setErrorMessage('Si è verificato un errore imprevisto.');
      }
    };

    // Ascolta gli eventi di auth per il recovery
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        setStatus('form');
      }
    });

    checkRecoveryToken();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validazioni
    if (!newPassword || !confirmPassword) {
      toast({ title: 'Errore', description: 'Compila tutti i campi', variant: 'destructive' });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({ title: 'Errore', description: 'Le password non corrispondono', variant: 'destructive' });
      return;
    }

    if (newPassword.length < 6) {
      toast({ title: 'Errore', description: 'La password deve essere di almeno 6 caratteri', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast({ title: 'Errore', description: error.message, variant: 'destructive' });
        return;
      }

      // Invia email di conferma cambio password (non bloccante)
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData?.session) {
        fetch('/api/auth/password-changed', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionData.session.access_token}`
          }
        }).catch(err => console.error('Errore invio email conferma:', err));
      }

      setStatus('success');
      toast({ title: 'Successo', description: 'Password aggiornata con successo!' });

      // Redirect dopo 3 secondi
      setTimeout(() => {
        setLocation('/');
      }, 3000);

    } catch (err: any) {
      toast({ title: 'Errore', description: err?.message || 'Errore durante il cambio password', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        {status === 'loading' && (
          <>
            <CardHeader className="text-center">
              <Loader2 className="h-12 w-12 text-[#FFD100] mx-auto mb-4 animate-spin" />
              <CardTitle>Verifica in corso...</CardTitle>
            </CardHeader>
          </>
        )}

        {status === 'form' && (
          <>
            <CardHeader className="text-center">
              <div className="mx-auto w-16 h-16 bg-[#FFD100] rounded-full flex items-center justify-center mb-4">
                <KeyRound className="h-8 w-8 text-black" />
              </div>
              <CardTitle>Reimposta la tua Password</CardTitle>
              <CardDescription>
                Inserisci la tua nuova password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nuova password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Almeno 6 caratteri"
                      className="pr-10"
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
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Conferma password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Ripeti la password"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#FFD100] text-black hover:bg-[#e6bc00]"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Aggiornamento...
                    </>
                  ) : (
                    'Aggiorna Password'
                  )}
                </Button>
              </form>
            </CardContent>
          </>
        )}

        {status === 'success' && (
          <>
            <CardHeader className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-green-700">Password Aggiornata!</CardTitle>
              <CardDescription>
                La tua password è stata modificata con successo.
                <br />
                Stai per essere reindirizzato...
              </CardDescription>
            </CardHeader>
          </>
        )}

        {status === 'error' && (
          <>
            <CardHeader className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-red-700">Errore</CardTitle>
              <CardDescription>{errorMessage}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={() => setLocation('/')}
                className="w-full bg-[#FFD100] text-black hover:bg-[#e6bc00]"
              >
                Torna alla Home
              </Button>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
