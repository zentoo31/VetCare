import { useState, useMemo, useEffect } from 'react';
import { ShoppingCart, Eye, Search, Funnel } from 'lucide-react';
import { Button } from '@heroui/react';
import { toast } from 'sonner';
import { Product } from '../lib/Product';
import { supabase } from '../lib/supabase';
import {Select, SelectItem, Input} from "@heroui/react";

const PRODUCT_TYPES = ['food', 'toys', 'accessories', 'medicine', 'other'];

export default function ProductsStore() {
    const [products2, setProducts2] = useState<Product[]>([]);

    const loadProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('id, created_at, name, price, type, image');

        if (error) {
            console.error('Error loading products:', error);
            setProducts2([]);
            return;
        }

        const normalized = (data || []).map((d) => {
            const rec = d as Record<string, unknown>;
            const priceRaw = rec['price'];
            const price = typeof priceRaw === 'string' ? parseFloat(priceRaw) : (priceRaw as number | undefined) ?? 0;

            return {
                id: String(rec['id'] ?? ''),
                created_at: rec['created_at'] as string | undefined,
                name: String(rec['name'] ?? ''),
                price,
                type: (rec['type'] as Product['type']) ?? 'other',
                image: String(rec['image'] ?? ''),
            } as Product;
        });

        setProducts2(normalized);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const [search, setSearch] = useState('');
    const [filterType, setFilterType] = useState('');

    const addToCart = (p: Product) => {
        setProducts2((cur) => cur);
        toast.success(`${p.name} agregado al carrito`);
    };

    const viewMore = (p: Product) => {
        toast(`${p.name} — $${p.price.toFixed(2)} • Tipo: ${p.type}`);
    };

    const filtered = useMemo(() => {
        return products2.filter((p) => {
            const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = !filterType || p.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [products2, search, filterType]);

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
                        <div className="flex gap-2 w-full">
                            <Input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar productos..."
                                className="flex-1 min-w-0 px-4 py-2  border-gray-200 rounded-lg"
                                startContent={<Search className="w-4 h-4 text-gray-400"/>}
                            />

                            <Select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-40 flex-none px-3 py-2  border-gray-200 rounded-lg"
                                placeholder="Filtrar"
                                startContent={<Funnel className="w-4 h-4 text-gray-400"/>}
                            >
                                {PRODUCT_TYPES.map((t) => (
                                    <SelectItem key={t} textValue={t}>
                                        {t}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>

                        <div>
                            {filtered.length === 0 ? (
                                <div className="text-gray-600 py-8 text-center">
                                    <div>No hay productos que coincidan</div>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filtered.map((p) => (
                                        <div key={p.id} className="bg-linear-to-br from-white to-teal-50 rounded-xl p-4 border border-teal-100">
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
                                                        <Button onClick={() => addToCart(p)} className="px-3 py-1 bg-teal-500 text-white rounded-md flex items-center gap-2 hover:shadow">
                                                            <ShoppingCart className="w-4 h-4" />
                                                            <span className="text-sm">Agregar</span>
                                                        </Button>
                                                        <Button onClick={() => viewMore(p)} className="px-3 py-1 border border-gray-200 rounded-md flex items-center gap-2 hover:bg-gray-50" variant="bordered">
                                                            <Eye className="w-4 h-4" />
                                                            <span className="text-sm">Ver más</span>
                                                        </Button>
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