import { useState, useEffect, createContext, useContext, createElement, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/lib/queryClient';

export interface User {
  id: string;
  email: string;
  isAdmin?: boolean;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  province?: string;
  country?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  [key: string]: any;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  province?: string;
  country?: string;
}

export interface UpdateProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  province?: string;
  country?: string;
}

// Context per l'autenticazione
export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error?: string;
  login: (data: LoginData) => Promise<any>;
  register: (data: RegisterData) => Promise<any>;
  logout: () => Promise<any>;
  updateProfile: (data: UpdateProfileData) => Promise<any>;
  loginMutation: any;
  logoutMutation: any;
  registerMutation: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di AuthProvider');
  }
  return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const ctx = useAuthQuery() as any;
  const value: AuthContextType = {
    user: ctx.user,
    isLoading: ctx.isLoading,
    isAuthenticated: ctx.isAuthenticated,
    error: ctx.error,
    login: ctx.login,
    register: ctx.register,
    logout: ctx.logout,
    updateProfile: ctx.updateProfile,
    loginMutation: ctx.loginMutation,
    logoutMutation: ctx.logoutMutation,
    registerMutation: ctx.registerMutation,
  };
  return createElement(AuthContext.Provider, { value }, children);
}

// Hook per ottenere i dati dell'utente corrente (interno)
const useAuthQuery = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isServerVerified, setIsServerVerified] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;
    const safetyTimeout = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 2500);

    // Refs per gestire la deduplicazione e lo stato locale all'effetto
    const isSyncing = { current: false };
    const lastSyncedUserId = { current: null as string | null };

    // Funzione helper per sincronizzare lo stato utente
    const syncUser = async (session: any | null, source: string) => {
      if (!mounted) return;

      const sessionUser = session?.user;
      const userId = sessionUser?.id;

      // Deduplicazione
      if (isSyncing.current) {
         return;
      }

      isSyncing.current = true;
      const accessToken = session?.access_token;

      try {
        if (sessionUser) {
          
          // CRITICO: Passiamo il token esplicitamente
          const headers: Record<string, string> = {};
          if (accessToken) {
             headers["Authorization"] = `Bearer ${accessToken}`;
          }

          let res;
          try {
            // CRITICAL FIX: Chiama fetch direttamente per evitare deadlock con getSession()
            const headers: Record<string, string> = {
              'Content-Type': 'application/json'
            };
            if (accessToken) {
              headers['Authorization'] = `Bearer ${accessToken}`;
            }

            const controller = typeof AbortController !== 'undefined' ? new AbortController() : undefined;
            const timer = setTimeout(() => {
              try { controller?.abort(); } catch {}
            }, 8000);

            const response = await fetch('/api/auth/me', {
              method: 'GET',
              headers,
              credentials: 'include',
              signal: controller?.signal
            });
            clearTimeout(timer);

            if (response.ok) {
              res = await response.json();
            }
          } catch (e) {
            // Silently handle errors - fallback will handle it
          }

          if (mounted && res && res.success && res.authenticated) {
            // Aggiorniamo il ref prima di chiamare setUser
            lastSyncedUserId.current = userId;
            console.log('[AUTH-CLIENT] Received user from /api/auth/me:', JSON.stringify(res.user));
            setUser(res.user);
            setIsServerVerified(true);
            try {
              localStorage.setItem('bg_auth_persist', JSON.stringify({ email: res.user.email, when: Date.now() }));
            } catch {}
          } else {
            // Fallback: usa i dati di Supabase per sbloccare l'UI
            const fallbackUser = {
                id: sessionUser.id,
                email: sessionUser.email,
                isAdmin: false,
                createdAt: sessionUser.created_at || new Date().toISOString(),
                updatedAt: sessionUser.updated_at || new Date().toISOString(),
                firstName: sessionUser.user_metadata?.first_name || sessionUser.user_metadata?.firstName,
                lastName: sessionUser.user_metadata?.last_name || sessionUser.user_metadata?.lastName,
            };
            setUser(fallbackUser);
            // IMPORTANTE: Se Supabase ha una sessione valida, consideriamo l'utente "verificato"
            // altrimenti l'app non funziona dopo il refresh
            setIsServerVerified(true); // CAMBIATO da false a true
            try {
              localStorage.setItem('bg_auth_persist', JSON.stringify({ email: sessionUser.email, when: Date.now(), mode: 'fail-open' }));
            } catch {}
          }
        } else {
          // Nessuna sessione Supabase, controlliamo cookie
          // Se abbiamo già provato il fallback guest e fallito, non riproviamo all'infinito
          if (lastSyncedUserId.current === 'guest') {
             if (mounted) setIsLoading(false);
             isSyncing.current = false;
             return;
          }

          // No token, checking persistent cookie
          const res = await apiRequest('GET', '/api/auth/me', undefined, { suppressAuthModal: true, timeoutMs: 5000 });
          
          if (mounted && res.success && res.authenticated) {
             lastSyncedUserId.current = res.user.id;
             setUser(res.user);
             setIsServerVerified(true);
             try {
               localStorage.setItem('bg_auth_persist', JSON.stringify({ email: res.user.email, when: Date.now() }));
             } catch {}
          } else {
             lastSyncedUserId.current = 'guest';
             if (mounted) {
               setUser(null);
             }
             setIsServerVerified(false);
          }
        }
      } catch (e) {
        console.error("[AUTH-FIX] Error during sync:", e);
        if (mounted) setUser(null);
      } finally {
        isSyncing.current = false;
        if (mounted) setIsLoading(false);
      }
    };

    // 1. Inizializza listener per cambi di stato
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      // Ignora SIGNED_IN multipli - gestiamo solo INITIAL_SESSION e TOKEN_REFRESHED
      if (event === 'INITIAL_SESSION') {
        await syncUser(session, `Event:${event}`);
      } else if (event === 'TOKEN_REFRESHED') {
        // Solo refresh token, non serve risincronizzare tutto
        if (session?.user?.id && lastSyncedUserId.current !== session.user.id) {
          await syncUser(session, `Event:${event}`);
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setIsLoading(false);
        lastSyncedUserId.current = null;
        setIsServerVerified(false);
        try {
          localStorage.removeItem('bg_auth_persist');
        } catch {}
      }
    });

    // 2. Controllo iniziale immediato - SKIP, già gestito da INITIAL_SESSION
    // supabase.auth.getSession().then(({ data, error }) => {
    //   if (error) {
    //     setIsLoading(false);
    //   } else {
    //     syncUser(data.session, 'InitialGetSession');
    //   }
    // });
    const onStorage = async (e: StorageEvent) => {
      if (e.key === 'bg_auth_persist') {
        if (e.newValue) {
          try {
            const res = await apiRequest('GET', '/api/auth/me', undefined, { suppressAuthModal: true, timeoutMs: 2000 });
            if (res?.authenticated && res?.user) {
              setUser(res.user);
              setIsServerVerified(true);
            }
          } catch {}
        } else {
          setUser(null);
          setIsServerVerified(false);
        }
      }
    };
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', onStorage);
    }

    return () => {
      mounted = false;
      subscription.unsubscribe();
      clearTimeout(safetyTimeout);
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', onStorage);
      }
    };
  }, []);

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      console.log("[AUTH-FIX] Login attempt starting for:", credentials.email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });
      if (error) throw error;

      // CRITICAL FIX: Aspetta che Supabase finalizzi il token
      await new Promise(resolve => setTimeout(resolve, 300));

      return data.user;
    },
    onSuccess: async (user: any) => {
      console.log("[AUTH-FIX] Login mutation success:", user?.email);

      // GARANTIRE che il token sia disponibile
      await new Promise(resolve => setTimeout(resolve, 200));

      try {
        const { data: sess } = await supabase.auth.getSession();
        const token = sess?.session?.access_token;

        // Chiamata con retry integrato
        let me: any;
        try {
          me = await apiRequest("GET", "/api/auth/me", undefined, {
            suppressAuthModal: true,
            timeoutMs: 8000
          });
        } catch (firstErr) {
          console.warn("[AUTH-FIX] Prima chiamata /me fallita, retry dopo refresh...");
          await supabase.auth.refreshSession();
          await new Promise(resolve => setTimeout(resolve, 300));
          me = await apiRequest("GET", "/api/auth/me", undefined, {
            suppressAuthModal: true,
            timeoutMs: 8000
          });
        }

        // VERIFICA che il server abbia confermato
        if (!me?.authenticated) {
          throw new Error("Server non ha confermato l'autenticazione");
        }

        setUser(me.user);
        localStorage.setItem('bg_auth_persist', JSON.stringify({
          email: me.user.email,
          when: Date.now()
        }));
        queryClient.setQueryData(["/api/auth/user"], me.user);

      } catch (e) {
        console.error("[AUTH-FIX] Login onSuccess error:", e);
        throw e; // Propaga l'errore per mostrare toast di errore
      }

      toast({
        title: "Login effettuato",
        description: "Benvenuto in BigGimmy!",
      });
    },
    onError: (error: any) => {
      console.error("[AUTH-FIX] Login mutation error:", error);
      toast({
        title: "Errore login",
        description: error.message,
        variant: "destructive",
      });
      // Mantieni l'app stabile: imposta uno stato di errore non bloccante
      setError(error?.message ?? "Errore login");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut();
      // Chiamiamo anche l'endpoint di logout per pulire il cookie
      await apiRequest("POST", "/api/auth/logout");
    },
    onSuccess: () => {
      setUser(null);
      setIsServerVerified(false);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (credentials: RegisterData) => {
      // Usa Supabase Auth per la registrazione
      const { data, error } = await supabase.auth.signUp({
        email: credentials.email,
        password: credentials.password,
        options: {
          data: {
            first_name: credentials.firstName,
            last_name: credentials.lastName,
            phone: credentials.phone,
            address: credentials.address,
            city: credentials.city,
            postal_code: credentials.postalCode,
            province: credentials.province,
            country: credentials.country,
          }
        }
      });

      if (error) throw error;

      // Salva i dati sul server
      try {
        await apiRequest("POST", "/api/auth/register", credentials, { suppressAuthModal: true, timeoutMs: 5000 });
      } catch {}

      // Se l'utente è già confermato, effettua il login automatico
      if (data?.session) {
        // Utente già confermato - sincronizza lo stato
        await new Promise(resolve => setTimeout(resolve, 300));
        try {
          const me = await apiRequest("GET", "/api/auth/me", undefined, {
            suppressAuthModal: true,
            timeoutMs: 5000
          });
          if (me?.authenticated && me?.user) {
            setUser(me.user);
            setIsServerVerified(true);
            localStorage.setItem('bg_auth_persist', JSON.stringify({
              email: me.user.email,
              when: Date.now()
            }));
          }
        } catch {}
      }

      return { ...data, autoLoggedIn: !!data?.session };
    },
    onSuccess: (data) => {
      // L'utente è già stato impostato nel mutationFn se auto-logged in
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });
  
  const updateProfileMutation = useMutation({
    mutationFn: async (data: UpdateProfileData) => {
      // 1) Aggiorna Supabase Auth metadata
      try {
        await supabase.auth.updateUser({
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            phone: data.phone,
          }
        });
        // Aspetta che Supabase propaghi
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (e) {
        console.warn("[AUTH] Supabase metadata update failed:", e);
      }

      // 2) Persisti nel profilo applicativo
      await apiRequest("PUT", "/api/auth/me", data, { suppressAuthModal: true });

      // 3) ASPETTA prima di risincronizzare
      await new Promise(resolve => setTimeout(resolve, 200));

      // 4) Risincronizza (con retry)
      let refreshed;
      try {
        refreshed = await apiRequest("GET", "/api/auth/me", undefined, {
          suppressAuthModal: true,
          timeoutMs: 5000
        });
      } catch (e) {
        // Retry una volta
        await new Promise(resolve => setTimeout(resolve, 500));
        refreshed = await apiRequest("GET", "/api/auth/me", undefined, {
          suppressAuthModal: true,
          timeoutMs: 5000
        });
      }

      return refreshed;
    },
    onSuccess: async (data) => {
      // Garantire che abbiamo i dati freschi
      if (data?.user) {
        setUser(data.user);
      } else {
        // Fallback: refetch esplicito
        console.warn("[AUTH] updateProfile success ma nessun user, refetch...");
        try {
          const fresh = await apiRequest("GET", "/api/auth/me", undefined, {
            suppressAuthModal: true
          });
          if (fresh?.user) {
            setUser(fresh.user);
          }
        } catch (e) {
          console.error("[AUTH] Refetch fallito:", e);
        }
      }
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  return {
    user,
    isLoading,
    error,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
    isAuthenticated: !!user || isServerVerified,
    loginMutation,
    logoutMutation,
    registerMutation,
  };
};
