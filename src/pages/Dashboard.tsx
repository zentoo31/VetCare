import { useState } from 'react';
import { LogOut, Calendar, PawPrint, Home, Store } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import PetManagement from './PetManagement';
import AppointmentBooking from './AppointmentBooking';
import AppointmentsList from '../components/AppointmentsList';
import ProductsStore from './ProductsStore';
import AppointmentHistorial from './AppointmentHistorial';
import { useNavigate } from 'react-router-dom';

type View = 'home' | 'pets' | 'appointments' | 'store' | 'historial';

export default function Dashboard() {
  const navigator = useNavigate();
  const { profile, signOut } = useAuth();
  const [currentView, setCurrentView] = useState<View>('home');

  async function handleSignOut() {
    try {
      await signOut();
      navigator('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50">
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#4bbfe8] rounded-xl flex items-center justify-center">
                <img src="/logo.png" alt="logo" className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Clínica veterinaria Fede y Lu</h1>
                <p className="text-xs text-gray-600">Bienvenido, {profile?.full_name}</p>
              </div>
            </div>

            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-4 space-y-2">
              <button
                onClick={() => setCurrentView('home')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'home' ? 'bg-teal-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Inicio</span>
              </button>

              <button
                onClick={() => setCurrentView('store')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'store' ? 'bg-teal-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Store className="w-5 h-5" />
                <span className="font-medium">Tienda</span>
              </button>

              <button
                onClick={() => setCurrentView('pets')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'pets' ? 'bg-teal-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <PawPrint className="w-5 h-5" />
                <span className="font-medium">Mis Mascotas</span>
              </button>

              <button
                onClick={() => setCurrentView('appointments')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'appointments'
                    ? 'bg-teal-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Agendar Cita</span>
              </button>
              <button
                onClick={() => setCurrentView('historial')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  currentView === 'historial' ? 'bg-teal-500 text-white shadow-md' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Calendar className="w-5 h-5" />
                <span className="font-medium">Historial de Citas</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3">
            {currentView === 'home' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Panel de Control</h2>
                  <p className="text-gray-600 mb-6">Gestiona las citas y el cuidado de tus mascotas desde un solo lugar.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-linear-to-br from-teal-50 to-cyan-50 p-6 rounded-xl border border-teal-100">
                      <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-3">
                        <PawPrint className="w-6 h-6 text-teal-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Registra Mascotas</h3>
                      <p className="text-sm text-gray-600 mb-4">Añade información sobre tus mascotas</p>
                      <button onClick={() => setCurrentView('pets')} className="text-teal-600 hover:text-teal-700 font-medium text-sm">
                        Ir a Mascotas →
                      </button>
                    </div>

                    <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-100">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">Agenda Citas</h3>
                      <p className="text-sm text-gray-600 mb-4">Reserva consultas veterinarias</p>
                      <button onClick={() => setCurrentView('appointments')} className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        Ver Citas →
                      </button>
                    </div>
                  </div>
                </div>

                <AppointmentsList compact />
              </div>
            )}

            {currentView === 'pets' && <PetManagement />}

            {currentView === 'appointments' && (
              <div className="space-y-6">
                <AppointmentBooking />
              </div>
            )}

            {currentView === 'store' && <ProductsStore />}
            {currentView === 'historial' && <AppointmentHistorial />}
          </div>
        </div>
      </div>

      <a href="https://wa.me/51961433163" target="_blank" rel="noopener noreferrer" className="fixed right-6 bottom-6 z-50">
        <img src="/whatsapp-color.png" alt="WhatsApp" className="w-14 h-14 shadow-lg rounded-full" />
      </a>
    </div>
  );
}

                      
