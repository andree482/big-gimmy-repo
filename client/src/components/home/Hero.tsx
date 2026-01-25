import { Link } from "wouter";
import { motion } from "framer-motion";

const DumbbellIcon = () => (
  <motion.div
    initial={{ scale: 0, rotate: -180 }}
    animate={{ scale: 1, rotate: 0 }}
    transition={{ 
      duration: 1, 
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2 
    }}
  >
    <motion.svg 
      width="150" 
      height="150" 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className="mx-auto mb-4"
      whileHover={{ 
        rotate: [0, -10, 10, 0], 
        scale: 1.1 
      }}
      transition={{ duration: 0.6 }}
    >
      {/* Manubrio - asta centrale */}
      <motion.rect 
        x="6" y="11" width="12" height="2" 
        fill="#FFD100" rx="1"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
      
      {/* Pesi a sinistra */}
      <motion.rect 
        x="2" y="9" width="4" height="6" 
        fill="#FFD100" rx="1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      />
      <motion.rect 
        x="3" y="7" width="2" height="10" 
        fill="#FFD100" rx="1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
      />
      
      {/* Pesi a destra */}
      <motion.rect 
        x="18" y="9" width="4" height="6" 
        fill="#FFD100" rx="1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.4 }}
      />
      <motion.rect 
        x="19" y="7" width="2" height="10" 
        fill="#FFD100" rx="1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.1, duration: 0.4 }}
      />
    </motion.svg>
  </motion.div>
);

const Hero = () => {
  return (
    <section className="hero-section min-h-[500px] md:min-h-[600px] flex items-center justify-center py-10 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        {/* Animated Icon */}
        <motion.div 
          className="mb-2 md:mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <DumbbellIcon />
        </motion.div>
        
        {/* Animated Main Title */}
        <motion.div 
          className="flex items-center justify-center mb-4 md:mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-montserrat font-bold">
            <motion.span 
              className="text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              BIG
            </motion.span>{" "}
            <motion.span 
              className="text-[#FFD100]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              GIMMY
            </motion.span>{" "}
            <motion.span 
              className="text-[#FFD100]"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              INTEGRATORI
            </motion.span>
          </h1>
        </motion.div>
        
        {/* Animated Subtitle */}
        <motion.h2 
          className="text-2xl sm:text-3xl md:text-4xl font-montserrat font-bold text-white mb-4 md:mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Potenzia le tue{" "}
          <motion.span 
            className="text-[#FFD100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
          >
            Performance
          </motion.span>
        </motion.h2>
        
        {/* Animated Description */}
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-white mb-6 md:mb-8 max-w-2xl mx-auto px-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          La qualità degli integratori e accessori per la palestra che cerchi, ora anche in Valle d'Aosta.
        </motion.p>
        
        {/* Animated CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px rgba(255, 209, 0, 0.3)',
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="inline-block"
          >
            <Link
              href="/prodotti"
              className="bg-[#FFD100] hover:bg-yellow-500 text-[#212121] font-montserrat font-bold px-6 sm:px-8 py-3 rounded-md transition-all inline-block w-full sm:w-auto max-w-xs mx-auto"
            >
              Scopri i Prodotti
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
