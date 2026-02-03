'use client';

import { useState } from 'react';
import { Product, InventoryItem } from '@/lib/data';
import { removeInventory } from './actions';
import InventoryForm from './inventory-form';
import { Plus, Edit2, Trash2, AlertTriangle, Package } from 'lucide-react';

interface Props {
    initialInventory: InventoryItem[];
    products: Product[];
}

export default function InventoryClient({ initialInventory, products }: Props) {
    const [showForm, setShowForm] = useState(false);
    const [editingItem, setEditingItem] = useState<InventoryItem | undefined>();

    const handleEdit = (item: InventoryItem) => {
        setEditingItem(item);
        setShowForm(true);
    };

    const handleAdd = () => {
        setEditingItem(undefined);
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this inventory entry?')) {
            await removeInventory(id);
        }
    };

    const handleCloseForm = () => {
        setShowForm(false);
        setEditingItem(undefined);
    };

    // Calculate stats
    const lowStockItems = initialInventory.filter(i => i.quantity <= i.minStock);
    const outOfStock = initialInventory.filter(i => i.quantity === 0);
    const totalItems = initialInventory.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <div className="p-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <p className="text-2xl font-bold">{initialInventory.length}</p>
                    <p className="text-sm text-neutral-500">Tracked Products</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-neutral-200 shadow-sm">
                    <p className="text-2xl font-bold">{totalItems}</p>
                    <p className="text-sm text-neutral-500">Total Units</p>
                </div>
                <div className={`p-6 rounded-xl border shadow-sm ${lowStockItems.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-neutral-200'}`}>
                    <p className="text-2xl font-bold">{lowStockItems.length}</p>
                    <p className="text-sm text-neutral-500">Low Stock</p>
                </div>
                <div className={`p-6 rounded-xl border shadow-sm ${outOfStock.length > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-neutral-200'}`}>
                    <p className="text-2xl font-bold">{outOfStock.length}</p>
                    <p className="text-sm text-neutral-500">Out of Stock</p>
                </div>
            </div>

            {/* Add Button */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-bold text-lg">Inventory List</h2>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all"
                >
                    <Plus size={16} />
                    Add Entry
                </button>
            </div>

            {/* Inventory Table */}
            {initialInventory.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-neutral-300">
                    <Package size={48} className="mx-auto text-neutral-300 mb-4" />
                    <p className="text-neutral-400 mb-2">No inventory entries yet.</p>
                    <button
                        onClick={handleAdd}
                        className="text-blue-500 text-sm hover:underline"
                    >
                        Add your first inventory entry
                    </button>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-neutral-50 border-b border-neutral-200">
                            <tr>
                                <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Product</th>
                                <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Quantity</th>
                                <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Min. Stock</th>
                                <th className="text-center px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Status</th>
                                <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                            {initialInventory.map((item) => {
                                const isLowStock = item.quantity <= item.minStock && item.quantity > 0;
                                const isOutOfStock = item.quantity === 0;

                                return (
                                    <tr key={item.id} className="hover:bg-neutral-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <p className="font-medium">{item.productName}</p>
                                            <p className="text-xs text-neutral-400">ID: {item.productId}</p>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <span className={`text-lg font-bold ${isOutOfStock ? 'text-red-500' : isLowStock ? 'text-amber-500' : 'text-green-600'}`}>
                                                {item.quantity}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center text-neutral-500">
                                            {item.minStock}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {isOutOfStock ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                                                    <AlertTriangle size={12} />
                                                    Out of Stock
                                                </span>
                                            ) : isLowStock ? (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
                                                    <AlertTriangle size={12} />
                                                    Low Stock
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                                                    In Stock
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(item)}
                                                    className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 size={16} className="text-neutral-500" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={16} className="text-red-400" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Form Modal */}
            {showForm && (
                <InventoryForm
                    products={products}
                    onClose={handleCloseForm}
                    editingItem={editingItem}
                />
            )}
        </div>
    );
}
