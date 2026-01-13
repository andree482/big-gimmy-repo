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
    onSuccess: (data, { productId }) => {
      // Invalidate favorites list
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${userId}`] });
      
      // Update individual favorite status cache
      queryClient.setQueryData([`/api/favorites/${userId}/${productId}`], {
        success: true,
        isFavorite: true,
      });

      toast({
        title: "Aggiunto ai preferiti ✨",
        description: "Il prodotto è stato aggiunto ai tuoi preferiti",
        duration: 3000,
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
    onSuccess: (data, { productId }) => {
      // Invalidate favorites list
      queryClient.invalidateQueries({ queryKey: [`/api/favorites/${userId}`] });
      
      // Update individual favorite status cache
      queryClient.setQueryData([`/api/favorites/${userId}/${productId}`], {
        success: true,
        isFavorite: false,
      });

      toast({
        title: "Rimosso dai preferiti",
        description: "Il prodotto è stato rimosso dai tuoi preferiti",
        duration: 3000,
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

  // Check if product is favorite
  const useIsFavorite = (productId?: number) => {
    return useQuery<FavoriteStatusResponse>({
      queryKey: [`/api/favorites/${userId}/${productId}`],
      enabled: !!userId && !!productId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // Toggle favorite status
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

    try {
      // Check current status
      const currentStatus = await queryClient.fetchQuery<FavoriteStatusResponse>({
        queryKey: [`/api/favorites/${userId}/${productId}`],
      });

      if (currentStatus?.isFavorite) {
        await removeFromFavoritesMutation.mutateAsync({ productId });
      } else {
        await addToFavoritesMutation.mutateAsync({ productId });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
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
