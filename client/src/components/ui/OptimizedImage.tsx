import { useState, useRef, useEffect, useMemo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
  fetchpriority?: 'high' | 'low' | 'auto';
}

// Funzione per encodare i path delle immagini (gestisce spazi e caratteri speciali)
const encodeImagePath = (path: string): string => {
  if (!path) return path;
  // Splitta il path per preservare le barre
  const parts = path.split('/');
  // Encoda solo il nome del file (l'ultima parte)
  const encodedParts = parts.map((part, index) =>
    index === parts.length - 1 ? encodeURIComponent(part) : part
  );
  return encodedParts.join('/');
};

// Funzione per ottenere versione WebP di un'immagine
// DISABILITATO: i file WebP non esistono e causano problemi di caricamento
const getWebPSrc = (_src: string): string | null => {
  // Ritorna sempre null per disabilitare il fallback WebP
  // Il tag <source> non triggera onError quando il file non esiste,
  // causando un caricamento infinito
  return null;
};

export const OptimizedImage = ({
  src,
  alt,
  className = "",
  placeholder = "/placeholder-product.png",
  width,
  height,
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center center',
  fetchpriority = 'auto'
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(true); // Inizializza a true per evitare blocchi di rendering
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  // Genera srcset per immagini responsive e encoda i path
  const webpSrc = useMemo(() => getWebPSrc(src), [src]);
  const encodedSrc = useMemo(() => encodeImagePath(src), [src]);
  const encodedPlaceholder = useMemo(() => encodeImagePath(placeholder), [placeholder]);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px' // Precarica immagini 100px prima che entrino in vista
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  const imgStyle = {
    objectFit: objectFit,
    objectPosition: objectPosition
  };

  const imgClassName = `w-full h-full transition-opacity duration-300 ${
    isLoaded && !hasError ? 'opacity-100' : 'opacity-0'
  }`;

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder/Skeleton - mostra anche in caso di errore */}
      {(!isLoaded || hasError) && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 text-gray-400">
            <svg fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      )}

      {/* Actual Image con supporto WebP */}
      {(isInView || priority) && (
        webpSrc ? (
          <picture>
            <source srcSet={hasError || !webpSrc ? '' : webpSrc} type="image/webp" />
            <img
              src={hasError ? encodedPlaceholder : encodedSrc}
              alt={alt}
              className={imgClassName}
              style={imgStyle}
              onLoad={handleLoad}
              onError={handleError}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              width={width}
              height={height}
            />
          </picture>
        ) : (
          <img
            src={hasError ? encodedPlaceholder : encodedSrc}
            alt={alt}
            className={imgClassName}
            style={imgStyle}
            onLoad={handleLoad}
            onError={handleError}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            width={width}
            height={height}
          />
        )
      )}
    </div>
  );
};