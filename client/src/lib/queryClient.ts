import { QueryClient, QueryFunction } from "@tanstack/react-query";
import { supabase } from "./supabase";
import { openAuthModal } from "./authModalBus";

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
  options?: { suppressAuthModal?: boolean; timeoutMs?: number },
): Promise<any> {
  const { data: sessionData } = await supabase.auth.getSession();
  const accessToken = sessionData?.session?.access_token;

  const headers: Record<string, string> = {};
  if (data) headers["Content-Type"] = "application/json";
  if (accessToken) headers["Authorization"] = `Bearer ${accessToken}`;

  const controller = typeof AbortController !== "undefined" ? new AbortController() : undefined;
  const timer = options?.timeoutMs
    ? setTimeout(() => {
        try { controller?.abort(); } catch {}
      }, options.timeoutMs)
    : undefined;

  const res = await fetch(url, {
    method,
    headers,
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
    signal: controller?.signal,
  });
  if (timer) clearTimeout(timer);

  if (!res.ok) {
    if (res.status === 401) {
      try {
        const { data: current } = await supabase.auth.getSession();
        if (current?.session) {
          await supabase.auth.refreshSession();
          const { data: refreshed } = await supabase.auth.getSession();
          const newToken = refreshed?.session?.access_token;
          if (newToken) {
            headers["Authorization"] = `Bearer ${newToken}`;
            const retryController = typeof AbortController !== "undefined" ? new AbortController() : undefined;
            const retryTimer = options?.timeoutMs
              ? setTimeout(() => {
                  try { retryController?.abort(); } catch {}
                }, options.timeoutMs)
              : undefined;
            const retry = await fetch(url, {
              method,
              headers,
              body: data ? JSON.stringify(data) : undefined,
              credentials: "include",
              signal: retryController?.signal,
            });
            if (retryTimer) clearTimeout(retryTimer);
            if (!retry.ok) {
              if (retry.status === 401 && !options?.suppressAuthModal) {
                openAuthModal();
              }
              await throwIfResNotOk(retry);
            }
            const json = await retry.json();
            return json;
          }
        }
      } catch {
        // ignore refresh errors; fallthrough to modal/throw
      }
      if (!options?.suppressAuthModal) {
        openAuthModal();
      }
      await throwIfResNotOk(res);
    } else {
      await throwIfResNotOk(res);
    }
  }
  const json = await res.json();
  return json;
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn = <T,>(options: {
  on401: UnauthorizedBehavior;
}): QueryFunction<T> =>
  async ({ queryKey }) => {
    const url = queryKey[0] as string;
    try {
      const data = await apiRequest("GET", url);
      return data as T;
    } catch (err: any) {
      const message = err?.message ?? "";
      if (options.on401 === "returnNull" && message.startsWith("401:")) {
        return null as T;
      }
      throw err;
    }
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minuti per dati prodotti
      gcTime: 10 * 60 * 1000, // 10 minuti di cache (gcTime in v5)
      retry: (failureCount, error: any) => {
        // Retry solo per errori di rete, non per 404 o errori server
        if (error?.message?.includes('404') || failureCount >= 2) return false;
        return true;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});
