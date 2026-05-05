import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext';
import { auth } from '../../lib/firebase';
import { signOut } from 'firebase/auth';
import { LogOut, FileText, ArrowLeft, Plus } from 'lucide-react';

export function AdminLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-zinc-900 border-r border-zinc-200 flex flex-col min-h-[10vh] md:min-h-screen text-white shrink-0">
        <div className="p-6 border-b border-zinc-800">
          <Link to="/admin/dashboard" className="text-xl font-black uppercase tracking-tight block">
            Admin Area
          </Link>
          <div className="text-sm opacity-60 mt-1 truncate">{user?.email}</div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2">
          <Link 
            to="/admin/dashboard" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-800 font-semibold"
          >
            <FileText className="w-5 h-5" />
            Articoli
          </Link>
          <Link 
            to="/admin/articles/new" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-zinc-800/50 transition-colors font-semibold"
          >
            <Plus className="w-5 h-5" />
            Nuovo Articolo
          </Link>
        </nav>

        <div className="p-4 border-t border-zinc-800">
          <Link 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-xl hover:bg-zinc-800 transition-colors mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Torna al Sito
          </Link>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-left text-sm font-semibold rounded-xl text-red-400 hover:bg-zinc-800 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Disconnetti
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
