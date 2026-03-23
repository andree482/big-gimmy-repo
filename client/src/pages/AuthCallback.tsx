import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function AuthCallback() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verifica in corso...');

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Supabase gestisce automaticamente il token dall'URL hash
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          setStatus('error');
          setMessage('Si è verificato un errore durante la verifica.');
          toast({
            title: 'Errore verifica',
            description: error.message || 'Non è stato possibile verificare l\'account.',
            variant: 'destructive',
          });
          setTimeout(() => setLocation('/'), 3000);
          return;
        }

        if (data?.session) {
          setStatus('success');
          setMessage('Email verificata con successo!');
          toast({
            title: 'Verifica effettuata',
            description: 'Il tuo account è stato verificato. Benvenuto in BigGimmy!',
          });

          // Invia email di benvenuto dopo verifica (non bloccante)
          fetch('/api/auth/send-welcome', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${data.session.access_token}`
            }
          })
            .then(res => res.json())
            .then(result => {
            })
            .catch(() => {});

          // Redirect alla home dopo 2 secondi
          setTimeout(() => {
            setLocation('/');
            window.location.reload();
          }, 2000);
        } else {
          // Nessuna sessione, potrebbe essere un altro tipo di callback
          setStatus('error');
          setMessage('Sessione non trovata. Prova ad accedere.');
          setTimeout(() => setLocation('/'), 3000);
        }
      } catch (err) {
        setStatus('error');
        setMessage('Si è verificato un errore imprevisto.');
        setTimeout(() => setLocation('/'), 3000);
      }
    };

    handleAuthCallback();
  }, [setLocation, toast]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4 text-center">
        {status === 'loading' && (
          <>
            <Loader2 className="h-16 w-16 text-[#FFD100] mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Verifica in corso</h1>
            <p className="text-gray-600">{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-green-700 mb-2">Verifica completata!</h1>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500 mt-4">Stai per essere reindirizzato...</p>
          </>
        )}

        {status === 'error' && (
          <>
            <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-700 mb-2">Errore</h1>
            <p className="text-gray-600">{message}</p>
            <p className="text-sm text-gray-500 mt-4">Stai per essere reindirizzato...</p>
          </>
        )}
      </div>
    </div>
  );
}
