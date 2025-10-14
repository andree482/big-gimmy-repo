import { useEffect } from 'react';

interface UseImagePreloaderProps {
  images: string[];
  priority?: boolean;
}

export const useImagePreloader = ({ images, priority = false }: UseImagePreloaderProps) => {
  useEffect(() => {
    if (!priority && !('requestIdleCallback' in window)) return;

    const preloadImages = () => {
      images.forEach((src) => {
        if (src && src !== '/images/placeholder-product.jpg') {
          const img = new Image();
          img.decoding = 'async';
          img.loading = 'eager';
          img.src = src;
        }
      });
    };

    if (priority) {
      // Carica immediatamente le immagini prioritarie
      preloadImages();
    } else {
      // Usa requestIdleCallback per immagini non critiche
      const idleCallback = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 1));
      idleCallback(preloadImages);
    }
  }, [images, priority]);
};

export const preloadCriticalImages = (imageSrcs: string[]) => {
  imageSrcs.forEach((src) => {
    if (src && !src.includes('placeholder')) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    }
  });
};