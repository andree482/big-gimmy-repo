import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface FavoritesResponse {
  favorites: any[];
}

interface FavoriteStatusResponse {
  success: boolean;
  isFavorite: boolean;
}

interface UseFavoritesProps {
  userId?: string | number;
}

export function useFavorites({ userId }: UseFavoritesProps = {}) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get user favorites
  const { data: favorites, isLoading: isLoadingFavorites } = useQuery<FavoritesResponse>({
    queryKey: [`/api/favorites/${userId}`],
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Add to favorites mutation
  const addToFavoritesMutation = useMutation({
    mutationFn: async ({ productId }: { productId: number }) => {
      if (!userId) {
        throw new Error("User must be logged in to add favorites");
      }
      return await apiRequest("POST", "/api/favorites", { userId, productId });
    },
    onSuccess: (_data, _vars) => {
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${userId}`] });

      toast({
        title: "Aggiunto ai preferiti ✨",
        description: "Il prodotto è stato aggiunto ai tuoi preferiti",
        duration: 2000,
      });
    },
    onError: (error: any) => {
      const message = error?.message || "Errore durante l'aggiunta ai preferiti";
      toast({
        title: "Errore",
        description: message,
        variant: "destructive",
        duration: 4000,
      });
    },
  });

  // Remove from favorites mutation
  const removeFromFavoritesMutation = useMutation({
    mutationFn: async ({ productId }: { productId: number }) => {
      if (!userId) {
        throw new Error("User must be logged in to remove favorites");
      }
      return await apiRequest("DELETE", "/api/favorites", { userId, productId });
    },
    onSuccess: (_data, _vars) => {
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${userId}`] });

      toast({
        title: "Rimosso dai preferiti",
        description: "Il prodotto è stato rimosso dai tuoi preferiti",
        duration: 2000,
      });
    },
    onError: (error: any) => {
      const message = error?.message || "Errore durante la rimozione dai preferiti";
      toast({
        title: "Errore",
        description: message,
        variant: "destructive",
        duration: 4000,
      });
    },
  });

  // Clear all favorites mutation
  const clearAllFavoritesMutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error("User must be logged in to clear favorites");
      }
      return await apiRequest("DELETE", `/api/favorites/${userId}`);
    },
    onSuccess: () => {
      // Invalidate all favorites-related queries
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${userId}`] });

      toast({
        title: "Preferiti cancellati",
        description: "Tutti i preferiti sono stati rimossi con successo",
        duration: 3000,
      });
    },
    onError: (error: any) => {
      const message = error?.message || "Errore durante la cancellazione dei preferiti";
      toast({
        title: "Errore",
        description: message,
        variant: "destructive",
        duration: 4000,
      });
    },
  });

  // Check if product is favorite — deriva dalla lista bulk già caricata, nessuna chiamata API per-prodotto
  const useIsFavorite = (productId?: number) => {
    const { data: favoritesData, isLoading } = useQuery<FavoritesResponse>({
      queryKey: [`/api/favorites/${userId}`],
      enabled: !!userId,
      staleTime: 1000 * 60 * 5,
    });

    const isFavorite =
      productId != null
        ? (favoritesData?.favorites || []).some((f: any) => f.id === productId)
        : false;

    return {
      data: { success: true, isFavorite } as FavoriteStatusResponse,
      isLoading,
    };
  };

  // Toggle favorite status — optimistic update sulla lista bulk
  const toggleFavorite = async (productId: number) => {
    if (!userId) {
      toast({
        title: "Accesso richiesto",
        description: "Devi essere loggato per gestire i preferiti",
        variant: "destructive",
        duration: 4000,
      });
      return;
    }

    const listKey = [`/api/favorites/${userId}`];

    // Snapshot della lista attuale per eventuale rollback
    const previousList = queryClient.getQueryData<FavoritesResponse>(listKey);
    const currentFavs: any[] = previousList?.favorites || [];
    const isCurrentlyFavorite = currentFavs.some((f: any) => f.id === productId);

    // Optimistic update: aggiorna subito la lista in cache
    queryClient.setQueryData<FavoritesResponse>(listKey, {
      favorites: isCurrentlyFavorite
        ? currentFavs.filter((f: any) => f.id !== productId)
        : [...currentFavs, { id: productId }],
    });

    try {
      if (isCurrentlyFavorite) {
        await removeFromFavoritesMutation.mutateAsync({ productId });
      } else {
        await addToFavoritesMutation.mutateAsync({ productId });
      }
    } catch (error) {
      // Rollback in caso di errore
      queryClient.setQueryData<FavoritesResponse>(listKey, previousList);
    }
  };

  return {
    favorites: favorites?.favorites || [],
    isLoadingFavorites,
    addToFavorites: addToFavoritesMutation.mutateAsync,
    removeFromFavorites: removeFromFavoritesMutation.mutateAsync,
    clearAllFavorites: clearAllFavoritesMutation.mutateAsync,
    toggleFavorite,
    useIsFavorite,
    isAddingToFavorites: addToFavoritesMutation.isPending,
    isRemovingFromFavorites: removeFromFavoritesMutation.isPending,
    isClearingFavorites: clearAllFavoritesMutation.isPending,
  };
}
