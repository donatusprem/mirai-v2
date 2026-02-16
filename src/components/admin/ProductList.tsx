'use client';

import { useState, useMemo, useEffect } from 'react';
import { Product } from '@/lib/data';
import Link from 'next/link';
import { Search, X, Package, GripVertical, Save, ArrowUpDown } from 'lucide-react';
import { removeProduct, updateOrder } from '@/app/admin/product-actions';
import { CATEGORIES } from '@/lib/constants';
import { useRouter } from 'next/navigation';

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useToast } from '@/components/ui/Toast';

interface ProductListProps {
    products: Product[];
    editingId: number | null;
}

// Sortable Item Component
function SortableProductItem({ product, editingId, onClick, onDelete, isReordering }: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: product.id, disabled: !isReordering });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...(isReordering ? attributes : {})}
            className={`group bg-white p-3 rounded-lg border transition-all flex items-center gap-4 ${isReordering ? 'cursor-move' : 'cursor-pointer'} ${editingId === product.id ? 'border-black ring-1 ring-black bg-neutral-50' : 'border-neutral-100 hover:border-neutral-300 hover:shadow-sm'}`}
            onClick={(e) => {
                if (!isReordering) onClick();
            }}
        >
            {isReordering && (
                <div {...listeners} className="text-neutral-300 cursor-grab active:cursor-grabbing hover:text-neutral-500">
                    <GripVertical size={20} />
                </div>
            )}

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
                {!isReordering && (
                    <button
                        className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                        title="Delete"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete();
                        }}
                    >
                        <X size={16} />
                    </button>
                )}
            </div>
        </div>
    );
}

export default function ProductList({ products, editingId }: ProductListProps) {
    const router = useRouter();
    const { showToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [sortBy, setSortBy] = useState<string>('newest');
    const [isReordering, setIsReordering] = useState(false);
    const [orderedProducts, setOrderedProducts] = useState(products);

    useEffect(() => {
        setOrderedProducts(products);
    }, [products]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const filteredProducts = useMemo(() => {
        if (isReordering) return orderedProducts; // Show all (or strictly ordered) when reordering

        let result = orderedProducts.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Sorting Logic (Only if not reordering)
        if (!isReordering) {
            result.sort((a, b) => {
                switch (sortBy) {
                    case 'newest': return b.id - a.id;
                    case 'oldest': return a.id - b.id;
                    case 'price-low': return a.price - b.price;
                    case 'price-high': return b.price - a.price;
                    case 'name-asc': return a.name.localeCompare(b.name);
                    case 'name-desc': return b.name.localeCompare(a.name);
                    case 'position': return (a.position || 0) - (b.position || 0); // Default manual order
                    default: return 0;
                }
            });
        }
        return result;
    }, [orderedProducts, searchQuery, selectedCategory, sortBy, isReordering]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setOrderedProducts((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleSaveOrder = async () => {
        setIsReordering(false);
        const updates = orderedProducts.map((p, index) => ({ id: p.id, position: index }));

        showToast("Saving order...", "info");
        const result = await updateOrder(updates);
        if (result.success) {
            showToast("Product order saved!", "success");
        } else {
            showToast("Failed to save order", "error");
        }
    };

    const categories = ['All', ...CATEGORIES];

    return (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm flex flex-col">
            <div className="p-4 border-b border-neutral-200 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold text-lg">All Products</h2>
                    <span className="text-sm text-neutral-400">{filteredProducts.length} items</span>
                </div>

                {/* Controls */}
                <div className="space-y-3">
                    <div className="flex gap-2 items-center">
                        {/* Reorder Toggle */}
                        <button
                            onClick={() => {
                                if (isReordering) {
                                    setIsReordering(false); // Cancel
                                    setOrderedProducts(products); // Reset
                                } else {
                                    setIsReordering(true);
                                    setSortBy('position'); // Force sort by position
                                    setSearchQuery(''); // Clear search
                                    setSelectedCategory('All'); // Clear filter
                                }
                            }}
                            className={`px-3 py-2 text-sm font-bold border rounded-lg flex items-center gap-2 transition-all ${isReordering ? 'bg-neutral-100 border-neutral-300 text-neutral-600' : 'bg-white border-neutral-200 hover:border-black text-black'}`}
                        >
                            <ArrowUpDown size={16} />
                            {isReordering ? 'Cancel' : 'Reorder'}
                        </button>

                        {isReordering ? (
                            <button
                                onClick={handleSaveOrder}
                                className="flex-1 bg-black text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-neutral-800 transition-all shadow-md flex items-center justify-center gap-2"
                            >
                                <Save size={16} />
                                Save Order
                            </button>
                        ) : (
                            <>
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
                                    <option value="position">Custom Order</option>
                                    <option value="price-low">Price: Low to High</option>
                                    <option value="price-high">Price: High to Low</option>
                                    <option value="name-asc">Name: A-Z</option>
                                    <option value="name-desc">Name: Z-A</option>
                                </select>
                            </>
                        )}
                    </div>

                    {!isReordering && (
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
                    )}
                </div>
            </div>

            <div className="p-2 space-y-2">
                {filteredProducts.length === 0 ? (
                    <div className="text-center py-10">
                        <Package size={32} className="mx-auto text-neutral-300 mb-2" />
                        <p className="text-neutral-400 text-sm">No products found.</p>
                    </div>
                ) : (
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={filteredProducts.map(p => p.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {filteredProducts.map((product) => (
                                <SortableProductItem
                                    key={product.id}
                                    product={product}
                                    editingId={editingId}
                                    isReordering={isReordering}
                                    onClick={() => router.push(`/admin?edit=${product.id}`)}
                                    onDelete={() => {
                                        if (confirm('Are you sure you want to delete this product?')) {
                                            removeProduct(product.id);
                                        }
                                    }}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                )}
            </div>
        </div>
    );
}
