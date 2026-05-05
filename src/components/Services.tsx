import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Apple, Dumbbell, Timer, ChevronDown } from 'lucide-react';

const services = [
  {
    id: 'benessere',
    icon: <Apple className="w-8 h-8" />,
    title: 'Benessere',
    description: 'Percorsi personalizzati per il dimagrimento, ricomposizione corporea e gestione di patologie accertate. Impara a mangiare bene senza stress, migliorando il tuo stile di vita in modo sostenibile.',
    features: ['Piani personalizzati', 'Educazione alimentare', 'Monitoraggio costante']
  },
  {
    id: 'sport',
    icon: <Dumbbell className="w-8 h-8" />,
    title: 'Nutrizione Sportiva',
    description: 'Ottimizza i tuoi allenamenti, che tu faccia palestra, crossfit, corsa o sport di squadra. Il piano è strutturato per massimizzare la forza, l\'ipertrofia o la resistenza, garantendo il giusto recupero.',
    features: ['Gestione macronutrienti', 'Integrazione mirata', 'Periodizzazione']
  },
  {
    id: 'agonismo',
    icon: <Timer className="w-8 h-8" />,
    title: 'Performance Agonistica',
    description: 'Per te che gareggi (Hyrox, CrossFit, Endurance) dove ogni dettaglio conta. Protocolli avanzati di carbo-loading, strategie di deplezione e gestione del timing pre, intra e post-gara.',
    features: ['Match day strategy', 'Peak week protocols', 'Recupero estremo']
  }
];

export function Services() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="servizi" className="py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3 text-zinc-900">Aree di Intervento</h2>
            <h3 className="text-5xl md:text-7xl font-black italic uppercase text-zinc-900 mb-6 leading-[0.9]">I Miei<br/>Servizi</h3>
            <p className="text-zinc-600 text-lg font-medium max-w-xl">
              Ogni corpo è diverso, ogni obiettivo richiede una strategia specifica. 
              Dal benessere quotidiano al podio agonistico.
            </p>
          </motion.div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className={`rounded-3xl p-8 border hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between ${index === 0 ? 'bg-primary text-zinc-900 border-primary' : index === 1 ? 'bg-zinc-100 text-zinc-900 border-zinc-200' : 'bg-zinc-900 text-white border-zinc-900'}`}
            >
              <div>
                <div className={`text-[10px] font-black uppercase tracking-widest mb-8 flex justify-between items-center ${index === 2 ? 'opacity-60' : ''}`}>
                  <span>Servizi</span>
                  {service.icon}
                </div>
                <h4 className="text-4xl font-black italic uppercase mb-6 leading-[0.9]">{service.title}</h4>
                <p className={`text-sm font-medium leading-relaxed mb-8 ${index === 2 ? 'text-zinc-400' : 'text-zinc-700'}`}>
                  {service.description}
                </p>
              </div>
              
              <div>
                <ul className="space-y-3 mb-8 border-t border-current/20 pt-6">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex justify-between items-center text-[11px] font-bold uppercase tracking-widest">
                      <span className="opacity-70">Step 0{i + 1}</span>
                      <span className="">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <a href="#contatti" className={`inline-flex w-full px-6 py-3 border-2 rounded-full text-[11px] font-black uppercase tracking-widest justify-center items-center transition-colors ${index === 0 ? 'border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-primary' : index === 1 ? 'border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100' : 'border-white bg-transparent text-white hover:bg-white hover:text-zinc-900'}`}>
                  Richiedi Info
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View: Accordion */}
        <div className="md:hidden flex flex-col gap-4">
          {services.map((service, index) => {
            const isExpanded = expandedId === service.id;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`rounded-3xl border overflow-hidden transition-colors duration-300 ${index === 0 ? 'bg-primary text-zinc-900 border-primary' : index === 1 ? 'bg-zinc-100 text-zinc-900 border-zinc-200' : 'bg-zinc-900 text-white border-zinc-900'}`}
              >
                <button
                  onClick={() => toggleAccordion(service.id)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4"
                >
                  <div className="flex flex-col gap-3">
                    <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${index === 2 ? 'opacity-60' : ''}`}>
                      <div className="[&>svg]:w-5 [&>svg]:h-5">
                        {service.icon}
                      </div>
                      <span>Servizi</span>
                    </div>
                    <h4 className="text-2xl font-black italic uppercase leading-[0.9] pr-4">{service.title}</h4>
                  </div>
                  <ChevronDown
                    className={`shrink-0 w-6 h-6 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-8">
                        <p className={`text-sm font-medium leading-relaxed mb-6 block ${isExpanded && index === 2 ? 'text-zinc-400' : 'text-zinc-700'}`}>
                          {service.description}
                        </p>
                        
                        <ul className="space-y-3 mb-8 border-t border-current/20 pt-6">
                          {service.features.map((feature, i) => (
                            <li key={i} className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
                              <span className="opacity-70">Step 0{i + 1}</span>
                              <span className="text-right">{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <a href="#contatti" className={`block w-full px-6 py-4 border-2 rounded-full text-xs font-black uppercase tracking-widest text-center transition-colors ${index === 0 ? 'border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-primary' : index === 1 ? 'border-zinc-900 bg-transparent text-zinc-900 hover:bg-zinc-900 hover:text-zinc-100' : 'border-white bg-transparent text-white hover:bg-white hover:text-zinc-900'}`}>
                          Richiedi Info
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
