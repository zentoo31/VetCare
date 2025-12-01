import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Product } from '../lib/Product';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@heroui/react';
import { LogOut, ArrowLeft, ShoppingCart, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useCart } from '../lib/cartStore';

type Props = {
    id?: string;
};

export default function ProductDetails({ id }: Props) {
    const { profile, signOut } = useAuth();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        let mounted = true;
        setLoading(true);
        setError(null);

        (async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id, created_at, name, price, type, image, description')
                    .eq('id', id)
                    .single();

                if (!mounted) return;

                if (error) {
                    setError(error.message || 'Error loading product');
                    setProduct(null);
                    return;
                }

                if (data) {
                    const rec = data as Record<string, unknown>;
                    const priceRaw = rec['price'];
                    const price = typeof priceRaw === 'string' ? parseFloat(priceRaw) : (priceRaw as number | undefined) ?? 0;

                    setProduct({
                        id: String(rec['id'] ?? ''),
                        created_at: rec['created_at'] as string | undefined,
                        name: String(rec['name'] ?? ''),
                        price,
                        description: String(rec['description'] ?? ''),
                        type: (rec['type'] as Product['type']) ?? 'other',
                        image: String(rec['image'] ?? ''),
                    });
                } else {
                    setProduct(null);
                }
            } catch (err: any) {
                if (!mounted) return;
                setError(err?.message || String(err));
                setProduct(null);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [id]);

    async function handleSignOut() {
        try {
            await signOut();
            navigate('/');
        } catch (err) {
            console.error('Sign out error', err);
        }
    }

    const addToCart = (p: Product) => {
        useCart.getState().addItem({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 });
        toast.success(`${p.name} agregado al carrito`);
    };

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
                            <Button onPress={() => navigate('/dashboard')} variant="light" className="text-teal-600 hover:text-teal-700 font-medium text-sm px-3 py-2 flex items-center gap-2">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="hidden sm:inline">Carrito</span>
                            </Button>

                            <Button
                                onPress={handleSignOut}
                                variant="bordered" color="danger"
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
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-sm p-8">
                        <Button onPress={() => navigate('/dashboard')} variant="light" className="text-teal-600 hover:text-teal-700 font-medium text-sm p-0 flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" /> Volver
                        </Button>
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Detalle de producto</h2>

                        {!id && <div className="text-sm text-gray-500">No product id provided</div>}
                        {loading && (
                            <div className="bg-white rounded-2xl shadow-sm p-8 flex flex-col items-center justify-center min-h-[260px]">
                                <Loader2 className="animate-spin w-8 h-8 text-teal-500" />
                                <div className="mt-3 text-center text-gray-600">Cargando...</div>
                            </div>
                        )}
                        {error && <div className="text-sm text-red-600">{error}</div>}
                        {!loading && !error && !product && id && (
                            <div className="text-sm text-gray-500">Producto no encontrado</div>
                        )}

                        {product && (
                            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                                <div className="flex flex-col md:flex-row items-start gap-6">
                                    <div className="w-full md:w-1/3">
                                        {product.image ? (
                                            <div className="w-full h-90 mb-4 overflow-hidden rounded-md">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                        ) : (
                                            <div className="w-full h-48 mb-4 bg-gray-50 rounded-md flex items-center justify-center text-gray-400">Sin imagen</div>
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                        <div className="text-sm text-gray-500 mb-2">Tipo: {product.type}</div>
                                        <p className="text-xs text-gray-600">{product.description}</p>
                                        {product.created_at && (
                                            <div className="text-xs text-gray-400 mt-2">Creado: {new Date(product.created_at).toLocaleString()}</div>
                                        )}
                                        <div className="text-xl font-medium text-gray-900">S./{product.price.toFixed(2)}</div>

                                        <div className="mt-4 flex gap-3">
                                            <Button onPress={() => addToCart(product)} className="px-4 py-2 bg-teal-500 text-white rounded-md flex items-center gap-2 hover:shadow">
                                                <ShoppingCart className="w-4 h-4" />
                                                <span className="text-sm">Añadir al carrito</span>
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
