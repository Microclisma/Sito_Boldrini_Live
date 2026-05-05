import { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth, ADMIN_EMAILS } from '../lib/AuthContext';
import { Navigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export function AdminLogin() {
  const { user, isAdmin } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user && isAdmin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      setError('');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      const email = result.user.email;
      if (!email || !ADMIN_EMAILS.includes(email)) {
        await signOut(auth);
        setError('Accesso negato: account Google non autorizzato.');
      }
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        setError('La finestra di accesso è stata chiusa. Riprova ad accedere.');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Il popup di accesso è stato bloccato dal browser. Prova ad aprire il sito in una nuova scheda.');
      } else {
        setError(err.message || 'Errore durante il login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 p-4">
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 max-w-sm w-full">
        <div className="flex flex-col items-center mb-8">
          <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black uppercase text-center tracking-tight text-zinc-900">
            Accesso Admin
          </h1>
          <p className="text-sm text-zinc-500 mt-2 text-center">Gestisci gli articoli del sito</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 bg-zinc-900 text-white rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-50"
        >
          {loading ? 'Attendere...' : 'Accedi con Google'}
        </button>
      </div>
    </div>
  );
}
