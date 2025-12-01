
import { Button } from '@heroui/react';
import { Trash2, ShoppingCart, LogOut, ArrowLeft} from 'lucide-react';
import useCart from '../lib/cartStore';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();

  const items = useCart((s) => s.items);
  const removeItem = useCart((s) => s.removeItem);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const total = useCart((s) => s.total)();

  async function handleSignOut() {
    try {
      await signOut();
      navigate('/');
    } catch (err) {
      console.error('Sign out error', err);
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

            <div className="flex items-center gap-3">
              <Button onPress={() => navigate('/dashboard/cart')} variant="light" className="text-teal-600 hover:text-teal-700 font-medium text-sm px-3 py-2 flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Carrito</span>
              </Button>

              <Button
                onPress={handleSignOut}
                variant="bordered" color='danger'
                className="flex items-center gap-2 px-4 py-2 text-red-700 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Cerrar Sesión</span>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <Button onPress={() => navigate('/dashboard')} variant="light" className="text-teal-600 hover:text-teal-700 font-medium text-sm p-0 flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Volver
          </Button>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Carrito</h2>

          {(!items || items.length === 0) ? (
            <div className="text-center text-gray-600 py-8">Tu carrito está vacío</div>
          ) : (
            <div className="space-y-4">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-4 border border-gray-100 rounded-lg p-4">
                  <div className="w-24 h-24 overflow-hidden rounded-md bg-gray-50">
                    {it.image ? (
                      <img src={it.image} alt={it.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">Sin imagen</div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-gray-900">{it.name}</div>
                        <div className="text-sm text-gray-500">S./{it.price.toFixed(2)}</div>
                      </div>
                      <div className="text-sm text-gray-700 font-medium">S./{(it.price * it.quantity).toFixed(2)}</div>
                    </div>

                    <div className="mt-3 flex items-center gap-3">
                      <Button onPress={() => updateQuantity(it.id, it.quantity - 1)} className="px-2 py-1 bg-teal-500 text-white rounded">-</Button>
                      <div className="px-3 py-1 border rounded">{it.quantity}</div>
                      <Button onPress={() => updateQuantity(it.id, it.quantity + 1)} className="px-2 py-1 bg-teal-500 text-white rounded">+</Button>
                      <Button onPress={() => removeItem(it.id)} className="ml-auto bg-red-500 text-white px-3 py-1 rounded">
                        <Trash2 className="w-4 h-4 text-white" />
                        <span className="ml-2 text-sm">Eliminar</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t flex items-center justify-between">
                <div>
                  <div className="text-lg font-semibold">Total</div>
                  <div className="text-sm text-gray-500">Incluye impuestos si aplica</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-xl font-bold text-gray-900">S./{total.toFixed(2)}</div>
                  <Button onPress={() => alert('Proceder a compra (placeholder)')} className="bg-teal-500 text-white px-4 py-2 rounded">Proceder a la compra</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
