import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { articleService } from '../../lib/services/articleService';
import { ArrowLeft, Save, Upload, Copy, Check } from 'lucide-react';

export function AdminArticleEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = id && id !== 'new';

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditing);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      loadArticle();
    }
  }, [id]);

  const loadArticle = async () => {
    if (!id) return;
    const article = await articleService.getArticleById(id);
    if (article) {
      setTitle(article.title);
      setSlug(article.slug);
      setExcerpt(article.excerpt);
      setContent(article.content);
      setCoverImage(article.coverImage || '');
    }
    setInitialLoading(false);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    if (!isEditing) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };


  const handleDelete = async () => {
    if (!id || id === 'new') return;
    if (window.confirm('Sei sicuro di voler eliminare questo articolo? Questa azione in irreversibile.')) {
      setLoading(true);
      try {
        await articleService.deleteArticle(id);
        navigate('/admin/dashboard');
      } catch (error) {
        alert("Errore durante l'eliminazione dell'articolo");
        setLoading(false);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(text);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        title,
        slug,
        excerpt,
        content,
        coverImage,
      };

      if (isEditing) {
        await articleService.updateArticle(id, data);
      } else {
        await articleService.createArticle(data);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      alert("Errore nel salvataggio dell'articolo");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="animate-pulse">Caricamento in corso...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/dashboard" className="p-3 bg-white rounded-full hover:bg-zinc-100 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight text-zinc-900">
            {isEditing ? 'Modifica Articolo' : 'Nuovo Articolo'}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-zinc-200">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Titolo</label>
              <input
                type="text"
                required
                value={title}
                onChange={handleTitleChange}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all"
                placeholder="Titolo dell'articolo..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Slug (URL)</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-mono text-sm"
                placeholder="il-mio-articolo"
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Immagine di Copertina</label>
              <p className="text-xs text-zinc-500 mb-4">
                Incolla l'URL diretto dell'immagine. Puoi usare il bottone a destra per caricare gratuitamente l'immagine su Postimages e copiare il "Link Diretto".
              </p>
              <div className="flex gap-4 items-start">
                <div className="flex-1">
                  <input
                    type="url"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-mono text-sm"
                    placeholder="https://i.postimg.cc/..."
                  />
                  {coverImage && (
                    <img 
                      src={coverImage} 
                      alt="Cover preview" 
                      className="mt-4 w-full max-w-sm h-32 object-cover rounded-xl border border-zinc-200"
                    />
                  )}
                </div>
                <div className="shrink-0 flex items-center h-[46px]">
                  <a
                    href="https://postimages.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-full px-4 bg-zinc-100 text-zinc-900 rounded-xl font-bold text-sm flex items-center justify-center hover:bg-zinc-200 transition-colors"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Carica Immagine su Postimages</span>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2">Riassunto / Excerpt</label>
              <textarea
                required
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all resize-none"
                placeholder="Breve introduzione all'articolo..."
              />
            </div>

            <div>
              <label className="block text-sm font-bold uppercase tracking-widest text-zinc-500 mb-2 flex justify-between items-end">
                <span>Contenuto (Markdown)</span>
                <a
                  href="https://postimages.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-zinc-100 text-zinc-900 rounded-lg font-bold text-xs flex items-center justify-center hover:bg-zinc-200 transition-colors"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  <span>Carica su Postimages</span>
                </a>
              </label>
              <textarea
                required
                rows={20}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-zinc-900 transition-all font-mono text-sm resize-y min-h-[400px]"
                placeholder="# Titolo principale\n\nQuesto è il contenuto del tuo articolo..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur border-t border-zinc-200 z-10 md:static md:bg-transparent md:border-none md:p-0">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={loading}
              className="text-red-500 font-bold uppercase tracking-widest text-sm hover:text-red-600 transition-colors disabled:opacity-50"
            >
              Elimina
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto bg-zinc-900 text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 hover:bg-zinc-800 transition-colors disabled:opacity-50 ml-auto"
          >
            <Save className="w-5 h-5" />
            {loading ? 'Salvataggio...' : 'Salva Articolo'}
          </button>
        </div>
      </form>
    </div>
  );
}
