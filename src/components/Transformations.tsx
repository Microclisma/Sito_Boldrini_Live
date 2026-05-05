import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const stories = [
  {
    id: 1,
    name: 'Soggetto 1',
    frontImage: '/images/soggetto1_front.jpg', // NOTE FOR USER: Carica questa immagine
    backImage: '/images/soggetto1_back.jpg',   // NOTE FOR USER: Carica questa immagine
    goal: 'Ricomposizione',
    duration: '6 Mesi',
    quote: "Non pensavo fosse possibile mangiare carboidrati e perdere massa grassa. Nazzareno ha rivoluzionato il mio approccio."
  },
  {
    id: 2,
    name: 'Soggetto 2',
    frontImage: '/images/soggetto2_front.jpg', // NOTE FOR USER: Carica questa immagine
    backImage: '/images/soggetto2_back.jpg',   // NOTE FOR USER: Carica questa immagine
    goal: 'Definizione',
    duration: '3 Mesi',
    quote: "Il protocollo di scarico e ricarica prima della gara ha fatto la differenza. Mai sentita così concentrata ed energica."
  },
  {
    id: 3,
    name: 'Soggetto 3',
    frontImage: '/images/soggetto3_front.jpg', // NOTE FOR USER: Carica questa immagine
    backImage: '/images/soggetto3_back.jpg',   // NOTE FOR USER: Carica questa immagine
    goal: 'Gestione Ipertrofia',
    duration: '1 Anno',
    quote: "Da hardgainer non prendevo un chilo. Con un surplus controllato e il corretto timing abbiamo costruito massa pulita."
  }
];

function TransformationCard({ story, index }: { story: any, index: number, key?: number | string }) {
  const [view, setView] = useState<'front' | 'back'>('front');

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-zinc-100 rounded-3xl p-6 border border-zinc-200 flex flex-col justify-between group h-full hover:border-zinc-300 transition-colors"
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <span className="text-[10px] font-black uppercase tracking-widest">{story.goal}</span>
          <span className="text-primary font-bold text-xs bg-primary/10 px-2 py-1 rounded-md">{story.duration}</span>
        </div>
        
        {/* Interactive Image Container */}
        <div className="mb-6 relative w-full rounded-2xl overflow-hidden bg-zinc-200 aspect-square">
          <AnimatePresence mode="wait">
            <motion.img 
              key={view}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              src={view === 'front' ? story.frontImage : story.backImage} 
              className="absolute inset-0 w-full h-full object-cover" 
              alt={`${story.name} - Visione ${view === 'front' ? 'Frontale' : 'Posteriore'}`}
              onError={(e) => {
                // Fallback style if image is missing so preview doesn't look totally broken
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?q=80&w=2940&auto=format&fit=crop';
              }}
            />
          </AnimatePresence>
          
          {/* Labels Prima / Dopo */}
          <div className="absolute top-4 left-4 bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-md text-[9px] font-black uppercase text-white border border-white/10 shadow-lg tracking-widest">Prima</div>
          <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur px-3 py-1.5 rounded-md text-[9px] font-black uppercase text-white border border-white/10 shadow-lg tracking-widest">Dopo</div>

          {/* Toggle Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center bg-zinc-900/80 backdrop-blur p-1 rounded-full border border-white/10 z-10 shadow-xl">
            <button 
              onClick={() => setView('front')}
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${view === 'front' ? 'bg-white text-zinc-900' : 'text-white hover:text-primary'}`}
            >
              Frontale
            </button>
            <button 
               onClick={() => setView('back')}
               className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors ${view === 'back' ? 'bg-white text-zinc-900' : 'text-white hover:text-primary'}`}
            >
              Posteriore
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-2xl font-black italic uppercase text-zinc-900 mb-2">{story.name}</h4>
          <div className="h-px bg-zinc-200 w-full"></div>
        </div>
      </div>

      <p className="text-sm font-medium leading-relaxed text-zinc-600 relative z-10 italic">
        "{story.quote}"
      </p>
    </motion.div>
  );
}

export function Transformations() {
  return (
    <section id="prima-dopo" className="py-24 bg-white border-t-8 border-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3 text-zinc-900">Risultati Reali</h2>
            <h3 className="text-5xl md:text-7xl font-black italic uppercase text-zinc-900 mb-4 leading-none">Storie di<br/>Successo</h3>
            <p className="text-zinc-600 text-lg font-medium">
              La coerenza batte la perfezione. Ecco cosa succede quando unisci un piano scientifico al tuo duro lavoro.
            </p>
          </motion.div>
          
          <motion.a 
            href="#contatti"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex items-center justify-center gap-3 bg-zinc-900 text-white px-8 py-4 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors shrink-0"
          >
            Inizia il percorso
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <TransformationCard key={story.id} story={story} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
