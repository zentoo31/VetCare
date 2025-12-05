import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Form, Input, Button } from "@heroui/react";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const getPasswordError = (value: string) => {
    if (!value || value.length < 4) {
      return 'La contraseña debe tener 4 caracteres o más';
    }
    if ((value.match(/[A-Z]/g) || []).length < 1) {
      return 'La contraseña debe contener al menos 1 letra mayúscula';
    }
    if ((value.match(/[^a-z]/gi) || []).length < 1) {
      return 'La contraseña debe contener al menos 1 símbolo';
    }

    return null;
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setValidationErrors({});

    const data = Object.fromEntries(new FormData(e.currentTarget) as any) as Record<string, any>;

    const newErrors: Record<string, string> = {};

    if (isSignUp) {
      if (!data.fullName) newErrors.fullName = 'Por favor ingresa tu nombre completo';
      if (!data.phone) newErrors.phone = 'Por favor ingresa un teléfono';
    }

    if (!data.email) newErrors.email = 'Por favor ingresa un email válido';

    const passwordError = isSignUp ? getPasswordError(data.password || password) : null;
    if (passwordError) {
      newErrors.password = passwordError;
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password, fullName, phone);
        window.location.reload();
      } else {
        await signIn(email, password);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error' + err);
    } finally {
      setLoading(false);
    }
  }



  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <video src="/video.mp4" autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-linear-to-br from-teal-50 via-cyan-50 to-blue-50 opacity-70 pointer-events-none" />
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center relative z-10">
        <div className="hidden lg:block space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 bg-[#4bbfe8] rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/logo.png" alt="" className='w-12 h-12' />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Veterinaria Fede y Lu</h1>
              <p className="text-gray-600">Centro Veterinario</p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Cuidamos de tus mejores amigos
            </h2>
            <p className="text-lg text-gray-600">
              Gestiona las citas de tu mascota de forma sencilla y mantén un registro completo de su historial médico.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-teal-100">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">📋</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Agenda Fácil</h3>
              <p className="text-sm text-gray-600">Reserva citas en minutos</p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-cyan-100">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-3">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Comprar Productos</h3>
              <p className="text-sm text-gray-600">Encuentra accesorios y medicamentos para tu mascota</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-16 h-16 bg-[#4bbfe8] rounded-2xl flex items-center justify-center shadow-lg">
              <img src="/logo.png" alt="" className='w-12 h-12' />
            </div>  
              <h1 className="text-2xl font-bold text-gray-900">Veterinaria Fede y Lu</h1>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
            </h2>
            <p className="text-gray-600">
              {isSignUp ? 'Registra a tus mascotas y agenda tu primera cita' : 'Accede a tu cuenta para gestionar citas'}
            </p>
          </div>

          <Form
            className="space-y-5"
            validationErrors={validationErrors}
            onReset={() => setValidationErrors({})}
            onSubmit={onSubmit}
          >
            {isSignUp && (
              <>
                <Input
                  isRequired
                  label="Nombre Completo"
                  labelPlacement="outside"
                  name="fullName"
                  placeholder="Juan Pérez"
                  value={fullName}
                  onValueChange={setFullName}
                />

                <Input
                  isRequired
                  label="Teléfono"
                  labelPlacement="outside"
                  name="phone"
                  placeholder="+51 900 000 000"
                  value={phone}
                  onValueChange={setPhone}
                />
              </>
            )}
            <Input
              isRequired
              label="Email"
              labelPlacement="outside"
              name="email"
              placeholder="tu@email.com"
              type="email"
              value={email}
              onValueChange={setEmail}
            />

            <Input
              isRequired
              label="Contraseña"
              labelPlacement="outside"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onValueChange={setPassword}
              errorMessage={isSignUp ? getPasswordError(password) : undefined}
              isInvalid={isSignUp ? getPasswordError(password) !== null : false}
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <Button
                className="w-full bg-teal-500 text-white py-3 px-6 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  'Cargando...'
                ) : isSignUp ? (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Crear Cuenta
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Iniciar Sesión
                  </>
                )}
              </Button>
            </div>
          </Form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError('');
              }}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors underline cursor-pointer"
            >
              {isSignUp
                ? '¿Ya tienes cuenta? Inicia sesión'
                : '¿No tienes cuenta? Regístrate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
