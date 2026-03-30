import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

// Lista dei domini consentiti che possono richiedere la sessione
const ALLOWED_ORIGINS = [
  'https://www.biggimmyintegratori.com',
  'https://www.biggimmyintegratori.it',
  'https://biggimmyintegratori.com',
  'https://biggimmyintegratori.it',
];

/**
 * Pagina invisibile caricata come iframe dal dominio canonico.
 * Risponde alle richieste di sessione degli altri 3 domini via postMessage.
 *
 * Flusso:
 *  1. Il dominio non-canonico (es. .it) crea un iframe nascosto che punta
 *     a https://www.biggimmyintegratori.com/auth/xd-sync
 *  2. Quando l'iframe carica, invia la sessione Supabase al parent via postMessage
 *  3. Il parent riceve i token e chiama supabase.auth.setSession()
 */
export default function AuthXDSync() {
  useEffect(() => {
    async function sendSession() {
      // Verifica che siamo dentro un iframe (parent diverso da self)
      if (window.self === window.top) return;

      const parentOrigin = document.referrer
        ? new URL(document.referrer).origin
        : null;

      // Accetta solo i 4 domini consentiti
      if (!parentOrigin || !ALLOWED_ORIGINS.includes(parentOrigin)) return;

      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (session?.access_token && session?.refresh_token) {
        window.parent.postMessage(
          {
            type: 'XD_SESSION',
            access_token: session.access_token,
            refresh_token: session.refresh_token,
          },
          parentOrigin,
        );
      } else {
        // Nessuna sessione disponibile
        window.parent.postMessage({ type: 'XD_SESSION', access_token: null }, parentOrigin);
      }
    }

    sendSession();
  }, []);

  // Pagina completamente invisibile
  return null;
}
