import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article, articleService } from '../../lib/services/articleService';
import { Pencil, Trash2, ExternalLink, Plus } from 'lucide-react';

export function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await articleService.getArticles();
      setArticles(data);
    } catch (err: any) {
      console.error(err);
      setError("Errore nel caricamento degli articoli. Assicurati di aver abilitato Firestore Database nel tuo progetto Firebase e che le regole di sicurezza consentano l'accesso.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Sei sicuro di voler eliminare questo articolo?')) {
      await articleService.deleteArticle(id);
      loadArticles();
    }
  };

  if (loading) {
    return <div className="animate-pulse">Caricamento articoli...</div>;
  }

  if (error) {
    return <div className="p-4 bg-red-50 text-red-600 rounded-xl">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900">Articoli</h1>
          <p className="text-zinc-500 mt-1">Gestisci i post del blog</p>
        </div>
        <Link 
          to="/admin/articles/new"
          className="bg-zinc-900 text-white px-6 py-3 justify-center rounded-full font-bold uppercase tracking-widest text-sm flex items-center gap-2 hover:bg-zinc-800 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuovo Articolo
        </Link>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-20 bg-white border border-zinc-200 rounded-3xl">
          <p className="text-zinc-500 mb-4">Nessun articolo presente.</p>
          <Link 
            to="/admin/articles/new"
            className="inline-flex items-center gap-2 text-zinc-900 font-bold underline underline-offset-4 decoration-2"
          >
            Scrivi il primo articolo
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-zinc-200 rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 font-bold text-sm text-zinc-500 uppercase tracking-widest">Titolo</th>
                <th className="px-6 py-4 font-bold text-sm text-zinc-500 uppercase tracking-widest hidden md:table-cell">Data</th>
                <th className="px-6 py-4 font-bold text-sm text-zinc-500 uppercase tracking-widest text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-zinc-900 line-clamp-1">{article.title}</div>
                    <div className="text-sm text-zinc-500 line-clamp-1 mt-1">{article.excerpt}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-zinc-500 hidden md:table-cell">
                    {article.createdAt?.toDate ? article.createdAt.toDate().toLocaleDateString('it-IT') : 'Nuovo'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <a 
                        href={`/blog/${article.slug}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 text-zinc-400 hover:text-zinc-900 bg-white hover:bg-zinc-100 rounded-lg transition-colors border border-transparent hover:border-zinc-200"
                        title="Vedi articolo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <Link 
                        to={`/admin/articles/${article.id}/edit`}
                        className="p-2 text-zinc-400 hover:text-amber-600 bg-white hover:bg-amber-50 rounded-lg transition-colors border border-transparent hover:border-amber-200"
                        title="Modifica"
                      >
                        <Pencil className="w-4 h-4" />
                      </Link>
                      <button 
                        onClick={() => handleDelete(article.id!)}
                        className="p-2 text-zinc-400 hover:text-red-600 bg-white hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                        title="Elimina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
