import { QueryClient, QueryFunction } from "@tanstack/react-query";

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
): Promise<any> {
  const res = await fetch(url, {
    method,
    headers: data ? { "Content-Type": "application/json" } : {},
    body: data ? JSON.stringify(data) : undefined,
    credentials: "include",
  });

  await throwIfResNotOk(res);
  return await res.json();
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(queryKey[0] as string, {
      credentials: "include",
    });

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: 30 * 1000, // Refresh automatico ogni 30 secondi per aggiornamenti istantanei
      refetchOnWindowFocus: false,
      staleTime: 0, // Refresh immediato per aggiornamenti prezzi in tempo reale
      gcTime: 0, // Nessuna cache per aggiornamenti prezzi istantanei
      retry: (failureCount, error: any) => {
        // Retry solo per errori di rete, non per 404 o errori server
        if (error?.message?.includes('404') || failureCount >= 2) return false;
        return true;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      suspense: false,
      useErrorBoundary: false,
    },
    mutations: {
      retry: 1,
      retryDelay: 1000,
    },
  },
});
