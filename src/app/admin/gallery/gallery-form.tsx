'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateGalleryItem } from './actions';
import { GalleryItem } from '@/lib/data';

interface Props {
    item?: GalleryItem;
    onCancel: () => void;
}

const SIZES = [
    { value: "col-span-1", label: "Small (1x1)" },
    { value: "col-span-1 md:col-span-2", label: "Wide (2x1)" },
    { value: "col-span-1 row-span-2", label: "Tall (1x2)" },
    { value: "col-span-1 md:col-span-2 row-span-2", label: "Large (2x2)" }
];

export default function GalleryForm({ item, onCancel }: Props) {
    const [preview, setPreview] = useState<string>(item?.image || '');
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (formData: FormData) => {
        const result = await updateGalleryItem(formData);
        if (result?.error) {
            alert(result.error);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-black/5 animate-in fade-in zoom-in duration-300 mb-8">
            <h2 className="text-xl font-bold mb-6 uppercase tracking-tight">
                {item ? 'Edit Project' : 'Add New Project'}
            </h2>

            <form action={handleSubmit} className="space-y-4">
                {item?.id && <input type="hidden" name="id" value={item.id} />}
                <input type="hidden" name="currentImage" value={item?.image || ''} />

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Title</label>
                    <input
                        name="title"
                        defaultValue={item?.title}
                        className="w-full px-4 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Grid Size</label>
                    <select
                        name="size"
                        defaultValue={item?.size || "col-span-1"}
                        className="w-full px-4 py-2 bg-neutral-50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                    >
                        {SIZES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest mb-2 opacity-60">Description (Optional)</label>
                    <textarea
                        name="description"
                        defaultValue={item?.description}
                        className="w-full px-4 py-2 bg-neutral-50 border rounded-lg h-20 resize-none"
                    />
                </div>

                {/* Image Section */}
                <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-100">
                    <label className="block text-xs font-bold uppercase tracking-widest mb-4 opacity-60">Project Image</label>

                    <div className="relative">
                        <input
                            type="file"
                            name="file"
                            id="gallery-file-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label
                            htmlFor="gallery-file-upload"
                            className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-neutral-300 rounded-lg cursor-pointer hover:border-black hover:bg-neutral-50 transition-all text-sm font-medium text-neutral-600"
                        >
                            {preview ? 'Change Image' : 'Click to Upload Image'}
                        </label>
                    </div>

                    {preview && (
                        <div className="mt-4 relative h-40 w-full rounded-lg overflow-hidden border border-neutral-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                    )}
                </div>

                <div className="flex gap-3 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-black text-white font-bold uppercase tracking-widest py-3 rounded-lg hover:bg-neutral-800 transition-all"
                    >
                        {item ? 'Save Changes' : 'Create Project'}
                    </button>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-3 font-bold uppercase tracking-widest rounded-lg border border-neutral-200 hover:bg-neutral-50"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
