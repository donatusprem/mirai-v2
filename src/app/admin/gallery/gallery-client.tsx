'use client';

import { useState } from 'react';
import { GalleryItem } from '@/lib/data';
import { removeGalleryItem } from './actions';
import GalleryForm from './gallery-form';
import { Plus, Trash2, Edit2 } from 'lucide-react';

export default function GalleryClient({ initialItems }: { initialItems: GalleryItem[] }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editingItem, setEditingItem] = useState<GalleryItem | undefined>(undefined);

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            await removeGalleryItem(id);
        }
    };

    const handleEdit = (item: GalleryItem) => {
        setEditingItem(item);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setEditingItem(undefined);
        setIsEditing(true);
    };

    return (
        <div className="container mx-auto px-6 py-12">

            {isEditing ? (
                <GalleryForm
                    item={editingItem}
                    onCancel={() => setIsEditing(false)}
                />
            ) : (
                <div className="mb-8 flex justify-end">
                    <button
                        onClick={handleAddNew}
                        className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-bold uppercase tracking-widest text-sm hover:bg-neutral-800 transition-all"
                    >
                        <Plus size={16} />
                        Add New Project
                    </button>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {initialItems.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-neutral-200 group">
                        <div className="relative aspect-video bg-neutral-100">
                            {item.image && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            )}
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                                <button
                                    onClick={() => handleEdit(item)}
                                    className="p-2 bg-white rounded-full text-black hover:bg-neutral-200"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-bold">{item.title}</h3>
                            <p className="text-xs text-neutral-500 mt-1">{item.size || 'Regular Size'}</p>
                        </div>
                    </div>
                ))}

                {initialItems.length === 0 && !isEditing && (
                    <div className="col-span-full py-20 text-center text-neutral-400 border-2 border-dashed border-neutral-200 rounded-xl">
                        No projects in gallery yet.
                    </div>
                )}
            </div>
        </div>
    );
}
