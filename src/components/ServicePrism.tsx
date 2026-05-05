import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Apple, Dumbbell, Timer } from 'lucide-react';

const services = [
  {
    id: 'benessere',
    icon: <Apple className="w-12 h-12" />,
    title: 'Benessere',
    description: 'Ricomposizione corporea e stile di vita.'
  },
  {
    id: 'sport',
    icon: <Dumbbell className="w-12 h-12" />,
    title: 'Nutrizione Sportiva',
    description: 'Massimizza i tuoi allenamenti.'
  },
  {
    id: 'agonismo',
    icon: <Timer className="w-12 h-12" />,
    title: 'Performance',
    description: 'Preparazione e timing per la gara.'
  }
];

export function ServicePrism({ className = "" }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(320); // Default width
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, 3000); // Rota ciclicamente ogni 3 secondi
    return () => clearInterval(interval);
  }, []);

  // Calcolo della distanza Z per un prisma base triangolare regolare
  const tz = width / (2 * Math.tan(Math.PI / 3));
  
  return (
    <div 
      className={`w-full max-w-[280px] sm:max-w-[320px] mx-auto ${className ? className : 'h-[240px]'}`} 
      style={{ perspective: '1200px' }}
      ref={containerRef}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: currentIndex * -120, z: -tz }}
        transition={{ duration: 1, ease: [0.64, 0.04, 0.35, 1.0] }} // Smooth snap
      >
        {services.map((service, index) => {
          const rotateY = index * 120;
          return (
            <div
              key={service.id}
              className={`absolute top-0 left-0 w-full h-full p-8 rounded-[3rem] flex flex-col justify-center items-center text-center shadow-2xl backdrop-blur-sm ${
                index === 0 ? 'bg-primary/95 text-zinc-900 border border-white/20' : 
                index === 1 ? 'bg-white/90 text-zinc-900 border border-zinc-200' : 
                'bg-zinc-900/95 text-white border border-white/10'
              }`}
              style={{
                transform: `rotateY(${rotateY}deg) translateZ(${tz + 1}px)`,
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 left-0 w-full h-full bg-linear-to-br from-white/10 to-transparent pointer-events-none rounded-[3rem]" />
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className={`${index === 2 ? 'opacity-80 text-white' : ''} flex flex-col items-center justify-center relative z-10`}
              >
                <div className="mb-4">
                  {service.icon}
                </div>
                <h4 className="text-3xl font-black italic uppercase mb-2 leading-[0.9] tracking-tighter">{service.title}</h4>
                <p className={`text-sm font-bold leading-relaxed ${index === 2 ? 'text-zinc-300' : 'text-zinc-500'}`}>
                  {service.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
