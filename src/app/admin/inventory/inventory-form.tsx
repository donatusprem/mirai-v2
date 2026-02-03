'use client';

import { useState } from 'react';
import { Product } from '@/lib/data';
import { updateInventory } from './actions';
import { X } from 'lucide-react';

interface Props {
    products: Product[];
    onClose: () => void;
    editingItem?: {
        id: number;
        productId: number;
        productName: string;
        quantity: number;
        minStock: number;
    };
}

export default function InventoryForm({ products, onClose, editingItem }: Props) {
    const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
        editingItem ? products.find(p => p.id === editingItem.productId) : undefined
    );

    const handleProductChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const product = products.find(p => p.id === Number(e.target.value));
        setSelectedProduct(product);
    };

    const handleSubmit = async (formData: FormData) => {
        if (selectedProduct) {
            formData.set('productName', selectedProduct.name);
        }
        await updateInventory(formData);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md animate-in zoom-in-95 fade-in duration-200">
                <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                    <h2 className="text-lg font-bold">
                        {editingItem ? 'Update Stock' : 'Add Inventory Entry'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <form action={handleSubmit} className="p-6 space-y-5">
                    {editingItem?.id && <input type="hidden" name="id" value={editingItem.id} />}

                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500">
                            Product
                        </label>
                        <select
                            name="productId"
                            defaultValue={editingItem?.productId || ''}
                            onChange={handleProductChange}
                            className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                            required
                        >
                            <option value="">Select a product...</option>
                            {products.map(p => (
                                <option key={p.id} value={p.id}>
                                    {p.name} ({p.category})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500">
                                Quantity
                            </label>
                            <input
                                type="number"
                                name="quantity"
                                min="0"
                                defaultValue={editingItem?.quantity || 0}
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-neutral-500">
                                Min. Stock
                            </label>
                            <input
                                type="number"
                                name="minStock"
                                min="0"
                                defaultValue={editingItem?.minStock || 5}
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            className="flex-1 bg-black text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-neutral-800 transition-all"
                        >
                            {editingItem ? 'Update' : 'Add Entry'}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 font-medium rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
