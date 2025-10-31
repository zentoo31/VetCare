import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Toaster } from 'sonner';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className=" rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[260px]">
            <Loader2 className="animate-spin w-8 h-8 text-teal-500" />
            <div className="mt-3 text-center text-gray-600">Cargando...</div>
          </div>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <Auth />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
