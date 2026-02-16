'use client';

import { useState, useMemo } from 'react';
import { Product } from '@/lib/data';
import Link from 'next/link';
import { Search, X, Package } from 'lucide-react';
import { removeProduct } from '@/app/admin/product-actions';
import { CATEGORIES } from '@/lib/constants';

import { useRouter } from 'next/navigation';

interface ProductListProps {
    products: Product[];
    editingId: number | null;
}

export default function ProductList({ products, editingId }: ProductListProps) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('newest');

    const filteredProducts = useMemo(() => {
        let result = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Sorting Logic
        result.sort((a, b) => {
            switch (sortBy) {
                case 'newest':
                    return b.id - a.id;
                case 'oldest':
                    return a.id - b.id;
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                default:
                    return 0;
            }
        });

        return result;
    }, [products, searchQuery, selectedCategory, sortBy]);

    const categories = ['All', ...CATEGORIES];

    return (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">All Products</h2>
                    <span className="text-sm text-neutral-400">{filteredProducts.length} items</span>
                </div>

                {/* Search & Filter Controls */}
                <div className="space-y-3">
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={16} />
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-black"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="px-3 py-2 text-sm border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black bg-white"
                        >
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="name-asc">Name: A-Z</option>
                            <option value="name-desc">Name: Z-A</option>
                        </select>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wide rounded-full border transition-all whitespace-nowrap ${selectedCategory === cat
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-2 space-y-2">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-10">
                        <Package size={32} className="mx-auto text-neutral-300 mb-2" />
                        <p className="text-neutral-400 text-sm">No products found.</p>
                    </div>
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => router.push(`/admin?edit=${product.id}`)}
                            className={`group bg-white p-3 rounded-lg border transition-all flex items-center gap-4 cursor-pointer ${editingId === product.id ? 'border-black ring-1 ring-black bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300 hover:shadow-sm'}`}
                        >
                            <div className={`w-20 h-20 rounded-md ${product.color || 'bg-neutral-100'} overflow-hidden relative flex-shrink-0 border border-neutral-100 bg-white`}>
                                {(product.images?.[0] || product.image) && (
                                    <img
                                        src={product.images?.[0] || product.image}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-1"
                                    />
                                )}
                            </div>

                            <div className="flex-grow min-w-0">
                                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-neutral-500">
                                    <span className="bg-neutral-100 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">{product.category}</span>
                                    <span>₹{product.price.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 opacity-100 group-hover:opacity-100 transition-opacity">
                                <form action={removeProduct.bind(null, Number(product.id))}>
                                    <button
                                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                        title="Delete"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (!confirm('Are you sure you want to delete this product?')) {
                                                e.preventDefault();
                                            }
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                                    </button>
                                </form>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
