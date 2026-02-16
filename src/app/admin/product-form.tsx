'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createOrUpdateProduct } from './product-actions';
import { Product } from '@/lib/data';

import { CATEGORIES } from "@/lib/constants";

interface Props {
    product?: Product;
    initialStock?: number;
    onCancel?: () => void;
}

type ImageItem =
    | { type: 'url', value: string }
    | { type: 'file', file: File, preview: string };

export default function ProductForm({ product, initialStock = 0, onCancel }: Props) {
    // Initialize images state
    const [images, setImages] = useState<ImageItem[]>(() => {
        const initial: ImageItem[] = [];
        if (product?.images && product.images.length > 0) {
            product.images.forEach(img => initial.push({ type: 'url', value: img }));
        } else if (product?.image) {
            initial.push({ type: 'url', value: product.image });
        }
        return initial;
    });

    const [useUrl, setUseUrl] = useState(!product?.image?.startsWith('/uploads'));
    const [isUploading, setIsUploading] = useState(false);
    const router = useRouter();

    // Cleanup object URLs to avoid memory leaks
    useEffect(() => {
        return () => {
            images.forEach(img => {
                if (img.type === 'file') {
                    URL.revokeObjectURL(img.preview);
                }
            });
        };
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const newImages: ImageItem[] = Array.from(files).map(file => ({
                type: 'file',
                file: file,
                preview: URL.createObjectURL(file)
            }));
            setImages(prev => [...prev, ...newImages]);
        }
        // Reset input value to allow selecting the same file again if needed
        e.target.value = '';
    };

    const handleUrlAdd = (url: string) => {
        if (url) {
            setImages(prev => [...prev, { type: 'url', value: url }]);
        }
    };

    const handleRemoveImage = (index: number) => {
        setImages(prev => {
            const itemToRemove = prev[index];
            if (itemToRemove.type === 'file') {
                URL.revokeObjectURL(itemToRemove.preview);
            }
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleCancel = () => {
        router.push('/admin');
        if (onCancel) onCancel();
    };

    async function handleSubmit(formData: FormData) {
        setIsUploading(true);

        try {
            // 1. Separate existing URLs and New Files
            const existingUrls = images
                .filter(img => img.type === 'url')
                .map(img => (img as { type: 'url', value: string }).value);

            const newFiles = images
                .filter(img => img.type === 'file')
                .map(img => (img as { type: 'file', file: File }).file);

            // 2. Clear auto-populated 'files' from input to avoid duplicates/conflicts 
            // (though we reset the input value, it's safer to reconstruct)
            formData.delete('files');

            // 3. Append actual files from state
            newFiles.forEach(file => {
                formData.append('files', file);
            });

            // 4. Send existing/external URLs
            formData.set('existingImages', JSON.stringify(existingUrls));

            // 5. Handle fallback logic for the 'imageUrl' input if user typed but didn't click add
            // We can leave it as is, or ignore it. The original code grabbed it.
            // But we have `handleUrlAdd` now. 
            // If the user typed in the box but didn't "Add", it might be missed.
            // The original form sent `imageUrl` name. Let's keep it but prioritized our state.

            const result = await createOrUpdateProduct(formData);

            if (result?.error) {
                alert(result.error);
                setIsUploading(false);
            }
            // Success redirect is handled in server action
        } catch (error) {
            console.error("Form submission error", error);
            alert("An error occurred. Please try again.");
            setIsUploading(false);
        }
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-black/5 animate-in fade-in zoom-in duration-300">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">
                {product ? 'Edit Product' : 'Add New Product'}
            </h2>

            <form action={handleSubmit} className="space-y-4">
                {product?.id && <input type="hidden" name="id" value={product.id} />}

                {/* We handle existingImages manually in handleSubmit, but keeping a hidden input if needed for fallback? No, manual is better. */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Name</label>
                        <input
                            name="name"
                            defaultValue={product?.name}
                            className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            defaultValue={product?.price}
                            className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            defaultValue={initialStock}
                            className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                            min="0"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Category</label>
                    <select
                        name="category"
                        defaultValue={product?.category || CATEGORIES[0]}
                        className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all"
                    >
                        {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Description</label>
                    <textarea
                        name="description"
                        defaultValue={product?.description}
                        className="w-full px-4 py-2 bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black transition-all h-24 resize-none"
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
                                        handleUrlAdd(val);
                                        e.currentTarget.value = '';
                                    }
                                }}
                            />
                            <button type="button" className="text-xs uppercase font-bold px-4 py-2 bg-black text-white rounded-lg" onClick={(e) => {
                                const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                handleUrlAdd(input.value);
                                input.value = '';
                            }}>Add</button>
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="file"
                                name="file_input" // Changed name so it doesn't conflict with manual append
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
                    {images.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {images.map((item, idx) => (
                                <div key={idx} className="relative group aspect-square rounded-lg overflow-hidden border border-neutral-200">
                                    <img
                                        src={item.type === 'file' ? item.preview : item.value}
                                        alt={`Preview ${idx}`}
                                        className="w-full h-full object-cover"
                                    />
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
