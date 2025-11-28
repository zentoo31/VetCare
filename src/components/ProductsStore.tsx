import { useState, useMemo } from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { toast } from 'sonner';

type Product = {
    id: string;
    name: string;
    price: number;
    type: string;
    image?: string;
};

const PRODUCT_TYPES = ['food', 'toys', 'accessories', 'medicine', 'other'];

export default function ProductsStore() {
    const IMGS = [
        'https://cdn11.bigcommerce.com/s-5c2j7yr74m/images/stencil/1280x1280/products/214/564/suplemento-caida-de-pelo-perros__48694.1722815476.jpg?c=1',
        'https://valca.com.pe/public/frontend/images/producto/3101202307422554.jpg',
        'https://www.superpet.pe/on/demandware.static/-/Sites-SuperPet-master-catalog/default/dw1db88882/images/bexter-shampoo-para-perros-anticaida-500ml.jpg',
        'https://chemiesa.com/wp-content/uploads/2018/01/Nutrapel.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ewOq3Yo1BTaQTcWUZlmbN8zL24hJnojGcw&s',
    ];

    const initialProducts: Product[] = Array.from({ length: 10 }).map((_, i) => ({
        id: String(i + 1),
        name: `producto${i + 1}`,
        price: Math.round((5 + i) * 100) / 100,
        type: PRODUCT_TYPES[i % PRODUCT_TYPES.length],
        image: IMGS[i % IMGS.length],
    }));

    const [products, setProducts] = useState<Product[]>(initialProducts);
    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');

    const addToCart = (p: Product) => {
        setProducts((cur) => cur);
        toast.success(`${p.name} agregado al carrito`);
    };

    const viewMore = (p: Product) => {
        toast(`${p.name} — $${p.price.toFixed(2)} • Tipo: ${p.type}`);
    };

    const filtered = useMemo(() => {
        return products.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = !filterType || p.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [products, search, filterType]);

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Tienda de Productos</h2>
                        <p className="text-sm text-gray-600">Gestiona productos: nombre, precio, tipo. Usa búsqueda y filtros.</p>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4">
                    <div className="space-y-3">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar productos..."
                                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg"
                            />

                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-3 py-2 border border-gray-200 rounded-lg"
                            >
                                <option value="">Todos los tipos</option>
                                {PRODUCT_TYPES.map((t) => (
                                    <option key={t} value={t}>
                                        {t}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {filtered.length === 0 ? (
                                <div className="text-gray-600 py-8 text-center">No hay productos que coincidan</div>
                            ) : (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filtered.map((p) => (
                                        <div key={p.id} className="bg-gradient-to-br from-white to-teal-50 rounded-xl p-4 border border-teal-100">
                                            {p.image && (
                                                <div className="w-full h-36 mb-3 overflow-hidden rounded-md">
                                                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                                                </div>
                                            )}
                                            <div className="flex flex-col justify-between items-start">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{p.name}</h3>
                                                    <p className="text-xs text-gray-500 capitalize">{p.type}</p>
                                                </div>
                                                <div>
                                                    <div className="text-gray-900 font-medium">S./{p.price.toFixed(2)}</div>
                                                    <div className="mt-2 flex gap-2">
                                                        <button onClick={() => addToCart(p)} className="px-3 py-1 bg-teal-500 text-white rounded-md flex items-center gap-2 hover:shadow">
                                                            <ShoppingCart className="w-4 h-4" />
                                                            <span className="text-sm">Agregar</span>
                                                        </button>
                                                        <button onClick={() => viewMore(p)} className="px-3 py-1 border border-gray-200 rounded-md flex items-center gap-2 hover:bg-gray-50">
                                                            <Eye className="w-4 h-4" />
                                                            <span className="text-sm">Ver más</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}