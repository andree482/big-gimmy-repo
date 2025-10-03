import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface LocalFavorite {
  id: number;
  slug: string;
  name: string;
  brandName?: string;
  categoryName?: string;
  categorySlug?: string;
  basePrice?: number;
  minPriceCents?: number;
  addedAt: string;
}

interface DBProduct {
  id: number;
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  flavor?: string;
  size?: string;
  quantity?: number;
  brandName?: string;
  categoryName?: string;
  categorySlug?: string;
  isNew?: boolean;
  hasSpecialOffer?: boolean;
  minPriceCents?: number;
  basePrice?: number;
}

interface FavoritesResponse {
  success: boolean;
  favorites: DBProduct[];
}

interface FavoriteStatusResponse {
  success: boolean;
  isFavorite: boolean;
}

const FAVORITES_KEY = 'biggimmy_favorites';

export function useLocalFavorites() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Get favorites from localStorage
  const getFavoritesFromStorage = (): LocalFavorite[] => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error parsing favorites from localStorage:', error);
      return [];
    }
  };

  // Save favorites to localStorage
  const saveFavoritesToStorage = (favorites: LocalFavorite[]) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage:', error);
    }
  };

  // Get detailed product info from API by slug
  const getProductDetailsBySlug = async (productSlug: string): Promise<DBProduct | null> => {
    try {
      const response = await apiRequest('GET', `/api/product/${productSlug}`);
      return response;
    } catch (error) {
      console.error('Error fetching product details:', error);
      return null;
    }
  };

  // Get favorites with full product details
  const { data: favorites, isLoading: isLoadingFavorites, refetch: refetchFavorites } = useQuery<DBProduct[]>({
    queryKey: ['local-favorites'],
    queryFn: async () => {
      const localFavorites = getFavoritesFromStorage();
      if (localFavorites.length === 0) return [];

      // Fetch full product details for each favorite
      const detailedFavorites = await Promise.all(
        localFavorites.map(async (fav) => {
          const details = await getProductDetailsBySlug(fav.slug);
          return details || {
            id: fav.id,
            name: fav.name,
            slug: fav.slug,
            brandName: fav.brandName,
            categoryName: fav.categoryName,
            categorySlug: fav.categorySlug,
            basePrice: fav.basePrice,
            minPriceCents: fav.minPriceCents,
          };
        })
      );

      return detailedFavorites.filter(Boolean) as DBProduct[];
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Add to favorites
  const addToFavoritesMutation = useMutation({
    mutationFn: async ({ productId, productSlug, productName, brandName, categoryName, categorySlug, basePrice }: {
      productId: number;
      productSlug: string;
      productName: string;
      brandName?: string;
      categoryName?: string;
      categorySlug?: string;
      basePrice?: number;
    }) => {
      const currentFavorites = getFavoritesFromStorage();
      
      // Check if already in favorites
      if (currentFavorites.some(fav => fav.id === productId)) {
        throw new Error('Prodotto già nei preferiti');
      }

      const newFavorite: LocalFavorite = {
        id: productId,
        slug: productSlug,
        name: productName,
        brandName,
        categoryName,
        categorySlug,
        basePrice,
        minPriceCents: basePrice ? Math.round(basePrice * 100) : undefined,
        addedAt: new Date().toISOString(),
      };

      const updatedFavorites = [...currentFavorites, newFavorite];
      saveFavoritesToStorage(updatedFavorites);
      
      return { success: true };
    },
    onSuccess: (data, { productId }) => {
      // Update cache
      queryClient.invalidateQueries({ queryKey: ['local-favorites'] });
      queryClient.setQueryData([`local-favorite-status-${productId}`], {
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

  // Remove from favorites
  const removeFromFavoritesMutation = useMutation({
    mutationFn: async ({ productId }: { productId: number }) => {
      const currentFavorites = getFavoritesFromStorage();
      const updatedFavorites = currentFavorites.filter(fav => fav.id !== productId);
      saveFavoritesToStorage(updatedFavorites);
      
      return { success: true };
    },
    onSuccess: (data, { productId }) => {
      // Update cache
      queryClient.invalidateQueries({ queryKey: ['local-favorites'] });
      queryClient.setQueryData([`local-favorite-status-${productId}`], {
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

  // Clear all favorites
  const clearAllFavoritesMutation = useMutation({
    mutationFn: async () => {
      saveFavoritesToStorage([]);
      return { success: true };
    },
    onSuccess: () => {
      // Update cache
      queryClient.invalidateQueries({ queryKey: ['local-favorites'] });
      
      // Clear all individual favorite status caches
      queryClient.removeQueries({ 
        predicate: (query) => 
          Array.isArray(query.queryKey) && 
          query.queryKey[0] && 
          typeof query.queryKey[0] === 'string' && 
          query.queryKey[0].startsWith('local-favorite-status-')
      });

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
      queryKey: [`local-favorite-status-${productId}`],
      queryFn: () => {
        if (!productId) return { success: false, isFavorite: false };
        
        const favorites = getFavoritesFromStorage();
        const isFavorite = favorites.some(fav => fav.id === productId);
        
        return { success: true, isFavorite };
      },
      enabled: !!productId,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  // Toggle favorite status
  const toggleFavorite = async (productId: number, productData?: {
    slug: string;
    name: string;
    brandName?: string;
    categoryName?: string;
    categorySlug?: string;
    basePrice?: number;
  }) => {
    try {
      const favorites = getFavoritesFromStorage();
      const isFavorite = favorites.some(fav => fav.id === productId);

      if (isFavorite) {
        await removeFromFavoritesMutation.mutateAsync({ productId });
      } else {
        if (!productData) {
          throw new Error('Dati prodotto necessari per aggiungere ai preferiti');
        }
        await addToFavoritesMutation.mutateAsync({ 
          productId, 
          productSlug: productData.slug,
          productName: productData.name,
          brandName: productData.brandName,
          categoryName: productData.categoryName,
          categorySlug: productData.categorySlug,
          basePrice: productData.basePrice
        });
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return {
    favorites: favorites || [],
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