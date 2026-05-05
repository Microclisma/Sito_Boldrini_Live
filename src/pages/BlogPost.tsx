import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article, articleService } from '../lib/services/articleService';
import Markdown from 'react-markdown';
import { ArrowLeft, ArrowRight, Clock, Facebook, Linkedin, MessageCircle } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { calculateReadingTime } from '../lib/readingTime';
import { SEO } from '../components/SEO';

export function BlogPost() {
  const { slug } = useParams();
  const [article, setArticle] = useState<Article | null>(null);
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [slug]);

  const loadArticle = async () => {
    if (!slug) return;
    setLoading(true);
    const data = await articleService.getArticleBySlug(slug);
    setArticle(data || null);
    
    // Load recent articles to recommend. Filter out current one.
    const all = await articleService.getArticles();
    setRecentArticles(all.filter(a => a.id !== data?.id).slice(0, 3));
    
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-zinc-200 border-t-zinc-900 rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-zinc-50 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-black uppercase italic tracking-tight text-zinc-900 mb-4">Articolo non trovato</h1>
        <Link to="/" className="px-8 py-4 bg-zinc-900 text-white rounded-full font-black uppercase text-sm tracking-widest hover:bg-zinc-800 transition-colors">
          Torna alla Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title={article.title} 
        description={article.content.substring(0, 160).replace(/[^a-zA-Z0-9 ]/g, '') + '...'} 
        image={article.coverImage || undefined}
        url={`https://nazzarenoboldrini.it/blog/${article.slug}`}
        type="article"
      />
      <Navbar />
      <main className="flex-1 bg-white pt-24 pb-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors uppercase font-bold text-[10px] tracking-widest mb-8">
            <ArrowLeft className="w-3 h-3" />
            Torna indietro
          </Link>

          {article.coverImage && (
            <img 
              src={article.coverImage} 
              alt={article.title} 
              className="w-full h-auto aspect-video object-cover rounded-3xl mb-8"
            />
          )}

          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tight text-zinc-900 mb-6">
              {article.title}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-zinc-200 pb-6">
              <div className="flex flex-col gap-2">
                <p className="text-zinc-500 font-medium">
                  Pubblicato il {article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString('it-IT') : 'Recentemente'}
                </p>
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Tempo di lettura: {calculateReadingTime(article.content)} min</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mr-2">Condividi</span>
                <a 
                  href={`https://wa.me/?text=${encodeURIComponent(article.title + ' ' + window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-green-100 hover:text-green-600 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a 
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(article.title)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-600 hover:bg-sky-100 hover:text-sky-600 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="markdown-body text-lg leading-relaxed text-zinc-700 space-y-6">
            <Markdown
              components={{
                h1: ({node, ...props}) => <h1 className="text-3xl font-black uppercase italic tracking-tight text-zinc-900 mt-12 mb-6" {...props} />,
                h2: ({node, ...props}) => <h2 className="text-2xl font-black uppercase italic tracking-tight text-zinc-900 mt-10 mb-5" {...props} />,
                h3: ({node, ...props}) => <h3 className="text-xl font-black uppercase tracking-tight text-zinc-900 mt-8 mb-4" {...props} />,
                p: ({node, ...props}) => <p className="mb-6 font-medium text-zinc-600" {...props} />,
                ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 space-y-2 font-medium text-zinc-600" {...props} />,
                ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 space-y-2 font-medium text-zinc-600" {...props} />,
                li: ({node, ...props}) => <li className="" {...props} />,
                a: ({node, ...props}) => <a className="text-zinc-900 font-bold underline underline-offset-4 decoration-2" {...props} />,
                blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-zinc-900 pl-4 py-1 my-6 italic bg-zinc-50 rounded-r-xl font-medium" {...props} />,
                pre: ({node, ...props}) => <pre className="bg-zinc-900 text-zinc-50 p-6 rounded-2xl overflow-x-auto text-sm my-6 font-mono" {...props} />,
                code: ({node, inline, ...props}: any) => 
                  inline ? <code className="bg-zinc-100 text-zinc-900 px-1 py-0.5 rounded font-mono text-sm" {...props} /> : <code {...props} />,
                em: ({node, ...props}) => <em className="italic" {...props} />,
                strong: ({node, ...props}) => <strong className="font-black text-zinc-900" {...props} />,
                img: ({node, ...props}) => <img className="w-full h-auto rounded-3xl my-8 object-cover aspect-video" {...props} />
              }}
            >
              {article.content}
            </Markdown>
          </div>
          
          {recentArticles.length > 0 && (
            <div className="mt-20 pt-16 border-t border-zinc-200">
              <h3 className="text-2xl font-black italic uppercase text-zinc-900 mb-8">Articoli recenti</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recentArticles.map((recentArticle, i) => (
                  <Link 
                    key={recentArticle.id} 
                    to={`/blog/${recentArticle.slug}`}
                    className="group flex flex-col justify-between p-6 rounded-3xl bg-zinc-50 border border-zinc-200 hover:border-zinc-900 hover:-translate-y-1 transition-all"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Blog</span>
                        <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                          <Clock className="w-3 h-3" />
                          <span>{calculateReadingTime(recentArticle.content)} min</span>
                        </div>
                      </div>
                      <h4 className="text-lg font-black italic uppercase leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {recentArticle.title}
                      </h4>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-6">
                      <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 group-hover:bg-primary group-hover:text-white transition-colors">
                        <ArrowRight className="w-3 h-3 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest">Leggi</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
