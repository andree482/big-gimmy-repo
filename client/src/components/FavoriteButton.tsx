import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface FavoriteButtonProps {
  productId: number;
  userId?: number;
  variant?: "icon" | "button";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function FavoriteButton({ 
  productId, 
  userId,
  variant = "icon",
  size = "md",
  className = ""
}: FavoriteButtonProps) {
  const { user } = useAuth();
  const effectiveUserId = userId ?? (user?.id as any);
  const { toggleFavorite, useIsFavorite, isAddingToFavorites, isRemovingFromFavorites } = useFavorites({ userId: effectiveUserId as any });
  const [localFavorite, setLocalFavorite] = useState(false);

  // Check if product is favorite
  const { data: favoriteStatus, isLoading: isCheckingFavorite } = useIsFavorite(productId);
  const isFavorite = favoriteStatus?.isFavorite || localFavorite;

  const isLoading = isAddingToFavorites || isRemovingFromFavorites || isCheckingFavorite;

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!effectiveUserId) {
      // In real app, this would trigger login modal
      return;
    }

    // Optimistic update
    setLocalFavorite(!isFavorite);
    
    try {
      await toggleFavorite(productId);
    } catch (error) {
      // Revert optimistic update on error
      setLocalFavorite(isFavorite);
    }
  };

  const getIconSize = () => {
    switch (size) {
      case "sm": return "w-4 h-4";
      case "md": return "w-5 h-5";
      case "lg": return "w-6 h-6";
      default: return "w-5 h-5";
    }
  };

  const getButtonSize = () => {
    switch (size) {
      case "sm": return "sm";
      case "md": return "default";
      case "lg": return "lg";
      default: return "default";
    }
  };

  if (variant === "button") {
    return (
      <Button
        variant={isFavorite ? "default" : "outline"}
        size={getButtonSize()}
        onClick={handleToggleFavorite}
        disabled={isLoading}
        className={`gap-2 ${className}`}
        aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
      >
        <Heart 
          className={`${getIconSize()} ${isFavorite ? "fill-current text-white" : ""}`}
        />
        {isFavorite ? "Preferiti" : "Aggiungi ai Preferiti"}
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`p-2 hover:bg-gray-100 rounded-full transition-colors ${className}`}
      aria-label={isFavorite ? "Rimuovi dai preferiti" : "Aggiungi ai preferiti"}
    >
      <Heart 
        className={`${getIconSize()} transition-all duration-200 ${
          isFavorite 
            ? "fill-red-500 text-red-500 scale-110" 
            : "text-gray-400 hover:text-red-500"
        } ${isLoading ? "animate-pulse" : ""}`}
      />
    </Button>
  );
}
