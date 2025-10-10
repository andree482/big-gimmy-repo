import React from 'react';
// Importa l'immagine direttamente come modulo
import logoTransparentSrc from '../../assets/logo-transparent.png';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 90, className = "" }) => {
  // Utilizziamo l'immagine con sfondo trasparente
  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src={logoTransparentSrc} 
        alt="Big Gimmy Logo" 
        style={{
          width: `${size}px`,
          height: 'auto',
          maxHeight: `${size * 0.6}px`
        }}
        className="object-contain"
      />
    </div>
  );
};

export default Logo;