import React from 'react';
// Importa l'immagine direttamente come modulo
import logoTransparentSrc from '../../assets/logo-transparent.png';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 90, className = "" }) => {
  // Calcola altezza fissa basata sul rapporto del logo (circa 0.5)
  const height = Math.round(size * 0.5);

  return (
    <div
      className={`flex items-center ${className}`}
      style={{
        width: `${size}px`,
        height: `${height}px`,
        minWidth: `${size}px`,
        minHeight: `${height}px`,
      }}
    >
      <img
        src={logoTransparentSrc}
        alt="Big Gimmy Logo"
        width={size}
        height={height}
        style={{
          width: `${size}px`,
          height: `${height}px`,
          objectFit: 'contain',
        }}
        loading="eager"
        decoding="async"
        fetchPriority="high"
      />
    </div>
  );
};

export default Logo;