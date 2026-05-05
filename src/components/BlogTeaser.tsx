import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Article, articleService } from '../lib/services/articleService';
import { calculateReadingTime } from '../lib/readingTime';

export function BlogTeaser() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      // Get all articles and slice to 3 (Or could use a query with limit, but getArticles fetches all currently)
      const data = await articleService.getArticles();
      setArticles(data.slice(0, 3));
      setLoading(false);
    }
    loadArticles();
  }, []);

  return (
    <section id="blog" className="py-24 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-3 text-zinc-900">Risorse Gratuite</h2>
            <h3 className="text-5xl md:text-7xl font-black italic uppercase text-zinc-900 mb-6 leading-none">Ultimi<br/>Articoli</h3>
            <p className="text-zinc-600 text-lg font-medium">
              Scienza della nutrizione, suggerimenti per l'allenamento e ricette per supportare i tuoi obiettivi fisici.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="rounded-3xl p-6 border border-zinc-200 h-[300px] animate-pulse bg-zinc-50" />
            ))
          ) : articles.length > 0 ? (
            articles.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-6 flex flex-col justify-between border-2 group cursor-pointer hover:-translate-y-2 transition-all duration-300 ${i === 0 ? 'bg-primary border-primary text-zinc-900' : 'bg-white border-zinc-200 hover:border-zinc-900 text-zinc-900'}`}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest border border-current px-2 py-1 rounded-full opacity-80">Blog</span>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`text-[10px] font-bold ${i === 0 ? 'opacity-80' : 'text-zinc-400'}`}>
                        {article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString('it-IT') : 'Nuovo'}
                      </span>
                      <span className={`flex items-center gap-1 text-[10px] font-bold ${i === 0 ? 'opacity-80' : 'text-zinc-400'}`}>
                        <Clock className="w-3 h-3" />
                        {calculateReadingTime(article.content)} min
                      </span>
                    </div>
                  </div>
                  <h4 className="text-2xl font-black italic uppercase leading-tight mb-4 line-clamp-3">
                    {article.title}
                  </h4>
                  <p className={`text-sm font-medium leading-relaxed mb-8 line-clamp-3 ${i === 0 ? 'text-zinc-900/80' : 'text-zinc-600'}`}>
                    {article.excerpt}
                  </p>
                </div>
                
                <Link to={`/blog/${article.slug}`} className="flex items-center gap-3 mt-auto">
                  <div className={`w-10 h-10 rounded-full flex flex-shrink-0 items-center justify-center ${i === 0 ? 'bg-zinc-900 text-white' : 'bg-primary text-white'}`}>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest underline underline-offset-4">Leggi Articolo</span>
                </Link>
              </motion.article>
            ))
          ) : (
             <div className="md:col-span-3 text-center py-24 text-zinc-500 font-medium">
               Nessun articolo pubblicato ancora.
             </div>
          )}
        </div>

      </div>
    </section>
  );
}
