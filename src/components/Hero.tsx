import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { ServicePrism } from './ServicePrism';

export function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center bg-white overflow-hidden text-zinc-900 pt-20 md:pt-32 pb-16">
      {/* High-end Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] shadow-inner overflow-hidden" />
      
      {/* Decorative Background Elements - Secured and strictly contained */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none sm:hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-zinc-200/50 rounded-full blur-3xl -translate-x-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col justify-end relative z-10 sm:overflow-visible">
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-4 xl:gap-8 mt-6 md:mt-24 lg:items-stretch">
          <div className="flex-1 flex flex-col items-center sm:items-start justify-end">
            <h1 className="leading-[0.85] font-black uppercase tracking-tighter mb-6 flex flex-col w-full text-center sm:text-left">
              {/* Mobile View: Dynamic Text reveal (Now above prism) */}
              <div className="sm:hidden w-full flex flex-col items-center gap-1 mb-2 text-center">
                <div className="overflow-hidden flex items-center h-[50px]">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[44px] font-black leading-none"
                  >
                    NAZZARENO
                  </motion.div>
                </div>
                <div className="overflow-hidden flex items-center h-[65px]">
                  <motion.div
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-[58px] font-black leading-none text-primary"
                  >
                    BOLDRINI
                  </motion.div>
                </div>
              </div>

              {/* Desktop View - Optimized to prevent clipping */}
              <div className="hidden sm:block">
                <motion.span 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block text-[10vw] lg:text-[5.5rem] xl:text-[7.5rem] tracking-[-0.06em] whitespace-nowrap"
                >
                  NAZZARENO
                </motion.span>
                <motion.span 
                  initial={{ x: 20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className="block text-[10vw] lg:text-[5.5rem] xl:text-[7.5rem] text-primary mt-[-0.15em] tracking-[-0.06em] whitespace-nowrap"
                >
                  BOLDRINI
                </motion.span>
              </div>
            </h1>

            {/* Wow Effect Prism for Mobile/Tablet - Now below title */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 70,
                damping: 20,
                delay: 0.2 
              }}
              className="lg:hidden -mt-6 mb-12 z-10 relative w-full flex justify-center"
            >
              <div className="w-full max-w-[320px]">
                <ServicePrism className="h-[400px]" />
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 md:mt-10 relative group"
            >
              {/* Decorative accent for the box */}
              <div className="absolute -left-4 top-0 bottom-0 w-1.5 bg-primary rounded-full hidden md:block group-hover:scale-y-110 transition-transform duration-500" />
              
              {/* Mobile Decorative accent */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="h-1.5 w-24 bg-primary rounded-full md:hidden mx-auto mb-6 origin-center"
              />
              
              <div className="bg-zinc-50/80 md:bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-[2.5rem] border border-zinc-200/50 shadow-2xl md:shadow-none md:border-none md:bg-transparent md:backdrop-blur-none flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                  <div className="w-8 h-[2px] bg-primary hidden md:block" />
                  <p className="text-[20px] sm:text-2xl md:text-3xl lg:text-xl xl:text-3xl font-bold tracking-tight leading-[1.2] text-zinc-800">
                    <span className="text-zinc-900 italic">Biologo Nutrizionista</span> 
                    <span className="text-primary font-black ml-2 hidden sm:inline">.</span>
                    <span className="text-zinc-400 font-medium block sm:inline"> @Brescia</span>
                  </p>
                </div>
                
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-4">
                  {['Ricomposizione', 'Performance', 'Metabolismo'].map((lab, i) => (
                    <motion.span 
                      key={lab} 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                      className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 bg-zinc-900 text-white rounded-lg shadow-lg shadow-black/10"
                    >
                      {lab}
                    </motion.span>
                  ))}
                </div>

                <p className="text-base sm:text-lg mt-6 text-zinc-600 font-medium max-w-lg leading-relaxed md:border-l-2 md:border-primary/20 md:pl-4">
                  Ottimizzazione metabolica e nutrizione sportiva d'élite. Alimento il tuo potenziale con <span className="text-zinc-900 font-bold">protocolli scientifici</span>.
                </p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 md:mt-8 w-full sm:w-auto"
            >
              <a 
                href="#servizi" 
                className="px-6 xl:px-8 py-4 bg-zinc-900 text-white text-[12px] xl:text-sm font-black rounded-full uppercase tracking-widest flex items-center justify-center hover:bg-zinc-800 transition-colors w-full sm:w-auto text-center"
              >
                Scopri i percorsi
                <ArrowRight className="ml-3 w-4 h-4" />
              </a>
              <a 
                href="#contatti" 
                className="px-6 xl:px-8 py-4 bg-white text-zinc-900 border-2 border-zinc-900 rounded-full text-[12px] xl:text-sm font-black uppercase tracking-widest flex items-center justify-center hover:bg-zinc-100 transition-colors w-full sm:w-auto text-center"
              >
                Prenota Consulto
              </a>
            </motion.div>
          </div>

          {/* Center Column: 3D Prism for Desktop */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden lg:block z-10 lg:w-[300px] xl:w-[340px] flex-shrink-0 mt-8 lg:mt-0 lg:self-end"
          >
            <div className="w-full h-full">
              <ServicePrism className="w-full h-[420px] lg:max-w-none" />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-[300px] xl:w-[340px] mt-8 lg:mt-0 lg:self-end flex-shrink-0"
          >
            {/* Athletic Performance Box */}
            <div className="bg-zinc-900 text-white p-6 sm:p-8 rounded-[2rem] flex flex-col justify-between h-auto sm:h-[420px] relative overflow-hidden group shadow-2xl">
              {/* Subtle background glow on hover */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-primary/10 transition-colors duration-700 pointer-events-none" />

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="text-[10px] uppercase tracking-[0.2em] opacity-60 mb-2 font-black">Performance Hyrox</div>
                  <h2 className="text-4xl font-black italic uppercase text-white">Elite Rank</h2>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-6"
                >
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Ultimo Risultato</p>
                  <div className="flex justify-between border-b border-white/20 pb-2 items-end">
                    <span className="text-[11px] uppercase opacity-70 font-bold max-w-[60%] leading-tight">Bologna '26<br/>(Pro Doubles)</span>
                    <span className="font-mono font-bold text-white text-lg">57:23</span>
                  </div>
                </motion.div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", bounce: 0.4, delay: 0.5 }}
                    className="bg-zinc-800 rounded-xl p-4 border border-zinc-700 flex flex-col items-center justify-center text-center shadow-lg hover:border-zinc-600 transition-colors"
                  >
                    <span className="text-2xl font-black italic text-white mb-1">#9</span>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60 leading-tight">Global Rank<br/>Pro Doubles</span>
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ type: "spring", bounce: 0.4, delay: 0.6 }}
                    className="bg-zinc-800 rounded-xl p-4 border border-zinc-700 flex flex-col items-center justify-center text-center shadow-lg hover:border-zinc-600 transition-colors"
                  >
                    <span className="text-2xl font-black italic text-white mb-1">#2</span>
                    <span className="text-[9px] font-black uppercase tracking-widest opacity-60 leading-tight">Age Group<br/>Pro Doubles</span>
                  </motion.div>
                </div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-primary text-zinc-900 p-5 rounded-2xl mt-8 relative z-10"
              >
                <p className="text-[10px] font-black uppercase tracking-widest mb-1">Prossimo Obiettivo</p>
                <p className="text-sm font-bold uppercase italic">Campionati del mondo Stoccolma 18-21 Giu 2026</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
