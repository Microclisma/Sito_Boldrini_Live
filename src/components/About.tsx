import { motion } from 'motion/react';
import { Award, BookOpen, Activity } from 'lucide-react';

export function About() {
  return (
    <section id="chi-sono" className="py-24 bg-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] bg-zinc-200 relative overflow-hidden group rounded-3xl border border-zinc-300">
              {/* NOTE FOR USER: Carica la tua immagine nella cartella public/images e rinominala in 'profile.jpg' */}
              <img 
                src="/images/profile.jpg" 
                alt="Nazzareno Boldrini" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%]"
              />
            </div>
            
            {/* Overlay Badge */}
            <div className="absolute -bottom-8 -right-8 bg-zinc-900 border-2 border-zinc-900 rounded-3xl p-8 w-64 shadow-2xl hidden md:block">
              <p className="text-primary font-black text-5xl font-mono mb-2">100%</p>
              <p className="text-white text-[10px] font-black uppercase tracking-widest leading-tight">Approccio Scientifico<br/>Senza Compromessi</p>
            </div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3 text-zinc-900">Chi Sono</h2>
            <h3 className="text-4xl md:text-5xl font-black italic uppercase leading-tight text-zinc-900 mb-6">
              Nazzareno Boldrini
            </h3>
            
            <div className="prose prose-lg text-zinc-700 mb-8 font-medium">
              <p>
                Sono un <strong>Biologo Nutrizionista a Brescia</strong> iscritto all'albo, con una profonda passione per lo sport e la fisiologia umana. Ricevo nel mio studio a Brescia per visite nutrizionali in presenza e seguo atleti e pazienti in tutta la provincia di Brescia (e online). Il mio approccio non si basa su restrizioni estreme, ma sulla comprensione profonda di come il cibo alimenta il nostro "motore" sia nella vita quotidiana che nelle prestazioni di alto livello.
              </p>
              <p className="mt-4">
                Vivere lo sport in prima persona, specialmente discipline intense come l'<strong>Hyrox</strong>, mi permette di comprendere esattamente le sfide fisiche e mentali che i miei atleti affrontano. Non si tratta solo di macronutrienti, ma di timing, recupero, idratazione e psiche.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
              <div className="flex items-start space-x-4 bg-white p-5 rounded-3xl border border-zinc-200">
                <div className="p-3 bg-zinc-900 text-primary rounded-xl shrink-0">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm uppercase">Estrazione Scientifica</h4>
                  <p className="text-[11px] text-zinc-600 mt-1 font-medium leading-tight">Laurea in Scienze Biologiche e continuo aggiornamento scientifico.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 bg-white p-5 rounded-3xl border border-zinc-200">
                <div className="p-3 bg-zinc-900 text-primary rounded-xl shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm uppercase">Atleta Hyrox</h4>
                  <p className="text-[11px] text-zinc-600 mt-1 font-medium leading-tight">Risultati agonistici e conoscenza reale delle dinamiche di gara.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4 sm:col-span-2 bg-white p-5 rounded-3xl border border-zinc-200 items-center">
                <div className="p-3 bg-zinc-900 text-primary rounded-xl shrink-0">
                  <Activity className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-sm uppercase">Supporto 360°</h4>
                  <p className="text-[11px] text-zinc-600 mt-1 font-medium leading-tight">Dal dimagrimento e benessere generale alla preparazione élite agonistica.</p>
                </div>
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
