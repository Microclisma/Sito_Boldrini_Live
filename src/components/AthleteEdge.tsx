import { motion } from 'motion/react';
import { Target, Zap, Trophy } from 'lucide-react';

export function AthleteEdge() {
  return (
    <section id="atleta" className="py-24 bg-zinc-900 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3 text-primary">L'Approccio Hyrox</h2>
            <h3 className="text-5xl md:text-6xl lg:text-7xl font-black italic uppercase mb-6 leading-none">
              LA TEORIA<br/>
              INCONTRA LA<br/>
              <span className="text-primary border-b-4 border-primary pb-1">PRATICA.</span>
            </h3>
            
            <p className="text-zinc-300 text-lg mb-8 leading-relaxed font-medium">
              Studiare la biochimica sportiva sui libri è fondamentale. Ma sapere cosa si prova al 5° km di corsa dopo i burpees in una gara Hyrox è ciò che fa la differenza. 
              <br/><br/>
              Come atleta, sperimento su me stesso protocolli di idratazione, carbo-loading e integrazione per fornirti strategie <em>reali</em> e testate sul campo, non solo in teoria.
            </p>

            <div className="space-y-6">
              <div className="flex items-center space-x-6 border-t border-zinc-800 pt-6">
                <Target className="w-10 h-10 text-primary shrink-0" />
                <div>
                  <h4 className="text-xl font-black uppercase italic mb-1">Mentalità Competitiva</h4>
                  <p className="text-zinc-400 text-sm font-medium">Capisco le tue ansie pre-gara e ottimizzo l'intestino per evitare fastidi.</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 border-t border-zinc-800 pt-6">
                <Zap className="w-10 h-10 text-primary shrink-0" />
                <div>
                  <h4 className="text-xl font-black uppercase italic mb-1">Peak Performance</h4>
                  <p className="text-zinc-400 text-sm font-medium">Strategie di scarico/carico per farti arrivare pieno di energia in gara.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* NOTE FOR USER: Change to your actual Hyrox racing picture from Instagram! */}
            <div className="aspect-[3/4] sm:aspect-square relative overflow-hidden bg-zinc-800 rounded-3xl border-2 border-zinc-700">
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop" 
                alt="Hyrox Competition Performance" 
                className="w-full h-full object-cover mix-blend-lighten opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent hover:opacity-0 transition-opacity duration-500" />
            </div>
            
            {/* Floating stat card */}
            <div className="absolute -left-6 bottom-12 bg-white text-zinc-900 p-6 rounded-3xl border-2 border-zinc-900 shadow-xl flex items-center gap-4">
              <div className="bg-primary p-3 rounded-xl text-white">
                <Trophy className="w-8 h-8" />
              </div>
              <div>
                <div className="text-4xl font-black italic uppercase leading-none">PRO</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Division Athlete</div>
              </div>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
