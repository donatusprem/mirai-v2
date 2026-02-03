'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createOrUpdateProduct } from './product-actions';
import { Product } from '@/lib/data';

import { CATEGORIES } from "@/lib/constants";

interface Props {
    product?: Product;
    initialStock?: number;
    onCancel?: () => void;
}

export default function ProductForm({ product, initialStock = 0, onCancel }: Props) {
    const [previews, setPreviews] = useState<string[]>(product?.images || (product?.image ? [product.image] : []));
    const [useUrl, setUseUrl] = useState(!product?.image?.startsWith('/uploads'));
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newPreviews = Array.from(files).map(file => URL.createObjectURL(file));
            setPreviews(prev => [...prev, ...newPreviews]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setPreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleCancel = () => {
        router.push('/admin');
        if (onCancel) onCancel();
    };

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);
        // We need to handle the file uploads manually if we want to support multiple files easily with server actions
        // or we rely on the input name="files" and the server action to parse getAll('files').
        // Let's modify the server action to handle "files" or "images".

        // However, for previews that are ALREADY URLs (existing images), they won't be in the file input.
        // We need to pass them as hidden inputs or a JSON string.

        // Let's verify how we pass data.
        // We will append existing images as text fields.

        // For now, let's just make the form work with the existing action wrapper, 
        // but we might need to modify product-actions.ts significantly.

        const result = await createOrUpdateProduct(formData);
        setIsUploading(false);

        if (result?.error) {
            alert(result.error);
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-black/5 animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">
                {product ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form action={handleSubmit} className="space-y-4">
                {product?.id && <input type="hidden" name="id" value={product.id} />}

                {/* Pass existing images as a JSON string or multiple inputs */}
                {/* We'll rely on the server action to read this. Let's call it 'existingImages' */}
                <input type="hidden" name="existingImages" value={JSON.stringify(previews.filter(p => !p.startsWith('blob:')))} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Name</label>
                        <input
                            name="name"
                            defaultValue={product?.name}
                            className="w-full px-4 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={product?.price}
                            className="w-full px-4 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            defaultValue={initialStock}
                            className="w-full px-4 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Category</label>
                    <select
                        name="category"
                        defaultValue={product?.category || CATEGORIES[0]}
                        className="w-full px-4 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                    >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Description</label>
                    <textarea
                        name="description"
                        defaultValue={product?.description}
                        className="w-full px-4 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 h-24 resize-none"
                    />
                </div>

                {/* Image Section */}
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Product Images</label>

                    <div className="flex gap-4 mb-4 text-sm">
                        <button
                            type="button"
                            onClick={() => setUseUrl(false)}
                            className={`px-3 py-1 rounded-full ${!useUrl ? 'bg-black text-white' : 'bg-white text-black border'}`}
                        >
                            Upload Files
                        </button>
                        <button
                            type="button"
                            onClick={() => setUseUrl(true)}
                            className={`px-3 py-1 rounded-full ${useUrl ? 'bg-black text-white' : 'bg-white text-black border'}`}
                        >
                            External URL
                        </button>
                    </div>

                    {useUrl ? (
                        <div className="flex gap-2">
                            <input
                                name="imageUrl"
                                placeholder="https://..."
                                className="flex-1 px-4 py-2 bg-white border rounded-lg"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        const val = e.currentTarget.value;
                                        if (val) {
                                            setPreviews(prev => [...prev, val]);
                                            e.currentTarget.value = '';
                                        }
                                    }
                                }}
                            />
                            <button type="button" className="text-xs uppercase font-bold px-4 py-2 bg-black text-white rounded-lg" onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                if (input.value) {
                                    setPreviews(prev => [...prev, input.value]);
                                    input.value = '';
                                }
                            }}>Add</button>
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="file"
                                name="files" // Changed from 'file' to 'files' for mulitple
                                id="file-upload"
                                accept="image/*"
                                multiple
                                onChange={handleFileChange}
                                className="hidden"
                            />
                            <label
                                htmlFor="file-upload"
                                className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-black hover:bg-neutral-50 transition-all text-sm font-medium text-neutral-600"
                            >
                                Click to Upload Images (Select Multiple)
                            </label>
                        </div>
                    )}

                    {/* Previews Grid */}
                    {previews.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {previews.map((src, idx) => (
                                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-200">
                                    <img src={src} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(idx)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                    </button>
                                    {idx === 0 && (
                                        <div className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[10px] uppercase font-bold text-center py-1">
                                            Primary
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="flex-1 bg-black text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-neutral-800 transition-all disabled:opacity-50"
                    >
                        {isUploading ? 'Saving...' : (product ? 'Save Changes' : 'Create Product')}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-3 font-bold uppercase tracking-widest rounded-lg border border-neutral-200 hover:bg-neutral-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
